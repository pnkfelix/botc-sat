import { runAdvancedSATTests } from './advanced-tests';
import { testSetupFunction } from './setup-tests';
import { runSATOperatorTests } from './sat-operator-tests';
import { registerTroubleBrewing } from '../data/trouble-brewing-roles';
import { troubleBrewing } from '../core/scripts';
import { BagLegalityValidator } from '../core/bag-compiler';
import { SATSolver } from '../core/solver';
import { testSolutionExploration } from './solution-exploration-test';
import { testSolutionPatterns } from './solution-pattern-test';
import { testBOTCBias, testConstrainedBias } from './bias-analysis-test';
import './variable-indirection-test';

console.log("Hello BOTC DSL!");

// Claude Code reminder for LSP tool usage
function showClaudeCodeReminder() {
    if (process.env.CLAUDECODE === '1' || process.env.CLAUDE_CODE_ENTRYPOINT) {
        console.log("\n🔍 CLAUDE CODE REMINDER: Use cclsp LSP tools for code investigation:");
        console.log("   • mcp__cclsp__find_definition - Locate function/class definitions");
        console.log("   • mcp__cclsp__find_references - Find all uses of symbols");
        console.log("   • mcp__cclsp__rename_symbol - Safe refactoring");
        console.log("   • mcp__cclsp__get_diagnostics - Check TypeScript errors");
        console.log("   See CLAUDE.md for usage patterns and workflow.\n");
    }
}

export async function main() {
    console.log("Blood on the Clocktower DSL prototype starting...");
    
    // Show LSP tool reminder when running under Claude Code
    showClaudeCodeReminder();
    
    // Register all Trouble Brewing roles
    registerTroubleBrewing();
    console.log("✅ Registered Trouble Brewing roles");
    
    // Test setup function
    testSetupFunction();
    
    // Run SAT solver tests
    await runAdvancedSATTests();
    
    // Test SAT logical operators
    await runSATOperatorTests();
    
    // Test SAT solver constraint parsing
    await testSATConstraintParsing();
    
    // Test solution space exploration capabilities
    await testSolutionExploration();
    
    // Test solution generation patterns
    await testSolutionPatterns();
    
    // Test BOTC bias in variety generation
    await testBOTCBias();
    await testConstrainedBias();
    
    // Test bag legality validation
    await testBagLegality();
    
    // Test generative setup  
    await testGenerativeSetup();
    
    
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
    
    // Test 3: Legal Drunk setup - physical bag has extra Townsfolk token
    console.log("\n--- Test 3: Legal Drunk setup - physical bag mismatch ---");
    const problem3 = {
        script: troubleBrewing,
        playerCount: 7,
        selectedRoles: ['chef', 'empath', 'investigator', 'recluse', 'drunk', 'baron', 'imp'],
        inPlayDistribution: { Townsfolk: 3, Outsider: 2, Minion: 1, Demon: 1 }, // Baron effect: base 5,0 -> 3,2
        physicalBag: new Map([
            ['chef', 1], ['empath', 1], ['investigator', 1], // 3 townsfolk tokens
            ['washerwoman', 1], // Extra townsfolk token (instead of drunk token) = 4 total townsfolk  
            ['recluse', 1], // 1 outsider token (recluse stays in bag)
            // Note: no 'drunk' token in physical bag - it's been substituted with 'washerwoman'
            ['baron', 1],   // 1 minion
            ['imp', 1]      // 1 demon
            // Physical counts: 4 townsfolk, 1 outsider, 1 minion, 1 demon
        ])
    };
    
    const result3 = await validator.checkBagLegality(problem3);
    console.log("Result:", result3.legal ? "LEGAL" : "ILLEGAL");
    
    // Test 4: Illegal Drunk setup - physical bag doesn't account for substitution 
    console.log("\n--- Test 4: Illegal Drunk setup - no token substitution ---");
    const problem4 = {
        script: troubleBrewing,
        playerCount: 7,
        selectedRoles: ['chef', 'empath', 'investigator', 'recluse', 'drunk', 'baron', 'imp'],
        inPlayDistribution: { Townsfolk: 3, Outsider: 2, Minion: 1, Demon: 1 }, // Baron effect: base 5,0 -> 3,2
        physicalBag: new Map([
            ['chef', 1], ['empath', 1], ['investigator', 1], // 3 townsfolk tokens
            ['recluse', 1], ['drunk', 1], // Wrong! Drunk token should NOT be in physical bag
            ['baron', 1],   // 1 minion
            ['imp', 1]      // 1 demon
            // Physical counts: 3 townsfolk, 2 outsider, 1 minion, 1 demon - wrong, should be 4,1,1,1
        ])
    };
    
    const result4 = await validator.checkBagLegality(problem4);
    console.log("Result:", result4.legal ? "LEGAL" : "ILLEGAL");
    
    // Test 5: Simple Drunk test - 6 players
    console.log("\n--- Test 5: Simple Drunk test (6 players) ---");
    console.log("Base 6p: 3 townsfolk, 1 outsider, 1 minion, 1 demon");
    console.log("With Drunk: in-play has 1 outsider, physical bag should have extra townsfolk");
    const problem5 = {
        script: troubleBrewing,
        playerCount: 6,
        selectedRoles: ['chef', 'empath', 'investigator', 'drunk', 'poisoner', 'imp'],
        inPlayDistribution: { Townsfolk: 3, Outsider: 1, Minion: 1, Demon: 1 }, // Drunk counts as outsider in-play
        physicalBag: new Map([
            ['chef', 1], ['empath', 1], ['investigator', 1], ['washerwoman', 1], // 4 townsfolk tokens (extra one)
            // No drunk token in physical bag - it's been substituted
            ['poisoner', 1],   // 1 minion
            ['imp', 1]         // 1 demon
            // Physical counts: 4 townsfolk, 0 outsider, 1 minion, 1 demon
        ])
    };
    
    const result5 = await validator.checkBagLegality(problem5);
    console.log("Result:", result5.legal ? "LEGAL" : "ILLEGAL");
}

