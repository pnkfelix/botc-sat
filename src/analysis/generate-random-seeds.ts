// Generate 1000 random seeds for deterministic testing
// This creates a file with seeds that can be reused across different analyses

import { promises as fs } from 'fs';
import { join } from 'path';

async function generateRandomSeeds() {
    console.log('Generating 1000 random seeds...');
    
    const seedCount = 1000;
    const seeds: number[] = [];
    
    // Generate random seeds using Math.random()
    // Scale to reasonable range for our LCG (0 to 2^31-1)
    const maxSeed = Math.pow(2, 31) - 1;
    
    for (let i = 0; i < seedCount; i++) {
        const randomSeed = Math.floor(Math.random() * maxSeed);
        seeds.push(randomSeed);
    }
    
    // Convert to JSON format for easy parsing
    const seedData = {
        description: "1000 random seeds for deterministic BOTC bias analysis",
        generatedAt: new Date().toISOString(),
        seedCount: seedCount,
        maxValue: maxSeed,
        seeds: seeds
    };
    
    const outputPath = join(__dirname, '../data/random-seeds.json');
    
    try {
        await fs.writeFile(outputPath, JSON.stringify(seedData, null, 2));
        console.log(`✅ Successfully generated ${seedCount} random seeds`);
        console.log(`📁 Saved to: ${outputPath}`);
        
        // Show some statistics
        const min = Math.min(...seeds);
        const max = Math.max(...seeds);
        const avg = seeds.reduce((sum, seed) => sum + seed, 0) / seeds.length;
        
        console.log(`📊 Seed statistics:`);
        console.log(`   Min: ${min}`);
        console.log(`   Max: ${max}`);
        console.log(`   Average: ${avg.toFixed(0)}`);
        console.log(`   Range: ${max - min}`);
        
        // Show first few seeds as preview
        console.log(`🔍 First 10 seeds: ${seeds.slice(0, 10).join(', ')}`);
        
    } catch (error) {
        console.error('❌ Failed to write seeds file:', error);
    }
}

// Run the seed generation
generateRandomSeeds().catch(console.error);