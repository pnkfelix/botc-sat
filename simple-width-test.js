console.log('=== Width Calculation Analysis ===\n');

// Test the width difference between alive and dead formatting
const playerName = "AAAAA";
const roleName = "imp";

const aliveFormatted = {
    name: playerName,  // "AAAAA" = 5 chars
    role: roleName     // "imp" = 3 chars
};

const deadFormatted = {
    name: `*~~${playerName}~~*`,  // "*~~AAAAA~~*" = 11 chars
    role: `*~~${roleName}~~*`     // "*~~imp~~*" = 9 chars
};

console.log('Alive formatting:');
console.log('  name:', aliveFormatted.name, '(length:', aliveFormatted.name.length + ')');
console.log('  role:', aliveFormatted.role, '(length:', aliveFormatted.role.length + ')');
console.log('  max width:', Math.max(aliveFormatted.name.length, aliveFormatted.role.length));

console.log('\nDead formatting:');
console.log('  name:', deadFormatted.name, '(length:', deadFormatted.name.length + ')');
console.log('  role:', deadFormatted.role, '(length:', deadFormatted.role.length + ')');
console.log('  max width:', Math.max(deadFormatted.name.length, deadFormatted.role.length));

const aliveWidth = Math.max(aliveFormatted.name.length, aliveFormatted.role.length);
const deadWidth = Math.max(deadFormatted.name.length, deadFormatted.role.length);
const difference = deadWidth - aliveWidth;

console.log('\nWidth difference per player:', difference, 'characters');

// With 7 players, if each contributes this difference in some way, the total could be significant
console.log('Potential total difference with 7 players:', difference * 7, 'characters');
console.log('But the actual difference is only 2 characters (30 - 28)');
console.log('This suggests most of the width is being calculated correctly from worst-case formatting.');

console.log('\nThe remaining 2-character difference is likely from:');
console.log('1. Border padding differences');
console.log('2. Rounding in gap calculations');
console.log('3. Small edge cases in coordinate calculations');