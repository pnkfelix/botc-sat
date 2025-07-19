// Example: Validate a LEGAL BOTC setup
const BOTCValidator = require('../dist/index.js').default;

async function run() {
    const validator = new BOTCValidator();
    
    console.log('✅ Validating LEGAL setup: 7 players with Baron...\n');
    
    // Test setup: Baron forces 2 Outsiders, and we include actual Outsider roles
    const testSetup = {
        playerCount: 7,
        selectedRoles: ['washerwoman', 'librarian', 'investigator', 'butler', 'recluse', 'baron', 'imp'],
        inPlayDistribution: { Townsfolk: 3, Outsider: 2, Minion: 1, Demon: 1 }, // Baron effect: 5T,0O -> 3T,2O
        physicalBag: new Map([
            ['washerwoman', 1], ['librarian', 1], ['investigator', 1], 
            ['butler', 1], ['recluse', 1], ['baron', 1], ['imp', 1]
        ])
    };
    
    const result = await validator.validateBag(
        testSetup.playerCount,
        testSetup.selectedRoles,
        testSetup.inPlayDistribution,
        testSetup.physicalBag
    );
    
    if (result.legal) {
        console.log('✅ Setup is LEGAL');
        console.log('Roles:', testSetup.selectedRoles.join(', '));
        console.log('Distribution:', testSetup.inPlayDistribution);
    } else {
        console.log('❌ Unexpected: Setup should be LEGAL but was rejected!');
    }
}

run().catch(console.error);