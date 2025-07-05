# Solution Variety Generation - Research Findings

## Executive Summary

**Status**: ✅ Technically Feasible ⚠️ Bias Issues Identified 🔬 Solution Designed

We successfully implemented blocking clause-based solution enumeration for BOTC bag generation. While the approach works, we discovered systematic bias due to SAT solver heuristics that favor certain roles. We've designed an elegant solution using variable indirection that should eliminate this bias.

## Key Findings

### ✅ What Works
1. **JSMiniSolvers supports incremental solving** - Can add clauses after solve() and solve again
2. **Blocking clauses generate genuine variety** - Each solution is unique and different
3. **Complex BOTC constraints maintained** - All role interactions (Baron, Drunk) work correctly
4. **Performance is acceptable** - ~50K clauses, reasonable solve times

### ⚠️ Discovered Problems
1. **Systematic role bias** - Some roles appear in 100% of solutions
2. **VSIDS heuristic bias** - Solver favors lower-numbered variables due to activity scoring
3. **Predictable patterns** - washerwoman, chef, empath, investigator always selected

### 🔬 Root Cause Analysis
**Variable State Independent Decaying Sum (VSIDS)** branching heuristic:
- Favors variables involved in recent conflicts
- Multiplicative decay creates exponential moving average
- Early variables (lower IDs) get more conflict activity
- Leads to "bridge variable" preference for structurally important variables

## Experimental Results

### Bias Analysis (10 solutions, 8 players)
```
Always appear (100%): washerwoman, investigator, chef, empath, imp
High frequency (50%+): spy (80%), librarian (60%), drunk (50%)
Variety achieved: butler/drunk/recluse/saint (outsiders), poisoner/scarlet_woman/spy (minions)
```

### Constraint Validation
- ✅ Baron + Drunk logical inference works (Baron in 5/5 solutions when needed)
- ✅ Role type distributions correct (5 Townsfolk, 1 Outsider, 1 Minion, 1 Demon)
- ✅ Complex setup effects properly modeled

## Proposed Solution: Variable Indirection

### Concept
Instead of letting solver bias directly affect roles, create an indirection layer:

```
Core SAT constraints ← slot_1, slot_2, ..., slot_N ← Random permutation ← role variables
```

### Implementation
1. **Fixed slot variables** (inherit solver bias): `slot_1`, `slot_2`, ..., `slot_N`
2. **Stable role variables**: `washerwoman_present`, `chef_present`, etc.
3. **Dynamic mapping**: Each run, randomly assign `slot_i ↔ role_j_present`
4. **Cheap encoding**: N biconditionals = 2N additional clauses

### Advantages
- **No recompilation** - Core constraints stay identical
- **Solver bias randomized** - slot_1 still favored, but maps to random role
- **Blocking clauses preserved** - Work on stable role variables
- **Minimal overhead** - Just 2N additional clauses per run

## Technical Implementation

### Current Working Code
- `generateMultipleLegalBags()` - Generates multiple solutions with blocking clauses
- Proper variable naming fixed (`${roleId}_present` not `selected_${roleId}`)
- Comprehensive bias analysis testing framework

### Next Steps
1. Implement variable indirection layer in `ScriptToSATCompiler`
2. Test bias reduction with slot-based approach
3. Compare: variety with/without blocking clauses using indirection
4. Performance analysis: overhead of permutation encoding

## Research References

**SAT Solver Bias Sources:**
- VSIDS heuristic creates systematic variable ordering bias
- Bridge variables (high centrality) preferred by conflict-driven learning
- Multiplicative decay favors persistent over intermittent conflicts
- Variable ordering significantly impacts BDD size and solver behavior

**Solution Approaches:**
- Uniform SAT sampling remains active research area
- Variable ordering randomization recognized solution
- BDD-based approaches particularly sensitive to ordering
- Industrial validation shows significant impact on sampling uniformity

## Conclusion

Direction C (Solution Space Exploration) is **feasible and promising**. The bias issue, while significant, has a clean solution through variable indirection. This approach maintains all the benefits of incremental SAT solving while eliminating systematic role preference bias.

**Recommendation**: Proceed with variable indirection implementation as the foundation for production-ready variety generation.