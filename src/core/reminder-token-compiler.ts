// Generic compiler for reminder token placement constraints in SAT solving
import { Script } from '../core/scripts';
import { getRole, TokenPlacementConstraint } from '../core/roles';
import { SATSolver } from '../core/solver';
import { GrimoireState } from '../core/grimoire';

/**
 * Generic compiler for reminder token placement rules into SAT constraints.
 * Works with TokenPlacementConstraint DSL to avoid hardcoding role-specific knowledge.
 * 
 * SAT Variable Design:
 * - token_placed_<role>_<token>_at_<position>: true if token <role>:<token> is placed at player position
 * - <role>_present: true if role is in the game (from existing script compiler)
 * - player_<position>_is_<role>: true if player at position has specific role
 * 
 * The compiler interprets TokenPlacementConstraint DSL expressions to generate appropriate constraints.
 */
export class ReminderTokenCompiler {
    
    /**
     * Add reminder token placement constraints to the SAT solver.
     * This enforces legal token placement rules for a given grimoire state.
     */
    compileReminderTokenConstraints(
        script: Script, 
        solver: SATSolver, 
        playerCount: number,
        grimoireState?: GrimoireState  // Optional: if provided, constrains to specific placement
    ): number {
        const initialVarCount = solver.getVariableCount();
        
        console.log(`Adding reminder token constraints for ${playerCount} players...`);
        
        // 1. Create variables for all possible token placements
        this.createTokenPlacementVariables(script, solver, playerCount);
        
        // 2. Add token constraints from DSL
        this.addTokenConstraints(script, solver, playerCount);
        
        // 5. If grimoire state is provided, constrain to match observed placements
        if (grimoireState) {
            this.addObservedPlacementConstraints(script, grimoireState, solver);
        }
        
        const tokenVarCount = solver.getVariableCount() - initialVarCount;
        console.log(`Generated ${tokenVarCount} reminder token variables`);
        return tokenVarCount;
    }
    
    private createTokenPlacementVariables(script: Script, solver: SATSolver, playerCount: number): void {
        // For each role in the script, create variables for placing each of its tokens at each position
        for (const roleId of script.roleIds) {
            const role = getRole(roleId);
            if (!role || !role.reminderTokens) continue;
            
            for (const token of role.reminderTokens) {
                for (let position = 0; position < playerCount; position++) {
                    const varName = `token_placed_${roleId}_${token}_at_${position}`;
                    solver.addVariable(varName);
                }
            }
        }
    }
    
    private addTokenConstraints(script: Script, solver: SATSolver, playerCount: number): void {
        // Process all token constraints from the DSL for all roles in the script
        
        for (const roleId of script.roleIds) {
            const role = getRole(roleId);
            if (!role || !role.tokenConstraints) continue;
            
            for (const constraint of role.tokenConstraints) {
                this.compileTokenConstraint(roleId, constraint, solver, playerCount);
            }
        }
    }
    
    private compileTokenConstraint(roleId: string, constraint: TokenPlacementConstraint, solver: SATSolver, playerCount: number): void {
        console.log(`Compiling token constraint: ${constraint.description}`);
        
        switch (constraint.type) {
            case 'requires_role_present':
                this.compileRequiresRolePresent(roleId, constraint, solver, playerCount);
                break;
                
            case 'only_on_role':
                this.compileOnlyOnRole(roleId, constraint, solver, playerCount);
                break;
                
            case 'only_on_role_type':
                this.compileOnlyOnRoleType(roleId, constraint, solver, playerCount);
                break;
                
            case 'information_token':
                this.compileInformationToken(roleId, constraint, solver, playerCount);
                break;
                
            case 'conditional_placement':
                this.compileConditionalPlacement(roleId, constraint, solver, playerCount);
                break;
                
            case 'role_requires_token':
                this.compileRoleRequiresToken(roleId, constraint, solver, playerCount);
                break;
                
            default:
                console.warn(`Unknown token constraint type: ${constraint.type}`);
        }
    }
    
