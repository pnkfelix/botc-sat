/**
 * Trace the actual auto mode decision process to understand why
 * longer titles cause narrower layouts (counterintuitive)
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

// Let's manually test different layout configurations with the same title
// to see what auto mode is choosing between
function testExplicitLayouts(evaluationTitle: string): void {
    console.log(`\n=== TESTING ALL POSSIBLE LAYOUTS WITH TITLE: "${evaluationTitle}" ===`);
    
    // These are the possible layout configurations for 5 players
    const possibleLayouts = [
        [5, 0, 0, 0], // All on top
        [4, 1, 0, 0], // 4 top, 1 right
        [3, 2, 0, 0], // 3 top, 2 right
        [3, 1, 1, 0], // 3 top, 1 right, 1 bottom
        [3, 1, 0, 1], // 3 top, 1 right, 1 left
        [2, 3, 0, 0], // 2 top, 3 right
        [2, 2, 1, 0], // 2 top, 2 right, 1 bottom
        [2, 2, 0, 1], // 2 top, 2 right, 1 left
        [2, 1, 2, 0], // 2 top, 1 right, 2 bottom
        [2, 1, 1, 1], // 2 top, 1 right, 1 bottom, 1 left
        [2, 1, 0, 2], // 2 top, 1 right, 2 left
        [2, 0, 3, 0], // 2 top, 3 bottom
        [2, 0, 2, 1], // 2 top, 2 bottom, 1 left
        [2, 0, 1, 2], // 2 top, 1 bottom, 2 left
        [2, 0, 0, 3], // 2 top, 3 left
        [1, 4, 0, 0], // 1 top, 4 right
        [1, 3, 1, 0], // 1 top, 3 right, 1 bottom
        [1, 3, 0, 1], // 1 top, 3 right, 1 left
        [1, 2, 2, 0], // 1 top, 2 right, 2 bottom
        [1, 2, 1, 1], // 1 top, 2 right, 1 bottom, 1 left
        [1, 2, 0, 2], // 1 top, 2 right, 2 left
        [1, 1, 3, 0], // 1 top, 1 right, 3 bottom
        [1, 1, 2, 1], // 1 top, 1 right, 2 bottom, 1 left
        [1, 1, 1, 2], // 1 top, 1 right, 1 bottom, 2 left
        [1, 1, 0, 3], // 1 top, 1 right, 3 left
        [1, 0, 4, 0], // 1 top, 4 bottom
        [1, 0, 3, 1], // 1 top, 3 bottom, 1 left
        [1, 0, 2, 2], // 1 top, 2 bottom, 2 left
        [1, 0, 1, 3], // 1 top, 1 bottom, 3 left
        [1, 0, 0, 4], // 1 top, 4 left
    ];
    
    let bestScore = Number.POSITIVE_INFINITY;
    let bestLayout: number[] = [];
    let bestDimensions = { width: 0, height: 0 };
    
    console.log('Testing all possible layouts...');
    
    for (const layout of possibleLayouts) {
        const [top, right, bottom, left] = layout;
        
        try {
            const options: RenderOptions & { _evaluationTitle?: string } = {
                mode: 'explicit-turns',
                explicitTurns: layout as [number, number, number, number],
                showColumnNumbers: false,
                useAbbreviations: true,
                _evaluationTitle: evaluationTitle
            };
            
            const grimoire = { players: testPlayers };
            const rendered = renderGrimoireToAsciiArt(grimoire, options);
            const dimensions = measureRenderedDimensions(rendered);
            const score = calculateSquarenessScore(dimensions);
            
            console.log(`  Layout [${top},${right},${bottom},${left}]: ${dimensions.width}x${dimensions.height} score=${score.toFixed(3)}`);
            
            if (score < bestScore) {
                bestScore = score;
                bestLayout = layout;
                bestDimensions = dimensions;
            }
        } catch (error) {
            console.log(`  Layout [${top},${right},${bottom},${left}]: FAILED`);
        }
    }
    
    console.log(`\\nBEST LAYOUT: [${bestLayout.join(',')}] → ${bestDimensions.width}x${bestDimensions.height} (score: ${bestScore.toFixed(3)})`);
    
    // Now let's see what auto mode actually picks
    const autoOptions: RenderOptions & { _evaluationTitle?: string } = {
        mode: 'auto',
        showColumnNumbers: false,
        useAbbreviations: true,
        _evaluationTitle: evaluationTitle
    };
    
    const autoResult = renderGrimoireToAsciiArt({ players: testPlayers }, autoOptions);
    const autoDimensions = measureRenderedDimensions(autoResult);
    const autoScore = calculateSquarenessScore(autoDimensions);
    
    console.log(`AUTO MODE PICKED: ${autoDimensions.width}x${autoDimensions.height} (score: ${autoScore.toFixed(3)})`);
    
    if (autoDimensions.width === bestDimensions.width && autoDimensions.height === bestDimensions.height) {
        console.log('✅ Auto mode picked the optimal layout');
    } else {
        console.log('❌ Auto mode did NOT pick the optimal layout!');
    }
}

function traceAutoModeDecisions(): void {
    console.log('=== TRACING AUTO MODE DECISIONS ===');
    
    const testCases = [
        { name: 'Medium', title: '─ Grim ' },
        { name: 'VeryLong', title: '─ This is a very long title that should force wide layouts ' }
    ];
    
    for (const test of testCases) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`CASE: ${test.name} title`);
        testExplicitLayouts(test.title);
    }
}

// Export for use in test runner
export { traceAutoModeDecisions };

// Run if called directly
if (require.main === module) {
    traceAutoModeDecisions();
}