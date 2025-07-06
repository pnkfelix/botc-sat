// Script definitions for Blood on the Clocktower
import { Role, getRole } from '../core/roles';

export interface Script {
    id: string;
    name: string;
    edition: string;
    roleIds: string[];  // List of role IDs available in this script
    
    // Get all roles in this script
    getRoles(): Role[];
    
    // Check if a role is in this script
    hasRole(roleId: string): boolean;
}

export class ScriptImpl implements Script {
    id: string;
    name: string;
    edition: string;
    roleIds: string[];
    
    constructor(id: string, name: string, edition: string, roleIds: string[]) {
        this.id = id;
        this.name = name;
        this.edition = edition;
        this.roleIds = roleIds;
    }
    
    getRoles(): Role[] {
        const roles: Role[] = [];
        for (const roleId of this.roleIds) {
            const role = getRole(roleId);
            if (role) {
                roles.push(role);
            } else {
                console.warn(`Role ${roleId} not found in registry`);
            }
        }
        return roles;
    }
    
    hasRole(roleId: string): boolean {
        return this.roleIds.includes(roleId);
    }
}

// Trouble Brewing script
export const troubleBrewing = new ScriptImpl(
    'trouble_brewing',
    'Trouble Brewing',
    'Trouble Brewing',
    [
        // Townsfolk
        'washerwoman',
        'librarian', 
        'investigator',
        'chef',
        'empath',
        'fortune_teller',
        'undertaker',
        'monk',
        'ravenkeeper',
        'virgin',
        'slayer',
        'soldier',
        'mayor',
        
        // Outsiders
        'butler',
        'drunk',
        'recluse',
        'saint',
        
        // Minions
        'poisoner',
        'spy',
        'scarlet_woman',
        'baron',
        
        // Demons
        'imp'
    ]
);

// Script registry
export const SCRIPTS: Map<string, Script> = new Map();
SCRIPTS.set('trouble_brewing', troubleBrewing);