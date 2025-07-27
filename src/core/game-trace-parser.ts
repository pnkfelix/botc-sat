// Game trace parser for BOTC temporal constraint validation
// Parses one-liner format game traces into temporal context values

export interface TemporalContextValues {
    // Historical facts derived from game trace
    soberHealthyWhenActing: Map<string, boolean>; // roleId -> was sober & healthy when acting
    eventTriggered: Map<string, boolean>; // event -> did this event occur
    transientStateActive: Map<string, boolean>; // state -> is this state currently active
    
    // Additional context for constraint validation
    setupTokens: Map<string, string[]>; // playerId -> list of setup tokens placed
    currentTokens: Map<string, string[]>; // playerId -> list of current reminder tokens
}

export interface GameEvent {
    phase: string; // SETUP, N1, D1, E1, etc. (wrapped in angle brackets in trace)
    actor: string; // PlayerName:RoleName, PlayerName, RoleName, or 'st'
    action: string; // add_token, remove_token, nominate, vote, execute, die
    target?: string; // Target player name
    token?: string; // Token name for add/remove actions
    details?: any; // Additional event-specific data
}

export class GameTraceParser {
    
    /**
     * Parse a one-liner game trace into temporal context values
     * Example: "<SETUP> st!Alice(+dr:is_the_drunk) <N1> Alice:poisoner!Bob(+poi:poisoned)"
     */
    parseGameTrace(oneLineTrace: string): TemporalContextValues {
        const events = this.parseTraceEvents(oneLineTrace);
        return this.deriveTemporalContext(events);
    }
    
    /**
     * Parse one-liner trace string into structured events
     */
    parseTraceEvents(trace: string): GameEvent[] {
        const events: GameEvent[] = [];
        
        // Split by phase markers <PHASE>
        const phaseRegex = /\<([^\>]+)\>/g;
        let lastIndex = 0;
        let currentPhase = '';
        
        let match;
        while ((match = phaseRegex.exec(trace)) !== null) {
            // Process events from previous phase
            if (currentPhase && lastIndex < match.index) {
                const phaseContent = trace.substring(lastIndex, match.index).trim();
                if (phaseContent) {
                    events.push(...this.parsePhaseEvents(currentPhase, phaseContent));
                }
            }
            
            currentPhase = match[1];
            lastIndex = phaseRegex.lastIndex;
        }
        
        // Process final phase
        if (currentPhase && lastIndex < trace.length) {
            const phaseContent = trace.substring(lastIndex).trim();
            if (phaseContent) {
                events.push(...this.parsePhaseEvents(currentPhase, phaseContent));
            }
        }
        
        return events;
    }
    
    /**
     * Parse events within a single phase
     * Example: "Alice:poisoner!Bob(+poi:poisoned), st!Dave(+ww:townsfolk),Frank(+ww:wrong)"
     */
    private parsePhaseEvents(phase: string, content: string): GameEvent[] {
        const events: GameEvent[] = [];
        
        // Split by commas, but handle nested parentheses
        const eventStrings = this.splitEvents(content);
        
        for (const eventStr of eventStrings) {
            const event = this.parseEventString(phase, eventStr.trim());
            if (event) {
                events.push(event);
            }
        }
        
        return events;
    }
    
    /**
     * Split event string by commas, respecting parentheses
     */
    private splitEvents(content: string): string[] {
        const events: string[] = [];
        let current = '';
        let parenDepth = 0;
        
        for (let i = 0; i < content.length; i++) {
            const char = content[i];
            
            if (char === '(') {
                parenDepth++;
            } else if (char === ')') {
                parenDepth--;
            } else if (char === ',' && parenDepth === 0) {
                events.push(current.trim());
                current = '';
                continue;
            }
            
            current += char;
        }
        
        if (current.trim()) {
            events.push(current.trim());
        }
        
        return events;
    }
    
