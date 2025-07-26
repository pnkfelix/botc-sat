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

        it('should validate drunk token placement on townsfolk only', () => {
            // Valid: drunk token on a townsfolk player (librarian), need both librarian tokens
            const validGrimoire = createTestGrimoire([
                { name: 'Alice', role: 'librarian', tokens: ['drunk:is_the_drunk', 'librarian:outsider'] }, // Drunk token on townsfolk + required librarian token
                { name: 'Bob', role: 'chef', tokens: ['librarian:wrong'] }, // Second required librarian token
                { name: 'Carol', role: 'drunk', tokens: [] }, // Actual drunk player (no token on them)
                { name: 'Dave', role: 'butler', tokens: [] },
                { name: 'Eve', role: 'poisoner', tokens: [] },
                { name: 'Frank', role: 'imp', tokens: [] }
            ]);

            const solver1 = new SATSolver();
            const compiler1 = new ReminderTokenCompiler();
            compiler1.compileReminderTokenConstraints(troubleBrewing, solver1, 6, validGrimoire);
            
            const result1 = solver1.solve();
            expect(result1).toBe(true); // Should be valid - drunk token on townsfolk

            // Invalid: drunk token on outsider (drunk itself)
            const invalidGrimoire = createTestGrimoire([
                { name: 'Alice', role: 'librarian', tokens: ['librarian:outsider'] },
                { name: 'Bob', role: 'chef', tokens: ['librarian:wrong'] },
                { name: 'Carol', role: 'drunk', tokens: ['drunk:is_the_drunk'] }, // Drunk token on drunk itself!
                { name: 'Dave', role: 'butler', tokens: [] },
                { name: 'Eve', role: 'poisoner', tokens: [] },
                { name: 'Frank', role: 'imp', tokens: [] }
            ]);

            const solver2 = new SATSolver();
            const compiler2 = new ReminderTokenCompiler();
            compiler2.compileReminderTokenConstraints(troubleBrewing, solver2, 6, invalidGrimoire);
            
            const result2 = solver2.solve();
            expect(result2).toBe(false); // Should be invalid - drunk token cannot be on drunk
        });

        it('should validate fortune teller red herring placement on good players only', () => {
            // Valid: red herring on outsider (good player)
            const validGrimoire = createTestGrimoire([
                { name: 'Alice', role: 'fortune_teller', tokens: [] },
                { name: 'Bob', role: 'chef', tokens: [] },
                { name: 'Carol', role: 'butler', tokens: ['fortune_teller:red_herring'] }, // Red herring on outsider (good)
                { name: 'Dave', role: 'saint', tokens: [] },
                { name: 'Eve', role: 'poisoner', tokens: [] },
                { name: 'Frank', role: 'imp', tokens: [] }
            ]);

            const solver1 = new SATSolver();
            const compiler1 = new ReminderTokenCompiler();
            compiler1.compileReminderTokenConstraints(troubleBrewing, solver1, 6, validGrimoire);
            
            const result1 = solver1.solve();
            expect(result1).toBe(true); // Should be valid - red herring on good player

            // Invalid: red herring on minion (evil player)
            const invalidGrimoire = createTestGrimoire([
                { name: 'Alice', role: 'fortune_teller', tokens: [] },
                { name: 'Bob', role: 'chef', tokens: [] },
                { name: 'Carol', role: 'butler', tokens: [] },
                { name: 'Dave', role: 'saint', tokens: [] },
                { name: 'Eve', role: 'poisoner', tokens: ['fortune_teller:red_herring'] }, // Red herring on minion!
                { name: 'Frank', role: 'imp', tokens: [] }
            ]);

            const solver2 = new SATSolver();
            const compiler2 = new ReminderTokenCompiler();
            compiler2.compileReminderTokenConstraints(troubleBrewing, solver2, 6, invalidGrimoire);
            
            const result2 = solver2.solve();
            expect(result2).toBe(false); // Should be invalid - red herring cannot be on evil player
        });
    });
});