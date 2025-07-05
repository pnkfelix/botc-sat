// Compiler from script DSL to SAT constraints (general rules)
import { Script } from './scripts';
import { getRole, getBaseSetup } from './roles';
import { SATSolver } from './solver';

export class ScriptToSATCompiler {
    
    // Generate SAT constraints that encode all the rules from a script
    // These are conditional rules that apply when certain roles are present
    compileScriptToSAT(script: Script, solver: SATSolver): number {
        const initialVarCount = solver.getVariableCount();
        
        console.log(`Compiling script ${script.name} to SAT constraints...`);
        
        // 1. Encode base setup rules for all player counts
        this.encodeBaseSetupRules(solver);
        
        // 2. Encode role-specific modifications from DSL
        this.encodeRoleModifications(script, solver);
        
        // 3. Encode physical bag substitutions
        this.encodePhysicalBagSubstitutions(script, solver);
        
        // 4. Encode consistency relationships
        this.encodeConsistencyRules(solver);
        
        const scriptVarCount = solver.getVariableCount() - initialVarCount;
        console.log(`Generated ${scriptVarCount} script variables`);
        return scriptVarCount;
    }
    
    private encodeBaseSetupRules(solver: SATSolver): void {
        // For each player count, encode the base setup
        // These are unconditional facts about the base game
        
        for (let playerCount = 5; playerCount <= 15; playerCount++) {
            const base = getBaseSetup(playerCount);
            
            // If player_count = N, then base setup has these counts
            const playerCountVar = solver.addVariable(`player_count_${playerCount}`);
            const baseTownsfolkVar = solver.addVariable(`base_townsfolk_${base.Townsfolk}`);
            const baseOutsiderVar = solver.addVariable(`base_outsider_${base.Outsider}`);
            const baseMinionVar = solver.addVariable(`base_minion_${base.Minion}`);
            const baseDemonVar = solver.addVariable(`base_demon_${base.Demon}`);
            
            // player_count_N => base_townsfolk_X (NOT player_count_N OR base_townsfolk_X)
            solver.addClause([-playerCountVar, baseTownsfolkVar]);
            solver.addClause([-playerCountVar, baseOutsiderVar]);
            solver.addClause([-playerCountVar, baseMinionVar]);
            solver.addClause([-playerCountVar, baseDemonVar]);
        }
    }
    
    private encodeRoleModifications(script: Script, solver: SATSolver): void {
        // Create a chain of modifications for each count type
        // Only create variables for roles that actually modify each type
        
        const countTypes = ['townsfolk', 'outsider', 'minion', 'demon'];
        
        for (const countType of countTypes) {
            this.encodeCountTypeChain(script, countType, solver);
        }
    }
    
    private encodeCountTypeChain(script: Script, countType: string, solver: SATSolver): void {
        // Find roles that modify this count type, in order
        const modifyingRoles: Array<{roleIndex: number, roleId: string, delta: number}> = [];
        
        for (let roleIndex = 0; roleIndex < script.roleIds.length; roleIndex++) {
            const roleId = script.roleIds[roleIndex];
            const role = getRole(roleId);
            if (role && this.roleModifiesCountType(role, countType)) {
                const delta = this.getDelta(role, countType);
                modifyingRoles.push({ roleIndex, roleId, delta });
            }
        }
        
        if (modifyingRoles.length === 0) {
            // No roles modify this count type, so final = base
            this.encodeFinalEqualsBase(countType, solver);
            return;
        }
        
        // Create chain: base -> after_role_X -> after_role_Y -> final
        let prevPrefix = `base_${countType}`;
        
        for (const { roleIndex, roleId, delta } of modifyingRoles) {
            const currentPrefix = `after_role_${roleIndex}_${countType}`;
            this.encodeRoleModification(prevPrefix, currentPrefix, roleId, delta, solver);
            prevPrefix = currentPrefix;
        }
        
        // Final step: last modification -> final
        this.encodeFinalStep(prevPrefix, `final_${countType}`, solver);
    }
    
    private roleModifiesCountType(role: any, countType: string): boolean {
        // Check if role has constraints that modify this count type
        if (!role.constraints) return false;
        
        for (const constraint of role.constraints) {
            if (constraint.type === 'count_modification' && 
                constraint.target === countType) {
                return true;
            }
        }
        return false;
    }
    