async function testGenerativeSetup() {
    console.log("\n=== Testing Generative Setup (SAT solver picks a legal setup) ===");
    
    const validator = new BagLegalityValidator();
    
    // Test bag generation for 8 players
    const result = await validator.generateLegalBag(troubleBrewing, 8);
    
    if (result.success) {
        console.log("✅ SAT solver generated a legal setup!");
        
        console.log("\n--- Generated Setup ---");
        console.log("Selected roles:", result.selectedRoles);
        console.log("In-play distribution:", result.inPlayDistribution);
        
        console.log("\n--- Physical Bag ---");
        if (result.physicalBag) {
            for (const [roleId, count] of result.physicalBag) {
                console.log(`${roleId}: ${count}`);
            }
        }
        
        // Verify the generated setup by validating it
        console.log("\n--- Verifying Generated Setup ---");
        const verification = await validator.checkBagLegality({
            script: troubleBrewing,
            playerCount: 8,
            selectedRoles: result.selectedRoles!,
            inPlayDistribution: result.inPlayDistribution!,
            physicalBag: result.physicalBag!
        });
        
        console.log("Verification result:", verification.legal ? "VALID ✅" : "INVALID ❌");
        
    } else {
        console.log("❌ Failed to generate legal setup - constraints may be unsatisfiable!");
    }
    
    // Test generation with preferences
    console.log("\n" + "=".repeat(60));
    console.log("Testing preference-based generation...");
    
    // Test: Must include Drunk
    console.log("\n--- Generating with Drunk (forces Baron for 8 players) ---");
    const drunkResult = await validator.generateLegalBag(troubleBrewing, 8, {
        mustInclude: ['drunk']
    });
    
    if (drunkResult.success) {
        console.log("✅ Generated setup with Drunk!");
        console.log("Selected roles:", drunkResult.selectedRoles);
        console.log("In-play distribution:", drunkResult.inPlayDistribution);
        
        // Verify the setup
        const drunkVerification = await validator.checkBagLegality({
            script: troubleBrewing,
            playerCount: 8,
            selectedRoles: drunkResult.selectedRoles!,
            inPlayDistribution: drunkResult.inPlayDistribution!,
            physicalBag: drunkResult.physicalBag!
        });
        console.log("Verification:", drunkVerification.legal ? "VALID ✅" : "INVALID ❌");
    } else {
        console.log("❌ Failed to generate setup with Drunk");
    }
    
    // Test: Must include Baron
    console.log("\n--- Generating with Baron (modifies base distribution) ---");
    const baronResult = await validator.generateLegalBag(troubleBrewing, 7, {
        mustInclude: ['baron']
    });
    
    if (baronResult.success) {
        console.log("✅ Generated setup with Baron!");
        console.log("Selected roles:", baronResult.selectedRoles);
        console.log("In-play distribution:", baronResult.inPlayDistribution);
        
        // Verify the setup
        const baronVerification = await validator.checkBagLegality({
            script: troubleBrewing,
            playerCount: 7,
            selectedRoles: baronResult.selectedRoles!,
            inPlayDistribution: baronResult.inPlayDistribution!,
            physicalBag: baronResult.physicalBag!
        });
        console.log("Verification:", baronVerification.legal ? "VALID ✅" : "INVALID ❌");
    } else {
        console.log("❌ Failed to generate setup with Baron");
    }
    
    // Test: 7-player base game (should be easy)
    console.log("\n--- Generating basic 7-player setup ---");
    const basic7Result = await validator.generateLegalBag(troubleBrewing, 7);
    
    if (basic7Result.success) {
        console.log("✅ Generated basic 7-player setup!");
        console.log("Selected roles:", basic7Result.selectedRoles);
        console.log("In-play distribution:", basic7Result.inPlayDistribution);
        console.log("Expected: 5 Townsfolk, 0 Outsiders, 1 Minion, 1 Demon");
    } else {
        console.log("❌ Failed to generate basic 7-player setup");
    }
    
    // Test: 7-player with Drunk (should force Baron to create outsider slots)
    console.log("\n--- Generating 7-player with Drunk (should infer Baron needed) ---");
    const drunk7Result = await validator.generateLegalBag(troubleBrewing, 7, {
        mustInclude: ['drunk']
    });
    
    if (drunk7Result.success) {
        console.log("✅ Generated 7-player setup with Drunk!");
        console.log("Selected roles:", drunk7Result.selectedRoles);
        console.log("In-play distribution:", drunk7Result.inPlayDistribution);
        console.log("Expected: Baron should be included to create outsider slots");
        console.log("Baron included?", drunk7Result.selectedRoles?.includes('baron') ? "YES ✅" : "NO ❌");
    } else {
        console.log("❌ Failed to generate 7-player setup with Drunk");
        console.log("This might be expected if no solution exists without Baron");
    }
    
    // Test: Must exclude washerwoman (common role)
    console.log("\n--- Testing mustExclude: washerwoman (8 players) ---");
    const excludeWasherwomanResult = await validator.generateLegalBag(troubleBrewing, 8, {
        mustExclude: ['washerwoman']
    });
    
    if (excludeWasherwomanResult.success) {
        console.log("✅ Generated setup excluding washerwoman!");
        console.log("Selected roles:", excludeWasherwomanResult.selectedRoles);
        console.log("Washerwoman excluded?", !excludeWasherwomanResult.selectedRoles?.includes('washerwoman') ? "YES ✅" : "NO ❌");
        
        // Verify the setup
        const washerwomanVerification = await validator.checkBagLegality({
            script: troubleBrewing,
            playerCount: 8,
            selectedRoles: excludeWasherwomanResult.selectedRoles!,
            inPlayDistribution: excludeWasherwomanResult.inPlayDistribution!,
            physicalBag: excludeWasherwomanResult.physicalBag!
        });
        console.log("Verification:", washerwomanVerification.legal ? "VALID ✅" : "INVALID ❌");
    } else {
        console.log("❌ Failed to generate setup excluding washerwoman");
    }
    
    // Test: Must include drunk AND must exclude butler (7 players)
    console.log("\n--- Testing mustInclude: drunk + mustExclude: butler (7 players) ---");
    const drunkExcludeButlerResult = await validator.generateLegalBag(troubleBrewing, 7, {
        mustInclude: ['drunk'],
        mustExclude: ['butler']
    });
    
    if (drunkExcludeButlerResult.success) {
        console.log("✅ Generated 7-player setup with Drunk but excluding Butler!");
        console.log("Selected roles:", drunkExcludeButlerResult.selectedRoles);
        console.log("Drunk included?", drunkExcludeButlerResult.selectedRoles?.includes('drunk') ? "YES ✅" : "NO ❌");
        console.log("Butler excluded?", !drunkExcludeButlerResult.selectedRoles?.includes('butler') ? "YES ✅" : "NO ❌");
        console.log("Baron included?", drunkExcludeButlerResult.selectedRoles?.includes('baron') ? "YES ✅" : "NO ❌");
        
        // Verify the setup
        const drunkButlerVerification = await validator.checkBagLegality({
            script: troubleBrewing,
            playerCount: 7,
            selectedRoles: drunkExcludeButlerResult.selectedRoles!,
            inPlayDistribution: drunkExcludeButlerResult.inPlayDistribution!,
            physicalBag: drunkExcludeButlerResult.physicalBag!
        });
        console.log("Verification:", drunkButlerVerification.legal ? "VALID ✅" : "INVALID ❌");
    } else {
        console.log("❌ Failed to generate setup with Drunk excluding Butler");
    }
    
    // Test: Must exclude imp (should be UNSAT - no other demons in Trouble Brewing)
    console.log("\n--- Testing mustExclude: imp (should be UNSAT) ---");
    const excludeImpResult = await validator.generateLegalBag(troubleBrewing, 7, {
        mustExclude: ['imp']
    });
    
    if (excludeImpResult.success) {
        console.log("❌ UNEXPECTED: Generated setup excluding imp!");
        console.log("Selected roles:", excludeImpResult.selectedRoles);
        console.log("This should not be possible - imp is the only demon in Trouble Brewing");
        
        // Verify anyway for debugging
        const impVerification = await validator.checkBagLegality({
            script: troubleBrewing,
            playerCount: 7,
            selectedRoles: excludeImpResult.selectedRoles!,
            inPlayDistribution: excludeImpResult.inPlayDistribution!,
            physicalBag: excludeImpResult.physicalBag!
        });
        console.log("Verification:", impVerification.legal ? "VALID ✅" : "INVALID ❌");
    } else {
        console.log("✅ Correctly failed to generate setup excluding imp");
        console.log("(As expected - imp is the only demon in Trouble Brewing)");
    }
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