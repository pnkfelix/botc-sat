// Example conversation tree definitions for key BOTC roles
// Demonstrates template strings, variable binding, and tree structure

import { 
    TransactionSchema, 
    RoleWithTransactions, 
    TemplateParser, 
    CommonDomains 
} from '../core/conversation-tree';

// Washerwoman: Information gathering with two players and a role
const washerwomanTransaction: TransactionSchema = {
    roleId: 'washerwoman',
    transactionId: 'n1_information',
    description: 'Washerwoman learns information about a Townsfolk on first night',
    phase: 'N1',
    frequency: 'once_per_game',
    initiator: 'storyteller',
    
    domains: new Map([
        ['player1', CommonDomains.anyPlayer],
        ['player2', CommonDomains.anyPlayer], 
        ['townsfolk_role', CommonDomains.townsfolkRole]
    ]),
    
    rootNode: {
        template: TemplateParser.parseTemplate('Wake up. You see that one of {player1} or {player2} is the {townsfolk_role := chosen_townsfolk}.'),
        type: 'st-message',
        nodeId: 'wake_and_inform',
        
        'player-response': [
            {
                template: TemplateParser.parseTemplate('I understand. {player1} or {player2} is the {$townsfolk_role}.'),
                type: 'player-message',
                nodeId: 'acknowledge_info',
                
                'st-response': [
                    {
                        template: TemplateParser.parseTemplate('Go back to sleep.'),
                        type: 'st-message',
                        nodeId: 'end_interaction',
                        isTerminal: true
                    }
                ]
            }
        ]
    },
    
    prerequisites: {
        requiresSoberAndHealthy: true,
        requiresAlive: true
    }
};

// Fortune Teller: Player-initiated action with multiple possible outcomes
const fortuneTellerTransaction: TransactionSchema = {
    roleId: 'fortune_teller',
    transactionId: 'divine_players',
    description: 'Fortune Teller chooses two players to divine for demon status',
    phase: 'NIGHT',
    frequency: 'once_per_night',
    initiator: 'player',
    
    domains: new Map([
        ['target1', CommonDomains.anyPlayer],
        ['target2', CommonDomains.anyPlayer],
        ['demon_result', CommonDomains.yesNoAnswer]
    ]),
    
    rootNode: {
        template: TemplateParser.parseTemplate('I choose to divine {target1} and {target2}.'),
        type: 'player-message',
        nodeId: 'choose_targets',
        
        'st-response': [
            {
                template: TemplateParser.parseTemplate('Yes, one of them is a Demon.'),
                type: 'st-message',
                nodeId: 'demon_present',
                
                'player-response': [
                    {
                        template: TemplateParser.parseTemplate('Thank you.'),
                        type: 'player-message',
                        nodeId: 'acknowledge_yes',
                        isTerminal: true
                    }
                ]
            },
            {
                template: TemplateParser.parseTemplate('No, neither of them is a Demon.'),
                type: 'st-message', 
                nodeId: 'no_demon',
                
                'player-response': [
                    {
                        template: TemplateParser.parseTemplate('Thank you.'),
                        type: 'player-message',
                        nodeId: 'acknowledge_no',
                        isTerminal: true
                    }
                ]
            }
        ]
    },
    
    prerequisites: {
        requiresSoberAndHealthy: true,
        requiresAlive: true
    }
};

// Slayer: Public day action with conditional outcomes
const slayerTransaction: TransactionSchema = {
    roleId: 'slayer',
    transactionId: 'shoot_at_player',
    description: 'Slayer publicly attempts to shoot the demon',
    phase: 'EVENING',
    frequency: 'once_per_game',
    initiator: 'player',
    
    domains: new Map([
        ['target', CommonDomains.alivePlayer]
    ]),
    
    rootNode: {
        template: TemplateParser.parseTemplate('I use my Slayer ability to shoot at {target}.'),
        type: 'player-message',
        nodeId: 'declare_shot',
        
        'st-response': [
            {
                template: TemplateParser.parseTemplate('{target} was the Demon and dies immediately.'),
                type: 'st-message',
                nodeId: 'successful_shot',
                
                'player-response': [
                    {
                        template: TemplateParser.parseTemplate('Good shot! I lose my ability.'),
                        type: 'player-message',
                        nodeId: 'celebrate_success',
                        isTerminal: true
                    }
                ]
            },
            {
                template: TemplateParser.parseTemplate('{target} was not the Demon. You die for using your ability incorrectly.'),
                type: 'st-message',
                nodeId: 'failed_shot',
                
                'player-response': [
                    {
                        template: TemplateParser.parseTemplate('I die. My ability is lost.'),
                        type: 'player-message', 
                        nodeId: 'accept_death',
                        isTerminal: true
                    }
                ]
            }
        ]
    },
    
    prerequisites: {
        requiresSoberAndHealthy: true,
        requiresAlive: true
    }
};

