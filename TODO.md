# Blood on the Clocktower DSL - TODO List

## Current Status
- **Branch**: `dsl-to-sat-experiment`
- **Last Updated**: 2025-07-05
- **Core System**: ✅ Working SAT-based bag validation with Baron & Drunk roles

## Immediate Tasks

### 1. Performance Optimization ✅
**Priority**: High  
**Issue**: Role enumeration constraints cause 4000x clause explosion (2K → 8.3M clauses)

**RESOLVED**: Sequential counter encoding implemented, reducing constraints from 8.3M to 50K clauses (168x improvement)

**Completed**:
- ✅ Implement sequential counter encoding for "exactly-N" constraints instead of combinatorial
- ✅ Demonstrate working bag generation with preference constraints
- ✅ Fix physical bag extraction to handle role substitutions correctly

**Future options**:
- [ ] Try Z3 SMT solver backend (has built-in cardinality constraints)
- [ ] Implement hybrid approach: algorithmic role selection + SAT validation
- [ ] Add constraint preprocessing to eliminate redundancies

### 2. Extend DSL Support
**Priority**: Medium  
**Current**: Baron (count modification) + Drunk (physical bag substitution) working

**Add more role types**:
- [ ] Marionette (uses physical bag substitution DSL)
- [ ] Lunatic (uses physical bag substitution DSL)  
- [ ] Other Trouble Brewing roles with setup effects
- [ ] Test complex multi-role interactions

### 3. Bag Generation Improvements ✅
**Priority**: Medium  
**Current**: Generation mode working with sequential counter optimization

**Completed**:
- ✅ Fix constraint explosion (sequential counter encoding implemented)
- ✅ Fix physical bag extraction to properly handle role substitutions
- ✅ Add generation preferences ("mustInclude", "mustExclude" constraints)
- ✅ Demonstrate logical inference (Drunk + 7 players → automatic Baron inclusion)

**Future improvements**:
- [ ] Support roles that might have multiple tokens
- [ ] Add more sophisticated preference mechanisms

### 4. Testing & Validation
**Priority**: Medium  

**Current gaps**:
- [ ] Test all Trouble Brewing role combinations systematically
- [ ] Add property-based testing (generate random valid setups)
- [ ] Performance benchmarking across different player counts
- [ ] Browser compatibility testing with large constraint sets

### 5. Architecture Improvements
**Priority**: Low  

**Nice to have**:
- [ ] Split script-compiler.ts (getting large)
- [ ] Add configuration system for solver backend choice
- [ ] Improve error messages when constraints are unsatisfiable
- [ ] Add debug mode to dump constraint details

## Research Questions

1. **Constraint Encoding Efficiency**
   - Can sequential counters reduce 1,716 → ~65 clauses for "5 from 13"?
   - What's the practical limit for role enumeration constraints?

2. **Solver Comparison**
   - How does Z3 perform vs JSMiniSolvers for this domain?
   - Are there SAT solvers optimized for cardinality constraints?

3. **Hybrid Approaches**
   - What's the break-even point: 1 solve × 8M clauses vs N solves × 2K clauses?
   - Can we enumerate valid role combinations algorithmically?

## Major Accomplishments ✅

**Core System**:
- ✅ Implement physical bag substitution DSL (Drunk working)
- ✅ Add clause counting to SAT solver for performance analysis
- ✅ Create dual-mode architecture (validation vs generation)
- ✅ Document constraint explosion findings in research/
- ✅ Test Baron + Drunk combinations working correctly
- ✅ Verify bag legality validation accuracy

**Performance Breakthrough**:
- ✅ Implement sequential counter encoding (168x constraint reduction)
- ✅ Fix constraint explosion from 8.3M to 50K clauses
- ✅ Achieve working bag generation with preferences
- ✅ Create complete generation→verification cycle
- ✅ Demonstrate logical inference capabilities

