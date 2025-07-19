# Blood on the Clocktower DSL - Architecture Design

## High-Level Concept

### The Core Insight: Script-to-SAT Compilation

The fundamental innovation of this system is treating Blood on the Clocktower rule validation as a **constraint satisfaction problem**. Instead of writing imperative code to check each rule manually, we compile the entire script (collection of roles) into a SAT formula that encodes all legal game configurations. This approach transforms rule validation from "check if this specific setup is legal" to "find any/all legal setups that satisfy these constraints."

### From English Rules to SAT Constraints

Each BOTC role comes with English rule text that describes setup effects. For example:
- **Baron**: "There are extra Outsiders in play. [+2 Outsiders]"
- **Drunk**: "You do not know you are the Drunk. You think you are a Townsfolk character, but you are not."

We extract the mathematical essence of these rules into a simple DSL attached to each role definition:

```typescript
// Baron modifies the base role-type distribution
baron: {
  constraints: [
    { type: 'count_modification', target: 'townsfolk', delta: -2 },
    { type: 'count_modification', target: 'outsider', delta: 2 }
  ]
}

// Drunk creates a mismatch between physical bag and in-play roles
drunk: {
  constraints: [
    { type: 'physical_bag_substitution', fromType: 'outsider', toType: 'townsfolk' }
  ]
}
```

### DSL vs SAT: Compilation Required

**Critical Architecture Point**: The DSL constraints are **not SAT fragments** themselves. They are declarative specifications that require contextual compilation.

**Why Compilation is Necessary**:
- **Role ordering matters**: Baron's effect depends on its position in the modification chain
- **Script context required**: The same role constraint generates different SAT variables depending on which other roles are present
- **Sequential dependencies**: Count modifications create chains like `base_townsfolk_5 → after_baron_townsfolk_3 → final_townsfolk_3`

**Compilation Process**:
1. **Script analysis**: Determine which roles modify each count type
2. **Ordering resolution**: Create sequential modification chains based on script role order
3. **Variable generation**: Create context-specific SAT variables for each step in the chain
4. **Constraint synthesis**: Generate CNF clauses that encode the modification logic

**Alternative Architecture Question**: Could we precompile role-specific SAT fragments independent of script context? This would require solving complex problems:
- **Variable naming conflicts**: How to merge fragments without collisions?
- **Ordering dependencies**: How to handle sequential count modifications?
- **Context isolation**: How to encode "Baron reduces townsfolk by 2" without knowing the starting count?

Currently, our **script-to-SAT compilation** approach handles these complexities by generating the complete constraint system with full context awareness.

### The Role-Type Count Pipeline Challenge

A critical insight was modeling how role-type counts flow through modifications. The base game has fixed distributions (e.g., 7 players = 5 Townsfolk, 0 Outsiders, 1 Minion, 1 Demon), but roles like Baron change these counts. The challenge is efficiently encoding scenarios where multiple roles might modify the same count type.

Our solution uses a **constraint pipeline** approach to avoid SAT formula explosion:
1. **Base counts**: Encode the standard distribution for each player count
2. **Modification chain**: For each role type, create a sequential chain of modifications where each role in the script potentially alters the count
3. **Final counts**: The end result represents the actual in-play distribution
4. **Physical bag mapping**: Additional transformations for roles like Drunk that affect physical tokens

For example, with Baron in a 7-player game:
```
base_townsfolk_5 → after_role_baron_townsfolk_3 → final_townsfolk_3
base_outsider_0  → after_role_baron_outsider_2  → final_outsider_2
```

Note: The sequential ordering is an implementation convenience - current BOTC role modifications are mathematically commutative, so the final counts are independent of the processing order. The pipeline avoids the complexity of encoding all possible combinations of role presence as separate constraint branches.

### SAT Variables and Constraint Encoding

The system creates thousands of boolean variables representing every possible game state:
- `player_count_7` = "this is a 7-player game"
- `baron_present` = "Baron is in this setup"
- `base_townsfolk_5` = "base setup has 5 Townsfolk"
- `final_outsider_2` = "final setup has 2 Outsiders"

These variables are connected by logical implications encoded as CNF clauses:
- `player_count_7 → base_townsfolk_5` (7-player games start with 5 Townsfolk)
- `baron_present ∧ base_townsfolk_5 → after_baron_townsfolk_3` (Baron reduces 5→3 Townsfolk)

### The Power of Constraint Compilation

This approach provides remarkable capabilities:

**Validation**: Given a specific setup, add constraints that fix the variables (`baron_present=true`, `player_count_7=true`, etc.) and check satisfiability. If SAT, the setup is legal; if UNSAT, it violates BOTC rules.

