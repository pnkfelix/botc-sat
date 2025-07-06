// Comprehensive analysis across multiple player counts using both seed sets
import { firstSolutionAnalysis } from './first-solution-analysis';
import { promises as fs } from 'fs';

async function multiPlayerCountAnalysis() {
    console.log('🎯 Multi-Player Count Analysis: Baron and Role Patterns\n');
    console.log('Testing player counts 7, 8, 9, 10, 11, 12 with both seed sets\n');
    
    const playerCounts = [7, 8, 9, 10, 11, 12];
    const results: Array<{
        playerCount: number,
        seedType: 'sequential' | 'random',
        baronFrequency: number,
        drunkFrequency: number,
        distributionPatterns: Map<string, number>,
        totalSolutions: number
    }> = [];
    
    for (const playerCount of playerCounts) {
        console.log(`\n${'='.repeat(80)}`);
        console.log(`🎲 Analyzing ${playerCount}-Player Games`);
        console.log(`${'='.repeat(80)}`);
        
        // Test 1: Sequential seeds [0,999]
        console.log(`\n📊 ${playerCount} Players - Sequential Seeds [0,999]:`);
        console.log('-'.repeat(50));
        
        const startTime1 = Date.now();
        
        // We'll capture the output and parse it for statistics
        // For now, let's use a simpler approach - create a custom analysis
        const sequentialResult = await analyzePlayerCountWithSeeds({
            playerCount,
            seedType: 'sequential',
            startSeed: 0,
            endSeed: 999
        });
        
        const time1 = (Date.now() - startTime1) / 1000;
        console.log(`⏱️  Sequential analysis completed in ${time1.toFixed(1)}s`);
        
        results.push(sequentialResult);
        
        // Test 2: Random seeds from file
        console.log(`\n📊 ${playerCount} Players - Random Seeds (1000 from file):`);
        console.log('-'.repeat(50));
        
        const startTime2 = Date.now();
        
        const randomResult = await analyzePlayerCountWithSeeds({
            playerCount,
            seedType: 'random',
            filePath: './random-seeds.json'
        });
        
        const time2 = (Date.now() - startTime2) / 1000;
        console.log(`⏱️  Random seed analysis completed in ${time2.toFixed(1)}s`);
        
        results.push(randomResult);
        
        // Quick comparison for this player count
        console.log(`\n🔍 ${playerCount}-Player Comparison:`);
        console.log(`  Sequential: Baron ${sequentialResult.baronFrequency.toFixed(1)}%, Drunk ${sequentialResult.drunkFrequency.toFixed(1)}%`);
        console.log(`  Random:     Baron ${randomResult.baronFrequency.toFixed(1)}%, Drunk ${randomResult.drunkFrequency.toFixed(1)}%`);
    }
    
    // Comprehensive analysis across all player counts
    console.log(`\n${'='.repeat(80)}`);
    console.log('📈 COMPREHENSIVE ANALYSIS ACROSS PLAYER COUNTS');
    console.log(`${'='.repeat(80)}`);
    
    console.log(`\n🏰 Baron Frequency by Player Count:`);
    console.log('Player Count | Sequential | Random | Difference');
    console.log('-------------|------------|--------|----------');
    
    for (const playerCount of playerCounts) {
        const sequential = results.find(r => r.playerCount === playerCount && r.seedType === 'sequential');
        const random = results.find(r => r.playerCount === playerCount && r.seedType === 'random');
        
        if (sequential && random) {
            const diff = random.baronFrequency - sequential.baronFrequency;
            const diffStr = diff >= 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`;
            console.log(`${playerCount.toString().padEnd(12)} | ${sequential.baronFrequency.toFixed(1).padEnd(10)}% | ${random.baronFrequency.toFixed(1).padEnd(6)}% | ${diffStr}`);
        }
    }
    
    console.log(`\n🍺 Drunk Frequency by Player Count:`);
    console.log('Player Count | Sequential | Random | Difference');
    console.log('-------------|------------|--------|----------');
    
    for (const playerCount of playerCounts) {
        const sequential = results.find(r => r.playerCount === playerCount && r.seedType === 'sequential');
        const random = results.find(r => r.playerCount === playerCount && r.seedType === 'random');
        
        if (sequential && random) {
            const diff = random.drunkFrequency - sequential.drunkFrequency;
            const diffStr = diff >= 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`;
            console.log(`${playerCount.toString().padEnd(12)} | ${sequential.drunkFrequency.toFixed(1).padEnd(10)}% | ${random.drunkFrequency.toFixed(1).padEnd(6)}% | ${diffStr}`);
        }
    }
    
    // Identify patterns
    console.log(`\n🎯 Key Insights:`);
    console.log('================');
    
    // Find player counts where Baron appears frequently
    const baronFriendlyCounts = playerCounts.filter(pc => {
        const sequential = results.find(r => r.playerCount === pc && r.seedType === 'sequential');
        return sequential && sequential.baronFrequency > 50; // More than 50%
    });
    
    if (baronFriendlyCounts.length > 0) {
        console.log(`✅ Baron-friendly player counts: ${baronFriendlyCounts.join(', ')}`);
    } else {
        console.log(`❌ No player counts show high Baron frequency (>50%)`);
    }
    
    // Find player counts where Baron never appears
    const baronAvoidingCounts = playerCounts.filter(pc => {
        const sequential = results.find(r => r.playerCount === pc && r.seedType === 'sequential');
        return sequential && sequential.baronFrequency === 0;
    });
    
    if (baronAvoidingCounts.length > 0) {
        console.log(`❌ Baron-avoiding player counts: ${baronAvoidingCounts.join(', ')}`);
    }
    
    // Check for seed type effects
    const significantDifferences = results.filter(r => {
        const other = results.find(o => o.playerCount === r.playerCount && o.seedType !== r.seedType);
        return other && Math.abs(r.baronFrequency - other.baronFrequency) > 10; // >10% difference
    });
    
    if (significantDifferences.length > 0) {
        console.log(`📊 Significant seed type differences found in player counts: ${[...new Set(significantDifferences.map(r => r.playerCount))].join(', ')}`);
    } else {
        console.log(`📊 No significant differences between sequential vs random seeds across player counts`);
    }
    
    console.log(`\n💡 Hypotheses to explore:`);
    console.log(`- Does Baron frequency correlate with base outsider count?`);
    console.log(`- Are there "sweet spot" player counts for complex distributions?`);
    console.log(`- How do minion counts affect Baron selection patterns?`);
}

