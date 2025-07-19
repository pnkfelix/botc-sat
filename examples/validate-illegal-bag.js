// Example: Validate an ILLEGAL BOTC setup
const BOTCValidator = require('../dist/index.js').default;

async function run() {
    const validator = new BOTCValidator();
    
    console.log('❌ Validating ILLEGAL setup: Baron without Outsider roles...\n');
    
    // Test setup: Baron forces 2 Outsider slots but we only include Townsfolk roles
    const testSetup = {
        playerCount: 7,
        selectedRoles: ['washerwoman', 'librarian', 'investigator', 'chef', 'empath', 'baron', 'imp'],
        inPlayDistribution: { Townsfolk: 3, Outsider: 2, Minion: 1, Demon: 1 }, // Baron effect: 5T,0O -> 3T,2O
        physicalBag: new Map([
            ['washerwoman', 1], ['librarian', 1], ['investigator', 1], 
            ['chef', 1], ['empath', 1], ['baron', 1], ['imp', 1]
        ])
    };
    
    const result = await validator.validateBag(
        testSetup.playerCount,
        testSetup.selectedRoles,
        testSetup.inPlayDistribution,
        testSetup.physicalBag
    );
    
    if (result.legal) {
        console.log('❌ Unexpected: Setup should be ILLEGAL but was accepted!');
    } else {
        console.log('✅ Setup correctly detected as ILLEGAL');
        console.log('Attempted roles:', testSetup.selectedRoles.join(', '));
        console.log('Attempted distribution:', testSetup.inPlayDistribution);
    }
}

run().catch(console.error);