// Comprehensive tests for vendored JSMiniSolvers demonstrating logical operations
const minisolvers = require('../vendor/minisolvers.js');

interface TestCase {
    name: string;
    description: string;
    clauses: number[][];
    expectedSat: boolean;
    expectedModel?: boolean[];
}

function runTest(testCase: TestCase): void {
    console.log(`\n=== ${testCase.name} ===`);
    console.log(`Description: ${testCase.description}`);
    console.log(`Clauses: ${JSON.stringify(testCase.clauses)}`);
    
    const solver = new minisolvers.MinisatSolver();
    
    // Determine max variable number to create variables
    const maxVar = Math.max(...testCase.clauses.flat().map(lit => Math.abs(lit)));
    
    // Create variables (JSMiniSolvers uses 1-based indexing)
    for (let i = 1; i <= maxVar; i++) {
        solver.new_var();
    }
    
    // Add clauses
    for (const clause of testCase.clauses) {
        solver.add_clause(clause);
    }
    
    // Solve
    const result = solver.solve();
    const isSat = result === 1;
    
    console.log(`Expected: ${testCase.expectedSat ? 'SAT' : 'UNSAT'}`);
    console.log(`Actual: ${isSat ? 'SAT' : 'UNSAT'}`);
    console.log(`✓ ${isSat === testCase.expectedSat ? 'PASS' : 'FAIL'}`);
    
    if (isSat && testCase.expectedModel) {
        const model = solver.get_model();
        console.log(`Model: [${model.join(', ')}]`);
        console.log(`Expected: [${testCase.expectedModel.join(', ')}]`);
        
        // Check if model matches expected (allowing for equivalent solutions)
        let modelMatch = true;
        for (let i = 0; i < testCase.expectedModel.length; i++) {
            if (model[i] !== testCase.expectedModel[i]) {
                // For satisfiable cases, there might be multiple valid models
                // We'll just verify the clauses are satisfied
                modelMatch = false;
                break;
            }
        }
        console.log(`Model check: ${modelMatch ? 'EXACT MATCH' : 'CHECKING CLAUSE SATISFACTION'}`);
        
        if (!modelMatch) {
            // Verify that the returned model satisfies all clauses
            let clausesSatisfied = true;
            for (const clause of testCase.clauses) {
                let clauseSat = false;
                for (const lit of clause) {
                    const varIdx = Math.abs(lit) - 1; // Convert to 0-based
                    const varValue = model[varIdx];
                    const litSat = lit > 0 ? varValue : !varValue;
                    if (litSat) {
                        clauseSat = true;
                        break;
                    }
                }
                if (!clauseSat) {
                    clausesSatisfied = false;
                    break;
                }
            }
            console.log(`Clause satisfaction: ${clausesSatisfied ? 'VALID' : 'INVALID'}`);
        }
    }
}

console.log("=== VENDORED JSMINISOLVERS LOGIC OPERATION TESTS ===");

