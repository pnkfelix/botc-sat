const { renderGrimoireToAsciiArt } = require('./dist/rendering/ascii-grimoire');
const { parseGrimoireFromSingleLine } = require('./dist/parsing/single-line-parser');
const { registerTroubleBrewing } = require('./dist/data/trouble-brewing-roles');

registerTroubleBrewing();

console.log('=== Current Border Stability Issue ===\n');

// Test case that shows the problem
const aliveGrimoire = parseGrimoireFromSingleLine("[AAA:imp BBB:imp CCC:imp DDD:imp EEE:imp FFF:imp GGG:imp HHH:imp]");
const deadGrimoire = parseGrimoireFromSingleLine("[*~~AAA~~:imp* *~~BBB~~:imp* *~~CCC~~:imp* *~~DDD~~:imp* *~~EEE~~:imp* *~~FFF~~:imp* *~~GGG~~:imp* *~~HHH~~:imp*]");

const aliveRendered = renderGrimoireToAsciiArt(aliveGrimoire, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });
const deadRendered = renderGrimoireToAsciiArt(deadGrimoire, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });

console.log('CURRENT STATE WITH ALIVE PLAYERS:');
console.log(aliveRendered);
console.log(`Width: ${Math.max(...aliveRendered.split('\n').map(line => line.length))} characters`);

console.log('\n' + '='.repeat(60) + '\n');

console.log('CURRENT STATE WITH DEAD PLAYERS:');
console.log(deadRendered);
console.log(`Width: ${Math.max(...deadRendered.split('\n').map(line => line.length))} characters`);

console.log('\n' + '='.repeat(60) + '\n');

console.log('WHAT PERFECT BORDER STABILITY WOULD LOOK LIKE:');
console.log('');
console.log('Both grimoires would have IDENTICAL border widths:');
console.log('- Same total width (e.g., both 37 characters)');
console.log('- Same border length');
console.log('- Same internal spacing');
console.log('- Only the actual text content differs (AAA vs *~~AAA~~*)');
console.log('');
console.log('Currently, the borders differ by 6 characters (31 vs 37), which means:');
console.log('- The dead grimoire border extends 6 characters wider');
console.log('- This creates visual inconsistency during gameplay');
console.log('- Players would see the grimoire "grow" when someone dies');
console.log('');
console.log('PERFECT SOLUTION:');
console.log('- Both borders would be 37 characters wide (worst-case size)');
console.log('- Alive players would have extra padding/whitespace');
console.log('- Dead players would fill the space exactly');
console.log('- The grimoire dimensions would never change during gameplay');

console.log('\n=== Analysis ===');
console.log('The remaining issue is in the grid bounds calculation.');
console.log('We need to ensure maxCol is ALWAYS calculated from worst-case widths,');
console.log('not influenced by actual content lengths at all.');