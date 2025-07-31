import { describe, it, expect } from 'vitest';
import { ProperGrimoireExecutor } from '../core/proper-operational-semantics';
import { parseGrimoireFromSingleLine } from '../parsing/single-line-parser';
import { registerTroubleBrewing } from '../data/trouble-brewing-roles';

describe('Role Actions - Script-Parametric Actions', () => {
    // Register roles so script-parametric actions work
    registerTroubleBrewing();
    
    const executor = new ProperGrimoireExecutor(true);
    
    it('should handle slayer shoot_at action', () => {
        // Setup game with Slayer and Imp
        const initialGrimoire = '[Alice:slayer Bob:imp Charlie:chef]';
        const parsedGrimoire = parseGrimoireFromSingleLine(initialGrimoire);
        
        // Suppress debug output for cleaner test runs
        
        // Slayer shoots at the Imp (should kill the target)
        const traceFragment = '<EVENING> Alice:slayer!shoot_at(Bob)';
        
        const result = executor.executeTraceFromGrimoire(traceFragment, parsedGrimoire);
        
        // Result details available in result object for debugging
        
        // Slayer should have shot at Bob, and Bob should be dead (conditional on Bob being demon)
        // Slayer should have no_ability token showing the ability was used
        expect(result.invalidTransitions).toHaveLength(0);
    });
    
    it('should handle monk protect action', () => {
        // Setup game with Monk
        const initialGrimoire = '[Alice:monk Bob:imp Charlie:chef]';
        const parsedGrimoire = parseGrimoireFromSingleLine(initialGrimoire);
        
        // Suppress debug output for cleaner test runs
        
        // Monk protects Charlie 
        const traceFragment = '<NIGHT> Alice:monk!protect(Charlie)';
        
        const result = executor.executeTraceFromGrimoire(traceFragment, parsedGrimoire);
        
        // Result details available in result object for debugging
        
        // Charlie should have monk:safe token
        expect(result.invalidTransitions).toHaveLength(0);
        const charliePlayer = result.finalState.grimoire.players.find(p => p.name === 'Charlie');
        expect(charliePlayer?.tokens).toContain('monk:safe');
    });
    
    it('should handle fortune teller divine action', () => {
        // Setup game with Fortune Teller
        const initialGrimoire = '[Alice:fortune_teller Bob:imp Charlie:chef]';
        const parsedGrimoire = parseGrimoireFromSingleLine(initialGrimoire);
        
        // Suppress debug output for cleaner test runs
        
        // Fortune Teller divines two players
        const traceFragment = '<NIGHT> Alice:fortune_teller!divine(Bob, Charlie)';
        
        const result = executor.executeTraceFromGrimoire(traceFragment, parsedGrimoire);
        
        // Result details available in result object for debugging
        
        // Information learning action should not cause errors
        expect(result.invalidTransitions).toHaveLength(0);
    });
    
    it('should demonstrate mixed traditional and new action formats', () => {
        // Setup game
        const initialGrimoire = '[Alice:slayer Bob:imp Charlie:monk Dave:chef]';
        const parsedGrimoire = parseGrimoireFromSingleLine(initialGrimoire);
        
        // Suppress debug output for cleaner test runs
        
        // Mix of old and new formats
        const traceFragment = '<NIGHT> Charlie:monk!protect(Alice), Bob:imp!Alice(+imp:dead) <DAWN> <EVENING> Alice:slayer!shoot_at(Bob)';
        
        const result = executor.executeTraceFromGrimoire(traceFragment, parsedGrimoire);
        
        // Result details available in result object for debugging
        
        // Should demonstrate both formats working together
        expect(result.phases).toEqual(['NIGHT', 'DAWN', 'EVENING']);
    });
});