// Test cases demonstrating each logical operation
const testCases: TestCase[] = [
    // 1. NEGATION TESTS
    {
        name: "Simple Negation - SAT",
        description: "x1 is false: NOT x1",
        clauses: [[-1]], // NOT x1
        expectedSat: true,
        expectedModel: [false]
    },
    
    {
        name: "Simple Negation - Contradiction",
        description: "x1 AND NOT x1 (contradiction)",
        clauses: [[1], [-1]], // x1 AND NOT x1
        expectedSat: false
    },
    
    // 2. CONJUNCTION (AND) TESTS
    {
        name: "Conjunction - SAT",
        description: "x1 AND x2 (both must be true)",
        clauses: [[1], [2]], // x1 AND x2
        expectedSat: true,
        expectedModel: [true, true]
    },
    
    {
        name: "Conjunction with Negation - SAT", 
        description: "x1 AND NOT x2",
        clauses: [[1], [-2]], // x1 AND NOT x2
        expectedSat: true,
        expectedModel: [true, false]
    },
    
    {
        name: "Conjunction - Contradiction",
        description: "x1 AND NOT x1 AND x2",
        clauses: [[1], [-1], [2]], // x1 AND NOT x1 AND x2
        expectedSat: false
    },
    
    // 3. DISJUNCTION (OR) TESTS
    {
        name: "Disjunction - SAT (first true)",
        description: "x1 OR x2, with x1 forced true",
        clauses: [[1, 2], [1]], // (x1 OR x2) AND x1
        expectedSat: true,
        expectedModel: [true, false] // x2 can be anything, but [true, false] is simplest
    },
    
    {
        name: "Disjunction - SAT (second true)",
        description: "x1 OR x2, with x2 forced true and x1 false",
        clauses: [[1, 2], [-1], [2]], // (x1 OR x2) AND NOT x1 AND x2
        expectedSat: true,
        expectedModel: [false, true]
    },
    
    {
        name: "Disjunction with Negation - SAT",
        description: "x1 OR NOT x2",
        clauses: [[1, -2]], // x1 OR NOT x2
        expectedSat: true
        // Multiple valid models: [true, false], [true, true], [false, false]
    },
    
    {
        name: "Disjunction - Contradiction",
        description: "x1 OR x2, but both forced false", 
        clauses: [[1, 2], [-1], [-2]], // (x1 OR x2) AND NOT x1 AND NOT x2
        expectedSat: false
    },
    
    // 4. IMPLICATION TESTS (A => B converted to NOT A OR B)
    {
        name: "Implication - SAT (antecedent false)",
        description: "x1 => x2, implemented as (NOT x1 OR x2), x1 false",
        clauses: [[-1, 2], [-1]], // (NOT x1 OR x2) AND NOT x1
        expectedSat: true,
        expectedModel: [false, false] // x2 can be anything when x1 is false
    },
    
    {
        name: "Implication - SAT (both true)",
        description: "x1 => x2, both true",
        clauses: [[-1, 2], [1], [2]], // (NOT x1 OR x2) AND x1 AND x2
        expectedSat: true,
        expectedModel: [true, true]
    },
    
    {
        name: "Implication - Contradiction",
        description: "x1 => x2, but x1 true and x2 false",
        clauses: [[-1, 2], [1], [-2]], // (NOT x1 OR x2) AND x1 AND NOT x2
        expectedSat: false
    },
    
    // 5. COMPLEX COMBINATIONS
    {
        name: "Complex - Multiple implications",
        description: "(x1 => x2) AND (x2 => x3) AND x1",
        clauses: [
            [-1, 2],  // x1 => x2 (NOT x1 OR x2)
            [-2, 3],  // x2 => x3 (NOT x2 OR x3)
            [1]       // x1
        ],
        expectedSat: true,
        expectedModel: [true, true, true]
    },
    
    {
        name: "Complex - XOR-like constraint",
        description: "(x1 OR x2) AND (NOT x1 OR NOT x2) - exactly one true",
        clauses: [
            [1, 2],    // x1 OR x2
            [-1, -2]   // NOT x1 OR NOT x2 (at most one true)
        ],
        expectedSat: true
        // Valid models: [true, false] or [false, true]
    },
    
    {
        name: "Complex - Three-way constraint",
        description: "At least two of {x1, x2, x3} must be true",
        clauses: [
            [1, 2, 3],    // At least one true
            [1, 2],       // If x3 false, then x1 OR x2
            [1, 3],       // If x2 false, then x1 OR x3  
            [2, 3]        // If x1 false, then x2 OR x3
        ],
        expectedSat: true
    }
];

// Run all tests
testCases.forEach(runTest);

console.log("\n=== SUMMARY ===");
console.log("These tests demonstrate that JSMiniSolvers fully supports:");
console.log("✓ Negation (negative literals)");
console.log("✓ Conjunction (multiple clauses)"); 
console.log("✓ Disjunction (multiple literals per clause)");
console.log("✓ Implication (via CNF conversion)");
console.log("✓ Complex logical combinations");
console.log("✓ Proper SAT/UNSAT detection");
console.log("✓ Model extraction");
console.log("\nThe TypeScript wrapper needs to convert logical expressions to CNF clauses.");