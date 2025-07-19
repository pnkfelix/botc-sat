// Example: Generate a legal BOTC bag for 7 players
const BOTCValidator = require('../dist/index.js').default;

async function run() {
    const validator = new BOTCValidator();
    
    console.log('🎲 Generating legal bag for 7 players...\n');
    
    const result = await validator.generateBag(7);
    
    if (result.success) {
        console.log('✅ Generated legal setup:');
        console.log('Roles:', result.selectedRoles.join(', '));
        console.log('Distribution:', result.inPlayDistribution);
        
        console.log('\nPhysical bag contents:');
        for (const [role, count] of result.physicalBag.entries()) {
            console.log(`  ${role}: ${count}`);
        }
    } else {
        console.log('❌ Failed to generate legal bag');
    }
}

run().catch(console.error);