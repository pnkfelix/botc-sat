// Analyze first solution bias across many seeds
import { BagLegalityValidator } from './bag-compiler';
import { troubleBrewing } from './scripts';
import { registerTroubleBrewing } from './trouble-brewing-roles';
import { promises as fs } from 'fs';

// Interface for seed configuration
interface SeedConfig {
    type: 'sequential' | 'random' | 'array';
    seeds?: number[];           // For type 'array'
    startSeed?: number;         // For type 'sequential'
    endSeed?: number;           // For type 'sequential'
    filePath?: string;          // For type 'random' - path to JSON file
}

async function firstSolutionAnalysis(playerCount: number, seedConfig: SeedConfig) {
    console.log(`=== First Solution Analysis Across Seeds (${playerCount} players) ===\n`);
    
    // CRITICAL: Register roles first!
    registerTroubleBrewing();
    console.log('✅ Registered Trouble Brewing roles\n');
    
    const script = troubleBrewing;
    
    // Parse seed configuration
    let seeds: number[] = [];
    let seedDescription = '';
    
    switch (seedConfig.type) {
        case 'sequential':
            const startSeed = seedConfig.startSeed || 0;
            const endSeed = seedConfig.endSeed || 999;
            for (let seed = startSeed; seed <= endSeed; seed++) {
                seeds.push(seed);
            }
            seedDescription = `sequential seeds ${startSeed}-${endSeed}`;
            break;
            
        case 'random':
            if (!seedConfig.filePath) {
                throw new Error('filePath required for random seed type');
            }
            const fileContent = await fs.readFile(seedConfig.filePath, 'utf-8');
            const seedData = JSON.parse(fileContent);
            seeds = seedData.seeds;
            seedDescription = `random seeds from ${seedConfig.filePath}`;
            break;
            
        case 'array':
            if (!seedConfig.seeds) {
                throw new Error('seeds array required for array seed type');
            }
            seeds = seedConfig.seeds;
            seedDescription = `provided array of ${seeds.length} seeds`;
            break;
            
        default:
            throw new Error(`Unknown seed type: ${seedConfig.type}`);
    }
    
    const totalSeeds = seeds.length;
    console.log(`Analyzing first solution for ${seedDescription}`);
    console.log(`Total seeds: ${totalSeeds}`);
    console.log('Generating 1 solution per seed...\n');
    
    const allSolutions: Array<{
        seed: number,
        selectedRoles: string[]
    }> = [];
    
    const progressInterval = Math.max(1, Math.floor(totalSeeds / 10)); // Show 10 progress updates
    const startTime = Date.now();
    
    // Test each seed
    for (let i = 0; i < seeds.length; i++) {
        const seed = seeds[i];
        
        if (i % progressInterval === 0) {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = (i / totalSeeds) * 100;
            const estimatedTotal = elapsed / (progress / 100);
            const remaining = Math.max(0, estimatedTotal - elapsed);
            console.log(`Progress: ${i}/${totalSeeds} (${progress.toFixed(1)}%) - ${elapsed.toFixed(1)}s elapsed, ~${remaining.toFixed(1)}s remaining`);
        }
        
        try {
            // Generate just the first solution with this specific seed
            const result = await generateFirstSolutionWithSeed(script, playerCount, seed);
            
            if (result.success && result.solutions.length > 0) {
                allSolutions.push({
                    seed,
                    selectedRoles: result.solutions[0].selectedRoles
                });
            } else {
                console.error(`No solution found for seed ${seed}`);
            }
            
        } catch (error) {
            console.error(`Error with seed ${seed}:`, error);
            // Continue with next seed
        }
    }
    
    const totalTime = (Date.now() - startTime) / 1000;
    console.log(`\nCompleted analysis in ${totalTime.toFixed(1)}s`);
    console.log(`Successfully analyzed ${allSolutions.length}/${totalSeeds} seeds\n`);
    
    // Analyze role frequency across first solutions
    console.log('📊 First Solution Role Frequency Analysis:');
    console.log('==========================================');
    
    const roleFrequency = new Map<string, number>();
    
    // Count how often each role appears in first solutions
    for (const solution of allSolutions) {
        for (const role of solution.selectedRoles) {
            roleFrequency.set(role, (roleFrequency.get(role) || 0) + 1);
        }
    }
    
    // Sort by frequency
    const sortedRoleFreq = Array.from(roleFrequency.entries())
        .sort((a, b) => b[1] - a[1]);
    
    console.log(`\n🎯 Role Frequency in First Solutions:`);
    console.log(`Total solutions analyzed: ${allSolutions.length}`);
    console.log(`Each role appears in 8-role solutions, so perfect uniformity would be ~${(8 / script.roleIds.length * 100).toFixed(1)}%\n`);
    
    for (const [role, count] of sortedRoleFreq) {
        const percentage = (count / allSolutions.length * 100).toFixed(1);
        const bar = '█'.repeat(Math.floor(count / allSolutions.length * 50));
        console.log(`  ${role.padEnd(15)} ${count.toString().padStart(4)}/${allSolutions.length} (${percentage.padStart(5)}%) ${bar}`);
    }
    
    // Calculate statistics
    const frequencies = Array.from(roleFrequency.values());
    const avgFrequency = frequencies.reduce((a, b) => a + b, 0) / frequencies.length;
    const variance = frequencies.reduce((sum, freq) => sum + Math.pow(freq - avgFrequency, 2), 0) / frequencies.length;
    const stdDeviation = Math.sqrt(variance);
    const coefficientOfVariation = (stdDeviation / avgFrequency * 100);
    
    console.log(`\n📈 Statistical Analysis:`);
    console.log(`  Average frequency: ${avgFrequency.toFixed(2)}`);
    console.log(`  Standard deviation: ${stdDeviation.toFixed(2)}`);
    console.log(`  Coefficient of variation: ${coefficientOfVariation.toFixed(1)}%`);
    
    // Analyze bias
    const maxFreq = Math.max(...frequencies);
    const minFreq = Math.min(...frequencies);
    const range = maxFreq - minFreq;
    
    console.log(`\n🎯 Bias Analysis:`);
    console.log(`  Most frequent role appears: ${maxFreq} times`);
    console.log(`  Least frequent role appears: ${minFreq} times`);
    console.log(`  Frequency range: ${range} (${(range / allSolutions.length * 100).toFixed(1)}% of total)`);
    
    // Expected frequency for perfect uniformity (each role in 8/22 ≈ 36.4% of solutions)
    const expectedFreqPerRole = 8 / script.roleIds.length * allSolutions.length;
    console.log(`  Expected frequency (perfect uniform): ${expectedFreqPerRole.toFixed(1)}`);
    
    // Calculate chi-square-like metric for uniformity
    const uniformityMetric = frequencies.reduce((sum, freq) => sum + Math.pow(freq - expectedFreqPerRole, 2), 0) / expectedFreqPerRole;
    console.log(`  Uniformity metric (lower = more uniform): ${uniformityMetric.toFixed(1)}`);
    
    // Show most and least frequent roles
    const mostFrequent = sortedRoleFreq[0];
    const leastFrequent = sortedRoleFreq[sortedRoleFreq.length - 1];
    
    console.log(`\n🏆 Extremes:`);
    console.log(`  Most frequent: ${mostFrequent[0]} (${mostFrequent[1]} times, ${(mostFrequent[1] / allSolutions.length * 100).toFixed(1)}%)`);
    console.log(`  Least frequent: ${leastFrequent[0]} (${leastFrequent[1]} times, ${(leastFrequent[1] / allSolutions.length * 100).toFixed(1)}%)`);
    
    // Count roles that never appear
    const neverAppear = script.roleIds.filter(roleId => !roleFrequency.has(roleId));
    if (neverAppear.length > 0) {
        console.log(`  Never appear: ${neverAppear.join(', ')}`);
    } else {
        console.log(`  All roles appear at least once ✅`);
    }
    
    // Overall assessment
    console.log(`\n🎯 Bias Elimination Assessment:`);
    if (coefficientOfVariation < 20) {
        console.log(`✅ EXCELLENT: Very low variation (${coefficientOfVariation.toFixed(1)}%)`);
    } else if (coefficientOfVariation < 40) {
        console.log(`✅ GOOD: Moderate variation (${coefficientOfVariation.toFixed(1)}%)`);
    } else if (coefficientOfVariation < 60) {
        console.log(`⚠️  FAIR: High variation (${coefficientOfVariation.toFixed(1)}%)`);
    } else {
        console.log(`❌ POOR: Very high variation (${coefficientOfVariation.toFixed(1)}%)`);
    }
    
    if (range <= allSolutions.length * 0.1) {
        console.log(`✅ Frequency range is tight (${range} occurrences)`);
    } else if (range <= allSolutions.length * 0.2) {
        console.log(`⚠️  Frequency range is moderate (${range} occurrences)`);
    } else {
        console.log(`❌ Frequency range is wide (${range} occurrences)`);
    }
    
    // Performance metrics
    console.log(`\n⚡ Performance:`);
    console.log(`  Total time: ${totalTime.toFixed(1)}s`);
    console.log(`  Average per seed: ${(totalTime / allSolutions.length * 1000).toFixed(1)}ms`);
    console.log(`  Seeds per second: ${(allSolutions.length / totalTime).toFixed(1)}`);
}

