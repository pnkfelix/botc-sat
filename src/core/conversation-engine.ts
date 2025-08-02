// Conversation tree traversal and validation engine
// Manages the flow of transactional conversations with state tracking

import { 
    ConversationNode, 
    TransactionSchema 
} from './conversation-tree';
import { 
    TemplateProcessor, 
    VariableContext, 
    ProcessedTemplate 
} from './template-processor';
import { GameContext, DomainValue } from './domain-types';

// Conversation state during execution
export interface ConversationState {
    // Current position in the conversation tree
    currentNode: ConversationNode;
    
    // Variable bindings accumulated so far
    variableBindings: Map<string, DomainValue>;
    
    // Conversation history for backtracking
    history: ConversationStep[];
    
    // Game context
    gameContext: GameContext;
    
    // Error state
    errors: string[];
    
    // Completion status
    isComplete: boolean;
    hasTerminated: boolean;
    
    // Schema for domain constraints access
    schema: TransactionSchema;
}

// Individual step in conversation
export interface ConversationStep {
    node: ConversationNode;
    processedTemplate: ProcessedTemplate;
    userInputs?: Map<string, string>;
    timestamp: Date;
    speaker: 'storyteller' | 'player';
}

// Conversation validation result
export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    nodeCount: number;
    maxDepth: number;
    unreachableNodes: ConversationNode[];
}

// Conversation traversal options
export interface TraversalOptions {
    maxDepth?: number;
    validateVariables?: boolean;
    allowBacktracking?: boolean;
    strictMode?: boolean;
}

// Main conversation engine
export class ConversationEngine {
    
    /**
     * Start a new conversation transaction
     */
    static startConversation(
        schema: TransactionSchema,
        gameContext: GameContext,
        options?: TraversalOptions
    ): ConversationState {
        // Validate the schema first
        const validation = this.validateSchema(schema, options);
        if (!validation.isValid && options?.strictMode) {
            throw new Error(`Schema validation failed: ${validation.errors.join(', ')}`);
        }
        
        return {
            currentNode: schema.rootNode,
            variableBindings: new Map(),
            history: [],
            gameContext,
            errors: validation.errors,
            isComplete: false,
            hasTerminated: false,
            // Store schema for access to domain constraints
            schema
        };
    }
    
    /**
     * Process the current node and advance conversation
     */
    static processCurrentNode(
        state: ConversationState,
        userInputs?: Map<string, string>
    ): ConversationState {
        if (state.hasTerminated) {
            return state;
        }
        
        // Create variable context with current bindings
        const variableContext: VariableContext = {
            boundValues: state.variableBindings,
            domainConstraints: state.schema.domains,
            gameContext: state.gameContext
        };
        
        // Process the current node's template
        const processedTemplate = TemplateProcessor.processTemplate(
            state.currentNode.template,
            variableContext,
            userInputs
        );
        
        // Create conversation step
        const step: ConversationStep = {
            node: state.currentNode,
            processedTemplate,
            userInputs,
            timestamp: new Date(),
            speaker: state.currentNode.type === 'st-message' ? 'storyteller' : 'player'
        };
        
        // Update state
        const newState: ConversationState = {
            ...state,
            variableBindings: new Map([
                ...state.variableBindings,
                ...processedTemplate.newBindings
            ]),
            history: [...state.history, step],
            errors: [...state.errors, ...processedTemplate.errors]
        };
        
        // Check if this is a terminal node
        if (state.currentNode.isTerminal) {
            newState.hasTerminated = true;
            newState.isComplete = processedTemplate.errors.length === 0;
        }
        
        return newState;
    }
    
    /**
     * Get available response options from current node
     */
    static getAvailableResponses(state: ConversationState): ConversationNode[] {
        if (state.hasTerminated) {
            return [];
        }
        
        const node = state.currentNode;
        
        if (node.type === 'st-message' && node['player-response']) {
            return node['player-response'];
        } else if (node.type === 'player-message' && node['st-response']) {
            return node['st-response'];
        }
        
        return [];
    }
    
