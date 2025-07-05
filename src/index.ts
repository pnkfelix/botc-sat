import { runAdvancedSATTests } from './advanced-tests';
import { testSetupFunction } from './setup-tests';
import { runSATOperatorTests } from './sat-operator-tests';

console.log("Hello BOTC DSL!");

export async function main() {
    console.log("Blood on the Clocktower DSL prototype starting...");
    
    // Test setup function
    testSetupFunction();
    
    // Run SAT solver tests
    await runAdvancedSATTests();
    
    // Test SAT logical operators
    await runSATOperatorTests();
    
    console.log("\n✅ Ready for BOTC modeling!");
}

if (require.main === module) {
    main();
}