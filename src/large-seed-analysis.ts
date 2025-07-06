// Large-scale seed analysis: test seeds 0-999 for comprehensive bias patterns
import { BagLegalityValidator } from './bag-compiler';
import { troubleBrewing } from './scripts';

async function largeSeedAnalysis() {
    console.log('=== Large-Scale Seed Analysis (0-999) ===\n');
    
    const script = troubleBrewing;
    const playerCount = 8;
    const numSolutions = 5; // Reduced for performance
    const startSeed = 0;
    const endSeed = 999;
    const totalSeeds = endSeed - startSeed + 1;
    
    console.log(`Analyzing ${totalSeeds} seeds (${startSeed}-${endSeed})`);
    console.log(`Generating ${numSolutions} solutions per seed`);
    console.log(`Total solutions to analyze: ${totalSeeds * numSolutions}`);
    console.log('This may take several minutes...\n');
    
    const allResults: Array<{
        seed: number,
        alwaysSelectedRoles: string[],
        stdDeviation: number,
        alwaysSelectedCount: number
    }> = [];
    
    const progressInterval = 100;
    const startTime = Date.now();
    
    // Test each seed
    for (let seed = startSeed; seed <= endSeed; seed++) {
        if (seed % progressInterval === 0) {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = (seed - startSeed) / totalSeeds * 100;
            const estimatedTotal = elapsed / (progress / 100);
            const remaining = Math.max(0, estimatedTotal - elapsed);
            console.log(`Progress: ${seed}/${endSeed} (${progress.toFixed(1)}%) - ${elapsed.toFixed(1)}s elapsed, ~${remaining.toFixed(1)}s remaining`);
        }
        
        try {
            // Generate solutions with this specific seed
            const result = await generateWithSeed(script, playerCount, numSolutions, seed);
            
            // Analyze bias for this seed
            const stats = analyzeBias(result.solutions);
            
            allResults.push({
                seed,
                alwaysSelectedRoles: stats.alwaysSelectedRoles,
                stdDeviation: stats.stdDeviation,
                alwaysSelectedCount: stats.alwaysSelectedRoles.length
            });
            
        } catch (error) {
            console.error(`Error with seed ${seed}:`, error);
            // Continue with next seed
        }
    }
    
    const totalTime = (Date.now() - startTime) / 1000;
    console.log(`\nCompleted analysis in ${totalTime.toFixed(1)}s`);
    console.log(`Successfully analyzed ${allResults.length}/${totalSeeds} seeds\n`);
    
    // Comprehensive analysis
    console.log('📊 Large-Scale Analysis Results:');
    console.log('=================================');
    
    // 1. Pattern diversity analysis
    const uniquePatterns = new Set();
    const patternFrequency = new Map<string, number>();
    
    for (const result of allResults) {
        const pattern = [...result.alwaysSelectedRoles].sort().join(',');
        uniquePatterns.add(pattern);
        patternFrequency.set(pattern, (patternFrequency.get(pattern) || 0) + 1);
    }
    
    console.log(`\n🎯 Pattern Diversity:`);
    console.log(`  Total seeds analyzed: ${allResults.length}`);
    console.log(`  Unique bias patterns: ${uniquePatterns.size}`);
    console.log(`  Pattern uniqueness: ${(uniquePatterns.size / allResults.length * 100).toFixed(2)}%`);
    
    // 2. Always-selected count distribution
    const countDistribution = new Map<number, number>();
    for (const result of allResults) {
        const count = result.alwaysSelectedCount;
        countDistribution.set(count, (countDistribution.get(count) || 0) + 1);
    }
    
    console.log(`\n📈 Always-Selected Role Count Distribution:`);
    const sortedCounts = Array.from(countDistribution.entries()).sort((a, b) => a[0] - b[0]);
    for (const [count, frequency] of sortedCounts) {
        const percentage = (frequency / allResults.length * 100).toFixed(1);
        const bar = '█'.repeat(Math.floor(frequency / allResults.length * 50));
        console.log(`  ${count} roles: ${frequency.toString().padStart(4)} seeds (${percentage.padStart(5)}%) ${bar}`);
    }
    
    // 3. Standard deviation analysis
    const stdDevs = allResults.map(r => r.stdDeviation);
    const minStdDev = Math.min(...stdDevs);
    const maxStdDev = Math.max(...stdDevs);
    const avgStdDev = stdDevs.reduce((a, b) => a + b) / stdDevs.length;
    const medianStdDev = stdDevs.sort()[Math.floor(stdDevs.length / 2)];
    
    console.log(`\n📊 Standard Deviation Statistics:`);
    console.log(`  Minimum: ${minStdDev.toFixed(3)}`);
    console.log(`  Maximum: ${maxStdDev.toFixed(3)}`);
    console.log(`  Average: ${avgStdDev.toFixed(3)}`);
    console.log(`  Median:  ${medianStdDev.toFixed(3)}`);
    console.log(`  Range:   ${(maxStdDev - minStdDev).toFixed(3)}`);
    
    // 4. Role frequency across all seeds
    console.log(`\n🔄 Role Frequency Across All Seeds:`);
    const roleFreqAcrossSeeds = new Map<string, number>();
    
    for (const result of allResults) {
        for (const role of result.alwaysSelectedRoles) {
            roleFreqAcrossSeeds.set(role, (roleFreqAcrossSeeds.get(role) || 0) + 1);
        }
    }
    
    const sortedRoleFreq = Array.from(roleFreqAcrossSeeds.entries())
        .sort((a, b) => b[1] - a[1]);
    
    console.log(`Top 10 most frequently always-selected roles:`);
    for (let i = 0; i < Math.min(10, sortedRoleFreq.length); i++) {
        const [role, count] = sortedRoleFreq[i];
        const percentage = (count / allResults.length * 100).toFixed(1);
        console.log(`  ${(i + 1).toString().padStart(2)}. ${role.padEnd(15)} ${count.toString().padStart(4)}/${allResults.length} seeds (${percentage}%)`);
    }
    
    // 5. Most common patterns
    console.log(`\n📋 Most Common Bias Patterns (Top 10):`);
    const sortedPatterns = Array.from(patternFrequency.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    for (let i = 0; i < sortedPatterns.length; i++) {
        const [pattern, count] = sortedPatterns[i];
        const percentage = (count / allResults.length * 100).toFixed(1);
        const roles = pattern.split(',').join(', ');
        console.log(`  ${(i + 1).toString().padStart(2)}. [${roles}]`);
        console.log(`      ${count} seeds (${percentage}%)`);
    }
    
    // 6. Statistical summary
    console.log(`\n🎯 Statistical Summary:`);
    const averagePatternFreq = allResults.length / uniquePatterns.size;
    console.log(`  Average pattern frequency: ${averagePatternFreq.toFixed(2)} seeds per pattern`);
    console.log(`  Most common pattern appears in: ${sortedPatterns[0][1]} seeds (${(sortedPatterns[0][1] / allResults.length * 100).toFixed(1)}%)`);
    console.log(`  Effective randomization: ${uniquePatterns.size > allResults.length * 0.8 ? 'EXCELLENT' : uniquePatterns.size > allResults.length * 0.5 ? 'GOOD' : 'POOR'}`);
    
    // 7. Performance metrics
    console.log(`\n⚡ Performance Metrics:`);
    console.log(`  Total analysis time: ${totalTime.toFixed(1)}s`);
    console.log(`  Average time per seed: ${(totalTime / allResults.length * 1000).toFixed(1)}ms`);
    console.log(`  Solutions per second: ${(allResults.length * numSolutions / totalTime).toFixed(1)}`);
}

async function generateWithSeed(script: any, playerCount: number, numSolutions: number, seed: number) {
    // Create a fresh validator to avoid cross-contamination
    const validator = new BagLegalityValidator();
    
    // Modify the addVariableIndirection call to use our specific seed
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

function analyzeBias(solutions: any[]) {
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
    if (frequencies.length === 0) {
        return {
            stdDeviation: 0,
            alwaysSelectedRoles: [],
            totalSolutions
        };
    }
    
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
        totalSolutions
    };
}

// Run the large-scale analysis
largeSeedAnalysis().catch(console.error);