// Temporal constraint compiler for BOTC game history validation
// Generates historical context variables from role DSL properties

import { Role } from './roles';
import { SATSolver } from './solver';
import { Script } from './scripts';
import { TemporalContextValues, GameTraceParser } from './game-trace-parser';

export interface TemporalContext {
    // Variables that capture historical facts needed for grimoire validation
    soberHealthyWhenActing: Map<string, string>; // roleId -> variable name
    eventTriggered: Map<string, string>; // event -> variable name  
    transientStateActive: Map<string, string>; // effect -> variable name
}

export class TemporalConstraintCompiler {
    
    /**
     * Analyzes roles in a script and generates temporal context variables
     * Returns variable count and mapping of context variables
     */
    compileTemporalConstraints(script: Script, solver: SATSolver, playerCount: number): TemporalContext {
        const context: TemporalContext = {
            soberHealthyWhenActing: new Map(),
            eventTriggered: new Map(),
            transientStateActive: new Map()
        };

        // Process each role in the script
        for (const role of script.getRoles()) {
            this.processRoleTemporalProperties(role, solver, context);
        }

        // Add player-specific transient state variables
        this.addTransientStateVariables(script, solver, playerCount, context);

        return context;
    }

    private processRoleTemporalProperties(role: Role, solver: SATSolver, context: TemporalContext): void {
        // Generate sober & healthy variables for information gathering roles
        if (role.abilityConstraints?.requires_sober_and_healthy) {
            const varName = `${role.id}_was_sober_and_healthy_when_acting`;
            solver.addVariable(varName);
            context.soberHealthyWhenActing.set(role.id, varName);
        }

        // Generate event trigger variables for event-triggered abilities
        if (role.abilityType === 'one_time_event_triggered' && role.abilityConstraints?.triggered_by_event) {
            const event = role.abilityConstraints.triggered_by_event;
            const varName = `${event}_triggered_affecting_${role.id}`;
            solver.addVariable(varName);
            context.eventTriggered.set(`${event}_${role.id}`, varName);
        }
    }

    private addTransientStateVariables(script: Script, solver: SATSolver, playerCount: number, context: TemporalContext): void {
        // Add current poisoning state variables (exactly one player poisoned if poisoner in play)
        const hasPoisoner = script.getRoles().some(role => role.id === 'poisoner');
        if (hasPoisoner) {
            const poisonVars: string[] = [];
            for (let i = 0; i < playerCount; i++) {
                const varName = `player_${i}_currently_poisoned`;
                solver.addVariable(varName);
                poisonVars.push(varName);
            }
            
            // Constraint: at most one player poisoned (poisoner chooses one target)
            this.addAtMostOneConstraint(solver, poisonVars);
            
            // Store mapping for later use
            context.transientStateActive.set('poisoning', poisonVars.join(','));
        }

        // Add other transient states as needed (butler master, monk protection, etc.)
        // TODO: Add these as we implement more roles
    }

    private addAtMostOneConstraint(solver: SATSolver, variables: string[]): void {
        // Add clauses ensuring at most one variable is true
        for (let i = 0; i < variables.length; i++) {
            for (let j = i + 1; j < variables.length; j++) {
                // NOT var_i OR NOT var_j (both cannot be true)
                const var1 = solver.getVariableId(variables[i]);
                const var2 = solver.getVariableId(variables[j]);
                if (var1 && var2) {
                    solver.addClause([-var1, -var2]);
                }
            }
        }
    }

    /**
     * Apply temporal context values from game trace to SAT constraints
     * This bridges game history to constraint validation
     */
    applyTemporalContext(solver: SATSolver, context: TemporalContext, traceValues: TemporalContextValues): void {
        // Apply sober/healthy status from trace
        for (const [roleId, varName] of context.soberHealthyWhenActing) {
            const soberHealthy = traceValues.soberHealthyWhenActing.get(roleId);
            if (soberHealthy !== undefined) {
                const varId = solver.getVariableId(varName);
                if (varId) {
                    // Set variable to match trace value
                    solver.addUnitClause(varId, soberHealthy);
                }
            }
        }
        
        // Apply event triggers from trace
        for (const [eventKey, varName] of context.eventTriggered) {
            const eventOccurred = traceValues.eventTriggered.get(eventKey);
            if (eventOccurred !== undefined) {
                const varId = solver.getVariableId(varName);
                if (varId) {
                    solver.addUnitClause(varId, eventOccurred);
                }
            }
        }
        
        // Apply transient state from trace
        for (const [stateKey, varName] of context.transientStateActive) {
            const stateActive = traceValues.transientStateActive.get(stateKey);
            if (stateActive !== undefined) {
                const varId = solver.getVariableId(varName);
                if (varId) {
                    solver.addUnitClause(varId, stateActive);
                }
            }
        }
    }

    /**
     * Validate grimoire consistency against game trace
     * Returns true if grimoire state is consistent with game history
     */
    validateGrimoireWithTrace(
        script: Script, 
        solver: SATSolver, 
        gameTrace: string, 
        grimoireState?: any
    ): { isValid: boolean; temporalContext: TemporalContext } {
        // Generate temporal constraint framework
        const playerCount = grimoireState?.players?.length || 7; // Default for validation
        const temporalContext = this.compileTemporalConstraints(script, solver, playerCount);
        
        // Parse game trace
        const parser = new GameTraceParser();
        const traceValues = parser.parseGameTrace(gameTrace);
        
        // Apply trace values to constraint system
        this.applyTemporalContext(solver, temporalContext, traceValues);
        
        // Check if constraints are satisfiable
        const result = solver.solve();
        
        return {
            isValid: result,
            temporalContext
        };
    }

    /**
     * Adds constraints linking bag composition to temporal context
     * E.g., if poisoner in play, then poisoning state must be consistent
     */
    addBagToTemporalConstraints(script: Script, solver: SATSolver, context: TemporalContext): void {
        for (const role of script.getRoles()) {
            const roleVar = solver.getVariableId(`role_in_play_${role.id}`);
            if (!roleVar) continue;

            // If role affects transient state, constrain the transient variables
            if (role.abilityConstraints?.affects_transient_state) {
                this.addRoleTransientConstraints(role, solver, roleVar, context);
            }

            // If role requires sober/healthy context, add constraints
            if (role.abilityConstraints?.requires_sober_and_healthy) {
                this.addSoberHealthyConstraints(role, solver, roleVar, context);
            }
        }
    }

    private addRoleTransientConstraints(role: Role, _solver: SATSolver, _roleVar: number, context: TemporalContext): void {
        if (role.id === 'poisoner') {
            // If poisoner in play, exactly one player must be poisoned (unless N1)
            const poisonVarsStr = context.transientStateActive.get('poisoning');
            if (poisonVarsStr) {
                // const _poisonVars = poisonVarsStr.split(',').map(v => solver.getVariableId(v)).filter(Boolean);
                // Role in play implies exactly one poison target (this is a simplification)
                // In a full implementation, we'd need game state context
            }
        }
    }

    private addSoberHealthyConstraints(role: Role, solver: SATSolver, roleVar: number, context: TemporalContext): void {
        const soberHealthyVar = context.soberHealthyWhenActing.get(role.id);
        if (soberHealthyVar) {
            const soberHealthyVarId = solver.getVariableId(soberHealthyVar);
            if (soberHealthyVarId) {
                // If role not in play, then sober/healthy context is irrelevant
                // roleVar -> soberHealthyVar (if role present, context applies)
                // This is a simplified constraint - full implementation would consider drunk/poison state
                solver.addClause([-roleVar, soberHealthyVarId]);
            }
        }
    }
}