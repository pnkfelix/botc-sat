// Role definitions and DSL types for Blood on the Clocktower

export type RoleType = 'Townsfolk' | 'Outsider' | 'Minion' | 'Demon';

// Core distinction: in-play roles vs physical bag contents
export interface RoleDistribution {
    Townsfolk: number;
    Outsider: number;
    Minion: number;
    Demon: number;
}

export interface PhysicalBag {
    // Maps role IDs to counts in the physical bag
    roles: Map<string, number>;
}

// Simple constraint language for bag legality
export interface BagConstraint {
    // Human-readable description
    description: string;
    
    // Simple constraint types to start with
    type: 'role_substitution' | 'count_modification' | 'conditional';
    
    // For role_substitution: "X draws Y token but is actually Z"
    // e.g., Drunk draws Townsfolk token but is actually Outsider
    substitution?: {
        triggerRole: string;      // Role that causes substitution (e.g., "drunk")
        tokenType: RoleType;      // Type of token drawn (e.g., "Townsfolk")
        actualType: RoleType;     // Actual role type in play (e.g., "Outsider")
    };
    
    // For count_modification: "If X in play, then +N of type Y in bag, -M of type Z in play"
    // e.g., Marionette: +1 Minion in bag, -1 Townsfolk in play
    // NOTE: Currently using simple addition/subtraction by constants.
    // TODO: May need to generalize to functions mapping set-of-numbers to set-of-numbers
    // for constraints like "ensure at least one outsider is present" (add 1 if count is 0)
    countMod?: {
        triggerRole: string;
        bagDelta: Partial<RoleDistribution>;    // Change to physical bag (+N/-N)
        playDelta: Partial<RoleDistribution>;   // Change to in-play roles (+N/-N)
    };
    
    // For conditional: depends on other roles being present
    condition?: {
        requires: string[];       // Role IDs that must be present
        constraint: BagConstraint;
    };
}

export interface Role {
    id: string;           // Unique identifier (e.g., "butler", "imp")
    name: string;         // Display name (e.g., "Butler", "Imp")
    type: RoleType;       // Role category
    
    // English rule text from the official rules
    englishText: string;
    
    // Optional suggested abbreviation for reminder tokens (e.g., "ww" for washerwoman)
    // Scripts can use this or override with their own abbreviation
    suggestedAbbreviation?: string;
    
    // Reminder tokens this role introduces (e.g., ["townsfolk", "wrong"] for washerwoman)
    // In grimoire format these appear as "washerwoman:townsfolk", "washerwoman:wrong"
    reminderTokens?: string[];
    
    // Constraints this role imposes on bag/setup legality
    bagConstraints?: BagConstraint[];
    
    // Simple constraint format for script compiler
    constraints?: Array<{
        type: 'count_modification';
        target: string;
        delta: number;
    } | {
        type: 'physical_bag_substitution';
        fromType: string;  // Role type that decreases in physical bag
        toType: string;    // Role type that increases in physical bag
    }>;
    
    // For later: ongoing abilities during gameplay
    ongoingAbilities?: string[]; // DSL expressions for ongoing effects
    
    // Metadata
    edition: string;      // Which edition/script this role belongs to
    complexity?: number;  // 1-3 difficulty rating
}

// Standard setup for different player counts (base Trouble Brewing)
// Based on official rules from The Pandemonium Institute
export function getBaseSetup(playerCount: number): RoleDistribution {
    if (playerCount < 5 || playerCount > 15) {
        throw new Error(`Invalid player count: ${playerCount}. Must be 5-15.`);
    }
    
    const setup: RoleDistribution = {
        Townsfolk: 0,
        Outsider: 0,
        Minion: 0,
        Demon: 1  // Always exactly 1
    };
    
    // Special cases for 5 and 6 players (Teensy games)
    if (playerCount === 5) {
        setup.Townsfolk = 3;
        setup.Outsider = 0;
        setup.Minion = 1;
    } else if (playerCount === 6) {
        setup.Townsfolk = 3;
        setup.Outsider = 1;
        setup.Minion = 1;
    } else {
        // For 7+ players, use the formula:
        // past-four = playerCount - 4
        // minions = floor(past-four / 3)
        // outsiders = past-four % 3
        // townsfolk = 3 + (minions * 2)
        const pastFour = playerCount - 4;
        setup.Minion = Math.floor(pastFour / 3);
        setup.Outsider = pastFour % 3;
        setup.Townsfolk = 3 + (setup.Minion * 2);
    }
    
    return setup;
}

// Role registry - will be populated with actual roles
export const ROLES: Map<string, Role> = new Map();

// Helper function to register a role
export function registerRole(role: Role): void {
    ROLES.set(role.id, role);
}

// Helper function to get a role by ID
export function getRole(id: string): Role | undefined {
    return ROLES.get(id);
}