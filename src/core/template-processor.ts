// Advanced template string processor with variable binding and resolution
// Handles template rendering, variable binding (:=), and references ({$var})

import { 
    TemplateString, 
    VariableBinding, 
    VariableReference, 
    DomainConstraint 
} from './conversation-tree';
import { 
    DomainValue, 
    DomainFactory, 
    GameContext 
} from './domain-types';

// Variable resolution context
export interface VariableContext {
    // Bound variables from previous conversation steps
    boundValues: Map<string, DomainValue>;
    
    // Domain constraints for identifiers
    domainConstraints: Map<string, DomainConstraint>;
    
    // Game state context
    gameContext: GameContext;
}

// Template processing result
export interface ProcessedTemplate {
    // Final rendered text with all variables resolved
    renderedText: string;
    
    // Variables bound during this template processing
    newBindings: Map<string, DomainValue>;
    
    // Unresolved identifiers that need user/system input
    unresolvedIdentifiers: string[];
    
    // Validation errors
    errors: string[];
}

// Template processor with advanced variable handling
export class TemplateProcessor {
    
    /**
     * Process a template string with the given variable context
     */
    static processTemplate(
        template: TemplateString, 
        context: VariableContext,
        userInputs?: Map<string, string>
    ): ProcessedTemplate {
        const result: ProcessedTemplate = {
            renderedText: template.text,
            newBindings: new Map(),
            unresolvedIdentifiers: [],
            errors: []
        };
        
        // Step 1: Resolve variable references ({$var})
        result.renderedText = this.resolveVariableReferences(
            result.renderedText, 
            template.references, 
            context, 
            result.errors
        );
        
        // Step 2: Process variable bindings ({var := source})
        this.processVariableBindings(
            template.bindings, 
            context, 
            userInputs, 
            result
        );
        
        // Step 3: Resolve regular identifiers ({identifier})
        result.renderedText = this.resolveIdentifiers(
            result.renderedText, 
            template.identifiers, 
            context, 
            userInputs, 
            result
        );
        
        return result;
    }
    
    /**
     * Resolve variable references ({$var}) in template text
     */
    private static resolveVariableReferences(
        text: string, 
        references: VariableReference[], 
        context: VariableContext, 
        errors: string[]
    ): string {
        let resolvedText = text;
        
        for (const ref of references) {
            const pattern = new RegExp(`\\{\\$${this.escapeRegex(ref.variable)}\\}`, 'g');
            const boundValue = context.boundValues.get(ref.variable);
            
            if (boundValue !== undefined) {
                // Get domain type for proper formatting
                const constraint = context.domainConstraints.get(ref.variable);
                const formatted = constraint ? 
                    this.formatValueForDomain(boundValue, constraint, context.gameContext) :
                    String(boundValue);
                
                resolvedText = resolvedText.replace(pattern, formatted);
            } else {
                errors.push(`Variable reference '${ref.variable}' not bound`);
                resolvedText = resolvedText.replace(pattern, `[UNBOUND:${ref.variable}]`);
            }
        }
        
        return resolvedText;
    }
    
    /**
     * Process variable bindings ({var := source})
     */
    private static processVariableBindings(
        bindings: VariableBinding[], 
        context: VariableContext, 
        userInputs: Map<string, string> | undefined, 
        result: ProcessedTemplate
    ): void {
        for (const binding of bindings) {
            // Look up the source value
            let sourceValue: DomainValue | undefined;
            
            // First check if source is a bound variable
            if (context.boundValues.has(binding.sourceIdentifier)) {
                sourceValue = context.boundValues.get(binding.sourceIdentifier);
            } 
            // Then check if source is provided in user inputs
            else if (userInputs?.has(binding.sourceIdentifier)) {
                const userInput = userInputs.get(binding.sourceIdentifier)!;
                const constraint = context.domainConstraints.get(binding.sourceIdentifier);
                
                if (constraint) {
                    const parsedValue = this.parseUserInputForDomain(userInput, constraint, context.gameContext);
                    if (parsedValue === null) {
                        result.errors.push(`Invalid input '${userInput}' for ${binding.sourceIdentifier}`);
                        continue;
                    }
                    sourceValue = parsedValue;
                } else {
                    sourceValue = userInput; // Fallback to raw input
                }
            } 
            // Otherwise mark as unresolved
            else {
                result.unresolvedIdentifiers.push(binding.sourceIdentifier);
                continue;
            }
            
            if (sourceValue !== undefined) {
                result.newBindings.set(binding.variable, sourceValue);
                
                // Also add to text replacement (remove the binding syntax)
                const bindingPattern = new RegExp(
                    `\\{${this.escapeRegex(binding.variable)}\\s*:=\\s*${this.escapeRegex(binding.sourceIdentifier)}\\}`, 
                    'g'
                );
                
                const constraint = context.domainConstraints.get(binding.variable);
                const formatted = constraint ? 
                    this.formatValueForDomain(sourceValue, constraint, context.gameContext) :
                    String(sourceValue);
                
                result.renderedText = result.renderedText.replace(bindingPattern, formatted);
            }
        }
    }
    