async function generateFirstSolutionWithSeed(script: any, playerCount: number, seed: number) {
    // Create a fresh validator
    const validator = new BagLegalityValidator();
    
    // Override addVariableIndirection to use our specific seed
    const originalAddVariableIndirection = validator['scriptCompiler'].addVariableIndirection;
    
    validator['scriptCompiler'].addVariableIndirection = function(script: any, solver: any, _randomSeed?: number, useIdentityPermutation?: boolean) {
        return originalAddVariableIndirection.call(this, script, solver, seed, useIdentityPermutation);
    };
    
    return await validator.generateMultipleLegalBags(script, playerCount, {
        maxSolutions: 1,  // Only generate the first solution
        useVariableIndirection: true,
        useIdentityPermutation: false
    });
}

// Example usage functions
async function runSequentialAnalysis() {
    await firstSolutionAnalysis(8, {
        type: 'sequential',
        startSeed: 0,
        endSeed: 999
    });
}

async function runRandomSeedAnalysis() {
    await firstSolutionAnalysis(8, {
        type: 'random',
        filePath: '../random-seeds.json'
    });
}

async function runCustomSeedAnalysis() {
    await firstSolutionAnalysis(8, {
        type: 'array',
        seeds: [42, 123, 456, 789, 1000, 2000, 3000, 4000, 5000, 9999]
    });
}

// Export functions for use in other scripts
export { firstSolutionAnalysis, runSequentialAnalysis, runRandomSeedAnalysis, runCustomSeedAnalysis };

// Default: Run sequential analysis if this script is executed directly
if (require.main === module) {
    runSequentialAnalysis().catch(console.error);
}