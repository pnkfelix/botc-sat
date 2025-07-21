const { renderGrimoireToAsciiArt } = require('./dist/rendering/ascii-grimoire');
const { parseGrimoireFromSingleLine } = require('./dist/parsing/single-line-parser');
const { registerTroubleBrewing } = require('./dist/data/trouble-brewing-roles');

registerTroubleBrewing();

console.log('=== BUG #9 COMPARISON: Artificial vs Realistic Names (11 players, 5-char names) ===\n');

// Test 1: Artificial names (AAAAA0, AAAAA1, etc.)
const artificialAlive = parseGrimoireFromSingleLine(
    "[AAAAA0:investigator AAAAA1:chef AAAAA2:empath AAAAA3:librarian AAAAA4:butler AAAAA5:fortune_teller AAAAA6:virgin AAAAA7:slayer AAAAA8:soldier AAAAA9:mayor AAAAA10:imp]"
);

const artificialDead = parseGrimoireFromSingleLine(
    "[*~~AAAAA0~~:investigator* *~~AAAAA1~~:chef* *~~AAAAA2~~:empath* *~~AAAAA3~~:librarian* *~~AAAAA4~~:butler* *~~AAAAA5~~:fortune_teller* *~~AAAAA6~~:virgin* *~~AAAAA7~~:slayer* *~~AAAAA8~~:soldier* *~~AAAAA9~~:mayor* *~~AAAAA10~~:imp*]"
);

// Test 2: Realistic names (Alice, Frank, Grace, etc.)
const realisticAlive = parseGrimoireFromSingleLine(
    "[Alice:investigator Frank:chef Grace:empath David:librarian Sarah:butler Brian:fortune_teller Carol:virgin Diana:slayer James:soldier Helen:mayor Emily:imp]"
);

const realisticDead = parseGrimoireFromSingleLine(
    "[*~~Alice~~:investigator* *~~Frank~~:chef* *~~Grace~~:empath* *~~David~~:librarian* *~~Sarah~~:butler* *~~Brian~~:fortune_teller* *~~Carol~~:virgin* *~~Diana~~:slayer* *~~James~~:soldier* *~~Helen~~:mayor* *~~Emily~~:imp*]"
);

// Render all cases
const artificialAliveRendered = renderGrimoireToAsciiArt(artificialAlive, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });
const artificialDeadRendered = renderGrimoireToAsciiArt(artificialDead, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });
const realisticAliveRendered = renderGrimoireToAsciiArt(realisticAlive, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });
const realisticDeadRendered = renderGrimoireToAsciiArt(realisticDead, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });

// Calculate dimensions
function getDims(rendered) {
    const lines = rendered.split('\n');
    const width = Math.max(...lines.map(line => line.length));
    const height = lines.length;
    return `${width}x${height}`;
}

const artificialAliveDims = getDims(artificialAliveRendered);
const artificialDeadDims = getDims(artificialDeadRendered);
const realisticAliveDims = getDims(realisticAliveRendered);
const realisticDeadDims = getDims(realisticDeadRendered);

console.log('ARTIFICIAL NAMES (AAAAA0, AAAAA1, etc.):');
console.log(`  Alive:  ${artificialAliveDims}`);
console.log(`  Dead:   ${artificialDeadDims}`);
console.log(`  Same?   ${artificialAliveDims === artificialDeadDims ? 'YES' : 'NO'}`);

console.log('\nREALISTIC NAMES (Alice, Frank, etc.):');
console.log(`  Alive:  ${realisticAliveDims}`);
console.log(`  Dead:   ${realisticDeadDims}`);
console.log(`  Same?   ${realisticAliveDims === realisticDeadDims ? 'YES' : 'NO'}`);

console.log('\nCOMPARISON:');
if (artificialAliveDims === artificialDeadDims && realisticAliveDims !== realisticDeadDims) {
    console.log('❌ DISCREPANCY: Artificial names unaffected, realistic names affected');
    console.log('This suggests the experimental apparatus was flawed');
} else if (artificialAliveDims !== artificialDeadDims && realisticAliveDims === realisticDeadDims) {
    console.log('❌ DISCREPANCY: Artificial names affected, realistic names unaffected');
    console.log('This would be unexpected');
} else if (artificialAliveDims === artificialDeadDims && realisticAliveDims === realisticDeadDims) {
    console.log('✅ BOTH UNAFFECTED: Neither artificial nor realistic names show the bug');
    console.log('This suggests L=5, player-count=11 was incorrectly claimed to be affected');
} else {
    console.log('✅ BOTH AFFECTED: Both artificial and realistic names show the bug consistently');
    console.log('This supports the systematic nature of the architectural flaw');
}