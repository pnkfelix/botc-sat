import { SATSolver } from './solver';

console.log("Hello BOTC DSL!");

export async function main() {
    console.log("Blood on the Clocktower DSL prototype starting...");
    
    const solver = new SATSolver();
    console.log("Testing SAT solver integration...");
    
    try {
        const result = await solver.solve(['x=true', 'y=false']);
        console.log("SAT solver test result:", result);
        console.log("Ready for BOTC modeling!");
    } catch (error) {
        console.error("SAT solver error:", error);
    }
}

if (require.main === module) {
    main();
}