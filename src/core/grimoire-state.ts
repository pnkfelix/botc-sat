// Grimoire state representation for operational semantics
// Supports step-by-step evolution through game trace execution

export interface PlayerState {
    name: string;
    role: string | null; // null during setup until role assigned
    isAlive: boolean;
    hasGhostVote: boolean; // true if dead but still has ghost vote
    reminderTokens: string[]; // e.g., ['poi:poisoned', 'ww:townsfolk']
}

export interface GrimoireState {
    players: PlayerState[];
    currentPhase: string; // 'SETUP', 'N1', 'D1', 'E1', etc.
    gameMetadata: {
        playerCount: number;
        script: string; // 'Trouble Brewing', etc.
        storyteller: string;
        startTime?: Date;
    };
    
    // Storyteller-tracked state
    executionState: {
        onTheBlock: string | null; // player currently nominated for execution
        votes: Map<string, string>; // voter -> target (for current nomination)
        voteCount: number; // total votes for current nominee
    };
    
    // Derived state for validation
    roleAssignments: Map<string, string>; // playerName -> roleName
    tokensByPlayer: Map<string, string[]>; // playerName -> tokens
    livingPlayers: Set<string>;
    deadPlayers: Set<string>;
    ghostVotesRemaining: Set<string>; // players who still have ghost vote
}

export interface GrimoireTransition {
    fromState: GrimoireState;
    event: import('./game-trace-parser').GameEvent; // from game-trace-parser
    toState: GrimoireState;
    timestamp?: Date;
    isValid: boolean; // whether this transition follows BOTC rules
    validationErrors?: string[];
}

export interface OperationalSemanticsTrace {
    initialState: GrimoireState;
    transitions: GrimoireTransition[];
    finalState: GrimoireState;
    
    // Metadata
    totalSteps: number;
    phases: string[]; // ordered list of phases encountered
    invalidTransitions: GrimoireTransition[]; // rule violations
}

// Re-export GameEvent from parser for convenience
export { GameEvent } from './game-trace-parser';

/**
 * Factory for creating initial grimoire states
 */
export class GrimoireStateFactory {
    
    /**
     * Create initial empty grimoire state for a given player count
     */
    static createInitialState(
        playerNames: string[], 
        script: string = 'Trouble Brewing',
        storyteller: string = 'Storyteller'
    ): GrimoireState {
        const players: PlayerState[] = playerNames.map(name => ({
            name,
            role: null, // Roles assigned during setup phase
            isAlive: true,
            hasGhostVote: true, // Everyone starts alive, will have ghost vote when they die
            reminderTokens: []
        }));
        
        return {
            players,
            currentPhase: 'SETUP',
            gameMetadata: {
                playerCount: playerNames.length,
                script,
                storyteller,
                startTime: new Date()
            },
            executionState: {
                onTheBlock: null,
                votes: new Map(),
                voteCount: 0
            },
            roleAssignments: new Map(),
            tokensByPlayer: new Map(playerNames.map(name => [name, []])),
            livingPlayers: new Set(playerNames),
            deadPlayers: new Set(),
            ghostVotesRemaining: new Set() // Empty initially, populated when players die
        };
    }
    
    /**
     * Create grimoire state from existing player configurations
     * Useful for testing or reconstructing states
     */
    static createFromPlayers(
        players: PlayerState[],
        phase: string = 'SETUP',
        script: string = 'Trouble Brewing'
    ): GrimoireState {
        const roleAssignments = new Map<string, string>();
        const tokensByPlayer = new Map<string, string[]>();
        const livingPlayers = new Set<string>();
        const deadPlayers = new Set<string>();
        const ghostVotesRemaining = new Set<string>();
        
        for (const player of players) {
            if (player.role) {
                roleAssignments.set(player.name, player.role);
            }
            tokensByPlayer.set(player.name, [...player.reminderTokens]);
            
            if (player.isAlive) {
                livingPlayers.add(player.name);
            } else {
                deadPlayers.add(player.name);
                if (player.hasGhostVote) {
                    ghostVotesRemaining.add(player.name);
                }
            }
        }
        
        return {
            players: players.map(p => ({ ...p, reminderTokens: [...p.reminderTokens] })),
            currentPhase: phase,
            gameMetadata: {
                playerCount: players.length,
                script,
                storyteller: 'Storyteller'
            },
            executionState: {
                onTheBlock: null,
                votes: new Map(),
                voteCount: 0
            },
            roleAssignments,
            tokensByPlayer,
            livingPlayers,
            deadPlayers,
            ghostVotesRemaining
        };
    }
    
