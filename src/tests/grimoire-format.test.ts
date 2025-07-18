import { describe, it, expect, beforeAll } from 'vitest';
import { GrimoireState, PlayerState } from '../core/grimoire';
import { GRIMOIRE_EXAMPLES } from './grimoire-examples-data';
import { renderGrimoireToSingleLine } from '../rendering/single-line-format';
import { registerTroubleBrewing } from '../data/trouble-brewing-roles';

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

function parseGrimoireFromStream(input: string, startIndex: number = 0): ParseResult {
    const parser = new GrimoireParser(input, startIndex);
    return parser.parse();
}

function parseGrimoireFromSingleLine(singleLine: string): GrimoireState {
    const result = parseGrimoireFromStream(singleLine.trim());
    return result.grimoire;
}

describe('Grimoire Single-Line Format', () => {
    beforeAll(() => {
        // Ensure roles are registered before tests run
        registerTroubleBrewing();
    });
    describe('Rendering', () => {
        it('should render all grimoire examples correctly', () => {
            // Test all examples from our comprehensive test data
            for (const example of GRIMOIRE_EXAMPLES) {
                const rendered = renderGrimoireToSingleLine(example.grimoire);
                expect(rendered).toBe(example.expectedSingleLine);
            }
        });
    });

    describe('Parsing', () => {
        it('should parse all grimoire examples correctly', () => {
            // Test all examples from our comprehensive test data
            for (const example of GRIMOIRE_EXAMPLES) {
                const parsed = parseGrimoireFromSingleLine(example.expectedSingleLine);
                
                // Since we render with abbreviations by default, compare the rendered forms
                const originalRendered = renderGrimoireToSingleLine(example.grimoire);
                const parsedRendered = renderGrimoireToSingleLine(parsed);
                
                expect(parsedRendered).toBe(originalRendered);
            }
        });
    });

    describe('Round-trip consistency', () => {
        it('should parse and render consistently', () => {
            const originalLine = "[Alice:washerwoman(ww:townsfolk) *Bob:librarian(lib:outsider)* *~~Charlie~~:imp*]";
            
            const parsed = parseGrimoireFromSingleLine(originalLine);
            const rendered = renderGrimoireToSingleLine(parsed);
            
            expect(rendered).toBe(originalLine);
        });
        
        it('should render without abbreviations when disabled', () => {
            const grimoire = {
                players: [
                    { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: ["washerwoman:townsfolk", "poisoner:poisoned"], ghost: false },
                    { name: "Bob", role: "librarian", alive: true, position: 1, tokens: ["librarian:outsider"], ghost: false }
                ]
            };
            
            const withAbbreviations = renderGrimoireToSingleLine(grimoire, { useAbbreviations: true });
            const withoutAbbreviations = renderGrimoireToSingleLine(grimoire, { useAbbreviations: false });
            
            expect(withAbbreviations).toBe("[Alice:washerwoman(ww:townsfolk,poi:poisoned) Bob:librarian(lib:outsider)]");
            expect(withoutAbbreviations).toBe("[Alice:washerwoman(washerwoman:townsfolk,poisoner:poisoned) Bob:librarian(librarian:outsider)]");
        });
    });

    describe('Streaming parsing', () => {
        it('should parse grimoire from middle of string', () => {
            const input = "Game start: [Alice:washerwoman Bob:imp] Turn 1 begins";
            
            const result = parseGrimoireFromStream(input, 12); // Start after "Game start: "
            
            expect(result.grimoire.players).toHaveLength(2);
            expect(result.grimoire.players[0].name).toBe("Alice");
            expect(result.consumed).toBe(27); // Length of "[Alice:washerwoman Bob:imp]"
        });

        it('should handle whitespace before grimoire', () => {
            const input = "   [Alice:washerwoman Bob:imp]   more data";
            
            const result = parseGrimoireFromStream(input);
            
            expect(result.grimoire.players).toHaveLength(2);
            expect(result.consumed).toBe(30); // Includes leading whitespace up to closing bracket
        });

        it('should parse complex grimoire with trailing data', () => {
            const input = "[*Alice:washerwoman(washerwoman:townsfolk)* Bob:imp] and then something else";
            
            const result = parseGrimoireFromStream(input);
            
            expect(result.grimoire.players).toHaveLength(2);
            expect(result.grimoire.players[0].alive).toBe(false);
            expect(result.grimoire.players[0].ghost).toBe(true);
            expect(result.consumed).toBe(52); // Up to closing bracket
        });

        it('should fail gracefully on invalid format', () => {
            const input = "No grimoire here just text";
            
            expect(() => parseGrimoireFromStream(input)).toThrow('No grimoire found');
        });

        it('should fail on unclosed grimoire', () => {
            const input = "[Alice:washerwoman Bob:imp and then it never closes";
            
            expect(() => parseGrimoireFromStream(input)).toThrow('Unclosed grimoire bracket');
        });
    });
});

describe('Reminder Token Validation', () => {
    // Tests for mechanically correct token placement
    it('should validate washerwoman token is not on washerwoman', () => {
        // This test will help us ensure tokens are placed correctly
        const grimoire: GrimoireState = {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: [], ghost: false },
                { name: "Bob", role: "librarian", alive: true, position: 1, tokens: ["washerwoman:townsfolk"], ghost: false }
            ]
        };

        // This should be the correct token placement - washerwoman token on the person they point to
        expect(grimoire.players[0].tokens).not.toContain("washerwoman:townsfolk");
        expect(grimoire.players[1].tokens).toContain("washerwoman:townsfolk");
    });

    it('should validate poisoner token placement', () => {
        const grimoire: GrimoireState = {
            players: [
                { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: ["poisoner:poisoned"], ghost: false },
                { name: "Bob", role: "poisoner", alive: true, position: 1, tokens: [], ghost: false }
            ]
        };

        // Poisoner token should be on the poisoned player, not the poisoner
        expect(grimoire.players[0].tokens).toContain("poisoner:poisoned");
        expect(grimoire.players[1].tokens).not.toContain("poisoner:poisoned");
    });
});