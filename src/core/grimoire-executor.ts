// Operational semantics engine for BOTC grimoire state evolution
// Executes game traces as small-step transitions on grimoire state

import { GameEvent, GameTraceParser } from './game-trace-parser';
import { 
    GrimoireState, 
    GrimoireTransition, 
    OperationalSemanticsTrace,
    GrimoireStateFactory,
    GrimoireStateUtils
} from './grimoire-state';

/**
 * Rule validation context for checking transition legality
 */
interface TransitionContext {
    event: GameEvent;
    beforeState: GrimoireState;
    afterState: GrimoireState;
    validationErrors: string[];
}

/**
 * Engine for executing game traces with step-by-step grimoire evolution
 */
export class GrimoireExecutor {
    private parser: GameTraceParser;
    private validateTransitions: boolean;
    
    constructor(validateTransitions: boolean = true) {
        this.parser = new GameTraceParser();
        this.validateTransitions = validateTransitions;
    }
    
    /**
     * Execute a complete game trace and return operational semantics trace
     */
    executeTrace(
        gameTrace: string, 
        initialPlayerNames: string[],
        script: string = 'Trouble Brewing'
    ): OperationalSemanticsTrace {
        const events = this.parser.parseTraceEvents(gameTrace);
        const initialState = GrimoireStateFactory.createInitialState(initialPlayerNames, script);
        
        const transitions: GrimoireTransition[] = [];
        const invalidTransitions: GrimoireTransition[] = [];
        const phases: string[] = [];
        
        let currentState = initialState;
        
        // Track initial phase
        if (!phases.includes(currentState.currentPhase)) {
            phases.push(currentState.currentPhase);
        }
        
        for (const event of events) {
            // Track phase transitions
            if (event.phase !== currentState.currentPhase) {
                if (!phases.includes(event.phase)) {
                    phases.push(event.phase);
                }
            }
            
            const transition = this.executeStep(currentState, event);
            transitions.push(transition);
            
            if (!transition.isValid) {
                invalidTransitions.push(transition);
            }
            
            currentState = transition.toState;
        }
        
        return {
            initialState,
            transitions,
            finalState: currentState,
            totalSteps: transitions.length,
            phases,
            invalidTransitions
        };
    }
    
    /**
     * Execute a single step transition from an event
     */
    executeStep(state: GrimoireState, event: GameEvent): GrimoireTransition {
        const beforeState = GrimoireStateFactory.cloneState(state);
        const afterState = GrimoireStateFactory.cloneState(state);
        
        // Update phase if needed
        if (event.phase !== afterState.currentPhase) {
            afterState.currentPhase = event.phase;
        }
        
        const context: TransitionContext = {
            event,
            beforeState,
            afterState,
            validationErrors: []
        };
        
        // Apply the state transformation based on event type
        this.applyEventTransformation(context);
        
        // Validate the transition if enabled
        let isValid = true;
        if (this.validateTransitions) {
            isValid = this.validateTransition(context);
        }
        
        return {
            fromState: beforeState,
            event,
            toState: afterState,
            timestamp: new Date(),
            isValid,
            validationErrors: context.validationErrors.length > 0 ? context.validationErrors : undefined
        };
    }
    
    /**
     * Apply event-specific state transformations
     */
    private applyEventTransformation(context: TransitionContext): void {
        const { event, afterState } = context;
        
        switch (event.action) {
            case 'assign_role':
                this.handleRoleAssignment(context);
                break;
                
            case 'add_token':
                this.handleAddToken(context);
                break;
                
            case 'remove_token':
                this.handleRemoveToken(context);
                break;
                
            case 'nominate':
                this.handleNomination(context);
                break;
                
            case 'vote':
                this.handleVote(context);
                break;
                
            case 'execute':
                this.handleExecution(context);
                break;
                
            case 'die':
                this.handleDeath(context);
                break;
                
            case 'demon_kill':
                this.handleDemonKill(context);
                break;
                
            default:
                context.validationErrors.push(`Unknown event action: ${event.action}`);
        }
        
        // Update derived state after transformation
        this.updateDerivedState(afterState);
    }
    
