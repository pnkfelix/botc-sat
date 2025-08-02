// Conversation tree system for transactional BOTC role interactions
// Inspired by roleDefinitions.json with template strings and explicit tree structure

// Core domain types for conversation parameters
export type CoreDomainType = 'YesNo' | 'Number' | 'ChoiceOfPlayer' | 'ChoiceOfRole' | 'Text';

export interface DomainConstraint {
    type: CoreDomainType;
    // Additional constraints based on BOTC rules
    roleTypeFilter?: 'good' | 'evil' | 'Townsfolk' | 'Outsider' | 'Minion' | 'Demon';
    playerFilter?: 'alive' | 'dead' | 'not_self';
    numberRange?: { min: number; max: number };
    textPattern?: string; // For Yaggababble, Mezepheles custom phrases
}

// Variable binding and reference system
export interface VariableBinding {
    // Variable assignment: {good_role := chosen_role}
    variable: string;        // 'good_role'
    sourceIdentifier: string; // 'chosen_role'
}

export interface VariableReference {
    // Variable reference: {$chosen_role}
    variable: string; // 'chosen_role'
}

// Template string with embedded domain identifiers and variable operations
export interface TemplateString {
    text: string; // "Choose two players tonight."
    // Embedded identifiers: {player1}, {player2}, {yesno}, etc.
    identifiers: string[];
    // Variable bindings in this template: {good_role := chosen_role}
    bindings: VariableBinding[];
    // Variable references in this template: {$chosen_role}
    references: VariableReference[];
}

// Conversation tree node structure
export interface ConversationNode {
    // Template for this message
    template: TemplateString;
    
    // Message type determines who responds next
    type: 'st-message' | 'player-message';
    
    // Branching responses
    'st-response'?: ConversationNode[];      // Storyteller's possible responses
    'player-response'?: ConversationNode[];  // Player's possible responses
    
    // Terminal node indicator
    isTerminal?: boolean;
    
    // Node metadata
    nodeId?: string;
    description?: string;
}

// Complete transaction schema for a role interaction
export interface TransactionSchema {
    // Role this transaction belongs to
    roleId: string;
    
    // Transaction identifier (e.g., 'wake', 'choose_role', 'inform_result')
    transactionId: string;
    
    // Human-readable description
    description: string;
    
    // When this transaction can occur
    phase: 'SETUP' | 'N1' | 'DAWN' | 'EVENING' | 'NIGHT' | 'any_day' | 'any_night' | 'on_trigger';
    frequency: 'once_per_game' | 'once_per_day' | 'once_per_night' | 'unlimited' | 'when_triggered';
    
    // Who initiates the transaction
    initiator: 'storyteller' | 'player';
    
    // Domain constraints for parameters used in this transaction
    domains: Map<string, DomainConstraint>;
    
    // Root of the conversation tree
    rootNode: ConversationNode;
    
    // Prerequisites for this transaction
    prerequisites?: {
        requiresSoberAndHealthy?: boolean;
        requiresAlive?: boolean;
        customCondition?: string;
    };
}

// Role definition with transaction schemas
export interface RoleWithTransactions {
    // Basic role information
    roleId: string;
    name: string;
    type: 'Townsfolk' | 'Outsider' | 'Minion' | 'Demon';
    
    // Collection of transactional schemas
    transactions: TransactionSchema[];
    
    // Metadata
    edition: string;
    complexity?: number;
}

// Template string parsing utilities
export class TemplateParser {
    
    /**
     * Parse a template string to extract identifiers, bindings, and references
     */
    static parseTemplate(text: string): TemplateString {
        const identifiers: string[] = [];
        const bindings: VariableBinding[] = [];
        const references: VariableReference[] = [];
        
        // Find all {identifier} patterns
        const identifierRegex = /\{([^}]+)\}/g;
        let match;
        
        while ((match = identifierRegex.exec(text)) !== null) {
            const content = match[1];
            
            // Check for variable binding: {good_role := chosen_role}
            const bindingMatch = content.match(/^(.+)\s*:=\s*(.+)$/);
            if (bindingMatch) {
                bindings.push({
                    variable: bindingMatch[1].trim(),
                    sourceIdentifier: bindingMatch[2].trim()
                });
                continue;
            }
            
            // Check for variable reference: {$chosen_role}
            if (content.startsWith('$')) {
                references.push({
                    variable: content.substring(1)
                });
                continue;
            }
            
            // Regular identifier
            identifiers.push(content);
        }
        
        return {
            text,
            identifiers,
            bindings,
            references
        };
    }
    
    /**
     * Validate that all referenced variables have been bound
     */
    static validateVariableFlow(schema: TransactionSchema): string[] {
        const errors: string[] = [];
        const boundVariables = new Set<string>();
        
        // Traverse the conversation tree and track variable bindings/references
        this.traverseNodeForValidation(schema.rootNode, boundVariables, errors, []);
        
        return errors;
    }
    
    private static traverseNodeForValidation(
        node: ConversationNode, 
        boundVariables: Set<string>, 
        errors: string[], 
        path: string[]
    ): void {
        const currentPath = [...path, node.nodeId || 'unnamed'];
        
        // Add any bindings from this node
        for (const binding of node.template.bindings) {
            boundVariables.add(binding.variable);
        }
        
        // Check that all references are bound
        for (const reference of node.template.references) {
            if (!boundVariables.has(reference.variable)) {
                errors.push(`Variable '${reference.variable}' referenced at ${currentPath.join('->')} but not bound`);
            }
        }
        
        // Recurse into child nodes
        if (node['st-response']) {
            for (const child of node['st-response']) {
                this.traverseNodeForValidation(child, new Set(boundVariables), errors, currentPath);
            }
        }
        
        if (node['player-response']) {
            for (const child of node['player-response']) {
                this.traverseNodeForValidation(child, new Set(boundVariables), errors, currentPath);
            }
        }
    }
}

// Example domain constraints for common BOTC patterns
export const CommonDomains = {
    anyPlayer: { type: 'ChoiceOfPlayer' as CoreDomainType },
    alivePlayer: { type: 'ChoiceOfPlayer' as CoreDomainType, playerFilter: 'alive' as const },
    otherPlayer: { type: 'ChoiceOfPlayer' as CoreDomainType, playerFilter: 'not_self' as const },
    goodRole: { type: 'ChoiceOfRole' as CoreDomainType, roleTypeFilter: 'good' as const },
    evilRole: { type: 'ChoiceOfRole' as CoreDomainType, roleTypeFilter: 'evil' as const },
    townsfolkRole: { type: 'ChoiceOfRole' as CoreDomainType, roleTypeFilter: 'Townsfolk' as const },
    yesNoAnswer: { type: 'YesNo' as CoreDomainType },
    playerCount: { type: 'Number' as CoreDomainType, numberRange: { min: 0, max: 15 } },
    customText: { type: 'Text' as CoreDomainType }
};