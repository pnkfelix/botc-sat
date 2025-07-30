// Proper operational semantics using existing grimoire types and realistic BOTC phases

import { GrimoireState } from './grimoire';
import { GameTraceParser, GameEvent, PhaseUtils } from './game-trace-parser';
import { CompleteGameState, CompleteGameStateFactory, GameExecutionStateFactory, GameTransition, OperationalSemanticsTrace } from './game-execution-state';
import { renderGrimoireToSingleLine } from '../rendering/single-line-format';
import { ROLES } from './roles';

/**
 * Operational semantics executor using proper grimoire types
 */
export class ProperGrimoireExecutor {
    private parser: GameTraceParser;
    private validateTransitions: boolean;
    
    constructor(validateTransitions: boolean = true) {
        this.parser = new GameTraceParser();
        this.validateTransitions = validateTransitions;
    }
    
    /**
     * Execute a complete game trace with proper BOTC phases
     */
    executeTrace(
        gameTrace: string,
        initialPlayerNames: string[],
        script: string = 'Trouble Brewing'
    ): OperationalSemanticsTrace {
        const initialState = CompleteGameStateFactory.createInitialState(initialPlayerNames, script);
        
        return this.executeTraceFromState(gameTrace, initialState);
    }
    
    /**
     * Execute a game trace starting from an existing grimoire state
     */
    executeTraceFromGrimoire(
        gameTrace: string,
        existingGrimoire: GrimoireState,
        script: string = 'Trouble Brewing'
    ): OperationalSemanticsTrace {
        const events = this.parser.parseTraceEvents(gameTrace);
        
        // Determine starting phase from the first event in the trace
        const startingPhase = events.length > 0 ? events[0].phase : 'SETUP';
        
        // Create complete game state from existing grimoire
        const execution = GameExecutionStateFactory.createInitialExecutionState(
            existingGrimoire.players.length, 
            script
        );
        // Override the phase to match the trace starting point
        execution.currentPhase = startingPhase;
        
        const initialState: CompleteGameState = {
            grimoire: existingGrimoire,
            execution
        };
        
        return this.executeTraceFromState(gameTrace, initialState);
    }
    
