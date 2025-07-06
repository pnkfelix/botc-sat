// Analyze bias using sequential seeds 0-999 (original approach)
import { firstSolutionAnalysis } from './first-solution-analysis';

async function analyzeSequentialSeeds() {
    console.log('🔢 Running Sequential Seed Analysis (0-999)\n');
    
    await firstSolutionAnalysis({
        type: 'sequential',
        startSeed: 0,
        endSeed: 999
    });
}

analyzeSequentialSeeds().catch(console.error);