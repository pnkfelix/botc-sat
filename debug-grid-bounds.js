const { renderGrimoireToAsciiArt } = require('./dist/rendering/ascii-grimoire');
const { parseGrimoireFromSingleLine } = require('./dist/parsing/single-line-parser');
const { registerTroubleBrewing } = require('./dist/data/trouble-brewing-roles');

registerTroubleBrewing();

console.log('=== Debugging Grid Bounds Calculation ===\n');

// Create a modified version to debug the grid bounds calculation
function debugGridBounds() {
    const aliveGrimoire = parseGrimoireFromSingleLine("[AAA:imp BBB:imp CCC:imp]");
    const deadGrimoire = parseGrimoireFromSingleLine("[*~~AAA~~:imp* *~~BBB~~:imp* *~~CCC~~:imp*]");
    
    console.log('Testing simple 3-player case:');
    console.log('Alive players: AAA, BBB, CCC');
    console.log('Dead players: *~~AAA~~*, *~~BBB~~*, *~~CCC~~*');
    
    // Manual width calculations
    console.log('\nManual width calculations:');
    console.log('Alive name width: AAA =', 'AAA'.length, 'chars');
    console.log('Alive role width: imp =', 'imp'.length, 'chars');
    console.log('Alive max width:', Math.max('AAA'.length, 'imp'.length));
    
    console.log('Dead name width: *~~AAA~~* =', '*~~AAA~~*'.length, 'chars');
    console.log('Dead role width: *~~imp~~* =', '*~~imp~~*'.length, 'chars');
    console.log('Dead max width:', Math.max('*~~AAA~~*'.length, '*~~imp~~*'.length));
    
    const aliveRendered = renderGrimoireToAsciiArt(aliveGrimoire, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });
    const deadRendered = renderGrimoireToAsciiArt(deadGrimoire, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });
    
    console.log('\nActual results:');
    console.log('Alive width:', Math.max(...aliveRendered.split('\n').map(line => line.length)));
    console.log('Dead width:', Math.max(...deadRendered.split('\n').map(line => line.length)));
    
    console.log('\nThis should help identify where the grid bounds calculation is failing.');
}

debugGridBounds();