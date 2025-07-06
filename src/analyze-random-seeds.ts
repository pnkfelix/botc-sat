// Analyze bias using the 1000 random seeds from file
import { firstSolutionAnalysis } from './first-solution-analysis';

async function analyzeRandomSeeds() {
    console.log('🎲 Running Random Seed Analysis (1000 seeds from file)\n');
    
    await firstSolutionAnalysis(8, {
        type: 'random',
        filePath: '../random-seeds.json'
    });
}

analyzeRandomSeeds().catch(console.error);