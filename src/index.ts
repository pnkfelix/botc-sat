import { SATSolver } from './solver';

const { runSharedSATSolverTests } = require('./shared-tests.js');

console.log("Hello BOTC DSL!");

export async function main() {
    console.log("Blood on the Clocktower DSL prototype starting...");
    
    // Use the shared test suite with our TypeScript SATSolver
    await runSharedSATSolverTests(SATSolver);
    
    console.log("\n✅ Ready for BOTC modeling!");
}

if (require.main === module) {
    main();
}