// Test identity permutation vs no indirection
import { BagLegalityValidator } from '../core/bag-compiler';
import { troubleBrewing } from '../core/scripts';

async function testIdentityPermutation() {
    console.log('=== Testing Identity Permutation vs No Indirection ===\n');
    
    const validator = new BagLegalityValidator();
    const script = troubleBrewing;
    const playerCount = 8;
    const numSolutions = 10;
    
    // Test 1: Generate solutions WITHOUT any indirection
    console.log('🔍 Test 1: Generating solutions WITHOUT indirection');
    const withoutIndirection = await validator.generateMultipleLegalBags(script, playerCount, {
        maxSolutions: numSolutions,
        useVariableIndirection: false
    });
    
    // Test 2: Generate solutions WITH identity permutation
    console.log('\n🔍 Test 2: Generating solutions WITH IDENTITY permutation');
    const withIdentityPermutation = await validator.generateMultipleLegalBags(script, playerCount, {
        maxSolutions: numSolutions,
        useVariableIndirection: true,
        useIdentityPermutation: true
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
        
        // Count roles that appear in 100% of solutions
        const alwaysSelected = sortedRoles.filter(([_roleName, count]) => count === totalSolutions);
        const neverSelected = script.roleIds.filter((roleId: string) => !roleFrequency.has(roleId));
        
        console.log(`  Always selected (100%): ${alwaysSelected.length > 0 ? alwaysSelected.map(([role]) => role).join(', ') : 'None'}`);
        console.log(`  Never selected (0%): ${neverSelected.length > 0 ? neverSelected.join(', ') : 'None'}`);
        
        return { 
            stdDeviation, 
            alwaysSelected: alwaysSelected.length, 
            neverSelected: neverSelected.length,
            alwaysSelectedRoles: alwaysSelected.map(([role]) => role),
            roleFrequency: sortedRoles
        };
    }
    
    const withoutStats = analyzeBias(withoutIndirection.solutions, 'WITHOUT Indirection');
    const withIdentityStats = analyzeBias(withIdentityPermutation.solutions, 'WITH Identity Permutation');
    
    // Deep comparison
    console.log('\n🔍 Detailed Comparison:');
    console.log('=======================');
    
    // Check if the bias patterns are identical
    const withoutAlwaysSet = new Set(withoutStats.alwaysSelectedRoles);
    const identityAlwaysSet = new Set(withIdentityStats.alwaysSelectedRoles);
    
    const sameAlwaysSelected = withoutAlwaysSet.size === identityAlwaysSet.size && 
        [...withoutAlwaysSet].every(role => identityAlwaysSet.has(role));
    
    console.log(`Same always-selected roles: ${sameAlwaysSelected ? 'YES ✅' : 'NO ❌'}`);
    console.log(`Standard deviation: ${withoutStats.stdDeviation.toFixed(2)} vs ${withIdentityStats.stdDeviation.toFixed(2)}`);
    console.log(`Difference: ${Math.abs(withIdentityStats.stdDeviation - withoutStats.stdDeviation).toFixed(3)}`);
    
    // Show role-by-role comparison
    console.log('\n📋 Role-by-Role Frequency Comparison:');
    const allRoles = new Set([
        ...withoutStats.roleFrequency.map(([role]) => role),
        ...withIdentityStats.roleFrequency.map(([role]) => role)
    ]);
    
    const withoutFreqMap = new Map(withoutStats.roleFrequency);
    const identityFreqMap = new Map(withIdentityStats.roleFrequency);
    
    for (const role of allRoles) {
        const withoutFreq = withoutFreqMap.get(role) || 0;
        const identityFreq = identityFreqMap.get(role) || 0;
        const diff = identityFreq - withoutFreq;
        const diffStr = diff === 0 ? '  same' : (diff > 0 ? `+${diff}` : `${diff}`);
        console.log(`  ${role.padEnd(15)} ${withoutFreq}/10 → ${identityFreq}/10 (${diffStr})`);
    }
    
    // Conclusion
    console.log('\n🎯 Conclusion:');
    console.log('===============');
    if (sameAlwaysSelected && Math.abs(withIdentityStats.stdDeviation - withoutStats.stdDeviation) < 0.1) {
        console.log('✅ Identity permutation produces IDENTICAL bias patterns to no indirection!');
        console.log('   This confirms that bias redirection is purely due to the random permutation.');
    } else {
        console.log('❌ Identity permutation produces DIFFERENT bias patterns than no indirection!');
        console.log('   This suggests the slot variables themselves affect the bias structure.');
    }
}

// Run the test
testIdentityPermutation().catch(console.error);