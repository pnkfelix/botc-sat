# Transactional Game Trace Format for BOTC

## Overview

Research findings on the transactional nature of BOTC game events and proposed enhancements to the game trace format to capture interactive gameplay patterns.

**Key Insight**: BOTC events are fundamentally **transactional** rather than isolated actions. Most game events involve multi-step interactions between players and the storyteller, with bounded transaction lengths and predictable patterns.

## Current System Limitations

### Existing Trace Format
Current implementation (from `textual-representation-formats.md`) uses isolated events:
```
<NIGHT> Alice:slayer!shoot_at(Bob)
<NIGHT> ST:reveal(Bob:dies)
```

**Problems**:
1. **Missing causality**: Connection between action and consequence is implicit
2. **Parsing complexity**: Must infer which events are related across separate trace entries
3. **Incomplete modeling**: Doesn't capture the interactive nature of BOTC gameplay
4. **Information flow gaps**: Player knowledge updates not explicitly modeled

## Transactional Event Patterns

### Fundamental BOTC Interaction Model

**Core Principle**: During night phases, almost every action is initiated by the storyteller waking a player, followed by bounded interaction sequences.

**Transaction Length Analysis**:
- **Length 1**: Deterministic actions or information delivery (rare in practice)
- **Length 2**: Most common - action + response or question + answer
- **Length 3**: Complex interactions - wake + action + response (most night abilities)

### Night Phase Transaction Patterns

#### Pattern 1: Information Gathering Roles (Player Choice)
**Format**: `ST:wake(player) => player:role!action(targets) => ST:result(player, information)`

**Fortune Teller**:
```
<NIGHT> ST:wake(Charlie:fortune_teller) => Charlie:fortune_teller!divine(Dave, Eve) => ST:divine_result(Charlie, yes)
```

**Empath**:
```
<NIGHT> ST:wake(Alice:empath) => Alice:empath!sense(Bob, Charlie) => ST:empath_result(Alice, 1)
```

#### Pattern 2: Automatic Information Roles (No Player Choice)  
**Format**: `ST:wake(player) => ST:result(player, information)`

**Investigator**:
```
<NIGHT> ST:wake(Alice:investigator) => ST:investigator_result(Alice, [Bob, Charlie], scarlet_woman)
```

**Chef**:
```
<NIGHT> ST:wake(Bob:chef) => ST:chef_result(Bob, 2)
```

**Washerwoman**:
```
<NIGHT> ST:wake(Charlie:washerwoman) => ST:washerwoman_result(Charlie, [Dave, Eve], librarian)
```

#### Pattern 3: Protective/Targeting Actions
**Format**: `ST:wake(player) => player:role!action(target) [=> ST:confirmation]`

**Monk Protection**:
```
<NIGHT> ST:wake(Alice:monk) => Alice:monk!protect(Charlie)
```

**Butler Service**:
```
<NIGHT> ST:wake(Frank:butler) => Frank:butler!serve(Alice)
```

**Imp Kill**:
```
<NIGHT> ST:wake(Bob:imp) => Bob:imp!kill(Dave) => ST:confirm_death(Dave)
```

#### Pattern 4: Uncertain Outcome Actions
**Format**: `Player:role!action(target) => ST:reveal_result(outcome)`

**Slayer Shot** (can happen during day):
```
<DAY> Alice:slayer!shoot_at(Bob) => ST:reveal(Bob:dies)
<DAY> Alice:slayer!shoot_at(Charlie) => ST:reveal(nothing)
```

### Role State Tracking in Transactions

#### Drunk/Poisoned Player Handling
**Approach**: Include role state in wake event to capture player's subjective experience

**Drunk Fortune Teller**:
```
<NIGHT> ST:wake(Alice:fortune_teller(is_the_drunk)) => Alice:fortune_teller!divine(Bob, Charlie) => ST:divine_result(Alice, yes)
```

**Poisoned Investigator**:
```
<NIGHT> ST:wake(Bob:investigator(is_poisoned)) => ST:investigator_result(Bob, [Charlie, Dave], wrong_role)
```

