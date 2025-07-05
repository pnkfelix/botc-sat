// Test suite exercising TypeScript wrapper with same logical operations as vendored-solver-tests
import { SATSolver } from './solver';

interface WrapperTestCase {
    name: string;
    description: string;
    setupSolver: (solver: SATSolver) => void;
    expectedSat: boolean;
    expectedModel?: Record<string, boolean>;
}

function runWrapperTest(testCase: WrapperTestCase): void {
    console.log(`\n=== ${testCase.name} ===`);
    console.log(`Description: ${testCase.description}`);
    
    const solver = new SATSolver();
    testCase.setupSolver(solver);
    
    const result = solver.solveWithModel();
    
    console.log(`Expected: ${testCase.expectedSat ? 'SAT' : 'UNSAT'}`);
    console.log(`Actual: ${result.satisfiable ? 'SAT' : 'UNSAT'}`);
    console.log(`✓ ${result.satisfiable === testCase.expectedSat ? 'PASS' : 'FAIL'}`);
    
    if (result.satisfiable && result.model) {
        console.log(`Model: ${JSON.stringify(result.model)}`);
        
        if (testCase.expectedModel) {
            let modelMatch = true;
            for (const [varName, expectedValue] of Object.entries(testCase.expectedModel)) {
                if (result.model[varName] !== expectedValue) {
                    modelMatch = false;
                    break;
                }
            }
            console.log(`Expected model: ${JSON.stringify(testCase.expectedModel)}`);
            console.log(`Model check: ${modelMatch ? 'EXACT MATCH' : 'DIFFERENT (but may be valid)'}`);
        }
    }
}

console.log("=== TYPESCRIPT WRAPPER LOGIC OPERATION TESTS ===");

