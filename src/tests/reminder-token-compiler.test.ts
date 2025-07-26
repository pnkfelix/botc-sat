import { describe, it, expect, beforeAll } from 'vitest';
import { ReminderTokenCompiler } from '../core/reminder-token-compiler';
import { SATSolver } from '../core/solver';
import { troubleBrewing } from '../core/scripts';
import { registerTroubleBrewing } from '../data/trouble-brewing-roles';
import { GrimoireState, PlayerState } from '../core/grimoire';
import { renderGrimoireToAsciiArt } from '../rendering/ascii-grimoire';

// Helper function to create a test grimoire with specific token placements
function createTestGrimoire(players: Array<{name: string, role: string, tokens: string[]}>, alive: boolean[] = []): GrimoireState {
    const playerStates: PlayerState[] = players.map((p, index) => ({
        name: p.name,
        role: p.role,
        alive: alive[index] !== undefined ? alive[index] : true,
        position: index,
        tokens: p.tokens,
        ghost: false
    }));
    
    return { players: playerStates };
}

describe('Reminder Token Constraint Compilation', () => {
    beforeAll(() => {
        registerTroubleBrewing();
    });

    it('should generate token placement variables for all roles and positions', () => {
        const solver = new SATSolver();
        const compiler = new ReminderTokenCompiler();

        const tokenVarCount = compiler.compileReminderTokenConstraints(troubleBrewing, solver, 7);
        
        // Should generate variables for tokens at all positions
        expect(tokenVarCount).toBeGreaterThan(0);
        expect(solver.getVariableCount()).toBeGreaterThan(100); // Many token placement variables
        expect(solver.getClauseCount()).toBeGreaterThan(0); // Should have constraints
        
        // Check specific expected token variables exist
        const expectedTokenVars = [
            'token_placed_washerwoman_townsfolk_at_0',
            'token_placed_washerwoman_townsfolk_at_6', 
            'token_placed_virgin_no_ability_at_3',
            'token_placed_slayer_no_ability_at_5'
        ];

        for (const varName of expectedTokenVars) {
            const varId = solver.getVariableId(varName);
            expect(varId).toBeDefined();
            expect(varId).toBeGreaterThan(0);
        }
    });

    describe('Visual constraint scenarios with rendered grimoires', () => {

        it('should validate virgin token placed on virgin player', () => {
            const validGrimoire = createTestGrimoire([
                { name: 'Alice', role: 'washerwoman', tokens: ['washerwoman:townsfolk'] },
                { name: 'Bob', role: 'chef', tokens: ['washerwoman:wrong'] }, // Washerwoman's second token
                { name: 'Carol', role: 'virgin', tokens: ['virgin:no_ability'] }, // Virgin with token
                { name: 'Dave', role: 'butler', tokens: [] },
                { name: 'Eve', role: 'drunk', tokens: [] },
                { name: 'Frank', role: 'poisoner', tokens: [] },
                { name: 'Grace', role: 'imp', tokens: [] }
            ]);

            // Test constraint validation
            const solver = new SATSolver();
            const compiler = new ReminderTokenCompiler();
            compiler.compileReminderTokenConstraints(troubleBrewing, solver, 7, validGrimoire);
            
            const result = solver.solve();
            expect(result).toBe(true); // Should be valid

            // Test rendered grimoire format
            const rendered = renderGrimoireToAsciiArt(validGrimoire, { mode: 'auto', useAbbreviations: true });
            const expected = `\
┌─ Grimoire (7 players) ──────────────────────────────────────────────────────────────┐
│                                                                                     │
│                                                                                     │
│                                                                                     │
│                                                                                     │
│                                                                                     │
│                                                                                     │
│                                                                                     │
│                    (ww:townsfolk)     (ww:wrong)  (virgin:no_ability)               │
│                    Alice              Bob         Carol                Dave         │
│                    washerwoman        chef        virgin               butler       │
│                                                                                     │
│                                                                                     │
│    Frank                                                                            │
│    poisoner                                                                         │
│                                                                                     │
│ Grace                                                                               │
│ imp                                                                                 │
│                                                                                     │
│                                                                                     │
│                    Eve                                                              │
│                    drunk                                                            │
└─────────────────────────────────────────────────────────────────────────────────────┘`;
            
            expect(rendered).toBe(expected);
        });

        it('should reject washerwoman missing required tokens', () => {
            const invalidGrimoire = createTestGrimoire([
                { name: 'Alice', role: 'washerwoman', tokens: ['washerwoman:townsfolk'] }, // Missing wrong token!
                { name: 'Bob', role: 'chef', tokens: [] },
                { name: 'Carol', role: 'virgin', tokens: ['virgin:no_ability'] },
                { name: 'Dave', role: 'butler', tokens: [] },
                { name: 'Eve', role: 'drunk', tokens: [] },
                { name: 'Frank', role: 'poisoner', tokens: [] },
                { name: 'Grace', role: 'imp', tokens: [] }
            ]);

            // Test constraint validation
            const solver = new SATSolver();
            const compiler = new ReminderTokenCompiler();
            compiler.compileReminderTokenConstraints(troubleBrewing, solver, 7, invalidGrimoire);
            
            const result = solver.solve();
            expect(result).toBe(false); // Should be invalid - washerwoman missing wrong token

            // Test rendered grimoire format shows missing token
            const rendered = renderGrimoireToAsciiArt(invalidGrimoire, { mode: 'auto', useAbbreviations: true });
            const expected = `\
┌─ Grimoire (7 players) ──────────────────────────────────────────────────────────────┐
│                                                                                     │
│                                                                                     │
│                                                                                     │
│                                                                                     │
│                                                                                     │
│                                                                                     │
│                                                                                     │
│                    (ww:townsfolk)                 (virgin:no_ability)               │
│                    Alice              Bob         Carol                Dave         │
│                    washerwoman        chef        virgin               butler       │
│                                                                                     │
│                                                                                     │
│    Frank                                                                            │
│    poisoner                                                                         │
│                                                                                     │
│ Grace                                                                               │
│ imp                                                                                 │
│                                                                                     │
│                                                                                     │
│                    Eve                                                              │
│                    drunk                                                            │
└─────────────────────────────────────────────────────────────────────────────────────┘`;
            
            expect(rendered).toBe(expected);
        });

        it('should reject virgin token placed on non-virgin player', () => {
            const invalidGrimoire = createTestGrimoire([
                { name: 'Alice', role: 'washerwoman', tokens: [] },
                { name: 'Bob', role: 'chef', tokens: ['virgin:no_ability'] }, // Virgin token on chef!
                { name: 'Carol', role: 'virgin', tokens: [] }, // Virgin with no token
                { name: 'Dave', role: 'butler', tokens: [] },
                { name: 'Eve', role: 'drunk', tokens: [] },
                { name: 'Frank', role: 'poisoner', tokens: [] },
                { name: 'Grace', role: 'imp', tokens: [] }
            ]);

            // Test constraint validation
            const solver = new SATSolver();
            const compiler = new ReminderTokenCompiler();
            compiler.compileReminderTokenConstraints(troubleBrewing, solver, 7, invalidGrimoire);
            
            const result = solver.solve();
            expect(result).toBe(false); // Should be invalid

            // Test rendered grimoire format shows invalid placement
            const rendered = renderGrimoireToAsciiArt(invalidGrimoire, { mode: 'auto', useAbbreviations: true });
            const expected = `\
┌─ Grimoire (7 players) ────────────────────────────────────────────────────────────────┐
│                                                                                       │
│                                                                                       │
│                                                                                       │
│                                                                                       │
│                                                                                       │
│                                                                                       │
│                                                                                       │
│                                       (virgin:no_ability)                             │
│                    Alice              Bob                  Carol         Dave         │
│                    washerwoman        chef                 virgin        butler       │
│                                                                                       │
│                                                                                       │
│    Frank                                                                              │
│    poisoner                                                                           │
│                                                                                       │
│ Grace                                                                                 │
│ imp                                                                                   │
│                                                                                       │
│                                                                                       │
│                    Eve                                                                │
│                    drunk                                                              │
└───────────────────────────────────────────────────────────────────────────────────────┘`;
            
            expect(rendered).toBe(expected);
        });

        it('should reject virgin token when virgin role is not in game', () => {
            const invalidGrimoire = createTestGrimoire([
                { name: 'Alice', role: 'washerwoman', tokens: [] },
                { name: 'Bob', role: 'chef', tokens: ['virgin:no_ability'] }, // Virgin token but no virgin in game
                { name: 'Carol', role: 'slayer', tokens: [] }, // Slayer instead of virgin
                { name: 'Dave', role: 'butler', tokens: [] },
                { name: 'Eve', role: 'drunk', tokens: [] },
                { name: 'Frank', role: 'poisoner', tokens: [] },
                { name: 'Grace', role: 'imp', tokens: [] }
            ]);

            // Test constraint validation
            const solver = new SATSolver();
            const compiler = new ReminderTokenCompiler();
            compiler.compileReminderTokenConstraints(troubleBrewing, solver, 7, invalidGrimoire);
            
            const result = solver.solve();
            expect(result).toBe(false); // Should be invalid

            // Test rendered grimoire format shows virgin token without virgin role
            const rendered = renderGrimoireToAsciiArt(invalidGrimoire, { mode: 'auto', useAbbreviations: true });
            const expected = `\
┌─ Grimoire (7 players) ────────────────────────────────────────────────────────────────┐
│                                                                                       │
│                                                                                       │
│                                                                                       │
│                                                                                       │
│                                                                                       │
│                                                                                       │
│                                                                                       │
│                                       (virgin:no_ability)                             │
│                    Alice              Bob                  Carol         Dave         │
│                    washerwoman        chef                 slayer        butler       │
│                                                                                       │
│                                                                                       │
│    Frank                                                                              │
│    poisoner                                                                           │
│                                                                                       │
│ Grace                                                                                 │
│ imp                                                                                   │
│                                                                                       │
│                                                                                       │
│                    Eve                                                                │
│                    drunk                                                              │
└───────────────────────────────────────────────────────────────────────────────────────┘`;
            
            expect(rendered).toBe(expected);
        });

        it('should validate information tokens placed anywhere when role is present', () => {
            const validGrimoire = createTestGrimoire([
                { name: 'Alice', role: 'washerwoman', tokens: [] }, // Washerwoman present
                { name: 'Bob', role: 'chef', tokens: ['washerwoman:townsfolk'] }, // Info token on different player
                { name: 'Carol', role: 'empath', tokens: ['washerwoman:wrong'] }, // Another info token elsewhere
                { name: 'Dave', role: 'butler', tokens: [] },
                { name: 'Eve', role: 'drunk', tokens: [] },
                { name: 'Frank', role: 'poisoner', tokens: [] },
                { name: 'Grace', role: 'imp', tokens: [] }
            ]);

            // Test constraint validation
            const solver = new SATSolver();
            const compiler = new ReminderTokenCompiler();
            compiler.compileReminderTokenConstraints(troubleBrewing, solver, 7, validGrimoire);
            
            const result = solver.solve();
            expect(result).toBe(true); // Should be valid

            // Test rendered grimoire format shows information tokens placed anywhere
            const rendered = renderGrimoireToAsciiArt(validGrimoire, { mode: 'auto', useAbbreviations: true });
            const expected = `\
┌─ Grimoire (7 players) ───────────────────────────────────────────────────────────┐
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                       (ww:townsfolk)  (ww:wrong)                 │
│                    Alice              Bob             Carol         Dave         │
│                    washerwoman        chef            empath        butler       │
│                                                                                  │
│                                                                                  │
│    Frank                                                                         │
│    poisoner                                                                      │
│                                                                                  │
│ Grace                                                                            │
│ imp                                                                              │
│                                                                                  │
│                                                                                  │
│                    Eve                                                           │
│                    drunk                                                         │
└──────────────────────────────────────────────────────────────────────────────────┘`;
            
            expect(rendered).toBe(expected);
        });

        it('should reject information token when role is not in game', () => {
            const invalidGrimoire = createTestGrimoire([
                { name: 'Alice', role: 'librarian', tokens: [] }, // Librarian, not washerwoman
                { name: 'Bob', role: 'chef', tokens: ['washerwoman:townsfolk'] }, // Washerwoman token but no washerwoman
                { name: 'Carol', role: 'empath', tokens: [] },
                { name: 'Dave', role: 'butler', tokens: [] },
                { name: 'Eve', role: 'drunk', tokens: [] },
                { name: 'Frank', role: 'poisoner', tokens: [] },
                { name: 'Grace', role: 'imp', tokens: [] }
            ]);

            // Test constraint validation
            const solver = new SATSolver();
            const compiler = new ReminderTokenCompiler();
            compiler.compileReminderTokenConstraints(troubleBrewing, solver, 7, invalidGrimoire);
            
            const result = solver.solve();
            expect(result).toBe(false); // Should be invalid

            // Test rendered grimoire format shows washerwoman token without washerwoman role
            const rendered = renderGrimoireToAsciiArt(invalidGrimoire, { mode: 'auto', useAbbreviations: true });
            const expected = `\
┌─ Grimoire (7 players) ───────────────────────────────────────────────────────────┐
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                               (ww:townsfolk)                                     │
│              Alice            Bob             Carol         Dave                 │
│              librarian        chef            empath        butler               │
│                                                                                  │
│                                                                         Eve      │
│ Grace                                                                   drunk    │
│ imp                                                                              │
│                                                                                  │
│                                                                                  │
│              Frank                                                               │
│              poisoner                                                            │
└──────────────────────────────────────────────────────────────────────────────────┘`;
            
            expect(rendered).toBe(expected);
        });
    });
});