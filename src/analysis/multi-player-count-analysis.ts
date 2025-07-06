// Comprehensive analysis across multiple player counts using both seed sets
import { firstSolutionAnalysis } from './first-solution-analysis';

async function multiPlayerCountAnalysis() {
    console.log('🎯 Multi-Player Count Analysis: Baron and Role Patterns\n');
    console.log('Testing player counts 7, 8, 9, 10, 11, 12 with both seed sets\n');
    
    const playerCounts = [7]; // Start with just 7-player for testing
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
    console.log(`Analyzing ${config.playerCount} players with ${config.seedType} seeds...`);
    
    // Configure the seed analysis based on the requested type
    let seedConfig;
    if (config.seedType === 'sequential' && config.startSeed !== undefined && config.endSeed !== undefined) {
        seedConfig = {
            type: 'sequential' as const,
            startSeed: config.startSeed,
            endSeed: config.endSeed
        };
    } else if (config.seedType === 'random' && config.filePath) {
        seedConfig = {
            type: 'random' as const,
            filePath: config.filePath
        };
    } else {
        throw new Error(`Invalid configuration for ${config.seedType} analysis`);
    }
    
    // Capture console output to parse results
    const originalLog = console.log;
    let capturedOutput: string[] = [];
    console.log = (...args) => {
        capturedOutput.push(args.join(' '));
        originalLog(...args); // Still show the output
    };
    
    try {
        // Run the actual analysis
        await firstSolutionAnalysis(config.playerCount, seedConfig);
        
        // Restore console.log
        console.log = originalLog;
        
        // Parse the captured output to extract statistics
        const stats = parseAnalysisOutput(capturedOutput);
        
        return {
            playerCount: config.playerCount,
            seedType: config.seedType as 'sequential' | 'random',
            baronFrequency: stats.baronFrequency,
            drunkFrequency: stats.drunkFrequency,
            distributionPatterns: stats.distributionPatterns,
            totalSolutions: stats.totalSolutions
        };
        
    } catch (error) {
        // Restore console.log in case of error
        console.log = originalLog;
        throw error;
    }
}

function parseAnalysisOutput(output: string[]): {
    baronFrequency: number,
    drunkFrequency: number,
    distributionPatterns: Map<string, number>,
    totalSolutions: number
} {
    // Find lines with role frequencies
    let baronFrequency = 0;
    let drunkFrequency = 0;
    let totalSolutions = 0;
    const distributionPatterns = new Map<string, number>();
    
    for (const line of output) {
        // Look for role frequency lines like "  baron: 850 / 1000 (85.0%)"
        const baronMatch = line.match(/baron:\s+(\d+)\s+\/\s+(\d+)\s+\((\d+\.?\d*)%\)/);
        if (baronMatch) {
            baronFrequency = parseFloat(baronMatch[3]);
            totalSolutions = parseInt(baronMatch[2]);
        }
        
        const drunkMatch = line.match(/drunk:\s+(\d+)\s+\/\s+(\d+)\s+\((\d+\.?\d*)%\)/);
        if (drunkMatch) {
            drunkFrequency = parseFloat(drunkMatch[3]);
        }
        
        // Look for distribution pattern lines like "  T=5,O=0,M=1,D=1: 150 / 1000 (15.0%)"
        const distributionMatch = line.match(/(T=\d+,O=\d+,M=\d+,D=\d+):\s+(\d+)\s+\/\s+\d+\s+\((\d+\.?\d*)%\)/);
        if (distributionMatch) {
            const pattern = distributionMatch[1];
            const count = parseInt(distributionMatch[2]);
            distributionPatterns.set(pattern, count);
        }
    }
    
    return {
        baronFrequency,
        drunkFrequency,
        distributionPatterns,
        totalSolutions
    };
}

// Main execution
async function main() {
    try {
        await multiPlayerCountAnalysis();
    } catch (error) {
        console.error('❌ Analysis failed:', error);
        process.exit(1);
    }
}

// Run the analysis if this file is executed directly
if (require.main === module) {
    main();
}

export { multiPlayerCountAnalysis };