    /**
     * Resolve regular identifiers ({identifier})
     */
    private static resolveIdentifiers(
        text: string, 
        identifiers: string[], 
        context: VariableContext, 
        userInputs: Map<string, string> | undefined, 
        result: ProcessedTemplate
    ): string {
        let resolvedText = text;
        
        for (const identifier of identifiers) {
            const pattern = new RegExp(`\\{${this.escapeRegex(identifier)}\\}`, 'g');
            
            // Check if we have user input for this identifier
            if (userInputs?.has(identifier)) {
                const userInput = userInputs.get(identifier)!;
                const constraint = context.domainConstraints.get(identifier);
                
                if (constraint) {
                    const parsedValue = this.parseUserInputForDomain(userInput, constraint, context.gameContext);
                    if (parsedValue !== null) {
                        const formatted = this.formatValueForDomain(parsedValue, constraint, context.gameContext);
                        resolvedText = resolvedText.replace(pattern, formatted);
                        // Automatically bind user inputs as variables for future reference
                        result.newBindings.set(identifier, parsedValue);
                    } else {
                        result.errors.push(`Invalid input '${userInput}' for ${identifier}`);
                        resolvedText = resolvedText.replace(pattern, `[INVALID:${userInput}]`);
                    }
                } else {
                    // No constraint, use raw input and bind it
                    resolvedText = resolvedText.replace(pattern, userInput);
                    result.newBindings.set(identifier, userInput);
                }
            } 
            // Check if it's already bound as a variable
            else if (context.boundValues.has(identifier)) {
                const boundValue = context.boundValues.get(identifier)!;
                const constraint = context.domainConstraints.get(identifier);
                const formatted = constraint ? 
                    this.formatValueForDomain(boundValue, constraint, context.gameContext) :
                    String(boundValue);
                
                resolvedText = resolvedText.replace(pattern, formatted);
            } 
            // Otherwise mark as unresolved
            else {
                result.unresolvedIdentifiers.push(identifier);
                resolvedText = resolvedText.replace(pattern, `[UNRESOLVED:${identifier}]`);
            }
        }
        
        return resolvedText;
    }
    
    /**
     * Parse user input according to domain constraints
     */
    private static parseUserInputForDomain(
        input: string, 
        constraint: DomainConstraint, 
        gameContext: GameContext
    ): DomainValue | null {
        const domain = DomainFactory.fromConstraint(constraint);
        const parsedValue = domain.parseValue(input);
        
        if (parsedValue !== null && domain.validate(parsedValue, gameContext)) {
            return parsedValue;
        }
        
        return null;
    }
    
    /**
     * Format a domain value for display
     */
    private static formatValueForDomain(
        value: DomainValue, 
        constraint: DomainConstraint, 
        _gameContext: GameContext
    ): string {
        const domain = DomainFactory.fromConstraint(constraint);
        return domain.formatValue(value);
    }
    
    /**
     * Get all unresolved identifiers from a template
     */
    static getUnresolvedIdentifiers(
        template: TemplateString, 
        context: VariableContext
    ): string[] {
        const unresolved: string[] = [];
        
        // Check variable references
        for (const ref of template.references) {
            if (!context.boundValues.has(ref.variable)) {
                unresolved.push(ref.variable);
            }
        }
        
        // Check binding sources
        for (const binding of template.bindings) {
            if (!context.boundValues.has(binding.sourceIdentifier)) {
                unresolved.push(binding.sourceIdentifier);
            }
        }
        
        // Check regular identifiers
        for (const identifier of template.identifiers) {
            if (!context.boundValues.has(identifier)) {
                unresolved.push(identifier);
            }
        }
        
        // Remove duplicates
        return [...new Set(unresolved)];
    }
    
