// Core domain types for BOTC conversation system
// Provides type-safe value resolution and validation for conversation parameters

import { Role, RoleType } from './roles';

// Core domain value types
export type YesNoValue = 'yes' | 'no' | boolean;
export type NumberValue = number;
export type PlayerName = string;
export type RoleId = string;
export type TextValue = string;

// Domain value union type
export type DomainValue = YesNoValue | NumberValue | PlayerName | RoleId | TextValue;

// Game state context for domain resolution
export interface GameContext {
    players: Array<{
        name: string;
        role: string;
        alive: boolean;
        position: number;
    }>;
    availableRoles: Map<string, Role>;
    currentPhase: string;
    actingPlayer?: string; // For 'not_self' filters
}

// Domain type implementations with validation and resolution
export abstract class DomainType<T extends DomainValue> {
    abstract readonly typeName: string;
    
    /**
     * Validate that a value conforms to this domain type
     */
    abstract validate(value: T, context: GameContext): boolean;
    
    /**
     * Get all valid values for this domain type in the current context
     */
    abstract getValidValues(context: GameContext): T[];
    
    /**
     * Convert a raw input to a typed value
     */
    abstract parseValue(input: string | T): T | null;
    
    /**
     * Format a typed value for display
     */
    abstract formatValue(value: T): string;
}

// YesNo domain type
export class YesNoDomain extends DomainType<YesNoValue> {
    readonly typeName = 'YesNo';
    
    validate(value: YesNoValue, _context: GameContext): boolean {
        return value === 'yes' || value === 'no' || 
               value === true || value === false;
    }
    
    getValidValues(_context: GameContext): YesNoValue[] {
        return ['yes', 'no'];
    }
    
    parseValue(input: string | YesNoValue): YesNoValue | null {
        if (typeof input === 'boolean') {
            return input ? 'yes' : 'no';
        }
        
        const normalized = input.toLowerCase().trim();
        if (normalized === 'yes' || normalized === 'y' || normalized === 'true') {
            return 'yes';
        }
        if (normalized === 'no' || normalized === 'n' || normalized === 'false') {
            return 'no';
        }
        
        return null;
    }
    
    formatValue(value: YesNoValue): string {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }
        return value === 'yes' ? 'Yes' : 'No';
    }
}

// Number domain type with optional range constraints
export class NumberDomain extends DomainType<NumberValue> {
    readonly typeName = 'Number';
    
    constructor(
        private minValue?: number, 
        private maxValue?: number
    ) {
        super();
    }
    
    validate(value: NumberValue, _context: GameContext): boolean {
        if (typeof value !== 'number' || !Number.isInteger(value)) {
            return false;
        }
        
        if (this.minValue !== undefined && value < this.minValue) {
            return false;
        }
        
        if (this.maxValue !== undefined && value > this.maxValue) {
            return false;
        }
        
        return true;
    }
    
    getValidValues(_context: GameContext): NumberValue[] {
        if (this.minValue === undefined || this.maxValue === undefined) {
            // Return a reasonable range for BOTC contexts
            return Array.from({ length: 16 }, (_, i) => i);
        }
        
        return Array.from(
            { length: this.maxValue - this.minValue + 1 }, 
            (_, i) => this.minValue! + i
        );
    }
    
    parseValue(input: string | NumberValue): NumberValue | null {
        if (typeof input === 'number') {
            return Number.isInteger(input) ? input : null;
        }
        
        const parsed = parseInt(input.trim(), 10);
        return Number.isInteger(parsed) ? parsed : null;
    }
    
    formatValue(value: NumberValue): string {
        return value.toString();
    }
}

// Player selection domain type with filtering
export class ChoiceOfPlayerDomain extends DomainType<PlayerName> {
    readonly typeName = 'ChoiceOfPlayer';
    
    constructor(
        private playerFilter?: 'alive' | 'dead' | 'not_self'
    ) {
        super();
    }
    
    validate(value: PlayerName, context: GameContext): boolean {
        const player = context.players.find(p => p.name === value);
        if (!player) {
            return false;
        }
        
        switch (this.playerFilter) {
            case 'alive':
                return player.alive;
            case 'dead':
                return !player.alive;
            case 'not_self':
                return context.actingPlayer ? value !== context.actingPlayer : true;
            default:
                return true;
        }
    }
    
    getValidValues(context: GameContext): PlayerName[] {
        let validPlayers = context.players;
        
        switch (this.playerFilter) {
            case 'alive':
                validPlayers = validPlayers.filter(p => p.alive);
                break;
            case 'dead':
                validPlayers = validPlayers.filter(p => !p.alive);
                break;
            case 'not_self':
                if (context.actingPlayer) {
                    validPlayers = validPlayers.filter(p => p.name !== context.actingPlayer);
                }
                break;
        }
        
        return validPlayers.map(p => p.name);
    }
    
    parseValue(input: string | PlayerName): PlayerName | null {
        // Basic string validation - game context validation happens in validate()
        return typeof input === 'string' && input.trim().length > 0 ? input.trim() : null;
    }
    
    formatValue(value: PlayerName): string {
        return value;
    }
}

// Role selection domain type with filtering
export class ChoiceOfRoleDomain extends DomainType<RoleId> {
    readonly typeName = 'ChoiceOfRole';
    
    constructor(
        private roleTypeFilter?: 'good' | 'evil' | RoleType
    ) {
        super();
    }
    
