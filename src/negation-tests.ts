// Test logical negation support in vendored SAT solver
import { SATSolver } from './solver';

async function testLogicalNegation() {
    console.log("=== Testing Logical Negation Support ===");
    
    const solver = new SATSolver();
    
    // Test 1: Simple contradiction - should be UNSAT
    console.log("\n1. Testing basic contradiction (x=true AND x=false):");
    try {
        const result1 = await solver.solve(['x=true', 'x=false']);
        console.log("Result:", result1);
        console.log("Expected: UNSAT, Got:", result1.satisfiable ? "SAT" : "UNSAT");
    } catch (e) {
        console.log("Error:", e);
    }
    
    // Test 2: Try NOT syntax variations
    console.log("\n2. Testing NOT syntax variations:");
    const notSyntaxTests = [
        'NOT x=true',
        '!x=true', 
        'x=NOT true',
        'x=!true',
        'NOT(x=true)',
        '!(x=true)',
        'x=false'  // This should work as implicit negation
    ];
    
    for (const constraint of notSyntaxTests) {
        try {
            console.log(`Testing: ${constraint}`);
            const result = await solver.solve([constraint]);
            console.log(`  Result: ${result.satisfiable ? "SAT" : "UNSAT"}`);
            if (result.model) {
                console.log(`  Model: ${JSON.stringify(result.model)}`);
            }
        } catch (e) {
            console.log(`  Error: ${e}`);
        }
    }
    
    // Test 3: CNF-level negation (what the solver actually supports)
    console.log("\n3. Testing CNF-level negation (x=false):");
    try {
        const result3 = await solver.solve(['x=false']);
        console.log("Result:", result3);
        console.log("Model:", result3.model);
    } catch (e) {
        console.log("Error:", e);
    }
    
    // Test 4: Mixed positive/negative constraints
    console.log("\n4. Testing mixed constraints:");
    try {
        const result4 = await solver.solve(['x=true', 'y=false', 'z=true']);
        console.log("Result:", result4);
        console.log("Model:", result4.model);
    } catch (e) {
        console.log("Error:", e);
    }
    
    // Test 5: Test the parseConstraint method directly
    console.log("\n5. Testing constraint parsing directly:");
    const testConstraints = [
        'x=true',
        'x=false', 
        'NOT x=true',
        'x=NOT true',
        '!x',
        'x AND y',
        'x => y'
    ];
    
    // We need to access the private method, so let's check what gets parsed
    for (const constraint of testConstraints) {
        try {
            const result = await solver.solve([constraint]);
            console.log(`${constraint} -> ${result.satisfiable ? "SAT" : "UNSAT"}`);
        } catch (e) {
            console.log(`${constraint} -> Error: ${e}`);
        }
    }
}

// Run the test
testLogicalNegation().catch(console.error);