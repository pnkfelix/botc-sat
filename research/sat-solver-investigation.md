# SAT Solver Investigation - DSL Compilation Experiment

**Branch**: `dsl-to-sat-experiment`  
**Date**: 2025-01-05  
**Status**: Experimental - Critical limitations discovered

## Objective

Investigate feasibility of compiling BOTC DSL rules to SAT constraints for bag legality validation.

## Approach Taken

### Two-Stage Compilation
1. **Script → SAT Rules**: Compile DSL constraints from roles into general logical rules
2. **Bag → SAT Facts**: Add specific observations about game instance
3. **Combined SAT Formula**: Rules ∧ Facts → Solver determines satisfiability

### Architecture Implemented
- **Role Representation**: (in-play roles, physical bag) distinction with DSL constraints
- **N-Level Modification Chains**: Generalized handling of multiple roles affecting same count type
- **Generic Compilation**: Script-agnostic compiler reading DSL constraints

## Design Evolution: From Role-Specific to Generic

### False Paths Explored

#### Approach 1: Hardcoded Role Logic
**Initial mistake**: Embedding role-specific knowledge directly in compiler:
```typescript
// BAD: Role-specific logic in compiler
if (roleId === 'baron') {
    constraints.push(`baron_present=true => outsider_count = base_outsider_count + 2`);
    constraints.push(`baron_present=true => townsfolk_count = base_townsfolk_count - 2`);
}
```
**Problem**: Defeats the purpose of having a DSL. Each new role requires compiler changes.

#### Approach 2: Compiler Does All Analysis 
**Second mistake**: Having compiler compute results and emit trivial SAT constraints:
```typescript
// BAD: Compiler computes answers
const expectedCount = baseCount + (baronPresent ? 2 : 0) + (otherRolePresent ? 1 : 0);
if (actualCount === expectedCount) {
    constraints.push('setup_valid=true');
} else {
    constraints.push('setup_valid=true');
    constraints.push('setup_valid=false'); // Force contradiction
}
```
**Problem**: SAT solver does no actual reasoning. We lose ability to find models or handle partial information.

#### Approach 3: Two-Level Variables (Baron-Specific)
**Third mistake**: Simple base→final progression with hardcoded role names:
```typescript
// BAD: Only handles one modifier per type
constraints.push(`baron_present=true AND base_outsider_0=true => final_outsider_2=true`);
// What if another role also modifies outsiders?
```
**Problem**: Can't handle multiple roles modifying the same count type. Doesn't scale.

### Correct Approach: N-Level Generic Chains

#### The Core Insight
**Revelation**: We need systematic variable chains where each role gets its own "slot" in the modification sequence, but only roles that actually modify a count type generate variables.

#### N-Level Chain Structure
```typescript
// For outsider count with Baron (role 20) and HypotheticalRole (role 15) both modifying:
base_outsider_count → after_role_15_outsider_count → after_role_20_outsider_count → final_outsider_count

// But if only Baron modifies outsiders:
base_outsider_count → after_role_20_outsider_count → final_outsider_count
```

#### Generic Variable Generation
```typescript
// GOOD: Generic scanning for modifiers
const modifyingRoles = [];
for (let roleIndex = 0; roleIndex < script.roleIds.length; roleIndex++) {
    const role = getRole(script.roleIds[roleIndex]);
    if (role && roleModifiesCountType(role, 'outsider')) {
        modifyingRoles.push({ roleIndex, roleId: script.roleIds[roleIndex], delta: getDelta(role, 'outsider') });
    }
}

// Generate chain: prevVar → currentVar for each modifier
let prevVar = 'base_outsider';
for (const { roleIndex, roleId, delta } of modifyingRoles) {
    const currentVar = `after_role_${roleIndex}_outsider`;
    // Generate: roleId_present=true AND prevVar_X=true => currentVar_(X+delta)=true
    // Generate: roleId_present=false AND prevVar_X=true => currentVar_X=true
    prevVar = currentVar;
}
// Final mapping: prevVar → final_outsider
```

#### Key Benefits of Final Approach

1. **Role-Agnostic Compiler**: No hardcoded role names or behaviors
2. **Scalable**: Handles any number of roles modifying the same count type
3. **Optimized**: Only generates variables for roles that actually have effects
4. **Ordered**: Respects role order in script for deterministic variable naming
5. **Generic**: Same logic works for townsfolk, outsider, minion, demon counts
6. **Extensible**: Works for both count modifications and physical bag substitutions

#### Physical Bag Chain Example
```typescript
// For Drunk (role 14) affecting physical bag:
final_townsfolk → after_substitution_role_14_townsfolk → physical_townsfolk
final_outsider → after_substitution_role_14_outsider → physical_outsider

// Constraints generated:
drunk_present=true AND final_townsfolk_3=true => after_substitution_role_14_townsfolk_4=true
drunk_present=false AND final_townsfolk_3=true => after_substitution_role_14_townsfolk_3=true
after_substitution_role_14_townsfolk_4=true => physical_townsfolk_4=true
```