**System Integration**:
- ✅ All tests passing with verification
- ✅ Physical bag extraction handling role substitutions correctly
- ✅ Preference-based generation working (mustInclude/mustExclude)
- ✅ TypeScript wrapper for SAT solver with CNF interface

## Technical Debt

- [ ] Remove unused `model` parameter warnings
- [ ] Add proper TypeScript strict mode compliance
- [ ] Improve CNF clause generation efficiency
- [ ] Add unit tests for individual constraint types
- [ ] **INVESTIGATION**: Inconsistent constraint type definitions between `roles.ts` and actual usage
  - `roles.ts` defines `BagConstraint` interface with complex nested structure
  - Actual role definitions use simplified constraint format with direct `type`, `target`, `delta` fields
  - `trouble-brewing-roles.ts` uses the simpler format exclusively
  - Need to decide: standardize on one approach or support both with proper type safety

## Strategic Development Directions

### Direction A: Multi-Script Support
**Goal**: Validate DSL generality across BOTC editions
**Priority**: Medium | **Risk**: Medium | **Effort**: High

- [ ] Implement Sects & Violets script and role definitions
- [ ] Implement Bad Moon Rising script and role definitions  
- [ ] Test constraint system with different role mechanics (Madness, etc.)
- [ ] Validate that current architecture scales to other editions
- [ ] Document any DSL extensions needed for new mechanics

**Value**: Proves system generality, enables broader BOTC support
**Risk**: May discover fundamental limitations requiring architecture changes

### Direction B: Grimoire Validation  
**Goal**: Move from setup validation to gameplay state validation
**Priority**: High | **Risk**: High | **Effort**: Very High

- [ ] Design grimoire state representation (player assignments, deaths, etc.)
- [ ] Model legal state transitions during gameplay
- [ ] Implement day/night phase validation
- [ ] Add ability validation (when/how abilities can be used)
- [ ] Test complex interaction scenarios (multiple abilities affecting same target)

**Value**: Unlocks full BOTC rule validation, highest practical impact
**Risk**: Significantly more complex problem domain than setup validation

### Direction C: Solution Space Exploration ✅ PROVEN FEASIBLE
**Goal**: Add randomization and variety to generated setups
**Priority**: HIGH | **Risk**: LOW | **Effort**: Medium

**✅ COMPLETED**:
- ✅ Proved JSMiniSolvers supports blocking clauses for multiple solutions
- ✅ Implemented `generateMultipleLegalBags()` with variety generation
- ✅ Identified systematic bias due to VSIDS variable ordering heuristics
- ✅ Designed variable indirection solution to eliminate bias

**✅ COMPLETED**:
- ✅ Implement variable indirection layer to eliminate solver bias
- ✅ Test bias reduction effectiveness with slot-based variable assignment
- ✅ Validate that indirection preserves constraint correctness
- ✅ Create generalized seed analysis system for deterministic testing
- ✅ Generate 1000 random seeds with improved bit-pattern variation
- ✅ Compare sequential vs random seed bias patterns (6.9% CV improvement)
- ✅ Document bias reduction findings and analysis framework

**🚧 IN PROGRESS**:
- [ ] Performance analysis: measure overhead of permutation encoding

**🔮 FUTURE ENHANCEMENTS**:
- [ ] Add weighted preferences (slight bias toward/against certain roles)
- [ ] Implement "avoid recent" mode (prefer different roles than last N games)
- [ ] Advanced variety metrics and analysis tools

### 6. Textual Representation Standardization 🆕
**Priority**: High  
**Status**: New requirement identified

**Goal**: Establish standard textual formats for core BOTC game state representations

**Required formats**:
- [ ] **Bag representation**: Standard format for role token collections
  - Physical bag vs in-play distribution
  - Role counts and substitutions
  - Validation status display
- [ ] **Player layout**: Standard format for game seating and player identities
  - Seat positions and player names
  - Alive/dead status
  - Voting eligibility
