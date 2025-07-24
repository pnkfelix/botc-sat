const { renderGrimoireToAsciiArt } = require('./dist/rendering/ascii-grimoire');
const { parseGrimoireFromSingleLine } = require('./dist/parsing/single-line-parser');
const { registerTroubleBrewing } = require('./dist/data/trouble-brewing-roles');

registerTroubleBrewing();

console.log('=== Investigating Layout Configurations ===\n');

function analyzeLayoutConfig(count) {
    // Generate test grimoire
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alivePlayers = [];
    for (let i = 0; i < count; i++) {
        const name = letters[i].repeat(3);
        alivePlayers.push(`${name}:imp`);
    }
    const aliveInput = `[${alivePlayers.join(' ')}]`;
    const aliveGrimoire = parseGrimoireFromSingleLine(aliveInput);
    
    // Render with debug output to see layout selection
    const rendered = renderGrimoireToAsciiArt(aliveGrimoire, {
        mode: 'auto',
        showColumnNumbers: false,
        useAbbreviations: true,
        _evaluationTitle: `LAYOUT-${count}p`
    });
    
    // Analyze the rendered output to infer layout configuration
    const lines = rendered.split('\n');
    const contentLines = lines.slice(1, -1); // Remove borders
    
    // Count players on different sides based on position patterns
    let topPlayers = 0;
    let rightPlayers = 0;
    let bottomPlayers = 0;
    let leftPlayers = 0;
    
    // This is a rough heuristic based on typical layout patterns
    // Top: players in first few rows
    // Right: players in rightmost column
    // Bottom: players in last few rows  
    // Left: players in leftmost column
    
    console.log(`${count} players layout analysis:`);
    console.log(`  Rendered dimensions: ${Math.max(...lines.map(l => l.length))}x${lines.length}`);
    console.log(`  Content rows: ${contentLines.length}`);
    
    // Look for player names in different regions
    const playerPattern = /[A-Z]{3}/g;
    let topRowPlayers = 0;
    let bottomRowPlayers = 0;
    let middleRowPlayers = 0;
    
    // Check top area (first 3 content lines)
    for (let i = 0; i < Math.min(3, contentLines.length); i++) {
        const matches = contentLines[i].match(playerPattern);
        if (matches) topRowPlayers += matches.length;
    }
    
    // Check bottom area (last 3 content lines)
    for (let i = Math.max(0, contentLines.length - 3); i < contentLines.length; i++) {
        const matches = contentLines[i].match(playerPattern);
        if (matches) bottomRowPlayers += matches.length;
    }
    
    // Check middle area
    for (let i = 3; i < contentLines.length - 3; i++) {
        const matches = contentLines[i].match(playerPattern);
        if (matches) middleRowPlayers += matches.length;
    }
    
    console.log(`  Rough layout estimate:`);
    console.log(`    Top area: ~${topRowPlayers} players`);
    console.log(`    Middle area: ~${middleRowPlayers} players`);
    console.log(`    Bottom area: ~${bottomRowPlayers} players`);
    console.log('');
}

// Analyze stable vs unstable cases
console.log('STABLE CASES:');
analyzeLayoutConfig(5);  // Stable
analyzeLayoutConfig(11); // Stable

console.log('UNSTABLE CASES:');
analyzeLayoutConfig(6);  // Unstable (2 char diff)
analyzeLayoutConfig(8);  // Unstable (6 char diff)

console.log('This should help identify what layout patterns cause border instability.');