    /**
     * Handle role assignment events (external universe assigning roles)
     */
    private handleRoleAssignment(context: TransitionContext): void {
        const { event, afterState } = context;
        
        if (!event.target || !event.details?.roleName) {
            context.validationErrors.push('Role assignment event missing target or role name');
            return;
        }
        
        if (!GrimoireStateUtils.hasPlayer(afterState, event.target)) {
            context.validationErrors.push(`Cannot assign role to non-existent player: ${event.target}`);
            return;
        }
        
        const player = GrimoireStateUtils.getPlayer(afterState, event.target);
        const roleName = event.details.roleName;
        
        // Assign the role
        player.role = roleName;
        afterState.roleAssignments.set(event.target, roleName);
    }
    
    /**
     * Handle token addition events
     */
    private handleAddToken(context: TransitionContext): void {
        const { event, afterState } = context;
        
        if (!event.target || !event.token) {
            context.validationErrors.push('Add token event missing target or token');
            return;
        }
        
        if (!GrimoireStateUtils.hasPlayer(afterState, event.target)) {
            context.validationErrors.push(`Cannot add token to non-existent player: ${event.target}`);
            return;
        }
        
        const player = GrimoireStateUtils.getPlayer(afterState, event.target);
        
        // Handle role assignment during setup
        if (event.phase === 'SETUP' && this.isRoleToken(event.token)) {
            const roleName = this.extractRoleFromToken(event.token);
            if (roleName) {
                player.role = roleName;
                afterState.roleAssignments.set(event.target, roleName);
            }
        }
        
        // Add reminder token
        if (!player.reminderTokens.includes(event.token)) {
            player.reminderTokens.push(event.token);
        }
        
        // Update token mapping
        const currentTokens = afterState.tokensByPlayer.get(event.target) || [];
        if (!currentTokens.includes(event.token)) {
            currentTokens.push(event.token);
            afterState.tokensByPlayer.set(event.target, currentTokens);
        }
    }
    
    /**
     * Handle token removal events
     */
    private handleRemoveToken(context: TransitionContext): void {
        const { event, afterState } = context;
        
        if (!event.target || !event.token) {
            context.validationErrors.push('Remove token event missing target or token');
            return;
        }
        
        if (!GrimoireStateUtils.hasPlayer(afterState, event.target)) {
            context.validationErrors.push(`Cannot remove token from non-existent player: ${event.target}`);
            return;
        }
        
        const player = GrimoireStateUtils.getPlayer(afterState, event.target);
        
        // Remove from player's token list
        const tokenIndex = player.reminderTokens.indexOf(event.token);
        if (tokenIndex > -1) {
            player.reminderTokens.splice(tokenIndex, 1);
        }
        
        // Update token mapping
        const currentTokens = afterState.tokensByPlayer.get(event.target) || [];
        const mappingIndex = currentTokens.indexOf(event.token);
        if (mappingIndex > -1) {
            currentTokens.splice(mappingIndex, 1);
            afterState.tokensByPlayer.set(event.target, currentTokens);
        }
    }
    
    /**
     * Handle nomination events
     */
    private handleNomination(context: TransitionContext): void {
        const { event, afterState } = context;
        
        if (!event.target) {
            context.validationErrors.push('Nomination event missing target');
            return;
        }
        
        // Set execution state - player is now on the block
        afterState.executionState.onTheBlock = event.target;
        afterState.executionState.votes.clear();
        afterState.executionState.voteCount = 0;
    }
    
    /**
     * Handle vote events
     */
    private handleVote(context: TransitionContext): void {
        const { event, beforeState, afterState } = context;
        
        if (!event.target) {
            context.validationErrors.push('Vote event missing target');
            return;
        }
        
        // Check if voter exists and can vote
        if (!GrimoireStateUtils.hasPlayer(beforeState, event.actor)) {
            context.validationErrors.push(`Voter does not exist: ${event.actor}`);
            return;
        }
        
        const voter = GrimoireStateUtils.getPlayer(beforeState, event.actor);
        
        // Living players can always vote
        // Dead players can vote if they have ghost vote remaining
        if (!voter.isAlive && !voter.hasGhostVote) {
            context.validationErrors.push(`Dead player ${event.actor} has no ghost vote remaining`);
            return;
        }
        
        // Record the vote in execution state
        afterState.executionState.votes.set(event.actor, event.target);
        
        // Update vote count if voting for the person on the block
        if (event.target === afterState.executionState.onTheBlock) {
            afterState.executionState.voteCount++;
        }
        
        // Use ghost vote if dead player voted
        if (!voter.isAlive && voter.hasGhostVote) {
            const afterVoter = GrimoireStateUtils.getPlayer(afterState, event.actor);
            afterVoter.hasGhostVote = false;
        }
    }
    