    private getDelta(role: any, countType: string): number {
        // Get the delta for this count type from role constraints
        if (!role.constraints) return 0;
        
        for (const constraint of role.constraints) {
            if (constraint.type === 'count_modification' && 
                constraint.target === countType) {
                return constraint.delta || 0;
            }
        }
        return 0;
    }
    
    private encodeRoleModification(prevPrefix: string, currentPrefix: string, roleId: string, delta: number, solver: SATSolver): void {
        // Encode: roleId_present AND prevPrefix_X => currentPrefix_(X+delta)
        //         NOT roleId_present AND prevPrefix_X => currentPrefix_X
        
        const roleVar = solver.addVariable(`${roleId}_present`);
        
        // For reasonable count ranges (0-15)
        for (let count = 0; count <= 15; count++) {
            const prevVar = solver.addVariable(`${prevPrefix}_${count}`);
            const currentVar = solver.addVariable(`${currentPrefix}_${count}`);
            const modifiedVar = solver.addVariable(`${currentPrefix}_${count + delta}`);
            
            // Role present: prevPrefix_count AND roleId_present => currentPrefix_(count+delta)
            // Equivalent to: NOT prevPrefix_count OR NOT roleId_present OR currentPrefix_(count+delta)
            if (count + delta >= 0 && count + delta <= 15) {
                solver.addClause([-prevVar, -roleVar, modifiedVar]);
            }
            
            // Role not present: prevPrefix_count AND NOT roleId_present => currentPrefix_count
            // Equivalent to: NOT prevPrefix_count OR roleId_present OR currentPrefix_count
            solver.addClause([-prevVar, roleVar, currentVar]);
        }
    }
    
    private encodeFinalEqualsBase(countType: string, solver: SATSolver): void {
        // If no roles modify this count type: final_X = base_X
        for (let count = 0; count <= 15; count++) {
            const baseVar = solver.addVariable(`base_${countType}_${count}`);
            const finalVar = solver.addVariable(`final_${countType}_${count}`);
            
            // base_X <=> final_X (both directions)
            solver.addClause([-baseVar, finalVar]);   // base => final
            solver.addClause([baseVar, -finalVar]);   // final => base
        }
    }
    
    private encodeFinalStep(prevPrefix: string, finalPrefix: string, solver: SATSolver): void {
        // Final mapping: prevPrefix_X => finalPrefix_X
        for (let count = 0; count <= 15; count++) {
            const prevVar = solver.addVariable(`${prevPrefix}_${count}`);
            const finalVar = solver.addVariable(`${finalPrefix}_${count}`);
            
            // prevPrefix_X <=> finalPrefix_X
            solver.addClause([-prevVar, finalVar]);
            solver.addClause([prevVar, -finalVar]);
        }
    }
    
    private encodePhysicalBagSubstitutions(script: Script, solver: SATSolver): void {
        // Handle roles that create mismatches between in-play and physical bag
        const countTypes = ['townsfolk', 'outsider', 'minion', 'demon'];
        
        for (const countType of countTypes) {
            this.encodePhysicalBagChain(script, countType, solver);
        }
    }
    
    private encodePhysicalBagChain(script: Script, countType: string, solver: SATSolver): void {
        // Find roles that affect physical bag for this count type
        const substitutionRoles: Array<{roleIndex: number, roleId: string, fromType: string, toType: string}> = [];
        
        for (let roleIndex = 0; roleIndex < script.roleIds.length; roleIndex++) {
            const roleId = script.roleIds[roleIndex];
            const role = getRole(roleId);
            if (role && role.constraints) {
                for (const constraint of role.constraints) {
                    if (constraint.type === 'physical_bag_substitution' && 
                        (constraint.fromType === countType || constraint.toType === countType)) {
                        substitutionRoles.push({ 
                            roleIndex, 
                            roleId, 
                            fromType: constraint.fromType, 
                            toType: constraint.toType 
                        });
                    }
                }
            }
        }
        
        if (substitutionRoles.length === 0) {
            // No substitutions for this count type, so physical = final
            this.encodePhysicalEqualsInPlay(countType, solver);
            return;
        }
        
        // Create substitution chain: final -> after_substitution_role_X -> physical
        let prevPrefix = `final_${countType}`;
        
        for (const { roleIndex, roleId, fromType, toType } of substitutionRoles) {
            const currentPrefix = `after_substitution_role_${roleIndex}_${countType}`;
            this.encodePhysicalSubstitution(prevPrefix, currentPrefix, roleId, countType, fromType, toType, solver);
            prevPrefix = currentPrefix;
        }
        
        // Final step: last substitution -> physical
        this.encodePhysicalFinalStep(prevPrefix, `physical_${countType}`, solver);
    }
    
