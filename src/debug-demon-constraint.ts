// Debug why imp doesn't appear in every solution
import { BagLegalityValidator } from './bag-compiler';
import { troubleBrewing } from './scripts';
import { registerTroubleBrewing } from './trouble-brewing-roles';

async function debugDemonConstraint() {
    console.log('=== Debugging Demon Constraint Issue ===\n');
    
    // CRITICAL: Register roles first!
    registerTroubleBrewing();
    console.log('✅ Registered Trouble Brewing roles\n');
    
    const script = troubleBrewing;
    const playerCount = 8;
    
    // Test a few seeds to see what's happening
    for (const seed of [0, 1, 2]) {
        console.log(`\n🎲 Testing seed ${seed}:`);
        
        // Generate solution with this seed
        const validator = new BagLegalityValidator();
        
        // Override addVariableIndirection to use our specific seed
        const originalAddVariableIndirection = validator['scriptCompiler'].addVariableIndirection;
        
        validator['scriptCompiler'].addVariableIndirection = function(script: any, solver: any, _randomSeed?: number, useIdentityPermutation?: boolean) {
            return originalAddVariableIndirection.call(this, script, solver, seed, useIdentityPermutation);
        };
        
        const result = await validator.generateMultipleLegalBags(script, playerCount, {
            maxSolutions: 1,
            useVariableIndirection: true,
            useIdentityPermutation: false
        });
        
        if (result.success && result.solutions.length > 0) {
            const solution = result.solutions[0];
            console.log(`  Solution: [${solution.selectedRoles.join(', ')}]`);
            
            // Check role types
            const roleTypes = { Townsfolk: 0, Outsider: 0, Minion: 0, Demon: 0 };
            for (const roleId of solution.selectedRoles) {
                const role = require('./roles').getRole(roleId);
                console.log(`    Role '${roleId}': ${role ? role.type : 'UNDEFINED'}`);
                if (role && role.type in roleTypes) {
                    (roleTypes as any)[role.type]++;
                }
            }
            
            console.log(`  Role distribution: T=${roleTypes.Townsfolk}, O=${roleTypes.Outsider}, M=${roleTypes.Minion}, D=${roleTypes.Demon}`);
            console.log(`  Has imp: ${solution.selectedRoles.includes('imp') ? 'YES ✅' : 'NO ❌'}`);
            console.log(`  Distribution valid: ${roleTypes.Demon === 1 ? 'YES ✅' : 'NO ❌'}`);
            
        } else {
            console.log(`  FAILED to generate solution`);
        }
    }
    
    // Now test WITHOUT variable indirection to see if the problem exists there too
    console.log(`\n\n🔍 Testing WITHOUT variable indirection (baseline):`);
    
    const validator2 = new BagLegalityValidator();
    const result2 = await validator2.generateMultipleLegalBags(script, playerCount, {
        maxSolutions: 5,
        useVariableIndirection: false
    });
    
    if (result2.success) {
        for (let i = 0; i < result2.solutions.length; i++) {
            const solution = result2.solutions[i];
            console.log(`  Solution ${i + 1}: [${solution.selectedRoles.join(', ')}]`);
            
            const roleTypes = { Townsfolk: 0, Outsider: 0, Minion: 0, Demon: 0 };
            for (const roleId of solution.selectedRoles) {
                const role = require('./roles').getRole(roleId);
                if (role && role.type in roleTypes) {
                    (roleTypes as any)[role.type]++;
                }
            }
            
            console.log(`    Role distribution: T=${roleTypes.Townsfolk}, O=${roleTypes.Outsider}, M=${roleTypes.Minion}, D=${roleTypes.Demon}`);
            console.log(`    Has imp: ${solution.selectedRoles.includes('imp') ? 'YES ✅' : 'NO ❌'}`);
        }
    } else {
        console.log(`  FAILED to generate baseline solutions`);
    }
}

debugDemonConstraint().catch(console.error);