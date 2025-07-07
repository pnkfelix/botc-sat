// Demonstration of the generalized seed analysis system
import { firstSolutionAnalysis } from './first-solution-analysis';

async function demonstrateSeedConfigurations() {
    console.log('🎯 Demonstrating Flexible Seed Configuration System\n');
    
    // Test 1: Sequential seeds (original behavior)
    console.log('1️⃣ Testing sequential seeds (0-99 for quick demo)...\n');
    try {
        await firstSolutionAnalysis(8, {
            type: 'sequential',
            startSeed: 0,
            endSeed: 99
        });
    } catch (error) {
        console.error('❌ Sequential test failed:', error);
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
    
    // Test 2: Random seeds from file (first 100 for quick demo)
    console.log('2️⃣ Testing random seeds from file (first 100 for quick demo)...\n');
    try {
        // Load the first 100 random seeds from our generated file
        const fs = require('fs').promises;
        const seedData = JSON.parse(await fs.readFile('../data/random-seeds.json', 'utf-8'));
        const first100RandomSeeds = seedData.seeds.slice(0, 100);
        
        await firstSolutionAnalysis(8, {
            type: 'array',
            seeds: first100RandomSeeds
        });
    } catch (error) {
        console.error('❌ Random seeds test failed:', error);
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
    
    // Test 3: Custom seed array
    console.log('3️⃣ Testing custom seed array (hand-picked seeds)...\n');
    try {
        await firstSolutionAnalysis(8, {
            type: 'array',
            seeds: [42, 123, 456, 789, 1000, 2000, 3000, 4000, 5000, 9999]
        });
    } catch (error) {
        console.error('❌ Custom seeds test failed:', error);
    }
    
    console.log('\n🎉 Seed configuration demonstration complete!\n');
    
    // Show usage patterns
    console.log('📋 Usage Patterns:');
    console.log('==================');
    console.log('// Sequential seeds:');
    console.log('await firstSolutionAnalysis({ type: "sequential", startSeed: 0, endSeed: 999 });');
    console.log('');
    console.log('// Random seeds from file:');
    console.log('await firstSolutionAnalysis({ type: "random", filePath: "../random-seeds.json" });');
    console.log('');
    console.log('// Custom seed array:');
    console.log('await firstSolutionAnalysis({ type: "array", seeds: [1, 2, 3, 4, 5] });');
}

// Run the demonstration
demonstrateSeedConfigurations().catch(console.error);