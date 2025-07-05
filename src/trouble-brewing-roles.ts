// Trouble Brewing roles with their bag legality effects
import { Role, registerRole } from './roles';

// Roles that affect bag composition during setup

// Baron: "There are extra Outsiders in play."
// Setup: Remove 2 Townsfolk, add 2 Outsiders
const baron: Role = {
    id: 'baron',
    name: 'Baron',
    type: 'Minion',
    englishText: 'There are extra Outsiders in play. [+2 Outsiders]',
    bagConstraints: [{
        description: 'Baron adds 2 Outsiders and removes 2 Townsfolk from setup',
        type: 'count_modification',
        countMod: {
            triggerRole: 'baron',
            bagDelta: { Outsider: 2, Townsfolk: -2 },
            playDelta: { Outsider: 2, Townsfolk: -2 }
        }
    }],
    edition: 'Trouble Brewing',
    complexity: 1
};

// Drunk: "You do not know you are the Drunk. You think you are a Townsfolk character, but you are not."
// Setup: Physical bag has Townsfolk token, but player is actually Outsider
const drunk: Role = {
    id: 'drunk',
    name: 'Drunk',
    type: 'Outsider',
    englishText: 'You do not know you are the Drunk. You think you are a Townsfolk character, but you are not.',
    bagConstraints: [{
        description: 'Drunk draws a Townsfolk token but is actually an Outsider',
        type: 'role_substitution',
        substitution: {
            triggerRole: 'drunk',
            tokenType: 'Townsfolk',
            actualType: 'Outsider'
        }
    }],
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
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'librarian',
        name: 'Librarian', 
        type: 'Townsfolk',
        englishText: 'You start knowing that 1 of 2 players is a particular Outsider, or that zero Outsiders are in play.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'investigator',
        name: 'Investigator',
        type: 'Townsfolk', 
        englishText: 'You start knowing that 1 of 2 players is a particular Minion.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'chef',
        name: 'Chef',
        type: 'Townsfolk',
        englishText: 'You start knowing how many pairs of evil players there are.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'empath',
        name: 'Empath',
        type: 'Townsfolk',
        englishText: 'Each night, you learn how many of your 2 alive neighbours are evil.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'fortune_teller',
        name: 'Fortune Teller',
        type: 'Townsfolk',
        englishText: 'Each night, choose 2 players: you learn if either is a Demon. There is a good player that registers as a Demon to you.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'undertaker',
        name: 'Undertaker',
        type: 'Townsfolk',
        englishText: 'Each night*, you learn which character died by execution today.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'monk',
        name: 'Monk',
        type: 'Townsfolk',
        englishText: 'Each night*, choose a player (not yourself): they are safe from the Demon tonight.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'ravenkeeper',
        name: 'Ravenkeeper',
        type: 'Townsfolk',
        englishText: 'If you die at night, you are woken to choose a player: you learn their character.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'virgin',
        name: 'Virgin',
        type: 'Townsfolk',
        englishText: 'The 1st time you are nominated, if the nominator is a Townsfolk, they are executed immediately.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'slayer',
        name: 'Slayer',
        type: 'Townsfolk',
        englishText: 'Once per game, during the day, publicly choose a player: if they are the Demon, they die.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'soldier',
        name: 'Soldier',
        type: 'Townsfolk',
        englishText: 'You are safe from the Demon.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'mayor',
        name: 'Mayor',
        type: 'Townsfolk',
        englishText: 'If only 3 players live & no execution occurs, your team wins. If you die at night, another player might die instead.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 2
    },
    
    // Outsiders
    {
        id: 'butler',
        name: 'Butler',
        type: 'Outsider',
        englishText: 'Each night, choose a player (not yourself): tomorrow, you may only vote if they are voting too.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'recluse',
        name: 'Recluse',
        type: 'Outsider',
        englishText: 'You might register as evil & as a Minion or Demon, even if dead.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'saint',
        name: 'Saint',
        type: 'Outsider',
        englishText: 'If you die by execution, your team loses.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    
    // Minions
    {
        id: 'poisoner',
        name: 'Poisoner',
        type: 'Minion',
        englishText: 'Each night, choose a player: they are poisoned tonight and tomorrow day.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 1
    },
    {
        id: 'spy',
        name: 'Spy',
        type: 'Minion',
        englishText: 'Each night, you see the Grimoire. You might register as good & as a Townsfolk or Outsider, even if dead.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 2
    },
    {
        id: 'scarlet_woman',
        name: 'Scarlet Woman',
        type: 'Minion',
        englishText: 'If there are 5 or more players alive & the Demon dies, you become the Demon.',
        bagConstraints: [],
        edition: 'Trouble Brewing',
        complexity: 2
    },
    
    // Demons
    {
        id: 'imp',
        name: 'Imp',
        type: 'Demon',
        englishText: 'Each night*, choose a player: they die. If you kill yourself this way, a Minion becomes the Imp.',
        bagConstraints: [],
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