    /**
     * Advance to a specific response node
     */
    static advanceToResponse(
        state: ConversationState,
        responseNode: ConversationNode
    ): ConversationState {
        const availableResponses = this.getAvailableResponses(state);
        
        if (!availableResponses.includes(responseNode)) {
            return {
                ...state,
                errors: [...state.errors, 'Invalid response node selected']
            };
        }
        
        return {
            ...state,
            currentNode: responseNode
        };
    }
    
    /**
     * Validate a complete transaction schema
     */
    static validateSchema(
        schema: TransactionSchema,
        options?: TraversalOptions
    ): ValidationResult {
        const result: ValidationResult = {
            isValid: true,
            errors: [],
            warnings: [],
            nodeCount: 0,
            maxDepth: 0,
            unreachableNodes: []
        };
        
        // Traverse the entire tree
        const visited = new Set<ConversationNode>();
        const reachable = new Set<ConversationNode>();
        
        this.traverseForValidation(
            schema.rootNode, 
            visited, 
            reachable, 
            result, 
            0, 
            options?.maxDepth || 10,
            new Set(),
            options
        );
        
        // Find unreachable nodes
        result.unreachableNodes = Array.from(visited).filter(node => !reachable.has(node));
        
        // Validate variable flow
        if (options?.validateVariables) {
            const variableErrors = this.validateVariableFlow(schema);
            result.errors.push(...variableErrors);
        }
        
        // Check for structural issues
        this.validateStructure(schema, result);
        
        result.isValid = result.errors.length === 0;
        return result;
    }
    
    /**
     * Recursive tree traversal for validation
     */
    private static traverseForValidation(
        node: ConversationNode,
        visited: Set<ConversationNode>,
        reachable: Set<ConversationNode>,
        result: ValidationResult,
        depth: number,
        maxDepth: number,
        path: Set<ConversationNode>,
        options?: TraversalOptions
    ): void {
        if (visited.has(node)) {
            return; // Already processed
        }
        
        visited.add(node);
        reachable.add(node);
        result.nodeCount++;
        result.maxDepth = Math.max(result.maxDepth, depth);
        
        // Check for cycles
        if (path.has(node)) {
            result.errors.push(`Cycle detected at node ${node.nodeId || 'unnamed'}`);
            return;
        }
        
        // Check depth limit
        if (depth > maxDepth) {
            result.warnings.push(`Maximum depth ${maxDepth} exceeded at node ${node.nodeId || 'unnamed'}`);
            return;
        }
        
        // Validate node structure
        this.validateNode(node, result);
        
        // Continue traversal
        path.add(node);
        
        if (node['st-response']) {
            for (const child of node['st-response']) {
                this.traverseForValidation(child, visited, reachable, result, depth + 1, maxDepth, path, options);
            }
        }
        
        if (node['player-response']) {
            for (const child of node['player-response']) {
                this.traverseForValidation(child, visited, reachable, result, depth + 1, maxDepth, path, options);
            }
        }
        
        path.delete(node);
    }
    
    /**
     * Validate individual node structure
     */
    private static validateNode(node: ConversationNode, result: ValidationResult): void {
        // Check template exists
        if (!node.template) {
            result.errors.push(`Node ${node.nodeId || 'unnamed'} missing template`);
            return;
        }
        
        // Check message type
        if (node.type !== 'st-message' && node.type !== 'player-message') {
            result.errors.push(`Node ${node.nodeId || 'unnamed'} has invalid type: ${node.type}`);
        }
        
        // Check response consistency
        if (node.type === 'st-message') {
            if (node['st-response'] && node['st-response'].length > 0) {
                result.warnings.push(`ST message node ${node.nodeId || 'unnamed'} has st-response (should have player-response)`);
            }
        } else if (node.type === 'player-message') {
            if (node['player-response'] && node['player-response'].length > 0) {
                result.warnings.push(`Player message node ${node.nodeId || 'unnamed'} has player-response (should have st-response)`);
            }
        }
        
        // Check terminal nodes
        if (node.isTerminal) {
            if ((node['st-response'] && node['st-response'].length > 0) ||
                (node['player-response'] && node['player-response'].length > 0)) {
                result.warnings.push(`Terminal node ${node.nodeId || 'unnamed'} has child responses`);
            }
        }
    }
    
