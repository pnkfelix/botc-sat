// Test to analyze bias in BOTC bag generation
import { BagLegalityValidator } from '../core/bag-compiler';
import { troubleBrewing } from '../core/scripts';

export async function testBOTCBias(): Promise<void> {
    console.log("=== Testing BOTC Bag Generation Bias ===");
    
    const validator = new BagLegalityValidator();
    
    // Test 1: Generate multiple 8-player bags and analyze role frequency
    console.log("\n--- Test 1: Role frequency analysis (8 players, no constraints) ---");
    
    const sampleSize = 10;  // Start with smaller sample for development
    const result = await validator.generateMultipleLegalBags(troubleBrewing, 8, {
        maxSolutions: sampleSize
    });
    
    if (!result.success || result.solutions.length === 0) {
        console.log("❌ Failed to generate solutions");
        return;
    }
    
    console.log(`Generated ${result.solutions.length} solutions`);
    
    // Analyze role frequency
    const roleFrequency = new Map<string, number>();
    const roleTypeFrequency = new Map<string, number>();
    
    for (const solution of result.solutions) {
        for (const roleId of solution.selectedRoles) {
            roleFrequency.set(roleId, (roleFrequency.get(roleId) || 0) + 1);
        }
        
        // Analyze by role type
        for (const [type, count] of Object.entries(solution.inPlayDistribution)) {
            roleTypeFrequency.set(type, (roleTypeFrequency.get(type) || 0) + count);
        }
    }
    
    console.log("\n--- Role Frequency Analysis ---");
    console.log("Role appearances across all solutions:");
    
    // Sort by frequency to see patterns
    const sortedRoles = Array.from(roleFrequency.entries())
        .sort((a, b) => b[1] - a[1]);
    
    for (const [roleId, count] of sortedRoles) {
        const percentage = ((count / result.solutions.length) * 100).toFixed(1);
        console.log(`  ${roleId}: ${count}/${result.solutions.length} (${percentage}%)`);
    }
    
    console.log("\n--- Role Type Distribution ---");
    for (const [type, totalCount] of roleTypeFrequency.entries()) {
        const avgPerSolution = (totalCount / result.solutions.length).toFixed(1);
        console.log(`  ${type}: avg ${avgPerSolution} per solution`);
    }
    
    // Test 2: Check for systematic bias patterns
    console.log("\n--- Test 2: Systematic bias detection ---");
    
    // Look for roles that always appear together
    const pairFrequency = new Map<string, number>();
    for (const solution of result.solutions) {
        const roles = solution.selectedRoles.sort();
        for (let i = 0; i < roles.length; i++) {
            for (let j = i + 1; j < roles.length; j++) {
                const pair = `${roles[i]}+${roles[j]}`;
                pairFrequency.set(pair, (pairFrequency.get(pair) || 0) + 1);
            }
        }
    }
    
    // Find pairs that appear suspiciously often
    console.log("Most common role pairs:");
    const sortedPairs = Array.from(pairFrequency.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);  // Top 10
    
    for (const [pair, count] of sortedPairs) {
        const percentage = ((count / result.solutions.length) * 100).toFixed(1);
        console.log(`  ${pair}: ${count}/${result.solutions.length} (${percentage}%)`);
    }
    
    // Test 3: Diversity analysis
    console.log("\n--- Test 3: Solution diversity analysis ---");
    
    const uniqueSetups = new Set<string>();
    for (const solution of result.solutions) {
        const signature = solution.selectedRoles.sort().join(',');
        uniqueSetups.add(signature);
    }
    
    console.log(`Unique role combinations: ${uniqueSetups.size}/${result.solutions.length}`);
    if (uniqueSetups.size < result.solutions.length) {
        console.log("⚠️  Found duplicate solutions - blocking clauses may not be working correctly");
    }
    
    // Show all solutions for manual inspection
    console.log("\n--- All Generated Solutions ---");
    result.solutions.forEach((solution, idx) => {
        console.log(`${idx + 1}: [${solution.selectedRoles.join(', ')}]`);
        console.log(`    Distribution: ${JSON.stringify(solution.inPlayDistribution)}`);
    });
    
    console.log("\n=== BOTC Bias Analysis Complete ===");
}

export async function testConstrainedBias(): Promise<void> {
    console.log("\n=== Testing Bias with Constraints ===");
    
    const validator = new BagLegalityValidator();
    
    // Test with constraints to see how it affects bias
    console.log("\n--- Generating with 'drunk' constraint ---");
    
    const result = await validator.generateMultipleLegalBags(troubleBrewing, 7, {
        mustInclude: ['drunk'],
        maxSolutions: 5
    });
    
    if (result.success && result.solutions.length > 0) {
        console.log(`Generated ${result.solutions.length} solutions with drunk:`);
        result.solutions.forEach((solution, idx) => {
            const baronIncluded = solution.selectedRoles.includes('baron');
            console.log(`${idx + 1}: [${solution.selectedRoles.join(', ')}] (Baron: ${baronIncluded ? 'YES' : 'NO'})`);
        });
        
        // Check if Baron is always included (it should be for 7 players + drunk)
        const baronCount = result.solutions.filter(s => s.selectedRoles.includes('baron')).length;
        console.log(`Baron included in ${baronCount}/${result.solutions.length} solutions`);
        if (baronCount === result.solutions.length) {
            console.log("✅ Constraint inference working correctly");
        } else {
            console.log("⚠️  Unexpected: Baron not always included with drunk at 7 players");
        }
    }
}