    private compileRequiresRolePresent(roleId: string, constraint: TokenPlacementConstraint, solver: SATSolver, playerCount: number): void {
        if (!constraint.requiresRole) return;
        
        const requiredRoleId = constraint.requiresRole.roleId;
        const requiredRoleVar = solver.getVariableId(`${requiredRoleId}_present`) || 
                               solver.addVariable(`${requiredRoleId}_present`);
        
        // For all placements of this token: token_placed => required_role_present
        for (let position = 0; position < playerCount; position++) {
            const tokenPlacementVar = solver.getVariableId(`token_placed_${roleId}_${constraint.token}_at_${position}`);
            if (tokenPlacementVar) {
                solver.addClause([-tokenPlacementVar, requiredRoleVar]);
            }
        }
    }
    
    private compileOnlyOnRole(roleId: string, constraint: TokenPlacementConstraint, solver: SATSolver, playerCount: number): void {
        if (!constraint.onlyOnRole) return;
        
        const allowedRoleId = constraint.onlyOnRole.roleId;
        console.log(`  DEBUG: Only-on-role constraint: ${roleId}:${constraint.token} can only be placed on ${allowedRoleId}`);
        
        // For all positions: token_placed_at_position => player_at_position_is_allowed_role
        for (let position = 0; position < playerCount; position++) {
            const tokenPlacementVar = solver.getVariableId(`token_placed_${roleId}_${constraint.token}_at_${position}`);
            if (!tokenPlacementVar) continue;
            
            const playerRoleVar = solver.addVariable(`player_${position}_is_${allowedRoleId}`);
            console.log(`    Position ${position}: IF token_placed_${roleId}_${constraint.token}_at_${position} THEN player_${position}_is_${allowedRoleId}`);
            console.log(`    Clause: [-${tokenPlacementVar}, ${playerRoleVar}]`);
            solver.addClause([-tokenPlacementVar, playerRoleVar]);
        }
    }
    
    private compileOnlyOnRoleType(roleId: string, constraint: TokenPlacementConstraint, solver: SATSolver, playerCount: number): void {
        if (!constraint.onlyOnRoleType) return;
        
        const allowedRoleType = constraint.onlyOnRoleType.roleType;
        
        // For all positions: token_placed_at_position => player_at_position_has_allowed_role_type
        for (let position = 0; position < playerCount; position++) {
            const tokenPlacementVar = solver.getVariableId(`token_placed_${roleId}_${constraint.token}_at_${position}`);
            if (!tokenPlacementVar) continue;
            
            const playerTypeVar = solver.addVariable(`player_${position}_is_${allowedRoleType.toLowerCase()}`);
            solver.addClause([-tokenPlacementVar, playerTypeVar]);
        }
    }
    
    private compileInformationToken(roleId: string, constraint: TokenPlacementConstraint, _solver: SATSolver, _playerCount: number): void {
        // Information tokens can be placed anywhere, no additional position constraints
        // The requires_role_present constraint (if present) handles role presence requirement
        console.log(`Information token ${roleId}:${constraint.token} can be placed anywhere`);
    }
    
    private compileConditionalPlacement(_roleId: string, constraint: TokenPlacementConstraint, _solver: SATSolver, _playerCount: number): void {
        if (!constraint.conditionalPlacement) return;
        
        // TODO: Implement DSL parser for conditional expressions
        // For now, warn that this is not yet implemented
        console.warn(`Conditional placement not yet implemented: ${constraint.conditionalPlacement.condition}`);
    }
    