**Marionette (thinks they're demon)**:
```
<NIGHT> ST:wake(Frank:marionette(thinks_imp)) => Frank:imp!kill(Alice) => ST:reveal(nothing)
```

### Structured Information Format

#### Information Delivery Standardization
**Pattern**: `ST:role_result(recipient, content_structure)`

**Investigator Results**:
```
ST:investigator_result(Alice, [Bob, Charlie], scarlet_woman)
// "One of Bob or Charlie is the Scarlet Woman"
```

**Fortune Teller Results**:
```
ST:divine_result(Charlie, yes)    // "Yes, one is the demon"
ST:divine_result(Charlie, no)     // "No, neither is the demon"
```

**Chef Results**:
```
ST:chef_result(Bob, 2)            // "2 pairs of evil players sit adjacent"
```

**Washerwoman Results**:
```
ST:washerwoman_result(Alice, [Bob, Charlie], librarian)
// "One of Bob or Charlie is the Librarian"
```

## Transaction Coupling Syntax

### The `=>` Operator
**Semantics**: Indicates causal flow within a single logical game moment
- **Left side**: Trigger/cause
- **Right side**: Direct consequence/response
- **Chaining**: Multiple `=>` operators for multi-step transactions

### Adjacency Requirement
**Key Constraint**: All components of a transaction are adjacent in the trace (no intervening events)

**Benefits**:
1. **Simple parsing**: Look-ahead one event to detect transaction boundaries
2. **No explicit delimiters**: No need for `BEGIN_TRANSACTION`/`END_TRANSACTION`
3. **Natural grouping**: Related events are visually connected
4. **Clear causality**: `=>` shows direct cause-and-effect relationships

### Multi-step Transaction Examples

**Three-step Fortune Teller**:
```
<NIGHT> ST:wake(Charlie:fortune_teller) => Charlie:fortune_teller!divine(Dave, Eve) => ST:divine_result(Charlie, yes)
```

**Two-step Slayer Shot**:
```
<DAY> Alice:slayer!shoot_at(Bob) => ST:reveal(Bob:dies)
```

**One-step Monk Protection** (deterministic):
```
<NIGHT> ST:wake(Alice:monk) => Alice:monk!protect(Charlie)
```

## Implementation Implications

### Trace Parser Enhancements

#### Transaction Detection
```typescript
interface GameTransaction {
    phase: string;              // <NIGHT>, <DAY>, etc.
    components: GameEvent[];    // Split by '=>'
    initiator: string;          // First actor in transaction
    type: TransactionType;      // INFORMATION_GATHERING, PROTECTIVE_ACTION, etc.
}

function parseTransaction(traceLine: string): GameTransaction {
    const [phase, content] = traceLine.split('>');
    const components = content.split('=>').map(parseEvent);
    return {
        phase,
        components,
        initiator: components[0].actor,
        type: classifyTransaction(components)
    };
}
```

#### Transaction Classification
```typescript
enum TransactionType {
    INFORMATION_GATHERING,    // divine, investigate, etc.
    PROTECTIVE_ACTION,        // monk protect, butler serve
    DESTRUCTIVE_ACTION,       // imp kill, slayer shoot
    AUTOMATIC_INFORMATION,    // investigator, chef, washerwoman
    DETERMINISTIC_ACTION      // monk protect (no uncertainty)
}
```

### Role Definition Extensions

#### Transaction Pattern Specification
```typescript
interface RoleTransactionPattern {
    wakeTrigger: boolean;         // Requires ST:wake() initiation
    playerChoice: boolean;        // Player selects targets
    informationDelivery: boolean; // ST provides result
    uncertainOutcome: boolean;    // Result depends on game state
    expectedLength: number;       // 1, 2, or 3 components
}

// Fortune Teller example
const fortuneTellerPattern: RoleTransactionPattern = {
    wakeTrigger: true,        // ST:wake() starts interaction
    playerChoice: true,       // Player chooses two targets
    informationDelivery: true, // ST provides yes/no answer
    uncertainOutcome: false,   // Answer is deterministic given game state
    expectedLength: 3         // wake => divine => result
};
```

### Operational Semantics Updates

#### Atomic Transaction Execution
```typescript
class TransactionalGrimoireExecutor {
    executeTransaction(transaction: GameTransaction, state: GrimoireState): TransactionResult {
        // Execute all components atomically
        // Validate transaction completeness
        // Apply all state changes together
        // Return success/failure for entire transaction
    }
    
    validateTransactionPattern(transaction: GameTransaction, rolePattern: RoleTransactionPattern): boolean {
        // Check transaction length matches expected pattern
        // Verify information flow (wake => action => result)
        // Validate role-specific constraints
    }
}
```

### Temporal Constraint Integration

#### Transaction-Based Constraint Generation
```typescript
function generateTransactionConstraints(transaction: GameTransaction): SATConstraint[] {
    switch (transaction.type) {
        case TransactionType.INFORMATION_GATHERING:
            return generateInformationConstraints(transaction);
        case TransactionType.PROTECTIVE_ACTION:
            return generateProtectionConstraints(transaction);
        // ... other transaction types
    }
}

function generateInformationConstraints(transaction: GameTransaction): SATConstraint[] {
    // Extract: who acted, were they sober/healthy, what information was given
    // Generate: sober_healthy_when_acting variables, information_accuracy constraints
    // Link: transaction outcome to constraint satisfaction
}
```

## Benefits of Transactional Format

### 1. Complete Information Flow Modeling
- **Player knowledge**: Captures what each player learns and when
- **Storyteller decisions**: Records ST's information delivery choices
- **Interaction patterns**: Models the social/communication aspects of BOTC

### 2. Enhanced Validation Capabilities
- **Transaction completeness**: Ensure all interactions are resolved
- **Pattern matching**: Validate transactions follow role-specific patterns
- **Causal consistency**: Verify cause-and-effect relationships are logical

### 3. Improved Constraint Generation
- **Atomic constraint units**: Generate constraints for complete interactions
- **Information accuracy**: Model when false information is delivered
- **Player state tracking**: Better drunk/poisoned player modeling

### 4. Better Game Analysis
- **Social dynamics**: Capture the interactive nature of gameplay
- **Strategy analysis**: Understand information flow and player decisions
- **Rule validation**: Ensure complex interactions follow BOTC rules

## Migration Strategy

### Phase 1: Extend Existing Parser
- Add transaction parsing capability alongside existing event parsing
- Support both formats during transition period
- Validate that transactional parsing produces equivalent constraints

### Phase 2: Role Definition Updates
- Add transaction patterns to role definitions in `trouble-brewing-roles.ts`
- Update constraint generation to use transaction-based logic
- Extend operational semantics to handle atomic transaction execution

### Phase 3: Full Integration
- Convert all traces to transactional format
- Remove legacy single-event parsing
- Update all tests and examples to use new format

## Example: Complete Game Sequence

### Traditional Format (Current)
```
<SETUP> st!Alice(+dr:is_the_drunk)
<N1> st!Bob(+ww:townsfolk),Charlie(+ww:wrong)
<N1> Alice:poisoner!Dave(+poi:poisoned)  
<DAY> Frank:slayer!shoot_at(Bob)
<DAY> st!Bob(+imp:dead)
```

### Transactional Format (Proposed)
```
<SETUP> ST:setup_drunk(Alice)
<N1> ST:wake(Bob:washerwoman) => ST:washerwoman_result(Bob, [Charlie, Dave], librarian)
<N1> ST:wake(Alice:poisoner(is_the_drunk)) => Alice:poisoner!target(Dave)
<DAY> Frank:slayer!shoot_at(Bob) => ST:reveal(Bob:dies)
```

**Advantages of Transactional Format**:
- **Clear causality**: Each `=>` shows direct cause-and-effect
- **Complete interactions**: Every information exchange is captured
- **Role state explicit**: Alice's drunk status is visible in her wake event
- **Information content**: Washerwoman result shows specific information delivered
- **Atomic validation**: Each transaction can be validated as a complete unit

## Conclusion

The transactional trace format addresses fundamental limitations in modeling BOTC's interactive gameplay. By capturing the bounded, adjacent interaction patterns that define the game, we can:

1. **Model complete information flow** between players and storyteller
2. **Generate more accurate constraints** for SAT-based validation
3. **Support richer game analysis** including social dynamics
4. **Validate complex rule interactions** through atomic transaction processing

The `=>` coupling operator provides an elegant syntax that maintains readability while explicitly encoding the causal relationships that drive BOTC gameplay.

This enhancement builds naturally on the existing trace format and operational semantics foundation, providing a path to more complete and accurate modeling of Blood on the Clocktower games.