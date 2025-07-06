# Blood on the Clocktower DSL - Architecture Design

## Overview

This project implements a domain-specific language (DSL) for modeling Blood on the Clocktower (BOTC) game mechanics using SAT (Satisfiability) solving. The system can validate game setups, generate legal configurations, and analyze the mathematical structure of BOTC's constraint system.

## Core Architecture

### 🏗️ **Layered Architecture**

```
┌─────────────────────────────────────────────┐
│               Analysis Layer                │  
│     (Bias analysis, constraint exploration) │
├─────────────────────────────────────────────┤
│              Application Layer              │
│      (Bag validation, setup generation)    │
├─────────────────────────────────────────────┤
│                Core Engine                  │
│         (SAT compilation, solving)          │
├─────────────────────────────────────────────┤
│              Data Layer                     │
│        (Role definitions, scripts)          │
└─────────────────────────────────────────────┘
```

### 📁 **Directory Structure**

```
src/
├── core/           # Core constraint system
├── data/           # Game data definitions  
├── analysis/       # Research and analysis tools
├── tests/          # Test suites
└── experiments/    # One-off experimental code
```

## Core Components

### 🔧 **Core Engine** (`src/core/`)

#### `solver.ts` - SAT Solver Abstraction
- **Purpose**: Wrapper around JSMiniSolvers with BOTC-specific features
- **Key Features**:
  - Variable management with string IDs
  - Clause counting for performance analysis
  - Model extraction with variable name mapping
  - CNF constraint building utilities

#### `script-compiler.ts` - DSL to SAT Translation
- **Purpose**: Compiles BOTC rules into SAT constraints
- **Key Features**:
  - Player count constraints (exactly one count active)
  - Role type distribution constraints (townsfolk, outsider, minion, demon counts)
  - Role-specific setup effects (Baron, Drunk, etc.)
  - Sequential counter encoding for "exactly-N" constraints
  - Variable indirection system for bias elimination

#### `bag-compiler.ts` - Application Logic
- **Purpose**: High-level interface for bag validation and generation
- **Key Features**:
  - Bag legality validation (given setup → legal/illegal)
  - Legal setup generation (given constraints → valid configuration)
  - Multiple solution generation with blocking clauses
  - Preference handling (mustInclude/mustExclude)
  - Physical bag vs. in-play distribution reconciliation

#### `roles.ts` - Role Type System
- **Purpose**: Core role definitions and type management
- **Key Features**:
  - Role type enumeration (Townsfolk, Outsider, Minion, Demon)
  - Role lookup by ID
  - Distribution type definitions

#### `scripts.ts` - Game Configuration
- **Purpose**: Script definitions (collections of roles)
- **Key Features**:
  - Trouble Brewing script definition
  - Role list management
  - Future: Multi-script support

### 📊 **Data Layer** (`src/data/`)

#### `trouble-brewing-roles.ts` - Role Definitions
- **Purpose**: Complete Trouble Brewing role definitions with constraint logic
- **Key Features**:
  - 22 role definitions with setup effects
  - Baron: Modifies base distribution (5T,0O,1M,1D → 3T,2O,1M,1D)
  - Drunk: Physical bag substitution (drunk token → extra townsfolk token)
  - Registration system for role constraint compilation

### 🔬 **Analysis Layer** (`src/analysis/`)

#### `constraint-matrix-analysis.ts` - Solution Space Exploration
- **Purpose**: Systematic exploration of solution space via constraint injection
- **Discovery**: Baron frequency follows player count patterns (23.1% in 7&10 player games vs 3.8-4.8% others)

#### `first-solution-analysis.ts` - Bias Analysis Framework
- **Purpose**: Analyze SAT solver bias across different seeds and configurations
- **Key Features**:
  - Configurable seed sources (sequential, random, array)
  - Role frequency analysis
  - Bias metrics (coefficient of variation, frequency ranges)

#### `compare-seed-patterns.ts` - Seed Pattern Research
- **Purpose**: Compare bias patterns between sequential vs random seeds
- **Finding**: Random seeds improve uniformity (6.9% CV improvement)

### 🧪 **Test Layer** (`src/tests/`)

#### `index.ts` - Main Test Runner
- **Purpose**: Comprehensive test suite covering all major functionality
- **Coverage**: 
  - Setup function validation
  - SAT solver capability tests
  - Bag legality validation
  - Generative setup testing
  - Bias analysis validation

#### Test Categories:
- **Core Tests**: `advanced-tests.ts`, `setup-tests.ts`
- **SAT Tests**: `sat-operator-tests.ts`, `negation-tests.ts`
- **Bias Tests**: `bias-analysis-test.ts`, `variable-indirection-test.ts`
- **Integration Tests**: `solution-exploration-test.ts`, `solution-pattern-test.ts`

## Key Design Patterns

### 🎯 **Constraint Compilation Pattern**

```typescript
// 1. Reset solver state
solver.reset();

// 2. Add general script rules  
scriptCompiler.compileScriptToSAT(script, solver);

// 3. Add specific constraints
solver.addUnitClause(playerCountVar, true);

// 4. Solve and extract model
const result = solver.solveWithModel();
const solution = extractSolution(result.model);
```

### 🔄 **Variable Indirection Pattern**

To eliminate SAT solver bias (VSIDS heuristic), we use a two-layer variable system:

