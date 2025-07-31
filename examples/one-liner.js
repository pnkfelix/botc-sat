// One-liner example for quick testing
const startTime = Date.now();
console.log(`[${new Date().toISOString()}] Starting one-liner.js`);

const initStart = Date.now();
const BOTCValidator = require('../dist/index.js').default;
console.log(`[${Date.now() - initStart}ms] Module loaded`);

const validatorStart = Date.now();
const validator = new BOTCValidator();
console.log(`[${Date.now() - validatorStart}ms] BOTCValidator initialized`);

const genStart = Date.now();
validator.generateBag(6).then(result => {
    console.log(`[${Date.now() - genStart}ms] generateBag completed`);
    if (result.success) {
        console.log('✅ Legal 6-player setup:', result.selectedRoles.join(', '));
    } else {
        console.log('❌ Failed to generate setup');
    }
    console.log(`[${Date.now() - startTime}ms] Total execution time`);
}).catch(console.error);