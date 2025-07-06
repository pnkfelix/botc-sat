// Compiler from script DSL to SAT constraints (general rules)
import { Script } from '../core/scripts';
import { getRole, getBaseSetup } from '../core/roles';
import { SATSolver } from '../core/solver';

export class ScriptToSATCompiler {
    
    // Generate SAT constraints that encode all the rules from a script
    // These are conditional rules that apply when certain roles are present
    compileScriptToSAT(script: Script, solver: SATSolver, includeRoleEnumeration: boolean = false): number {
        const initialVarCount = solver.getVariableCount();
        
        console.log(`Compiling script ${script.name} to SAT constraints...`);
        
        // 1. Encode base setup rules for all player counts
        this.encodeBaseSetupRules(solver);
        
        // 2. Encode role-specific modifications from DSL
        this.encodeRoleModifications(script, solver);
        
        // 3. Encode physical bag substitutions
        this.encodePhysicalBagSubstitutions(script, solver);
        
        // 4. Encode role enumeration constraints (for generation mode)
        if (includeRoleEnumeration) {
            this.encodeRoleEnumerationConstraints(script, solver);
        }
        
        // 5. Encode consistency relationships
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

    private encodeRoleEnumerationConstraints(script: Script, solver: SATSolver): void {
        console.log("Adding role enumeration constraints for bag generation...");
        
        // For each player count, enforce exactly that many roles are present
        for (let playerCount = 5; playerCount <= 15; playerCount++) {
            this.encodePlayerCountRoleSelection(script, playerCount, solver);
        }
        
        // For each player count and type, enforce role type counts match final counts
        for (let playerCount = 5; playerCount <= 15; playerCount++) {
            this.encodeRoleTypeMatching(script, playerCount, solver);
        }
    }
    
    private encodePlayerCountRoleSelection(script: Script, playerCount: number, solver: SATSolver): void {
        // If player_count_N = true, then exactly N roles must be present
        const playerCountVar = solver.addVariable(`player_count_${playerCount}`);
        const roleVars: number[] = [];
        
        // Collect all role present variables
        for (const roleId of script.roleIds) {
            const roleVar = solver.addVariable(`${roleId}_present`);
            roleVars.push(roleVar);
        }
        
        // Encode: player_count_N => exactly N roles present
        this.encodeConditionalExactlyN([playerCountVar], roleVars, playerCount, solver);
    }
    
    private encodeRoleTypeMatching(script: Script, playerCount: number, solver: SATSolver): void {
        const playerCountVar = solver.addVariable(`player_count_${playerCount}`);
        const roleTypes = ['Townsfolk', 'Outsider', 'Minion', 'Demon'];
        
        for (const roleType of roleTypes) {
            // Get roles of this type
            const rolesOfType: string[] = [];
            for (const roleId of script.roleIds) {
                const role = getRole(roleId);
                if (role && role.type === roleType) {
                    rolesOfType.push(roleId);
                }
            }
            
            if (rolesOfType.length === 0) continue;
            
            // For each possible count (0-15), enforce matching
            for (let count = 0; count <= 15; count++) {
                const finalCountVar = solver.addVariable(`final_${roleType.toLowerCase()}_${count}`);
                const roleVars = rolesOfType.map(roleId => solver.addVariable(`${roleId}_present`));
                
                // If player_count_N AND final_type_count = K, then exactly K roles of type must be present
                const conditionVars = [playerCountVar, finalCountVar];
                this.encodeConditionalExactlyN(conditionVars, roleVars, count, solver);
            }
        }
    }
    
    private encodeConditionalExactlyN(conditionVars: number[], targetVars: number[], n: number, solver: SATSolver): void {
        // Encode: (condition1 AND condition2 AND ...) => exactly N of targetVars are true
        // Using sequential counter encoding for efficiency
        
        if (targetVars.length < n) {
            // Impossible case: need more roles than available
            // Add contradiction: NOT (condition1 AND condition2 AND ...)
            const negatedConditions = conditionVars.map(v => -v);
            solver.addClause(negatedConditions);
            return;
        }
        
        if (targetVars.length === 0 || n === 0) {
            if (n === 0) {
                // All target vars must be false when conditions hold
                for (const targetVar of targetVars) {
                    const clause = [...conditionVars.map(v => -v), -targetVar];
                    solver.addClause(clause);
                }
            } else {
                // n > 0 but no target vars - contradiction
                const negatedConditions = conditionVars.map(v => -v);
                solver.addClause(negatedConditions);
            }
            return;
        }
        
        // Use sequential counter encoding
        this.encodeConditionalSequentialCounter(conditionVars, targetVars, n, solver);
    }
    
    private encodeConditionalSequentialCounter(conditionVars: number[], targetVars: number[], n: number, solver: SATSolver): void {
        // Sequential counter encoding: create auxiliary variables s[i][j]
        // s[i][j] = "among first i target variables, at least j are true"
        // Much more efficient than combinatorial encoding: O(m*n) vs O(C(m,n))
        
        const m = targetVars.length;
        
        // Create auxiliary variables s[i][j] for i=1..m, j=1..min(i,n+1)
        // We need n+1 to distinguish between "exactly n" and "more than n"
        const maxJ = Math.min(m, n + 1);
        const auxVars: number[][] = [];
        
        for (let i = 1; i <= m; i++) {
            auxVars[i] = [];
            for (let j = 1; j <= Math.min(i, maxJ); j++) {
                auxVars[i][j] = solver.addVariable(`seq_${i}_${j}_${Date.now()}_${Math.random()}`);
            }
        }
        
        // Base case: s[1][1] <=> targetVars[0]
        if (auxVars[1] && auxVars[1][1]) {
            solver.addClause([-targetVars[0], auxVars[1][1]]);  // target[0] => s[1][1]
            solver.addClause([targetVars[0], -auxVars[1][1]]);  // s[1][1] => target[0]
        }
        
        // Recursive cases: s[i][j] represents counting logic
        for (let i = 2; i <= m; i++) {
            const target_i = targetVars[i - 1]; // targetVars is 0-indexed
            
            for (let j = 1; j <= Math.min(i, maxJ); j++) {
                const s_i_j = auxVars[i][j];
                
                if (j === 1) {
                    // s[i][1]: at least 1 among first i variables
                    // s[i][1] <=> s[i-1][1] OR target[i-1]
                    const s_prev_1 = i > 1 && auxVars[i-1] ? auxVars[i-1][1] : null;
                    
                    if (s_prev_1) {
                        // s[i][1] => s[i-1][1] OR target[i-1]
                        solver.addClause([-s_i_j, s_prev_1, target_i]);
                        // (s[i-1][1] OR target[i-1]) => s[i][1]
                        solver.addClause([s_i_j, -s_prev_1]);
                        solver.addClause([s_i_j, -target_i]);
                    } else {
                        // i=1 case, s[1][1] <=> target[0] (handled above)
                        solver.addClause([-s_i_j, target_i]);
                        solver.addClause([s_i_j, -target_i]);
                    }
                } else {
                    // s[i][j]: at least j among first i variables (j > 1)
                    // s[i][j] <=> s[i-1][j] OR (s[i-1][j-1] AND target[i-1])
                    const s_prev_j = auxVars[i-1] ? auxVars[i-1][j] : null;
                    const s_prev_j_minus_1 = auxVars[i-1] ? auxVars[i-1][j-1] : null;
                    
                    if (s_prev_j && s_prev_j_minus_1) {
                        // s[i][j] => s[i-1][j] OR (s[i-1][j-1] AND target[i-1])
                        solver.addClause([-s_i_j, s_prev_j, s_prev_j_minus_1]);
                        solver.addClause([-s_i_j, s_prev_j, target_i]);
                        
                        // (s[i-1][j] OR (s[i-1][j-1] AND target[i-1])) => s[i][j]
                        solver.addClause([s_i_j, -s_prev_j]);
                        solver.addClause([s_i_j, -s_prev_j_minus_1, -target_i]);
                    } else if (s_prev_j_minus_1) {
                        // No s[i-1][j], so s[i][j] <=> (s[i-1][j-1] AND target[i-1])
                        solver.addClause([-s_i_j, s_prev_j_minus_1]);
                        solver.addClause([-s_i_j, target_i]);
                        solver.addClause([s_i_j, -s_prev_j_minus_1, -target_i]);
                    }
                }
            }
        }
        
        // Final constraints: conditions => exactly n target variables true
        // This means: s[m][n] = true AND (if n < m) s[m][n+1] = false
        
        const s_m_n = auxVars[m] ? auxVars[m][n] : null;
        const s_m_n_plus_1 = auxVars[m] && n + 1 <= maxJ ? auxVars[m][n + 1] : null;
        
        if (s_m_n) {
            // conditions => s[m][n] (at least n)
            const atLeastClause = [...conditionVars.map(v => -v), s_m_n];
            solver.addClause(atLeastClause);
        }
        
        if (s_m_n_plus_1) {
            // conditions => NOT s[m][n+1] (at most n)
            const atMostClause = [...conditionVars.map(v => -v), -s_m_n_plus_1];
            solver.addClause(atMostClause);
        } else if (n < m) {
            // If we don't have s[m][n+1], we need another way to enforce "at most n"
            // Fall back to simpler encoding for this edge case
            this.encodeSimpleAtMostN(conditionVars, targetVars, n, solver);
        }
    }
    
    private encodeSimpleAtMostN(conditionVars: number[], targetVars: number[], n: number, solver: SATSolver): void {
        // Simple at-most-n encoding: for any (n+1) variables, at least one must be false
        // Only used as fallback when sequential counter doesn't cover the range
        
        if (n >= targetVars.length) return; // Always satisfied
        
        const combinations = this.generateCombinations(targetVars, n + 1);
        for (const combo of combinations) {
            // conditions => NOT (all n+1 variables true)
            const clause = [...conditionVars.map(v => -v), ...combo.map(v => -v)];
            solver.addClause(clause);
        }
    }
    
    private generateCombinations(vars: number[], k: number): number[][] {
        if (k === 0) return [[]];
        if (k > vars.length) return [];
        if (k === vars.length) return [vars.slice()];
        
        const result: number[][] = [];
        
        // Use iterative approach to avoid deep recursion
        const indices = Array.from({ length: k }, (_, i) => i);
        
        while (true) {
            // Add current combination
            result.push(indices.map(i => vars[i]));
            
            // Find rightmost index that can be incremented
            let i = k - 1;
            while (i >= 0 && indices[i] === vars.length - k + i) {
                i--;
            }
            
            if (i < 0) break; // All combinations generated
            
            // Increment index and reset following indices
            indices[i]++;
            for (let j = i + 1; j < k; j++) {
                indices[j] = indices[j - 1] + 1;
            }
        }
        
        return result;
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

    // Add variable indirection layer to eliminate VSIDS bias
    // Creates slot variables that inherit solver bias, then randomly maps them to roles
    addVariableIndirection(script: Script, solver: SATSolver, randomSeed?: number, useIdentityPermutation: boolean = false, customPermutation?: string[]): void {
        const roleCount = script.roleIds.length;
        console.log(`Adding variable indirection for ${roleCount} roles to eliminate VSIDS bias...`);
        
        // Step 1: Create slot variables (these will inherit the solver bias)
        const slotVars: number[] = [];
        for (let i = 1; i <= roleCount; i++) {
            const slotVar = solver.addVariable(`slot_${i}`);
            slotVars.push(slotVar);
        }
        
        // Step 2: Generate permutation of roles (custom, identity, or random)
        let shuffledRoles: string[];
        let permutationType: string;
        
        if (customPermutation) {
            // Validate custom permutation has all roles
            if (customPermutation.length !== script.roleIds.length || 
                !script.roleIds.every(role => customPermutation.includes(role))) {
                throw new Error('Custom permutation must contain exactly all script roles');
            }
            shuffledRoles = [...customPermutation];
            permutationType = "CUSTOM";
        } else if (useIdentityPermutation) {
            shuffledRoles = [...script.roleIds];  // Identity permutation: roles in original order
            permutationType = "IDENTITY";
        } else {
            shuffledRoles = this.shuffleArray([...script.roleIds], randomSeed);
            permutationType = "RANDOM";
        }
        console.log(`${permutationType} permutation: ${shuffledRoles.map((role, idx) => `slot_${idx + 1}↔${role}`).join(', ')}`);
        
        // Step 3: Add biconditional constraints: slot_i ↔ role_j_present
        for (let i = 0; i < roleCount; i++) {
            const slotVar = slotVars[i];
            const roleId = shuffledRoles[i];
            const roleVar = solver.addVariable(`${roleId}_present`);
            
            // Biconditional: slot_i ↔ role_j_present
            // Encoded as: (slot_i → role_j_present) ∧ (role_j_present → slot_i)
            // CNF: (¬slot_i ∨ role_j_present) ∧ (¬role_j_present ∨ slot_i)
            solver.addClause([-slotVar, roleVar]);   // slot_i → role_j_present
            solver.addClause([-roleVar, slotVar]);   // role_j_present → slot_i
        }
        
        console.log(`Added ${roleCount} slot variables and ${roleCount * 2} biconditional clauses`);
    }

    // Fisher-Yates shuffle with optional seed for reproducibility
    private shuffleArray<T>(array: T[], seed?: number): T[] {
        const shuffled = [...array];
        
        // Simple seeded random number generator (Linear Congruential Generator)
        let rng = seed !== undefined ? seed : Math.floor(Math.random() * 1000000);
        const seededRandom = (): number => {
            rng = (rng * 1664525 + 1013904223) % (2 ** 32);
            return rng / (2 ** 32);
        };
        
        // Fisher-Yates shuffle
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled;
    }
}