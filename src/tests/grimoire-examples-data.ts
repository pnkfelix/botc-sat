// Test data: Sample grimoires and their expected single-line renderings
// Generated from SAT-based bag generator for realistic legal role combinations
// Complete coverage: one example for each player count 5-15

import { GrimoireState } from '../core/grimoire';

export interface GrimoireExample {
    name: string;
    description: string;
    grimoire: GrimoireState;
    expectedSingleLine: string;
}

/**
 * Test cases for grimoire single-line format
 * Note: Token assignments may not be mechanically accurate - they're for format testing
 */
export const GRIMOIRE_EXAMPLES: GrimoireExample[] = [
    // 5 players: washerwoman, librarian, investigator, poisoner, imp
    {
        name: "5-player basic",
        description: "Legal 5-player setup: washerwoman, librarian, investigator, poisoner, imp",
        grimoire: {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: [], ghost: false },
                { name: "Bob", role: "librarian", alive: true, position: 1, tokens: [], ghost: false },
                { name: "Charlie", role: "investigator", alive: true, position: 2, tokens: [], ghost: false },
                { name: "Dave", role: "poisoner", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "imp", alive: true, position: 4, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:washerwoman Bob:librarian Charlie:investigator Dave:poisoner Eve:imp]"
    },

    // 6 players: washerwoman, librarian, investigator, chef, butler, imp
    {
        name: "6-player basic",
        description: "Legal 6-player setup: washerwoman, librarian, investigator, chef, butler, imp",
        grimoire: {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: [], ghost: false },
                { name: "Bob", role: "librarian", alive: true, position: 1, tokens: [], ghost: false },
                { name: "Charlie", role: "investigator", alive: true, position: 2, tokens: [], ghost: false },
                { name: "Dave", role: "chef", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "butler", alive: true, position: 4, tokens: [], ghost: false },
                { name: "Frank", role: "imp", alive: true, position: 5, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:washerwoman Bob:librarian Charlie:investigator Dave:chef Eve:butler Frank:imp]"
    },

    // 7 players: washerwoman, librarian, investigator, chef, empath, poisoner, imp
    {
        name: "7-player basic",
        description: "Legal 7-player setup: washerwoman, librarian, investigator, chef, empath, poisoner, imp",
        grimoire: {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: [], ghost: false },
                { name: "Bob", role: "librarian", alive: true, position: 1, tokens: [], ghost: false },
                { name: "Charlie", role: "investigator", alive: true, position: 2, tokens: [], ghost: false },
                { name: "Dave", role: "chef", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "empath", alive: true, position: 4, tokens: [], ghost: false },
                { name: "Frank", role: "poisoner", alive: true, position: 5, tokens: [], ghost: false },
                { name: "Grace", role: "imp", alive: true, position: 6, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:washerwoman Bob:librarian Charlie:investigator Dave:chef Eve:empath Frank:poisoner Grace:imp]"
    },

    // 8 players: washerwoman, librarian, investigator, chef, empath, butler, poisoner, imp
    {
        name: "8-player basic",
        description: "Legal 8-player setup: washerwoman, librarian, investigator, chef, empath, butler, poisoner, imp",
        grimoire: {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: [], ghost: false },
                { name: "Bob", role: "librarian", alive: true, position: 1, tokens: [], ghost: false },
                { name: "Charlie", role: "investigator", alive: true, position: 2, tokens: [], ghost: false },
                { name: "Dave", role: "chef", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "empath", alive: true, position: 4, tokens: [], ghost: false },
                { name: "Frank", role: "butler", alive: true, position: 5, tokens: [], ghost: false },
                { name: "Grace", role: "poisoner", alive: true, position: 6, tokens: [], ghost: false },
                { name: "Hannah", role: "imp", alive: true, position: 7, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:washerwoman Bob:librarian Charlie:investigator " +
                            "Dave:chef Eve:empath Frank:butler Grace:poisoner Hannah:imp]"
    },

    // 9 players: washerwoman, librarian, investigator, chef, empath, butler, drunk, poisoner, imp
    {
        name: "9-player basic", 
        description: "Legal 9-player setup: washerwoman, librarian, investigator, chef, empath, butler, drunk, poisoner, imp",
        grimoire: {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: [], ghost: false },
                { name: "Bob", role: "librarian", alive: true, position: 1, tokens: [], ghost: false },
                { name: "Charlie", role: "investigator", alive: true, position: 2, tokens: [], ghost: false },
                { name: "Dave", role: "chef", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "empath", alive: true, position: 4, tokens: [], ghost: false },
                { name: "Frank", role: "butler", alive: true, position: 5, tokens: [], ghost: false },
                { name: "Grace", role: "drunk", alive: true, position: 6, tokens: [], ghost: false },
                { name: "Hannah", role: "poisoner", alive: true, position: 7, tokens: [], ghost: false },
                { name: "Ian", role: "imp", alive: true, position: 8, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:washerwoman Bob:librarian Charlie:investigator " +
                            "Dave:chef Eve:empath Frank:butler Grace:drunk Hannah:poisoner Ian:imp]"
    },

    // 10 players: washerwoman, librarian, investigator, chef, empath, fortune_teller, undertaker, poisoner, spy, imp
    {
        name: "10-player basic",
        description: "Legal 10-player setup: washerwoman, librarian, investigator, chef, empath, fortune_teller, undertaker, poisoner, spy, imp",
        grimoire: {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: [], ghost: false },
                { name: "Bob", role: "librarian", alive: true, position: 1, tokens: [], ghost: false },
                { name: "Charlie", role: "investigator", alive: true, position: 2, tokens: [], ghost: false },
                { name: "Dave", role: "chef", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "empath", alive: true, position: 4, tokens: [], ghost: false },
                { name: "Frank", role: "fortune_teller", alive: true, position: 5, tokens: [], ghost: false },
                { name: "Grace", role: "undertaker", alive: true, position: 6, tokens: [], ghost: false },
                { name: "Hannah", role: "poisoner", alive: true, position: 7, tokens: [], ghost: false },
                { name: "Ian", role: "spy", alive: true, position: 8, tokens: [], ghost: false },
                { name: "Julia", role: "imp", alive: true, position: 9, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:washerwoman Bob:librarian Charlie:investigator " +
                            "Dave:chef Eve:empath Frank:fortune_teller Grace:undertaker Hannah:poisoner Ian:spy Julia:imp]"
    },

    // 11 players: washerwoman, librarian, investigator, chef, empath, fortune_teller, mayor, recluse, poisoner, spy, imp
    {
        name: "11-player basic",
        description: "Legal 11-player setup: washerwoman, librarian, investigator, chef, empath, fortune_teller, mayor, recluse, poisoner, spy, imp",
        grimoire: {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: [], ghost: false },
                { name: "Bob", role: "librarian", alive: true, position: 1, tokens: [], ghost: false },
                { name: "Charlie", role: "investigator", alive: true, position: 2, tokens: [], ghost: false },
                { name: "Dave", role: "chef", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "empath", alive: true, position: 4, tokens: [], ghost: false },
                { name: "Frank", role: "fortune_teller", alive: true, position: 5, tokens: [], ghost: false },
                { name: "Grace", role: "mayor", alive: true, position: 6, tokens: [], ghost: false },
                { name: "Hannah", role: "recluse", alive: true, position: 7, tokens: [], ghost: false },
                { name: "Ian", role: "poisoner", alive: true, position: 8, tokens: [], ghost: false },
                { name: "Julia", role: "spy", alive: true, position: 9, tokens: [], ghost: false },
                { name: "Kate", role: "imp", alive: true, position: 10, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:washerwoman Bob:librarian Charlie:investigator " +
                            "Dave:chef Eve:empath Frank:fortune_teller Grace:mayor Hannah:recluse Ian:poisoner Julia:spy Kate:imp]"
    },

    // 12 players: fortune_teller, undertaker, monk, ravenkeeper, virgin, slayer, soldier, butler, drunk, poisoner, spy, imp
    {
        name: "12-player basic",
        description: "Legal 12-player setup: fortune_teller, undertaker, monk, ravenkeeper, virgin, slayer, soldier, butler, drunk, poisoner, spy, imp",
        grimoire: {
            players: [
                { name: "Alice", role: "fortune_teller", alive: true, position: 0, tokens: [], ghost: false },
                { name: "Bob", role: "undertaker", alive: true, position: 1, tokens: [], ghost: false },
                { name: "Charlie", role: "monk", alive: true, position: 2, tokens: [], ghost: false },
                { name: "Dave", role: "ravenkeeper", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "virgin", alive: true, position: 4, tokens: [], ghost: false },
                { name: "Frank", role: "slayer", alive: true, position: 5, tokens: [], ghost: false },
                { name: "Grace", role: "soldier", alive: true, position: 6, tokens: [], ghost: false },
                { name: "Hannah", role: "butler", alive: true, position: 7, tokens: [], ghost: false },
                { name: "Ian", role: "drunk", alive: true, position: 8, tokens: [], ghost: false },
                { name: "Julia", role: "poisoner", alive: true, position: 9, tokens: [], ghost: false },
                { name: "Kate", role: "spy", alive: true, position: 10, tokens: [], ghost: false },
                { name: "Leo", role: "imp", alive: true, position: 11, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:fortune_teller Bob:undertaker Charlie:monk " +
                            "Dave:ravenkeeper Eve:virgin Frank:slayer Grace:soldier Hannah:butler Ian:drunk " +
                            "Julia:poisoner Kate:spy Leo:imp]"
    },

    // 13 players: washerwoman, librarian, investigator, chef, empath, fortune_teller, undertaker, monk, ravenkeeper, poisoner, spy, scarlet_woman, imp
    {
        name: "13-player basic",
        description: "Legal 13-player setup: washerwoman, librarian, investigator, chef, empath, fortune_teller, undertaker, monk, ravenkeeper, poisoner, spy, scarlet_woman, imp",
        grimoire: {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: [], ghost: false },
                { name: "Bob", role: "librarian", alive: true, position: 1, tokens: [], ghost: false },
                { name: "Charlie", role: "investigator", alive: true, position: 2, tokens: [], ghost: false },
                { name: "Dave", role: "chef", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "empath", alive: true, position: 4, tokens: [], ghost: false },
                { name: "Frank", role: "fortune_teller", alive: true, position: 5, tokens: [], ghost: false },
                { name: "Grace", role: "undertaker", alive: true, position: 6, tokens: [], ghost: false },
                { name: "Hannah", role: "monk", alive: true, position: 7, tokens: [], ghost: false },
                { name: "Ian", role: "ravenkeeper", alive: true, position: 8, tokens: [], ghost: false },
                { name: "Julia", role: "poisoner", alive: true, position: 9, tokens: [], ghost: false },
                { name: "Kate", role: "spy", alive: true, position: 10, tokens: [], ghost: false },
                { name: "Leo", role: "scarlet_woman", alive: true, position: 11, tokens: [], ghost: false },
                { name: "Mary", role: "imp", alive: true, position: 12, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:washerwoman Bob:librarian Charlie:investigator " +
                            "Dave:chef Eve:empath Frank:fortune_teller Grace:undertaker Hannah:monk Ian:ravenkeeper " +
                            "Julia:poisoner Kate:spy Leo:scarlet_woman Mary:imp]"
    },

    // 14 players: washerwoman, librarian, investigator, chef, empath, fortune_teller, undertaker, monk, ravenkeeper, butler, poisoner, spy, scarlet_woman, imp
    {
        name: "14-player basic",
        description: "Legal 14-player setup: washerwoman, librarian, investigator, chef, empath, fortune_teller, undertaker, monk, ravenkeeper, butler, poisoner, spy, scarlet_woman, imp",
        grimoire: {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: [], ghost: false },
                { name: "Bob", role: "librarian", alive: true, position: 1, tokens: [], ghost: false },
                { name: "Charlie", role: "investigator", alive: true, position: 2, tokens: [], ghost: false },
                { name: "Dave", role: "chef", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "empath", alive: true, position: 4, tokens: [], ghost: false },
                { name: "Frank", role: "fortune_teller", alive: true, position: 5, tokens: [], ghost: false },
                { name: "Grace", role: "undertaker", alive: true, position: 6, tokens: [], ghost: false },
                { name: "Hannah", role: "monk", alive: true, position: 7, tokens: [], ghost: false },
                { name: "Ian", role: "ravenkeeper", alive: true, position: 8, tokens: [], ghost: false },
                { name: "Julia", role: "butler", alive: true, position: 9, tokens: [], ghost: false },
                { name: "Kate", role: "poisoner", alive: true, position: 10, tokens: [], ghost: false },
                { name: "Leo", role: "spy", alive: true, position: 11, tokens: [], ghost: false },
                { name: "Mary", role: "scarlet_woman", alive: true, position: 12, tokens: [], ghost: false },
                { name: "Nick", role: "imp", alive: true, position: 13, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:washerwoman Bob:librarian Charlie:investigator " +
                            "Dave:chef Eve:empath Frank:fortune_teller Grace:undertaker Hannah:monk Ian:ravenkeeper " +
                            "Julia:butler Kate:poisoner Leo:spy Mary:scarlet_woman Nick:imp]"
    },

    // 15 players: investigator, chef, empath, fortune_teller, undertaker, monk, ravenkeeper, virgin, slayer, butler, drunk, poisoner, spy, scarlet_woman, imp
    {
        name: "15-player basic",
        description: "Legal 15-player setup: investigator, chef, empath, fortune_teller, undertaker, monk, ravenkeeper, virgin, slayer, butler, drunk, poisoner, spy, scarlet_woman, imp",
        grimoire: {
            players: [
                { name: "Alice", role: "investigator", alive: true, position: 0, tokens: [], ghost: false },
                { name: "Bob", role: "chef", alive: true, position: 1, tokens: [], ghost: false },
                { name: "Charlie", role: "empath", alive: true, position: 2, tokens: [], ghost: false },
                { name: "Dave", role: "fortune_teller", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "undertaker", alive: true, position: 4, tokens: [], ghost: false },
                { name: "Frank", role: "monk", alive: true, position: 5, tokens: [], ghost: false },
                { name: "Grace", role: "ravenkeeper", alive: true, position: 6, tokens: [], ghost: false },
                { name: "Hannah", role: "virgin", alive: true, position: 7, tokens: [], ghost: false },
                { name: "Ian", role: "slayer", alive: true, position: 8, tokens: [], ghost: false },
                { name: "Julia", role: "butler", alive: true, position: 9, tokens: [], ghost: false },
                { name: "Kate", role: "drunk", alive: true, position: 10, tokens: [], ghost: false },
                { name: "Leo", role: "poisoner", alive: true, position: 11, tokens: [], ghost: false },
                { name: "Mary", role: "spy", alive: true, position: 12, tokens: [], ghost: false },
                { name: "Nick", role: "scarlet_woman", alive: true, position: 13, tokens: [], ghost: false },
                { name: "Olivia", role: "imp", alive: true, position: 14, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:investigator Bob:chef Charlie:empath " +
                            "Dave:fortune_teller Eve:undertaker Frank:monk Grace:ravenkeeper Hannah:virgin Ian:slayer " +
                            "Julia:butler Kate:drunk Leo:poisoner Mary:spy Nick:scarlet_woman Olivia:imp]"
    },

    // Additional variations for testing edge cases
    {
        name: "7-player with tokens",
        description: "7-player game with reminder tokens",
        grimoire: {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: ["washerwoman:townsfolk", "poisoner:poisoned"], ghost: false },
                { name: "Bob", role: "librarian", alive: true, position: 1, tokens: ["librarian:outsider"], ghost: false },
                { name: "Charlie", role: "investigator", alive: true, position: 2, tokens: ["investigator:minion"], ghost: false },
                { name: "Dave", role: "chef", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "empath", alive: true, position: 4, tokens: [], ghost: false },
                { name: "Frank", role: "poisoner", alive: true, position: 5, tokens: [], ghost: false },
                { name: "Grace", role: "imp", alive: true, position: 6, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:washerwoman(ww:townsfolk,poi:poisoned) " +
                            "Bob:librarian(lib:outsider) Charlie:investigator(inv:minion) " +
                            "Dave:chef Eve:empath Frank:poisoner Grace:imp]"
    },

    {
        name: "10-player with deaths",
        description: "10-player game with mixed death/ghost vote states",
        grimoire: {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: ["washerwoman:townsfolk", "poisoner:poisoned"], ghost: false },
                { name: "Bob", role: "librarian", alive: false, position: 1, tokens: ["librarian:outsider"], ghost: true },
                { name: "Charlie", role: "investigator", alive: false, position: 2, tokens: ["investigator:minion"], ghost: false },
                { name: "Dave", role: "chef", alive: true, position: 3, tokens: [], ghost: false },
                { name: "Eve", role: "empath", alive: true, position: 4, tokens: [], ghost: false },
                { name: "Frank", role: "fortune_teller", alive: true, position: 5, tokens: ["fortune_teller:red_herring"], ghost: false },
                { name: "Grace", role: "undertaker", alive: true, position: 6, tokens: [], ghost: false },
                { name: "Hannah", role: "poisoner", alive: true, position: 7, tokens: [], ghost: false },
                { name: "Ian", role: "spy", alive: true, position: 8, tokens: [], ghost: false },
                { name: "Julia", role: "imp", alive: true, position: 9, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[Alice:washerwoman(ww:townsfolk,poi:poisoned) " +
                            "*Bob:librarian(lib:outsider)* *~~Charlie~~:investigator(inv:minion)* " +
                            "Dave:chef Eve:empath Frank:fortune_teller(ft:red_herring) " +
                            "Grace:undertaker Hannah:poisoner Ian:spy Julia:imp]"
    },

    {
        name: "All dead endgame",
        description: "Endgame scenario with all players dead, mixed ghost vote states",
        grimoire: {
            players: [
                { name: "Alice", role: "washerwoman", alive: false, position: 0, tokens: [], ghost: true },
                { name: "Bob", role: "butler", alive: false, position: 1, tokens: [], ghost: false },
                { name: "Charlie", role: "poisoner", alive: false, position: 2, tokens: [], ghost: true },
                { name: "Dave", role: "imp", alive: false, position: 3, tokens: [], ghost: false }
            ]
        },
        expectedSingleLine: "[*Alice:washerwoman* *~~Bob~~:butler* *Charlie:poisoner* *~~Dave~~:imp*]"
    }
];

/**
 * Helper function to get example by name
 */
export function getExampleByName(name: string): GrimoireExample | undefined {
    return GRIMOIRE_EXAMPLES.find(example => example.name === name);
}

/**
 * Helper function to get all example names
 */
export function getExampleNames(): string[] {
    return GRIMOIRE_EXAMPLES.map(example => example.name);
}

/**
 * Get examples by player count
 */
export function getExamplesByPlayerCount(count: number): GrimoireExample[] {
    return GRIMOIRE_EXAMPLES.filter(example => 
        example.grimoire.players.length === count
    );
}

/**
 * Get the basic example for each player count (5-15)
 */
export function getBasicExamples(): GrimoireExample[] {
    return GRIMOIRE_EXAMPLES.filter(example => 
        example.name.includes('-player basic')
    );
}