    validate(value: RoleId, context: GameContext): boolean {
        const role = context.availableRoles.get(value);
        if (!role) {
            return false;
        }
        
        switch (this.roleTypeFilter) {
            case 'good':
                return role.type === 'Townsfolk' || role.type === 'Outsider';
            case 'evil':
                return role.type === 'Minion' || role.type === 'Demon';
            case 'Townsfolk':
            case 'Outsider':
            case 'Minion':
            case 'Demon':
                return role.type === this.roleTypeFilter;
            default:
                return true;
        }
    }
    
    getValidValues(context: GameContext): RoleId[] {
        let validRoles = Array.from(context.availableRoles.values());
        
        switch (this.roleTypeFilter) {
            case 'good':
                validRoles = validRoles.filter(r => r.type === 'Townsfolk' || r.type === 'Outsider');
                break;
            case 'evil':
                validRoles = validRoles.filter(r => r.type === 'Minion' || r.type === 'Demon');
                break;
            case 'Townsfolk':
            case 'Outsider':
            case 'Minion':
            case 'Demon':
                validRoles = validRoles.filter(r => r.type === this.roleTypeFilter);
                break;
        }
        
        return validRoles.map(r => r.id);
    }
    
    parseValue(input: string | RoleId): RoleId | null {
        return typeof input === 'string' && input.trim().length > 0 ? input.trim() : null;
    }
    
    formatValue(value: RoleId): string {
        return value;
    }
}

// Text domain type for custom input (Yaggababble, Mezepheles)
export class TextDomain extends DomainType<TextValue> {
    readonly typeName = 'Text';
    
    constructor(
        private pattern?: RegExp,
        private minLength?: number,
        private maxLength?: number
    ) {
        super();
    }
    
    validate(value: TextValue, _context: GameContext): boolean {
        if (typeof value !== 'string') {
            return false;
        }
        
        if (this.minLength !== undefined && value.length < this.minLength) {
            return false;
        }
        
        if (this.maxLength !== undefined && value.length > this.maxLength) {
            return false;
        }
        
        if (this.pattern && !this.pattern.test(value)) {
            return false;
        }
        
        return true;
    }
    
    getValidValues(_context: GameContext): TextValue[] {
        // Text domains are typically open-ended
        return [];
    }
    
    parseValue(input: string | TextValue): TextValue | null {
        return typeof input === 'string' ? input : null;
    }
    
    formatValue(value: TextValue): string {
        return value;
    }
}

// Domain factory for creating typed domain instances
export class DomainFactory {
    
    static createYesNo(): YesNoDomain {
        return new YesNoDomain();
    }
    
    static createNumber(min?: number, max?: number): NumberDomain {
        return new NumberDomain(min, max);
    }
    
    static createPlayerChoice(filter?: 'alive' | 'dead' | 'not_self'): ChoiceOfPlayerDomain {
        return new ChoiceOfPlayerDomain(filter);
    }
    
    static createRoleChoice(filter?: 'good' | 'evil' | RoleType): ChoiceOfRoleDomain {
        return new ChoiceOfRoleDomain(filter);
    }
    
    static createText(options?: {
        pattern?: RegExp;
        minLength?: number;
        maxLength?: number;
    }): TextDomain {
        return new TextDomain(options?.pattern, options?.minLength, options?.maxLength);
    }
    
    /**
     * Create domain from conversation tree constraint specification
     */
    static fromConstraint(constraint: {
        type: 'YesNo' | 'Number' | 'ChoiceOfPlayer' | 'ChoiceOfRole' | 'Text';
        playerFilter?: 'alive' | 'dead' | 'not_self';
        roleTypeFilter?: 'good' | 'evil' | 'Townsfolk' | 'Outsider' | 'Minion' | 'Demon';
        numberRange?: { min: number; max: number };
        textPattern?: string;
    }): DomainType<DomainValue> {
        switch (constraint.type) {
            case 'YesNo':
                return DomainFactory.createYesNo();
            
            case 'Number':
                return DomainFactory.createNumber(
                    constraint.numberRange?.min,
                    constraint.numberRange?.max
                );
            
            case 'ChoiceOfPlayer':
                return DomainFactory.createPlayerChoice(constraint.playerFilter);
            
            case 'ChoiceOfRole':
                return DomainFactory.createRoleChoice(constraint.roleTypeFilter);
            
            case 'Text':
                return DomainFactory.createText({
                    pattern: constraint.textPattern ? new RegExp(constraint.textPattern) : undefined
                });
            
            default:
                throw new Error(`Unknown domain type: ${(constraint as any).type}`);
        }
    }
}

// Common domain instances for convenience
export const CommonDomainInstances = {
    yesNo: DomainFactory.createYesNo(),
    anyNumber: DomainFactory.createNumber(),
    playerCount: DomainFactory.createNumber(0, 15),
    anyPlayer: DomainFactory.createPlayerChoice(),
    alivePlayer: DomainFactory.createPlayerChoice('alive'),
    deadPlayer: DomainFactory.createPlayerChoice('dead'),
    otherPlayer: DomainFactory.createPlayerChoice('not_self'),
    anyRole: DomainFactory.createRoleChoice(),
    goodRole: DomainFactory.createRoleChoice('good'),
    evilRole: DomainFactory.createRoleChoice('evil'),
    townsfolkRole: DomainFactory.createRoleChoice('Townsfolk'),
    outsiderRole: DomainFactory.createRoleChoice('Outsider'),
    minionRole: DomainFactory.createRoleChoice('Minion'),
    demonRole: DomainFactory.createRoleChoice('Demon'),
    freeText: DomainFactory.createText()
};