import { describe, it, expect } from 'vitest';
import { GrimoireExecutor } from '../core/grimoire-executor';
import { GrimoireStateFactory, GrimoireStateUtils } from '../core/grimoire-state';
import type { GrimoireState } from '../core/grimoire-state';

/**
 * Parse operational semantics grimoire from one-liner string
 * (Different from the existing parser which uses a different GrimoireState type)
 */
function parseOperationalGrimoire(grimoireString: string): GrimoireState {
    const content = grimoireString.slice(1, -1); // Remove [ ]
    const playerEntries = content.split(' ');
    
    // Extract player names
    const playerNames: string[] = [];
    for (const entry of playerEntries) {
        const match = entry.match(/^(?:\*)?([^:*()]+)/);
        if (match) playerNames.push(match[1]);
    }
    
    const state = GrimoireStateFactory.createInitialState(playerNames);
    
    // Parse each player entry
    for (const entry of playerEntries) {
        const isDeadMatch = entry.match(/^\*(.+)\*$/);
        const cleanEntry = isDeadMatch ? isDeadMatch[1] : entry;
        
        const match = cleanEntry.match(/^([^:()]+)(?::([^()]+))?(?:\(([^)]+)\))?$/);
        if (!match) continue;
        
        const [, playerName, role, tokens] = match;
        const player = GrimoireStateUtils.getPlayer(state, playerName);
        
        if (role) {
            player.role = role;
            state.roleAssignments.set(playerName, role);
        }
        
        if (tokens) {
            const tokenList = tokens.split(',');
            player.reminderTokens = tokenList;
            state.tokensByPlayer.set(playerName, tokenList);
        }
        
        if (isDeadMatch) {
            player.isAlive = false;
            player.hasGhostVote = true;
            state.livingPlayers.delete(playerName);
            state.deadPlayers.add(playerName);
            state.ghostVotesRemaining.add(playerName);
        }
    }
    
    return state;
}

describe('Simple Operational Semantics', () => {
    const executor = new GrimoireExecutor(true);
    
    it('should add and remove reminder tokens while preserving roles', () => {
        // 1. Build GameState from grimoire one-liner string literal
        const initialGrimoire = '[Alice:washerwoman(poi:poisoned) Bob:imp Charlie:chef]';
        const initialState = parseOperationalGrimoire(initialGrimoire);
        
        // Verify initial state was parsed correctly
        expect(GrimoireStateUtils.toSingleLineFormat(initialState)).toBe('[Alice:washerwoman(poi:poisoned) Bob:imp Charlie:chef]');
        
        // 2. Near-trivial sequence of actions: add one token, remove another
        const traceFragment = '<N1> st!Bob(+ww:townsfolk), st!Alice(-poi:poisoned)';
        
        // 3. Apply the trace fragment to the game state
        // Create a mock executor that can continue from existing state
        const events = executor['parser'].parseTraceEvents(traceFragment);
        let currentState = initialState;
        
        for (const event of events) {
            const transition = executor.executeStep(currentState, event);
            currentState = transition.toState;
        }
        
        // 4. Confirm the resulting game state matches expected grimoire
        const expectedFinalGrimoire = '[Alice:washerwoman Bob:imp(ww:townsfolk) Charlie:chef]';
        const actualFinalGrimoire = GrimoireStateUtils.toSingleLineFormat(currentState);
        
        expect(actualFinalGrimoire).toBe(expectedFinalGrimoire);
    });
});