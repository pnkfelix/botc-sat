import { runAdvancedSATTests } from './advanced-tests';

console.log("Hello BOTC DSL!");

export async function main() {
    console.log("Blood on the Clocktower DSL prototype starting...");
    
    // Run TypeScript tests
    await runAdvancedSATTests();
    
    console.log("\n✅ Ready for BOTC modeling!");
}

if (require.main === module) {
    main();
}