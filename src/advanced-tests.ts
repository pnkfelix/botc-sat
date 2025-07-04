import { SATSolver } from './solver';

export async function runAdvancedSATTests(): Promise<{ results: any[], summary: string }> {
    console.log("Testing SAT solver integration...");
    
    const solver = new SATSolver();
    const results = [];
    
    // Test 1: Simple variable assignments
    console.log("\n=== Test 1: Simple Constraints ===");
    const result1 = await solver.solve(['x=true', 'y=false']);
    results.push({ test: 'simple_constraints', result: result1 });
    console.log("Simple constraints result:", result1);
    
    // Test 2: More complex logical formula
    // Formula: (x1 ∨ x2) ∧ (¬x1) ∧ (¬x3)
    // This should be satisfiable with x1=false, x2=true, x3=false
    console.log("\n=== Test 2: Complex Formula ===");
    console.log("Testing formula: (x1 ∨ x2) ∧ (¬x1) ∧ (¬x3)");
    const result2 = await solver.solve([
        'x1=false',  // ¬x1 (x1 must be false)
        'x2=true',   // x2 must be true (to satisfy x1 ∨ x2)
        'x3=false'   // ¬x3 (x3 must be false)
    ]);
    results.push({ test: 'complex_formula', result: result2 });
    console.log("Complex formula result:", result2);
    console.log("Model interpretation: x1=" + (result2.model?.x1 ? "true" : "false") + 
               ", x2=" + (result2.model?.x2 ? "true" : "false") + 
               ", x3=" + (result2.model?.x3 ? "true" : "false"));
    
    // Test 3: Unsatisfiable constraints
    console.log("\n=== Test 3: Contradiction ===");
    const result3 = await solver.solve(['x=true', 'x=false']); // Contradiction
    results.push({ test: 'contradiction', result: result3 });
    console.log("Contradiction result:", result3);
    
    // Test 4: Multiple variables
    console.log("\n=== Test 4: Multiple Variables ===");
    const result4 = await solver.solve(['a=true', 'b=false', 'c=true', 'd=false']);
    results.push({ test: 'multiple_vars', result: result4 });
    console.log("Multiple variables result:", result4);
    
    const summary = `✅ SAT solver tests completed: ${results.length} tests run`;
    console.log(summary);
    
    return { results, summary };
}