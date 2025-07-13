// Test the actual JSMiniSolvers API directly
const minisolversActual = require('../vendor/minisolvers.js');

console.log("=== JSMiniSolvers Direct API Test ===");

console.log("\n1. Available exports:");
console.log(Object.keys(minisolversActual));

console.log("\n2. MinisatSolver methods:");
const solver = new minisolversActual.MinisatSolver();
console.log(Object.getOwnPropertyNames(solver));

// Check if these common SAT solver methods exist
const methods = ['new_var', 'add_clause', 'solve', 'get_model', 'add_unit_clause'];
console.log("\n3. Method availability:");
methods.forEach(method => {
    console.log(`${method}: ${typeof solver[method]}`);
});

console.log("\n4. Testing basic SAT functionality:");
try {
    // Create variables
    const var1 = solver.new_var();
    const var2 = solver.new_var();
    console.log(`Created variables: ${var1}, ${var2}`);
    
    // Add some clauses - basic contradiction
    // x OR NOT x (always true)
    solver.add_clause([1, -1]);
    // x (x must be true)
    solver.add_clause([1]);
    // NOT x (x must be false) - should create contradiction
    solver.add_clause([-1]);
    
    console.log("Added clauses: [1, -1], [1], [-1]");
    
    const result = solver.solve();
    console.log(`Solve result: ${result}`);
    
    if (result) {
        const model = solver.get_model();
        console.log(`Model: ${model}`);
    }
} catch (e: any) {
    console.log(`Error: ${e.message}`);
    console.log(`Full error:`, e);
}

console.log("\n5. Testing satisfiable case:");
try {
    const solver2 = new minisolversActual.MinisatSolver();
    solver2.new_var();
    solver2.new_var();
    
    // x OR y
    solver2.add_clause([1, 2]);
    // NOT x OR NOT y  
    solver2.add_clause([-1, -2]);
    
    console.log("Added clauses: [1, 2], [-1, -2]");
    
    const result2 = solver2.solve();
    console.log(`Solve result: ${result2}`);
    
    if (result2) {
        const model2 = solver2.get_model();
        console.log(`Model: ${model2}`);
    }
} catch (e: any) {
    console.log(`Error: ${e.message}`);
}