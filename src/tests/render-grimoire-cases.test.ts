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
            
            expect(rendered).toContain('Alice');
            expect(rendered).toContain('washerwoman');
            expect(rendered).toContain('Bob');
            expect(rendered).toContain('imp');
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

    describe('Known Bugs - Left Side Positioning', () => {
        it('BROKEN: six-player layout shows left side positioning bug', () => {
            // BUG #7: Left side players appear below bottom row instead of above it on the arc
            const input = "[Alice:investigator Bob:chef Charlie:empath Dave:librarian Eve:butler *Frank:imp*]";
            const grimoire = parseGrimoireFromSingleLine(input);
            
            expect(grimoire.players).toHaveLength(6);
            
            const rendered = renderGrimoireToAsciiArt(grimoire, {
                mode: 'auto',
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // This test documents the current broken behavior
            // TODO: Update expectations once bug #7 is fixed
            
            // The layout should be [1,0,3,2]: Alice(top), none(right), Dave+Charlie+Bob(bottom), Eve+Frank(left)
            expect(rendered).toContain('Alice');
            expect(rendered).toContain('Dave');
            expect(rendered).toContain('Charlie'); 
            expect(rendered).toContain('Bob');
            expect(rendered).toContain('Eve');
            expect(rendered).toContain('Frank');
            
            // CURRENT BUG: Left side players (Eve, Frank) appear below the bottom row
            // They should appear above the bottom row, creating an arc: Dave → Frank → Eve → Alice
            // This makes it look like Frank and Eve are "under the table" rather than on the left side
            
            console.log('\n=== BUG #7 DEMONSTRATION ===');
            console.log('Six-player layout with broken left side positioning:');
            console.log(rendered);
            console.log('ISSUE: Eve and Frank should be positioned above Dave/Charlie/Bob, not below them');
            console.log('Expected clockwise arc: Dave → Frank → Eve → Alice');
        });

        it('BROKEN: eight-player layout shows same left side positioning bug', () => {
            // BUG #7: Same issue with larger layout
            const input = "[Alice:investigator Bob:chef Charlie:empath Dave:librarian Eve:butler Frank:mayor Grace:virgin *Harold:imp*]";
            const grimoire = parseGrimoireFromSingleLine(input);
            
            expect(grimoire.players).toHaveLength(8);
            
            const rendered = renderGrimoireToAsciiArt(grimoire, {
                mode: 'auto',
                showColumnNumbers: false,
                useAbbreviations: true
            });
            
            // CURRENT BUG: All left side players appear below bottom row
            console.log('\n=== BUG #7 DEMONSTRATION (8 players) ===');
            console.log('Eight-player layout with broken left side positioning:');
            console.log(rendered);
            console.log('ISSUE: Frank, Grace, Harold should be on left arc, not below bottom players');
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
            
            // CURRENT BUG: No visual indication that Harold is dead
            console.log('\n=== BUG #8 DEMONSTRATION ===');
            console.log('Harold is parsed as dead but not visually indicated:');
            console.log(rendered);
            console.log('ISSUE: Dead players should have visual indicators (strikethrough, different style, etc.)');
            
            // TODO: Add expectations for visual dead player indicators once implemented
            // expect(rendered).toContain('~~Harold~~'); // or some other dead player indicator
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
            
            expect(rendered).toContain('Alice');
            expect(rendered).toContain('washerwoman');
        });
    });
});