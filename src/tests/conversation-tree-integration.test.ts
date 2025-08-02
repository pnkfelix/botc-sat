// Integration test for the conversation tree system
// Demonstrates template strings, variable binding, and conversation flow

import { describe, test, expect } from 'vitest';
import { 
    ConversationEngine
} from '../core/conversation-engine';
import { 
    TransactionSchema, 
    TemplateParser 
} from '../core/conversation-tree';
import { 
    GameContext 
} from '../core/domain-types';
import { 
    exampleRoles, 
    validateExampleRoles 
} from '../data/conversation-examples';

// Mock game context for testing
const mockGameContext: GameContext = {
    players: [
        { name: 'Alice', role: 'washerwoman', alive: true, position: 0 },
        { name: 'Bob', role: 'imp', alive: true, position: 1 },
        { name: 'Charlie', role: 'butler', alive: true, position: 2 },
        { name: 'Diana', role: 'slayer', alive: true, position: 3 }
    ],
    availableRoles: new Map([
        ['washerwoman', { id: 'washerwoman', name: 'Washerwoman', type: 'Townsfolk' }],
        ['imp', { id: 'imp', name: 'Imp', type: 'Demon' }],
        ['butler', { id: 'butler', name: 'Butler', type: 'Outsider' }],
        ['slayer', { id: 'slayer', name: 'Slayer', type: 'Townsfolk' }]
    ] as any),
    currentPhase: 'N1',
    actingPlayer: 'Alice'
};

