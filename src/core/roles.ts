// Role definitions and DSL types for Blood on the Clocktower

export type RoleType = 'Townsfolk' | 'Outsider' | 'Minion' | 'Demon';
export type RoleAlignment = 'good' | 'evil';
export type RoleTypeOrAlignment = RoleType | RoleAlignment;

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

// Token placement constraints for reminder tokens
export interface TokenPlacementConstraint {
    // Human-readable description
    description: string;
    
    // Constraint types for token placement rules and effects
    type: 'requires_role_present' | 'only_on_role' | 'only_on_role_type' | 'information_token' | 'conditional_placement' | 'role_requires_token' | 'token_effect';
    
    // Which token this constraint applies to
    token: string;
    
    // For requires_role_present: token can only exist if role is in game
    requiresRole?: {
        roleId: string;  // Role that must be present for token to be placeable
    };
    
    // For only_on_role: token can only be placed on specific role
    onlyOnRole?: {
        roleId: string;  // Role that can have this token placed on it
    };
    
    // For only_on_role_type: token can only be placed on roles of specific type or alignment
    onlyOnRoleType?: {
        roleType: RoleTypeOrAlignment;  // Role type/alignment that can have this token
    };
    
    // For information_token: token represents information and can go anywhere
    informationToken?: {
        // No additional constraints beyond role presence
    };
    
    // For conditional_placement: placement depends on game state
    conditionalPlacement?: {
        condition: string;  // DSL expression for when placement is allowed
        otherwiseConstraint?: TokenPlacementConstraint;
    };
    
    // For role_requires_token: if role is present, then token must be placed somewhere
    roleRequiresToken?: {
        roleId: string;  // Role that must place this token when present
    };
    
    // For token_effect: describes what happens when token is present during phase transitions
    tokenEffect?: {
        effect: 'causes_death_at_dawn' | 'causes_unhealthiness' | 'causes_death_if_madness_broken' | 'causes_death_if_madness_maintained' | 'causes_gain_ability_if_madness_maintained';
        trigger: 'phase_transition' | 'while_present' | 'on_madness_check';
        fromPhase?: string;  // Phase transition: from this phase (e.g., 'NIGHT') 
        toPhase?: string;    // Phase transition: to this phase (e.g., 'DAWN')
        announcement?: 'public_death' | 'private_info' | 'none';  // How effect is announced
        unhealthinessType?: 'drunkenness' | 'poisoning';  // For causes_unhealthiness
        abilityGained?: string;  // For causes_gain_ability_if_madness_maintained
        madnessClaim?: string;  // The specific madness claim being checked
    };
}

// Parameter types for role actions
export type ActionParameterType = 'player' | 'role' | 'boolean' | 'statement' | 'number';

export interface ActionParameter {
    name: string;
    type: ActionParameterType;
    optional?: boolean;
}

// Action visibility types
export type ActionVisibility = 'public' | 'private' | 'either';

// Action timing constraints
export interface ActionTiming {
    phase: 'SETUP' | 'N1' | 'DAWN' | 'EVENING' | 'NIGHT' | 'any_day' | 'any_night' | 'on_trigger';
    frequency: 'once_per_game' | 'once_per_day' | 'once_per_night' | 'unlimited' | 'when_triggered';
    excludeFirstNight?: boolean; // For recurring night actions that skip N1
    trigger?: 'on_nomination' | 'on_execution' | 'on_death' | 'on_demon_death' | 'on_night_death' | 'end_of_day' | 'registration_check';
}

// Action effects that can occur
export interface ActionEffect {
    description: string;
    type: 'causes_death' | 'causes_execution' | 'places_token' | 'removes_token' | 'modifies_votes' | 'conditional' | 'learns_information' | 'game_end' | 'role_transformation' | 'redirect_attack';
    
    // For conditional effects
    condition?: string; // TODO: Not implemented - DSL expression (e.g., "target.role.type === 'demon'")
    
    // For death effects
    targetDies?: boolean;
    actorDies?: boolean;
    
    // For token effects
    tokenToPlace?: string; // Format: "role:token"
    tokenToRemove?: string;
    tokenTarget?: 'actor' | 'target' | 'storyteller_choice' | 'nominator';
    
    // For execution effects
    executionTarget?: 'target' | 'actor' | 'nominator';
    
    // For vote modification
    voteModification?: {
        type: 'double_vote' | 'negative_vote' | 'no_vote' | 'conditional_vote';
        target: 'actor' | 'target';
        condition?: string; // TODO: Not implemented - For butler: can only vote if master votes
    };
    
    // For information learning
    informationLearned?: {
        type: 'yes_no' | 'role_name' | 'count' | 'alignment';
        about?: 'target' | 'neighbors' | 'demon_status' | 'execution_target';
    };
    
    // For game ending effects
    gameEnd?: {
        winningTeam: 'good' | 'evil';
        condition: string; // TODO: Not implemented - string conditions not evaluated
    };
    
    // For role transformation (Scarlet Woman → Imp)
    roleTransformation?: {
        from: string; // Role ID
        to: string;   // Role ID
        condition: string; // TODO: Not implemented - string conditions not evaluated
    };
    
    // For attack redirection (Mayor ability)
    attackRedirect?: {
        fromTarget: 'actor';
        toTarget: 'storyteller_choice';
        optional: boolean; // Storyteller can choose whether to redirect
    };
}

// Role action constraint definition
export interface RoleActionConstraint {
    // Human-readable description
    description: string;
    
    // Action name (namespaced with role, e.g., "slayer:shoot_at")
    actionName: string;
    
    // Parameters this action takes
    parameters: ActionParameter[];
    
    // When this action can be used
    timing: ActionTiming;
    
    // Whether action is public, private, or either
    visibility: ActionVisibility;
    
    // What happens when this action is used
    effects: ActionEffect[];
    
    // Prerequisites (must be sober and healthy, etc.)
    prerequisites?: {
        requiresSoberAndHealthy?: boolean;
        requiresAlive?: boolean;
        customCondition?: string; // TODO: Not implemented - DSL expression
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
    
    // Token placement constraints for this role's tokens
    tokenConstraints?: TokenPlacementConstraint[];
    
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
    
    // Temporal constraint properties for game history validation
    abilityType?: 'one_time_automatic' | 'one_time_player_triggered' | 'one_time_event_triggered' | 'recurring_nightly' | 'recurring_nightly_except_first' | 'setup_passive';
    abilityTiming?: 'setup' | 'night_1' | 'any_night' | 'night_2_plus' | 'day' | 'on_death' | 'on_event' | 'passive';
    abilityConstraints?: {
        requires_sober_and_healthy?: boolean;
        learns_information?: boolean;
        places_persistent_tokens?: boolean;
        affects_transient_state?: boolean;
        triggered_by_event?: string; // Event that triggers ability (e.g., 'nomination', 'demon_death')
    };
    
    // Role-specific actions that players can take (slayer:shoot_at, monk:protect, etc.)
    actions?: RoleActionConstraint[];
    
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