# BDD Alternative Architecture Investigation

**Date**: 2025-07-07  
**Status**: Speculative research direction  
**Priority**: Low (current SAT approach works well enough)

## Motivation

Our current SAT-based approach achieves 35.0% CV bias reduction, which is workable but not ideal. We explored whether Binary Decision Diagrams (BDDs) might offer advantages, particularly for uniform sampling of the solution space.

## BDD Potential Advantages

### 1. Native Uniform Sampling
- **Exact solution counting**: BDDs can count solutions in polynomial time
- **True uniform sampling**: Generate samples without solver bias artifacts
- **Eliminates our bias problem**: No VSIDS heuristics or other solver-dependent effects

### 2. Compositional Construction
- **Modular BDD building**: Compose separate BDDs for different constraint types
- **Reusable components**: Baron's effect BDD could be reused across contexts
- **Functional representation**: Avoid explicit intermediate state variables

### 3. Structural Advantages for BOTC
- **Most roles don't modify counts**: Only Baron and Drunk have setup effects
- **Simple arithmetic patterns**: Count modifications are linear (±1, ±2)
- **Limited interaction**: Role presence decisions mostly independent
- **Natural sharing**: Common modification patterns across scenarios

## Potential Challenges

### 1. Variable Count Reality Check
- **Initial optimism**: Thought we could reduce from 13K to 50-100 variables
- **Realistic assessment**: Still need sequential count modification chains
- **Likely reduction**: Maybe 4-5x improvement rather than 100x

### 2. Size Explosion Risk
- **Worst case**: BDD size exponential in variable count
- **Variable ordering critical**: Poor ordering can make BDDs massive
- **Arithmetic complexity**: "Exactly N roles" constraints might be expensive

### 3. Implementation Challenges
- **Tool ecosystem**: Less mature than SAT solvers
- **Browser compatibility**: Fewer JavaScript/WASM options
- **Performance**: May lack decades of SAT solver optimization

## BOTC-Specific Structural Analysis

### Favorable Characteristics:
```
// Most roles have no setup effects - massive structural redundancy
simpleRoles = [washerwoman, librarian, investigator, chef, empath, ...]
modifyingRoles = [baron, drunk]  // Only 2 out of 22 roles!

// Count arithmetic is simple and repetitive
if (baron_present) {
    townsfolk_count = base_count - 2
    outsider_count = base_count + 2
} else {
    townsfolk_count = base_count
    outsider_count = base_count  
}
```

### Potential Sharing Opportunities:
- **Common paths**: When no modifying roles present
- **Deterministic arithmetic**: Given inputs, outputs are deterministic
- **Limited branching**: Binary role presence decisions
- **Pruned space**: Many variable combinations are impossible

## Research Questions

1. **Structural favorability**: Do BOTC constraints create compact BDDs?
2. **Variable ordering**: Can we find good orderings for our constraint patterns?
3. **Composition efficiency**: Do arithmetic BDD operations scale for our problem size?
4. **Tool availability**: Are there suitable BDD libraries with browser compatibility?

## Experimental Approach

If pursued, start with minimal scope:
1. **Small subset**: 7-player game, Baron + 3-4 other roles
2. **Measure BDD size**: Compare to SAT variable count for same constraints
3. **Test composition**: Build separate BDDs and compose them
4. **Evaluate sampling**: Compare uniform sampling quality vs current 35% CV
5. **Performance comparison**: Time and memory vs SAT approach

## Risk Assessment

**Low risk experiment**: 
- Current SAT approach works (35% CV acceptable for short-medium term)
- BDD investigation can proceed in parallel
- Bounded scope limits implementation cost

**High potential reward**:
- True uniform sampling would eliminate bias concerns
- Could provide exact solution counting for analysis
- Might enable new types of constraint reasoning

## Decision Rationale

**Not immediate priority** because:
- Current constraint-based SAT approach achieves workable bias reduction
- 35.0% CV represents significant improvement over baseline (47.3%)
- SAT tooling is mature and browser-compatible
- Other research directions (uniform minion sampling validation) more pressing

**Worth future investigation** because:
- Uniform sampling would be qualitatively better than bias reduction
- BDD structure might be naturally favorable for BOTC constraints
- Could unlock new analysis capabilities (exact counting, perfect sampling)

## Speculation Disclaimer

⚠️ **All analysis above is speculative**. Actual BDD behavior for BOTC constraints requires empirical testing. The structural favorability arguments are plausible but unproven.