- [ ] **Grimoire state**: Standard format for complete game state
  - Player character assignments
  - Reminder tokens and their positions
  - Status effects (poisoned, drunk, etc.)
  - Secret information tracking
- [ ] **Events**: Standard format for game state transitions
  - Player actions and ability usage
  - Storyteller information distribution
  - State change documentation
  - Turn/phase tracking

**Requirements**:
- [ ] Human-readable text format
- [ ] Machine-parseable structure
- [ ] Consistent formatting across all tools
- [ ] Support for partial/incomplete information
- [ ] Validation of format correctness

**Impact**: Foundation for grimoire validation, event modeling, and full gameplay state tracking

### 7. Uniform Minion Sampling Validation 🔬
**Priority**: Medium  
**Status**: Research validation experiment

**Goal**: Validate whether our 35% CV represents mathematical reality vs remaining algorithmic bias

**Methodology**:
- [ ] **Enumerate all valid minion combinations** for each player count (7-12)
  - 7 players: [Baron], [Poisoner], [Spy], [Scarlet Woman] (4 combinations)
  - 8+ players: All valid 1-minion and 2-minion combinations
- [ ] **Sample uniformly** from minion combinations (not SAT-solver dependent)
- [ ] **Solve for remaining roles** using SAT constraints to complete each setup
- [ ] **Measure resulting role frequencies** across uniform minion distribution
- [ ] **Compare with constraint matrix results** (Baron: 10.5%, CV: 35.0%)

**Expected Insights**:
- If uniform sampling → similar frequencies: Our system achieves near-mathematical optimum
- If uniform sampling → higher Baron frequency: Our system still has algorithmic bias
- Establishes ground-truth baseline for "true" BOTC role frequency distribution

**Implementation**:
```typescript
// For each player count, enumerate all valid minion combinations
const minionCombos = generateAllValidMinionCombinations(playerCount);
for (const minions of minionCombos) {
    const solution = solveWithFixedMinions(minions);
    // Aggregate frequencies across uniform minion sampling
}
```

**Value**: Validates our bias reduction methods and establishes mathematical baseline for BOTC frequencies

### 8. Web UI Visualization Layer 🔮
**Priority**: Low (Future)  
**Status**: Long-term enhancement

**Goal**: Rich web interface with interactive visualizations for BOTC game state

**Components**:
- [ ] **Interactive Grimoire Board**: SVG-based game board with drag-and-drop tokens
  - Clickable player seats with status indicators
  - Token placement and movement animations
  - Real-time validation feedback
  - Touch-friendly mobile interface
- [ ] **Bag Visualization**: Interactive representation of role token collections
  - Visual diff between physical bag and in-play distribution
  - Drag-and-drop role assignment
  - Validation status with visual indicators
- [ ] **Player Layout Interface**: Interactive seating chart
  - Click to assign players to seats
  - Status indicators (alive/dead, voting eligibility)
  - Player information panels
- [ ] **Event Timeline**: Visual history of game state transitions
  - Chronological event display
  - Click to inspect detailed event information
  - Ability usage tracking and visualization
- [ ] **Storyteller Tools**: Interactive utilities for game management
  - Quick role assignment and validation
  - Information distribution tracking
  - Turn/phase management interface

**Technical Requirements**:
- [ ] Build on standardized textual representation formats
- [ ] Responsive design for desktop and mobile
- [ ] Real-time validation integration
- [ ] Accessibility compliance
- [ ] Touch and mouse interaction support

