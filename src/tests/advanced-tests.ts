import { SATSolver } from '../core/solver';

export async function runAdvancedSATTests(): Promise<{ results: any[], summary: string }> {
    console.log("Testing SAT solver integration...");
    
    const results = [];
    
    // Test 1: Simple variable assignments
    console.log("\n=== Test 1: Simple Constraints ===");
    const solver1 = new SATSolver();
    const x1 = solver1.addVariable('x');
    const y1 = solver1.addVariable('y');
    solver1.addUnitClause(x1, true);
    solver1.addUnitClause(y1, false);
    const result1 = solver1.solveWithModel();
    results.push({ test: 'simple_constraints', result: result1 });
    console.log("Simple constraints result:", result1);
    
    // Test 2: More complex logical formula
    // Formula: (x1 ∨ x2) ∧ (¬x1) ∧ (¬x3)
    // This should be satisfiable with x1=false, x2=true, x3=false
    console.log("\n=== Test 2: Complex Formula ===");
    console.log("Testing formula: (x1 ∨ x2) ∧ (¬x1) ∧ (¬x3)");
    const solver2 = new SATSolver();
    const x1_2 = solver2.addVariable('x1');
    const x2_2 = solver2.addVariable('x2');
    const x3_2 = solver2.addVariable('x3');
    
    solver2.addClause([x1_2, x2_2]);  // x1 ∨ x2
    solver2.addUnitClause(x1_2, false); // ¬x1
    solver2.addUnitClause(x3_2, false); // ¬x3
    
    const result2 = solver2.solveWithModel();
    results.push({ test: 'complex_formula', result: result2 });
    console.log("Complex formula result:", result2);
    console.log("Model interpretation: x1=" + (result2.model?.x1 ? "true" : "false") + 
               ", x2=" + (result2.model?.x2 ? "true" : "false") + 
               ", x3=" + (result2.model?.x3 ? "true" : "false"));
    
    // Test 3: Unsatisfiable constraints
    console.log("\n=== Test 3: Contradiction ===");
    const solver3 = new SATSolver();
    const x3 = solver3.addVariable('x');
    solver3.addUnitClause(x3, true);
    solver3.addUnitClause(x3, false);
    const result3 = solver3.solveWithModel();
    results.push({ test: 'contradiction', result: result3 });
    console.log("Contradiction result:", result3);
    
    // Test 4: Multiple variables
    console.log("\n=== Test 4: Multiple Variables ===");
    const solver4 = new SATSolver();
    const a4 = solver4.addVariable('a');
    const b4 = solver4.addVariable('b');
    const c4 = solver4.addVariable('c');
    const d4 = solver4.addVariable('d');
    solver4.addUnitClause(a4, true);
    solver4.addUnitClause(b4, false);
    solver4.addUnitClause(c4, true);
    solver4.addUnitClause(d4, false);
    const result4 = solver4.solveWithModel();
    results.push({ test: 'multiple_vars', result: result4 });
    console.log("Multiple variables result:", result4);
    
    const summary = `✅ SAT solver tests completed: ${results.length} tests run`;
    console.log(summary);
    
    return { results, summary };
}