/**
 * Test auto mode with instrumentation to see why it fails to pick optimal layouts
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

function testInstrumentedAutoMode(): void {
    console.log('=== INSTRUMENTED AUTO MODE TEST ===\n');
    
    const testCases = [
        { name: 'Medium', title: '─ Grim ' },
        { name: 'VeryLong', title: '─ This is a very long title that should force wide layouts ' }
    ];
    
    for (const test of testCases) {
        console.log(`\nTesting ${test.name} title: "${test.title}"`);
        
        const options: RenderOptions & { _evaluationTitle?: string } = {
            mode: 'auto',
            showColumnNumbers: false,
            useAbbreviations: true,
            _evaluationTitle: test.title
        };
        
        const grimoire = { players: testPlayers };
        const result = renderGrimoireToAsciiArt(grimoire, options);
        
        // The instrumentation will show during the renderGrimoireToAsciiArt call
        console.log(`Final result dimensions: ${result.split('\n').length}h x ${Math.max(...result.split('\n').map(l => l.length))}w`);
    }
}

// Export for use in test runner
export { testInstrumentedAutoMode };

// Run if called directly
if (require.main === module) {
    testInstrumentedAutoMode();
}