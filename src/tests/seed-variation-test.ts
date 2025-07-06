// Test how different random seeds affect bias patterns
import { BagLegalityValidator } from '../core/bag-compiler';
import { troubleBrewing } from '../core/scripts';

async function testSeedVariation() {
    console.log('=== Testing Seed Variation in Variable Indirection ===\n');
    
    const script = troubleBrewing;
    const playerCount = 8;
    const numSolutions = 10;
    const seeds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    const allResults: Array<{
        seed: number,
        solutions: any[],
        stats: any
    }> = [];
    
    // Test each seed
    for (const seed of seeds) {
        console.log(`🎲 Testing seed ${seed}:`);
        
        // Generate solutions with this specific seed
        const result = await generateWithSeed(script, playerCount, numSolutions, seed);
        
        // Analyze bias for this seed
        const stats = analyzeBias(result.solutions, `Seed ${seed}`);
        
        allResults.push({
            seed,
            solutions: result.solutions,
            stats
        });
        
        console.log(`  Always selected: ${stats.alwaysSelectedRoles.join(', ')}`);
        console.log(`  Standard deviation: ${stats.stdDeviation.toFixed(2)}`);
        console.log('');
    }
    
    // Compare all results
    console.log('\n📊 Cross-Seed Analysis:');
    console.log('=======================');
    
    // 1. Check if any seeds produce identical results
    console.log('\n🔍 Identical Results Check:');
    for (let i = 0; i < allResults.length; i++) {
        for (let j = i + 1; j < allResults.length; j++) {
            const seed1 = allResults[i];
            const seed2 = allResults[j];
            
            const identical = arraysEqual(seed1.stats.alwaysSelectedRoles, seed2.stats.alwaysSelectedRoles);
            if (identical) {
                console.log(`  Seeds ${seed1.seed} and ${seed2.seed}: IDENTICAL always-selected roles`);
            }
        }
    }
    
    // 2. Show standard deviation range
    const stdDevs = allResults.map(r => r.stats.stdDeviation);
    const minStdDev = Math.min(...stdDevs);
    const maxStdDev = Math.max(...stdDevs);
    const avgStdDev = stdDevs.reduce((a, b) => a + b) / stdDevs.length;
    
    console.log(`\n📈 Standard Deviation Analysis:`);
    console.log(`  Range: ${minStdDev.toFixed(2)} to ${maxStdDev.toFixed(2)}`);
    console.log(`  Average: ${avgStdDev.toFixed(2)}`);
    console.log(`  Variation: ${(maxStdDev - minStdDev).toFixed(2)}`);
    
    // 3. Count unique always-selected role sets
    const uniqueAlwaysSets = new Set();
    for (const result of allResults) {
        const sortedRoles = [...result.stats.alwaysSelectedRoles].sort().join(',');
        uniqueAlwaysSets.add(sortedRoles);
    }
    
    console.log(`\n🎯 Bias Pattern Diversity:`);
    console.log(`  Total seeds tested: ${seeds.length}`);
    console.log(`  Unique bias patterns: ${uniqueAlwaysSets.size}`);
    console.log(`  Pattern uniqueness: ${(uniqueAlwaysSets.size / seeds.length * 100).toFixed(1)}%`);
    
    // 4. Show all unique patterns
    console.log(`\n📋 All Unique Bias Patterns:`);
    const patternToSeeds = new Map<string, number[]>();
    
    for (const result of allResults) {
        const pattern = [...result.stats.alwaysSelectedRoles].sort().join(', ');
        if (!patternToSeeds.has(pattern)) {
            patternToSeeds.set(pattern, []);
        }
        patternToSeeds.get(pattern)!.push(result.seed);
    }
    
    let patternNum = 1;
    for (const [pattern, seedList] of patternToSeeds) {
        console.log(`  Pattern ${patternNum}: [${pattern}]`);
        console.log(`    Seeds: ${seedList.join(', ')}`);
        console.log(`    Frequency: ${seedList.length}/${seeds.length} (${(seedList.length / seeds.length * 100).toFixed(1)}%)`);
        patternNum++;
    }
    
    // 5. Role frequency across all seeds
    console.log(`\n🔄 Role Frequency Across All Seeds:`);
    const roleFreqAcrossSeeds = new Map<string, number>();
    
    for (const result of allResults) {
        for (const role of result.stats.alwaysSelectedRoles) {
            roleFreqAcrossSeeds.set(role, (roleFreqAcrossSeeds.get(role) || 0) + 1);
        }
    }
    
    const sortedCrossSeeds = Array.from(roleFreqAcrossSeeds.entries())
        .sort((a, b) => b[1] - a[1]);
    
    for (const [role, count] of sortedCrossSeeds) {
        const percentage = (count / seeds.length * 100).toFixed(1);
        console.log(`  ${role.padEnd(15)} ${count}/${seeds.length} seeds (${percentage}%)`);
    }
    
    // 6. Conclusion
    console.log(`\n🎯 Conclusion:`);
    console.log(`===============`);
    if (uniqueAlwaysSets.size === 1) {
        console.log('🟡 All seeds produce IDENTICAL bias patterns!');
        console.log('   Variable indirection may not be effectively randomizing bias.');
    } else if (uniqueAlwaysSets.size === seeds.length) {
        console.log('✅ All seeds produce UNIQUE bias patterns!');
        console.log('   Variable indirection is successfully randomizing bias.');
    } else {
        console.log(`🟠 Seeds produce ${uniqueAlwaysSets.size} different bias patterns out of ${seeds.length} possible.`);
        console.log('   Variable indirection provides some bias variety, but not complete randomization.');
    }
}

