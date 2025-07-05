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

**🚧 IN PROGRESS**:
- [ ] Implement variable indirection layer to eliminate solver bias
- [ ] Test bias reduction effectiveness with slot-based variable assignment
- [ ] Validate that indirection preserves constraint correctness
- [ ] Performance analysis: measure overhead of permutation encoding

**🔮 FUTURE ENHANCEMENTS**:
- [ ] Add weighted preferences (slight bias toward/against certain roles)
- [ ] Implement "avoid recent" mode (prefer different roles than last N games)
- [ ] Advanced variety metrics and analysis tools

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

- `src/script-compiler.ts` - DSL to SAT constraint compilation
- `src/bag-compiler.ts` - Bag validation and generation logic
- `src/solver.ts` - SAT solver wrapper with clause counting
- `src/trouble-brewing-roles.ts` - Role definitions with constraints
- `research/constraint-explosion-analysis.md` - Performance findings