    private compileRoleRequiresToken(roleId: string, constraint: TokenPlacementConstraint, solver: SATSolver, playerCount: number): void {
        if (!constraint.roleRequiresToken) return;
        
        const requiredRoleId = constraint.roleRequiresToken.roleId;
        const roleVar = solver.getVariableId(`${requiredRoleId}_present`) || 
                       solver.addVariable(`${requiredRoleId}_present`);
        
        console.log(`  DEBUG: Role-requires-token constraint: if ${requiredRoleId} is present, then ${roleId}:${constraint.token} must be placed somewhere`);
        
        // Create a disjunction of all possible placements for this token
        // If role is present, then at least one placement of this token must be true
        const tokenPlacementVars: number[] = [];
        for (let position = 0; position < playerCount; position++) {
            const tokenPlacementVar = solver.getVariableId(`token_placed_${roleId}_${constraint.token}_at_${position}`);
            if (tokenPlacementVar) {
                tokenPlacementVars.push(tokenPlacementVar);
            }
        }
        
        if (tokenPlacementVars.length > 0) {
            // Constraint: role_present => (token_at_0 OR token_at_1 OR ... OR token_at_n)
            // Which is equivalent to: NOT role_present OR token_at_0 OR token_at_1 OR ... OR token_at_n
            const clause = [-roleVar, ...tokenPlacementVars];
            solver.addClause(clause);
            console.log(`    Clause: IF ${requiredRoleId}_present THEN ${roleId}:${constraint.token} must be placed somewhere`);
            console.log(`    Clause: [${clause.join(', ')}]`);
        }
    }
    
    private addObservedPlacementConstraints(script: Script, grimoireState: GrimoireState, solver: SATSolver): void {
        // Rule: If we observe specific token placements in a grimoire, constrain the solver to match
        console.log('Adding observed placement constraints from grimoire...');
        
        for (let position = 0; position < grimoireState.players.length; position++) {
            const player = grimoireState.players[position];
            
            // Force observed tokens to be true at their positions
            for (const tokenString of player.tokens) {
                // Parse token string like "washerwoman:townsfolk" 
                const [roleId, token] = tokenString.split(':');
                if (!roleId || !token) continue;
                
                const tokenPlacementVar = solver.getVariableId(`token_placed_${roleId}_${token}_at_${position}`);
                if (tokenPlacementVar) {
                    console.log(`  Forcing ${roleId}:${token} at position ${position} (${player.name})`);
                    solver.addUnitClause(tokenPlacementVar, true);
                }
            }
            
            // Force the player's role at this position
            const playerRoleVar = solver.addVariable(`player_${position}_is_${player.role}`);
            solver.addUnitClause(playerRoleVar, true);
            console.log(`  Player ${position} (${player.name}) is ${player.role} (variable ${playerRoleVar})`);
        }
        
        // Force roles to be present based on observed players
        const observedRoles = new Set<string>();
        for (const player of grimoireState.players) {
            observedRoles.add(player.role);
        }
        
        for (const roleId of observedRoles) {
            const roleVar = solver.getVariableId(`${roleId}_present`) || solver.addVariable(`${roleId}_present`);
            solver.addUnitClause(roleVar, true);
            console.log(`  Role ${roleId} is present in game`);
        }
        
        // Force roles NOT in the grimoire to be absent
        // This prevents the solver from arbitrarily setting unused role_present variables to true
        const allPossibleRoles = new Set<string>();
        
        // Collect all roles that have variables in the solver
        for (let i = 1; i <= solver.getVariableCount(); i++) {
            const varName = solver.getVariableName(i);
            if (varName && varName.endsWith('_present')) {
                const roleId = varName.slice(0, -8); // Remove '_present' suffix
                allPossibleRoles.add(roleId);
            }
        }
        
        for (const roleId of allPossibleRoles) {
            if (!observedRoles.has(roleId)) {
                const roleVar = solver.getVariableId(`${roleId}_present`);
                if (roleVar) {
                    solver.addUnitClause(roleVar, false);
                    console.log(`  Role ${roleId} is NOT present in game`);
                }
            }
        }
        
        // Force unobserved tokens to be false at all positions
        // This prevents the solver from placing tokens that aren't actually in the grimoire
        this.addUnobservedTokenExclusions(script, grimoireState, solver);
        
        // Add mutual exclusion constraints: each player can only have one role
        this.addPlayerRoleMutualExclusion(grimoireState, solver);
    }
    