    /**
     * Validate variable flow through the conversation tree
     */
    private static validateVariableFlow(schema: TransactionSchema): string[] {
        const errors: string[] = [];
        
        // Use the existing template parser validation
        const templateErrors = schema.rootNode ? 
            this.validateNodeVariables(schema.rootNode, new Set(), new Set()) : 
            [];
        
        errors.push(...templateErrors);
        return errors;
    }
    
    /**
     * Recursively validate variables in node tree
     */
    private static validateNodeVariables(
        node: ConversationNode,
        boundVariables: Set<string>,
        visited: Set<ConversationNode>
    ): string[] {
        if (visited.has(node)) {
            return [];
        }
        visited.add(node);
        
        const errors: string[] = [];
        
        // Check variable references are bound
        for (const ref of node.template.references) {
            if (!boundVariables.has(ref.variable)) {
                errors.push(`Variable '${ref.variable}' referenced in node ${node.nodeId || 'unnamed'} but not bound`);
            }
        }
        
        // Add new bindings
        const localBound = new Set(boundVariables);
        for (const binding of node.template.bindings) {
            localBound.add(binding.variable);
        }
        
        // Recurse to children
        if (node['st-response']) {
            for (const child of node['st-response']) {
                errors.push(...this.validateNodeVariables(child, new Set(localBound), visited));
            }
        }
        
        if (node['player-response']) {
            for (const child of node['player-response']) {
                errors.push(...this.validateNodeVariables(child, new Set(localBound), visited));
            }
        }
        
        return errors;
    }
    
    /**
     * Validate overall schema structure
     */
    private static validateStructure(schema: TransactionSchema, result: ValidationResult): void {
        // Check basic schema properties
        if (!schema.roleId || schema.roleId.trim().length === 0) {
            result.errors.push('Schema missing roleId');
        }
        
        if (!schema.transactionId || schema.transactionId.trim().length === 0) {
            result.errors.push('Schema missing transactionId');
        }
        
        if (!schema.rootNode) {
            result.errors.push('Schema missing rootNode');
            return;
        }
        
        // Check that there's at least one terminal path
        const hasTerminalPath = this.hasTerminalPath(schema.rootNode, new Set());
        if (!hasTerminalPath) {
            result.warnings.push('No terminal path found in conversation tree');
        }
    }
    
    /**
     * Check if there's at least one path to a terminal node
     */
    private static hasTerminalPath(node: ConversationNode, visited: Set<ConversationNode>): boolean {
        if (visited.has(node)) {
            return false; // Cycle detected
        }
        
        if (node.isTerminal) {
            return true;
        }
        
        visited.add(node);
        
        // Check all possible paths
        const responses = [
            ...(node['st-response'] || []),
            ...(node['player-response'] || [])
        ];
        
        for (const response of responses) {
            if (this.hasTerminalPath(response, new Set(visited))) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Export conversation state to JSON for persistence
     */
    static exportState(state: ConversationState): string {
        const exportData = {
            currentNodeId: state.currentNode.nodeId,
            variableBindings: Object.fromEntries(state.variableBindings),
            historyLength: state.history.length,
            errors: state.errors,
            isComplete: state.isComplete,
            hasTerminated: state.hasTerminated,
            timestamp: new Date().toISOString()
        };
        
        return JSON.stringify(exportData, null, 2);
    }
    
    /**
     * Generate conversation summary for debugging
     */
    static generateSummary(state: ConversationState): string {
        const lines: string[] = [];
        
        lines.push(`Conversation Summary:`);
        lines.push(`- Status: ${state.hasTerminated ? 'Terminated' : 'Active'}`);
        lines.push(`- Complete: ${state.isComplete}`);
        lines.push(`- Steps: ${state.history.length}`);
        lines.push(`- Variables Bound: ${state.variableBindings.size}`);
        lines.push(`- Errors: ${state.errors.length}`);
        
        if (state.variableBindings.size > 0) {
            lines.push(`\nVariable Bindings:`);
            for (const [key, value] of state.variableBindings) {
                lines.push(`  ${key}: ${value}`);
            }
        }
        
        if (state.errors.length > 0) {
            lines.push(`\nErrors:`);
            for (const error of state.errors) {
                lines.push(`  - ${error}`);
            }
        }
        
        return lines.join('\n');
    }
}