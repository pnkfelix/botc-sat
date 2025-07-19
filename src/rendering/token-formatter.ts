/**
 * Utility functions for formatting reminder tokens with role abbreviations
 */

import { getRole } from '../core/roles';

/**
 * Formats a reminder token using role abbreviations when available.
 * 
 * @param token - Token in format "role:token_type" (e.g., "washerwoman:townsfolk")
 * @param useAbbreviations - Whether to use abbreviations (default: true)
 * @returns Formatted token (e.g., "ww:townsfolk" or original format)
 */
export function formatReminderToken(token: string, useAbbreviations: boolean = true): string {
    if (!useAbbreviations) {
        return token;
    }
    
    // Parse token format: "role:token_type"
    const colonIndex = token.indexOf(':');
    if (colonIndex === -1) {
        // No colon found, return as-is
        return token;
    }
    
    const roleId = token.substring(0, colonIndex);
    const tokenType = token.substring(colonIndex + 1);
    
    // Look up role and get abbreviation
    const role = getRole(roleId);
    if (!role || !role.suggestedAbbreviation) {
        // No abbreviation available, use full role name
        return token;
    }
    
    return `${role.suggestedAbbreviation}:${tokenType}`;
}

/**
 * Formats an array of reminder tokens with abbreviations.
 * 
 * @param tokens - Array of tokens in format "role:token_type"
 * @param useAbbreviations - Whether to use abbreviations (default: true)
 * @returns Array of formatted tokens
 */
export function formatReminderTokens(tokens: string[], useAbbreviations: boolean = true): string[] {
    return tokens.map(token => formatReminderToken(token, useAbbreviations));
}