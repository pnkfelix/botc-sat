// Compare bias patterns: sequential seeds [0,99] vs first 100 random seeds
import { firstSolutionAnalysis } from './first-solution-analysis';
import { promises as fs } from 'fs';

async function compareSeedPatterns() {
    console.log('🔍 Comparing Seed Pattern Effects on Bias\n');
    console.log('Testing hypothesis: Better bit-pattern variation reduces role bias\n');
    
    // Load first 100 random seeds from file
    const seedData = JSON.parse(await fs.readFile('./random-seeds.json', 'utf-8'));
    const first100RandomSeeds = seedData.seeds.slice(0, 100);
    
    console.log('📊 First 10 random seeds:', first100RandomSeeds.slice(0, 10).join(', '));
    console.log('📊 Sequential seeds will be: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9...\n');
    
    // Test 1: Sequential seeds [0,99]
    console.log('1️⃣ Testing Sequential Seeds [0,99]');
    console.log('=' .repeat(50));
    
    const startTime1 = Date.now();
    await firstSolutionAnalysis({
        type: 'sequential',
        startSeed: 0,
        endSeed: 99
    });
    const time1 = (Date.now() - startTime1) / 1000;
    
    console.log(`\n⏱️  Sequential analysis completed in ${time1.toFixed(1)}s\n`);
    console.log('=' .repeat(80) + '\n');
    
    // Test 2: First 100 random seeds
    console.log('2️⃣ Testing First 100 Random Seeds');
    console.log('=' .repeat(50));
    
    const startTime2 = Date.now();
    await firstSolutionAnalysis({
        type: 'array',
        seeds: first100RandomSeeds
    });
    const time2 = (Date.now() - startTime2) / 1000;
    
    console.log(`\n⏱️  Random seed analysis completed in ${time2.toFixed(1)}s\n`);
    
    // Summary comparison
    console.log('🎯 Comparison Summary');
    console.log('=' .repeat(50));
    console.log(`Sequential seeds [0,99]:     ${time1.toFixed(1)}s`);
    console.log(`Random seeds (first 100):    ${time2.toFixed(1)}s`);
    console.log(`Performance difference:       ${Math.abs(time2 - time1).toFixed(1)}s`);
    
    console.log('\n📋 Key Questions to Analyze:');
    console.log('1. Does baron appear more frequently with random seeds?');
    console.log('2. Are "never appear" roles reduced with better bit patterns?');
    console.log('3. Is the coefficient of variation lower with random seeds?');
    console.log('4. Do frequency ranges become tighter with random seeds?');
    
    console.log('\n💡 Interpretation Guide:');
    console.log('- If random seeds show baron appearing more often → bit pattern matters');
    console.log('- If CV is lower with random seeds → better distribution achieved');
    console.log('- If fewer "never appear" roles → improved role coverage');
    console.log('- Look for differences in the "extremes" section of each analysis');
}

compareSeedPatterns().catch(console.error);