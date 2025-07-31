// Example: Generate a legal BOTC bag for 7 players
const BOTCValidator = require('../dist/index.js').default;

async function run() {
    const startTime = Date.now();
    console.log(`[${new Date().toISOString()}] Starting generate-bag.js`);
    
    const initStart = Date.now();
    const validator = new BOTCValidator();
    console.log(`[${Date.now() - initStart}ms] BOTCValidator initialized`);
    
    console.log('🎲 Generating legal bag for 7 players...\n');
    
    const genStart = Date.now();
    const result = await validator.generateBag(7);
    console.log(`[${Date.now() - genStart}ms] generateBag completed`);
    
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
    
    console.log(`[${Date.now() - startTime}ms] Total execution time`);
}

run().catch(console.error);