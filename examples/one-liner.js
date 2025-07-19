// One-liner example for quick testing
const BOTCValidator = require('../dist/index.js').default;

new BOTCValidator().generateBag(6).then(result => {
    if (result.success) {
        console.log('✅ Legal 6-player setup:', result.selectedRoles.join(', '));
    } else {
        console.log('❌ Failed to generate setup');
    }
}).catch(console.error);