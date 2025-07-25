import { describe, it, expect, beforeAll } from 'vitest';
import { getExampleByName } from './grimoire-examples-data';
import { renderGrimoireToAsciiArt } from '../rendering/ascii-grimoire';
import { registerTroubleBrewing } from '../data/trouble-brewing-roles';

describe('ASCII Grimoire Rendering', () => {
    beforeAll(() => {
        // Ensure roles are registered before tests run
        registerTroubleBrewing();
    });
    describe('Auto-sizing mode (square proportions)', () => {
        it('should render 5-player basic grimoire in roughly square layout', () => {
            const example = getExampleByName("5-player basic");
            if (!example) throw new Error("5-player basic example not found");
            
            // Explicit turn configuration: [top=3, right=0, bottom=2, left=0]
            const result = renderGrimoireToAsciiArt(example.grimoire, { 
                mode: 'explicit-turns', 
                explicitTurns: [3, 0, 2, 0], 
                showColumnNumbers: true 
            });
            
            // Expected layout: clockwise starting from upper left
            // Top row (3 players): Dense layout - naturally longer due to longer role names
            // Bottom row (2 players): Justified to match top row width for visual balance
            // No tokens, so no "()" - just column numbers
            const expected = `\
┌─ Grimoire (5 players) ────────────────────────────────┐
│(4)                (23)             (40)               │
│Alice              Bob              Charlie            │
│washerwoman        librarian        investigator       │
│                                                       │
│                                                       │
│                                                       │
│                                                       │
│Eve                                     Dave           │
│imp                                     poisoner       │
│(4)                                     (44)           │
└───────────────────────────────────────────────────────┘`;
            
            expect(result).toBe(expected);
        });
        
        it('should render 6-player basic grimoire in optimal layout', () => {
            const example = getExampleByName("6-player basic");
            if (!example) throw new Error("6-player basic example not found");
            
            // Explicit turn configuration: [top=3, right=1, bottom=2, left=0]
            const result = renderGrimoireToAsciiArt(example.grimoire, { 
                mode: 'explicit-turns', 
                explicitTurns: [3, 1, 2, 0], 
                showColumnNumbers: true 
            });
            
            // Expected layout: clockwise starting from upper left
            // Alice (0) -> Bob (1) -> Charlie (2) on top
            // Dave (3) on right  
            // Eve (4) -> Frank (5) on bottom (right to left)
            const expected = `\
┌─ Grimoire (6 players) ───────────────────────────────────────┐
│(4)                (23)             (40)                      │
│Alice              Bob              Charlie                   │
│washerwoman        librarian        investigator              │
│                                                              │
│                                                      Dave    │
│                                                      chef    │
│                                                      (58)    │
│Frank                                     Eve                 │
│imp                                       butler              │
│(4)                                       (46)                │
└──────────────────────────────────────────────────────────────┘`;
            
            expect(result).toBe(expected);
        });
    });
    
    describe('Column number rendering option', () => {
        it('should render without column numbers when showColumnNumbers is false', () => {
            
            const example = getExampleByName("5-player basic");
            if (!example) throw new Error("5-player basic example not found");
            
            const result = renderGrimoireToAsciiArt(example.grimoire, { 
                mode: 'explicit-turns', 
                explicitTurns: [3, 0, 2, 0], 
                showColumnNumbers: false 
            });
            
            // Should not contain any column number markers like "(4)"
            expect(result).not.toMatch(/\(\d+\)/);
            expect(result).toContain("Alice");
            expect(result).toContain("washerwoman");
            const expected = `\
┌─ Grimoire (5 players) ────────────────────────────────┐
│Alice              Bob              Charlie            │
│washerwoman        librarian        investigator       │
│                                                       │
│                                                       │
│                                                       │
│                                                       │
│Eve                                     Dave           │
│imp                                     poisoner       │
└───────────────────────────────────────────────────────┘`;
            expect(result).toBe(expected);
        });
    });
    
    describe('Width-constrained mode', () => {
        it('should render within specified width constraint', () => {
            
            const example = getExampleByName("5-player basic");
            if (!example) throw new Error("5-player basic example not found");
            
            const result = renderGrimoireToAsciiArt(example.grimoire, { 
                mode: 'width-constrained', 
                targetWidth: 40,
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // Should maximize width usage without exceeding constraint
            const lines = result.split('\n');
            const maxLineLength = Math.max(...lines.map(line => line.length));
            
            expect(maxLineLength).toBeLessThanOrEqual(40);
            expect(result).toContain('Alice');
            expect(result).toContain('washerwoman');
            expect(result).toContain('Dave');
            expect(result).toContain('poisoner');
            
            // Should produce a valid grimoire layout
            expect(result).toMatch(/^┌─ Grimoire \(\d+ players\)/);
            expect(result).toMatch(/└─+┘$/);
        });

        it('should use narrowest layout when constraint cannot be met', () => {
            
            const example = getExampleByName("5-player basic");
            if (!example) throw new Error("5-player basic example not found");
            
            // Use an impossibly tight constraint
            const result = renderGrimoireToAsciiArt(example.grimoire, { 
                mode: 'width-constrained', 
                targetWidth: 20, // Too narrow for any 5-player layout
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // Should still produce a valid layout (the narrowest available)
            expect(result).toContain('Alice');
            expect(result).toContain('washerwoman');
            expect(result).toContain('Dave');
            expect(result).toContain('poisoner');
            
            // Should produce a valid grimoire layout
            expect(result).toMatch(/^┌─ Grimoire \(\d+ players\)/);
            expect(result).toMatch(/└─+┘$/);
            
            // Width will exceed the constraint, but should be the narrowest possible
            const lines = result.split('\n');
            const maxLineLength = Math.max(...lines.map(line => line.length));
            expect(maxLineLength).toBeGreaterThan(20); // Constraint cannot be met
        });
    });
    
    describe('Height-constrained mode', () => {
        it('should render within specified height constraint', () => {
            
            const example = getExampleByName("5-player basic");
            if (!example) throw new Error("5-player basic example not found");
            
            const result = renderGrimoireToAsciiArt(example.grimoire, { 
                mode: 'height-constrained', 
                targetHeight: 8,
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // Should maximize height usage without exceeding constraint
            const lines = result.split('\n');
            
            expect(lines.length).toBeLessThanOrEqual(8);
            expect(result).toContain('Alice');
            expect(result).toContain('washerwoman');
            expect(result).toContain('Dave');
            expect(result).toContain('poisoner');
            
            // Should produce a valid grimoire layout
            expect(result).toMatch(/^┌─ Grimoire \(\d+ players\)/);
            expect(result).toMatch(/└─+┘$/);
        });

        it('should render 12-player grimoire optimally within 20-line height constraint', () => {
            
            const example = getExampleByName("12-player basic");
            if (!example) throw new Error("12-player basic example not found");
            
            const result = renderGrimoireToAsciiArt(example.grimoire, { 
                mode: 'height-constrained', 
                targetHeight: 20,
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // Should maximize height usage without exceeding constraint
            const lines = result.split('\n');
            expect(lines.length).toBeLessThanOrEqual(20);
            expect(lines.length).toBeGreaterThan(15); // Should use substantial height
            
            // Expected layout: optimized for height usage with vertical player arrangement
            const expected = `\
┌─ Grimoire (12 players) ────────────────────────────────────────────────────┐
│                     Alice                 Bob                              │
│                     fortune_teller        undertaker                       │
│                                                                            │
│                                                                 Charlie    │
│       Hannah                                                    monk       │
│       butler                                                               │
│                                                             Dave           │
│    Ian                                                      ravenkeeper    │
│    drunk                                                                   │
│                                                          Eve               │
│Julia                                                     virgin            │
│poisoner                                                                    │
│                                                             Frank          │
│    Kate                                                     slayer         │
│    spy                                                                     │
│                                                                 Grace      │
│       Leo                                                       soldier    │
│       imp                                                                  │
└────────────────────────────────────────────────────────────────────────────┘`;
            
            expect(result).toBe(expected);
        });

        it('should use shortest layout when constraint cannot be met', () => {
            
            const example = getExampleByName("5-player basic");
            if (!example) throw new Error("5-player basic example not found");
            
            // Use an impossibly tight constraint
            const result = renderGrimoireToAsciiArt(example.grimoire, { 
                mode: 'height-constrained', 
                targetHeight: 3, // Too short for any 5-player layout
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // Should still produce a valid layout (the shortest available)
            expect(result).toContain('Alice');
            expect(result).toContain('washerwoman');
            expect(result).toContain('Dave');
            expect(result).toContain('poisoner');
            
            // Should produce a valid grimoire layout
            expect(result).toMatch(/^┌─ Grimoire \(\d+ players\)/);
            expect(result).toMatch(/└─+┘$/);
            
            // Height will exceed the constraint, but should be the shortest possible
            const lines = result.split('\n');
            expect(lines.length).toBeGreaterThan(3); // Constraint cannot be met
        });
    });
    
    describe('Token rendering', () => {
        it('should include token information when present', () => {
            
            const example = getExampleByName("7-player with tokens");
            if (!example) throw new Error("7-player with tokens example not found");
            
            const result = renderGrimoireToAsciiArt(example.grimoire, { 
                mode: 'explicit-turns', 
                explicitTurns: [4, 1, 2, 0], // 7 players: 4 top, 1 right, 2 bottom
                showColumnNumbers: true 
            });
            
            // Should include token information in separate parentheses (one per row) with abbreviations
            expect(result).toContain("(ww:townsfolk)");
            expect(result).toContain("(poi:poisoned)");
            expect(result).toContain("(lib:outsider)");
            expect(result).toContain("(inv:minion)");
            
            // Tokens should be on separate rows, not combined
            expect(result).not.toContain("(ww:townsfolk,poi:poisoned)");
            const expected = `\
┌─ Grimoire (7 players) ─────────────────────────────────────────────────────────┐
│                                                                                │
│                                                                                │
│    (poi:poisoned)                                                              │
│    (ww:townsfolk)     (lib:outsider)   (inv:minion)                            │
│    (4)                (23)             (40)                (60)                │
│    Alice              Bob              Charlie             Dave                │
│    washerwoman        librarian        investigator        chef                │
│                                                                                │
│                                                                      Eve       │
│                                                                      empath    │
│                                                                      (70)      │
│    Grace                                               Frank                   │
│    imp                                                 poisoner                │
│    (4)                                                 (56)                    │
└────────────────────────────────────────────────────────────────────────────────┘`;

            expect(result).toBe(expected);
        });
        
        it('should render without abbreviations when disabled', () => {
            const example = getExampleByName("7-player with tokens");
            if (!example) throw new Error("7-player with tokens example not found");
            
            const result = renderGrimoireToAsciiArt(example.grimoire, { 
                mode: 'explicit-turns', 
                explicitTurns: [4, 1, 2, 0], // 7 players: 4 top, 1 right, 2 bottom
                showColumnNumbers: false,
                useAbbreviations: false  // Disable abbreviations
            });
            
            // Should include full role names in tokens
            expect(result).toContain("(washerwoman:townsfolk)");
            expect(result).toContain("(poisoner:poisoned)");
            expect(result).toContain("(librarian:outsider)");
            expect(result).toContain("(investigator:minion)");
            
            // Should not include abbreviations
            expect(result).not.toContain("(ww:townsfolk)");
            expect(result).not.toContain("(poi:poisoned)");
        });
    });
    
});