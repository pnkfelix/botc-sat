// Grimoire data structures for Blood on the Clocktower game state tracking

/**
 * Represents the state of a single player in the grimoire
 */
export interface PlayerState {
    name: string;         // Player name (unique, capitalized, used as identifier)
    role: string;         // Role ID (e.g., "baron", "imp") 
    alive: boolean;       // Whether player is alive
    position: number;     // Seating position (0-indexed, equals array index)
    tokens: string[];     // Reminder tokens with role prefixes (e.g., ["washerwoman:townsfolk", "poisoner:poisoned"])
    ghost: boolean;       // Whether player has a ghost vote (dead but can still vote)
}

/**
 * Represents the complete state of a grimoire
 */
export interface GrimoireState {
    players: PlayerState[];   // All players in seating order (position = array index)
}

// TODO: While we addressed the rendering of alive/dead in our single-line text format 
// (using *player* for dead players), we never addressed how to represent ghost votes
// in the text format. Figuring out that format question should be our next task.