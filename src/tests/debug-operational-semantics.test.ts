import { describe, it } from 'vitest';
import { ProperGrimoireExecutor } from '../core/proper-operational-semantics';
import { parseGrimoireFromSingleLine } from '../parsing/single-line-parser';
import { renderGrimoireToSingleLine } from '../rendering/single-line-format';

describe('Debug Operational Semantics', () => {
    const executor = new ProperGrimoireExecutor(true);
    
    it('should debug what is happening with the simple case', () => {
        // Parse initial grimoire
        const initialGrimoire = '[Alice:washerwoman(poisoner:poisoned) Bob:imp Charlie:chef]';
        const parsedGrimoire = parseGrimoireFromSingleLine(initialGrimoire);
        
        console.log('Initial grimoire:', renderGrimoireToSingleLine(parsedGrimoire));
        
        // Simple trace
        const traceFragment = '<EVENING> st!Bob(+washerwoman:townsfolk)';
        
        const result = executor.executeTraceFromGrimoire(traceFragment, parsedGrimoire);
        
        console.log('Phases:', result.phases);
        console.log('Total steps:', result.totalSteps);
        console.log('Invalid transitions:', result.invalidTransitions.length);
        
        if (result.invalidTransitions.length > 0) {
            result.invalidTransitions.forEach((transition, i) => {
                console.log(`Invalid transition ${i + 1}:`, transition.validationErrors);
                console.log('Event:', transition.event);
            });
        }
        
        console.log('Final grimoire:', executor.renderState(result.finalState));
    });
    
    it('should debug token-based demon kill', () => {
        // Parse initial grimoire
        const initialGrimoire = '[Alice:washerwoman Bob:imp Charlie:chef]';
        const parsedGrimoire = parseGrimoireFromSingleLine(initialGrimoire);
        
        console.log('BEFORE imp kill - Initial grimoire:', renderGrimoireToSingleLine(parsedGrimoire));
        
        // Token-based demon kill: Bob:imp places dead token on Alice
        const traceFragment = '<NIGHT> Bob:imp!Alice(+imp:dead)';
        
        const result = executor.executeTraceFromGrimoire(traceFragment, parsedGrimoire);
        
        console.log('AFTER imp kill - Final grimoire:', executor.renderState(result.finalState));
        console.log('Alice should be dead with imp:dead token');
    });
});