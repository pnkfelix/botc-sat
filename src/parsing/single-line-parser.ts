/**
 * Single-line format parser for grimoire state
 * 
 * Parses grimoire state from compact single-line text format suitable for logs,
 * debugging, and text-based interfaces.
 */

import { GrimoireState, PlayerState } from '../core/grimoire';

interface ParseResult {
    grimoire: GrimoireState;
    consumed: number; // Number of characters consumed from input
}

/**
 * Recursive descent parser for the grimoire single-line format.
 * 
 * **IMPORTANT: This is an LL(1) parser and should remain so for maintainability.**
 * 
 * The grammar is formally specified in /research/textual-representation-formats.md
 * under "Context-Free Grammar". Each method in this parser corresponds to a 
 * grammar production rule, enabling one-token lookahead parsing.
 * 
 * Grammar summary:
 * - grimoire ::= '[' player_list ']'
 * - player_entry ::= living_player | dead_player  
 * - living_player ::= name ':' role tokens?
 * - dead_player ::= '*' dead_name ':' role tokens? '*'
 * - dead_name ::= name | '~~' name '~~'
 * - tokens ::= '(' token_list ')'
 * 
 * When modifying this parser:
 * 1. Ensure each method handles exactly one grammar production
 * 2. Use single-token lookahead via peek()
 * 3. Avoid backtracking - make parsing decisions deterministically
 * 4. Update the grammar documentation if adding new constructs
 * 5. Add corresponding tests for any grammar extensions
 */
class GrimoireParser {
    private input: string;
    private pos: number;
    
    constructor(input: string, startIndex: number = 0) {
        this.input = input;
        this.pos = startIndex;
    }
    
    /**
     * Parse grimoire ::= '[' player_list ']'
     */
    parse(): ParseResult {
        const startPos = this.pos;
        
        // Skip whitespace
        this.skipWhitespace();
        
        // Expect '['
        if (!this.consumeChar('[')) {
            throw new Error('No grimoire found');
        }
        
        // Parse player list
        const players = this.parsePlayerList();
        
        // Expect ']'
        if (!this.consumeChar(']')) {
            throw new Error('Unclosed grimoire bracket');
        }
        
        return {
            grimoire: { players },
            consumed: this.pos - startPos
        };
    }
    
    /**
     * Parse player_list ::= player_entry | player_entry ' ' player_list | ε
     */
    private parsePlayerList(): PlayerState[] {
        const players: PlayerState[] = [];
        
        // Skip whitespace after '['
        this.skipWhitespace();
        
        // Handle empty grimoire
        if (this.peek() === ']') {
            return players;
        }
        
        // Parse first player
        players.push(this.parsePlayer(0));
        
        // Parse additional players separated by whitespace
        while (this.skipWhitespace() && this.peek() !== ']') {
            players.push(this.parsePlayer(players.length));
        }
        
        return players;
    }
    
    /**
     * Parse player_entry ::= living_player | dead_player
     */
    private parsePlayer(position: number): PlayerState {
        let alive = true;
        let ghost = false;
        
        // Check for dead player marker '*'
        if (this.peek() === '*') {
            alive = false;
            this.advance(); // consume '*'
            
            // Check for strikethrough
            if (this.peek(2) === '~~') {
                ghost = false; // Used ghost vote
                this.advance(2); // consume '~~'
                
                // Parse name until '~~'
                const name = this.parseUntil('~~');
                this.advance(2); // consume '~~'
                
                // Expect and consume ':'
                if (!this.consumeChar(':')) {
                    throw new Error('Missing : after strikethrough name');
                }
                
                // Parse 'role(tokens)*'
                const { role, tokens } = this.parseRoleAndTokens();
                
                // Expect closing '*'
                if (!this.consumeChar('*')) {
                    throw new Error('Missing closing * for dead player');
                }
                
                return { name, role, alive, position, tokens, ghost };
            } else {
                ghost = true; // Available ghost vote
                
                // Parse name:role(tokens) normally
                const { name, role, tokens } = this.parseNameRoleTokens();
                
                // Expect closing '*'
                if (!this.consumeChar('*')) {
                    throw new Error('Missing closing * for dead player');
                }
                
                return { name, role, alive, position, tokens, ghost };
            }
        } else {
            // Living player
            const { name, role, tokens } = this.parseNameRoleTokens();
            return { name, role, alive, position, tokens, ghost };
        }
    }
    