```typescript
// Layer 1: Slot variables (inherit solver bias)
slot_1, slot_2, slot_3, ...

// Layer 2: Role variables (actual game roles)  
baron_present, drunk_present, ...

// Random mapping: slot_i ↔ role_j_present
addBiconditional(slot_i, role_j_present);
```

### 📊 **Constraint Matrix Pattern**

For systematic solution space exploration:

```typescript
// Generate all role pairs
for (roleA, roleB in rolePairs) {
    // Test both constraint directions
    test(mustInclude: [roleA], mustExclude: [roleB]);
    test(mustInclude: [roleB], mustExclude: [roleA]);
}
```

## Technical Innovations

### 🚀 **Sequential Counter Encoding**
- **Problem**: Combinatorial "exactly-N" constraints explode (8.3M clauses)
- **Solution**: Sequential counter variables reduce to ~50K clauses (168x improvement)
- **Implementation**: `addExactlyNRolesConstraint()` in script-compiler

### 🎲 **Variable Indirection for Bias Elimination**
- **Problem**: SAT solvers have systematic bias due to VSIDS heuristics
- **Solution**: Random permutation layer that absorbs bias while preserving constraints
- **Impact**: Eliminates "Baron never appears" artifacts

### 🗺️ **Solution Space Topology Mapping**
- **Innovation**: Constraint matrix analysis reveals structured solution neighborhoods
- **Discovery**: BOTC solution space is non-uniform with mathematical patterns
- **Application**: Realistic bag generation based on natural constraint frequencies

## Performance Characteristics

### 📈 **Scalability Metrics**
- **Constraint compilation**: ~13K variables, ~50K clauses for full Trouble Brewing
- **Solution time**: 70ms average per constraint scenario
- **Memory usage**: Stable across 2,520+ trial analyses
- **Success rate**: 99.4% constraint satisfaction across diverse scenarios

### ⚡ **Optimization Strategies**
1. **Sequential counters** instead of combinatorial constraints
2. **Variable indirection** only when bias elimination needed
3. **Clause reuse** for common constraint patterns
4. **Blocking clauses** for efficient multiple solution generation

## Data Flow

### 🔄 **Bag Validation Flow**
```
Game Setup → Script Compiler → SAT Constraints → Solver → Legal/Illegal
```

### 🎯 **Generation Flow**
```
Preferences → Script Compiler → SAT Constraints → Solver → Valid Setup
```

### 📊 **Analysis Flow**
```
Seed Config → Multiple Generations → Frequency Analysis → Bias Metrics
```

## Extension Points

### 🎮 **Multi-Script Support**
- **Current**: Trouble Brewing only
- **Future**: Sects & Violets, Bad Moon Rising
- **Architecture**: Script registration system ready for extension

### 🧠 **Advanced Analysis**
- **Current**: Role frequency and bias analysis
- **Future**: Game outcome prediction, optimal setup recommendation
- **Framework**: Constraint matrix pattern generalizes to complex scenarios

### 🌐 **Integration Targets**
- **Web applications**: Browser-compatible SAT solving
- **Mobile apps**: Storyteller tools and setup validation
- **APIs**: RESTful services for setup generation

## Research Findings

### 🏰 **Baron Frequency Pattern**
Major discovery: Baron appearance correlates with player count arithmetic:
- **High frequency** (23.1%): 7 and 10 player games
- **Low frequency** (3.8-4.8%): 8, 9, 11, 12 player games
- **Explanation**: Base distribution math creates natural outsider slot requirements

### 📊 **Role Hierarchy**
Systematic frequency analysis across 2,504 constraint scenarios:
- **Rarest**: Baron (10.5% - complex setup requirements)
- **Most common**: Scarlet Woman (49.2% - versatile minion)
- **Pattern**: Outsiders systematically rarer than Townsfolk/Minions

### 🎯 **Solution Space Structure**
- **Non-uniform distribution**: Structured neighborhoods vs random distribution
- **Constraint neighborhoods**: Different regions favor different role combinations
- **Practical impact**: Realistic bag generation requires constraint-aware randomness

## Future Architecture Evolution

### 🔄 **Phase 1**: Multi-Script Support
- Extend data layer for additional BOTC editions
- Generalize constraint compilation for different rule sets
- Validate constraint matrix patterns across scripts

### 🎮 **Phase 2**: Gameplay State Modeling
- Extend from setup validation to full game state
- Model legal state transitions during gameplay
- Add ability validation and complex interaction handling

### 🌍 **Phase 3**: Production Integration
- RESTful API layer for external applications
- Real-time setup generation and validation
- Performance optimization for high-throughput scenarios

## Dependencies

### 🔧 **Core Dependencies**
- **JSMiniSolvers**: SAT solving engine (vendored, MIT license)
- **TypeScript**: Type safety and development tooling
- **Node.js**: Runtime environment and npm ecosystem

### 📦 **Build & Development**
- **ts-node**: Direct TypeScript execution for development
- **npm scripts**: Build automation and testing
- **Git**: Version control with proper file history tracking

## Security & Licensing

### 🔒 **Security Considerations**
- **Input validation**: All user inputs validated before SAT compilation
- **Resource limits**: Constraint complexity bounds prevent DoS
- **No external network**: Self-contained analysis prevents data leakage

### 📄 **Licensing Strategy**
- **Core system**: MIT license for maximum flexibility
- **Dependencies**: All MIT/BSD compatible (no GPL restrictions)
- **Research data**: Open source for reproducibility and academic use

---

*This architecture supports the current prototype while providing clear extension paths for production BOTC applications.*