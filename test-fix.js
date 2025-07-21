const { renderGrimoireToAsciiArt } = require('./dist/rendering/ascii-grimoire');
const { parseGrimoireFromSingleLine } = require('./dist/parsing/single-line-parser');
const { registerTroubleBrewing } = require('./dist/data/trouble-brewing-roles');

registerTroubleBrewing();

console.log('=== Testing BUG #9 Fix ===\n');

// Test case: 7 players, 5-character names (all imp roles to eliminate confounding variables)
const aliveGrimoire = parseGrimoireFromSingleLine(
    "[AAAAA:imp BBBBB:imp CCCCC:imp DDDDD:imp EEEEE:imp FFFFF:imp GGGGG:imp]"
);

const deadGrimoire = parseGrimoireFromSingleLine(
    "[*~~AAAAA~~:imp* *~~BBBBB~~:imp* *~~CCCCC~~:imp* *~~DDDDD~~:imp* *~~EEEEE~~:imp* *~~FFFFF~~:imp* *~~GGGGG~~:imp*]"
);

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
function getDims(rendered) {
    const lines = rendered.split('\n');
    const width = Math.max(...lines.map(line => line.length));
    const height = lines.length;
    return `${width}x${height}`;
}

const aliveDims = getDims(aliveRendered);
const deadDims = getDims(deadRendered);

console.log(`Alive players:  ${aliveDims}`);
console.log(`Dead players:   ${deadDims}`);
console.log(`Same layout?    ${aliveDims === deadDims ? 'YES ✅' : 'NO ❌'}`);

if (aliveDims === deadDims) {
    console.log('\n🎉 BUG #9 FIXED! Layout evaluation now uses worst-case formatting');
    console.log('Auto-layout selection is now robust to visual formatting changes');
} else {
    console.log('\n❌ BUG #9 STILL PRESENT - Fix needs debugging');
    console.log('Layout evaluation is still affected by alive/dead visual formatting');
}