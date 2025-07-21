const { renderGrimoireToAsciiArt } = require('./dist/rendering/ascii-grimoire');
const { parseGrimoireFromSingleLine } = require('./dist/parsing/single-line-parser');
const { registerTroubleBrewing } = require('./dist/data/trouble-brewing-roles');

registerTroubleBrewing();

console.log('=== CORRECTED BUG #9 SYSTEMATIC ANALYSIS ===');
console.log('Testing 135 cases: 9 player counts (7-15) × 15 name lengths (1-15)');
console.log('Using proper systematic naming: length L = AAAAA...A, BBBBB...B, CCCCC...C, etc.\n');

const roles = ['investigator', 'chef', 'empath', 'librarian', 'butler', 'fortune_teller', 'virgin', 'slayer', 'soldier', 'mayor', 'undertaker', 'monk', 'ravenkeeper', 'washerwoman', 'imp'];

let totalTests = 0;
let layoutDifferences = 0;
const differences = [];

// Test player counts 7-15
for (let playerCount = 7; playerCount <= 15; playerCount++) {
    // Test name lengths 1-15 characters  
    for (let nameLength = 1; nameLength <= 15; nameLength++) {
        totalTests++;
        
        // Generate names: A, B, C, ... for length 1; AA, BB, CC, ... for length 2; etc.
        const playerEntries = [];
        const deadPlayerEntries = [];
        
        for (let i = 0; i < playerCount; i++) {
            // Use letters A, B, C, D, ... for each player
            const letter = String.fromCharCode(65 + i); // A=65, B=66, etc.
            const playerName = letter.repeat(nameLength); // A, AA, AAA, etc.
            const role = roles[i % roles.length];
            
            playerEntries.push(`${playerName}:${role}`);
            deadPlayerEntries.push(`*~~${playerName}~~:${role}*`);
        }
        
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
        
        if (aliveDimsStr !== deadDimsStr) {
            layoutDifferences++;
            differences.push({
                playerCount,
                nameLength,
                aliveDims: aliveDimsStr,
                deadDims: deadDimsStr
            });
            
            console.log(`🐛 DIFFERENCE: ${playerCount}p, L=${nameLength}: ${aliveDimsStr} vs ${deadDimsStr}`);
        } else {
            console.log(`✅ SAME: ${playerCount}p, L=${nameLength}: ${aliveDimsStr}`);
        }
    }
}

console.log(`\n=== CORRECTED SYSTEMATIC TEST RESULTS ===`);
console.log(`Total test combinations: ${totalTests}`);
console.log(`Layout differences found: ${layoutDifferences}`);
console.log(`Difference rate: ${(layoutDifferences/totalTests*100).toFixed(1)}%`);

if (layoutDifferences > 0) {
    console.log('\n🐛 BUG CONFIRMED by corrected systematic testing!');
    console.log('Visual formatting affects auto-layout selection');
    console.log('\nSample differences:');
    differences.slice(0, 10).forEach(diff => {
        console.log(`  ${diff.playerCount}p, L=${diff.nameLength}: ${diff.aliveDims} → ${diff.deadDims}`);
    });
    if (differences.length > 10) {
        console.log(`  ... and ${differences.length - 10} more`);
    }
} else {
    console.log('\n📊 No layout differences found with corrected methodology');
    console.log('The architectural flaw exists but may not manifest in systematic testing');
    console.log('BUG #9 may only affect edge cases with specific name combinations');
}