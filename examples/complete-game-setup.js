// Example: Complete workflow - generate bag, assign to players, and render
const BOTCValidator = require('../dist/index.js').default;

async function run() {
    const validator = new BOTCValidator();
    
    console.log('🎮 Complete BOTC game setup workflow...\n');
    
    // Step 1: Generate a legal bag
    console.log('Step 1: Generating legal bag for 5 players...');
    const bagResult = await validator.generateBag(5);
    
    if (!bagResult.success) {
        console.log('❌ Failed to generate bag');
        return;
    }
    
    console.log('Generated roles:', bagResult.selectedRoles.join(', '));
    
    // Step 2: Assign roles to players
    console.log('\nStep 2: Assigning roles to players...');
    const playerNames = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'];
    const gameState = validator.generateInitialGameState(
        bagResult.selectedRoles, 
        playerNames,
        { seed: 12345 }  // Deterministic for demo
    );
    
    console.log('Player assignments:');
    gameState.players.forEach(player => {
        console.log(`  ${player.name}: ${player.role}`);
    });
    
    // Step 3: Render the game state
    console.log('\nStep 3: Rendering game state...');
    
    console.log('\n📄 Single-line format:');
    console.log(validator.renderGrimoireSingleLine(gameState, { useAbbreviations: true }));
    
    console.log('\n🎨 ASCII art format:');
    console.log(validator.renderGrimoireAscii(gameState, { 
        mode: 'auto', 
        useAbbreviations: true,
        showColumnNumbers: false
    }));
}

run().catch(console.error);