    /**
     * Execute trace from a complete initial state
     */
    private executeTraceFromState(gameTrace: string, initialState: CompleteGameState): OperationalSemanticsTrace {
        const events = this.parser.parseTraceEvents(gameTrace);
        
        const transitions: GameTransition[] = [];
        const invalidTransitions: GameTransition[] = [];
        const phases: string[] = [];
        
        let currentState = initialState;
        
        // Track initial phase
        if (!phases.includes(currentState.execution.currentPhase)) {
            phases.push(currentState.execution.currentPhase);
        }
        
        for (const event of events) {
            // Validate phase transition only if the phase is actually changing
            let phaseTransitionValid = true;
            if (event.phase !== currentState.execution.currentPhase) {
                phaseTransitionValid = PhaseUtils.isValidTransition(
                    currentState.execution.currentPhase,
                    event.phase
                );
                
                // Track phase transition (even if we've seen this phase before)
                phases.push(event.phase);
            }
            
            const transition = this.executeStep(currentState, event);
            
            // Mark transition as invalid if phase transition is invalid
            if (!phaseTransitionValid && this.validateTransitions) {
                transition.isValid = false;
                transition.validationErrors = transition.validationErrors || [];
                transition.validationErrors.push(
                    `Invalid phase transition: ${currentState.execution.currentPhase} → ${event.phase}`
                );
            }
            
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
     * Execute a single step transition
     */
    executeStep(state: CompleteGameState, event: GameEvent): GameTransition {
        const beforeState = CompleteGameStateFactory.cloneState(state);
        const afterState = CompleteGameStateFactory.cloneState(state);
        
        // Update phase if needed
        if (event.phase !== afterState.execution.currentPhase) {
            afterState.execution.currentPhase = event.phase;
        }
        
        const validationErrors: string[] = [];
        
        // Apply the state transformation
        this.applyEventToState(afterState, event, validationErrors);
        
        // Validate the transition if enabled
        let isValid = true;
        if (this.validateTransitions) {
            isValid = this.validateTransition(beforeState, afterState, event, validationErrors);
        }
        
        return {
            fromState: beforeState,
            event,
            toState: afterState,
            timestamp: new Date(),
            isValid,
            validationErrors: validationErrors.length > 0 ? validationErrors : undefined
        };
    }
    
    /**
     * Apply event to game state (modifies state in place)
     */
    private applyEventToState(state: CompleteGameState, event: GameEvent, errors: string[]): void {
        switch (event.action) {
            case 'assign_role':
                this.handleRoleAssignment(state, event, errors);
                break;
            case 'add_token':
                this.handleAddToken(state, event, errors);
                break;
            case 'remove_token':
                this.handleRemoveToken(state, event, errors);
                break;
            case 'nominate':
                this.handleNomination(state, event, errors);
                break;
            case 'vote':
                this.handleVote(state, event, errors);
                break;
            case 'execute':
                this.handleExecution(state, event, errors);
                break;
            case 'die':
                this.handleDeath(state, event, errors);
                break;
            case 'demon_kill':
                this.handleDemonKill(state, event, errors);
                break;
            case 'role_action':
                this.handleRoleAction(state, event, errors);
                break;
            case 'phase_transition':
                // No-op for phase transitions - the phase change is handled in executeStep
                break;
            default:
                errors.push(`Unknown action: ${event.action}`);
        }
    }
    
    private handleRoleAssignment(state: CompleteGameState, event: GameEvent, errors: string[]): void {
        if (!event.target || !event.details?.roleName) {
            errors.push('Role assignment missing target or role name');
            return;
        }
        
        const player = this.findPlayer(state.grimoire, event.target);
        if (!player) {
            errors.push(`Cannot assign role to non-existent player: ${event.target}`);
            return;
        }
        
        player.role = event.details.roleName;
    }
    
    private handleAddToken(state: CompleteGameState, event: GameEvent, errors: string[]): void {
        if (!event.target || !event.token) {
            errors.push('Add token missing target or token');
            return;
        }
        
        const player = this.findPlayer(state.grimoire, event.target);
        if (!player) {
            errors.push(`Cannot add token to non-existent player: ${event.target}`);
            return;
        }
        
        if (!player.tokens.includes(event.token)) {
            player.tokens.push(event.token);
        }
        
        // Handle token effects based on DSL declarations
        this.processTokenEffects(state, event, errors);
    }
    
    private handleRemoveToken(state: CompleteGameState, event: GameEvent, errors: string[]): void {
        if (!event.target || !event.token) {
            errors.push('Remove token missing target or token');
            return;
        }
        
        const player = this.findPlayer(state.grimoire, event.target);
        if (!player) {
            errors.push(`Cannot remove token from non-existent player: ${event.target}`);
            return;
        }
        
        const index = player.tokens.indexOf(event.token);
        if (index > -1) {
            player.tokens.splice(index, 1);
        }
    }
    
    private handleNomination(state: CompleteGameState, event: GameEvent, errors: string[]): void {
        if (!event.target) {
            errors.push('Nomination missing target');
            return;
        }
        
        // Update execution state - player is now on the block
        state.execution.onTheBlock = event.target;
        state.execution.votes.clear();
        state.execution.voteCount = 0;
    }
    
    private handleVote(state: CompleteGameState, event: GameEvent, errors: string[]): void {
        if (!event.target) {
            errors.push('Vote missing target');
            return;
        }
        
        const voter = this.findPlayer(state.grimoire, event.actor);
        if (!voter) {
            errors.push(`Voter does not exist: ${event.actor}`);
            return;
        }
        
        // Check if voter can vote
        if (!voter.alive && !voter.ghost) {
            errors.push(`Dead player ${event.actor} has no ghost vote remaining`);
            return;
        }
        
        // Record the vote
        state.execution.votes.set(event.actor, event.target);
        
        // Update vote count if voting for person on the block
        if (event.target === state.execution.onTheBlock) {
            state.execution.voteCount++;
        }
        
        // Use ghost vote if dead player voted
        if (!voter.alive && voter.ghost) {
            voter.ghost = false;
        }
    }
    
    private handleExecution(state: CompleteGameState, event: GameEvent, errors: string[]): void {
        if (!event.target) {
            errors.push('Execution missing target');
            return;
        }
        
        const player = this.findPlayer(state.grimoire, event.target);
        if (!player) {
            errors.push(`Cannot execute non-existent player: ${event.target}`);
            return;
        }
        
        if (!player.alive) {
            errors.push(`Cannot execute already dead player: ${event.target}`);
            return;
        }
        
        // Kill the player - they get ghost vote
        player.alive = false;
        player.ghost = true;
        
        // Clear execution state
        state.execution.onTheBlock = null;
        state.execution.votes.clear();
        state.execution.voteCount = 0;
    }
    
    private handleDeath(state: CompleteGameState, event: GameEvent, errors: string[]): void {
        const targetPlayer = event.target || event.actor;
        
        if (!targetPlayer) {
            errors.push('Death event missing target/actor');
            return;
        }
        
        const player = this.findPlayer(state.grimoire, targetPlayer);
        if (!player) {
            errors.push(`Cannot kill non-existent player: ${targetPlayer}`);
            return;
        }
        
        // Allow death events on already dead players as no-op
        if (!player.alive) {
            return;
        }
        
        player.alive = false;
        player.ghost = true;
    }
    
    private handleDemonKill(state: CompleteGameState, event: GameEvent, errors: string[]): void {
        if (!event.target) {
            errors.push('Demon kill missing target');
            return;
        }
        
        // Add death token and handle death (backward compatibility)
        this.handleAddToken(state, {
            ...event,
            action: 'add_token',
            token: 'imp:dead'
        }, errors);
        
        this.handleDeath(state, {
            ...event,
            action: 'die',
            actor: event.target
        }, errors);
    }

    /**
     * Process token effects based on DSL role definitions
     */
    private processTokenEffects(state: CompleteGameState, event: GameEvent, errors: string[]): void {
        if (!event.token) return;
        
        // Parse token format: "role:token" (e.g., "imp:dead")
        const tokenParts = event.token.split(':');
        if (tokenParts.length !== 2) return;
        
        const [roleId, tokenName] = tokenParts;
        
        // Find role definition
        const role = ROLES.get(roleId);
        if (!role || !role.tokenConstraints) return;
        
        // Find token effect constraints for this token
        const tokenEffects = role.tokenConstraints.filter(constraint => 
            constraint.type === 'token_effect' && 
            constraint.token === tokenName &&
            constraint.tokenEffect
        );
        
        // Apply each token effect
        for (const constraint of tokenEffects) {
            const effect = constraint.tokenEffect!;
            
            switch (effect.effect) {
                case 'causes_death_at_dawn':
                    // For immediate triggers during token placement
                    if (effect.trigger === 'phase_transition' && 
                        effect.fromPhase === 'NIGHT' && 
                        effect.toPhase === 'DAWN') {
                        // Note: This is immediate placement during NIGHT
                        // The actual dawn transition will be handled in phase transition logic
                        // For now, mark for death at next dawn
                        if (event.target) {
                            this.handleDeath(state, {
                                ...event,
                                action: 'die',
                                actor: event.target
                            }, errors);
                        }
                    }
                    break;
                    
                case 'causes_unhealthiness':
                    // Handle drunk/poison effects
                    // TODO: Implement sober/healthy state tracking
                    break;
                    
                case 'causes_death_if_madness_broken':
                case 'causes_death_if_madness_maintained':
                case 'causes_gain_ability_if_madness_maintained':
                    // TODO: Implement madness tracking and checking
                    break;
                    
                default:
                    errors.push(`Unknown token effect: ${effect.effect}`);
            }
        }
    }

    /**
     * Handle script-parametric role actions (slayer:shoot_at, monk:protect, etc.)
     */
    private handleRoleAction(state: CompleteGameState, event: GameEvent, errors: string[]): void {
        if (!event.details?.actionName) {
            errors.push('Role action missing action name');
            return;
        }

        const actionName = event.details.actionName;
        const parameters = event.details.parameters || [];

        // Parse actor to get player and role
        const actorParts = event.actor.split(':');
        if (actorParts.length !== 2) {
            errors.push(`Invalid role action actor format: ${event.actor}`);
            return;
        }

        const [playerName, roleId] = actorParts;
        const player = this.findPlayer(state.grimoire, playerName);
        if (!player) {
            errors.push(`Role action actor not found: ${playerName}`);
            return;
        }

        // Find role definition and action
        const role = ROLES.get(roleId);
        if (!role || !role.actions) {
            errors.push(`Role not found or has no actions: ${roleId}`);
            return;
        }

        // Action name can be either just the action part or the full namespaced name
        const fullActionName = `${roleId}:${actionName}`;
        const actionDef = role.actions.find(a => 
            a.actionName === actionName || a.actionName === fullActionName
        );
        if (!actionDef) {
            errors.push(`Action not found for role ${roleId}: ${actionName}`);
            return;
        }

        // Validate prerequisites
        if (actionDef.prerequisites?.requiresAlive && !player.alive) {
            errors.push(`${playerName} cannot use ${actionName}: player is dead`);
            return;
        }

        if (actionDef.prerequisites?.requiresSoberAndHealthy) {
            // TODO: Check if player is sober and healthy
            // For now, assume they are unless they have drunk/poison tokens  
        }

        // Process action effects
        for (const effect of actionDef.effects) {
            this.processRoleActionEffect(state, event, effect, parameters, errors);
        }
    }

    /**
     * Process individual role action effects
     */
    private processRoleActionEffect(
        state: CompleteGameState, 
        event: GameEvent, 
        effect: any, 
        parameters: string[], 
        errors: string[]
    ): void {
        switch (effect.type) {
            case 'places_token':
                if (effect.tokenToPlace) {
                    const target = this.resolveActionTarget(state, effect.tokenTarget, event, parameters);
                    if (target) {
                        this.handleAddToken(state, {
                            ...event,
                            action: 'add_token',
                            target: target,
                            token: effect.tokenToPlace
                        }, errors);
                    }
                }
                break;

            case 'conditional':
                // TODO: Implement condition evaluation
                if (effect.targetDies && parameters.length > 0) {
                    const target = parameters[0];
                    this.handleDeath(state, {
                        ...event,
                        action: 'die',
                        actor: target
                    }, errors);
                } else if (effect.actorDies) {
                    const actorName = event.actor.split(':')[0];
                    this.handleDeath(state, {
                        ...event,
                        action: 'die',
                        actor: actorName
                    }, errors);
                }
                break;

            case 'learns_information':
                // TODO: Implement information learning
                // For now, just log that information would be learned
                console.log(`${event.actor} would learn information from ${event.details.actionName}`);
                break;

            default:
                errors.push(`Unknown role action effect: ${effect.type}`);
        }
    }

    /**
     * Resolve action target based on effect target specification
     */
    private resolveActionTarget(
        _state: CompleteGameState, 
        targetSpec: string, 
        event: GameEvent, 
        parameters: string[]
    ): string | null {
        switch (targetSpec) {
            case 'actor':
                return event.actor.split(':')[0]; // Player name only
            case 'target':
                return parameters.length > 0 ? parameters[0] : null;
            case 'storyteller_choice':
                // TODO: Implement storyteller choice mechanism
                return null;
            default:
                return null;
        }
    }
    
    private findPlayer(grimoire: GrimoireState, playerName: string) {
        return grimoire.players.find(p => p.name === playerName);
    }
    
    private validateTransition(
        beforeState: CompleteGameState,
        afterState: CompleteGameState,
        event: GameEvent,
        errors: string[]
    ): boolean {
        // Basic validation
        if (beforeState.grimoire.players.length !== afterState.grimoire.players.length) {
            errors.push('Player count changed during transition');
        }
        
        // Phase-specific validation (relaxed - storyteller can add/remove tokens in any phase)
        if (PhaseUtils.isSetupPhase(event.phase)) {
            // Only role assignments and initial tokens allowed in setup
            if (!['assign_role', 'add_token', 'remove_token'].includes(event.action)) {
                errors.push(`Action ${event.action} not allowed in SETUP phase`);
            }
        }
        // Note: Removed strict phase validation for other phases since storyteller actions
        // (like token management) can happen in any phase
        
        return errors.length === 0;
    }
    
    /**
     * Render complete game state to single line format
     */
    renderState(state: CompleteGameState): string {
        return renderGrimoireToSingleLine(state.grimoire);
    }
}