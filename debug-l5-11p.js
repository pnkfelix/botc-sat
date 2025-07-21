const { renderGrimoireToAsciiArt } = require('./dist/rendering/ascii-grimoire');
const { parseGrimoireFromSingleLine } = require('./dist/parsing/single-line-parser');
const { registerTroubleBrewing } = require('./dist/data/trouble-brewing-roles');

registerTroubleBrewing();

console.log('=== DEBUG: Exact systematic test case L=5, 11 players ===\n');

const roles = ['investigator', 'chef', 'empath', 'librarian', 'butler', 'fortune_teller', 'virgin', 'slayer', 'soldier', 'mayor', 'undertaker', 'monk', 'ravenkeeper', 'washerwoman', 'imp'];

const playerCount = 11;
const nameLength = 5;

// Generate names exactly as systematic test does
const playerEntries = [];
const deadPlayerEntries = [];

for (let i = 0; i < playerCount; i++) {
    const letter = String.fromCharCode(65 + i); // A=65, B=66, etc.
    const playerName = letter.repeat(nameLength); // AAAAA, BBBBB, etc.
    const role = roles[i % roles.length];
    
    playerEntries.push(`${playerName}:${role}`);
    deadPlayerEntries.push(`*~~${playerName}~~:${role}*`);
}

console.log('Player entries (alive):', playerEntries.join(' '));
console.log('Player entries (dead):', deadPlayerEntries.join(' '));

// Create grimoires
const aliveGrimoire = parseGrimoireFromSingleLine(`[${playerEntries.join(' ')}]`);
const deadGrimoire = parseGrimoireFromSingleLine(`[${deadPlayerEntries.join(' ')}]`);

// Render both
const aliveRendered = renderGrimoireToAsciiArt(aliveGrimoire, {
    mode: 'auto',
    showColumnNumbers: false,
    useAbbreviations: true
});

const deadRendered = renderGrimoireToAsciiArt(deadGrimoire, {
    mode: 'auto', 
    showColumnNumbers: false,
    useAbbreviations: true
});

// Compare dimensions
const aliveDims = {
    width: Math.max(...aliveRendered.split('\n').map(line => line.length)),
    height: aliveRendered.split('\n').length
};

const deadDims = {
    width: Math.max(...deadRendered.split('\n').map(line => line.length)),
    height: deadRendered.split('\n').length
};

const aliveDimsStr = `${aliveDims.width}x${aliveDims.height}`;
const deadDimsStr = `${deadDims.width}x${deadDims.height}`;

console.log(`\nResults:`);
console.log(`Alive:  ${aliveDimsStr}`);
console.log(`Dead:   ${deadDimsStr}`);
console.log(`Same?   ${aliveDimsStr === deadDimsStr ? 'YES' : 'NO'}`);

if (aliveDimsStr !== deadDimsStr) {
    console.log('🐛 DIFFERENCE found - matches systematic test output');
} else {
    console.log('✅ SAME - contradicts systematic test output');
    console.log('There was an error in the systematic test script or output');
}