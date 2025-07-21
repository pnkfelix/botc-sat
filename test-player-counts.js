const { renderGrimoireToAsciiArt } = require('./dist/rendering/ascii-grimoire');
const { parseGrimoireFromSingleLine } = require('./dist/parsing/single-line-parser');
const { registerTroubleBrewing } = require('./dist/data/trouble-brewing-roles');

registerTroubleBrewing();

console.log('=== Testing Border Stability Across Player Counts ===\n');

function testPlayerCount(count) {
    // Generate player lists
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alivePlayers = [];
    const deadPlayers = [];
    
    for (let i = 0; i < count; i++) {
        const name = letters[i].repeat(3); // AAA, BBB, CCC, etc.
        alivePlayers.push(`${name}:imp`);
        deadPlayers.push(`*~~${name}~~:imp*`);
    }
    
    const aliveInput = `[${alivePlayers.join(' ')}]`;
    const deadInput = `[${deadPlayers.join(' ')}]`;
    
    const aliveGrimoire = parseGrimoireFromSingleLine(aliveInput);
    const deadGrimoire = parseGrimoireFromSingleLine(deadInput);
    
    const aliveRendered = renderGrimoireToAsciiArt(aliveGrimoire, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });
    const deadRendered = renderGrimoireToAsciiArt(deadGrimoire, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });
    
    const aliveWidth = Math.max(...aliveRendered.split('\n').map(line => line.length));
    const deadWidth = Math.max(...deadRendered.split('\n').map(line => line.length));
    
    const stable = aliveWidth === deadWidth;
    const diff = Math.abs(aliveWidth - deadWidth);
    
    console.log(`${count} players: ${aliveWidth} vs ${deadWidth} ${stable ? '✅ STABLE' : `❌ UNSTABLE (diff: ${diff})`}`);
    
    return stable;
}

// Test player counts from 3 to 12
console.log('Testing player counts to identify when border stability breaks:\n');

for (let count = 3; count <= 12; count++) {
    testPlayerCount(count);
}

console.log('\nThis will show us exactly which player counts have perfect border stability');
console.log('and which ones still need fixing.');