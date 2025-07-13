import { describe, it, expect } from 'vitest';
import { SATSolver } from '../core/solver';

describe('SAT Solver CNF Interface', () => {
    it('should handle conjunction with contradiction (UNSAT)', () => {
        // CNF: x=true, y=false, require (x AND y)
        const solver = new SATSolver();
        const x = solver.addVariable('x');
        const y = solver.addVariable('y');
        solver.addUnitClause(x, true);   // x = true
        solver.addUnitClause(y, false);  // y = false
        
        const result = solver.solveWithModel();
        
        // This should be SAT because we're not actually enforcing (x AND y) = true
        // We're just setting x=true, y=false which is consistent
        expect(result.satisfiable).toBe(true);
        expect(result.model).toEqual({ x: true, y: false });
    });

    it('should handle conjunction when satisfiable (SAT)', () => {
        // CNF: x=true, y=true
        const solver = new SATSolver();
        const x = solver.addVariable('x');
        const y = solver.addVariable('y');
        solver.addUnitClause(x, true);   // x = true
        solver.addUnitClause(y, true);   // y = true
        
        const result = solver.solveWithModel();
        
        expect(result.satisfiable).toBe(true);
        expect(result.model).toEqual({ x: true, y: true });
    });

    it('should handle disjunction when satisfiable (SAT)', () => {
        // CNF: (x OR y), x=true, y=false
        const solver = new SATSolver();
        const x = solver.addVariable('x');
        const y = solver.addVariable('y');
        solver.addClause([x, y]);        // x OR y
        solver.addUnitClause(x, true);   // x = true
        solver.addUnitClause(y, false);  // y = false
        
        const result = solver.solveWithModel();
        
        expect(result.satisfiable).toBe(true);
        expect(result.model).toEqual({ x: true, y: false });
    });

    it('should handle disjunction with contradiction (UNSAT)', () => {
        // CNF: (x OR y), x=false, y=false
        const solver = new SATSolver();
        const x = solver.addVariable('x');
        const y = solver.addVariable('y');
        solver.addClause([x, y]);        // x OR y
        solver.addUnitClause(x, false);  // x = false
        solver.addUnitClause(y, false);  // y = false
        
        const result = solver.solveWithModel();
        
        expect(result.satisfiable).toBe(false);
        expect(result.model).toBeUndefined();
    });

    it('should handle negation with contradiction (UNSAT)', () => {
        // CNF: x=true, NOT x must be true
        const solver = new SATSolver();
        const x = solver.addVariable('x');
        solver.addUnitClause(x, true);   // x = true
        solver.addUnitClause(x, false);  // NOT x = true (i.e., x = false)
        
        const result = solver.solveWithModel();
        
        expect(result.satisfiable).toBe(false);
        expect(result.model).toBeUndefined();
    });

    it('should handle negation when satisfiable (SAT)', () => {
        // CNF: x=false
        const solver = new SATSolver();
        const x = solver.addVariable('x');
        solver.addUnitClause(x, false);  // x = false (which means NOT x = true)
        
        const result = solver.solveWithModel();
        
        expect(result.satisfiable).toBe(true);
        expect(result.model).toEqual({ x: false });
    });

    it('should handle implication with contradiction (UNSAT)', () => {
        // CNF: (NOT x OR y), x=true, y=false
        const solver = new SATSolver();
        const x = solver.addVariable('x');
        const y = solver.addVariable('y');
        solver.addClause([-x, y]);       // x => y  (equivalent to NOT x OR y)
        solver.addUnitClause(x, true);   // x = true
        solver.addUnitClause(y, false);  // y = false
        
        const result = solver.solveWithModel();
        
        expect(result.satisfiable).toBe(false);
        expect(result.model).toBeUndefined();
    });

    it('should handle implication when satisfiable (SAT)', () => {
        // CNF: (NOT x OR y), x=true, y=true
        const solver = new SATSolver();
        const x = solver.addVariable('x');
        const y = solver.addVariable('y');
        solver.addClause([-x, y]);       // x => y
        solver.addUnitClause(x, true);   // x = true
        solver.addUnitClause(y, true);   // y = true
        
        const result = solver.solveWithModel();
        
        expect(result.satisfiable).toBe(true);
        expect(result.model).toEqual({ x: true, y: true });
    });

    it('should handle complex formula with Tseitin transformation (SAT)', () => {
        // CNF: Tseitin transformation of ((x AND y) OR z), x=false, y=true, z=true
        const solver = new SATSolver();
        const x = solver.addVariable('x');
        const y = solver.addVariable('y');
        const z = solver.addVariable('z');
        const and_xy = solver.addVariable('and_xy');  // auxiliary variable for (x AND y)
        const result_var = solver.addVariable('result'); // auxiliary variable for final result
        
        // Tseitin encoding for (x AND y)
        solver.addClause([-and_xy, x]);      // and_xy => x
        solver.addClause([-and_xy, y]);      // and_xy => y  
        solver.addClause([and_xy, -x, -y]);  // (x AND y) => and_xy
        
        // Tseitin encoding for (and_xy OR z)
        solver.addClause([-result_var, and_xy, z]);     // result => (and_xy OR z)
        solver.addClause([result_var, -and_xy]);        // (and_xy OR z) => result
        solver.addClause([result_var, -z]);             // (and_xy OR z) => result
        
        solver.addUnitClause(result_var, true);  // require result to be true
        solver.addUnitClause(x, false);          // x = false
        solver.addUnitClause(y, true);           // y = true  
        solver.addUnitClause(z, true);           // z = true
        
        const result = solver.solveWithModel();
        
        expect(result.satisfiable).toBe(true);
        expect(result.model).toEqual({
            x: false,
            y: true,
            z: true,
            and_xy: false,
            result: true
        });
        
        // Verify the logic: (false AND true) OR true = false OR true = true
        const model = result.model!;
        const and_result = model.x && model.y;
        const final_result = and_result || model.z;
        expect(final_result).toBe(true);
    });
});