    /**
     * Handle execution events
     */
    private handleExecution(context: TransitionContext): void {
        const { event, afterState } = context;
        
        if (!event.target) {
            context.validationErrors.push('Execution event missing target');
            return;
        }
        
        if (!GrimoireStateUtils.hasPlayer(afterState, event.target)) {
            context.validationErrors.push(`Cannot execute non-existent player: ${event.target}`);
            return;
        }
        
        const player = GrimoireStateUtils.getPlayer(afterState, event.target);
        
        if (!player.isAlive) {
            context.validationErrors.push(`Cannot execute already dead player: ${event.target}`);
            return;
        }
        
        // Kill the player - they will get ghost vote
        player.isAlive = false;
        player.hasGhostVote = true; // Executed players get ghost vote
        
        // Clear execution state after execution
        afterState.executionState.onTheBlock = null;
        afterState.executionState.votes.clear();
        afterState.executionState.voteCount = 0;
    }
    
    /**
     * Handle death events (covers all death types)
     */
    private handleDeath(context: TransitionContext): void {
        const { event, afterState } = context;
        
        const targetPlayer = event.target || event.actor; // Death can be self-inflicted
        
        if (!targetPlayer) {
            context.validationErrors.push('Death event missing target/actor');
            return;
        }
        
        if (!GrimoireStateUtils.hasPlayer(afterState, targetPlayer)) {
            context.validationErrors.push(`Cannot kill non-existent player: ${targetPlayer}`);
            return;
        }
        
        const player = GrimoireStateUtils.getPlayer(afterState, targetPlayer);
        
        // Allow death events on already dead players as confirmation/no-op
        // This handles cases where traces include both execute and die events
        if (!player.isAlive) {
            // Already dead - this is a no-op confirmation, not an error
            return;
        }
        
        // Kill the player
        player.isAlive = false;
        
        // Ghost vote rules: players get ghost vote unless they used it already
        // For simplicity, all deaths grant ghost vote initially
        player.hasGhostVote = true;
    }
    
    /**
     * Handle demon kill events (night kills)
     */
    private handleDemonKill(context: TransitionContext): void {
        const { event, afterState } = context;
        
        if (!event.target) {
            context.validationErrors.push('Demon kill event missing target');
            return;
        }
        
        // Add death token first, then handle death
        const deathToken = 'imp:dead'; // Assuming imp for Trouble Brewing
        const addTokenEvent: GameEvent = {
            phase: event.phase,
            actor: 'st',
            action: 'add_token',
            target: event.target,
            token: deathToken
        };
        
        // Apply token addition
        const tokenContext: TransitionContext = {
            event: addTokenEvent,
            beforeState: context.beforeState,
            afterState,
            validationErrors: context.validationErrors
        };
        this.handleAddToken(tokenContext);
        
        // Then handle the death
        const deathEvent: GameEvent = {
            phase: event.phase,
            actor: event.target,
            action: 'die'
        };
        
        const deathContext: TransitionContext = {
            event: deathEvent,
            beforeState: context.beforeState,
            afterState,
            validationErrors: context.validationErrors
        };
        this.handleDeath(deathContext);
    }
    
    /**
     * Update derived state mappings after transformations
     */
    private updateDerivedState(state: GrimoireState): void {
        // Clear and rebuild derived sets
        state.livingPlayers.clear();
        state.deadPlayers.clear();
        state.ghostVotesRemaining.clear();
        
        for (const player of state.players) {
            if (player.isAlive) {
                state.livingPlayers.add(player.name);
            } else {
                state.deadPlayers.add(player.name);
                if (player.hasGhostVote) {
                    state.ghostVotesRemaining.add(player.name);
                }
            }
        }
    }
    
