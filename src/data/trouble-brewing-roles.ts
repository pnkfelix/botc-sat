// Trouble Brewing roles with their bag legality effects
import { Role, registerRole } from '../core/roles';

// Roles that affect bag composition during setup

// Baron: "There are extra Outsiders in play."
// Setup: Remove 2 Townsfolk, add 2 Outsiders
const baron: Role = {
    id: 'baron',
    name: 'Baron',
    type: 'Minion',
    englishText: 'There are extra Outsiders in play. [+2 Outsiders]',
    suggestedAbbreviation: 'bar',
    constraints: [
        {
            type: 'count_modification',
            target: 'townsfolk',
            delta: -2
        },
        {
            type: 'count_modification', 
            target: 'outsider',
            delta: 2
        }
    ],
    edition: 'Trouble Brewing',
    complexity: 1
};

// Drunk: "You do not know you are the Drunk. You think you are a Townsfolk character, but you are not."
// Setup: Physical bag has Townsfolk token, but player is actually Outsider  
// Note: Drunk doesn't affect in-play distribution, just physical bag tokens
const drunk: Role = {
    id: 'drunk',
    name: 'Drunk',
    type: 'Outsider',
    englishText: 'You do not know you are the Drunk. You think you are a Townsfolk character, but you are not.',
    suggestedAbbreviation: 'dr',
    reminderTokens: ['is_the_drunk'],
    tokenConstraints: [
        {
            description: 'Drunk is_the_drunk token can only be placed on townsfolk players',
            type: 'only_on_role_type',
            token: 'is_the_drunk',
            onlyOnRoleType: { roleType: 'Townsfolk' }
        },
        {
            description: 'Drunk tokens require drunk to be present',
            type: 'requires_role_present',
            token: 'is_the_drunk',
            requiresRole: { roleId: 'drunk' }
        }
    ],
    constraints: [
        {
            type: 'physical_bag_substitution',
            fromType: 'outsider',  // Drunk token is replaced
            toType: 'townsfolk'    // With a Townsfolk token in physical bag
        }
    ],
    edition: 'Trouble Brewing',
    complexity: 2
};

