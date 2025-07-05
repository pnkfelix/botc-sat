// Compiler from bag observations to SAT constraints (specific facts)
import { Script } from './scripts';
import { RoleDistribution, getRole } from './roles';
import { ScriptToSATCompiler } from './script-compiler';
import { SATSolver } from './solver';

export interface BagLegalityProblem {
    script: Script;
    playerCount: number;
    selectedRoles: string[];  // Specific roles chosen for this game
    
    // The question: is this (in-play distribution, physical bag) pair legal?
    inPlayDistribution: RoleDistribution;
    physicalBag: Map<string, number>;  // role ID -> count in bag
}

export class BagLegalityValidator {
    private solver: SATSolver;
    private scriptCompiler: ScriptToSATCompiler;
    
    constructor() {
        this.solver = new SATSolver();
        this.scriptCompiler = new ScriptToSATCompiler();
    }
    
    // Check if a bag setup is legal according to script rules
    async checkBagLegality(problem: BagLegalityProblem): Promise<{ 
        legal: boolean, 
        model?: any
    }> {
        // Reset solver for new problem
        this.solver.reset();
        
        // Step 1: Add general rules from script
        const scriptVarCount = this.scriptCompiler.compileScriptToSAT(problem.script, this.solver);
        
        // Step 2: Add specific observations from bag
        const bagVarCount = this.compileBagObservations(problem, this.solver);
        
        console.log(`Script variables: ${scriptVarCount}`);
        console.log(`Bag variables: ${bagVarCount}`);
        console.log(`Total variables: ${this.solver.getVariableCount()}`);
        
        // Step 3: Solve
        const result = this.solver.solveWithModel();
        
        return {
            legal: result.satisfiable,
            model: result.model
        };
    }
    
    // Convert bag observations to SAT assertions
    private compileBagObservations(problem: BagLegalityProblem, solver: SATSolver): number {
        const initialVarCount = solver.getVariableCount();
        
        console.log(`Adding observations for ${problem.playerCount} players, roles: ${problem.selectedRoles.join(', ')}`);
        
        // 1. Assert player count (only one can be true)
        const playerCountVars: number[] = [];
        for (let count = 5; count <= 15; count++) {
            const varId = solver.addVariable(`player_count_${count}`);
            playerCountVars.push(varId);
            if (count === problem.playerCount) {
                solver.addUnitClause(varId, true);
            } else {
                solver.addUnitClause(varId, false);
            }
        }
        
        // 2. Assert which roles are present
        const allPossibleRoles = problem.script.roleIds;
        for (const roleId of allPossibleRoles) {
            const varId = solver.addVariable(`${roleId}_present`);
            const isPresent = problem.selectedRoles.includes(roleId);
            solver.addUnitClause(varId, isPresent);
        }
        
        // 3. Assert actual in-play distribution
        const finalTownsfolk = solver.addVariable(`final_townsfolk_${problem.inPlayDistribution.Townsfolk}`);
        const finalOutsider = solver.addVariable(`final_outsider_${problem.inPlayDistribution.Outsider}`);
        const finalMinion = solver.addVariable(`final_minion_${problem.inPlayDistribution.Minion}`);
        const finalDemon = solver.addVariable(`final_demon_${problem.inPlayDistribution.Demon}`);
        
        solver.addUnitClause(finalTownsfolk, true);
        solver.addUnitClause(finalOutsider, true);
        solver.addUnitClause(finalMinion, true);
        solver.addUnitClause(finalDemon, true);
        
        // 4. Assert actual physical bag distribution
        const physicalCounts = this.calculatePhysicalTypeCounts(problem.physicalBag);
        const physicalTownsfolk = solver.addVariable(`physical_townsfolk_${physicalCounts.Townsfolk}`);
        const physicalOutsider = solver.addVariable(`physical_outsider_${physicalCounts.Outsider}`);
        const physicalMinion = solver.addVariable(`physical_minion_${physicalCounts.Minion}`);
        const physicalDemon = solver.addVariable(`physical_demon_${physicalCounts.Demon}`);
        
        solver.addUnitClause(physicalTownsfolk, true);
        solver.addUnitClause(physicalOutsider, true);
        solver.addUnitClause(physicalMinion, true);
        solver.addUnitClause(physicalDemon, true);
        
        const bagVarCount = solver.getVariableCount() - initialVarCount;
        console.log(`Generated ${bagVarCount} bag variables`);
        return bagVarCount;
    }
    
    private calculatePhysicalTypeCounts(physicalBag: Map<string, number>): RoleDistribution {
        const counts: RoleDistribution = {
            Townsfolk: 0,
            Outsider: 0,
            Minion: 0,
            Demon: 0
        };
        
        for (const [roleId, count] of physicalBag) {
            const role = getRole(roleId);
            if (role) {
                counts[role.type] += count;
            }
        }
        
        return counts;
    }
}