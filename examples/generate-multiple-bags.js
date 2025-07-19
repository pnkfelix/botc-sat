// Example: Generate multiple diverse legal setups
const BOTCValidator = require('../dist/index.js').default;

async function run() {
    const validator = new BOTCValidator();
    
    console.log('🎲 Generating 3 diverse setups for 6 players...\n');
    
    const result = await validator.generateMultipleBags(6, {
        maxSolutions: 3,
        useVariableIndirection: true  // Better variety
    });
    
    if (result.success && result.solutions) {
        console.log(`✅ Generated ${result.solutions.length} diverse setups:\n`);
        
        result.solutions.forEach((setup, index) => {
            console.log(`Setup ${index + 1}:`);
            console.log('  Roles:', setup.selectedRoles.join(', '));
            console.log('  Distribution:', {
                T: setup.inPlayDistribution.Townsfolk,
                O: setup.inPlayDistribution.Outsider,
                M: setup.inPlayDistribution.Minion,
                D: setup.inPlayDistribution.Demon
            });
            console.log();
        });
    } else {
        console.log('❌ Failed to generate multiple setups');
    }
}

run().catch(console.error);