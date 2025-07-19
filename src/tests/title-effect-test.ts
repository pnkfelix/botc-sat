/**
 * Test cases to explore how evaluation title affects auto mode layout selection
 */

import { renderGrimoireToAsciiArt } from '../rendering/ascii-grimoire';
import { RenderOptions } from '../rendering/types';
import { PlayerState } from '../core/grimoire';

/**
 * Create a default player with standard initial state
 */
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

// Test data: same 5 players, different titles during evaluation
const testPlayers = [
    createPlayer('Alice', 'imp', 0),
    createPlayer('Bob', 'investigator', 1),
    createPlayer('Charlie', 'poisoner', 2),
    createPlayer('Dave', 'washerwoman', 3),
    createPlayer('Eve', 'librarian', 4)
];

interface TestResult {
    title: string;
    layout: string;
    dimensions: { width: number; height: number };
    playerCoordinates: Array<{ name: string; row: number; col: number }>;
}

function measureRenderedDimensions(rendered: string): { width: number; height: number } {
    const lines = rendered.split('\n');
    const height = lines.length;
    const width = Math.max(...lines.map(line => line.length));
    return { width, height };
}

function extractPlayerCoordinates(rendered: string): Array<{ name: string; row: number; col: number }> {
    const lines = rendered.split('\n');
    const coordinates: Array<{ name: string; row: number; col: number }> = [];
    
    // Look for player names (assuming they're capitalized words)
    const playerNames = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'];
    
    for (let row = 0; row < lines.length; row++) {
        const line = lines[row];
        for (const name of playerNames) {
            const col = line.indexOf(name);
            if (col !== -1) {
                coordinates.push({ name, row, col });
            }
        }
    }
    
    return coordinates.sort((a, b) => a.name.localeCompare(b.name));
}

function testAutoModeWithTitle(evaluationTitle: string): TestResult {
    // Create custom options that force the evaluation title
    const options: RenderOptions & { _evaluationTitle?: string } = {
        mode: 'auto',
        showColumnNumbers: false,
        useAbbreviations: true,
        _evaluationTitle: evaluationTitle
    };
    
    const grimoire = { players: testPlayers };
    const rendered = renderGrimoireToAsciiArt(grimoire, options);
    
    return {
        title: evaluationTitle,
        layout: rendered,
        dimensions: measureRenderedDimensions(rendered),
        playerCoordinates: extractPlayerCoordinates(rendered)
    };
}

function runTitleEffectTests(): void {
    console.log('=== TITLE EFFECT ON AUTO MODE LAYOUT SELECTION ===\n');
    
    const testTitles = [
        '',                                    // Empty title
        '─ X ',                               // Very short title
        '─ Grim ',                           // Short title
        '─ Grimoire ',                       // Medium title
        '─ Grimoire (5 players) ',           // Original full title
        '─ This is a very long title that should force wide layouts ',  // Very long title
    ];
    
    const results: TestResult[] = [];
    
    for (const title of testTitles) {
        console.log(`Testing with evaluation title: "${title}"`);
        const result = testAutoModeWithTitle(title);
        results.push(result);
        
        console.log(`  Dimensions: ${result.dimensions.width} x ${result.dimensions.height}`);
        console.log(`  Player coordinates:`);
        for (const coord of result.playerCoordinates) {
            console.log(`    ${coord.name}: (row ${coord.row}, col ${coord.col})`);
        }
        console.log(`  Layout preview (showing width differences):`);
        const allLines = result.layout.split('\n');
        // Show first few lines and a sampling of middle lines to reveal layout differences
        const previewLines = [
            ...allLines.slice(0, 2),  // Title and Alice
            '...',
            ...allLines.slice(4, 8)   // Bob's area where layout differences are visible
        ];
        for (const line of previewLines) {
            if (line === '...') {
                console.log(`    ${line}`);
            } else {
                console.log(`    ${line}`);
            }
        }
        console.log('');
    }
    
    // Analysis: Check if different titles led to different layouts
    console.log('=== ANALYSIS ===');
    
    const uniqueLayouts = new Set(results.map(r => 
        r.playerCoordinates.map(c => `${c.name}:(${c.row},${c.col})`).join(' ')
    ));
    
    console.log(`Number of unique layouts found: ${uniqueLayouts.size}`);
    
    if (uniqueLayouts.size > 1) {
        console.log('🚨 BUG CONFIRMED: Title affects layout selection!');
        
        // Group results by layout
        const layoutGroups = new Map<string, TestResult[]>();
        for (const result of results) {
            const layoutKey = result.playerCoordinates.map(c => `${c.name}:(${c.row},${c.col})`).join(' ');
            if (!layoutGroups.has(layoutKey)) {
                layoutGroups.set(layoutKey, []);
            }
            layoutGroups.get(layoutKey)!.push(result);
        }
        
        console.log('\nLayouts grouped by coordinates:');
        let groupNum = 1;
        for (const [layoutKey, group] of layoutGroups) {
            console.log(`\nLayout ${groupNum}: ${layoutKey}`);
            console.log(`  Triggered by titles: ${group.map(r => `"${r.title}"`).join(', ')}`);
            console.log(`  Dimensions: ${group[0].dimensions.width} x ${group[0].dimensions.height}`);
            groupNum++;
        }
    } else {
        console.log('✅ No bug detected: All titles produced the same layout');
    }
}

// Export for use in test runner
export { runTitleEffectTests };

// Run if called directly
if (require.main === module) {
    runTitleEffectTests();
}