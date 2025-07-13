// Generate grimoire examples using the existing bag generator

import { BagLegalityValidator } from '../core/bag-compiler';
import { troubleBrewing } from '../core/scripts';
import { GrimoireState, PlayerState } from '../core/grimoire';

interface GrimoireExample {
    name: string;
    description: string;
    grimoire: GrimoireState;
    expectedSingleLine: string;
}

/**
 * Create player names for the given count
 */
function createPlayerNames(count: number): string[] {
    const names = [
        "Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace", "Hannah", 
        "Ian", "Julia", "Kate", "Leo", "Mary", "Nick", "Olivia"
    ];
    return names.slice(0, count);
}

/**
 * Create expected single-line format for a grimoire
 */
function createExpectedSingleLine(grimoire: GrimoireState): string {
    const playerEntries = grimoire.players.map(player => {
        let entry = '';
        
        // Handle dead players
        if (!player.alive) {
            if (player.ghost) {
                // Dead with ghost vote available
                entry += `*${player.name}:${player.role}`;
            } else {
                // Dead with used ghost vote (struck out)
                entry += `*~~${player.name}~~:${player.role}`;
            }
        } else {
            // Living player
            entry += `${player.name}:${player.role}`;
        }
        
        // Add tokens if present
        if (player.tokens.length > 0) {
            entry += `(${player.tokens.join(',')})`;
        }
        
        // Close dead player markers
        if (!player.alive) {
            entry += '*';
        }
        
        return entry;
    });
    
    return `[${playerEntries.join(' ')}]`;
}

/**
 * Generate a legal bag for the given player count
 */
async function generateLegalBag(playerCount: number): Promise<string[]> {
    const validator = new BagLegalityValidator();
    const script = troubleBrewing;
    
    const result = await validator.generateLegalBag(script, playerCount);
    if (!result.success) {
        throw new Error(`Failed to generate legal bag for ${playerCount} players`);
    }
    
    return result.selectedRoles || [];
}

/**
 * Create a basic grimoire from a legal bag (all players alive, no tokens)
 */
function createBasicGrimoire(roles: string[], playerNames: string[]): GrimoireState {
    const players: PlayerState[] = roles.map((role, index) => ({
        name: playerNames[index],
        role,
        alive: true,
        position: index,
        tokens: [],
        ghost: false
    }));

    return { players };
}

/**
 * Add realistic reminder tokens based on roles
 */
function addRealisticTokens(grimoire: GrimoireState): GrimoireState {
    const result = JSON.parse(JSON.stringify(grimoire)) as GrimoireState;
    
    result.players.forEach(player => {
        switch (player.role) {
            case 'washerwoman':
                player.tokens.push('washerwoman:townsfolk');
                break;
            case 'librarian':
                player.tokens.push('librarian:outsider');
                break;
            case 'investigator':
                player.tokens.push('investigator:minion');
                break;
            case 'drunk':
                player.tokens.push('drunk:is_the_drunk');
                break;
            case 'fortune_teller':
                player.tokens.push('fortune_teller:red_herring');
                break;
            case 'poisoner':
                // Poisoner might have poisoned someone else
                const target = result.players.find(p => p.name !== player.name && p.role !== 'poisoner');
                if (target) {
                    target.tokens.push('poisoner:poisoned');
                }
                break;
            case 'monk':
                // Monk might have protected someone
                const protectedTarget = result.players.find(p => p.name !== player.name && p.role !== 'monk');
                if (protectedTarget) {
                    protectedTarget.tokens.push('monk:safe');
                }
                break;
        }
    });
    
    return result;
}

/**
 * Create variations with deaths and ghost votes
 */
function addDeathVariations(grimoire: GrimoireState): GrimoireState {
    const result = JSON.parse(JSON.stringify(grimoire)) as GrimoireState;
    const playerCount = result.players.length;
    
    if (playerCount >= 6) {
        // Kill 1-2 players depending on game size
        const deathCount = playerCount >= 8 ? 2 : 1;
        
        for (let i = 0; i < deathCount && i + 1 < result.players.length; i++) {
            const playerIndex = i + 1; // Don't kill player 0
            result.players[playerIndex].alive = false;
            
            // Mix of ghost votes available vs used
            result.players[playerIndex].ghost = i % 2 === 0;
            
            // Add death-related tokens
            if (result.players[playerIndex].role === 'imp') {
                result.players[playerIndex].tokens.push('imp:dead');
            }
        }
    }
    
    return result;
}

export async function runGrimoireExamplesTest(): Promise<void> {
    console.log('\n=== GENERATING GRIMOIRE EXAMPLES ===\n');
    
    const examples: GrimoireExample[] = [];
    
    for (let playerCount = 5; playerCount <= 15; playerCount++) {
        try {
            console.log(`Generating ${playerCount}-player examples...`);
            
            // Generate a legal bag
            const roles = await generateLegalBag(playerCount);
            const playerNames = createPlayerNames(playerCount);
            
            console.log(`  Legal roles: ${roles.join(', ')}`);
            
            // Create basic grimoire
            const basicGrimoire = createBasicGrimoire(roles, playerNames);
            
            // 1. Basic all-alive version
            const basicExample: GrimoireExample = {
                name: `${playerCount}-player basic`,
                description: `Legal ${playerCount}-player setup: ${roles.join(', ')}`,
                grimoire: basicGrimoire,
                expectedSingleLine: createExpectedSingleLine(basicGrimoire)
            };
            examples.push(basicExample);
            console.log(`    Basic: ${basicExample.expectedSingleLine}`);
            
            // 2. Version with reminder tokens
            const withTokens = addRealisticTokens(basicGrimoire);
            const tokensExample: GrimoireExample = {
                name: `${playerCount}-player with tokens`,
                description: `${playerCount}-player game with reminder tokens`,
                grimoire: withTokens,
                expectedSingleLine: createExpectedSingleLine(withTokens)
            };
            examples.push(tokensExample);
            console.log(`    Tokens: ${tokensExample.expectedSingleLine}`);
            
            // 3. Version with deaths (if enough players)
            if (playerCount >= 6) {
                const withDeaths = addDeathVariations(addRealisticTokens(basicGrimoire));
                const deathsExample: GrimoireExample = {
                    name: `${playerCount}-player with deaths`,
                    description: `${playerCount}-player game with mixed death/ghost vote states`,
                    grimoire: withDeaths,
                    expectedSingleLine: createExpectedSingleLine(withDeaths)
                };
                examples.push(deathsExample);
                console.log(`    Deaths: ${deathsExample.expectedSingleLine}`);
            }
            
            console.log('');
            
        } catch (error) {
            console.error(`Failed to generate ${playerCount}-player example:`, error);
        }
    }
    
    console.log(`\n=== SUMMARY: Generated ${examples.length} grimoire examples ===\n`);
    
    // Display a few interesting examples
    console.log('SAMPLE EXAMPLES:\n');
    
    const samples = [
        examples.find(e => e.name === '5-player basic'),
        examples.find(e => e.name === '7-player with tokens'),
        examples.find(e => e.name === '10-player with deaths'),
        examples.find(e => e.name === '15-player with tokens')
    ].filter(Boolean);
    
    samples.forEach((example, index) => {
        if (example) {
            console.log(`${index + 1}. ${example.name}`);
            console.log(`   ${example.description}`);
            console.log(`   Expected: ${example.expectedSingleLine}\n`);
        }
    });
}