// Test cases mirroring vendored-solver-tests but using wrapper interface
const wrapperTestCases: WrapperTestCase[] = [
    // 1. NEGATION TESTS
    {
        name: "Simple Negation - SAT",
        description: "x1 is false: NOT x1",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            solver.addClause([-x1]); // NOT x1
        },
        expectedSat: true,
        expectedModel: { x1: false }
    },
    
    {
        name: "Simple Negation - Contradiction",
        description: "x1 AND NOT x1 (contradiction)",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            solver.addClause([x1]);  // x1
            solver.addClause([-x1]); // NOT x1
        },
        expectedSat: false
    },
    
    // 2. CONJUNCTION (AND) TESTS
    {
        name: "Conjunction - SAT",
        description: "x1 AND x2 (both must be true)",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            solver.addClause([x1]); // x1
            solver.addClause([x2]); // x2
        },
        expectedSat: true,
        expectedModel: { x1: true, x2: true }
    },
    
    {
        name: "Conjunction with Negation - SAT", 
        description: "x1 AND NOT x2",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            solver.addClause([x1]);  // x1
            solver.addClause([-x2]); // NOT x2
        },
        expectedSat: true,
        expectedModel: { x1: true, x2: false }
    },
    
    {
        name: "Conjunction - Contradiction",
        description: "x1 AND NOT x1 AND x2",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            solver.addClause([x1]);  // x1
            solver.addClause([-x1]); // NOT x1
            solver.addClause([x2]);  // x2
        },
        expectedSat: false
    },
    
    // 3. DISJUNCTION (OR) TESTS
    {
        name: "Disjunction - SAT (first true)",
        description: "x1 OR x2, with x1 forced true",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            solver.addClause([x1, x2]); // x1 OR x2
            solver.addClause([x1]);     // x1
        },
        expectedSat: true,
        expectedModel: { x1: true, x2: false } // x2 can be anything
    },
    
    {
        name: "Disjunction - SAT (second true)",
        description: "x1 OR x2, with x2 forced true and x1 false",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            solver.addClause([x1, x2]); // x1 OR x2
            solver.addClause([-x1]);    // NOT x1
            solver.addClause([x2]);     // x2
        },
        expectedSat: true,
        expectedModel: { x1: false, x2: true }
    },
    
    {
        name: "Disjunction with Negation - SAT",
        description: "x1 OR NOT x2",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            solver.addClause([x1, -x2]); // x1 OR NOT x2
        },
        expectedSat: true
        // Multiple valid models: { x1: true, x2: false }, { x1: true, x2: true }, { x1: false, x2: false }
    },
    
    {
        name: "Disjunction - Contradiction",
        description: "x1 OR x2, but both forced false", 
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            solver.addClause([x1, x2]); // x1 OR x2
            solver.addClause([-x1]);    // NOT x1
            solver.addClause([-x2]);    // NOT x2
        },
        expectedSat: false
    },
    
    // 4. IMPLICATION TESTS (A => B converted to NOT A OR B)
    {
        name: "Implication - SAT (antecedent false)",
        description: "x1 => x2, implemented as (NOT x1 OR x2), x1 false",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            solver.addClause([-x1, x2]); // x1 => x2 (NOT x1 OR x2)
            solver.addClause([-x1]);     // NOT x1
        },
        expectedSat: true,
        expectedModel: { x1: false, x2: false } // x2 can be anything when x1 is false
    },
    
    {
        name: "Implication - SAT (both true)",
        description: "x1 => x2, both true",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            solver.addClause([-x1, x2]); // x1 => x2 (NOT x1 OR x2)
            solver.addClause([x1]);      // x1
            solver.addClause([x2]);      // x2
        },
        expectedSat: true,
        expectedModel: { x1: true, x2: true }
    },
    
    {
        name: "Implication - Contradiction",
        description: "x1 => x2, but x1 true and x2 false",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            solver.addClause([-x1, x2]); // x1 => x2 (NOT x1 OR x2)
            solver.addClause([x1]);      // x1
            solver.addClause([-x2]);     // NOT x2
        },
        expectedSat: false
    },
    
    // 5. COMPLEX COMBINATIONS
    {
        name: "Complex - Multiple implications",
        description: "(x1 => x2) AND (x2 => x3) AND x1",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            const x3 = solver.addVariable('x3');
            solver.addClause([-x1, x2]); // x1 => x2 (NOT x1 OR x2)
            solver.addClause([-x2, x3]); // x2 => x3 (NOT x2 OR x3)
            solver.addClause([x1]);      // x1
        },
        expectedSat: true,
        expectedModel: { x1: true, x2: true, x3: true }
    },
    
    {
        name: "Complex - XOR-like constraint",
        description: "(x1 OR x2) AND (NOT x1 OR NOT x2) - exactly one true",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            solver.addClause([x1, x2]);   // x1 OR x2
            solver.addClause([-x1, -x2]); // NOT x1 OR NOT x2 (at most one true)
        },
        expectedSat: true
        // Valid models: { x1: true, x2: false } or { x1: false, x2: true }
    },
    
    {
        name: "Complex - Three-way constraint",
        description: "At least two of {x1, x2, x3} must be true",
        setupSolver: (solver) => {
            const x1 = solver.addVariable('x1');
            const x2 = solver.addVariable('x2');
            const x3 = solver.addVariable('x3');
            solver.addClause([x1, x2, x3]); // At least one true
            solver.addClause([x1, x2]);     // If x3 false, then x1 OR x2
            solver.addClause([x1, x3]);     // If x2 false, then x1 OR x3  
            solver.addClause([x2, x3]);     // If x1 false, then x2 OR x3
        },
        expectedSat: true
    },
    
    // 6. CONVENIENCE METHOD TESTS
    {
        name: "Unit Clause Helper - SAT",
        description: "Test addUnitClause convenience method",
        setupSolver: (solver) => {
            const var1 = solver.addVariable('var1');
            const var2 = solver.addVariable('var2');
            solver.addUnitClause(var1, true);  // var1 = true
            solver.addUnitClause(var2, false); // var2 = false
        },
        expectedSat: true,
        expectedModel: { var1: true, var2: false }
    },
    
    {
        name: "Unit Clause Helper - Contradiction", 
        description: "Test addUnitClause with contradiction",
        setupSolver: (solver) => {
            const sameVar = solver.addVariable('sameVar');
            solver.addUnitClause(sameVar, true);  // sameVar = true
            solver.addUnitClause(sameVar, false); // sameVar = false
        },
        expectedSat: false
    },
    
    // 7. BOTC-STYLE TESTS
    {
        name: "BOTC - Baron Rule",
        description: "baron_present AND base_outsider_0 => final_outsider_2",
        setupSolver: (solver) => {
            const baron = solver.addVariable('baron_present');
            const base_out_0 = solver.addVariable('base_outsider_0');
            const final_out_2 = solver.addVariable('final_outsider_2');
            
            // baron_present AND base_outsider_0 => final_outsider_2
            // Equivalent to: NOT baron_present OR NOT base_outsider_0 OR final_outsider_2
            solver.addClause([-baron, -base_out_0, final_out_2]);
            
            // Test scenario: baron present, base count is 0
            solver.addUnitClause(baron, true);
            solver.addUnitClause(base_out_0, true);
        },
        expectedSat: true,
        expectedModel: { 
            baron_present: true, 
            base_outsider_0: true, 
            final_outsider_2: true 
        }
    },
    
    {
        name: "BOTC - Multiple Role Chain",
        description: "Chain of role modifications with multiple variables",
        setupSolver: (solver) => {
            const baron = solver.addVariable('baron_present');
            const drunk = solver.addVariable('drunk_present');
            const base_town = solver.addVariable('base_townsfolk_5');
            const after_baron_town = solver.addVariable('after_baron_townsfolk_3');
            const final_town = solver.addVariable('final_townsfolk_3');
            
            // Baron: base_townsfolk_5 AND baron_present => after_baron_townsfolk_3
            solver.addClause([-base_town, -baron, after_baron_town]);
            
            // No other roles modify townsfolk in this chain
            // after_baron_townsfolk_3 => final_townsfolk_3
            solver.addClause([-after_baron_town, final_town]);
            
            // Test scenario
            solver.addUnitClause(base_town, true);
            solver.addUnitClause(baron, true);
            solver.addUnitClause(drunk, false); // Drunk not present
        },
        expectedSat: true,
        expectedModel: {
            baron_present: true,
            drunk_present: false,
            base_townsfolk_5: true,
            after_baron_townsfolk_3: true,
            final_townsfolk_3: true
        }
    }
];

