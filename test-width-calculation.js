const { renderGrimoireToAsciiArt } = require('./dist/rendering/ascii-grimoire');
const { parseGrimoireFromSingleLine } = require('./dist/parsing/single-line-parser');
const { registerTroubleBrewing } = require('./dist/data/trouble-brewing-roles');

registerTroubleBrewing();

console.log('=== Testing Width Calculations ===\n');

// Create test player
const testGrimoire = parseGrimoireFromSingleLine("[AAAAA:imp]");
const player = testGrimoire.players[0];

console.log('Player:', player);

// Test formatPlayerDisplayText with different options
function testFormatting(player, options) {
    // Import the internal function
    const formatPlayerDisplayText = eval(`
        function formatPlayerDisplayText(player, options) {
            if (options?._forceWorstCaseFormatting) {
                return { name: \`*~~\${player.name}~~*\`, role: \`*~~\${player.role}~~*\` };
            }
            
            if (player.alive) {
                return { name: player.name, role: player.role };
            } else if (player.ghost) {
                return { name: \`*\${player.name}*\`, role: \`*\${player.role}*\` };
            } else {
                return { name: \`*~~\${player.name}~~*\`, role: \`*~~\${player.role}~~*\` };
            }
        }
        formatPlayerDisplayText
    `);
    
    return formatPlayerDisplayText(player, options);
}

const aliveFormatting = testFormatting(player, {});
const worstCaseFormatting = testFormatting(player, { _forceWorstCaseFormatting: true });

console.log('Alive formatting:', aliveFormatting);
console.log('Worst-case formatting:', worstCaseFormatting);

console.log('Alive name length:', aliveFormatting.name.length);
console.log('Worst-case name length:', worstCaseFormatting.name.length);
console.log('Length difference:', worstCaseFormatting.name.length - aliveFormatting.name.length);

// Test getPlayerDisplayWidth
function testDisplayWidth(player, options) {
    const { name, role } = testFormatting(player, options);
    const nameWidth = name.length;
    const roleWidth = role.length;
    return Math.max(nameWidth, roleWidth);
}

const aliveWidth = testDisplayWidth(player, {});
const worstCaseWidth = testDisplayWidth(player, { _forceWorstCaseFormatting: true });

console.log('\nAlive display width:', aliveWidth);
console.log('Worst-case display width:', worstCaseWidth);
console.log('Width difference:', worstCaseWidth - aliveWidth);

console.log('\nExpected difference in final layout: ~' + (worstCaseWidth - aliveWidth) + ' characters');