    /**
     * Deep clone a grimoire state for immutable transitions
     */
    static cloneState(state: GrimoireState): GrimoireState {
        return {
            players: state.players.map(p => ({
                ...p,
                reminderTokens: [...p.reminderTokens]
            })),
            currentPhase: state.currentPhase,
            gameMetadata: { ...state.gameMetadata },
            executionState: {
                onTheBlock: state.executionState.onTheBlock,
                votes: new Map(state.executionState.votes),
                voteCount: state.executionState.voteCount
            },
            roleAssignments: new Map(state.roleAssignments),
            tokensByPlayer: new Map(Array.from(state.tokensByPlayer.entries()).map(([k, v]) => [k, [...v]])),
            livingPlayers: new Set(state.livingPlayers),
            deadPlayers: new Set(state.deadPlayers),
            ghostVotesRemaining: new Set(state.ghostVotesRemaining)
        };
    }
}

/**
 * Utilities for working with grimoire states
 */
export class GrimoireStateUtils {
    
    /**
     * Get player by name, throw if not found
     */
    static getPlayer(state: GrimoireState, playerName: string): PlayerState {
        const player = state.players.find(p => p.name === playerName);
        if (!player) {
            throw new Error(`Player '${playerName}' not found in grimoire`);
        }
        return player;
    }
    
    /**
     * Check if player exists in grimoire
     */
    static hasPlayer(state: GrimoireState, playerName: string): boolean {
        return state.players.some(p => p.name === playerName);
    }
    
    /**
     * Get all players with a specific role
     */
    static getPlayersWithRole(state: GrimoireState, roleName: string): PlayerState[] {
        return state.players.filter(p => p.role === roleName);
    }
    
    /**
     * Get all players with a specific token
     */
    static getPlayersWithToken(state: GrimoireState, tokenName: string): PlayerState[] {
        return state.players.filter(p => p.reminderTokens.includes(tokenName));
    }
    
    /**
     * Convert grimoire state to single-line format for comparison/debugging
     */
    static toSingleLineFormat(state: GrimoireState): string {
        const playerEntries = state.players.map(player => {
            let entry = '';
            
            // Handle dead player formatting
            if (!player.isAlive) {
                if (player.hasGhostVote) {
                    entry += `*${player.name}`;
                } else {
                    entry += `*~~${player.name}~~`;
                }
            } else {
                entry += player.name;
            }
            
            // Add role if assigned
            if (player.role) {
                entry += `:${player.role}`;
            } else {
                // Show just the name for unassigned players
                // (this handles the case during setup before roles are assigned)
            }
            
            // Add tokens if any
            if (player.reminderTokens.length > 0) {
                entry += `(${player.reminderTokens.join(',')})`;
            }
            
            // Close dead player formatting
            if (!player.isAlive) {
                entry += '*';
            }
            
            return entry;
        });
        
        return `[${playerEntries.join(' ')}]`;
    }
    
    /**
     * Validate grimoire state consistency
     */
    static validateState(state: GrimoireState): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];
        
        // Check role assignment consistency
        for (const [playerName, roleName] of state.roleAssignments) {
            const player = state.players.find(p => p.name === playerName);
            if (!player) {
                errors.push(`Role assignment for non-existent player: ${playerName}`);
            } else if (player.role !== roleName) {
                errors.push(`Role assignment mismatch for ${playerName}: map has ${roleName}, player has ${player.role}`);
            }
        }
        
        // Check token consistency
        for (const [playerName, tokens] of state.tokensByPlayer) {
            const player = state.players.find(p => p.name === playerName);
            if (!player) {
                errors.push(`Token mapping for non-existent player: ${playerName}`);
            } else {
                const playerTokens = new Set(player.reminderTokens);
                const mappedTokens = new Set(tokens);
                
                if (playerTokens.size !== mappedTokens.size || 
                    ![...playerTokens].every(t => mappedTokens.has(t))) {
                    errors.push(`Token inconsistency for ${playerName}: player has ${[...playerTokens]}, map has ${[...mappedTokens]}`);
                }
            }
        }
        
        // Check living/dead player consistency
        for (const player of state.players) {
            const inLiving = state.livingPlayers.has(player.name);
            const inDead = state.deadPlayers.has(player.name);
            
            if (player.isAlive && !inLiving) {
                errors.push(`Living player ${player.name} not in livingPlayers set`);
            }
            if (player.isAlive && inDead) {
                errors.push(`Living player ${player.name} incorrectly in deadPlayers set`);
            }
            if (!player.isAlive && !inDead) {
                errors.push(`Dead player ${player.name} not in deadPlayers set`);
            }
            if (!player.isAlive && inLiving) {
                errors.push(`Dead player ${player.name} incorrectly in livingPlayers set`);
            }
        }
        
        // Check ghost vote consistency
        for (const playerName of state.ghostVotesRemaining) {
            const player = state.players.find(p => p.name === playerName);
            if (!player) {
                errors.push(`Ghost vote for non-existent player: ${playerName}`);
            } else if (player.isAlive) {
                errors.push(`Living player ${playerName} has ghost vote`);
            } else if (!player.hasGhostVote) {
                errors.push(`Player ${playerName} in ghostVotesRemaining but hasGhostVote is false`);
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}