// Thin typed wrapper around JSMiniSolvers CNF interface
declare const minisolvers: any; // Global available in browser

// Try to require JSMiniSolvers for Node.js
let nodeJSMiniSolvers: any = null;
try {
    nodeJSMiniSolvers = require('../vendor/minisolvers.js');
} catch (e) {
    // Will use global minisolvers in browser
}

export interface SATResult {
    satisfiable: boolean;
    model?: Record<string, boolean>;
}

/**
 * Thin typed wrapper around JSMiniSolvers.
 * Exposes CNF interface directly with variable name mapping.
 * 
 * Usage:
 *   const solver = new SATSolver();
 *   const x = solver.addVariable('baron_present');
 *   const y = solver.addVariable('outsider_count_2');
 *   solver.addClause([x]);        // baron_present = true
 *   solver.addClause([-x, y]);    // baron_present => outsider_count_2  
 *   const result = solver.solve();
 */
export class SATSolver {
    private variableMap: Map<string, number> = new Map();
    private reverseMap: Map<number, string> = new Map();
    private nextVarId: number = 1;
    private solver: any = null;
    private solved: boolean = false;

    constructor() {
        this.initializeSolver();
    }

    private initializeSolver(): void {
        const solvers = nodeJSMiniSolvers || (typeof minisolvers !== 'undefined' ? minisolvers : null);
        
        if (!solvers) {
            throw new Error("JSMiniSolvers not available in this environment");
        }
        
        this.solver = new solvers.MinisatSolver();
    }

    /**
     * Add a new variable and return its ID.
     * Variables are 1-indexed (JSMiniSolvers convention).
     */
    addVariable(name: string): number {
        if (this.variableMap.has(name)) {
            return this.variableMap.get(name)!;
        }
        
        const varId = this.nextVarId++;
        this.variableMap.set(name, varId);
        this.reverseMap.set(varId, name);
        
        // Create variable in underlying solver
        this.solver.new_var();
        
        return varId;
    }

    /**
     * Get variable ID for existing variable (undefined if not found).
     */
    getVariableId(name: string): number | undefined {
        return this.variableMap.get(name);
    }

    /**
     * Get variable name for ID (undefined if not found).
     */
    getVariableName(id: number): string | undefined {
        return this.reverseMap.get(id);
    }

    /**
     * Add a CNF clause to the solver.
     * 
     * @param literals Array of variable IDs (positive = true, negative = false)
     *                 Example: [1, -2] means "var1 OR NOT var2"
     */
    addClause(literals: number[]): void {
        if (this.solved) {
            throw new Error("Cannot add clauses after solve() has been called. Create a new solver instance.");
        }
        
        // Validate all variables exist
        for (const lit of literals) {
            const varId = Math.abs(lit);
            if (varId === 0 || varId >= this.nextVarId) {
                throw new Error(`Invalid variable ID: ${varId}. Use addVariable() first.`);
            }
        }
        
        this.solver.add_clause(literals);
    }

    /**
     * Add a unit clause (single literal).
     * Convenience method for common case.
     */
    addUnitClause(variableId: number, value: boolean): void {
        this.addClause([value ? variableId : -variableId]);
    }

    /**
     * Solve the current set of clauses.
     * @returns true if satisfiable, false if unsatisfiable
     */
    solve(): boolean {
        const result = this.solver.solve();
        this.solved = true;
        return result === 1;
    }

    /**
     * Get the satisfying model (if solve() returned true).
     * @returns Object mapping variable names to boolean values, or null if unsatisfiable
     */
    getModel(): Record<string, boolean> | null {
        if (!this.solved) {
            throw new Error("Must call solve() first");
        }
        
        const rawModel = this.solver.get_model();
        if (!rawModel) {
            return null;
        }
        
        const model: Record<string, boolean> = {};
        for (const [varName, varId] of this.variableMap.entries()) {
            // JSMiniSolvers uses 0-based array but 1-based variable IDs
            model[varName] = Boolean(rawModel[varId - 1]);
        }
        
        return model;
    }

    /**
     * Complete solve operation returning both satisfiability and model.
     */
    solveWithModel(): SATResult {
        const satisfiable = this.solve();
        return {
            satisfiable,
            model: satisfiable ? this.getModel() || undefined : undefined
        };
    }

    /**
     * Get number of variables created.
     */
    getVariableCount(): number {
        return this.nextVarId - 1;
    }

    /**
     * Get all variable names.
     */
    getVariableNames(): string[] {
        return Array.from(this.variableMap.keys());
    }

    /**
     * Reset solver state (creates new solver instance).
     */
    reset(): void {
        this.variableMap.clear();
        this.reverseMap.clear();
        this.nextVarId = 1;
        this.solved = false;
        this.initializeSolver();
    }
}