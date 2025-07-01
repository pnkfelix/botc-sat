// Browser-compatible SATSolver implementation
// This can be loaded directly in the browser

class BrowserSATSolver {
    constructor() {
        this.variableMap = new Map();
        this.nextVarId = 1;
    }

    async solve(constraints) {
        console.log("Solving constraints:", constraints);
        
        // Get JSMiniSolvers from either Node.js require or browser global
        let solvers = null;
        if (typeof minisolvers !== 'undefined') {
            solvers = minisolvers; // Browser global
        } else if (typeof require !== 'undefined') {
            try {
                solvers = require('../vendor/minisolvers.js'); // Node.js
            } catch (e) {
                // Will throw error below
            }
        }
        
        if (solvers) {
            return this.solveWithJSMiniSolvers(constraints, solvers);
        } else {
            throw new Error("JSMiniSolvers not available in this environment");
        }
    }

    solveWithJSMiniSolvers(constraints, solvers) {
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
            const model = {};
            for (const [varName, varId] of this.variableMap.entries()) {
                model[varName] = rawModel[varId - 1]; // MiniSat uses 1-based, array is 0-based
            }
            return { satisfiable: true, model };
        } else {
            return { satisfiable: false };
        }
    }

    parseConstraint(constraint) {
        // Basic constraint parsing
        // Format: "variable=true" or "variable=false"
        if (constraint.includes('=')) {
            const [variable, value] = constraint.split('=').map(s => s.trim());
            return { variable, value: value === 'true' };
        }
        return null;
    }

    getVariableId(variable) {
        if (!this.variableMap.has(variable)) {
            this.variableMap.set(variable, this.nextVarId++);
        }
        return this.variableMap.get(variable);
    }

    convertConstraintsToCNF(constraints) {
        // Convert our simple "variable=true/false" constraints to CNF clauses
        const clauses = [];
        
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

    async checkLegality(gameState) {
        // This method will check if a game state is legal according to BOTC rules
        // Placeholder implementation
        const constraints = this.generateConstraintsFromGameState(gameState);
        const result = await this.solve(constraints);
        return result.satisfiable;
    }

    generateConstraintsFromGameState(_gameState) {
        // Convert BOTC game state to SAT constraints
        // This is where the BOTC rule logic will be implemented
        return [];
    }
}

// Export for both Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BrowserSATSolver };
}
if (typeof window !== 'undefined') {
    window.BrowserSATSolver = BrowserSATSolver;
}