    private parseNameRoleTokens(): { name: string, role: string, tokens: string[] } {
        const name = this.parseUntil(':');
        this.advance(); // consume ':'
        const { role, tokens } = this.parseRoleAndTokens();
        return { name, role, tokens };
    }
    
    private parseRoleAndTokens(): { role: string, tokens: string[] } {
        let role: string;
        let tokens: string[] = [];
        
        if (this.peek() === '(') {
            // No role, just tokens - this shouldn't happen
            throw new Error('Missing role before tokens');
        }
        
        // Parse role until '(' or end of player
        role = this.parseUntil(['(', ' ', ']', '*']);
        
        // Parse tokens if present
        if (this.peek() === '(') {
            tokens = this.parseTokens();
        }
        
        return { role, tokens };
    }
    
    /**
     * Parse tokens ::= '(' token_list ')'
     * Parse token_list ::= token | token ',' token_list
     */
    private parseTokens(): string[] {
        this.advance(); // consume '('
        
        const tokens: string[] = [];
        
        // Handle empty tokens
        if (this.peek() === ')') {
            this.advance(); // consume ')'
            return tokens;
        }
        
        // Parse first token
        tokens.push(this.parseUntil([',', ')']));
        
        // Parse additional tokens
        while (this.peek() === ',') {
            this.advance(); // consume ','
            tokens.push(this.parseUntil([',', ')']));
        }
        
        // Expect closing ')'
        if (!this.consumeChar(')')) {
            throw new Error('Missing closing ) for tokens');
        }
        
        return tokens.map(token => token.trim()).filter(token => token.length > 0);
    }
    
    private parseUntil(delimiter: string | string[]): string {
        const delimiters = Array.isArray(delimiter) ? delimiter : [delimiter];
        const start = this.pos;
        
        while (this.pos < this.input.length) {
            // Check for multi-character delimiters first
            for (const delim of delimiters) {
                if (delim.length > 1 && this.peek(delim.length) === delim) {
                    return this.input.substring(start, this.pos).trim();
                }
            }
            
            // Check for single-character delimiters
            if (delimiters.includes(this.input[this.pos])) {
                return this.input.substring(start, this.pos).trim();
            }
            
            this.advance();
        }
        
        return this.input.substring(start, this.pos).trim();
    }
    
    private skipWhitespace(): boolean {
        const start = this.pos;
        while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
            this.advance();
        }
        return this.pos > start;
    }
    
    private peek(length: number = 1): string {
        return this.input.substring(this.pos, this.pos + length);
    }
    
    private advance(count: number = 1): void {
        this.pos += count;
    }
    
    private consumeChar(expected: string): boolean {
        if (this.peek() === expected) {
            this.advance();
            return true;
        }
        return false;
    }
}

/**
 * Parse a grimoire from a string starting at a specific index.
 * Useful for parsing grimoires embedded within larger text.
 * 
 * @param input - The input string containing the grimoire
 * @param startIndex - Index to start parsing from (default: 0)
 * @returns Parse result with grimoire and characters consumed
 */
export function parseGrimoireFromStream(input: string, startIndex: number = 0): ParseResult {
    const parser = new GrimoireParser(input, startIndex);
    return parser.parse();
}

/**
 * Parse a grimoire from a complete single-line format string.
 * 
 * @param singleLine - The single-line format string
 * @returns The parsed grimoire state
 */
export function parseGrimoireFromSingleLine(singleLine: string): GrimoireState {
    const result = parseGrimoireFromStream(singleLine.trim());
    return result.grimoire;
}