async function generateWithSeed(script: any, playerCount: number, numSolutions: number, seed: number) {
    // Create a fresh validator to avoid cross-contamination
    const validator = new BagLegalityValidator();
    
    // We need to modify the bag compiler to accept a specific seed
    // For now, we'll use a workaround by modifying the addVariableIndirection call
    const originalAddVariableIndirection = validator['scriptCompiler'].addVariableIndirection;
    
    validator['scriptCompiler'].addVariableIndirection = function(script: any, solver: any, _randomSeed?: number, useIdentityPermutation?: boolean) {
        return originalAddVariableIndirection.call(this, script, solver, seed, useIdentityPermutation);
    };
    
    return await validator.generateMultipleLegalBags(script, playerCount, {
        maxSolutions: numSolutions,
        useVariableIndirection: true,
        useIdentityPermutation: false
    });
}

function analyzeBias(solutions: any[], _label: string) {
    const roleFrequency = new Map<string, number>();
    const totalSolutions = solutions.length;
    
    // Count frequency of each role
    for (const solution of solutions) {
        for (const role of solution.selectedRoles) {
            roleFrequency.set(role, (roleFrequency.get(role) || 0) + 1);
        }
    }
    
    // Calculate bias metrics
    const frequencies = Array.from(roleFrequency.values());
    const avgFrequency = frequencies.reduce((a, b) => a + b, 0) / frequencies.length;
    const variance = frequencies.reduce((sum, freq) => sum + Math.pow(freq - avgFrequency, 2), 0) / frequencies.length;
    const stdDeviation = Math.sqrt(variance);
    
    // Find always-selected roles
    const sortedRoles = Array.from(roleFrequency.entries())
        .sort((a, b) => b[1] - a[1]);
    const alwaysSelected = sortedRoles.filter(([_role, count]) => count === totalSolutions);
    
    return {
        stdDeviation,
        alwaysSelectedRoles: alwaysSelected.map(([role]) => role),
        roleFrequency: sortedRoles,
        totalSolutions
    };
}

function arraysEqual(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, index) => val === sortedB[index]);
}

// Run the test
testSeedVariation().catch(console.error);