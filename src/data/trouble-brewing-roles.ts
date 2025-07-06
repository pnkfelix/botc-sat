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
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'librarian',
        name: 'Librarian', 
        type: 'Townsfolk',
        englishText: 'You start knowing that 1 of 2 players is a particular Outsider, or that zero Outsiders are in play.',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'investigator',
        name: 'Investigator',
        type: 'Townsfolk', 
        englishText: 'You start knowing that 1 of 2 players is a particular Minion.',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'chef',
        name: 'Chef',
        type: 'Townsfolk',
        englishText: 'You start knowing how many pairs of evil players there are.',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'empath',
        name: 'Empath',
        type: 'Townsfolk',
        englishText: 'Each night, you learn how many of your 2 alive neighbours are evil.',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'fortune_teller',
        name: 'Fortune Teller',
        type: 'Townsfolk',
        englishText: 'Each night, choose 2 players: you learn if either is a Demon. There is a good player that registers as a Demon to you.',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'undertaker',
        name: 'Undertaker',
        type: 'Townsfolk',
        englishText: 'Each night*, you learn which character died by execution today.',
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'monk',
        name: 'Monk',
        type: 'Townsfolk',
        englishText: 'Each night*, choose a player (not yourself): they are safe from the Demon tonight.',
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
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'slayer',
        name: 'Slayer',
        type: 'Townsfolk',
        englishText: 'Once per game, during the day, publicly choose a player: if they are the Demon, they die.',
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
        constraints: [],
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
        constraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    }
];

// Register all roles
export function registerTroubleBrewing(): void {
    registerRole(baron);
    registerRole(drunk);
    
    for (const role of simpleRoles) {
        registerRole(role);
    }
}

// Export key roles for easy access
export { baron, drunk };