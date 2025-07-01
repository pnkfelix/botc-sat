// JSMiniSolvers integration for both Node.js and browser
declare const minisolvers: any; // Global available in browser

// Try to require JSMiniSolvers for Node.js
let nodeJSMiniSolvers: any = null;
try {
    nodeJSMiniSolvers = require('../vendor/minisolvers.js');
} catch (e) {
    // Will use global minisolvers in browser
}

export class SATSolver {
    private variableMap: Map<string, number> = new Map();
    private nextVarId: number = 1;

    constructor() {
        // JSMiniSolvers will be available globally in browser
        // In Node.js, we'd need to require it or use a different approach
    }

    async solve(constraints: string[]): Promise<{ satisfiable: boolean; model?: any }> {
        console.log("Solving constraints:", constraints);
        
        // Get JSMiniSolvers from either Node.js require or browser global
        const solvers = nodeJSMiniSolvers || (typeof minisolvers !== 'undefined' ? minisolvers : null);
        
        if (solvers) {
            return this.solveWithJSMiniSolvers(constraints, solvers);
        } else {
            throw new Error("JSMiniSolvers not available in this environment");
        }
    }

    private solveWithJSMiniSolvers(constraints: string[], solvers: any): { satisfiable: boolean; model?: any } {
        const solver = new solvers.MinisatSolver();
        
        // Convert our string constraints to CNF clauses for MiniSat
        const clauses = this.convertConstraintsToCNF(constraints);
        
        // Add variables to solver
        for (let i = 1; i <= this.nextVarId - 1; i++) {
            solver.new_var();
        }
        
        // Add clauses to solver
        for (const clause of clauses) {
            solver.add_clause(clause);
        }
        
        const isSat = solver.solve();
        
        if (isSat) {
            const rawModel = solver.get_model();
            // Convert back to our variable names
            const model: Record<string, boolean> = {};
            for (const [varName, varId] of this.variableMap.entries()) {
                model[varName] = rawModel[varId - 1]; // MiniSat uses 1-based, array is 0-based
            }
            return { satisfiable: true, model };
        } else {
            return { satisfiable: false };
        }
    }


    private parseConstraint(constraint: string): { variable: string; value: boolean } | null {
        // Basic constraint parsing
        // Format: "variable=true" or "variable=false"
        if (constraint.includes('=')) {
            const [variable, value] = constraint.split('=').map(s => s.trim());
            return { variable, value: value === 'true' };
        }
        return null;
    }

    private getVariableId(variable: string): number {
        if (!this.variableMap.has(variable)) {
            this.variableMap.set(variable, this.nextVarId++);
        }
        return this.variableMap.get(variable)!;
    }

    private convertConstraintsToCNF(constraints: string[]): number[][] {
        // Convert our simple "variable=true/false" constraints to CNF clauses
        const clauses: number[][] = [];
        
        for (const constraint of constraints) {
            const parsed = this.parseConstraint(constraint);
            if (parsed) {
                const varId = this.getVariableId(parsed.variable);
                // Create a unit clause: [varId] for true, [-varId] for false
                clauses.push([parsed.value ? varId : -varId]);
            }
        }
        
        return clauses;
    }

    async checkLegality(gameState: any): Promise<boolean> {
        // This method will check if a game state is legal according to BOTC rules
        // Placeholder implementation
        const constraints = this.generateConstraintsFromGameState(gameState);
        const result = await this.solve(constraints);
        return result.satisfiable;
    }

    private generateConstraintsFromGameState(_gameState: any): string[] {
        // Convert BOTC game state to SAT constraints
        // This is where the BOTC rule logic will be implemented
        return [];
    }
}