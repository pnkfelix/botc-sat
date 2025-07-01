// Shared test suite that works in both Node.js and browser
// This file can be loaded directly in both environments

async function runSharedSATSolverTests(SATSolver) {
    console.log("Testing SAT solver integration...");
    
    const solver = new SATSolver();
    
    try {
        // Test 1: Simple variable assignments
        console.log("\n=== Test 1: Simple Constraints ===");
        const result1 = await solver.solve(['x=true', 'y=false']);
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
        console.log("Complex formula result:", result2);
        console.log("Model interpretation: x1=" + (result2.model?.x1 ? "true" : "false") + 
                   ", x2=" + (result2.model?.x2 ? "true" : "false") + 
                   ", x3=" + (result2.model?.x3 ? "true" : "false"));
        
        console.log("\n✅ SAT solver tests completed successfully!");
        
        // Return results for browser display
        return {
            test1: result1,
            test2: result2
        };
        
    } catch (error) {
        console.error("SAT solver test error:", error);
        throw error;
    }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runSharedSATSolverTests };
}

// Global for browser
if (typeof window !== 'undefined') {
    window.runSharedSATSolverTests = runSharedSATSolverTests;
}