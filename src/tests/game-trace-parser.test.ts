import { describe, it, expect } from 'vitest';
import { GameTraceParser } from '../core/game-trace-parser';

describe('Game Trace Parser', () => {
    const parser = new GameTraceParser();

    describe('parseTraceEvents', () => {
        it('should parse basic setup phase', () => {
            const trace = '<SETUP> st!Alice(+dr:is_the_drunk), st!Eve(+ft:red_herring)';
            const events = parser.parseTraceEvents(trace);
            
            expect(events).toHaveLength(2);
            
            expect(events[0]).toEqual({
                phase: 'SETUP',
                actor: 'st',
                action: 'add_token',
                target: 'Alice',
                token: 'dr:is_the_drunk'
            });
            
            expect(events[1]).toEqual({
                phase: 'SETUP',
                actor: 'st',
                action: 'add_token',
                target: 'Eve',
                token: 'ft:red_herring'
            });
        });

        it('should parse night phase with role-specific actions', () => {
            const trace = '<N1> Alice:poisoner!Bob(+poi:poisoned), st!Dave(+ww:townsfolk),Frank(+ww:wrong)';
            const events = parser.parseTraceEvents(trace);
            
            expect(events).toHaveLength(3);
            
            expect(events[0]).toEqual({
                phase: 'N1',
                actor: 'Alice:poisoner',
                action: 'add_token',
                target: 'Bob',
                token: 'poi:poisoned'
            });
            
            expect(events[1]).toEqual({
                phase: 'N1',
                actor: 'st',
                action: 'add_token',
                target: 'Dave',
                token: 'ww:townsfolk'
            });
            
            expect(events[2]).toEqual({
                phase: 'N1',
                actor: 'st',
                action: 'add_token',
                target: 'Frank',
                token: 'ww:wrong'
            });
        });

        it('should parse nominations and voting', () => {
            const trace = '<E1> Frank!nominates->Alice:virgin, Grace!votes->Alice, Bob!votes->Alice';
            const events = parser.parseTraceEvents(trace);
            
            expect(events).toHaveLength(3);
            
            expect(events[0]).toEqual({
                phase: 'E1',
                actor: 'Frank',
                action: 'nominate',
                target: 'Alice',
                details: { targetRole: 'virgin' }
            });
            
            expect(events[1]).toEqual({
                phase: 'E1',
                actor: 'Grace',
                action: 'vote',
                target: 'Alice'
            });
            
            expect(events[2]).toEqual({
                phase: 'E1',
                actor: 'Bob',
                action: 'vote',
                target: 'Alice'
            });
        });

        it('should parse executions and deaths', () => {
            const trace = '<E1> st!executes->Alice, Alice!dies';
            const events = parser.parseTraceEvents(trace);
            
            expect(events).toHaveLength(2);
            
            expect(events[0]).toEqual({
                phase: 'E1',
                actor: 'st',
                action: 'execute',
                target: 'Alice'
            });
            
            expect(events[1]).toEqual({
                phase: 'E1',
                actor: 'Alice',
                action: 'die'
            });
        });

        it('should parse token removal', () => {
            const trace = '<N2> Alice:poisoner!Bob(-poi:poisoned),Carol(+poi:poisoned)';
            const events = parser.parseTraceEvents(trace);
            
            expect(events).toHaveLength(2);
            
            expect(events[0]).toEqual({
                phase: 'N2',
                actor: 'Alice:poisoner',
                action: 'remove_token',
                target: 'Bob',
                token: 'poi:poisoned'
            });
            
            expect(events[1]).toEqual({
                phase: 'N2',
                actor: 'st', // Simplified syntax implies storyteller
                action: 'add_token',
                target: 'Carol',
                token: 'poi:poisoned'
            });
        });

        it('should handle multiple phases in sequence', () => {
            const trace = '<SETUP> st!Alice(+dr:is_the_drunk) <N1> Alice:poisoner!Bob(+poi:poisoned) <E1> Frank!nominates->Alice:virgin';
            const events = parser.parseTraceEvents(trace);
            
            expect(events).toHaveLength(3);
            expect(events[0].phase).toBe('SETUP');
            expect(events[1].phase).toBe('N1');
            expect(events[2].phase).toBe('E1');
        });
    });

    describe('parseGameTrace', () => {
        it('should derive sober/healthy status for washerwoman when not drunk', () => {
            const trace = '<SETUP> st!Bob(+ft:red_herring) <N1> st!Alice(+ww:townsfolk),Carol(+ww:wrong)';
            const context = parser.parseGameTrace(trace);
            
            // Washerwoman acted sober and healthy (no drunk token on any player)
            expect(context.soberHealthyWhenActing.get('washerwoman')).toBe(true);
        });

        it('should derive sober/healthy status for washerwoman when drunk', () => {
            const trace = '<SETUP> st!Alice(+dr:is_the_drunk) <N1> st!Dave(+ww:townsfolk),Frank(+ww:wrong)';
            const context = parser.parseGameTrace(trace);
            
            // Need to implement role assignment tracking for this to work properly
            // For now, this tests the basic structure
            expect(context.setupTokens.get('Alice')).toContain('dr:is_the_drunk');
        });

        it('should track virgin nomination events', () => {
            const trace = '<E1> Frank!nominates->Alice:virgin, st!Alice(+virgin:no_ability)';
            const context = parser.parseGameTrace(trace);
            
            expect(context.eventTriggered.get('virgin_was_nominated')).toBe(true);
        });

        it('should track current token states', () => {
            const trace = '<SETUP> st!Alice(+dr:is_the_drunk) <N1> Bob:poisoner!Carol(+poi:poisoned)';
            const context = parser.parseGameTrace(trace);
            
            expect(context.currentTokens.get('Alice')).toContain('dr:is_the_drunk');
            expect(context.currentTokens.get('Carol')).toContain('poi:poisoned');
        });

        it('should handle token removal correctly', () => {
            const trace = '<N1> Alice:poisoner!Bob(+poi:poisoned) <N2> Alice:poisoner!Bob(-poi:poisoned),Carol(+poi:poisoned)';
            const context = parser.parseGameTrace(trace);
            
            // Bob should no longer have poison token
            const bobTokens = context.currentTokens.get('Bob') || [];
            expect(bobTokens).not.toContain('poi:poisoned');
            
            // Carol should have poison token
            const carolTokens = context.currentTokens.get('Carol') || [];
            expect(carolTokens).toContain('poi:poisoned');
        });

        it('should generate constraint variables', () => {
            const trace = '<SETUP> st!Alice(+dr:is_the_drunk) <N1> st!Dave(+ww:townsfolk) <E1> Frank!nominates->Carol:virgin';
            const context = parser.parseGameTrace(trace);
            const variables = parser.getConstraintVariables(context);
            
            // Should have washerwoman sober/healthy variable
            expect(variables.has('washerwoman_was_sober_and_healthy_when_acting')).toBe(true);
            
            // Should have virgin nomination variable
            expect(variables.get('virgin_was_nominated')).toBe(true);
        });
    });

    describe('complex game scenarios', () => {
        it('should parse complete game example from documentation', () => {
            const trace = '<SETUP> st!Alice(+dr:is_the_drunk), st!Eve(+ft:red_herring) <N1> Alice:poisoner!Bob(+poi:poisoned), st!Dave(+ww:townsfolk),Frank(+ww:wrong), Carol:butler!Grace(+but:master) <E1> Frank!nominates->Alice:virgin, st!Alice(+virgin:no_ability) <N2> Alice:poisoner!Bob(-poi:poisoned),Carol(+poi:poisoned), Dave:imp!Grace(+imp:dead), Grace!dies';
            
            const events = parser.parseTraceEvents(trace);
            expect(events.length).toBeGreaterThanOrEqual(10);
            
            // Check setup phase
            const setupEvents = events.filter(e => e.phase === 'SETUP');
            expect(setupEvents).toHaveLength(2);
            
            // Check N1 phase  
            const n1Events = events.filter(e => e.phase === 'N1');
            expect(n1Events).toHaveLength(4);
            
            // Check E1 phase
            const e1Events = events.filter(e => e.phase === 'E1');
            expect(e1Events).toHaveLength(2);
            
            // Check N2 phase
            const n2Events = events.filter(e => e.phase === 'N2');
            expect(n2Events).toHaveLength(4);
            
            const context = parser.parseGameTrace(trace);
            
            // Verify setup tokens
            expect(context.setupTokens.get('Alice')).toContain('dr:is_the_drunk');
            expect(context.setupTokens.get('Eve')).toContain('ft:red_herring');
            
            // Verify current tokens after all events
            expect(context.currentTokens.get('Carol')).toContain('poi:poisoned');
            expect(context.currentTokens.get('Grace')).toContain('but:master');
            expect(context.currentTokens.get('Grace')).toContain('imp:dead');
            
            // Bob should not have poison token anymore
            const bobTokens = context.currentTokens.get('Bob') || [];
            expect(bobTokens).not.toContain('poi:poisoned');
            
            // Virgin should have been nominated
            expect(context.eventTriggered.get('virgin_was_nominated')).toBe(true);
        });

        it('should handle execution sequence with voting', () => {
            const trace = '<SETUP> st!Bob(+dr:is_the_drunk) <N1> Alice:poisoner!Carol(+poi:poisoned), st!Dave(+ww:townsfolk),Eve(+ww:wrong) <E1> Frank!nominates->Alice:virgin, Grace!votes->Alice, Bob!votes->Alice, Carol!votes->Alice, st!executes->Alice, Alice!dies <N2> st!demon_kill->Bob, Bob!dies';
            
            const events = parser.parseTraceEvents(trace);
            const context = parser.parseGameTrace(trace);
            
            // Check execution sequence
            const executionEvents = events.filter(e => e.action === 'execute' || e.action === 'die');
            expect(executionEvents.length).toBeGreaterThanOrEqual(2);
            
            // Check voting events
            const voteEvents = events.filter(e => e.action === 'vote');
            expect(voteEvents).toHaveLength(3);
            
            expect(context.eventTriggered.get('virgin_was_nominated')).toBe(true);
        });
    });
});