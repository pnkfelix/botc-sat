// Generic compiler for reminder token placement constraints in SAT solving
import { Script } from '../core/scripts';
import { getRole, TokenPlacementConstraint } from '../core/roles';
import { SATSolver } from '../core/solver';
import { GrimoireState } from '../core/grimoire';
import { TemporalConstraintCompiler, TemporalContext } from './temporal-constraint-compiler';

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
        
        // Adding reminder token constraints for the given player count
        
        // 1. Create variables for all possible token placements
        this.createTokenPlacementVariables(script, solver, playerCount);
        
        // 2. Add token constraints from DSL
        this.addTokenConstraints(script, solver, playerCount);
        
        // 5. If grimoire state is provided, constrain to match observed placements
        if (grimoireState) {
            this.addObservedPlacementConstraints(script, grimoireState, solver);
        }
        
        const tokenVarCount = solver.getVariableCount() - initialVarCount;
        return tokenVarCount;
    }

    /**
     * Enhanced compilation with temporal constraint integration.
     * Makes token constraints conditional on game history context.
     */
    compileWithTemporalConstraints(
        script: Script,
        solver: SATSolver,
        playerCount: number,
        grimoireState?: GrimoireState
    ): { tokenVarCount: number; temporalContext: TemporalContext } {
        const initialVarCount = solver.getVariableCount();
        
        // 1. Compile temporal constraints first
        const temporalCompiler = new TemporalConstraintCompiler();
        const temporalContext = temporalCompiler.compileTemporalConstraints(script, solver, playerCount);
        
        // 2. Create token placement variables
        this.createTokenPlacementVariables(script, solver, playerCount);
        
        // 3. Add conditional token constraints (modified to use temporal context)
        this.addConditionalTokenConstraints(script, solver, playerCount, temporalContext);
        
        // 4. Link bag composition to temporal context
        temporalCompiler.addBagToTemporalConstraints(script, solver, temporalContext);
        
        // 5. If grimoire state provided, constrain to match observed placements
        if (grimoireState) {
            this.addObservedPlacementConstraints(script, grimoireState, solver);
        }
        
        const tokenVarCount = solver.getVariableCount() - initialVarCount;
        return { tokenVarCount, temporalContext };
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
        // Compiling constraint: ${constraint.description}
        
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
        
        // For all positions: token_placed_at_position => player_at_position_is_allowed_role
        for (let position = 0; position < playerCount; position++) {
            const tokenPlacementVar = solver.getVariableId(`token_placed_${roleId}_${constraint.token}_at_${position}`);
            if (!tokenPlacementVar) continue;
            
            const playerRoleVar = solver.addVariable(`player_${position}_is_${allowedRoleId}`);
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
            
            if (allowedRoleType === 'good' || allowedRoleType === 'evil') {
                // Handle alignment constraints (good = townsfolk + outsider, evil = minion + demon)
                this.addAlignmentConstraint(tokenPlacementVar, allowedRoleType, position, solver);
            } else {
                // Handle specific role type constraints
                const playerTypeVar = solver.addVariable(`player_${position}_is_${allowedRoleType.toLowerCase()}`);
                solver.addClause([-tokenPlacementVar, playerTypeVar]);
            }
        }
    }
    
    private addAlignmentConstraint(tokenPlacementVar: number, alignment: 'good' | 'evil', position: number, solver: SATSolver): void {
        if (alignment === 'good') {
            // Good = Townsfolk OR Outsider
            const playerTownsfolkVar = solver.addVariable(`player_${position}_is_townsfolk`);
            const playerOutsiderVar = solver.addVariable(`player_${position}_is_outsider`);
            
            // token_placed => (player_is_townsfolk OR player_is_outsider)
            // Which is: NOT token_placed OR player_is_townsfolk OR player_is_outsider
            solver.addClause([-tokenPlacementVar, playerTownsfolkVar, playerOutsiderVar]);
        } else if (alignment === 'evil') {
            // Evil = Minion OR Demon
            const playerMinionVar = solver.addVariable(`player_${position}_is_minion`);
            const playerDemonVar = solver.addVariable(`player_${position}_is_demon`);
            
            // token_placed => (player_is_minion OR player_is_demon)
            solver.addClause([-tokenPlacementVar, playerMinionVar, playerDemonVar]);
        }
    }
    
    private compileInformationToken(_roleId: string, _constraint: TokenPlacementConstraint, _solver: SATSolver, _playerCount: number): void {
        // Information tokens can be placed anywhere, no additional position constraints
        // The requires_role_present constraint (if present) handles role presence requirement
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
        
        // Role-requires-token constraint: if role is present, then token must be placed somewhere
        
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
        }
    }
    
    private addObservedPlacementConstraints(script: Script, grimoireState: GrimoireState, solver: SATSolver): void {
        // Rule: If we observe specific token placements in a grimoire, constrain the solver to match
        
        for (let position = 0; position < grimoireState.players.length; position++) {
            const player = grimoireState.players[position];
            
            // Force observed tokens to be true at their positions
            for (const tokenString of player.tokens) {
                // Parse token string like "washerwoman:townsfolk" 
                const [roleId, token] = tokenString.split(':');
                if (!roleId || !token) continue;
                
                const tokenPlacementVar = solver.getVariableId(`token_placed_${roleId}_${token}_at_${position}`);
                if (tokenPlacementVar) {
                    // Force observed token placement
                    solver.addUnitClause(tokenPlacementVar, true);
                }
            }
            
            // Force the player's role at this position
            const playerRoleVar = solver.addVariable(`player_${position}_is_${player.role}`);
            solver.addUnitClause(playerRoleVar, true);
            // Force player role at position
        }
        
        // Force roles to be present based on observed players
        const observedRoles = new Set<string>();
        for (const player of grimoireState.players) {
            observedRoles.add(player.role);
        }
        
        for (const roleId of observedRoles) {
            const roleVar = solver.getVariableId(`${roleId}_present`) || solver.addVariable(`${roleId}_present`);
            solver.addUnitClause(roleVar, true);
            // Force role to be present
        }
        
        // Force role type variables based on observed players
        this.addObservedRoleTypeConstraints(grimoireState, solver);
        
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
                    // Force role to be absent
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
        // Adding mutual exclusion constraints for player roles
        
        // Get all role IDs that appear in the grimoire
        const allRoles = new Set<string>();
        for (const player of grimoireState.players) {
            allRoles.add(player.role);
        }
        
        // For each player, collect all possible role variables that might be assigned to them
        for (let position = 0; position < grimoireState.players.length; position++) {
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
                    // Add mutual exclusion constraint between roles
                }
            }
        }
    }
    
    private addUnobservedTokenExclusions(script: Script, grimoireState: GrimoireState, solver: SATSolver): void {
        // Adding unobserved token exclusions
        
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
                        // Force unobserved token to be false
                    }
                }
            }
        }
    }
    
    private addObservedRoleTypeConstraints(grimoireState: GrimoireState, solver: SATSolver): void {
        // Adding observed role type constraints
        
        for (let position = 0; position < grimoireState.players.length; position++) {
            const player = grimoireState.players[position];
            const role = getRole(player.role);
            if (!role) continue;
            
            // Force the correct role type variables for each player
            const roleType = role.type.toLowerCase() as 'townsfolk' | 'outsider' | 'minion' | 'demon';
            const playerTypeVar = solver.addVariable(`player_${position}_is_${roleType}`);
            solver.addUnitClause(playerTypeVar, true);
            // Force correct role type for player
            
            // Force other role types to be false for this player
            const allRoleTypes = ['townsfolk', 'outsider', 'minion', 'demon'];
            for (const otherType of allRoleTypes) {
                if (otherType !== roleType) {
                    const otherTypeVar = solver.getVariableId(`player_${position}_is_${otherType}`);
                    if (otherTypeVar) {
                        solver.addUnitClause(otherTypeVar, false);
                        // Force incorrect role types to be false
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

    /**
     * Add token constraints that are conditional on temporal context variables.
     * This makes information gathering constraints depend on being sober and healthy.
     */
    private addConditionalTokenConstraints(script: Script, solver: SATSolver, playerCount: number, temporalContext: TemporalContext): void {
        for (const roleId of script.roleIds) {
            const role = getRole(roleId);
            if (!role?.tokenConstraints) continue;

            // Check if this role has temporal constraints affecting its tokens
            const soberHealthyVar = temporalContext.soberHealthyWhenActing.get(roleId);
            
            for (const constraint of role.tokenConstraints) {
                if (constraint.type === 'information_token' && soberHealthyVar) {
                    // Information tokens only apply normal constraints if role was sober and healthy
                    this.addConditionalInformationConstraints(roleId, constraint, solver, playerCount, soberHealthyVar);
                } else {
                    // Non-information tokens or roles without sober/healthy requirements use normal constraints
                    this.compileTokenConstraint(roleId, constraint, solver, playerCount);
                }
            }
        }
    }

    /**
     * Add information token constraints that are conditional on sober/healthy status.
     */
    private addConditionalInformationConstraints(
        roleId: string, 
        constraint: TokenPlacementConstraint, 
        solver: SATSolver, 
        playerCount: number, 
        soberHealthyVarName: string
    ): void {
        const soberHealthyVar = solver.getVariableId(soberHealthyVarName);
        if (!soberHealthyVar) return;

        // Get the role-specific constraints that should apply when sober and healthy
        const role = getRole(roleId);
        if (!role) return;

        // Find the corresponding role_requires_token constraint for this token
        const requiresTokenConstraint = role.tokenConstraints?.find(c => 
            c.type === 'role_requires_token' && c.token === constraint.token
        );

        if (requiresTokenConstraint) {
            // Modified constraint: role present AND sober/healthy => token must be placed
            const roleVar = solver.getVariableId(`${roleId}_present`) || solver.addVariable(`${roleId}_present`);
            
            // Collect all placement variables for this token
            const tokenPlacementVars: number[] = [];
            for (let position = 0; position < playerCount; position++) {
                const tokenPlacementVar = solver.getVariableId(`token_placed_${roleId}_${constraint.token}_at_${position}`);
                if (tokenPlacementVar) {
                    tokenPlacementVars.push(tokenPlacementVar);
                }
            }

            if (tokenPlacementVars.length > 0) {
                // (role_present AND sober_healthy) => (token_at_0 OR token_at_1 OR ... OR token_at_n)
                // Which is: NOT role_present OR NOT sober_healthy OR token_at_0 OR token_at_1 OR ... OR token_at_n
                const clause = [-roleVar, -soberHealthyVar, ...tokenPlacementVars];
                solver.addClause(clause);
            }
        }

        // Also apply the basic requires_role_present constraint (this is always needed)
        if (constraint.type === 'information_token') {
            // Find the requires_role_present constraint for this token
            const requiresRoleConstraint = role.tokenConstraints?.find(c => 
                c.type === 'requires_role_present' && c.token === constraint.token
            );
            if (requiresRoleConstraint) {
                this.compileRequiresRolePresent(roleId, requiresRoleConstraint, solver, playerCount);
            }
        }
    }
}