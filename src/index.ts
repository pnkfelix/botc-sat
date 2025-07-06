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

// Import types for use in the class
import { BagLegalityValidator } from './core/bag-compiler';
import { RoleDistribution } from './core/roles';
import { registerTroubleBrewing } from './data/trouble-brewing-roles';
import { troubleBrewing } from './core/scripts';

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
}

// Default export for simple usage
export default BOTCValidator;