**Generation**: Add only high-level constraints (`player_count_8=true`) and let the SAT solver find any valid configuration. The solver automatically handles complex interactions like "if Drunk is present in a 7-player game, Baron must also be present to create Outsider slots."

**Analysis**: Generate thousands of valid setups to understand the mathematical structure of BOTC's solution space, revealing patterns like Baron appearing 23% of the time in 7-player games but only 4% in 8-player games.

### Why This Architecture Succeeds

1. **Declarative**: Rules are facts about legal configurations, not procedural steps
2. **Composable**: New roles just add more constraints without breaking existing logic  
3. **Complete**: The SAT solver explores the entire solution space, finding edge cases humans might miss
4. **Efficient**: Despite generating ~50K constraints, modern SAT solvers handle this easily
5. **Analyzable**: The constraint structure reveals deep mathematical properties of BOTC rules

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
├── rendering/      # ASCII grimoire visualization
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

### 🔌 **Application Layer** (`src/`)

#### `index.ts` - Main Library Entry Point
- **Purpose**: Clean public API for external applications
- **Key Features**:
  - BOTCValidator class for easy integration
  - Unified interface for validation and generation
  - Exports core classes and analysis tools
  - Simplified method signatures for common use cases

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
  - Role abbreviation system (ww, lib, inv, poi, ft, but, sw, etc.)
  - Registration system for role constraint compilation

### 🎨 **Rendering Layer** (`src/rendering/`)

#### `ascii-grimoire.ts` - ASCII Art Grimoire Rendering
- **Purpose**: Renders BOTC grimoire state as ASCII art with bubble column format
- **Key Features**:
  - Hybrid dense/justified spacing algorithm for optimal visual layout
  - Intelligent auto mode with exhaustive configuration evaluation
  - Four-sided layout support (top, right, bottom, left player placement)
  - Visual squareness scoring with 6:10 character aspect ratio
  - Proper coordinate separation to prevent text overlap

#### `token-formatter.ts` - Token Abbreviation System  
- **Purpose**: Handles role name abbreviations for compact token display
- **Key Features**:
  - Automatic abbreviation of reminder tokens (washerwoman:townsfolk → ww:townsfolk)
  - 31% width reduction in rendered layouts
  - Toggle support for backward compatibility
  - Comprehensive role abbreviation mapping

#### `single-line-format.ts` - Single-Line Format Renderer
- **Purpose**: Compact single-line representation of grimoire state
- **Key Features**:
  - Abbreviated format support
  - Player status indicators (alive/dead, ghost vote)
  - Token display with abbreviations
  - Consistent format across all player counts

#### `types.ts` - Rendering Type Definitions
- **Purpose**: TypeScript interfaces and types for rendering system
- **Key Features**:
  - RenderOptions, TurnBasedLayout, PlayerPosition interfaces
  - AbstractGrid and GridCell definitions
  - Comprehensive type documentation with representation invariants

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

#### `generate-random-seeds.ts` - Random Seed Generation
- **Purpose**: Generate high-quality random seeds for deterministic testing
- **Key Features**:
  - Produces 1000 random seeds with improved bit-pattern variation
  - Exports to `random-seeds.json` for reproducible analysis
  - Supports configurable seed count and output formats

#### `analyze-random-seeds.ts` - Random Seed Analysis Helper
- **Purpose**: Analyze bias patterns using random seed sets
- **Key Features**:
  - Role frequency calculation across random seed trials
  - Statistical bias metrics (coefficient of variation)
  - Supports integration with larger analysis frameworks

#### `analyze-sequential-seeds.ts` - Sequential Seed Analysis Helper  
- **Purpose**: Analyze bias patterns using sequential seed sets
- **Key Features**:
  - Complementary analysis to random seed approach
  - Reveals solver bias artifacts in deterministic sequences
  - Statistical comparison baseline for bias reduction validation

#### `multi-player-count-analysis.ts` - Multi-Player Analysis
- **Purpose**: Comprehensive analysis across different player counts
- **Key Features**:
  - Baron frequency analysis across player counts 7-12
  - Cross-player-count pattern identification
  - Systematic exploration of player count effects on solution space

#### `test-seed-configurations.ts` - Seed Configuration Testing
- **Purpose**: Test framework for different seed configuration approaches
- **Key Features**:
  - Validates seed generation and analysis pipelines
  - Configurable test scenarios for bias analysis
  - Integration testing for analysis workflows

### 🧪 **Test Layer** (`src/tests/`)

#### `test-runner.ts` - Main Test Runner
- **Purpose**: Comprehensive test suite covering all major functionality
- **Coverage**: 
  - Setup function validation
  - SAT solver capability tests
  - Bag legality validation
  - Generative setup testing
  - Bias analysis validation