    /**
     * Validate that all required identifiers can be resolved
     */
    static validateTemplateResolution(
        template: TemplateString, 
        context: VariableContext
    ): string[] {
        const errors: string[] = [];
        const unresolved = this.getUnresolvedIdentifiers(template, context);
        
        for (const identifier of unresolved) {
            if (!context.domainConstraints.has(identifier)) {
                errors.push(`No domain constraint defined for identifier '${identifier}'`);
            }
        }
        
        // Validate variable reference chains
        for (const ref of template.references) {
            if (!context.boundValues.has(ref.variable)) {
                errors.push(`Variable '${ref.variable}' referenced but not bound`);
            }
        }
        
        return errors;
    }
    
    /**
     * Create a mock user input map for testing
     */
    static createMockInputs(
        template: TemplateString, 
        context: VariableContext
    ): Map<string, string> {
        const mockInputs = new Map<string, string>();
        const unresolved = this.getUnresolvedIdentifiers(template, context);
        
        for (const identifier of unresolved) {
            const constraint = context.domainConstraints.get(identifier);
            if (constraint) {
                const domain = DomainFactory.fromConstraint(constraint);
                const validValues = domain.getValidValues(context.gameContext);
                
                if (validValues.length > 0) {
                    mockInputs.set(identifier, domain.formatValue(validValues[0]));
                } else {
                    // Provide sensible defaults
                    switch (constraint.type) {
                        case 'YesNo':
                            mockInputs.set(identifier, 'yes');
                            break;
                        case 'Number':
                            mockInputs.set(identifier, '1');
                            break;
                        case 'ChoiceOfPlayer':
                            mockInputs.set(identifier, 'Alice');
                            break;
                        case 'ChoiceOfRole':
                            mockInputs.set(identifier, 'washerwoman');
                            break;
                        case 'Text':
                            mockInputs.set(identifier, 'example text');
                            break;
                    }
                }
            }
        }
        
        return mockInputs;
    }
    
    /**
     * Escape special regex characters
     */
    private static escapeRegex(str: string): string {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Utility functions for template processing
export class TemplateUtils {
    
    /**
     * Extract all templates from a conversation tree
     */
    static extractAllTemplates(rootNode: any): TemplateString[] {
        const templates: TemplateString[] = [];
        const visited = new Set<any>();
        
        function traverse(node: any) {
            if (visited.has(node)) return;
            visited.add(node);
            
            if (node.template) {
                templates.push(node.template);
            }
            
            if (node['st-response']) {
                for (const child of node['st-response']) {
                    traverse(child);
                }
            }
            
            if (node['player-response']) {
                for (const child of node['player-response']) {
                    traverse(child);
                }
            }
        }
        
        traverse(rootNode);
        return templates;
    }
    
    /**
     * Create a comprehensive domain constraint map for a role
     */
    static createDomainMap(
        templates: TemplateString[], 
        commonConstraints: Map<string, DomainConstraint> = new Map()
    ): Map<string, DomainConstraint> {
        const domainMap = new Map(commonConstraints);
        
        // Extract all unique identifiers from templates
        const allIdentifiers = new Set<string>();
        
        for (const template of templates) {
            template.identifiers.forEach(id => allIdentifiers.add(id));
            template.bindings.forEach(b => {
                allIdentifiers.add(b.variable);
                allIdentifiers.add(b.sourceIdentifier);
            });
            template.references.forEach(r => allIdentifiers.add(r.variable));
        }
        
        // Add default constraints for common patterns
        for (const identifier of allIdentifiers) {
            if (!domainMap.has(identifier)) {
                const constraint = this.inferDomainConstraint(identifier);
                if (constraint) {
                    domainMap.set(identifier, constraint);
                }
            }
        }
        
        return domainMap;
    }
    
    /**
     * Infer domain constraint from identifier name patterns
     */
    private static inferDomainConstraint(identifier: string): DomainConstraint | null {
        const lower = identifier.toLowerCase();
        
        // Player patterns
        if (lower.includes('player') || lower.includes('target') || lower.includes('nominator')) {
            return { type: 'ChoiceOfPlayer' };
        }
        
        // Role patterns
        if (lower.includes('role') || lower.includes('townsfolk') || lower.includes('demon')) {
            return { type: 'ChoiceOfRole' };
        }
        
        // Yes/No patterns
        if (lower.includes('yesno') || lower.includes('answer') || lower.includes('result')) {
            return { type: 'YesNo' };
        }
        
        // Number patterns
        if (lower.includes('count') || lower.includes('number') || lower.includes('amount')) {
            return { type: 'Number' };
        }
        
        // Text patterns
        if (lower.includes('text') || lower.includes('message') || lower.includes('statement')) {
            return { type: 'Text' };
        }
        
        return null;
    }
}