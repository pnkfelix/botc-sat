// Test to understand the pattern of solution generation
import { SATSolver } from './solver';

export async function testSolutionPatterns(): Promise<void> {
    console.log("=== Testing Solution Generation Patterns ===");
    
    // Test with a problem that has many solutions
    // Problem: (A OR B) AND (C OR D) 
    // Expected solutions: {A,C}, {A,D}, {B,C}, {B,D} = 4 solutions
    console.log("\n--- Generating all solutions for (A OR B) AND (C OR D) ---");
    
    const solver = new SATSolver();
    const A = solver.addVariable('A');
    const B = solver.addVariable('B');
    const C = solver.addVariable('C');
    const D = solver.addVariable('D');
    
    solver.addClause([A, B]);    // A OR B
    solver.addClause([C, D]);    // C OR D
    
    const solutions: Record<string, boolean>[] = [];
    
    // Generate multiple solutions using blocking clauses
    for (let i = 0; i < 6; i++) {  // Try to find up to 6 solutions (should find 4)
        const result = solver.solveWithModel();
        
        if (result.satisfiable && result.model) {
            console.log(`Solution ${i + 1}:`, result.model);
            solutions.push(result.model);
            
            // Create blocking clause for this solution
            const blockingClause: number[] = [];
            for (const [varName, value] of Object.entries(result.model)) {
                const varId = solver.getVariableId(varName);
                if (varId !== undefined) {
                    // Add the negation of this assignment
                    blockingClause.push(value ? -varId : varId);
                }
            }
            
            console.log(`  Blocking clause: [${blockingClause.join(', ')}]`);
            solver.addClause(blockingClause);
        } else {
            console.log(`No more solutions found after ${i} solutions`);
            break;
        }
    }
    
    console.log(`\n--- Found ${solutions.length} total solutions ---`);
    
    // Analyze patterns
    console.log("\n--- Solution Analysis ---");
    solutions.forEach((sol, idx) => {
        const bits = [sol.A ? 1 : 0, sol.B ? 1 : 0, sol.C ? 1 : 0, sol.D ? 1 : 0];
        const binary = bits.join('');
        const decimal = parseInt(binary, 2);
        console.log(`Solution ${idx + 1}: [A,B,C,D] = [${bits.join(',')}] = ${binary}₂ = ${decimal}₁₀`);
    });
    
    // Test 2: Different problem structure
    console.log("\n" + "=".repeat(60));
    console.log("--- Testing with 3 variables: (A OR B OR C) ---");
    
    const solver2 = new SATSolver();
    const A2 = solver2.addVariable('A');
    const B2 = solver2.addVariable('B'); 
    const C2 = solver2.addVariable('C');
    
    solver2.addClause([A2, B2, C2]);  // A OR B OR C (7 solutions: all except 000)
    
    const solutions2: Record<string, boolean>[] = [];
    
    for (let i = 0; i < 8; i++) {
        const result = solver2.solveWithModel();
        
        if (result.satisfiable && result.model) {
            solutions2.push(result.model);
            const bits = [result.model.A ? 1 : 0, result.model.B ? 1 : 0, result.model.C ? 1 : 0];
            console.log(`Solution ${i + 1}: [A,B,C] = [${bits.join(',')}] = ${bits.join('')}₂`);
            
            // Block this solution
            const blockingClause: number[] = [];
            for (const [varName, value] of Object.entries(result.model)) {
                const varId = solver2.getVariableId(varName);
                if (varId !== undefined) {
                    blockingClause.push(value ? -varId : varId);
                }
            }
            solver2.addClause(blockingClause);
        } else {
            console.log(`No more solutions found after ${i} solutions`);
            break;
        }
    }
    
    console.log("\n=== Solution Pattern Analysis Complete ===");
}