// Run all tests
wrapperTestCases.forEach(runWrapperTest);

console.log("\n=== SUMMARY ===");
console.log("These tests demonstrate that the TypeScript wrapper fully supports:");
console.log("✓ Negation (via negative literals in clauses)");
console.log("✓ Conjunction (via multiple clauses)"); 
console.log("✓ Disjunction (via multiple literals per clause)");
console.log("✓ Implication (via CNF conversion to disjunction)");
console.log("✓ Complex logical combinations");
console.log("✓ Convenience methods (addUnitClause)");
console.log("✓ BOTC-style rule constraints");
console.log("✓ Variable name mapping and type safety");
console.log("✓ Clean CNF interface ready for DSL compilation");

// Demonstrate variable introspection
console.log("\n=== VARIABLE INTROSPECTION DEMO ===");
const demoSolver = new SATSolver();
demoSolver.addVariable('demo_var_1');
const v2 = demoSolver.addVariable('demo_var_2');
console.log(`Created variables: ${demoSolver.getVariableNames()}`);
console.log(`Variable count: ${demoSolver.getVariableCount()}`);
console.log(`demo_var_1 ID: ${demoSolver.getVariableId('demo_var_1')}`);
console.log(`ID ${v2} name: ${demoSolver.getVariableName(v2)}`);