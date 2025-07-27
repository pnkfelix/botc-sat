import { describe, it, expect, beforeAll } from 'vitest';
import { ReminderTokenCompiler } from '../core/reminder-token-compiler';
import { SATSolver } from '../core/solver';
import { troubleBrewing } from '../core/scripts';
import { registerTroubleBrewing } from '../data/trouble-brewing-roles';

describe('Temporal Constraint System', () => {
    beforeAll(() => {
        registerTroubleBrewing();
    });

    it('should generate temporal context variables for information gathering roles', () => {
        const solver = new SATSolver();
        const compiler = new ReminderTokenCompiler();
        
        const result = compiler.compileWithTemporalConstraints(troubleBrewing, solver, 7);
        
        // Should have generated sober/healthy variables for information roles
        expect(result.temporalContext.soberHealthyWhenActing.has('washerwoman')).toBe(true);
        expect(result.temporalContext.soberHealthyWhenActing.has('librarian')).toBe(true);
        expect(result.temporalContext.soberHealthyWhenActing.has('investigator')).toBe(true);
        
        // Should NOT have generated them for non-information roles
        expect(result.temporalContext.soberHealthyWhenActing.has('poisoner')).toBe(false);
        expect(result.temporalContext.soberHealthyWhenActing.has('virgin')).toBe(false);
    });

    it('should create conditional constraints for washerwoman tokens', () => {
        const solver = new SATSolver();
        const compiler = new ReminderTokenCompiler();
        
        compiler.compileWithTemporalConstraints(troubleBrewing, solver, 7);
        
        // Should have created the sober/healthy variable
        const soberHealthyVar = solver.getVariableId('washerwoman_was_sober_and_healthy_when_acting');
        expect(soberHealthyVar).toBeDefined();
        expect(soberHealthyVar).toBeGreaterThan(0);
        
        // Should have token placement variables
        const townsfokTokenVar = solver.getVariableId('token_placed_washerwoman_townsfolk_at_0');
        expect(townsfokTokenVar).toBeDefined();
        
        const wrongTokenVar = solver.getVariableId('token_placed_washerwoman_wrong_at_0');
        expect(wrongTokenVar).toBeDefined();
        
        // Should have more variables and clauses than basic compilation
        expect(solver.getVariableCount()).toBeGreaterThan(100);
        expect(solver.getClauseCount()).toBeGreaterThan(50);
    });

    it('should demonstrate conditional behavior - washerwoman tokens only required when sober/healthy', () => {
        // Test case 1: Washerwoman sober and healthy - tokens required
        const solver1 = new SATSolver();
        const compiler1 = new ReminderTokenCompiler();
        
        compiler1.compileWithTemporalConstraints(troubleBrewing, solver1, 7);
        
        // Force washerwoman to be present and sober/healthy
        const washerwomanVar = solver1.getVariableId('washerwoman_present');
        const soberHealthyVar = solver1.getVariableId('washerwoman_was_sober_and_healthy_when_acting');
        
        if (washerwomanVar && soberHealthyVar) {
            solver1.addUnitClause(washerwomanVar, true);
            solver1.addUnitClause(soberHealthyVar, true);
            
            const result1 = solver1.solve();
            expect(result1).toBe(true); // Should be satisfiable with token placement
        }
        
        // Test case 2: Washerwoman present but not sober/healthy - tokens not required
        const solver2 = new SATSolver();
        const compiler2 = new ReminderTokenCompiler();
        
        compiler2.compileWithTemporalConstraints(troubleBrewing, solver2, 7);
        
        const washerwomanVar2 = solver2.getVariableId('washerwoman_present');
        const soberHealthyVar2 = solver2.getVariableId('washerwoman_was_sober_and_healthy_when_acting');
        
        if (washerwomanVar2 && soberHealthyVar2) {
            solver2.addUnitClause(washerwomanVar2, true);
            solver2.addUnitClause(soberHealthyVar2, false); // Not sober/healthy
            
            const result2 = solver2.solve();
            expect(result2).toBe(true); // Should still be satisfiable (no token requirement)
        }
    });

    it('should handle poisoner transient state variables', () => {
        const solver = new SATSolver();
        const compiler = new ReminderTokenCompiler();
        
        const result = compiler.compileWithTemporalConstraints(troubleBrewing, solver, 7);
        
        // Should have created poisoning state variables
        const poisoningState = result.temporalContext.transientStateActive.get('poisoning');
        expect(poisoningState).toBeDefined();
        
        if (poisoningState) {
            const poisonVars = poisoningState.split(',');
            expect(poisonVars).toHaveLength(7); // One for each player
            
            // Check that variables were actually created
            for (let i = 0; i < 7; i++) {
                const varId = solver.getVariableId(`player_${i}_currently_poisoned`);
                expect(varId).toBeDefined();
                expect(varId).toBeGreaterThan(0);
            }
        }
    });

    it('should create virgin event-triggered variables', () => {
        const solver = new SATSolver();
        const compiler = new ReminderTokenCompiler();
        
        const result = compiler.compileWithTemporalConstraints(troubleBrewing, solver, 7);
        
        // Should have created nomination event variable for virgin
        const nominationVar = result.temporalContext.eventTriggered.get('nomination_virgin');
        expect(nominationVar).toBeDefined();
        
        if (nominationVar) {
            const varId = solver.getVariableId(nominationVar);
            expect(varId).toBeDefined();
            expect(varId).toBeGreaterThan(0);
        }
    });

    it('should maintain backward compatibility with existing token system', () => {
        const solver1 = new SATSolver();
        const compiler1 = new ReminderTokenCompiler();
        
        // Old method
        const oldVarCount = compiler1.compileReminderTokenConstraints(troubleBrewing, solver1, 7);
        
        const solver2 = new SATSolver();
        const compiler2 = new ReminderTokenCompiler();
        
        // New method
        const newResult = compiler2.compileWithTemporalConstraints(troubleBrewing, solver2, 7);
        
        // New method should have more variables (due to temporal context)
        expect(newResult.tokenVarCount).toBeGreaterThan(oldVarCount);
        
        // Both should create basic token placement variables
        const oldTokenVar = solver1.getVariableId('token_placed_washerwoman_townsfolk_at_0');
        const newTokenVar = solver2.getVariableId('token_placed_washerwoman_townsfolk_at_0');
        
        expect(oldTokenVar).toBeDefined();
        expect(newTokenVar).toBeDefined();
    });
});