    /**
     * Parse individual event string into GameEvent
     * Examples:
     * - "st!Alice(+dr:is_the_drunk)" -> storyteller adds drunk token to Alice
     * - "Alice:poisoner!Bob(+poi:poisoned)" -> Alice (poisoner) adds poison token to Bob
     * - "Frank!nominates->Alice:virgin" -> Frank nominates Alice (virgin)
     * - "Frank(+ww:wrong)" -> storyteller adds token to Frank (simplified syntax)
     */
    private parseEventString(phase: string, eventStr: string): GameEvent | null {
        // Token manipulation: Actor!Target(+/-token)
        const tokenMatch = eventStr.match(/^([^!]+)!([^(]+)\(([+-])([^)]+)\)$/);
        if (tokenMatch) {
            const [, actor, target, operation, token] = tokenMatch;
            return {
                phase,
                actor: actor.trim(),
                action: operation === '+' ? 'add_token' : 'remove_token',
                target: target.trim(),
                token: token.trim()
            };
        }
        
        // Simplified token manipulation: Target(+/-token) - implies storyteller actor
        const simpleTokenMatch = eventStr.match(/^([^(]+)\(([+-])([^)]+)\)$/);
        if (simpleTokenMatch) {
            const [, target, operation, token] = simpleTokenMatch;
            return {
                phase,
                actor: 'st', // Implied storyteller action
                action: operation === '+' ? 'add_token' : 'remove_token',
                target: target.trim(),
                token: token.trim()
            };
        }
        
        // Nomination: Player!nominates->Target:Role
        const nominateMatch = eventStr.match(/^([^!]+)!nominates->([^:]+):(.+)$/);
        if (nominateMatch) {
            const [, actor, target, role] = nominateMatch;
            return {
                phase,
                actor: actor.trim(),
                action: 'nominate',
                target: target.trim(),
                details: { targetRole: role.trim() }
            };
        }
        
        // Vote: Player!votes->Target
        const voteMatch = eventStr.match(/^([^!]+)!votes->(.+)$/);
        if (voteMatch) {
            const [, actor, target] = voteMatch;
            return {
                phase,
                actor: actor.trim(),
                action: 'vote',
                target: target.trim()
            };
        }
        
        // Execution: st!executes->Player
        const executeMatch = eventStr.match(/^st!executes->(.+)$/);
        if (executeMatch) {
            return {
                phase,
                actor: 'st',
                action: 'execute',
                target: executeMatch[1].trim()
            };
        }
        
        // Death: Player!dies
        const deathMatch = eventStr.match(/^([^!]+)!dies$/);
        if (deathMatch) {
            return {
                phase,
                actor: deathMatch[1].trim(),
                action: 'die'
            };
        }
        
        // Demon kill: st!demon_kill->Target
        const demonKillMatch = eventStr.match(/^st!demon_kill->(.+)$/);
        if (demonKillMatch) {
            return {
                phase,
                actor: 'st',
                action: 'demon_kill',
                target: demonKillMatch[1].trim()
            };
        }
        
        console.warn(`Failed to parse event: ${eventStr}`);
        return null;
    }
    
    /**
     * Derive temporal context values from parsed events
     */
    private deriveTemporalContext(events: GameEvent[]): TemporalContextValues {
        const context: TemporalContextValues = {
            soberHealthyWhenActing: new Map(),
            eventTriggered: new Map(),
            transientStateActive: new Map(),
            setupTokens: new Map(),
            currentTokens: new Map()
        };
        
        // Track who has drunk tokens (affects sober status)
        const drunkPlayers = new Set<string>();
        const poisonedPlayers = new Set<string>();
        
        for (const event of events) {
            this.processEvent(event, context, drunkPlayers, poisonedPlayers);
        }
        
        // Derive sober/healthy status for information gathering roles
        this.deriveSoberHealthyStatus(events, context, drunkPlayers, poisonedPlayers);
        
        return context;
    }
    
