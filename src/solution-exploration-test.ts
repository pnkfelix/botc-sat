// Test file for exploring JSMiniSolvers solution space capabilities
import { SATSolver } from './solver';

export async function testSolutionExploration(): Promise<void> {
    console.log("=== Testing Solution Space Exploration ===");
    
    // Test 1: Simple problem with multiple solutions
    console.log("\n--- Test 1: Multiple solutions with blocking clauses ---");
    
    // Create problem: (A OR B) AND (C OR D) 
    // This has multiple solutions: A=T,C=T | A=T,D=T | B=T,C=T | B=T,D=T
    const solver1 = new SATSolver();
    const A = solver1.addVariable('A');
    const B = solver1.addVariable('B'); 
    const C = solver1.addVariable('C');
    const D = solver1.addVariable('D');
    
    solver1.addClause([A, B]);    // A OR B
    solver1.addClause([C, D]);    // C OR D
    
    const solutions: Record<string, boolean>[] = [];
    
    // Find first solution
    let result = solver1.solveWithModel();
    if (result.satisfiable && result.model) {
        console.log("Solution 1:", result.model);
        solutions.push(result.model);
        
        // Add blocking clause to exclude this solution
        // If model is {A: true, B: false, C: true, D: false}
        // Add clause: (NOT A OR B OR NOT C OR D)
        const blockingClause: number[] = [];
        for (const [varName, value] of Object.entries(result.model)) {
            const varId = solver1.getVariableId(varName);
            if (varId !== undefined) {
                // Add the negation of this assignment to blocking clause
                blockingClause.push(value ? -varId : varId);
            }
        }
        
        solver1.addClause(blockingClause);
        console.log("Added blocking clause:", blockingClause);
        
        // Find second solution
        result = solver1.solveWithModel();
        if (result.satisfiable && result.model) {
            console.log("Solution 2:", result.model);
            solutions.push(result.model);
        } else {
            console.log("No second solution found");
        }
    } else {
        console.log("No solutions found");
    }
    
    // Test 2: Reset solver and verify first solution again
    console.log("\n--- Test 2: Fresh solver verification ---");
    const solver2 = new SATSolver();
    const A2 = solver2.addVariable('A');
    const B2 = solver2.addVariable('B');
    const C2 = solver2.addVariable('C');
    const D2 = solver2.addVariable('D');
    
    solver2.addClause([A2, B2]);
    solver2.addClause([C2, D2]);
    
    const freshResult = solver2.solveWithModel();
    console.log("Fresh solver result:", freshResult.satisfiable ? freshResult.model : "UNSAT");
    
    // Test 3: Determinism check
    console.log("\n--- Test 3: Determinism check ---");
    console.log("Testing if solver gives same solution every time...");
    
    const sameSolutions = [];
    for (let i = 0; i < 5; i++) {
        const solver = new SATSolver();
        const a = solver.addVariable('A');
        const b = solver.addVariable('B');
        const c = solver.addVariable('C');
        const d = solver.addVariable('D');
        
        solver.addClause([a, b]);
        solver.addClause([c, d]);
        
        const result = solver.solveWithModel();
        if (result.satisfiable && result.model) {
            sameSolutions.push(result.model);
            console.log(`Run ${i + 1}:`, result.model);
        }
    }
    
    // Check if all solutions are identical
    const firstSolution = JSON.stringify(sameSolutions[0]);
    const allSame = sameSolutions.every(sol => JSON.stringify(sol) === firstSolution);
    console.log("All solutions identical?", allSame);
    
    console.log("\n=== Solution Exploration Test Complete ===");
}

// Test function for BOTC-specific variety generation
export async function testBOTCVariety(): Promise<void> {
    console.log("\n=== Testing BOTC Setup Variety ===");
    
    // This will be implemented after we verify basic blocking works
    console.log("BOTC variety testing - TBD after basic tests");
}