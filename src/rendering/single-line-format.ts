/**
 * Single-line format rendering for grimoire state
 * 
 * Renders grimoire state as compact single-line text suitable for logs, 
 * debugging, and text-based interfaces.
 */

import { GrimoireState } from '../core/grimoire';
import { formatReminderTokens } from './token-formatter';

export interface SingleLineOptions {
    useAbbreviations?: boolean; // Whether to use role abbreviations in reminder tokens (default: true)
}

/**
 * Renders a grimoire state to single-line format.
 * 
 * Format: [player1 player2 ...] where each player is:
 * - Living: name:role(tokens)
 * - Dead with ghost vote: *name:role(tokens)*
 * - Dead without ghost vote: *~~name~~:role(tokens)*
 * 
 * @param grimoire - The grimoire state to render
 * @param options - Rendering options including abbreviation control
 * @returns Single-line format string
 */
export function renderGrimoireToSingleLine(grimoire: GrimoireState, options: SingleLineOptions = {}): string {
    const useAbbreviations = options.useAbbreviations ?? true;
    
    const playerEntries = grimoire.players.map(player => {
        let entry = '';
        
        // Handle dead players
        if (!player.alive) {
            if (player.ghost) {
                // Dead with ghost vote available
                entry += `*${player.name}:${player.role}`;
            } else {
                // Dead with used ghost vote (struck out)
                entry += `*~~${player.name}~~:${player.role}`;
            }
        } else {
            // Living player
            entry += `${player.name}:${player.role}`;
        }
        
        // Add tokens if present
        if (player.tokens.length > 0) {
            const formattedTokens = formatReminderTokens(player.tokens, useAbbreviations);
            entry += `(${formattedTokens.join(',')})`;
        }
        
        // Close dead player markers
        if (!player.alive) {
            entry += '*';
        }
        
        return entry;
    });
    
    return `[${playerEntries.join(' ')}]`;
}