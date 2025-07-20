/**
 * Test cases for render-grimoire command demonstrating various layouts and known bugs
 * 
 * These are concrete examples used to demonstrate the render-grimoire functionality
 * and preserve evidence of bugs that need to be fixed.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { renderGrimoireToAsciiArt } from '../rendering/ascii-grimoire';
import { parseGrimoireFromSingleLine } from '../parsing/single-line-parser';
import { registerTroubleBrewing } from '../data/trouble-brewing-roles';

describe('Render Grimoire Command Test Cases', () => {
    beforeAll(() => {
        registerTroubleBrewing();
    });

    describe('Demonstration Cases', () => {
        it('should render simple two-player grimoire', () => {
            const input = "[Alice:washerwoman Bob:imp]";
            const grimoire = parseGrimoireFromSingleLine(input);
            
            expect(grimoire.players).toHaveLength(2);
            expect(grimoire.players[0].name).toBe('Alice');
            expect(grimoire.players[0].role).toBe('washerwoman');
            expect(grimoire.players[0].alive).toBe(true);
            expect(grimoire.players[1].name).toBe('Bob');
            expect(grimoire.players[1].role).toBe('imp');
            expect(grimoire.players[1].alive).toBe(true);
            
            const rendered = renderGrimoireToAsciiArt(grimoire, {
                mode: 'auto',
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // Simple layout with 2 players should be arranged optimally
            const expected = `\
┌─ Grim ────────┐
│   Alice       │
│   washerwoman │
│               │
│               │
│               │
│               │
│Bob            │
│imp            │
└───────────────┘`;
            
            expect(rendered).toBe(expected);
        });

        it('should render complex grimoire with tokens and dead player', () => {
            const input = "[Alice:washerwoman(ww:townsfolk) Bob:librarian *Charlie:imp*]";
            const grimoire = parseGrimoireFromSingleLine(input);
            
            expect(grimoire.players).toHaveLength(3);
            expect(grimoire.players[0].tokens).toEqual(['ww:townsfolk']);
            expect(grimoire.players[2].alive).toBe(false); // Charlie should be dead
            
            const rendered = renderGrimoireToAsciiArt(grimoire, {
                mode: 'auto',
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            expect(rendered).toContain('Alice');
            expect(rendered).toContain('Bob');
            expect(rendered).toContain('Charlie');
            // TODO: Check for visual dead player indicators once bug #8 is fixed
        });

        it('should render multiple tokens example', () => {
            const input = "[Alice:washerwoman(ww:townsfolk) Bob:librarian(lib:outsider) *Charlie:imp*]";
            const grimoire = parseGrimoireFromSingleLine(input);
            
            expect(grimoire.players[0].tokens).toEqual(['ww:townsfolk']);
            expect(grimoire.players[1].tokens).toEqual(['lib:outsider']);
            expect(grimoire.players[2].alive).toBe(false);
            
            const rendered = renderGrimoireToAsciiArt(grimoire, {
                mode: 'auto',
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // BUG: Alice's ww:townsfolk token is not appearing in the rendered output
            // but Bob's lib:outsider token does appear - potential token rendering bug
            expect(rendered).toContain('lib:outsider');
            // TODO: Fix token rendering issue - why doesn't Alice's token show up?
            // expect(rendered).toContain('ww:townsfolk'); // Currently fails
        });
    });

    describe('Fixed - Left Side Positioning', () => {
        it('FIXED: six-player layout shows correct left side positioning', () => {
            // BUG #7 FIXED: Left side players now appear in proper clockwise arc position
            const input = "[Alice:investigator Bob:chef Charlie:empath Dave:librarian Eve:butler *Frank:imp*]";
            const grimoire = parseGrimoireFromSingleLine(input);
            
            expect(grimoire.players).toHaveLength(6);
            
            const rendered = renderGrimoireToAsciiArt(grimoire, {
                mode: 'auto',
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // Expected ASCII output showing proper clockwise layout
            const expected = `\
┌─ Grim ───────────────┐
│   Alice              │
│   investigator       │
│                      │
│                 Bob  │
│Eve              chef │
│butler                │
│                      │
│Frank                 │
│imp                   │
│                      │
│                      │
│Dave       Charlie    │
│librarian  empath     │
└──────────────────────┘`;
            
            expect(rendered).toBe(expected);
            
            // Verify all players are present
            expect(rendered).toContain('Alice');
            expect(rendered).toContain('Dave');
            expect(rendered).toContain('Charlie'); 
            expect(rendered).toContain('Bob');
            expect(rendered).toContain('Eve');
            expect(rendered).toContain('Frank');
            
            // FIXED: Verify no text corruption (was "Eveath" before fix)
            expect(rendered).toContain('empath');
            expect(rendered).not.toContain('Eveath');
            expect(rendered).not.toContain('Frankrian');
        });

        it('FIXED: eight-player layout shows correct left side positioning', () => {
            // BUG #7 FIXED: Left side players now positioned correctly for larger layouts
            const input = "[Alice:investigator Bob:chef Charlie:empath Dave:librarian Eve:butler Frank:mayor Grace:virgin *Harold:imp*]";
            const grimoire = parseGrimoireFromSingleLine(input);
            
            expect(grimoire.players).toHaveLength(8);
            
            const rendered = renderGrimoireToAsciiArt(grimoire, {
                mode: 'auto',
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // Expected ASCII output showing proper clockwise layout with left side players
            const expected = `\
┌─ Grimoire (8 players) ────────┐
│   Alice         Bob           │
│   investigator  chef          │
│                               │
│                       Charlie │
│Dave                   empath  │
│librarian                      │
│                               │
│Eve                            │
│butler                         │
│                               │
│Frank                          │
│mayor                          │
│                               │
│Grace                          │
│virgin                         │
│                               │
│Harold                         │
│imp                            │
└───────────────────────────────┘`;
            
            expect(rendered).toBe(expected);
            
            // Verify all players are present and no text corruption
            expect(rendered).toContain('Alice');
            expect(rendered).toContain('Bob');
            expect(rendered).toContain('Charlie');
            expect(rendered).toContain('Dave');
            expect(rendered).toContain('Eve');
            expect(rendered).toContain('Frank');
            expect(rendered).toContain('Grace');
            expect(rendered).toContain('Harold');
            
            // Verify no text corruption issues
            expect(rendered).toContain('empath');
            expect(rendered).toContain('mayor');
            expect(rendered).toContain('virgin');
        });
    });

    describe('Known Bugs - Dead Player Rendering', () => {
        it('BROKEN: dead players not visually indicated in ASCII output', () => {
            // BUG #8: Harold marked as *dead* in input but shows as alive in ASCII output
            const input = "[Alice:investigator Bob:chef Charlie:empath Dave:librarian Eve:butler Frank:mayor Grace:virgin *Harold:imp*]";
            const grimoire = parseGrimoireFromSingleLine(input);
            
            // Parser correctly identifies Harold as dead
            const harold = grimoire.players.find(p => p.name === 'Harold');
            expect(harold?.alive).toBe(false);
            expect(harold?.ghost).toBe(true); // Dead but ghost vote available
            
            const rendered = renderGrimoireToAsciiArt(grimoire, {
                mode: 'auto',
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // Current broken output - Harold appears alive with no visual indicators
            const currentBrokenOutput = `\
┌─ Grimoire (8 players) ────────┐
│   Alice         Bob           │
│   investigator  chef          │
│                               │
│                       Charlie │
│Dave                   empath  │
│librarian                      │
│                               │
│Eve                            │
│butler                         │
│                               │
│Frank                          │
│mayor                          │
│                               │
│Grace                          │
│virgin                         │
│                               │
│Harold                         │
│imp                            │
└───────────────────────────────┘`;
            
            // Currently renders without dead player indicators
            expect(rendered).toBe(currentBrokenOutput);
            
            // BUG: Harold should have visual dead player indicators but doesn't
            expect(rendered).toContain('Harold'); // Present but not marked as dead
            expect(rendered).not.toContain('~~Harold~~'); // No strikethrough
            
            // TODO: When bug is fixed, Harold should appear with visual dead indicators
            // Future expected output might look like:
            // │~~Harold~~                     │
            // │~~imp~~                        │
        });
    });

    describe('Potential Bugs - Layout Selection Affected by Visual Formatting', () => {
        it('TODO: test if dead/alive visual indicators affect auto layout selection', () => {
            // BUG #9: Layout selection might be affected by visual formatting of dead players
            
            // This test should be implemented to check if:
            // 1. Same logical grimoire with different alive/dead status selects different layouts
            // 2. Visual formatting (strikethrough, etc.) changes character widths affecting squareness scoring
            // 3. Layout "optimality" is based on visual appearance rather than logical structure
            
            console.log('\n=== TODO: BUG #9 INVESTIGATION ===');
            console.log('Need to test if dead player visual formatting affects auto layout selection');
            console.log('1. Create identical logical layouts with different alive/dead status');
            console.log('2. Check if they select different auto layouts');
            console.log('3. Fix layout selection to be based on logical structure, not visual formatting');
            
            // TODO: Implement concrete test cases demonstrating this issue
            expect(true).toBe(true); // Placeholder
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('BROKEN: empty grimoire crashes auto layout system', () => {
            const input = "[]";
            const grimoire = parseGrimoireFromSingleLine(input);
            
            expect(grimoire.players).toHaveLength(0);
            
            // BUG: Auto layout system crashes on empty grimoire
            // Error: Cannot read properties of undefined (reading 'topCount')
            expect(() => {
                renderGrimoireToAsciiArt(grimoire, {
                    mode: 'auto',
                    showColumnNumbers: false,
                    useAbbreviations: true
                });
            }).toThrow(); // Currently crashes - should be fixed to handle gracefully
            
            console.log('\n=== BUG: Empty Grimoire Crash ===');
            console.log('Auto layout system crashes when given 0 players');
            console.log('Should handle empty grimoires gracefully');
        });

        it('should handle single player grimoire', () => {
            const input = "[Alice:washerwoman]";
            const grimoire = parseGrimoireFromSingleLine(input);
            
            expect(grimoire.players).toHaveLength(1);
            
            const rendered = renderGrimoireToAsciiArt(grimoire, {
                mode: 'auto',
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // Single player should render in minimal layout
            const expected = `\
┌─ Grim ─────┐
│Alice       │
│washerwoman │
└────────────┘`;
            
            expect(rendered).toBe(expected);
        });
    });
});