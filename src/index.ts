import { runAdvancedSATTests } from './advanced-tests';
import { testSetupFunction } from './setup-tests';

console.log("Hello BOTC DSL!");

export async function main() {
    console.log("Blood on the Clocktower DSL prototype starting...");
    
    // Test setup function
    testSetupFunction();
    
    // Run SAT solver tests
    await runAdvancedSATTests();
    
    console.log("\n✅ Ready for BOTC modeling!");
}

if (require.main === module) {
    main();
}