# SAT Solver Capabilities Analysis

**Date**: 2025-01-05  
**Status**: Critical Issue Identified - Wrapper vs Underlying Solver Mismatch

## Executive Summary

The vendored JSMiniSolvers library is fully capable of handling logical constraints and negation, but our TypeScript wrapper only supports trivial variable assignments. This explains why the DSL compilation approach appeared non-functional.

## Findings

### ✅ JSMiniSolvers (Vendored Library) - FULLY CAPABLE

**API Available:**
- `new_var()` - Create new variables
- `add_clause([...])` - Add CNF clauses with positive/negative literals  
- `solve()` - Returns 1 (SAT) or 0 (UNSAT)
- `get_model()` - Returns variable assignments as array
- `nvars()` - Get number of variables

**Logical Operations Supported:**
- ✅ **Negation**: Use negative variable IDs (e.g., `-1` for NOT x1)
- ✅ **Conjunction (AND)**: Multiple clauses  
- ✅ **Disjunction (OR)**: Multiple literals in same clause
- ✅ **Implications**: Convert `A => B` to `[-A, B]`
- ✅ **Contradictions**: Properly detects UNSAT

**Test Results:**
```javascript
// Contradiction test: UNSAT as expected
solver.add_clause([1, -1]);  // x OR NOT x (tautology)
solver.add_clause([1]);      // x must be true  
solver.add_clause([-1]);     // x must be false (contradiction)
result = solver.solve();     // Returns 0 (UNSAT) ✅

// Satisfiable test: SAT with model
solver.add_clause([1, 2]);   // x1 OR x2
solver.add_clause([-1, -2]); // NOT x1 OR NOT x2  
result = solver.solve();     // Returns 1 (SAT) ✅
model = solver.get_model();  // [false, true] ✅
```

### ❌ TypeScript Wrapper (`src/solver.ts`) - SEVERELY LIMITED

**Current Parser:**
```typescript
private parseConstraint(constraint: string): { variable: string; value: boolean } | null {
    if (constraint.includes('=')) {
        const [variable, value] = constraint.split('=').map(s => s.trim());
        return { variable, value: value === 'true' };
    }
    return null; // ALL logical operators ignored!
}
```

**What Gets Ignored:**
- ❌ `NOT x=true` → Treated as variable name "NOT x"
- ❌ `x AND y` → Treated as variable name "x AND y"  
- ❌ `x => y` → Treated as variable name "x => y"
- ❌ All DSL-generated logical rules

**What Works:**
- ✅ `x=true` → CNF clause `[1]`
- ✅ `x=false` → CNF clause `[-1]`
- ✅ Contradictions between simple assignments

## Impact on BOTC DSL Project

### Research Findings Validation
The research document's analysis was **architecturally correct**:
- N-level modification chains ✅
- Generic DSL compilation ✅  
- Two-stage validation approach ✅

### Root Cause of "Non-Functional" DSL
All generated logical rules like:
```
baron_present=true AND base_outsider_0=true => after_role_20_outsider_2=true
```
Were treated as variable names instead of logical constraints.

## Solutions

### Option 1: Fix TypeScript Wrapper (RECOMMENDED)
**Effort**: Medium  
**Benefits**: 
- Reuses existing JSMiniSolvers (proven, no new dependencies)
- Validates research architecture  
- Full logical constraint support

**Implementation**:
1. Extend parser to handle logical operators
2. Convert logical expressions to CNF clauses
3. Map to JSMiniSolvers API properly

### Option 2: Switch to SMT Solver  
**Effort**: Medium-High  
**Benefits**: Native logical/arithmetic constraint support  
**Risks**: Browser compatibility, deployment complexity

### Option 3: Direct Computation
**Effort**: Low  
**Benefits**: Simple, fast  
**Limitations**: Less flexible for complex reasoning

## Recommendation

**Fix the TypeScript wrapper** to properly utilize JSMiniSolvers. The underlying solver is industrial-strength and the architecture is sound. The issue is a 20-line parsing function, not a fundamental approach problem.

## Next Steps

1. Implement logical expression parser in TypeScript wrapper
2. Add CNF conversion for common operators (AND, OR, =>, NOT)  
3. Test with existing DSL compilation from research
4. Validate full BOTC constraint satisfaction pipeline