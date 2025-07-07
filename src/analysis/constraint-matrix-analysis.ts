// Systematic constraint-based analysis of solution space
// Tests Baron frequency across all role pair constraints and player counts

import { BagLegalityValidator } from '../core/bag-compiler';
import { troubleBrewing } from '../core/scripts';
import { registerTroubleBrewing } from '../data/trouble-brewing-roles';
import { promises as fs } from 'fs';

interface ConstraintScenario {
    playerCount: number;
    roleA: string;
    roleB: string;
    mustInclude: string;
    mustExclude: string;
    scenarioId: string;
}

interface TrialResult {
    scenario: ConstraintScenario;
    solution: string[] | null;
    baronPresent: boolean;
    success: boolean;
    error?: string;
}

async function constraintMatrixAnalysis() {
    console.log('🎯 Systematic Constraint-Based Solution Space Analysis');
    console.log('=====================================================\n');
    
    // CRITICAL: Register roles first!
    registerTroubleBrewing();
    console.log('✅ Registered Trouble Brewing roles\n');
    
    const script = troubleBrewing;
    const playerCounts = [7, 8, 9, 10, 11, 12];
    
    // All non-imp roles from Trouble Brewing
    const roles = [
        // Townsfolk (13)
        'washerwoman', 'librarian', 'investigator', 'chef', 'empath', 
        'fortune_teller', 'undertaker', 'monk', 'ravenkeeper', 'virgin', 
        'slayer', 'soldier', 'mayor',
        // Outsiders (4)  
        'butler', 'drunk', 'recluse', 'saint',
        // Minions (4)
        'poisoner', 'spy', 'scarlet_woman', 'baron'
    ];
    
    console.log(`📊 Analysis Parameters:`);
    console.log(`  Player counts: ${playerCounts.join(', ')}`);
    console.log(`  Roles analyzed: ${roles.length} (excluding imp)`);
    console.log(`  Role pairs: ${roles.length * (roles.length - 1) / 2}`);
    console.log(`  Scenarios per pair: 2 (A+/B- and A-/B+)`);
    console.log(`  Total trials: ${playerCounts.length} × ${roles.length * (roles.length - 1) / 2} × 2 = ${playerCounts.length * roles.length * (roles.length - 1)}`);
    console.log('');
    
    // Generate all role pairs
    const rolePairs: [string, string][] = [];
    for (let i = 0; i < roles.length; i++) {
        for (let j = i + 1; j < roles.length; j++) {
            rolePairs.push([roles[i], roles[j]]);
        }
    }
    
    console.log(`🔢 Generated ${rolePairs.length} role pairs`);
    console.log(`📋 Example pairs: ${rolePairs.slice(0, 3).map(p => `(${p[0]}, ${p[1]})`).join(', ')}...\n`);
    
    // Generate all constraint scenarios
    const scenarios: ConstraintScenario[] = [];
    for (const playerCount of playerCounts) {
        for (const [roleA, roleB] of rolePairs) {
            // Scenario 1: Include A, Exclude B
            scenarios.push({
                playerCount,
                roleA,
                roleB, 
                mustInclude: roleA,
                mustExclude: roleB,
                scenarioId: `P${playerCount}_${roleA}+${roleB}-`
            });
            
            // Scenario 2: Exclude A, Include B  
            scenarios.push({
                playerCount,
                roleA,
                roleB,
                mustInclude: roleB,
                mustExclude: roleA,
                scenarioId: `P${playerCount}_${roleA}-${roleB}+`
            });
        }
    }
    
    console.log(`🎲 Generated ${scenarios.length} constraint scenarios\n`);
    
    // Run all trials
    const results: TrialResult[] = [];
    const startTime = Date.now();
    
    for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i];
        
        if (i % 100 === 0) {
            const elapsed = (Date.now() - startTime) / 1000;
            const rate = i > 0 ? i / elapsed : 0;
            const remaining = i > 0 ? (scenarios.length - i) / rate : 0;
            console.log(`Progress: ${i}/${scenarios.length} (${(100 * i / scenarios.length).toFixed(1)}%) - ${elapsed.toFixed(1)}s elapsed, ~${remaining.toFixed(1)}s remaining`);
        }
        
        const result = await runConstraintTrial(script, scenario);
        results.push(result);
    }
    
    const totalTime = (Date.now() - startTime) / 1000;
    console.log(`\n⏱️  Analysis completed in ${totalTime.toFixed(1)}s (${(totalTime / scenarios.length * 1000).toFixed(1)}ms per trial)\n`);
    
    // Analyze results
    await analyzeConstraintResults(results);
    
    // Save detailed results
    await saveDetailedResults(results);
    
    console.log('\n🎉 Constraint matrix analysis complete!');
}

