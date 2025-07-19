import { describe, it, expect } from 'vitest';
import { getExampleByName } from './grimoire-examples-data';
import { renderGrimoireToAsciiArt } from '../rendering/ascii-grimoire';

describe('ASCII Grimoire Rendering', () => {
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
┌─ Grimoire (5 players) ─────────────────┐
│   (4)          (17)       (28)         │
│   Alice        Bob        Charlie      │
│   washerwoman  librarian  investigator │
│                                        │
│                                        │
│                                        │
│                                        │
│Eve                         Dave        │
│imp                         poisoner    │
│(1)                         (29)        │
└────────────────────────────────────────┘`;
            
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
┌─ Grimoire (6 players) ────────────────────────────┐
│   (4)          (17)       (28)                    │
│   Alice        Bob        Charlie                 │
│   washerwoman  librarian  investigator            │
│                                                   │
│                                         Dave      │
│                                         chef (42) │
│                                                   │
│Frank                         Eve                  │
│imp                           butler               │
│(1)                           (31)                 │
└───────────────────────────────────────────────────┘`;
            
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
┌─ Grimoire (5 players) ─────────────────┐
│   Alice        Bob        Charlie      │
│   washerwoman  librarian  investigator │
│                                        │
│                                        │
│                                        │
│                                        │
│Eve                         Dave        │
│imp                         poisoner    │
└────────────────────────────────────────┘`;
            expect(result).toBe(expected);
        });
    });
    
    describe('Width-constrained mode', () => {
        it.skip('should render within specified width constraint', () => {
            
            const example = getExampleByName("5-player basic");
            if (!example) throw new Error("5-player basic example not found");
            
            const result = renderGrimoireToAsciiArt(example.grimoire, { 
                mode: 'width-constrained', 
                targetWidth: 40,
                showColumnNumbers: true
            });
            
            // Should use a narrower layout, possibly more vertical
            // This might force a different turn pattern
            const lines = result.split('\n');
            const maxLineLength = Math.max(...lines.map(line => line.length));
            
            expect(maxLineLength).toBeLessThanOrEqual(40);
            expect(result).toBe('PLACEHOLDER - click to see actual output');
        });
    });
    
    describe('Height-constrained mode', () => {
        it.skip('should render within specified height constraint', () => {
            
            const example = getExampleByName("5-player basic");
            if (!example) throw new Error("5-player basic example not found");
            
            const result = renderGrimoireToAsciiArt(example.grimoire, { 
                mode: 'height-constrained', 
                targetHeight: 8,
                showColumnNumbers: true
            });
            
            // Should use a flatter layout
            const lines = result.split('\n');
            
            expect(lines.length).toBeLessThanOrEqual(8);
            expect(result).toBe('PLACEHOLDER - click to see actual output');
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
            
            // Should include token information in separate parentheses (one per row)
            expect(result).toContain("(washerwoman:townsfolk)");
            expect(result).toContain("(poisoner:poisoned)");
            expect(result).toContain("(librarian:outsider)");
            expect(result).toContain("(investigator:minion)");
            
            // Tokens should be on separate rows, not combined
            expect(result).not.toContain("(washerwoman:townsfolk,poisoner:poisoned)");
            const expected = `\
┌─ Grimoire (7 players) ─────────────────────────────────────────────────────────────────────┐
│                                                                                            │
│    (washerwoman:townsfolk)                                                                 │
│    (poisoner:poisoned)                                                                     │
│    ()                       (librarian:outsider)                                           │
│    ()                       ()                                                             │
│    ()                       ()                    (investigator:minion)                    │
│    ()                       ()                    ()                                       │
│    (4)                      (29)                  (51)                   (74)              │
│    Alice                    Bob                   Charlie                Dave              │
│    washerwoman              librarian             investigator           chef              │
│                                                                                            │
│                                                                                Eve         │
│                                                                                empath (80) │
│                                                                                            │
│ Grace                                                             Frank                    │
│ imp                                                               poisoner                 │
│ (1)                                                               (67)                     │
└────────────────────────────────────────────────────────────────────────────────────────────┘`;

            expect(result).toBe(expected);
        });
    });
    
});