/**
 * Test how specific layouts score across different titles to understand
 * the global perspective on layout selection
 */

import { renderGrimoireToAsciiArt } from '../rendering/ascii-grimoire';
import { RenderOptions } from '../rendering/types';
import { PlayerState } from '../core/grimoire';

function createPlayer(name: string, role: string, position: number): PlayerState {
    return {
        name,
        role,
        position,
        tokens: [],
        alive: true,
        ghost: false
    };
}

const testPlayers = [
    createPlayer('Alice', 'imp', 0),
    createPlayer('Bob', 'investigator', 1),
    createPlayer('Charlie', 'poisoner', 2),
    createPlayer('Dave', 'washerwoman', 3),
    createPlayer('Eve', 'librarian', 4)
];

function measureRenderedDimensions(rendered: string): { width: number; height: number } {
    const lines = rendered.split('\n');
    const height = lines.length;
    const width = Math.max(...lines.map(line => line.length));
    return { width, height };
}

function calculateSquarenessScore(dimensions: { width: number; height: number }): number {
    const characterAspectRatio = 10 / 6; // 1.67
    const visualAspectRatio = dimensions.width / (dimensions.height * characterAspectRatio);
    const squarenessScore = Math.abs(visualAspectRatio - 1.0);
    return squarenessScore;
}

function testLayoutWithTitle(layout: [number, number, number, number], title: string): {
    dimensions: { width: number; height: number };
    score: number;
    aspectRatio: number;
} {
    // Simulate the evaluation conditions exactly like auto mode does
    const options: RenderOptions & { _isEvaluation?: boolean; _evaluationTitle?: string } = {
        mode: 'explicit-turns',
        explicitTurns: layout,
        showColumnNumbers: false,
        useAbbreviations: true,
        _isEvaluation: true,          // This makes it use evaluation title logic
        _evaluationTitle: title       // This sets the title to use during evaluation
    };
    
    const grimoire = { players: testPlayers };
    const rendered = renderGrimoireToAsciiArt(grimoire, options);
    const dimensions = measureRenderedDimensions(rendered);
    const score = calculateSquarenessScore(dimensions);
    
    const characterAspectRatio = 10 / 6;
    const aspectRatio = dimensions.width / (dimensions.height * characterAspectRatio);
    
    return { dimensions, score, aspectRatio };
}

function crossTitleLayoutAnalysis(): void {
    console.log('=== CROSS-TITLE LAYOUT SCORING ANALYSIS ===\n');
    
    // The key layouts we want to understand
    const keyLayouts = [
        { name: 'MediumWinner', layout: [1, 3, 1, 0] as [number, number, number, number], description: 'Winner for Medium title' },
        { name: 'VeryLongWinner', layout: [1, 0, 1, 3] as [number, number, number, number], description: 'Winner for VeryLong title' }
    ];
    
    const testTitles = [
        { name: 'Medium', title: '─ Grim ' },
        { name: 'VeryLong', title: '─ This is a very long title that should force wide layouts ' }
    ];
    
    console.log('Testing how each winning layout performs across different titles:\n');
    
    for (const layoutInfo of keyLayouts) {
        console.log(`${layoutInfo.name} Layout [${layoutInfo.layout.join(',')}] - ${layoutInfo.description}:`);
        
        const results: Array<{
            titleName: string;
            title: string;
            dimensions: { width: number; height: number };
            score: number;
            aspectRatio: number;
        }> = [];
        
        for (const titleInfo of testTitles) {
            const result = testLayoutWithTitle(layoutInfo.layout, titleInfo.title);
            results.push({
                titleName: titleInfo.name,
                title: titleInfo.title,
                ...result
            });
            
            console.log(`  With ${titleInfo.name.padEnd(8)} title: ${result.dimensions.width}x${result.dimensions.height} | aspect: ${result.aspectRatio.toFixed(3)} | score: ${result.score.toFixed(3)}`);
        }
        
        // Show the score difference
        const mediumResult = results.find(r => r.titleName === 'Medium')!;
        const veryLongResult = results.find(r => r.titleName === 'VeryLong')!;
        const scoreDifference = Math.abs(mediumResult.score - veryLongResult.score);
        const betterWith = mediumResult.score < veryLongResult.score ? 'Medium' : 'VeryLong';
        
        console.log(`  Score difference: ${scoreDifference.toFixed(3)} (better with ${betterWith} title)`);
        console.log('');
    }
    
    // Now let's create a comprehensive comparison table
    console.log('=== COMPREHENSIVE COMPARISON TABLE ===');
    console.log('Layout                 | Medium Title Score | VeryLong Title Score | Winner For');
    console.log('-'.repeat(80));
    
    for (const layoutInfo of keyLayouts) {
        const mediumResult = testLayoutWithTitle(layoutInfo.layout, '─ Grim ');
        const veryLongResult = testLayoutWithTitle(layoutInfo.layout, '─ This is a very long title that should force wide layouts ');
        
        const mediumWinner = layoutInfo.name === 'MediumWinner' ? ' ← Medium' : '';
        const veryLongWinner = layoutInfo.name === 'VeryLongWinner' ? ' ← VeryLong' : '';
        
        console.log(`[${layoutInfo.layout.join(',')}] ${layoutInfo.name.padEnd(12)} | ${mediumResult.score.toFixed(3).padStart(18)} | ${veryLongResult.score.toFixed(3).padStart(19)} | ${mediumWinner}${veryLongWinner}`);
    }
    
    console.log('\\n=== KEY INSIGHTS ===');
    
    const mediumWinnerWithMedium = testLayoutWithTitle([1, 3, 1, 0], '─ Grim ');
    const mediumWinnerWithVeryLong = testLayoutWithTitle([1, 3, 1, 0], '─ This is a very long title that should force wide layouts ');
    const veryLongWinnerWithMedium = testLayoutWithTitle([1, 0, 1, 3], '─ Grim ');
    const veryLongWinnerWithVeryLong = testLayoutWithTitle([1, 0, 1, 3], '─ This is a very long title that should force wide layouts ');
    
    console.log(`1. Layout [1,3,1,0] goes from BEST (${mediumWinnerWithMedium.score.toFixed(3)}) to POOR (${mediumWinnerWithVeryLong.score.toFixed(3)}) when title changes`);
    console.log(`2. Layout [1,0,1,3] goes from POOR (${veryLongWinnerWithMedium.score.toFixed(3)}) to BEST (${veryLongWinnerWithVeryLong.score.toFixed(3)}) when title changes`);
    console.log(`3. Score change magnitude: ${Math.abs(mediumWinnerWithMedium.score - mediumWinnerWithVeryLong.score).toFixed(3)} for [1,3,1,0]`);
    console.log(`4. Score change magnitude: ${Math.abs(veryLongWinnerWithMedium.score - veryLongWinnerWithVeryLong.score).toFixed(3)} for [1,0,1,3]`);
    
    console.log('\\nThis proves that title length is directly affecting content layout scoring!');
}

// Export for use in test runner
export { crossTitleLayoutAnalysis };

// Run if called directly
if (require.main === module) {
    crossTitleLayoutAnalysis();
}