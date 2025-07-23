/**
 * Deep dive analysis of why medium titles cause wider layouts than long titles
 * by examining the actual squareness scoring algorithm
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
    // This is the same formula from evaluateLayoutSquareness
    const characterAspectRatio = 10 / 6; // 1.67 (character height:width ratio)
    const visualAspectRatio = dimensions.width / (dimensions.height * characterAspectRatio);
    const squarenessScore = Math.abs(visualAspectRatio - 1.0);
    return squarenessScore;
}

function analyzeSquarenessScoring(): void {
    console.log('=== SQUARENESS SCORING ANALYSIS ===\n');
    
    const testTitles = [
        { name: 'Empty', title: '' },
        { name: 'Short', title: '─ X ' },
        { name: 'Medium', title: '─ Grim ' },
        { name: 'Long', title: '─ Grimoire ' },
        { name: 'Full', title: '─ Grimoire (5 players) ' },
        { name: 'VeryLong', title: '─ This is a very long title that should force wide layouts ' }
    ];
    
    const results: Array<{
        name: string;
        title: string;
        dimensions: { width: number; height: number };
        squarenessScore: number;
        visualAspectRatio: number;
    }> = [];
    
    for (const test of testTitles) {
        const options: RenderOptions & { _evaluationTitle?: string } = {
            mode: 'squariness',
            showColumnNumbers: false,
            useAbbreviations: true,
            _evaluationTitle: test.title
        };
        
        const grimoire = { players: testPlayers };
        const rendered = renderGrimoireToAsciiArt(grimoire, options);
        const dimensions = measureRenderedDimensions(rendered);
        const squarenessScore = calculateSquarenessScore(dimensions);
        
        const characterAspectRatio = 10 / 6;
        const visualAspectRatio = dimensions.width / (dimensions.height * characterAspectRatio);
        
        results.push({
            name: test.name,
            title: test.title,
            dimensions,
            squarenessScore,
            visualAspectRatio
        });
        
        console.log(`${test.name.padEnd(12)} | Dimensions: ${dimensions.width.toString().padStart(2)}x${dimensions.height.toString().padStart(2)} | Aspect: ${visualAspectRatio.toFixed(3)} | Score: ${squarenessScore.toFixed(3)}`);
    }
    
    console.log('\n=== ANALYSIS ===');
    
    // Sort by squareness score (lower is better)
    const sortedByScore = [...results].sort((a, b) => a.squarenessScore - b.squarenessScore);
    console.log('\nRanked by squareness (lower score = more square = better):');
    sortedByScore.forEach((result, index) => {
        console.log(`${(index + 1).toString().padStart(2)}. ${result.name.padEnd(12)} | Score: ${result.squarenessScore.toFixed(3)} | ${result.dimensions.width}x${result.dimensions.height}`);
    });
    
    // Let's understand why the squariness mode picks what it picks
    console.log('\n=== WHY AUTO MODE PICKS EACH LAYOUT ===');
    
    // Group by actual layout (same dimensions)
    const layoutGroups = new Map<string, typeof results>();
    for (const result of results) {
        const key = `${result.dimensions.width}x${result.dimensions.height}`;
        if (!layoutGroups.has(key)) {
            layoutGroups.set(key, []);
        }
        layoutGroups.get(key)!.push(result);
    }
    
    for (const [layout, group] of layoutGroups) {
        console.log(`\nLayout ${layout}:`);
        console.log(`  Triggered by: ${group.map(r => r.name).join(', ')}`);
        console.log(`  Squareness score: ${group[0].squarenessScore.toFixed(3)}`);
        console.log(`  Visual aspect ratio: ${group[0].visualAspectRatio.toFixed(3)} (target: 1.000)`);
        
        // Show which aspect of the score makes this "better"
        if (group[0].visualAspectRatio < 1.0) {
            console.log(`  Layout is TOO NARROW (aspect < 1.0)`);
        } else if (group[0].visualAspectRatio > 1.0) {
            console.log(`  Layout is TOO WIDE (aspect > 1.0)`);
        } else {
            console.log(`  Layout is PERFECTLY SQUARE`);
        }
    }
    
    // Key insight: see if the algorithm is picking the layout based on which title 
    // makes the final rendered output closest to square
    console.log('\\n=== KEY INSIGHT ===');
    console.log('Auto mode picks the layout configuration that makes the FINAL RENDERED OUTPUT');
    console.log('(including title and border) closest to a square aspect ratio.');
    console.log('This is why different titles can cause completely different content layouts!')
}

// Export for use in test runner
export { analyzeSquarenessScoring };

// Run if called directly
if (require.main === module) {
    analyzeSquarenessScoring();
}