    private addPlayerRoleMutualExclusion(grimoireState: GrimoireState, solver: SATSolver): void {
        console.log('Adding mutual exclusion constraints for player roles...');
        
        // Get all role IDs that appear in the grimoire
        const allRoles = new Set<string>();
        for (const player of grimoireState.players) {
            allRoles.add(player.role);
        }
        
        // For each player, collect all possible role variables that might be assigned to them
        for (let position = 0; position < grimoireState.players.length; position++) {
            const player = grimoireState.players[position];
            const playerRoleVars: number[] = [];
            
            // Collect all role variables for this player position that exist in the solver
            for (const roleId of allRoles) {
                const roleVar = solver.getVariableId(`player_${position}_is_${roleId}`);
                if (roleVar) {
                    playerRoleVars.push(roleVar);
                }
            }
            
            // Add mutual exclusion constraints: at most one role per player
            // For each pair of roles, add constraint: NOT(role1 AND role2)
            // Which is equivalent to: NOT role1 OR NOT role2
            for (let i = 0; i < playerRoleVars.length; i++) {
                for (let j = i + 1; j < playerRoleVars.length; j++) {
                    solver.addClause([-playerRoleVars[i], -playerRoleVars[j]]);
                    const role1Name = solver.getVariableName(playerRoleVars[i]);
                    const role2Name = solver.getVariableName(playerRoleVars[j]);
                    console.log(`  ${player.name} cannot be both ${role1Name?.split('_')[2]} and ${role2Name?.split('_')[2]}`);
                }
            }
        }
    }
    
    private addUnobservedTokenExclusions(script: Script, grimoireState: GrimoireState, solver: SATSolver): void {
        console.log('Adding unobserved token exclusions...');
        
        // Collect all tokens that ARE placed in the grimoire
        const observedTokens = new Set<string>();
        for (const player of grimoireState.players) {
            for (const tokenString of player.tokens) {
                observedTokens.add(tokenString);
            }
        }
        
        // For all possible token placement variables, if the token isn't observed, force it to false
        for (let i = 1; i <= solver.getVariableCount(); i++) {
            const varName = solver.getVariableName(i);
            if (!varName) continue;
            
            // Match token placement variables like "token_placed_washerwoman_townsfolk_at_2"
            const match = varName.match(/^token_placed_(.+)_at_(\d+)$/);
            if (match) {
                const [, roleAndToken, positionStr] = match;
                const position = parseInt(positionStr, 10);
                
                // Need to split roleAndToken carefully since both role and token can contain underscores
                // Strategy: Find the role by looking at all possible prefixes and checking if they're valid roles
                let roleId = '';
                let token = '';
                
                // Try progressively longer prefixes to find the role
                const parts = roleAndToken.split('_');
                for (let j = 1; j <= parts.length - 1; j++) {
                    const candidateRole = parts.slice(0, j).join('_');
                    const candidateToken = parts.slice(j).join('_');
                    
                    // Check if this looks like a valid role-token combination by checking the script
                    const role = script.getRoles().find(r => r.id === candidateRole);
                    if (role && role.reminderTokens && role.reminderTokens.includes(candidateToken)) {
                        roleId = candidateRole;
                        token = candidateToken;
                        break;
                    }
                }
                
                if (roleId && token) {
                    const tokenString = `${roleId}:${token}`;
                    
                    // If this specific token at this specific position is not observed, force it to false
                    const player = grimoireState.players[position];
                    const isObservedAtThisPosition = player?.tokens.includes(tokenString);
                    if (!isObservedAtThisPosition) {
                        solver.addUnitClause(i, false);
                        console.log(`  Forcing ${tokenString} NOT at position ${position} (${player?.name || 'unknown'})`);
                    }
                }
            }
        }
    }
    
    
    /**
     * Extract reminder token placement results from a SAT model
     */
    extractTokenPlacements(_solver: SATSolver, model: Record<string, boolean>, playerCount: number): Array<{position: number, roleId: string, token: string}> {
        const placements: Array<{position: number, roleId: string, token: string}> = [];
        
        for (const [varName, value] of Object.entries(model)) {
            if (!value) continue; // Only interested in true variables
            
            // Parse variables like "token_placed_washerwoman_townsfolk_at_3"
            const match = varName.match(/^token_placed_(.+)_(.+)_at_(\d+)$/);
            if (match) {
                const [, roleId, token, positionStr] = match;
                const position = parseInt(positionStr, 10);
                if (position >= 0 && position < playerCount) {
                    placements.push({ position, roleId, token });
                }
            }
        }
        
        return placements.sort((a, b) => a.position - b.position);
    }
}