    /**
     * Validate a transition follows BOTC rules
     */
    private validateTransition(context: TransitionContext): boolean {
        const { beforeState, afterState } = context;
        
        // Basic state consistency validation
        const beforeValidation = GrimoireStateUtils.validateState(beforeState);
        const afterValidation = GrimoireStateUtils.validateState(afterState);
        
        if (!beforeValidation.isValid) {
            context.validationErrors.push(`Invalid before state: ${beforeValidation.errors.join(', ')}`);
        }
        
        if (!afterValidation.isValid) {
            context.validationErrors.push(`Invalid after state: ${afterValidation.errors.join(', ')}`);
        }
        
        // Event-specific validation
        this.validateEventSpecificRules(context);
        
        return context.validationErrors.length === 0;
    }
    
    /**
     * Validate event-specific BOTC rules
     */
    private validateEventSpecificRules(context: TransitionContext): void {
        const { event, beforeState, afterState } = context;
        
        // Player count should never change during gameplay
        if (beforeState.players.length !== afterState.players.length) {
            context.validationErrors.push('Player count changed during transition');
        }
        
        // Roles should only be assigned during setup
        if (event.phase !== 'SETUP') {
            for (const player of afterState.players) {
                const beforePlayer = beforeState.players.find(p => p.name === player.name);
                if (beforePlayer && beforePlayer.role !== player.role) {
                    context.validationErrors.push(`Role changed for ${player.name} outside setup phase`);
                }
            }
        }
        
        // Dead players can't become alive
        for (const player of afterState.players) {
            const beforePlayer = beforeState.players.find(p => p.name === player.name);
            if (beforePlayer && !beforePlayer.isAlive && player.isAlive) {
                context.validationErrors.push(`Dead player ${player.name} became alive`);
            }
        }
        
        // Additional rule validations can be added here
        // e.g., token placement rules, ability timing constraints, etc.
    }
    
    /**
     * Helper: Check if a token represents a role assignment
     */
    private isRoleToken(_token: string): boolean {
        // In our current model, we don't have explicit role tokens during setup
        // Role assignments would be tracked separately or inferred from context
        // This is a placeholder for more sophisticated role detection
        return false;
    }
    
    /**
     * Helper: Extract role name from a role token
     */
    private extractRoleFromToken(_token: string): string | null {
        // Placeholder for role extraction logic
        // Would need to be implemented based on role token format
        return null;
    }
    
    /**
     * Get execution summary for debugging/analysis
     */
    getExecutionSummary(trace: OperationalSemanticsTrace): string {
        const lines: string[] = [];
        
        lines.push(`=== Operational Semantics Execution Summary ===`);
        lines.push(`Total steps: ${trace.totalSteps}`);
        lines.push(`Phases: ${trace.phases.join(' → ')}`);
        lines.push(`Invalid transitions: ${trace.invalidTransitions.length}`);
        lines.push('');
        
        lines.push('Initial state:');
        lines.push(`  ${GrimoireStateUtils.toSingleLineFormat(trace.initialState)}`);
        lines.push('');
        
        if (trace.transitions.length > 0) {
            lines.push('Step-by-step evolution:');
            for (let i = 0; i < trace.transitions.length; i++) {
                const transition = trace.transitions[i];
                const status = transition.isValid ? '✅' : '❌';
                lines.push(`  ${i + 1}. ${status} ${transition.event.phase}: ${transition.event.action} (${transition.event.actor})`);
                lines.push(`     ${GrimoireStateUtils.toSingleLineFormat(transition.toState)}`);
                
                if (!transition.isValid && transition.validationErrors) {
                    lines.push(`     Errors: ${transition.validationErrors.join('; ')}`);
                }
            }
        }
        
        lines.push('');
        lines.push('Final state:');
        lines.push(`  ${GrimoireStateUtils.toSingleLineFormat(trace.finalState)}`);
        
        if (trace.invalidTransitions.length > 0) {
            lines.push('');
            lines.push('🚨 Rule violations detected:');
            for (const invalid of trace.invalidTransitions) {
                lines.push(`  - ${invalid.event.phase}: ${invalid.event.action} - ${invalid.validationErrors?.join('; ')}`);
            }
        }
        
        return lines.join('\n');
    }
}