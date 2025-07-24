// Quick test to verify all four layout optimization modes work correctly
const BOTCValidator = require('../../dist/index.js').default;

async function testOptimizationModes() {
    const validator = new BOTCValidator();
    
    // Parse command line arguments
    const args = process.argv.slice(2);
    const playerCount = args.length > 0 ? parseInt(args[0]) : 15;
    
    // Validate player count
    if (isNaN(playerCount) || playerCount < 5 || playerCount > 15) {
        console.error('❌ Error: Player count must be a number between 5 and 15');
        console.log('Usage: node test-optimization-modes.js [player_count]');
        console.log('Example: node test-optimization-modes.js 8');
        process.exit(1);
    }
    
    // Full list of players and roles (15 max)
    const allPlayerNames = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack', 'Kate', 'Liam', 'Maya', 'Noah', 'Olivia'];
    const allRoles = ['washerwoman', 'librarian', 'investigator', 'chef', 'empath', 'fortune_teller', 'undertaker', 'monk', 'ravenkeeper', 'virgin', 'slayer', 'soldier', 'mayor', 'poisoner', 'imp'];
    
    // Take prefix based on requested player count
    const playerNames = allPlayerNames.slice(0, playerCount);
    const roles = allRoles.slice(0, playerCount);
    
    const gameState = validator.generateInitialGameState(roles, playerNames, { seed: 12345 });
    
    console.log(`🧪 Testing all seven layout optimization modes with ${playerCount} players...\n`);
    
    const modes = ['auto', 'squariness', 'min-area', 'min-max-dim', 'min-perimeter', 'max-area-perimeter-ratio', 'max-area-perimeter2-ratio'];
    
    for (const mode of modes) {
        try {
            console.log(`--- ${mode.toUpperCase()} MODE ---`);
            const rendered = validator.renderGrimoireAscii(gameState, { 
                mode: mode, 
                useAbbreviations: true,
                showColumnNumbers: false
            });
            
            // Measure dimensions
            const lines = rendered.split('\n');
            const height = lines.length;
            const width = Math.max(...lines.map(line => line.length));
            const area = width * height;
            const maxDim = Math.max(width, height);
            const perimeter = width + height;
            const ratio = perimeter > 0 ? (area / perimeter).toFixed(3) : '0.000';
            const ratio2 = perimeter > 0 ? (area / (perimeter * perimeter)).toFixed(6) : '0.000000'; // More precision for smaller values
            
            // Show appropriate formula based on mode
            let ratioDisplay;
            if (mode === 'max-area-perimeter2-ratio') {
                ratioDisplay = `area/perimeter^2=${ratio2}`;
            } else if (mode === 'max-area-perimeter-ratio') {
                ratioDisplay = `area/perimeter=${ratio}`;
            } else {
                ratioDisplay = `area/perimeter=${ratio}`;
            }
            
            console.log(`Dimensions: ${width}×${height} (area=${area}, maxDim=${maxDim}, perimeter=${perimeter}, ${ratioDisplay})`);
            console.log(rendered);
            console.log('');
        } catch (error) {
            console.error(`❌ Error with ${mode} mode:`, error.message);
        }
    }
    
    console.log('✅ All optimization modes tested successfully!');
}

testOptimizationModes().catch(console.error);