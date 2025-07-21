const { renderGrimoireToAsciiArt } = require('./dist/rendering/ascii-grimoire');
const { parseGrimoireFromSingleLine } = require('./dist/parsing/single-line-parser');
const { registerTroubleBrewing } = require('./dist/data/trouble-brewing-roles');

registerTroubleBrewing();

console.log('=== VERIFICATION: L=5, 11 players ===\n');

// Test 1: Systematic approach (AAAAA, BBBBB, CCCCC, etc.)
const systematicAlive = parseGrimoireFromSingleLine(
    "[AAAAA:investigator BBBBB:chef CCCCC:empath DDDDD:librarian EEEEE:butler FFFFF:fortune_teller GGGGG:virgin HHHHH:slayer IIIII:soldier JJJJJ:mayor KKKKK:imp]"
);

const systematicDead = parseGrimoireFromSingleLine(
    "[*~~AAAAA~~:investigator* *~~BBBBB~~:chef* *~~CCCCC~~:empath* *~~DDDDD~~:librarian* *~~EEEEE~~:butler* *~~FFFFF~~:fortune_teller* *~~GGGGG~~:virgin* *~~HHHHH~~:slayer* *~~IIIII~~:soldier* *~~JJJJJ~~:mayor* *~~KKKKK~~:imp*]"
);

// Test 2: Realistic approach (Alice, Frank, Grace, etc.)
const realisticAlive = parseGrimoireFromSingleLine(
    "[Alice:investigator Frank:chef Grace:empath David:librarian Sarah:butler Brian:fortune_teller Carol:virgin Diana:slayer James:soldier Helen:mayor Emily:imp]"
);

const realisticDead = parseGrimoireFromSingleLine(
    "[*~~Alice~~:investigator* *~~Frank~~:chef* *~~Grace~~:empath* *~~David~~:librarian* *~~Sarah~~:butler* *~~Brian~~:fortune_teller* *~~Carol~~:virgin* *~~Diana~~:slayer* *~~James~~:soldier* *~~Helen~~:mayor* *~~Emily~~:imp*]"
);

function getDims(rendered) {
    const lines = rendered.split('\n');
    const width = Math.max(...lines.map(line => line.length));
    const height = lines.length;
    return `${width}x${height}`;
}

// Render systematic approach
const sysAliveRendered = renderGrimoireToAsciiArt(systematicAlive, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });
const sysDeadRendered = renderGrimoireToAsciiArt(systematicDead, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });

// Render realistic approach  
const realAliveRendered = renderGrimoireToAsciiArt(realisticAlive, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });
const realDeadRendered = renderGrimoireToAsciiArt(realisticDead, { mode: 'auto', showColumnNumbers: false, useAbbreviations: true });

const sysAliveDims = getDims(sysAliveRendered);
const sysDeadDims = getDims(sysDeadRendered);
const realAliveDims = getDims(realAliveRendered);
const realDeadDims = getDims(realDeadRendered);

console.log('SYSTEMATIC NAMES (AAAAA, BBBBB, CCCCC, etc.):');
console.log(`  Alive:  ${sysAliveDims}`);
console.log(`  Dead:   ${sysDeadDims}`);
console.log(`  Same?   ${sysAliveDims === sysDeadDims ? 'YES' : 'NO'}`);

console.log('\nREALISTIC NAMES (Alice, Frank, Grace, etc.):');
console.log(`  Alive:  ${realAliveDims}`);
console.log(`  Dead:   ${realDeadDims}`);
console.log(`  Same?   ${realAliveDims === realDeadDims ? 'YES' : 'NO'}`);

console.log('\nCOMPARISON:');
if (sysAliveDims === sysDeadDims && realAliveDims === realDeadDims) {
    console.log('✅ BOTH UNAFFECTED: L=5, 11p is actually an exception case');
} else if (sysAliveDims !== sysDeadDims && realAliveDims !== realDeadDims) {
    console.log('✅ BOTH AFFECTED: L=5, 11p shows the bug consistently');
} else {
    console.log('❌ INCONSISTENT: There is still a methodological issue');
    console.log('Need to investigate why systematic and realistic approaches differ');
}