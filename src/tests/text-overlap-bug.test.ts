import { describe, it, expect, beforeAll } from 'vitest';
import { renderGrimoireToAsciiArt } from '../rendering/ascii-grimoire';
import { registerTroubleBrewing } from '../data/trouble-brewing-roles';

describe('Text Overlap Bug', () => {
    beforeAll(() => {
        registerTroubleBrewing();
    });

    it('should not merge role names when players are positioned on different sides', () => {
        // Reproduces the bug where "fortune_teller" + "investigator" becomes "fortune_tellerstigator"
        const players = [
            { name: "Alice", role: "washerwoman", alive: true, position: 0, tokens: [], ghost: false },
            { name: "Bob", role: "librarian", alive: true, position: 1, tokens: [], ghost: false },
            { name: "Charlie", role: "investigator", alive: true, position: 2, tokens: [], ghost: false },
            { name: "Dave", role: "chef", alive: true, position: 3, tokens: [], ghost: false },
            { name: "Eve", role: "empath", alive: true, position: 4, tokens: [], ghost: false },
            { name: "Frank", role: "fortune_teller", alive: true, position: 5, tokens: [], ghost: false }
        ];

        const result = renderGrimoireToAsciiArt({ players }, { 
            mode: 'explicit-turns',
            explicitTurns: [2, 0, 2, 2], // 2 top, 0 right, 2 bottom, 2 left
            showColumnNumbers: false,
            useAbbreviations: true
        });

        // Role names should appear separately, not merged
        expect(result).toContain("fortune_teller");
        expect(result).toContain("investigator");
        
        // Should NOT contain the merged/corrupted text
        expect(result).not.toContain("fortune_tellerstigator");
        expect(result).not.toContain("chefarian"); // Another potential merge we saw
        
        // For debugging: log the actual output
        // Output available in result variable for debugging
    });

    it('should handle left-side and bottom-side player positioning without text overlap', () => {
        // Simpler case focusing on the specific overlap scenario
        const players = [
            { name: "Frank", role: "fortune_teller", alive: true, position: 0, tokens: [], ghost: false },
            { name: "Charlie", role: "investigator", alive: true, position: 1, tokens: [], ghost: false }
        ];

        const result = renderGrimoireToAsciiArt({ players }, { 
            mode: 'explicit-turns',
            explicitTurns: [0, 0, 1, 1], // 0 top, 0 right, 1 bottom, 1 left
            showColumnNumbers: true, // Enable to see positioning
            useAbbreviations: true
        });

        expect(result).toContain("fortune_teller");
        expect(result).toContain("investigator");
        expect(result).not.toContain("fortune_tellerstigator");
        
        // Output available in result variable for debugging
    });
});