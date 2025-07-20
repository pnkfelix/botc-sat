// Blood on the Clocktower DSL - Main Library Entry Point

// Core constraint system
export { SATSolver } from './core/solver';
export { ScriptToSATCompiler } from './core/script-compiler';
export { BagLegalityValidator, BagLegalityProblem } from './core/bag-compiler';
export { RoleDistribution, getRole } from './core/roles';
export { Script } from './core/scripts';

// Game data
export { registerTroubleBrewing } from './data/trouble-brewing-roles';
export { troubleBrewing } from './core/scripts';

// Grimoire types and rendering
export { GrimoireState, PlayerState } from './core/grimoire';
export { renderGrimoireToAsciiArt } from './rendering/ascii-grimoire';
export { renderGrimoireToSingleLine } from './rendering/single-line-format';
export { RenderOptions, TurnBasedLayout } from './rendering/types';

// Parsing
export { parseGrimoireFromStream, parseGrimoireFromSingleLine } from './parsing/single-line-parser';

// Import types for use in the class
import { BagLegalityValidator } from './core/bag-compiler';
import { RoleDistribution } from './core/roles';
import { registerTroubleBrewing } from './data/trouble-brewing-roles';
import { troubleBrewing } from './core/scripts';
import { GrimoireState, PlayerState } from './core/grimoire';
import { renderGrimoireToAsciiArt } from './rendering/ascii-grimoire';
import { renderGrimoireToSingleLine } from './rendering/single-line-format';
import { RenderOptions } from './rendering/types';

// Analysis tools (for advanced users)
export { constraintMatrixAnalysis } from './analysis/constraint-matrix-analysis';
export { firstSolutionAnalysis } from './analysis/first-solution-analysis';

// Main library interface for common use cases
export class BOTCValidator {
    private validator: BagLegalityValidator;

    constructor() {
        this.validator = new BagLegalityValidator();
        // Auto-register Trouble Brewing roles
        registerTroubleBrewing();
    }

    /**
     * Check if a bag setup is legal according to BOTC rules
     */
    async validateBag(
        playerCount: number,
        selectedRoles: string[],
        inPlayDistribution: RoleDistribution,
        physicalBag: Map<string, number>
    ) {
        return this.validator.checkBagLegality({
            script: troubleBrewing,
            playerCount,
            selectedRoles,
            inPlayDistribution,
            physicalBag
        });
    }

    /**
     * Generate a legal bag setup for the given player count and preferences
     */
    async generateBag(
        playerCount: number,
        preferences?: {
            mustInclude?: string[],
            mustExclude?: string[]
        }
    ) {
        return this.validator.generateLegalBag(troubleBrewing, playerCount, preferences);
    }

    /**
     * Generate multiple diverse legal bag setups
     */
    async generateMultipleBags(
        playerCount: number,
        options?: {
            mustInclude?: string[],
            mustExclude?: string[],
            maxSolutions?: number,
            useVariableIndirection?: boolean
        }
    ) {
        return this.validator.generateMultipleLegalBags(troubleBrewing, playerCount, options);
    }

    /**
     * Generate an initial game state by distributing roles from a legal bag to named players
     */
    generateInitialGameState(
        selectedRoles: string[],
        playerNames: string[],
        options?: {
            shuffle?: boolean,  // Whether to shuffle role assignments (default: true)
            seed?: number      // Random seed for deterministic shuffling
        }
    ): GrimoireState {
        if (selectedRoles.length !== playerNames.length) {
            throw new Error(`Role count (${selectedRoles.length}) must equal player count (${playerNames.length})`);
        }

        const shuffle = options?.shuffle ?? true;
        let assignments: string[];

        if (shuffle) {
            // Shuffle roles for random assignment
            assignments = [...selectedRoles];
            const seed = options?.seed ?? Math.floor(Math.random() * 1000000);
            
            // Simple seeded shuffle (Fisher-Yates with seeded random)
            let rng = seed;
            for (let i = assignments.length - 1; i > 0; i--) {
                rng = (rng * 1103515245 + 12345) & 0x7fffffff; // Linear congruential generator
                const j = rng % (i + 1);
                [assignments[i], assignments[j]] = [assignments[j], assignments[i]];
            }
        } else {
            // Use roles in the order provided
            assignments = selectedRoles;
        }

        // Create player states
        const players: PlayerState[] = playerNames.map((name, index) => ({
            name: name,
            role: assignments[index],
            alive: true,
            position: index,
            tokens: [], // No reminder tokens for initial state
            ghost: false
        }));

        return { players };
    }

    /**
     * Render a grimoire state as ASCII art
     */
    renderGrimoireAscii(grimoire: GrimoireState, options?: RenderOptions): string {
        return renderGrimoireToAsciiArt(grimoire, options);
    }

    /**
     * Render a grimoire state as a compact single line
     */
    renderGrimoireSingleLine(grimoire: GrimoireState, options?: { useAbbreviations?: boolean }): string {
        return renderGrimoireToSingleLine(grimoire, options);
    }
}

// Default export for simple usage
export default BOTCValidator;