// Monk: Night protection with constraint example
const monkTransaction: TransactionSchema = {
    roleId: 'monk',
    transactionId: 'protect_player',
    description: 'Monk protects another player from the demon',
    phase: 'NIGHT',
    frequency: 'once_per_night',
    initiator: 'storyteller',
    
    domains: new Map([
        ['target', { ...CommonDomains.alivePlayer, playerFilter: 'not_self' as const }]
    ]),
    
    rootNode: {
        template: TemplateParser.parseTemplate('Wake up. Choose a player to protect tonight (not yourself).'),
        type: 'st-message',
        nodeId: 'wake_for_protection',
        
        'player-response': [
            {
                template: TemplateParser.parseTemplate('I choose to protect {target}.'),
                type: 'player-message',
                nodeId: 'choose_protection_target',
                
                'st-response': [
                    {
                        template: TemplateParser.parseTemplate('{target} is safe from the Demon tonight. Go back to sleep.'),
                        type: 'st-message',
                        nodeId: 'confirm_protection',
                        isTerminal: true
                    }
                ]
            }
        ]
    },
    
    prerequisites: {
        requiresSoberAndHealthy: true,
        requiresAlive: true
    }
};

// Virgin: Event-triggered passive ability with complex branching
const virginTransaction: TransactionSchema = {
    roleId: 'virgin',
    transactionId: 'nomination_trigger',
    description: 'Virgin passive ability when nominated',
    phase: 'EVENING',
    frequency: 'once_per_game',
    initiator: 'storyteller',
    
    domains: new Map([
        ['nominator', CommonDomains.anyPlayer],
        ['nominator_type', { type: 'ChoiceOfRole' as const }]
    ]),
    
    rootNode: {
        template: TemplateParser.parseTemplate('{nominator} has nominated you. {nominator_type := nominator_role} nominates the Virgin.'),
        type: 'st-message',
        nodeId: 'nomination_occurs',
        
        'player-response': [
            {
                template: TemplateParser.parseTemplate('I am the Virgin and this is my first nomination.'),
                type: 'player-message',
                nodeId: 'claim_virgin_ability',
                
                'st-response': [
                    {
                        template: TemplateParser.parseTemplate('The nominator was a Townsfolk. {nominator} is executed immediately.'),
                        type: 'st-message',
                        nodeId: 'townsfolk_nominator',
                        
                        'player-response': [
                            {
                                template: TemplateParser.parseTemplate('My Virgin ability is now used up.'),
                                type: 'player-message',
                                nodeId: 'lose_virgin_ability',
                                isTerminal: true
                            }
                        ]
                    },
                    {
                        template: TemplateParser.parseTemplate('The nominator was not a Townsfolk. Nothing happens, but your ability is used up.'),
                        type: 'st-message',
                        nodeId: 'non_townsfolk_nominator',
                        
                        'player-response': [
                            {
                                template: TemplateParser.parseTemplate('My Virgin ability is now used up.'),
                                type: 'player-message',
                                nodeId: 'lose_virgin_ability_safely',
                                isTerminal: true
                            }
                        ]
                    }
                ]
            }
        ]
    },
    
    prerequisites: {
        requiresAlive: true
    }
};

// Export example roles with their transaction schemas
export const exampleRoles: RoleWithTransactions[] = [
    {
        roleId: 'washerwoman',
        name: 'Washerwoman',
        type: 'Townsfolk',
        transactions: [washerwomanTransaction],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        roleId: 'fortune_teller',
        name: 'Fortune Teller',
        type: 'Townsfolk',
        transactions: [fortuneTellerTransaction],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        roleId: 'slayer',
        name: 'Slayer',
        type: 'Townsfolk',
        transactions: [slayerTransaction],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        roleId: 'monk',
        name: 'Monk',
        type: 'Townsfolk',
        transactions: [monkTransaction],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        roleId: 'virgin',
        name: 'Virgin',
        type: 'Townsfolk',
        transactions: [virginTransaction],
        edition: 'Trouble Brewing',
        complexity: 1
    }
];

// Validation examples
export function validateExampleRoles(): void {
    console.log('Validating conversation tree examples...');
    
    for (const role of exampleRoles) {
        console.log(`\nValidating ${role.name}:`);
        
        for (const transaction of role.transactions) {
            const errors = TemplateParser.validateVariableFlow(transaction);
            
            if (errors.length === 0) {
                console.log(`  ✅ ${transaction.transactionId}: Valid`);
            } else {
                console.log(`  ❌ ${transaction.transactionId}: Errors found:`);
                for (const error of errors) {
                    console.log(`    - ${error}`);
                }
            }
        }
    }
}