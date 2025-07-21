const { renderGrimoireToAsciiArt } = require('./dist/rendering/ascii-grimoire');
const { parseGrimoireFromSingleLine } = require('./dist/parsing/single-line-parser');
const { registerTroubleBrewing } = require('./dist/data/trouble-brewing-roles');

registerTroubleBrewing();

console.log('=== Debugging BUG #9 Fix ===\n');

// Test same grimoire with different formatting
const aliveGrimoire = parseGrimoireFromSingleLine("[AAAAA:imp BBBBB:imp CCCCC:imp DDDDD:imp EEEEE:imp FFFFF:imp GGGGG:imp]");
const deadGrimoire = parseGrimoireFromSingleLine("[*~~AAAAA~~:imp* *~~BBBBB~~:imp* *~~CCCCC~~:imp* *~~DDDDD~~:imp* *~~EEEEE~~:imp* *~~FFFFF~~:imp* *~~GGGGG~~:imp*]");

console.log('ALIVE GRIMOIRE RENDERING:');
const aliveRendered = renderGrimoireToAsciiArt(aliveGrimoire, {
    mode: 'auto',
    showColumnNumbers: false,
    useAbbreviations: true,
    _evaluationTitle: 'DEBUG-ALIVE'
});
console.log(aliveRendered);

console.log('\n' + '='.repeat(50) + '\n');

console.log('DEAD GRIMOIRE RENDERING:');
const deadRendered = renderGrimoireToAsciiArt(deadGrimoire, {
    mode: 'auto',
    showColumnNumbers: false,
    useAbbreviations: true,
    _evaluationTitle: 'DEBUG-DEAD'
});
console.log(deadRendered);

function getDims(rendered) {
    const lines = rendered.split('\n');
    const width = Math.max(...lines.map(line => line.length));
    const height = lines.length;
    return `${width}x${height}`;
}

console.log(`\nAlive: ${getDims(aliveRendered)}`);
console.log(`Dead:  ${getDims(deadRendered)}`);

// The issue might be that we're seeing different turn configurations being selected
// Let's test if both grimoires get the same layout structure with explicit turns
console.log('\n=== Testing with explicit turns ===');

const aliveExplicit = renderGrimoireToAsciiArt(aliveGrimoire, {
    mode: 'explicit-turns',
    explicitTurns: [7, 0, 0, 0], // All on top
    showColumnNumbers: false,
    useAbbreviations: true
});

const deadExplicit = renderGrimoireToAsciiArt(deadGrimoire, {
    mode: 'explicit-turns',
    explicitTurns: [7, 0, 0, 0], // All on top
    showColumnNumbers: false,
    useAbbreviations: true
});

console.log(`Explicit alive: ${getDims(aliveExplicit)}`);
console.log(`Explicit dead:  ${getDims(deadExplicit)}`);
console.log(`Same with explicit turns? ${getDims(aliveExplicit) === getDims(deadExplicit) ? 'YES' : 'NO'}`);