// Test variable indirection for bias elimination
import { BagLegalityValidator } from './bag-compiler';
import { troubleBrewing } from './scripts';

async function testVariableIndirection() {
    console.log('=== Testing Variable Indirection for Bias Elimination ===\n');
    
    const validator = new BagLegalityValidator();
    const script = troubleBrewing;
    const playerCount = 8;
    const numSolutions = 10;
    
    // Test 1: Generate solutions WITHOUT variable indirection
    console.log('🔍 Test 1: Generating solutions WITHOUT variable indirection');
    const withoutIndirection = await validator.generateMultipleLegalBags(script, playerCount, {
        maxSolutions: numSolutions,
        useVariableIndirection: false
    });
    
    // Test 2: Generate solutions WITH variable indirection
    console.log('\n🔍 Test 2: Generating solutions WITH variable indirection');
    const withIndirection = await validator.generateMultipleLegalBags(script, playerCount, {
        maxSolutions: numSolutions,
        useVariableIndirection: true
    });
    
    // Analyze bias in both cases
    console.log('\n📊 Bias Analysis Results:');
    console.log('========================');
    
    function analyzeBias(solutions: any[], label: string) {
        console.log(`\n${label}:`);
        console.log('-------------------');
        
        const roleFrequency = new Map<string, number>();
        const totalSolutions = solutions.length;
        
        // Count frequency of each role
        for (const solution of solutions) {
            for (const role of solution.selectedRoles) {
                roleFrequency.set(role, (roleFrequency.get(role) || 0) + 1);
            }
        }
        
        // Sort by frequency (descending)
        const sortedRoles = Array.from(roleFrequency.entries())
            .sort((a, b) => b[1] - a[1]);
        
        // Display results
        console.log(`Total solutions: ${totalSolutions}`);
        console.log('Role frequencies:');
        
        for (const [roleName, count] of sortedRoles) {
            const percentage = Math.round((count / totalSolutions) * 100);
            const bar = '█'.repeat(Math.floor(percentage / 10)) + '░'.repeat(10 - Math.floor(percentage / 10));
            console.log(`  ${roleName.padEnd(15)} ${count.toString().padStart(2)}/${totalSolutions} (${percentage.toString().padStart(3)}%) [${bar}]`);
        }
        
        // Calculate bias metrics
        const frequencies = Array.from(roleFrequency.values());
        const avgFrequency = frequencies.reduce((a, b) => a + b, 0) / frequencies.length;
        const variance = frequencies.reduce((sum, freq) => sum + Math.pow(freq - avgFrequency, 2), 0) / frequencies.length;
        const stdDeviation = Math.sqrt(variance);
        
        console.log(`\nBias metrics:`);
        console.log(`  Average frequency: ${avgFrequency.toFixed(2)}`);
        console.log(`  Standard deviation: ${stdDeviation.toFixed(2)}`);
        console.log(`  Coefficient of variation: ${(stdDeviation / avgFrequency * 100).toFixed(1)}%`);
        
        // Count roles that appear in 100% of solutions
        const alwaysSelected = sortedRoles.filter(([_roleName, count]) => count === totalSolutions);
        const neverSelected = script.roleIds.filter((roleId: string) => !roleFrequency.has(roleId));
        
        console.log(`  Always selected (100%): ${alwaysSelected.length > 0 ? alwaysSelected.map(([role]) => role).join(', ') : 'None'}`);
        console.log(`  Never selected (0%): ${neverSelected.length > 0 ? neverSelected.join(', ') : 'None'}`);
        
        return { stdDeviation, alwaysSelected: alwaysSelected.length, neverSelected: neverSelected.length };
    }
    
    const withoutStats = analyzeBias(withoutIndirection.solutions, 'WITHOUT Variable Indirection');
    const withStats = analyzeBias(withIndirection.solutions, 'WITH Variable Indirection');
    
    // Summary comparison
    console.log('\n🎯 Summary Comparison:');
    console.log('======================');
    console.log(`Standard deviation reduction: ${withoutStats.stdDeviation.toFixed(2)} → ${withStats.stdDeviation.toFixed(2)} (${Math.abs(withStats.stdDeviation - withoutStats.stdDeviation).toFixed(2)} difference)`);
    console.log(`Always-selected roles: ${withoutStats.alwaysSelected} → ${withStats.alwaysSelected} (${withStats.alwaysSelected - withoutStats.alwaysSelected} change)`);
    console.log(`Never-selected roles: ${withoutStats.neverSelected} → ${withStats.neverSelected} (${withStats.neverSelected - withoutStats.neverSelected} change)`);
    
    if (withStats.stdDeviation < withoutStats.stdDeviation) {
        console.log('✅ Variable indirection successfully reduced bias!');
    } else {
        console.log('❌ Variable indirection did not reduce bias as expected.');
    }
    
    // Test constraint correctness
    console.log('\n🔍 Constraint Correctness Test:');
    console.log('===============================');
    
    // Verify that both approaches generate valid solutions
    const allSolutions = [...withoutIndirection.solutions, ...withIndirection.solutions];
    let validSolutions = 0;
    
    for (const solution of allSolutions) {
        // Check that solution has exactly the right number of roles
        if (solution.selectedRoles.length === playerCount) {
            validSolutions++;
        }
    }
    
    console.log(`Valid solutions: ${validSolutions}/${allSolutions.length}`);
    
    if (validSolutions === allSolutions.length) {
        console.log('✅ All solutions are valid - constraint correctness preserved!');
    } else {
        console.log('❌ Some solutions are invalid - constraint correctness may be compromised.');
    }
}

// Run the test
testVariableIndirection().catch(console.error);