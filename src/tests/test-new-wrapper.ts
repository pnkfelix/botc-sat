// Test the new thin wrapper interface
import { SATSolver } from '../core/solver';

console.log("=== Testing New SATSolver Wrapper ===");

// Test 1: Basic variable creation and unit clauses
console.log("\n1. Basic variable creation and unit clauses:");
const solver1 = new SATSolver();

const x = solver1.addVariable('x');
const y = solver1.addVariable('y');

console.log(`Created variables: x=${x}, y=${y}`);

// x = true, y = false
solver1.addUnitClause(x, true);
solver1.addUnitClause(y, false);

const result1 = solver1.solveWithModel();
console.log(`Result: ${result1.satisfiable ? 'SAT' : 'UNSAT'}`);
console.log(`Model:`, result1.model);

// Test 2: Implication (x => y)
console.log("\n2. Implication (x => y):");
const solver2 = new SATSolver();

const a = solver2.addVariable('a');
const b = solver2.addVariable('b');

// a => b is equivalent to (-a OR b)
solver2.addClause([-a, b]);
// a = true
solver2.addUnitClause(a, true);

const result2 = solver2.solveWithModel();
console.log(`Result: ${result2.satisfiable ? 'SAT' : 'UNSAT'}`);
console.log(`Model:`, result2.model);
console.log(`Expected: a=true, b=true (implication forces b=true when a=true)`);

// Test 3: Contradiction
console.log("\n3. Contradiction:");
const solver3 = new SATSolver();

const z = solver3.addVariable('z');
solver3.addUnitClause(z, true);   // z = true
solver3.addUnitClause(z, false);  // z = false

const result3 = solver3.solveWithModel();
console.log(`Result: ${result3.satisfiable ? 'SAT' : 'UNSAT'}`);
console.log(`Expected: UNSAT (contradiction)`);

// Test 4: Complex constraint (XOR-like)
console.log("\n4. XOR-like constraint (exactly one of p, q true):");
const solver4 = new SATSolver();

const p = solver4.addVariable('p');
const q = solver4.addVariable('q');

// (p OR q) AND (NOT p OR NOT q) - exactly one true
solver4.addClause([p, q]);      // At least one true
solver4.addClause([-p, -q]);    // At most one true

const result4 = solver4.solveWithModel();
console.log(`Result: ${result4.satisfiable ? 'SAT' : 'UNSAT'}`);
console.log(`Model:`, result4.model);
console.log(`Expected: SAT with exactly one of p, q true`);

// Test 5: BOTC-style constraint
console.log("\n5. BOTC-style constraint:");
const solver5 = new SATSolver();

const baron_present = solver5.addVariable('baron_present');
const base_outsider_0 = solver5.addVariable('base_outsider_0');
const after_baron_outsider_2 = solver5.addVariable('after_baron_outsider_2');

// baron_present AND base_outsider_0 => after_baron_outsider_2
// Equivalent to: NOT baron_present OR NOT base_outsider_0 OR after_baron_outsider_2
solver5.addClause([-baron_present, -base_outsider_0, after_baron_outsider_2]);

// Test case: baron present, base outsider count is 0
solver5.addUnitClause(baron_present, true);
solver5.addUnitClause(base_outsider_0, true);

const result5 = solver5.solveWithModel();
console.log(`Result: ${result5.satisfiable ? 'SAT' : 'UNSAT'}`);
console.log(`Model:`, result5.model);
console.log(`Expected: SAT with after_baron_outsider_2=true`);

// Test 6: Variable lookup
console.log("\n6. Variable lookup:");
console.log(`baron_present ID: ${solver5.getVariableId('baron_present')}`);
console.log(`Unknown variable: ${solver5.getVariableId('unknown')}`);
console.log(`Variable names: ${solver5.getVariableNames()}`);
console.log(`Variable count: ${solver5.getVariableCount()}`);

console.log("\n=== Wrapper Interface Test Complete ===");