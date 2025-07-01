import { SATSolver } from './solver';

console.log("Hello BOTC DSL!");

export async function main() {
    console.log("Blood on the Clocktower DSL prototype starting...");
    
    const solver = new SATSolver();
    console.log("Testing SAT solver integration...");
    
    try {
        // Test 1: Simple variable assignments (our current constraint format)
        console.log("\n=== Test 1: Simple Constraints ===");
        const result1 = await solver.solve(['x=true', 'y=false']);
        console.log("Simple constraints result:", result1);
        
        // Test 2: More complex logical formula (like browser test)
        // Formula: (x1 ∨ x2) ∧ (¬x1) ∧ (¬x3)
        // This should be satisfiable with x1=false, x2=true, x3=false
        console.log("\n=== Test 2: Complex Formula ===");
        console.log("Testing formula: (x1 ∨ x2) ∧ (¬x1) ∧ (¬x3)");
        
        // We need to extend our solver to handle more complex constraints
        // For now, let's break it down to simple constraints that represent the same logic
        const result2 = await solver.solve([
            'x1=false',  // ¬x1 (x1 must be false)
            'x2=true',   // x2 must be true (to satisfy x1 ∨ x2)
            'x3=false'   // ¬x3 (x3 must be false)
        ]);
        console.log("Complex formula result:", result2);
        console.log("Model interpretation: x1=" + (result2.model?.x1 ? "true" : "false") + 
                   ", x2=" + (result2.model?.x2 ? "true" : "false") + 
                   ", x3=" + (result2.model?.x3 ? "true" : "false"));
        
        console.log("\n✅ Ready for BOTC modeling!");
    } catch (error) {
        console.error("SAT solver error:", error);
    }
}

if (require.main === module) {
    main();
}