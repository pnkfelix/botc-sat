# PLT Redex Model for Blood on the Clocktower

## Research Overview

This document tracks the development of a PLT Redex model for Blood on the Clocktower (BOTC). The goal is to explore whether Programming Language Theory tools can effectively model and validate complex game systems.

## Motivation

BOTC has several characteristics that make it an interesting candidate for PLT Redex modeling:

1. **Complex State Transitions**: Game phases, role abilities, and state changes
2. **Rule-Based System**: Each role has specific rules that can be modeled as deduction rules
3. **Constraint Satisfaction**: Bag legality, grimoire validity, and game consistency
4. **Operational Semantics**: Game traces represent execution of role abilities
5. **Type System**: Players, roles, tokens, and game states have well-defined types

## PLT Redex Advantages for BOTC

- **Pattern Matching**: Natural for expressing role conditions and effects
- **Reduction Rules**: Perfect for modeling role ability activations
- **Metafunctions**: Ideal for complex constraint validation
- **Testing Framework**: Built-in support for property-based testing
- **Visualization**: Automatic generation of reduction traces

## Model Architecture Plan

### 1. Core Language Definition
- **Syntax**: Define BOTC entities (roles, tokens, players, phases)
- **Types**: Role types, alignments, game states
- **Values**: Concrete game configurations

### 2. Role System
- **Role Definitions**: Each role as a judgment with premises/conclusions
- **Ability Rules**: Deduction rules for role abilities
- **Constraint Rules**: Rules for role-specific constraints (Baron, Drunk, etc.)

### 3. Game State Model
- **Bag State**: Physical bag contents and in-play distributions
- **Grimoire State**: Player assignments, tokens, alive/dead status
- **Phase State**: Current game phase and available actions

### 4. Reduction Semantics
- **Setup Phase**: Bag generation → Player assignment → Initial tokens
- **Game Phases**: Night actions → Dawn cleanup → Day voting → Night actions
- **State Transitions**: How role abilities modify game state

### 5. Validation System
- **Bag Legality**: Metafunctions to validate bag constraints
- **Grimoire Consistency**: Rules to ensure valid token placement
- **Trace Validation**: Verify game event sequences are legal

## Implementation Strategy

### Phase 1: Core Syntax and Types
1. Define basic BOTC entities (roles, tokens, players)
2. Create type system for game states
3. Implement basic bag and grimoire structures

### Phase 2: Role Definitions
1. Model simple roles (Chef, Empath) as judgments
2. Add complex roles with constraints (Baron, Drunk)
3. Implement role ability activation rules

### Phase 3: Game Dynamics
1. Create reduction rules for phase transitions
2. Model role interactions and conflicts
3. Add trace generation and validation

### Phase 4: Trouble Brewing Complete
1. Implement all 20 Trouble Brewing roles
2. Add comprehensive test suite
3. Validate against existing TypeScript implementation

## Expected Benefits

1. **Formal Verification**: Mathematical proof of rule consistency
2. **Property Testing**: Automated discovery of edge cases
3. **Visual Debugging**: Reduction trace visualization
4. **Rule Composition**: Easy to add new roles and interactions
5. **Educational Tool**: Clear mathematical representation of BOTC rules

## Challenges and Considerations

1. **State Complexity**: BOTC has rich state that may stress Redex
2. **Performance**: Large search spaces for bag generation
3. **User Experience**: Making formal model accessible to game designers
4. **Completeness**: Ensuring all BOTC edge cases are covered

## Files Structure

```
redex-model/
├── botc-lang.rkt          # Core language definition
├── botc-roles.rkt         # Role definitions and rules
├── botc-game.rkt          # Game state and transitions
├── botc-validation.rkt    # Constraint validation
├── trouble-brewing.rkt    # Complete Trouble Brewing implementation
├── tests/
│   ├── basic-tests.rkt    # Core functionality tests
│   ├── role-tests.rkt     # Individual role tests
│   ├── game-tests.rkt     # End-to-end game tests
│   └── examples.rkt       # Example game scenarios
└── docs/
    ├── syntax.md          # Language syntax reference
    ├── rules.md           # Reduction rules documentation
    └── examples.md        # Usage examples
```

## Research Questions

1. Can PLT Redex effectively model all BOTC role interactions?
2. How does performance compare to SAT-based approach?
3. Can formal proofs verify BOTC rule consistency?
4. What new insights emerge from the formal model?
5. How extensible is the model to new roles and mechanics?

## Next Steps

1. Implement core language syntax
2. Model simple roles (Chef, Empath)
3. Add bag validation rules
4. Test with basic scenarios
5. Incrementally add complexity

---

*This research explores the intersection of Programming Language Theory and game design validation, potentially opening new approaches to complex rule system modeling.*