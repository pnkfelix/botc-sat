// Proper operational semantics using existing grimoire types and realistic BOTC phases

import { GrimoireState } from './grimoire';
import { GameTraceParser, GameEvent, PhaseUtils } from './game-trace-parser';
import { CompleteGameState, CompleteGameStateFactory, GameExecutionStateFactory, GameTransition, OperationalSemanticsTrace } from './game-execution-state';
import { renderGrimoireToSingleLine } from '../rendering/single-line-format';

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
        
        // Just handle the death - don't automatically add tokens
        // The storyteller can add tokens manually if needed
        this.handleDeath(state, {
            ...event,
            action: 'die',
            actor: event.target
        }, errors);
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