#### Core Functionality Tests:
- **`advanced-tests.ts`**: Core SAT solver functionality and constraint validation
- **`setup-tests.ts`**: Base setup function validation and role type distribution testing

#### Rendering System Tests:
- **`ascii-grimoire.test.ts`**: ASCII art grimoire rendering with comprehensive layout testing
- **`text-overlap-bug.test.ts`**: Text overlap prevention validation
- **`grimoire-examples-data.ts`**: Test data with SAT-generated legal role combinations (5-15 players)

#### SAT Solver Tests:
- **`sat-operator-tests.ts`**: SAT logical operator validation (AND, OR, NOT, implications)
- **`negation-tests.ts`**: Negation and contradiction handling in SAT constraints
- **`test-actual-solver.ts`**: Direct SAT solver capability testing
- **`test-new-wrapper.ts`**: SAT wrapper interface validation
- **`vendored-solver-tests.ts`**: JSMiniSolvers integration verification
- **`wrapper-logic-tests.ts`**: SAT wrapper logic correctness testing

#### Bias Analysis Tests:
- **`bias-analysis-test.ts`**: SAT solver bias detection and measurement
- **`variable-indirection-test.ts`**: Variable indirection system validation
- **`identity-permutation-test.ts`**: Identity permutation correctness testing
- **`seed-variation-test.ts`**: Seed variation impact analysis

#### Integration Tests:
- **`solution-exploration-test.ts`**: Multi-solution generation and exploration testing
- **`solution-pattern-test.ts`**: Solution pattern analysis and variety validation

### 🧪 **Experimental Layer** (`src/experiments/`)

#### `large-seed-analysis.ts` - Large-Scale Seed Analysis
- **Purpose**: Experimental analysis with larger seed sets and extended scenarios
- **Key Features**:
  - Performance testing with high-volume seed analysis
  - Extended statistical validation scenarios
  - Research into scalability limits and optimization opportunities

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

**Problem**: SAT solvers use VSIDS (Variable State Independent Decaying Sum) heuristics that create systematic bias toward lower-numbered variables, causing some roles to never appear in generated solutions.

**Solution**: A two-layer variable indirection system that absorbs solver bias while preserving logical constraints.

#### Technical Implementation:

```typescript
// Layer 1: Slot variables (inherit solver bias)
slot_1, slot_2, slot_3, ...

// Layer 2: Role variables (actual game roles)  
baron_present, drunk_present, ...

// Random permutation mapping: slot_i ↔ role_j_present
addBiconditional(slot_i, role_j_present);
```

#### How It Works:
1. **Slot variables** are created in order (slot_1, slot_2, ...) and inherit the SAT solver's natural bias
2. **Role variables** represent actual game roles and maintain all logical constraints
3. **Random permutation** maps slots to roles differently on each generation (controlled by seed)
4. **Biconditional constraints** ensure slot_i ↔ role_j equivalence preserves all game logic

#### Complexity and Tradeoffs:
- **Adds 22 slot variables** (relatively small compared to ~13K total SAT variables)
- **Adds 44 biconditional clauses** (small compared to ~50K total SAT clauses)
- **Optional feature** - can be disabled for deterministic behavior
- **Seed-controlled** - enables reproducible "random" permutations
- **Overhead is modest** relative to overall constraint system complexity

#### Measured Impact:
- **Improves variety**: 47.3% → 40.4% CV (permutation alone)
- **Does not enable rare roles**: Baron still never appeared (0%) with permutation alone
- **Requires constraint exploration**: Constraints are what force rare roles like Baron to appear (10.5%)

#### Uncertainty and Future Work:
⚠️ **Important**: We are not 100% certain this achieves truly uniform sampling. The approach:
- Assumes VSIDS bias is the primary source of non-uniformity
- May have other systematic biases we haven't identified
- Requires validation via ground truth experiments (e.g., uniform minion sampling)

**When to Use**:
- ✅ Research and analysis scenarios requiring variety
- ✅ Bag generation for human players (reduces repetition)  
- ❌ Deterministic testing (use identity permutation or disable)
- ❌ Performance-critical scenarios (adds computational overhead)

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

### 🎲 **Variable Indirection for Bias Reduction**
- **Problem**: SAT solvers have systematic bias due to VSIDS heuristics causing roles to never appear
- **Solution**: Two-layer variable system with random slot-to-role permutation mapping
- **Complexity**: Adds 22 slot variables and 44 biconditional clauses (modest overhead vs ~13K variables, ~50K clauses total)
- **Impact**: Improves variety (47.3% → 40.4% CV) but constraint exploration still required for rare roles
- **Uncertainty**: ⚠️ Not proven to achieve uniform sampling - may have remaining systematic biases

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