async function runConstraintTrial(script: any, scenario: ConstraintScenario): Promise<TrialResult> {
    try {
        const validator = new BagLegalityValidator();
        
        const generated = await validator.generateMultipleLegalBags(script, scenario.playerCount, {
            mustInclude: [scenario.mustInclude],
            mustExclude: [scenario.mustExclude],
            maxSolutions: 1,
            useVariableIndirection: true
        });
        
        if (!generated.success || generated.solutions.length === 0) {
            return {
                scenario,
                solution: null,
                baronPresent: false,
                success: false,
                error: 'No solution found'
            };
        }
        
        const solution = generated.solutions[0].selectedRoles;
        const baronPresent = solution.includes('baron');
        
        return {
            scenario,
            solution,
            baronPresent,
            success: true
        };
        
    } catch (error) {
        return {
            scenario,
            solution: null,
            baronPresent: false,
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

async function analyzeConstraintResults(results: TrialResult[]) {
    console.log('📊 CONSTRAINT MATRIX ANALYSIS RESULTS');
    console.log('=====================================\n');
    
    const successfulResults = results.filter(r => r.success);
    const failedResults = results.filter(r => !r.success);
    
    console.log(`✅ Successful trials: ${successfulResults.length}/${results.length} (${(100 * successfulResults.length / results.length).toFixed(1)}%)`);
    console.log(`❌ Failed trials: ${failedResults.length}/${results.length} (${(100 * failedResults.length / results.length).toFixed(1)}%)\n`);
    
    if (failedResults.length > 0) {
        console.log('❌ Failed Scenarios Summary:');
        const failuresByReason = new Map<string, number>();
        failedResults.forEach(r => {
            const reason = r.error || 'Unknown error';
            failuresByReason.set(reason, (failuresByReason.get(reason) || 0) + 1);
        });
        
        for (const [reason, count] of failuresByReason.entries()) {
            console.log(`  ${reason}: ${count} trials`);
        }
        console.log('');
    }
    
    // Baron frequency analysis by player count
    console.log('🏰 Baron Frequency by Player Count:');
    console.log('==================================');
    
    const playerCounts = [7, 8, 9, 10, 11, 12];
    for (const playerCount of playerCounts) {
        const playerResults = successfulResults.filter(r => r.scenario.playerCount === playerCount);
        const baronCount = playerResults.filter(r => r.baronPresent).length;
        const percentage = playerResults.length > 0 ? (100 * baronCount / playerResults.length) : 0;
        
        console.log(`  ${playerCount} players: ${baronCount}/${playerResults.length} (${percentage.toFixed(1)}%)`);
    }
    console.log('');
    
    // Most Baron-friendly constraints
    console.log('👑 Most Baron-Friendly Constraint Patterns:');
    console.log('==========================================');
    
    const baronResults = successfulResults.filter(r => r.baronPresent);
    const constraintPatterns = new Map<string, number>();
    
    baronResults.forEach(r => {
        const pattern = `${r.scenario.mustInclude}+/${r.scenario.mustExclude}-`;
        constraintPatterns.set(pattern, (constraintPatterns.get(pattern) || 0) + 1);
    });
    
    const sortedPatterns = Array.from(constraintPatterns.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    sortedPatterns.forEach(([pattern, count]) => {
        console.log(`  ${pattern}: ${count} times`);
    });
    console.log('');
    
    // Baron-excluding role interactions
    console.log('🚫 Roles That Most Often Exclude Baron:');
    console.log('======================================');
    
    const excludePatterns = new Map<string, { total: number, baronExcluded: number }>();
    
    successfulResults.forEach(r => {
        const excludedRole = r.scenario.mustExclude;
        if (!excludePatterns.has(excludedRole)) {
            excludePatterns.set(excludedRole, { total: 0, baronExcluded: 0 });
        }
        const stats = excludePatterns.get(excludedRole)!;
        stats.total++;
        if (!r.baronPresent) {
            stats.baronExcluded++;
        }
    });
    
    const sortedExclusions = Array.from(excludePatterns.entries())
        .map(([role, stats]) => ({
            role,
            exclusionRate: stats.total > 0 ? stats.baronExcluded / stats.total : 0,
            count: stats.total
        }))
        .sort((a, b) => b.exclusionRate - a.exclusionRate)
        .slice(0, 10);
    
    sortedExclusions.forEach(item => {
        console.log(`  ${item.role}: ${(100 * item.exclusionRate).toFixed(1)}% (${item.count} trials)`);
    });
    console.log('');
    
    // Overall Baron frequency
    const totalBaronPresent = successfulResults.filter(r => r.baronPresent).length;
    const overallPercentage = successfulResults.length > 0 ? (100 * totalBaronPresent / successfulResults.length) : 0;
    
    console.log(`🎯 Overall Baron Frequency: ${totalBaronPresent}/${successfulResults.length} (${overallPercentage.toFixed(1)}%)`);
    console.log(`📊 This represents Baron's frequency across ${successfulResults.length} diverse constraint scenarios`);
    
    // Calculate Coefficient of Variation for role frequencies
    console.log('\n📊 Coefficient of Variation Analysis:');
    console.log('===================================');
    
    const roleFrequencies = new Map<string, number>();
    
    // Count all role appearances across successful solutions
    successfulResults.forEach(r => {
        if (r.solution) {
            r.solution.forEach(roleId => {
                roleFrequencies.set(roleId, (roleFrequencies.get(roleId) || 0) + 1);
            });
        }
    });
    
    // Calculate statistics
    const frequencies = Array.from(roleFrequencies.values());
    const totalRoles = roleFrequencies.size;
    const mean = frequencies.reduce((a, b) => a + b, 0) / frequencies.length;
    const variance = frequencies.reduce((sum, freq) => sum + Math.pow(freq - mean, 2), 0) / frequencies.length;
    const stdDev = Math.sqrt(variance);
    const cv = (stdDev / mean) * 100;
    
    console.log(`Total unique roles analyzed: ${totalRoles}`);
    console.log(`Mean role frequency: ${mean.toFixed(1)} appearances`);
    console.log(`Standard deviation: ${stdDev.toFixed(1)}`);
    console.log(`Coefficient of Variation: ${cv.toFixed(1)}%`);
    
    // Show frequency distribution
    console.log('\n📈 Role Frequency Distribution:');
    const sortedFreqs = Array.from(roleFrequencies.entries()).sort((a, b) => b[1] - a[1]);
    sortedFreqs.slice(0, 5).forEach(([role, freq]) => {
        const percentage = (100 * freq / successfulResults.length).toFixed(1);
        console.log(`  ${role}: ${freq} (${percentage}%)`);
    });
    console.log('  ...');
    sortedFreqs.slice(-5).forEach(([role, freq]) => {
        const percentage = (100 * freq / successfulResults.length).toFixed(1);
        console.log(`  ${role}: ${freq} (${percentage}%)`);
    });
    
    // Compare to previous bias analysis results
    console.log('\n🔍 Bias Comparison:');
    console.log('===================');
    console.log('Sequential seeds (permutation-only): 47.3% CV');
    console.log('Random seeds (permutation-only): 40.4% CV');
    console.log(`Constraint approach (combined): ${cv.toFixed(1)}% CV`);
    
    if (cv < 40.4) {
        console.log('✅ Constraint approach shows LOWER bias than permutation-only!');
    } else if (cv < 47.3) {
        console.log('✅ Constraint approach shows BETTER bias than sequential baseline!');
    } else {
        console.log('⚠️  Constraint approach shows similar or higher bias');
    }
}

async function saveDetailedResults(results: TrialResult[]) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `constraint-analysis-${timestamp}.json`;
    
    const data = {
        metadata: {
            timestamp: new Date().toISOString(),
            totalTrials: results.length,
            successfulTrials: results.filter(r => r.success).length,
            analysis: 'Systematic constraint-based solution space exploration'
        },
        results: results.map(r => ({
            scenarioId: r.scenario.scenarioId,
            playerCount: r.scenario.playerCount,
            mustInclude: r.scenario.mustInclude,
            mustExclude: r.scenario.mustExclude,
            solution: r.solution,
            baronPresent: r.baronPresent,
            success: r.success,
            error: r.error
        }))
    };
    
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
    console.log(`\n💾 Detailed results saved to: ${filename}`);
}

// Main execution
async function main() {
    try {
        await constraintMatrixAnalysis();
    } catch (error) {
        console.error('❌ Analysis failed:', error);
        process.exit(1);
    }
}

// Run the analysis if this file is executed directly
if (require.main === module) {
    main();
}

export { constraintMatrixAnalysis };