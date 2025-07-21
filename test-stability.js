const { renderGrimoireToAsciiArt } = require('./dist/rendering/ascii-grimoire');
const { parseGrimoireFromSingleLine } = require('./dist/parsing/single-line-parser');
const { registerTroubleBrewing } = require('./dist/data/trouble-brewing-roles');

registerTroubleBrewing();

console.log('=== Testing Layout Stability (BUG #9 Fix Verification) ===\n');

// Test multiple cases to verify consistent behavior
const testCases = [
    {
        name: "7 players, short names",
        alive: "[A:imp B:imp C:imp D:imp E:imp F:imp G:imp]",
        dead: "[*~~A~~:imp* *~~B~~:imp* *~~C~~:imp* *~~D~~:imp* *~~E~~:imp* *~~F~~:imp* *~~G~~:imp*]"
    },
    {
        name: "8 players, medium names", 
        alive: "[AAA:imp BBB:imp CCC:imp DDD:imp EEE:imp FFF:imp GGG:imp HHH:imp]",
        dead: "[*~~AAA~~:imp* *~~BBB~~:imp* *~~CCC~~:imp* *~~DDD~~:imp* *~~EEE~~:imp* *~~FFF~~:imp* *~~GGG~~:imp* *~~HHH~~:imp*]"
    },
    {
        name: "9 players, long names",
        alive: "[AAAAAAA:imp BBBBBBB:imp CCCCCCC:imp DDDDDDD:imp EEEEEEE:imp FFFFFFF:imp GGGGGGG:imp HHHHHHH:imp IIIIIII:imp]",
        dead: "[*~~AAAAAAA~~:imp* *~~BBBBBBB~~:imp* *~~CCCCCCC~~:imp* *~~DDDDDDD~~:imp* *~~EEEEEEE~~:imp* *~~FFFFFFF~~:imp* *~~GGGGGGG~~:imp* *~~HHHHHHH~~:imp* *~~IIIIIII~~:imp*]"
    }
];

for (const testCase of testCases) {
    console.log(`=== ${testCase.name} ===`);
    
    const aliveGrimoire = parseGrimoireFromSingleLine(testCase.alive);
    const deadGrimoire = parseGrimoireFromSingleLine(testCase.dead);
    
    // Render with debugging to see turn selection
    const aliveRendered = renderGrimoireToAsciiArt(aliveGrimoire, {
        mode: 'auto',
        showColumnNumbers: false,
        useAbbreviations: true,
        _evaluationTitle: 'ALIVE-TEST'
    });
    
    const deadRendered = renderGrimoireToAsciiArt(deadGrimoire, {
        mode: 'auto',
        showColumnNumbers: false,
        useAbbreviations: true,
        _evaluationTitle: 'DEAD-TEST'
    });
    
    function getDims(rendered) {
        const lines = rendered.split('\n');
        const width = Math.max(...lines.map(line => line.length));
        const height = lines.length;
        return { width, height };
    }
    
    const aliveDims = getDims(aliveRendered);
    const deadDims = getDims(deadRendered);
    
    console.log(`Alive:  ${aliveDims.width}x${aliveDims.height}`);
    console.log(`Dead:   ${deadDims.width}x${deadDims.height}`);
    
    const heightSame = aliveDims.height === deadDims.height;
    const widthDiff = Math.abs(aliveDims.width - deadDims.width);
    
    console.log(`Height same: ${heightSame ? 'YES ✅' : 'NO ❌'}`);
    console.log(`Width diff:  ${widthDiff} chars ${widthDiff <= 2 ? '(acceptable) ✅' : '(too large) ❌'}`);
    
    if (heightSame && widthDiff <= 2) {
        console.log('✅ STABLE: Same turn configuration, minimal border difference');
    } else {
        console.log('❌ UNSTABLE: Layout differences indicate architectural issues');
    }
    
    console.log('');
}

console.log('=== Conclusion ===');
console.log('If all test cases show stable heights and minimal width differences,');
console.log('then BUG #9 is effectively fixed - layouts are now robust to game state changes.');