#### Solving the "Missing Previous Variable" Problem
**Challenge**: When role i modifies a count, we can't assume role i-1 also modifies it.
**Solution**: Track the actual previous modifier in the chain:
```typescript
let prevVar = `base_${countType}`;
for (const { roleIndex, roleId, delta } of modifyingRoles) {
    const currentVar = `after_role_${roleIndex}_${countType}`;
    // prevVar might be base_X or after_role_J_X where J < roleIndex
    generateConstraints(prevVar, currentVar, roleId, delta);
    prevVar = currentVar; // Update for next iteration
}
```

This approach should elegantly handle complex multi-role interactions once we resolve the underlying SAT solver constraint parsing issues.

### Example Generated Constraints
```
// Base setup rules
player_count_7=true => base_townsfolk_5=true
player_count_7=true => base_outsider_0=true

// Role modification chains  
baron_present=true AND base_outsider_0=true => after_role_20_outsider_2=true
baron_present=false AND base_outsider_0=true => after_role_20_outsider_0=true

// Physical bag substitutions
drunk_present=true AND final_townsfolk_3=true => physical_townsfolk_4=true
drunk_present=false AND final_townsfolk_3=true => physical_townsfolk_3=true

// Specific game observations
baron_present=true
player_count_7=true
final_outsider_2=true
physical_outsider_2=true
```

## Critical Discovery: SAT Solver Limitations

**The current SAT solver only supports simple `variable=value` constraints.**

### Test Results
```typescript
// ✅ WORKS: Simple assignments
solver.solve(['x=true', 'y=false']) → SAT

// ❌ IGNORED: Simple implications  
solver.solve(['x=true => y=true', 'x=true', 'y=false']) → SAT (should be UNSAT)

// ❌ UNCLEAR: Complex expressions
solver.solve(['x=true AND y=true => z=true', 'x=true', 'y=true', 'z=false']) → UNSAT
```

### Parser Analysis
```typescript
// From src/solver.ts:parseConstraint()
if (constraint.includes('=')) {
    const [variable, value] = constraint.split('=').map(s => s.trim());
    return { variable, value: value === 'true' };
}
```

**Conclusion**: All logical operators (`AND`, `=>`, `OR`) are being completely ignored. The solver only processes the basic variable assignments.

## Implications

1. **Our DSL compilation is non-functional** - All script rules are ignored
2. **Only bag observations are processed** - Simple variable=true/false assertions
3. **False positive validation** - Tests appear to work due to accidental contradictions
4. **Architecture is sound** - The compilation framework is well-designed, just needs different backend

## Next Steps - Decision Points

### Option 1: Extend Current SAT Solver
- **Pros**: Maintains current architecture, educational value
- **Cons**: Significant parsing complexity, potential performance issues with CNF conversion
- **Effort**: High - need to implement full logical expression parser and CNF conversion

### Option 2: Switch to SMT Solver
- **Pros**: Native support for logical operations, arithmetic constraints
- **Cons**: Additional dependency complexity, may face browser compatibility issues again
- **Effort**: Medium - integration work, but solvers handle the logic

### Option 3: Switch to Constraint Programming
- **Pros**: Natural fit for BOTC rule modeling, handles arithmetic and logic well
- **Cons**: Different paradigm, may require architectural changes
- **Effort**: Medium-High - new approach but more intuitive for this domain

### Option 4: Direct Computation Approach
- **Pros**: Simple, fast, no dependency issues
- **Cons**: Less flexible, harder to extend to complex reasoning tasks
- **Effort**: Low - essentially what we were doing initially

## Technical Insights Gained

### Successful Patterns
- **N-level modification chains** handle multiple role interactions elegantly
- **Generic DSL compilation** keeps role-specific logic out of compiler
- **Two-stage approach** cleanly separates reusable rules from specific instances

### Architecture Strengths
- Clean separation between script rules and game observations
- Systematic variable naming prevents conflicts
- Optimization of skipping non-modifying roles reduces constraint count

### Constraint Blowup Analysis
- ~400 constraints for 7-player Trouble Brewing game
- Most constraints are simple implications, not complex formulas
- With proper SAT support, this seems manageable for scripts of this size

## Files Created
- `src/script-compiler.ts` - DSL to SAT compilation
- `src/bag-compiler.ts` - Two-stage validation framework  
- `src/roles.ts` - Role and constraint type definitions
- `src/trouble-brewing-roles.ts` - Complete Trouble Brewing implementation
- `src/scripts.ts` - Script representation system

## Recommendation

**Investigate Option 2 (SMT Solver)** as next step. The logical structure we've built maps well to SMT, and modern SMT solvers like Z3 have JavaScript bindings. If browser compatibility remains an issue, consider Option 4 for validation tasks and reserve SMT for more complex reasoning.