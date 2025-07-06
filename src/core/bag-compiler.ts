// Compiler from bag observations to SAT constraints (specific facts)
import { Script } from '../core/scripts';
import { RoleDistribution, getRole } from '../core/roles';
import { ScriptToSATCompiler } from '../core/script-compiler';
import { SATSolver } from '../core/solver';

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
    
    // Generate a legal bag setup for given script and player count
    async generateLegalBag(script: Script, playerCount: number, preferences?: {
        mustInclude?: string[],
        mustExclude?: string[]
    }): Promise<{
        success: boolean,
        selectedRoles?: string[],
        inPlayDistribution?: RoleDistribution,
        physicalBag?: Map<string, number>,
        model?: any
    }> {
        // Reset solver for new problem
        this.solver.reset();
        
        console.log(`\n=== Generating Legal Bag (${playerCount} players) ===`);
        
        // Step 1: Add general rules from script WITH role enumeration
        const scriptVarCount = this.scriptCompiler.compileScriptToSAT(script, this.solver, true);
        
        // Step 2: Force specific player count
        const playerCountVar = this.solver.addVariable(`player_count_${playerCount}`);
        this.solver.addUnitClause(playerCountVar, true);
        
        // Force all other player counts to false
        for (let count = 5; count <= 15; count++) {
            if (count !== playerCount) {
                const otherPlayerCountVar = this.solver.addVariable(`player_count_${count}`);
                this.solver.addUnitClause(otherPlayerCountVar, false);
            }
        }
        
        // Apply preferences
        if (preferences?.mustInclude) {
            console.log(`Must include: ${preferences.mustInclude.join(', ')}`);
            for (const roleId of preferences.mustInclude) {
                const roleVar = this.solver.addVariable(`${roleId}_present`);
                this.solver.addUnitClause(roleVar, true);
            }
        }
        
        if (preferences?.mustExclude) {
            console.log(`Must exclude: ${preferences.mustExclude.join(', ')}`);
            for (const roleId of preferences.mustExclude) {
                const roleVar = this.solver.addVariable(`${roleId}_present`);
                this.solver.addUnitClause(roleVar, false);
            }
        }
        
        console.log(`Script variables: ${scriptVarCount}`);
        console.log(`Total variables: ${this.solver.getVariableCount()}`);
        console.log(`Total clauses: ${this.solver.getClauseCount()}`);
        
        // Step 3: Solve
        const result = this.solver.solveWithModel();
        
        if (!result.satisfiable || !result.model) {
            return { success: false };
        }
        
        // Step 4: Extract the generated setup
        const selectedRoles = this.extractSelectedRoles(script, result.model);
        const inPlayDistribution = this.extractInPlayDistribution(result.model);
        const physicalBag = this.extractPhysicalBag(selectedRoles, result.model);
        
        return {
            success: true,
            selectedRoles,
            inPlayDistribution,
            physicalBag,
            model: result.model
        };
    }

    // Generate multiple diverse legal bag setups using blocking clauses
    async generateMultipleLegalBags(script: Script, playerCount: number, options?: {
        mustInclude?: string[],
        mustExclude?: string[],
        maxSolutions?: number,
        avoidSimilar?: boolean,  // If true, try to generate more diverse solutions
        useVariableIndirection?: boolean,  // If true, use variable indirection to reduce solver bias
        useIdentityPermutation?: boolean,   // If true, use identity permutation for testing
        customPermutation?: string[]       // If provided, use this specific role ordering
    }): Promise<{
        success: boolean,
        solutions: Array<{
            selectedRoles: string[],
            inPlayDistribution: RoleDistribution,
            physicalBag: Map<string, number>,
            model?: any
        }>
    }> {
        const maxSolutions = options?.maxSolutions || 5;
        const solutions: Array<{
            selectedRoles: string[],
            inPlayDistribution: RoleDistribution,
            physicalBag: Map<string, number>,
            model?: any
        }> = [];

        console.log(`\n=== Generating ${maxSolutions} Diverse Legal Bags (${playerCount} players) ===`);

        // Reset solver for new problem
        this.solver.reset();
        
        // Step 1: Add general rules from script WITH role enumeration
        const scriptVarCount = this.scriptCompiler.compileScriptToSAT(script, this.solver, true);
        
        // Step 2: Force specific player count
        const playerCountVar = this.solver.addVariable(`player_count_${playerCount}`);
        this.solver.addUnitClause(playerCountVar, true);
        
        // Force all other player counts to false
        for (let count = 5; count <= 15; count++) {
            if (count !== playerCount) {
                const otherCountVar = this.solver.addVariable(`player_count_${count}`);
                this.solver.addUnitClause(otherCountVar, false);
            }
        }
        
        // Step 3: Add preferences
        if (options?.mustInclude) {
            for (const roleId of options.mustInclude) {
                const roleVar = this.solver.getVariableId(`${roleId}_present`);
                if (roleVar) {
                    console.log(`Must include: ${roleId}`);
                    this.solver.addUnitClause(roleVar, true);
                }
            }
        }
        
        if (options?.mustExclude) {
            for (const roleId of options.mustExclude) {
                const roleVar = this.solver.getVariableId(`${roleId}_present`);
                if (roleVar) {
                    console.log(`Must exclude: ${roleId}`);
                    this.solver.addUnitClause(roleVar, false);
                }
            }
        }

        // Step 4: Add variable indirection to eliminate VSIDS bias (optional)
        if (options?.useVariableIndirection) {
            this.scriptCompiler.addVariableIndirection(script, this.solver, undefined, options?.useIdentityPermutation, options?.customPermutation);
        }

        console.log(`Script variables: ${scriptVarCount}`);
        console.log(`Total variables: ${this.solver.getVariableCount()}`);
        console.log(`Total clauses: ${this.solver.getClauseCount()}`);

        // Step 5: Generate multiple solutions using blocking clauses
        for (let i = 0; i < maxSolutions; i++) {
            const result = this.solver.solveWithModel();
            
            if (!result.satisfiable || !result.model) {
                console.log(`Found ${i} solutions (no more available)`);
                break;
            }

            // Extract this solution
            const selectedRoles = this.extractSelectedRoles(script, result.model);
            const inPlayDistribution = this.extractInPlayDistribution(result.model);
            const physicalBag = this.extractPhysicalBag(selectedRoles, result.model);

            solutions.push({
                selectedRoles,
                inPlayDistribution,
                physicalBag,
                model: result.model
            });

            console.log(`Solution ${i + 1}: [${selectedRoles.join(', ')}]`);

            // Create blocking clause to exclude this solution
            // Block ONLY the selected roles (not the entire role space)
            const blockingClause: number[] = [];
            for (const roleId of selectedRoles) {
                const roleVar = this.solver.getVariableId(`${roleId}_present`);
                if (roleVar) {
                    // Block this role: add -var (NOT present)
                    blockingClause.push(-roleVar);
                }
            }

            // Add the blocking clause to prevent this exact role combination
            if (blockingClause.length > 0) {
                this.solver.addClause(blockingClause);
                // Blocking clause details removed for cleaner output
            } else {
                console.log("  Warning: Could not create blocking clause - no role variables found");
            }
        }

        return {
            success: solutions.length > 0,
            solutions
        };
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
        console.log(`Total clauses: ${this.solver.getClauseCount()}`);
        
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
    
    private extractSelectedRoles(script: Script, model: Record<string, boolean>): string[] {
        const selectedRoles: string[] = [];
        
        for (const roleId of script.roleIds) {
            if (model[`${roleId}_present`] === true) {
                selectedRoles.push(roleId);
            }
        }
        
        return selectedRoles;
    }
    
    private extractInPlayDistribution(model: Record<string, boolean>): RoleDistribution {
        const distribution: RoleDistribution = {
            Townsfolk: 0,
            Outsider: 0,
            Minion: 0,
            Demon: 0
        };
        
        const typeKeys = ['townsfolk', 'outsider', 'minion', 'demon'] as const;
        const typeMapping = {
            townsfolk: 'Townsfolk',
            outsider: 'Outsider', 
            minion: 'Minion',
            demon: 'Demon'
        } as const;
        
        for (const typeKey of typeKeys) {
            for (let count = 0; count <= 15; count++) {
                if (model[`final_${typeKey}_${count}`] === true) {
                    distribution[typeMapping[typeKey]] = count;
                    break;
                }
            }
        }
        
        return distribution;
    }
    
    private extractPhysicalBag(selectedRoles: string[], model: Record<string, boolean>): Map<string, number> {
        // Extract physical bag from SAT model to handle substitutions correctly
        const physicalCounts = this.extractPhysicalCounts(model);
        
        // Generate actual tokens that match the physical counts
        return this.generatePhysicalTokens(selectedRoles, physicalCounts, model);
    }
    
    private extractPhysicalCounts(model: Record<string, boolean>): RoleDistribution {
        const counts: RoleDistribution = {
            Townsfolk: 0,
            Outsider: 0,
            Minion: 0,
            Demon: 0
        };
        
        const typeKeys = ['townsfolk', 'outsider', 'minion', 'demon'] as const;
        const typeMapping = {
            townsfolk: 'Townsfolk',
            outsider: 'Outsider', 
            minion: 'Minion',
            demon: 'Demon'
        } as const;
        
        for (const typeKey of typeKeys) {
            for (let count = 0; count <= 15; count++) {
                if (model[`physical_${typeKey}_${count}`] === true) {
                    counts[typeMapping[typeKey]] = count;
                    break;
                }
            }
        }
        
        return counts;
    }
    
    private generatePhysicalTokens(selectedRoles: string[], physicalCounts: RoleDistribution, model: Record<string, boolean>): Map<string, number> {
        const physicalBag = new Map<string, number>();
        const { getRole } = require('./roles');
        
        // Check which roles cause physical bag substitutions
        const hasDrunk = selectedRoles.includes('drunk') && model['drunk_present'] === true;
        
        // Start with basic role tokens
        const rolesByType: Record<string, string[]> = {
            Townsfolk: [],
            Outsider: [],
            Minion: [],
            Demon: []
        };
        
        // Categorize selected roles by type
        for (const roleId of selectedRoles) {
            const role = getRole(roleId);
            if (role) {
                rolesByType[role.type].push(roleId);
            }
        }
        
        // Generate tokens for each type to match physical counts
        for (const [typeName, count] of Object.entries(physicalCounts)) {
            const rolesOfType = rolesByType[typeName];
            
            if (typeName === 'Outsider' && hasDrunk) {
                // Special case: Drunk is in-play as outsider but not in physical bag
                const nonDrunkOutsiders = rolesOfType.filter(r => r !== 'drunk');
                
                // Add non-drunk outsiders first
                for (const roleId of nonDrunkOutsiders) {
                    physicalBag.set(roleId, 1);
                }
                
                // Note: physical outsider count should be less than in-play outsider count
                // The difference should be compensated by extra townsfolk tokens
                
            } else if (typeName === 'Townsfolk' && hasDrunk) {
                // Special case: Extra townsfolk token(s) due to drunk substitution
                let tokensPlaced = 0;
                
                // Add all townsfolk roles first
                for (const roleId of rolesOfType) {
                    physicalBag.set(roleId, 1);
                    tokensPlaced++;
                }
                
                // Add extra townsfolk tokens if needed
                while (tokensPlaced < count) {
                    // Find a townsfolk role not in the game to use as substitute token
                    const allTownsfolk = ['washerwoman', 'librarian', 'investigator', 'chef', 'empath', 
                                        'fortune_teller', 'undertaker', 'monk', 'ravenkeeper', 'virgin', 
                                        'slayer', 'soldier', 'mayor'];
                    
                    const extraToken = allTownsfolk.find(role => !selectedRoles.includes(role));
                    if (extraToken) {
                        physicalBag.set(extraToken, (physicalBag.get(extraToken) || 0) + 1);
                        tokensPlaced++;
                    } else {
                        // Fallback: duplicate an existing townsfolk token
                        const existingTownsfolk = rolesOfType[0];
                        if (existingTownsfolk) {
                            physicalBag.set(existingTownsfolk, (physicalBag.get(existingTownsfolk) || 0) + 1);
                            tokensPlaced++;
                        } else {
                            break; // Safety break
                        }
                    }
                }
                
            } else {
                // Normal case: add tokens for all roles of this type
                for (const roleId of rolesOfType) {
                    physicalBag.set(roleId, 1);
                }
            }
        }
        
        return physicalBag;
    }
}