describe('Conversation Tree Integration', () => {
    
    test('Validate all example role schemas', () => {
        console.log('Running schema validation...');
        validateExampleRoles();
        
        // Validate each role individually
        for (const role of exampleRoles) {
            for (const transaction of role.transactions) {
                const validation = ConversationEngine.validateSchema(transaction, {
                    validateVariables: true,
                    maxDepth: 5
                });
                
                expect(validation.isValid).toBe(true);
                expect(validation.errors).toHaveLength(0);
                expect(validation.nodeCount).toBeGreaterThan(0);
            }
        }
    });
    
    test('Washerwoman conversation flow', () => {
        const washerwomanRole = exampleRoles.find(r => r.roleId === 'washerwoman');
        expect(washerwomanRole).toBeDefined();
        
        const transaction = washerwomanRole!.transactions[0];
        
        // Start conversation
        let state = ConversationEngine.startConversation(transaction, mockGameContext);
        
        expect(state.hasTerminated).toBe(false);
        expect(state.currentNode.type).toBe('st-message');
        
        // Process storyteller's opening message
        const userInputs = new Map([
            ['player1', 'Alice'],
            ['player2', 'Bob'],
            ['chosen_townsfolk', 'washerwoman']
        ]);
        
        state = ConversationEngine.processCurrentNode(state, userInputs);
        
        expect(state.errors).toHaveLength(0);
        expect(state.variableBindings.get('townsfolk_role')).toBe('washerwoman');
        
        // Get available responses
        const responses = ConversationEngine.getAvailableResponses(state);
        expect(responses).toHaveLength(1);
        expect(responses[0].type).toBe('player-message');
        
        // Advance to player response
        state = ConversationEngine.advanceToResponse(state, responses[0]);
        expect(state.currentNode.type).toBe('player-message');
        
        // Process player acknowledgment
        state = ConversationEngine.processCurrentNode(state);
        expect(state.errors).toHaveLength(0);
        
        // Get final ST response
        const finalResponses = ConversationEngine.getAvailableResponses(state);
        expect(finalResponses).toHaveLength(1);
        expect(finalResponses[0].isTerminal).toBe(true);
        
        // Advance to terminal node
        state = ConversationEngine.advanceToResponse(state, finalResponses[0]);
        state = ConversationEngine.processCurrentNode(state);
        
        expect(state.hasTerminated).toBe(true);
        expect(state.isComplete).toBe(true);
        expect(state.history).toHaveLength(3);
    });
    
    test('Fortune Teller conversation with branching', () => {
        const fortuneTellerRole = exampleRoles.find(r => r.roleId === 'fortune_teller');
        expect(fortuneTellerRole).toBeDefined();
        
        const transaction = fortuneTellerRole!.transactions[0];
        
        // Start conversation
        let state = ConversationEngine.startConversation(transaction, mockGameContext);
        
        expect(state.currentNode.type).toBe('player-message');
        
        // Player chooses targets
        const playerInputs = new Map([
            ['target1', 'Alice'],
            ['target2', 'Bob']
        ]);
        
        state = ConversationEngine.processCurrentNode(state, playerInputs);
        
        expect(state.errors).toHaveLength(0);
        expect(state.variableBindings.get('target1')).toBe('Alice');
        expect(state.variableBindings.get('target2')).toBe('Bob');
        
        // Get ST response options (yes/no)
        const responses = ConversationEngine.getAvailableResponses(state);
        expect(responses).toHaveLength(2);
        
        // Test "yes" branch
        const yesResponse = responses.find(r => 
            r.template.text.includes('Yes, one of them is a Demon')
        );
        expect(yesResponse).toBeDefined();
        
        state = ConversationEngine.advanceToResponse(state, yesResponse!);
        state = ConversationEngine.processCurrentNode(state);
        
        expect(state.errors).toHaveLength(0);
        
        // Player acknowledges
        const ackResponses = ConversationEngine.getAvailableResponses(state);
        expect(ackResponses).toHaveLength(1);
        expect(ackResponses[0].isTerminal).toBe(true);
        
        state = ConversationEngine.advanceToResponse(state, ackResponses[0]);
        state = ConversationEngine.processCurrentNode(state);
        
        expect(state.hasTerminated).toBe(true);
        expect(state.isComplete).toBe(true);
    });
    
    test('Slayer conversation with conditional outcomes', () => {
        const slayerRole = exampleRoles.find(r => r.roleId === 'slayer');
        expect(slayerRole).toBeDefined();
        
        const transaction = slayerRole!.transactions[0];
        
        // Start conversation
        let state = ConversationEngine.startConversation(transaction, mockGameContext);
        
        expect(state.currentNode.type).toBe('player-message');
        
        // Player declares shot
        const shotInputs = new Map([['target', 'Bob']]);
        
        state = ConversationEngine.processCurrentNode(state, shotInputs);
        
        expect(state.errors).toHaveLength(0);
        expect(state.variableBindings.get('target')).toBe('Bob');
        
        // Get ST response options (success/failure)
        const responses = ConversationEngine.getAvailableResponses(state);
        expect(responses).toHaveLength(2);
        
        // Test successful shot
        const successResponse = responses.find(r => 
            r.template.text.includes('was the Demon and dies')
        );
        expect(successResponse).toBeDefined();
        
        state = ConversationEngine.advanceToResponse(state, successResponse!);
        state = ConversationEngine.processCurrentNode(state);
        
        expect(state.errors).toHaveLength(0);
        
        // Player celebrates
        const celebrateResponses = ConversationEngine.getAvailableResponses(state);
        expect(celebrateResponses).toHaveLength(1);
        expect(celebrateResponses[0].isTerminal).toBe(true);
        
        state = ConversationEngine.advanceToResponse(state, celebrateResponses[0]);
        state = ConversationEngine.processCurrentNode(state);
        
        expect(state.hasTerminated).toBe(true);
        expect(state.isComplete).toBe(true);
    });
    
    test('Template parsing with variable binding', () => {
        const templateText = 'Choose {player1} and {player2}. {good_role := chosen_role} registers as good. Use {$chosen_role} wisely.';
        
        const parsed = TemplateParser.parseTemplate(templateText);
        
        expect(parsed.identifiers).toContain('player1');
        expect(parsed.identifiers).toContain('player2');
        expect(parsed.identifiers).not.toContain('good_role'); // Should be in bindings
        expect(parsed.identifiers).not.toContain('chosen_role'); // Should be referenced
        
        expect(parsed.bindings).toHaveLength(1);
        expect(parsed.bindings[0].variable).toBe('good_role');
        expect(parsed.bindings[0].sourceIdentifier).toBe('chosen_role');
        
        expect(parsed.references).toHaveLength(1);
        expect(parsed.references[0].variable).toBe('chosen_role');
    });
    
    test('Conversation state export and summary', () => {
        const washerwomanRole = exampleRoles.find(r => r.roleId === 'washerwoman');
        const transaction = washerwomanRole!.transactions[0];
        
        let state = ConversationEngine.startConversation(transaction, mockGameContext);
        
        // Process one step
        const userInputs = new Map([
            ['player1', 'Alice'],
            ['player2', 'Bob'],
            ['chosen_townsfolk', 'washerwoman']
        ]);
        
        state = ConversationEngine.processCurrentNode(state, userInputs);
        
        // Test export
        const exported = ConversationEngine.exportState(state);
        expect(exported).toContain('variableBindings');
        expect(exported).toContain('townsfolk_role');
        
        // Test summary
        const summary = ConversationEngine.generateSummary(state);
        expect(summary).toContain('Conversation Summary');
        expect(summary).toContain('Variables Bound: 3');
        expect(summary).toContain('townsfolk_role: washerwoman');
    });
    
    test('Error handling with invalid inputs', () => {
        const slayerRole = exampleRoles.find(r => r.roleId === 'slayer');
        const transaction = slayerRole!.transactions[0];
        
        let state = ConversationEngine.startConversation(transaction, mockGameContext);
        
        // Try invalid player name
        const invalidInputs = new Map([['target', 'InvalidPlayer']]);
        
        state = ConversationEngine.processCurrentNode(state, invalidInputs);
        
        // Should have errors but continue
        expect(state.errors.length).toBeGreaterThan(0);
        expect(state.hasTerminated).toBe(false);
    });
    
    test('Schema validation catches issues', () => {
        // Create a schema with variable reference issues
        const badSchema: TransactionSchema = {
            roleId: 'test',
            transactionId: 'bad_test',
            description: 'Test schema with issues',
            phase: 'NIGHT',
            frequency: 'once_per_game',
            initiator: 'storyteller',
            domains: new Map(),
            rootNode: {
                template: TemplateParser.parseTemplate('Reference unbound variable: {$unbound_var}'),
                type: 'st-message',
                isTerminal: true
            }
        };
        
        const validation = ConversationEngine.validateSchema(badSchema, {
            validateVariables: true
        });
        
        expect(validation.isValid).toBe(false);
        expect(validation.errors.length).toBeGreaterThan(0);
        expect(validation.errors.some(e => e.includes('unbound_var'))).toBe(true);
    });
});