    /**
     * Process individual event and update context
     */
    private processEvent(
        event: GameEvent, 
        context: TemporalContextValues, 
        drunkPlayers: Set<string>, 
        poisonedPlayers: Set<string>
    ): void {
        if (event.action === 'add_token' && event.target && event.token) {
            // Track setup tokens
            if (event.phase === 'SETUP') {
                const setupTokens = context.setupTokens.get(event.target) || [];
                setupTokens.push(event.token);
                context.setupTokens.set(event.target, setupTokens);
            }
            
            // Track current tokens
            const currentTokens = context.currentTokens.get(event.target) || [];
            currentTokens.push(event.token);
            context.currentTokens.set(event.target, currentTokens);
            
            // Special token handling
            if (event.token === 'dr:is_the_drunk') {
                drunkPlayers.add(event.target);
            } else if (event.token === 'poi:poisoned') {
                poisonedPlayers.add(event.target);
            }
            
            // Track transient states
            if (event.token.startsWith('poi:')) {
                context.transientStateActive.set('poisoning_active', true);
            }
        }
        
        if (event.action === 'remove_token' && event.target && event.token) {
            // Remove from current tokens
            const currentTokens = context.currentTokens.get(event.target) || [];
            const index = currentTokens.indexOf(event.token);
            if (index > -1) {
                currentTokens.splice(index, 1);
                context.currentTokens.set(event.target, currentTokens);
            }
            
            // Update tracking sets
            if (event.token === 'poi:poisoned') {
                poisonedPlayers.delete(event.target);
            }
        }
        
        if (event.action === 'nominate' && event.details?.targetRole === 'virgin') {
            context.eventTriggered.set('virgin_was_nominated', true);
        }
    }
    
    /**
     * Derive sober and healthy status for information gathering roles
     */
    private deriveSoberHealthyStatus(
        events: GameEvent[], 
        context: TemporalContextValues, 
        _drunkPlayers: Set<string>, 
        _poisonedPlayers: Set<string>
    ): void {
        // Find information gathering events
        const infoRoles = ['washerwoman', 'librarian', 'investigator'];
        
        for (const event of events) {
            if (event.action === 'add_token' && event.actor.includes(':')) {
                const [playerName, roleName] = event.actor.split(':');
                
                if (infoRoles.includes(roleName)) {
                    // Check if this player was sober and healthy when acting
                    const wasDrunk = _drunkPlayers.has(playerName);
                    const wasPoisoned = _poisonedPlayers.has(playerName);
                    const wasSoberAndHealthy = !wasDrunk && !wasPoisoned;
                    
                    context.soberHealthyWhenActing.set(roleName, wasSoberAndHealthy);
                }
            }
        }
        
        // Handle storyteller information distribution (when role actor isn't specified)
        for (const event of events) {
            if (event.action === 'add_token' && event.actor === 'st' && event.token) {
                // Check token type to determine associated role
                if (event.token.startsWith('ww:')) {
                    this.deriveRoleStatus('washerwoman', event, context, _drunkPlayers, _poisonedPlayers);
                } else if (event.token.startsWith('lib:')) {
                    this.deriveRoleStatus('librarian', event, context, _drunkPlayers, _poisonedPlayers);
                } else if (event.token.startsWith('inv:')) {
                    this.deriveRoleStatus('investigator', event, context, _drunkPlayers, _poisonedPlayers);
                }
            }
        }
    }
    
    /**
     * Derive role status from storyteller token placement
     */
    private deriveRoleStatus(
        roleName: string, 
        _event: GameEvent, 
        context: TemporalContextValues, 
        _drunkPlayers: Set<string>, 
        _poisonedPlayers: Set<string>
    ): void {
        if (!context.soberHealthyWhenActing.has(roleName)) {
            // We need to find who has this role and check their status
            // For this implementation, we'll assume the role is sober/healthy unless proven otherwise
            // In a full implementation, we'd track role assignments from setup
            context.soberHealthyWhenActing.set(roleName, true);
        }
    }
    
    /**
     * Get simplified context for SAT constraint generation
     */
    getConstraintVariables(context: TemporalContextValues): Map<string, boolean> {
        const variables = new Map<string, boolean>();
        
        // Add sober/healthy variables
        for (const [role, status] of context.soberHealthyWhenActing) {
            variables.set(`${role}_was_sober_and_healthy_when_acting`, status);
        }
        
        // Add event trigger variables
        for (const [event, occurred] of context.eventTriggered) {
            variables.set(event, occurred);
        }
        
        // Add transient state variables
        for (const [state, active] of context.transientStateActive) {
            variables.set(state, active);
        }
        
        return variables;
    }
}