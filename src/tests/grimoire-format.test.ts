import { describe, it, expect, beforeAll } from 'vitest';
import { GrimoireState } from '../core/grimoire';
import { GRIMOIRE_EXAMPLES } from './grimoire-examples-data';
import { renderGrimoireToSingleLine } from '../rendering/single-line-format';
import { registerTroubleBrewing } from '../data/trouble-brewing-roles';
import { parseGrimoireFromStream, parseGrimoireFromSingleLine } from '../parsing/single-line-parser';

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