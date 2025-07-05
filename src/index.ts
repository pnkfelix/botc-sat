import { runAdvancedSATTests } from './advanced-tests';
import { testSetupFunction } from './setup-tests';
import { registerTroubleBrewing } from './trouble-brewing-roles';
import { troubleBrewing } from './scripts';
import { BagLegalityValidator } from './bag-compiler';
import { SATSolver } from './solver';

console.log("Hello BOTC DSL!");

export async function main() {
    console.log("Blood on the Clocktower DSL prototype starting...");
    
    // Register all Trouble Brewing roles
    registerTroubleBrewing();
    console.log("✅ Registered Trouble Brewing roles");
    
    // Test setup function
    testSetupFunction();
    
    // Run SAT solver tests
    await runAdvancedSATTests();
    
    // Test SAT solver constraint parsing
    await testSATConstraintParsing();
    
    // Test bag legality validation
    await testBagLegality();
    
    console.log("\n✅ Ready for BOTC modeling!");
}

async function testBagLegality() {
    console.log("\n=== Testing Bag Legality Validation ===");
    
    const validator = new BagLegalityValidator();
    
    // Test 1: Legal setup with Baron (7 players)
    // Baron forces: 3 Townsfolk, 2 Outsiders, 1 Minion, 1 Demon (instead of base 5,0,1,1)
    console.log("\n--- Test 1: Legal Baron setup (7 players) ---");
    const problem1 = {
        script: troubleBrewing,
        playerCount: 7,
        selectedRoles: ['chef', 'empath', 'investigator', 'recluse', 'saint', 'baron', 'imp'],
        inPlayDistribution: { Townsfolk: 3, Outsider: 2, Minion: 1, Demon: 1 },
        physicalBag: new Map([
            ['chef', 1], ['empath', 1], ['investigator', 1],  // 3 townsfolk
            ['recluse', 1], ['saint', 1],  // 2 outsiders  
            ['baron', 1],  // 1 minion
            ['imp', 1]     // 1 demon
        ])
    };
    
    const result1 = await validator.checkBagLegality(problem1);
    console.log("Result:", result1.legal ? "LEGAL" : "ILLEGAL");
    
    // Test 2: Illegal setup - trying to use base distribution when Baron is present
    console.log("\n--- Test 2: Illegal setup - base distribution with Baron present ---");
    const problem2 = {
        script: troubleBrewing,
        playerCount: 7,
        selectedRoles: ['washerwoman', 'librarian', 'investigator', 'chef', 'empath', 'baron', 'imp'],
        inPlayDistribution: { Townsfolk: 5, Outsider: 0, Minion: 1, Demon: 1 }, // Base distribution - wrong when Baron present
        physicalBag: new Map([
            ['washerwoman', 1], ['librarian', 1], ['investigator', 1], ['chef', 1], ['empath', 1], // 5 townsfolk
            ['baron', 1],  // 1 minion
            ['imp', 1]     // 1 demon
        ])
    };
    
    const result2 = await validator.checkBagLegality(problem2);
    console.log("Result:", result2.legal ? "LEGAL" : "ILLEGAL");
}

async function testSATConstraintParsing() {
    console.log("\n=== Testing SAT CNF Interface ===");
    
    // Test 1: Simple variable assignments
    console.log("\n--- Test 1: Simple assignments ---");
    const solver1 = new SATSolver();
    const x1 = solver1.addVariable('x');
    const y1 = solver1.addVariable('y');
    solver1.addUnitClause(x1, true);  // x = true
    solver1.addUnitClause(y1, false); // y = false
    const result1 = solver1.solveWithModel();
    console.log("Simple assignments:", result1.satisfiable ? "SAT" : "UNSAT");
    
    // Test 2: Logical implications (x => y)
    console.log("\n--- Test 2: Implication constraint ---");
    const solver2 = new SATSolver();
    const x2 = solver2.addVariable('x');
    const y2 = solver2.addVariable('y');
    solver2.addClause([-x2, y2]); // x => y (NOT x OR y)
    solver2.addUnitClause(x2, true);  // x = true
    solver2.addUnitClause(y2, false); // y = false
    const result2 = solver2.solveWithModel();
    console.log("Implication constraint:", result2.satisfiable ? "SAT" : "UNSAT", "(should be UNSAT)");
    
    // Test 3: Complex AND implication (x AND y => z)
    console.log("\n--- Test 3: AND implication constraint ---");
    const solver3 = new SATSolver();
    const x3 = solver3.addVariable('x');
    const y3 = solver3.addVariable('y');
    const z3 = solver3.addVariable('z');
    solver3.addClause([-x3, -y3, z3]); // (x AND y) => z  equiv to (NOT x OR NOT y OR z)
    solver3.addUnitClause(x3, true);   // x = true
    solver3.addUnitClause(y3, true);   // y = true  
    solver3.addUnitClause(z3, false);  // z = false
    const result3 = solver3.solveWithModel();
    console.log("AND constraint:", result3.satisfiable ? "SAT" : "UNSAT", "(should be UNSAT)");
    
    // Test 4: BOTC-style constraint  
    console.log("\n--- Test 4: BOTC baron constraint ---");
    const solver4 = new SATSolver();
    const baron = solver4.addVariable('baron_present');
    const base_town = solver4.addVariable('base_townsfolk_5');
    const after_town = solver4.addVariable('after_role_20_townsfolk_3');
    
    // baron_present AND base_townsfolk_5 => after_role_20_townsfolk_3
    solver4.addClause([-baron, -base_town, after_town]);
    solver4.addUnitClause(baron, true);     // baron present
    solver4.addUnitClause(base_town, true); // base count is 5
    solver4.addUnitClause(after_town, false); // final count is NOT 3 (contradiction)
    
    const result4 = solver4.solveWithModel();
    console.log("BOTC constraint:", result4.satisfiable ? "SAT" : "UNSAT", "(should be UNSAT)");
}

if (require.main === module) {
    main();
}