import { describe, it, expect } from 'vitest';
import { ProperGrimoireExecutor } from '../core/proper-operational-semantics';
import { parseGrimoireFromSingleLine } from '../parsing/single-line-parser';
import { renderGrimoireToSingleLine } from '../rendering/single-line-format';

/**
 * Convert from single-line parser result to operational semantics initial state
 */
function createInitialStateFromGrimoire(grimoireString: string) {
    const grimoire = parseGrimoireFromSingleLine(grimoireString);
    return { grimoire };
}

describe('Proper Operational Semantics - Using Existing Types', () => {
    const executor = new ProperGrimoireExecutor(true);
    
    it('should add and remove reminder tokens while preserving roles using proper BOTC phases', () => {
        // 1. Build GameState from grimoire one-liner string literal using existing parser
        const initialGrimoire = '[Alice:washerwoman(poisoner:poisoned) Bob:imp Charlie:chef]';
        const { grimoire: parsedGrimoire } = createInitialStateFromGrimoire(initialGrimoire);
        
        // Verify initial state was parsed correctly using existing renderer
        expect(renderGrimoireToSingleLine(parsedGrimoire)).toBe('[Alice:washerwoman(poisoner:poisoned) Bob:imp Charlie:chef]');
        
        // 2. Near-trivial sequence using proper BOTC phases: add one token, remove another
        const traceFragment = '<EVENING> st!Bob(+washerwoman:townsfolk), st!Alice(-poisoner:poisoned)';
        
        // 3. Apply the trace fragment to the existing grimoire state
        const result = executor.executeTraceFromGrimoire(traceFragment, parsedGrimoire);
        
        // 4. Confirm the resulting game state matches expected grimoire using existing renderer
        const expectedFinalGrimoire = '[Alice:washerwoman Bob:imp(washerwoman:townsfolk) Charlie:chef]';
        const actualFinalGrimoire = executor.renderState(result.finalState);
        
        expect(actualFinalGrimoire).toBe(expectedFinalGrimoire);
        expect(result.invalidTransitions).toHaveLength(0);
        expect(result.phases).toEqual(['EVENING']); // Starting from existing grimoire, only EVENING phase
    });
    
    it('should follow proper BOTC phase transitions', () => {
        const playerNames = ['Alice', 'Bob', 'Charlie'];
        
        // Proper BOTC game flow: SETUP → N1 → DAWN → EVENING → NIGHT → DAWN → EVENING
        const trace = '<SETUP> st!Alice:washerwoman, st!Bob:imp, st!Charlie:chef <N1> Alice:washerwoman!Bob(+washerwoman:townsfolk) <DAWN> <EVENING> Charlie!nominates->Bob, Alice!votes->Bob, st!executes->Bob <NIGHT> st!demon_kill->Alice';
        
        const result = executor.executeTrace(trace, playerNames);
        
        expect(result.invalidTransitions).toHaveLength(0);
        expect(result.phases).toEqual(['SETUP', 'N1', 'DAWN', 'EVENING', 'NIGHT']);
        
        // Verify final state has proper role preservation and death handling
        const finalGrimoire = executor.renderState(result.finalState);
        expect(finalGrimoire).toBe('[*Alice:washerwoman* *Bob:imp(washerwoman:townsfolk)* Charlie:chef]');
    });
    
    it('should validate invalid phase transitions', () => {
        const playerNames = ['Alice', 'Bob'];
        
        // Invalid: SETUP → EVENING (should be SETUP → N1)
        const invalidTrace = '<SETUP> st!Alice:washerwoman <EVENING> Alice!nominates->Bob';
        
        const result = executor.executeTrace(invalidTrace, playerNames);
        
        expect(result.invalidTransitions).toHaveLength(1);
        expect(result.invalidTransitions[0].validationErrors).toContain('Invalid phase transition: SETUP → EVENING');
    });
    
    it('should handle repeating day/night cycles properly', () => {
        const playerNames = ['Alice', 'Bob', 'Charlie', 'Dave'];
        
        // Multiple day/night cycles
        const trace = '<SETUP> st!Alice:washerwoman, st!Bob:imp, st!Charlie:chef, st!Dave:butler <N1> Alice:washerwoman!Bob(+washerwoman:townsfolk) <DAWN> <EVENING> Charlie!nominates->Dave, Bob!votes->Dave, st!executes->Dave <NIGHT> st!demon_kill->Alice <DAWN> <EVENING> Charlie!nominates->Bob <NIGHT>';
        
        const result = executor.executeTrace(trace, playerNames);
        
        expect(result.invalidTransitions).toHaveLength(0);
        expect(result.phases).toEqual(['SETUP', 'N1', 'DAWN', 'EVENING', 'NIGHT', 'DAWN', 'EVENING', 'NIGHT']);
        
        // Verify final state
        const finalGrimoire = executor.renderState(result.finalState);
        expect(finalGrimoire).toBe('[*Alice:washerwoman* Bob:imp(washerwoman:townsfolk) Charlie:chef *Dave:butler*]');
    });
    
    it('should preserve existing grimoire functionality', () => {
        // Test that we can still parse and render complex grimoire states
        const complexGrimoire = '[Alice:washerwoman(poisoner:poisoned,washerwoman:townsfolk) *Bob:imp* *~~Charlie~~:chef(imp:dead)* Dave:butler]';
        const { grimoire } = createInitialStateFromGrimoire(complexGrimoire);
        
        // Verify the existing parser and renderer work correctly
        const rendered = renderGrimoireToSingleLine(grimoire);
        expect(rendered).toBe(complexGrimoire);
        
        // Verify we can extract player information correctly
        expect(grimoire.players).toHaveLength(4);
        expect(grimoire.players[0].name).toBe('Alice');
        expect(grimoire.players[0].role).toBe('washerwoman');
        expect(grimoire.players[0].alive).toBe(true);
        expect(grimoire.players[0].tokens).toEqual(['poisoner:poisoned', 'washerwoman:townsfolk']);
        
        expect(grimoire.players[1].name).toBe('Bob');
        expect(grimoire.players[1].alive).toBe(false);
        expect(grimoire.players[1].ghost).toBe(true);
        
        expect(grimoire.players[2].name).toBe('Charlie');
        expect(grimoire.players[2].alive).toBe(false);
        expect(grimoire.players[2].ghost).toBe(false); // Used ghost vote
    });
});