// Run integration demo
export function runConversationDemo(): void {
    console.log('=== BOTC Conversation Tree System Demo ===\n');
    
    // Validate all schemas
    console.log('1. Schema Validation:');
    validateExampleRoles();
    
    // Demo washerwoman conversation
    console.log('\n2. Washerwoman Conversation Demo:');
    const washerwomanRole = exampleRoles.find(r => r.roleId === 'washerwoman');
    if (washerwomanRole) {
        const transaction = washerwomanRole.transactions[0];
        let state = ConversationEngine.startConversation(transaction, mockGameContext);
        
        console.log('Initial state:', ConversationEngine.generateSummary(state));
        
        // Simulate conversation steps
        const userInputs = new Map([
            ['player1', 'Alice'],
            ['player2', 'Bob'], 
            ['chosen_townsfolk', 'washerwoman']
        ]);
        
        state = ConversationEngine.processCurrentNode(state, userInputs);
        console.log('After ST message:', ConversationEngine.generateSummary(state));
        
        // Continue conversation...
        const responses = ConversationEngine.getAvailableResponses(state);
        if (responses.length > 0) {
            state = ConversationEngine.advanceToResponse(state, responses[0]);
            state = ConversationEngine.processCurrentNode(state);
            console.log('After player response:', ConversationEngine.generateSummary(state));
        }
    }
    
    console.log('\n=== Demo Complete ===');
}