async function analyzePlayerCountWithSeeds(config: {
    playerCount: number,
    seedType: 'sequential' | 'random',
    startSeed?: number,
    endSeed?: number,
    filePath?: string
}) {
    // This is a simplified version that focuses on the key metrics
    // In a real implementation, this would use firstSolutionAnalysis but capture the results
    
    console.log(`Analyzing ${config.playerCount} players with ${config.seedType} seeds...`);
    
    // For now, return mock data - in reality this would run the full analysis
    // and parse the results to extract the key statistics
    const mockResult = {
        playerCount: config.playerCount,
        seedType: config.seedType as 'sequential' | 'random',
        baronFrequency: config.playerCount === 7 ? 85.0 : (config.playerCount === 8 ? 0.0 : Math.random() * 100),
        drunkFrequency: config.playerCount === 7 ? 65.0 : (config.playerCount === 8 ? 45.0 : Math.random() * 100),
        distributionPatterns: new Map([
            ['T=5,O=0,M=1,D=1', config.playerCount === 7 ? 15 : 85],
            ['T=3,O=2,M=1,D=1', config.playerCount === 7 ? 85 : 15]
        ]),
        totalSolutions: 1000
    };
    
    console.log(`  Baron: ${mockResult.baronFrequency.toFixed(1)}%, Drunk: ${mockResult.drunkFrequency.toFixed(1)}%`);
    
    return mockResult;
}

// Note: This is a framework - the actual implementation would need to:
// 1. Integrate with firstSolutionAnalysis to run real tests
// 2. Parse the output to extract statistics  
// 3. Handle the large amount of data efficiently
// 4. Save intermediate results to avoid re-running long analyses

console.log('🚧 Multi-Player Count Analysis Framework');
console.log('This is a template for the comprehensive analysis you requested.');
console.log('To implement fully, we need to:');
console.log('1. Integrate with firstSolutionAnalysis for real data');
console.log('2. Add result parsing and aggregation');
console.log('3. Handle the computational load of 6 × 2 × 1000 = 12,000 solutions');
console.log('');
console.log('Would you like me to implement the full version or start with a subset?');

export { multiPlayerCountAnalysis };