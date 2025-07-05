# Blood on the Clocktower DSL - TODO List

## Current Status
- **Branch**: `dsl-to-sat-experiment`
- **Last Updated**: 2025-07-05
- **Core System**: ✅ Working SAT-based bag validation with Baron & Drunk roles

## Immediate Tasks

### 1. Performance Optimization 🔥
**Priority**: High  
**Issue**: Role enumeration constraints cause 4000x clause explosion (2K → 8.3M clauses)

**Options to explore**:
- [ ] Implement sequential counter encoding for "exactly-N" constraints instead of combinatorial
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

### 3. Bag Generation Improvements
**Priority**: Medium  
**Current**: Generation mode implemented but too slow due to constraint explosion

**Improvements needed**:
- [ ] Fix constraint explosion (see #1 above)
- [ ] Add better physical bag extraction (currently assumes 1 token per role)
- [ ] Support roles that might have multiple tokens
- [ ] Add generation preferences (e.g., "include Drunk", "avoid Baron")

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

## Completed Recently ✅

- ✅ Implement physical bag substitution DSL (Drunk working)
- ✅ Add clause counting to SAT solver for performance analysis
- ✅ Create dual-mode architecture (validation vs generation)
- ✅ Document constraint explosion findings in research/
- ✅ Test Baron + Drunk combinations working correctly
- ✅ Verify bag legality validation accuracy

## Technical Debt

- [ ] Remove unused `model` parameter warnings
- [ ] Add proper TypeScript strict mode compliance
- [ ] Improve CNF clause generation efficiency
- [ ] Add unit tests for individual constraint types

## Long-term Goals

- [ ] Support other BOTC editions (Sects & Violets, Bad Moon Rising)
- [ ] Add gameplay state transition validation (beyond just setup)
- [ ] Integration with actual BOTC game applications
- [ ] Web UI for interactive bag generation and validation

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