    private encodePhysicalSubstitution(prevPrefix: string, currentPrefix: string, roleId: string, countType: string, fromType: string, toType: string, solver: SATSolver): void {
        const roleVar = solver.addVariable(`${roleId}_present`);
        
        // For reasonable count ranges (0-15)
        for (let count = 0; count <= 15; count++) {
            const prevVar = solver.addVariable(`${prevPrefix}_${count}`);
            const currentVar = solver.addVariable(`${currentPrefix}_${count}`);
            
            if (countType === fromType) {
                // This count type decreases by 1 in physical bag when role is present
                const decreasedVar = solver.addVariable(`${currentPrefix}_${count - 1}`);
                
                // Role present: prevPrefix_count => currentPrefix_(count-1)
                if (count > 0) {
                    solver.addClause([-roleVar, -prevVar, decreasedVar]);
                }
                
                // Role not present: prevPrefix_count => currentPrefix_count
                solver.addClause([roleVar, -prevVar, currentVar]);
                
            } else if (countType === toType) {
                // This count type increases by 1 in physical bag when role is present
                const increasedVar = solver.addVariable(`${currentPrefix}_${count + 1}`);
                
                // Role present: prevPrefix_count => currentPrefix_(count+1)
                if (count < 15) {
                    solver.addClause([-roleVar, -prevVar, increasedVar]);
                }
                
                // Role not present: prevPrefix_count => currentPrefix_count
                solver.addClause([roleVar, -prevVar, currentVar]);
            }
        }
    }
    
    private encodePhysicalEqualsInPlay(countType: string, solver: SATSolver): void {
        // If no substitutions: physical_X = final_X
        for (let count = 0; count <= 15; count++) {
            const finalVar = solver.addVariable(`final_${countType}_${count}`);
            const physicalVar = solver.addVariable(`physical_${countType}_${count}`);
            
            // final_X <=> physical_X (both directions)
            solver.addClause([-finalVar, physicalVar]);   // final => physical
            solver.addClause([finalVar, -physicalVar]);   // physical => final
        }
    }
    
    private encodePhysicalFinalStep(prevPrefix: string, physicalPrefix: string, solver: SATSolver): void {
        // Final mapping: prevPrefix_X => physicalPrefix_X
        for (let count = 0; count <= 15; count++) {
            const prevVar = solver.addVariable(`${prevPrefix}_${count}`);
            const physicalVar = solver.addVariable(`${physicalPrefix}_${count}`);
            
            // prevPrefix_X <=> physicalPrefix_X
            solver.addClause([-prevVar, physicalVar]);
            solver.addClause([prevVar, -physicalVar]);
        }
    }

    private encodeConsistencyRules(solver: SATSolver): void {
        // Add constraints ensuring exactly one count is true for each type
        const countTypes = ['townsfolk', 'outsider', 'minion', 'demon'];
        const prefixes = ['base', 'final', 'physical'];
        
        for (const prefix of prefixes) {
            for (const countType of countTypes) {
                this.encodeExactlyOneCount(solver, `${prefix}_${countType}`, 0, 15);
            }
        }
        
        // Player count exactly-one constraint
        this.encodeExactlyOneCount(solver, 'player_count', 5, 15);
    }
    
    private encodeExactlyOneCount(solver: SATSolver, prefix: string, min: number, max: number): void {
        const vars: number[] = [];
        
        // Create all variables
        for (let count = min; count <= max; count++) {
            const varId = solver.addVariable(`${prefix}_${count}`);
            vars.push(varId);
        }
        
        // At least one must be true
        solver.addClause(vars);
        
        // At most one can be true (pairwise constraints)
        for (let i = 0; i < vars.length; i++) {
            for (let j = i + 1; j < vars.length; j++) {
                solver.addClause([-vars[i], -vars[j]]);
            }
        }
    }
}