// Roles with no setup effects (most Trouble Brewing roles)
const simpleRoles: Role[] = [
    // Townsfolk
    {
        id: 'washerwoman',
        name: 'Washerwoman',
        type: 'Townsfolk',
        englishText: 'You start knowing that 1 of 2 players is a particular Townsfolk.',
        suggestedAbbreviation: 'ww',
        reminderTokens: ['townsfolk', 'wrong'],
        tokenConstraints: [
            {
                description: 'Washerwoman tokens require washerwoman to be present',
                type: 'requires_role_present',
                token: 'townsfolk',
                requiresRole: { roleId: 'washerwoman' }
            },
            {
                description: 'Washerwoman tokens require washerwoman to be present',
                type: 'requires_role_present',
                token: 'wrong',
                requiresRole: { roleId: 'washerwoman' }
            },
            {
                description: 'Washerwoman tokens are information and can be placed anywhere',
                type: 'information_token',
                token: 'townsfolk',
                informationToken: {}
            },
            {
                description: 'Washerwoman tokens are information and can be placed anywhere',
                type: 'information_token',
                token: 'wrong',
                informationToken: {}
            },
            {
                description: 'Washerwoman presence requires townsfolk token to be placed',
                type: 'role_requires_token',
                token: 'townsfolk',
                roleRequiresToken: { roleId: 'washerwoman' }
            },
            {
                description: 'Washerwoman presence requires wrong token to be placed',
                type: 'role_requires_token',
                token: 'wrong',
                roleRequiresToken: { roleId: 'washerwoman' }
            }
        ],
        constraints: [],
        abilityType: 'one_time_automatic',
        abilityTiming: 'night_1',
        abilityConstraints: {
            requires_sober_and_healthy: true,
            learns_information: true,
            places_persistent_tokens: true
        },
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'librarian',
        name: 'Librarian', 
        type: 'Townsfolk',
        englishText: 'You start knowing that 1 of 2 players is a particular Outsider, or that zero Outsiders are in play.',
        suggestedAbbreviation: 'lib',
        reminderTokens: ['outsider', 'wrong'],
        tokenConstraints: [
            {
                description: 'Librarian tokens require librarian to be present',
                type: 'requires_role_present',
                token: 'outsider',
                requiresRole: { roleId: 'librarian' }
            },
            {
                description: 'Librarian tokens require librarian to be present',
                type: 'requires_role_present',
                token: 'wrong',
                requiresRole: { roleId: 'librarian' }
            },
            {
                description: 'Librarian tokens are information and can be placed anywhere',
                type: 'information_token',
                token: 'outsider',
                informationToken: {}
            },
            {
                description: 'Librarian tokens are information and can be placed anywhere',
                type: 'information_token',
                token: 'wrong',
                informationToken: {}
            },
            {
                description: 'Librarian presence requires outsider token to be placed',
                type: 'role_requires_token',
                token: 'outsider',
                roleRequiresToken: { roleId: 'librarian' }
            },
            {
                description: 'Librarian presence requires wrong token to be placed',
                type: 'role_requires_token',
                token: 'wrong',
                roleRequiresToken: { roleId: 'librarian' }
            }
        ],
        constraints: [],
        abilityType: 'one_time_automatic',
        abilityTiming: 'night_1',
        abilityConstraints: {
            requires_sober_and_healthy: true,
            learns_information: true,
            places_persistent_tokens: true
        },
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'investigator',
        name: 'Investigator',
        type: 'Townsfolk', 
        englishText: 'You start knowing that 1 of 2 players is a particular Minion.',
        suggestedAbbreviation: 'inv',
        reminderTokens: ['minion', 'wrong'],
        tokenConstraints: [
            {
                description: 'Investigator tokens require investigator to be present',
                type: 'requires_role_present',
                token: 'minion',
                requiresRole: { roleId: 'investigator' }
            },
            {
                description: 'Investigator tokens require investigator to be present',
                type: 'requires_role_present',
                token: 'wrong',
                requiresRole: { roleId: 'investigator' }
            },
            {
                description: 'Investigator tokens are information and can be placed anywhere',
                type: 'information_token',
                token: 'minion',
                informationToken: {}
            },
            {
                description: 'Investigator tokens are information and can be placed anywhere',
                type: 'information_token',
                token: 'wrong',
                informationToken: {}
            },
            {
                description: 'Investigator presence requires minion token to be placed',
                type: 'role_requires_token',
                token: 'minion',
                roleRequiresToken: { roleId: 'investigator' }
            },
            {
                description: 'Investigator presence requires wrong token to be placed',
                type: 'role_requires_token',
                token: 'wrong',
                roleRequiresToken: { roleId: 'investigator' }
            }
        ],
        constraints: [],
        abilityType: 'one_time_automatic',
        abilityTiming: 'night_1',
        abilityConstraints: {
            requires_sober_and_healthy: true,
            learns_information: true,
            places_persistent_tokens: true
        },
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'chef',
        name: 'Chef',
        type: 'Townsfolk',
        englishText: 'You start knowing how many pairs of evil players there are.',
        suggestedAbbreviation: 'ch',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'empath',
        name: 'Empath',
        type: 'Townsfolk',
        englishText: 'Each night, you learn how many of your 2 alive neighbours are evil.',
        suggestedAbbreviation: 'em',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'fortune_teller',
        name: 'Fortune Teller',
        type: 'Townsfolk',
        englishText: 'Each night, choose 2 players: you learn if either is a Demon. There is a good player that registers as a Demon to you.',
        suggestedAbbreviation: 'ft',
        reminderTokens: ['red_herring'],
        tokenConstraints: [
            {
                description: 'Fortune Teller red_herring token can only be placed on good players',
                type: 'only_on_role_type',
                token: 'red_herring',
                onlyOnRoleType: { roleType: 'good' }
            },
            {
                description: 'Fortune Teller tokens require fortune teller to be present',
                type: 'requires_role_present',
                token: 'red_herring',
                requiresRole: { roleId: 'fortune_teller' }
            }
        ],
        actions: [
            {
                description: 'Fortune Teller divines two players each night to learn if either is demon',
                actionName: 'fortune_teller:divine',
                parameters: [
                    { name: 'target1', type: 'player' },
                    { name: 'target2', type: 'player' }
                ],
                timing: {
                    phase: 'NIGHT',
                    frequency: 'once_per_night'
                },
                visibility: 'private',
                effects: [
                    {
                        description: 'Learn yes/no if either target is demon (accounting for red herring)',
                        type: 'learns_information',
                        informationLearned: {
                            type: 'yes_no',
                            about: 'demon_status'
                        }
                    }
                ],
                prerequisites: {
                    requiresSoberAndHealthy: true,
                    requiresAlive: true
                }
            }
        ],
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'undertaker',
        name: 'Undertaker',
        type: 'Townsfolk',
        englishText: 'Each night*, you learn which character died by execution today.',
        reminderTokens: ['died_today'],
        tokenConstraints: [
            {
                description: 'Undertaker tokens require undertaker to be present',
                type: 'requires_role_present',
                token: 'died_today',
                requiresRole: { roleId: 'undertaker' }
            },
            {
                description: 'Undertaker tokens are information and can be placed anywhere',
                type: 'information_token',
                token: 'died_today',
                informationToken: {}
            }
        ],
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'monk',
        name: 'Monk',
        type: 'Townsfolk',
        englishText: 'Each night*, choose a player (not yourself): they are safe from the Demon tonight.',
        reminderTokens: ['safe'],
        tokenConstraints: [
            {
                description: 'Monk tokens require monk to be present',
                type: 'requires_role_present',
                token: 'safe',
                requiresRole: { roleId: 'monk' }
            },
            {
                description: 'Monk tokens are information and can be placed anywhere',
                type: 'information_token',
                token: 'safe',
                informationToken: {}
            }
        ],
        actions: [
            {
                description: 'Monk can protect a player each night except the first night',
                actionName: 'monk:protect',
                parameters: [
                    { name: 'target', type: 'player' }
                ],
                timing: {
                    phase: 'NIGHT',
                    frequency: 'once_per_night',
                    excludeFirstNight: true
                },
                visibility: 'private',
                effects: [
                    {
                        description: 'Target becomes safe from demon tonight',
                        type: 'places_token',
                        tokenToPlace: 'monk:safe',
                        tokenTarget: 'target'
                    }
                ],
                prerequisites: {
                    requiresSoberAndHealthy: true,
                    requiresAlive: true
                    // customCondition: 'target !== actor' // Cannot protect self // TODO: Not implemented - string conditions not evaluated by SAT compiler  
                }
            }
        ],
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'ravenkeeper',
        name: 'Ravenkeeper',
        type: 'Townsfolk',
        englishText: 'If you die at night, you are woken to choose a player: you learn their character.',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'virgin',
        name: 'Virgin',
        type: 'Townsfolk',
        englishText: 'The 1st time you are nominated, if the nominator is a Townsfolk, they are executed immediately.',
        reminderTokens: ['no_ability'],
        tokenConstraints: [
            {
                description: 'Virgin no_ability token can only be placed on the virgin',
                type: 'only_on_role',
                token: 'no_ability',
                onlyOnRole: { roleId: 'virgin' }
            },
            {
                description: 'Virgin tokens require virgin to be present',
                type: 'requires_role_present', 
                token: 'no_ability',
                requiresRole: { roleId: 'virgin' }
            }
        ],
        actions: [
            {
                description: 'Virgin passive effect: if nominated by Townsfolk, nominator is executed',
                actionName: 'virgin:nomination_trigger', 
                parameters: [],
                timing: {
                    phase: 'on_trigger',
                    frequency: 'once_per_game',
                    trigger: 'on_nomination'
                },
                visibility: 'public',
                effects: [
                    {
                        description: 'If nominator is Townsfolk, execute nominator immediately',
                        type: 'conditional',
                        // condition: 'nominator.role.type === "Townsfolk"', // TODO: Not implemented - string conditions not evaluated by SAT compiler
                        executionTarget: 'nominator'
                    },
                    {
                        description: 'Virgin loses ability after first nomination',
                        type: 'places_token',
                        tokenToPlace: 'virgin:no_ability',
                        tokenTarget: 'actor'
                    }
                ],
                prerequisites: {
                    requiresAlive: true
                }
            }
        ],
        constraints: [],
        abilityType: 'one_time_event_triggered',
        abilityTiming: 'day',
        abilityConstraints: {
            triggered_by_event: 'nomination',
            places_persistent_tokens: true
        },
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'slayer',
        name: 'Slayer',
        type: 'Townsfolk',
        englishText: 'Once per game, during the day, publicly choose a player: if they are the Demon, they die.',
        reminderTokens: ['no_ability'],
        tokenConstraints: [
            {
                description: 'Slayer no_ability token can only be placed on the slayer',
                type: 'only_on_role',
                token: 'no_ability',
                onlyOnRole: { roleId: 'slayer' }
            },
            {
                description: 'Slayer tokens require slayer to be present',
                type: 'requires_role_present',
                token: 'no_ability', 
                requiresRole: { roleId: 'slayer' }
            }
        ],
        actions: [
            {
                description: 'Slayer can shoot at a player once per game during the day',
                actionName: 'slayer:shoot_at',
                parameters: [
                    { name: 'target', type: 'player' }
                ],
                timing: {
                    phase: 'EVENING',
                    frequency: 'once_per_game'
                },
                visibility: 'public',
                effects: [
                    {
                        description: 'If target is demon, target dies',
                        type: 'conditional',
                        // condition: 'target.role.type === "demon"', // TODO: Not implemented - string conditions not evaluated by SAT compiler
                        targetDies: true
                    },
                    {
                        description: 'If target is not demon, slayer dies',
                        type: 'conditional', 
                        // condition: 'target.role.type !== "demon"', // TODO: Not implemented - string conditions not evaluated by SAT compiler
                        actorDies: true
                    },
                    {
                        description: 'Slayer loses ability after use',
                        type: 'places_token',
                        tokenToPlace: 'slayer:no_ability',
                        tokenTarget: 'actor'
                    }
                ],
                prerequisites: {
                    requiresSoberAndHealthy: true,
                    requiresAlive: true
                }
            }
        ],
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'soldier',
        name: 'Soldier',
        type: 'Townsfolk',
        englishText: 'You are safe from the Demon.',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'mayor',
        name: 'Mayor',
        type: 'Townsfolk',
        englishText: 'If only 3 players live & no execution occurs, your team wins. If you die at night, another player might die instead.',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 2
    },
    
    // Outsiders
    {
        id: 'butler',
        name: 'Butler',
        type: 'Outsider',
        englishText: 'Each night, choose a player (not yourself): tomorrow, you may only vote if they are voting too.',
        suggestedAbbreviation: 'but',
        reminderTokens: ['master'],
        tokenConstraints: [
            {
                description: 'Butler tokens require butler to be present',
                type: 'requires_role_present',
                token: 'master',
                requiresRole: { roleId: 'butler' }
            },
            {
                description: 'Butler tokens are information and can be placed anywhere',
                type: 'information_token',
                token: 'master',
                informationToken: {}
            }
        ],
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'recluse',
        name: 'Recluse',
        type: 'Outsider',
        englishText: 'You might register as evil & as a Minion or Demon, even if dead.',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'saint',
        name: 'Saint',
        type: 'Outsider',
        englishText: 'If you die by execution, your team loses.',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    
    // Minions
    {
        id: 'poisoner',
        name: 'Poisoner',
        type: 'Minion',
        englishText: 'Each night, choose a player: they are poisoned tonight and tomorrow day.',
        suggestedAbbreviation: 'poi',
        reminderTokens: ['poisoned'],
        tokenConstraints: [
            {
                description: 'Poisoner tokens require poisoner to be present',
                type: 'requires_role_present',
                token: 'poisoned',
                requiresRole: { roleId: 'poisoner' }
            },
            {
                description: 'Poisoner tokens are information and can be placed anywhere',
                type: 'information_token',
                token: 'poisoned',
                informationToken: {}
            }
        ],
        constraints: [],
        abilityType: 'recurring_nightly',
        abilityTiming: 'any_night',
        abilityConstraints: {
            affects_transient_state: true
        },
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'spy',
        name: 'Spy',
        type: 'Minion',
        englishText: 'Each night, you see the Grimoire. You might register as good & as a Townsfolk or Outsider, even if dead.',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 2
    },
    {
        id: 'scarlet_woman',
        name: 'Scarlet Woman',
        type: 'Minion',
        englishText: 'If there are 5 or more players alive & the Demon dies, you become the Demon.',
        suggestedAbbreviation: 'sw',
        reminderTokens: ['is_the_demon'],
        tokenConstraints: [
            {
                description: 'Scarlet Woman is_the_demon token can only be placed on scarlet woman',
                type: 'only_on_role',
                token: 'is_the_demon',
                onlyOnRole: { roleId: 'scarlet_woman' }
            },
            {
                description: 'Scarlet Woman tokens require scarlet woman to be present',
                type: 'requires_role_present',
                token: 'is_the_demon',
                requiresRole: { roleId: 'scarlet_woman' }
            }
        ],
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 2
    },
    
    // Demons
    {
        id: 'imp',
        name: 'Imp',
        type: 'Demon',
        englishText: 'Each night*, choose a player: they die. If you kill yourself this way, a Minion becomes the Imp.',
        suggestedAbbreviation: 'imp',
        reminderTokens: ['dead'],
        tokenConstraints: [
            {
                description: 'Imp tokens require imp to be present',
                type: 'requires_role_present',
                token: 'dead',
                requiresRole: { roleId: 'imp' }
            },
            {
                description: 'Imp tokens are information and can be placed anywhere',
                type: 'information_token',
                token: 'dead',
                informationToken: {}
            },
            {
                description: 'Imp dead token causes death at night-to-dawn transition',
                type: 'token_effect',
                token: 'dead',
                tokenEffect: {
                    effect: 'causes_death_at_dawn',
                    trigger: 'phase_transition',
                    fromPhase: 'NIGHT',
                    toPhase: 'DAWN',
                    announcement: 'public_death'
                }
            }
        ],
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    }
];

// Register all roles
/* 
// Example of a statement-based action (Gossip role from Sects & Violets)
const gossipExample: Role = {
    id: 'gossip',
    name: 'Gossip',
    type: 'Townsfolk',
    englishText: 'Each day, you may make a public statement. Tonight, if it was true, a player dies.',
    actions: [
        {
            description: 'Gossip can make a public statement that causes death if true',
            actionName: 'gossip:statement',
            parameters: [
                { name: 'statement', type: 'statement' }
            ],
            timing: {
                phase: 'EVENING',
                frequency: 'once_per_day'
            },
            visibility: 'public',
            effects: [
                {
                    description: 'If statement is true, storyteller chooses a player to die tonight',
                    type: 'conditional',
                    // condition: 'statement_is_true', // TODO: Not implemented - string conditions not evaluated by SAT compiler
                    // This would trigger storyteller choice during night phase
                    targetDies: false // Storyteller chooses target later
                }
            ],
            prerequisites: {
                requiresSoberAndHealthy: true,
                requiresAlive: true
            }
        }
    ],
    edition: 'Sects & Violets',
    complexity: 2
};
*/

export function registerTroubleBrewing(): void {
    registerRole(baron);
    registerRole(drunk);
    
    for (const role of simpleRoles) {
        registerRole(role);
    }
}

// Export key roles for easy access
export { baron, drunk };