// Proper SAT solver tests for logical operators
import { SATSolver } from './solver';

export async function runSATOperatorTests(): Promise<void> {
    console.log("=== Testing SAT Solver Logical Operators ===");
    
    const solver = new SATSolver();
    
    // Test 1: Conjunction (AND) - should be UNSAT
    console.log("\n--- Test 1: Conjunction (x AND y) with contradiction ---");
    console.log("Formula: (x AND y) with x=true, y=false");
    try {
        const result1 = await solver.solve(['x AND y', 'x=true', 'y=false']);
        console.log("Result:", result1.satisfiable ? "SAT (WRONG)" : "UNSAT (correct)");
        if (result1.satisfiable) {
            console.log("  Model:", result1.model);
            console.log("  ERROR: Should be UNSAT - x AND y cannot be true when y=false");
        }
    } catch (error) {
        console.log("  PARSE ERROR:", (error as Error).message);
    }
    
    // Test 2: Conjunction (AND) - should be SAT
    console.log("\n--- Test 2: Conjunction (x AND y) satisfiable ---");
    console.log("Formula: (x AND y) with x=true, y=true");
    try {
        const result2 = await solver.solve(['x AND y', 'x=true', 'y=true']);
        console.log("Result:", result2.satisfiable ? "SAT (correct)" : "UNSAT (WRONG)");
        if (result2.satisfiable) {
            console.log("  Model:", result2.model);
        } else {
            console.log("  ERROR: Should be SAT - x AND y should be true when both x=true, y=true");
        }
    } catch (error) {
        console.log("  PARSE ERROR:", (error as Error).message);
    }
    
    // Test 3: Disjunction (OR) - should be SAT
    console.log("\n--- Test 3: Disjunction (x OR y) satisfiable ---");
    console.log("Formula: (x OR y) with x=true, y=false");
    try {
        const result3 = await solver.solve(['x OR y', 'x=true', 'y=false']);
        console.log("Result:", result3.satisfiable ? "SAT (correct)" : "UNSAT (WRONG)");
        if (result3.satisfiable) {
            console.log("  Model:", result3.model);
        } else {
            console.log("  ERROR: Should be SAT - x OR y should be true when x=true");
        }
    } catch (error) {
        console.log("  PARSE ERROR:", (error as Error).message);
    }
    
    // Test 4: Disjunction (OR) - should be UNSAT
    console.log("\n--- Test 4: Disjunction (x OR y) with contradiction ---");
    console.log("Formula: (x OR y) with x=false, y=false");
    try {
        const result4 = await solver.solve(['x OR y', 'x=false', 'y=false']);
        console.log("Result:", result4.satisfiable ? "SAT (WRONG)" : "UNSAT (correct)");
        if (result4.satisfiable) {
            console.log("  Model:", result4.model);
            console.log("  ERROR: Should be UNSAT - x OR y cannot be true when both x=false, y=false");
        }
    } catch (error) {
        console.log("  PARSE ERROR:", (error as Error).message);
    }
    
    // Test 5: Negation (NOT) - should be UNSAT
    console.log("\n--- Test 5: Negation (NOT x) with contradiction ---");
    console.log("Formula: (NOT x) with x=true");
    try {
        const result5 = await solver.solve(['NOT x', 'x=true']);
        console.log("Result:", result5.satisfiable ? "SAT (WRONG)" : "UNSAT (correct)");
        if (result5.satisfiable) {
            console.log("  Model:", result5.model);
            console.log("  ERROR: Should be UNSAT - NOT x cannot be true when x=true");
        }
    } catch (error) {
        console.log("  PARSE ERROR:", (error as Error).message);
    }
    
    // Test 6: Negation (NOT) - should be SAT
    console.log("\n--- Test 6: Negation (NOT x) satisfiable ---");
    console.log("Formula: (NOT x) with x=false");
    try {
        const result6 = await solver.solve(['NOT x', 'x=false']);
        console.log("Result:", result6.satisfiable ? "SAT (correct)" : "UNSAT (WRONG)");
        if (result6.satisfiable) {
            console.log("  Model:", result6.model);
        } else {
            console.log("  ERROR: Should be SAT - NOT x should be true when x=false");
        }
    } catch (error) {
        console.log("  PARSE ERROR:", (error as Error).message);
    }
    
    // Test 7: Implication (=>) - should be UNSAT
    console.log("\n--- Test 7: Implication (x => y) with contradiction ---");
    console.log("Formula: (x => y) with x=true, y=false");
    try {
        const result7 = await solver.solve(['x => y', 'x=true', 'y=false']);
        console.log("Result:", result7.satisfiable ? "SAT (WRONG)" : "UNSAT (correct)");
        if (result7.satisfiable) {
            console.log("  Model:", result7.model);
            console.log("  ERROR: Should be UNSAT - x => y cannot be true when x=true, y=false");
        }
    } catch (error) {
        console.log("  PARSE ERROR:", (error as Error).message);
    }
    
    // Test 8: Implication (=>) - should be SAT
    console.log("\n--- Test 8: Implication (x => y) satisfiable ---");
    console.log("Formula: (x => y) with x=true, y=true");
    try {
        const result8 = await solver.solve(['x => y', 'x=true', 'y=true']);
        console.log("Result:", result8.satisfiable ? "SAT (correct)" : "UNSAT (WRONG)");
        if (result8.satisfiable) {
            console.log("  Model:", result8.model);
        } else {
            console.log("  ERROR: Should be SAT - x => y should be true when x=true, y=true");
        }
    } catch (error) {
        console.log("  PARSE ERROR:", (error as Error).message);
    }
    
    // Test 9: Complex formula - should be SAT
    console.log("\n--- Test 9: Complex formula ((x AND y) OR z) ---");
    console.log("Formula: ((x AND y) OR z) with x=false, y=true, z=true");
    try {
        const result9 = await solver.solve(['(x AND y) OR z', 'x=false', 'y=true', 'z=true']);
        console.log("Result:", result9.satisfiable ? "SAT (correct)" : "UNSAT (WRONG)");
        if (result9.satisfiable) {
            console.log("  Model:", result9.model);
        } else {
            console.log("  ERROR: Should be SAT - (false AND true) OR true = false OR true = true");
        }
    } catch (error) {
        console.log("  PARSE ERROR:", (error as Error).message);
    }
    
    console.log("\n=== SAT Operator Tests Complete ===");
}