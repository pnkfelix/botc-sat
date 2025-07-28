// Game execution state separate from grimoire representation
// Tracks dynamic game flow information (voting, nominations, phases)

import { GrimoireState } from './grimoire';

/**
 * Tracks the current execution state of a BOTC game
 * This is separate from the grimoire itself
 */
export interface GameExecutionState {
    currentPhase: string; // 'SETUP', 'N1', 'D1', 'E1', etc.
    
    // Current voting/nomination state
    onTheBlock: string | null; // player currently nominated for execution
    votes: Map<string, string>; // voter -> target (for current nomination)
    voteCount: number; // total votes for current nominee
    
    // Game metadata
    gameMetadata: {
        playerCount: number;
        script: string; // 'Trouble Brewing', etc.
        storyteller: string;
        startTime?: Date;
    };
}

/**
 * Complete game state combining grimoire + execution state
 */
export interface CompleteGameState {
    grimoire: GrimoireState;
    execution: GameExecutionState;
}

/**
 * Represents a single step transition in the operational semantics
 */
export interface GameTransition {
    fromState: CompleteGameState;
    event: import('./game-trace-parser').GameEvent;
    toState: CompleteGameState;
    timestamp?: Date;
    isValid: boolean;
    validationErrors?: string[];
}

/**
 * Complete trace of operational semantics execution
 */
export interface OperationalSemanticsTrace {
    initialState: CompleteGameState;
    transitions: GameTransition[];
    finalState: CompleteGameState;
    
    // Metadata
    totalSteps: number;
    phases: string[];
    invalidTransitions: GameTransition[];
}

/**
 * Factory for creating game execution states
 */
export class GameExecutionStateFactory {
    
    static createInitialExecutionState(
        playerCount: number,
        script: string = 'Trouble Brewing',
        storyteller: string = 'Storyteller'
    ): GameExecutionState {
        return {
            currentPhase: 'SETUP',
            onTheBlock: null,
            votes: new Map(),
            voteCount: 0,
            gameMetadata: {
                playerCount,
                script,
                storyteller,
                startTime: new Date()
            }
        };
    }
    
    static cloneExecutionState(state: GameExecutionState): GameExecutionState {
        return {
            currentPhase: state.currentPhase,
            onTheBlock: state.onTheBlock,
            votes: new Map(state.votes),
            voteCount: state.voteCount,
            gameMetadata: { ...state.gameMetadata }
        };
    }
}

/**
 * Factory for creating complete game states
 */
export class CompleteGameStateFactory {
    
    static createInitialState(
        playerNames: string[],
        script: string = 'Trouble Brewing',
        storyteller: string = 'Storyteller'
    ): CompleteGameState {
        // Create players with the original grimoire.ts structure
        const players = playerNames.map((name, index) => ({
            name,
            role: '', // Empty initially, will be assigned during setup
            alive: true,
            position: index,
            tokens: [] as string[],
            ghost: true // Will have ghost vote when they die
        }));
        
        const grimoire: GrimoireState = { players };
        const execution = GameExecutionStateFactory.createInitialExecutionState(
            playerNames.length, script, storyteller
        );
        
        return { grimoire, execution };
    }
    
    static cloneState(state: CompleteGameState): CompleteGameState {
        return {
            grimoire: {
                players: state.grimoire.players.map(p => ({
                    ...p,
                    tokens: [...p.tokens]
                }))
            },
            execution: GameExecutionStateFactory.cloneExecutionState(state.execution)
        };
    }
}