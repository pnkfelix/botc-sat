// Example: Render grimoire from single-line format to ASCII art
const BOTCValidator = require('../dist/index.js').default;
const { parseGrimoireFromSingleLine } = require('../dist/parsing/single-line-parser.js');

async function run() {
    const startTime = Date.now();
    console.log(`[${new Date().toISOString()}] Starting render-grimoire.js`);
    
    // Parse command line arguments
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log('Usage: node examples/render-grimoire.js <script> <grimoire> [layout]');
        console.log('');
        console.log('Arguments:');
        console.log('  script    - Script name (currently only "trouble-brewing" supported)');
        console.log('  grimoire  - Single-line grimoire format: [Player1:role1 Player2:role2 ...]');
        console.log('  layout    - Layout selector (default: "auto")');
        console.log('              - "auto": Automatic dense layout optimization');
        console.log('              - "squariness": Squareness-based optimal layout selection');
        console.log('');
        console.log('Examples:');
        console.log('  node examples/render-grimoire.js trouble-brewing "[Alice:washerwoman Bob:imp]"');
        console.log('  node examples/render-grimoire.js trouble-brewing "[Alice:washerwoman(ww:townsfolk) Bob:librarian *Charlie:imp*]" squariness');
        console.log('  node examples/render-grimoire.js trouble-brewing "[Alice:investigator Bob:chef Charlie:empath Dave:librarian Eve:butler *Frank:imp*]"');
        process.exit(1);
    }
    
    const [scriptName, grimoireInput, layoutSelector = 'auto'] = args;
    
    // Validate script name
    if (scriptName !== 'trouble-brewing') {
        console.error('❌ Error: Only "trouble-brewing" script is currently supported');
        process.exit(1);
    }
    
    // Validate layout selector
    const validLayouts = ['auto', 'squariness'];
    if (!validLayouts.includes(layoutSelector)) {
        console.error(`❌ Error: Invalid layout selector "${layoutSelector}". Valid options: ${validLayouts.join(', ')}`);
        process.exit(1);
    }
    
    try {
        console.log('🎭 Rendering grimoire from single-line format...\n');
        console.log(`Script: ${scriptName}`);
        console.log(`Layout: ${layoutSelector}`);
        console.log(`Input: ${grimoireInput}\n`);
        
        // Parse the grimoire from single-line format
        const grimoire = parseGrimoireFromSingleLine(grimoireInput);
        console.log(`✅ Parsed ${grimoire.players.length} players successfully`);
        
        // Create validator instance (automatically registers roles)
        const initStart = Date.now();
        const validator = new BOTCValidator();
        console.log(`[${Date.now() - initStart}ms] BOTCValidator initialized`);
        
        // Configure render options based on layout selector
        let renderOptions;
        switch (layoutSelector) {
            case 'auto':
                renderOptions = {
                    mode: 'auto',
                    showColumnNumbers: false,
                    useAbbreviations: true
                };
                break;
            case 'squariness':
                renderOptions = {
                    mode: 'squariness',
                    showColumnNumbers: false,
                    useAbbreviations: true
                };
                break;
            default:
                throw new Error(`Unsupported layout selector: ${layoutSelector}`);
        }
        
        // Render the grimoire as ASCII art
        console.log('\n📜 ASCII Grimoire Rendering:');
        console.log('─'.repeat(60));
        const renderStart = Date.now();
        const asciiArt = validator.renderGrimoireAscii(grimoire, renderOptions);
        console.log(`[${Date.now() - renderStart}ms] ASCII rendering completed`);
        console.log(asciiArt);
        console.log('─'.repeat(60));
        
        // Show additional information
        console.log('\n📊 Grimoire Summary:');
        const alivePlayers = grimoire.players.filter(p => p.alive);
        const deadPlayers = grimoire.players.filter(p => !p.alive);
        const playersWithTokens = grimoire.players.filter(p => p.tokens.length > 0);
        
        console.log(`  Total players: ${grimoire.players.length}`);
        console.log(`  Alive: ${alivePlayers.length}`);
        console.log(`  Dead: ${deadPlayers.length}`);
        console.log(`  Players with tokens: ${playersWithTokens.length}`);
        
        if (playersWithTokens.length > 0) {
            console.log('\n🎯 Active Tokens:');
            playersWithTokens.forEach(player => {
                console.log(`  ${player.name}: ${player.tokens.join(', ')}`);
            });
        }
        
        console.log('\n✅ Rendering complete!');
        console.log(`[${Date.now() - startTime}ms] Total execution time`);
        
    } catch (error) {
        console.error('❌ Error rendering grimoire:');
        if (error.message) {
            console.error(`   ${error.message}`);
        } else {
            console.error('   Unknown error occurred');
        }
        
        // Show helpful hints for common errors
        if (error.message && error.message.includes('No grimoire found')) {
            console.error('\n💡 Hint: Make sure your grimoire is wrapped in square brackets: [Player1:role1 Player2:role2]');
        } else if (error.message && error.message.includes('Missing')) {
            console.error('\n💡 Hint: Check your single-line format syntax. Expected format: [Name:role Name2:role2]');
        } else if (error.message && error.message.includes('Unknown role')) {
            console.error('\n💡 Hint: Make sure all role names are valid Trouble Brewing roles');
        }
        
        process.exit(1);
    }
}

run().catch(console.error);