**Dependencies**: Requires completion of textual representation standardization (Task #6)

**Impact**: Enhanced user experience for storytellers and players, broader tool adoption

**✅ MAJOR BREAKTHROUGH - SOLUTION SPACE TOPOLOGY MAPPED**:
- ✅ **Constraint Matrix Analysis**: Systematic exploration of solution space via role pair constraints
  - **Scope**: 2,520 trials across all role pairs and player counts 7-12
  - **Success Rate**: 99.4% (2,504/2,520 successful trials)
  - **Performance**: 177s total runtime (70.2ms per trial)
  - **Key Discovery**: Baron appearance follows predictable mathematical patterns:
    - **7 players**: 23.1% Baron frequency (HIGH)
    - **8 players**: 4.8% Baron frequency (low)
    - **9 players**: 3.8% Baron frequency (low)  
    - **10 players**: 23.1% Baron frequency (HIGH)
    - **11 players**: 4.8% Baron frequency (low)
    - **12 players**: 3.8% Baron frequency (low)
  - **Pattern**: Baron frequency correlates with base distribution requirements
  - **Role Hierarchy**: Systematic analysis of all role frequencies (Baron rarest at 10.5%, Scarlet Woman most common at 49.2%)
  - **Documented**: Complete analysis in `research/constraint-matrix-analysis.md`
- [ ] **Test Coverage Gap**: Variable indirection system not exercised by existing tests
  - **Option A**: Create new test suite that exercises same scenarios with `useVariableIndirection: true`
  - **Option B**: Make variable indirection always-on by default (use identity permutation or seed=0 when determinism needed)
  - Most existing tests in `src/index.ts` were written before variable indirection and use the old direct approach
  - Need to ensure constraint correctness is maintained across both code paths
  - Decision impacts whether we maintain two modes vs. standardize on indirection
- [ ] **Clean up experimental Baron investigation files**: Many temporary investigation scripts created
  - Review experimental files for permanent value vs temporary debugging
  - Keep useful analysis tools, remove one-off debugging scripts
  - Consolidate learnings into permanent analysis framework

**Value**: ✅ PROVEN - Immediate practical improvement, genuine setup variety
**Risk**: ✅ MITIGATED - Technical feasibility confirmed, bias solution designed

## Long-term Integration Goals

- [ ] Integration with actual BOTC game applications
- [ ] Web UI for interactive bag generation and validation
- [ ] Mobile app integration for storyteller tools

## Documentation and Architecture

- [ ] Split README.md into user-focused goals vs. internal architecture decisions
- [ ] Create separate architectural design document
- [ ] Add API documentation for external integration

---

## Quick Start Commands

```bash
# Run all tests including bag validation
npm run dev

# Compile for browser testing  
npm run build:browser

# Run specific test scenarios
# (modify src/index.ts to focus on specific tests)
```

## Key Files

**Core System**:
- `src/script-compiler.ts` - DSL to SAT constraint compilation (includes variable indirection)
- `src/bag-compiler.ts` - Bag validation and generation logic
- `src/solver.ts` - SAT solver wrapper with clause counting
- `src/trouble-brewing-roles.ts` - Role definitions with constraints

**Bias Analysis & Testing**:
- `src/first-solution-analysis.ts` - Generalized seed analysis system
- `src/compare-seed-patterns.ts` - Compare sequential vs random seed bias
- `src/generate-random-seeds.ts` - Generate 1000 random seeds for testing
- `src/analyze-sequential-seeds.ts` - Helper for sequential seed analysis
- `src/analyze-random-seeds.ts` - Helper for random seed analysis
- `random-seeds.json` - 1000 pre-generated random seeds for deterministic testing
- `bias-comparison-analysis.md` - Documented findings from seed pattern comparison

**Solution Space Exploration**:
- `src/constraint-matrix-analysis.ts` - Systematic constraint-based solution space exploration
- `constraint-matrix-full-analysis.log` - Complete log of 2,520 constraint trials
- `constraint-analysis-2025-07-06T20-36-21-237Z.json` - Raw results data

**Research & Documentation**:
- `research/constraint-explosion-analysis.md` - Performance findings
- `research/sat-solver-investigation.md` - SAT solver evaluation results
- `research/constraint-matrix-analysis.md` - Solution space topology findings and Baron frequency patterns