# Solution Space Exploration Research

## JSMiniSolvers API Analysis

### Core Methods Discovered
From the readable version of `minisolvers.js`, we found:

```javascript
// Base solver class methods:
new_var()                    // Creates new variable
add_clause(literals_array)   // Adds CNF clause  
solve()                     // Returns 1=SAT, 0=UNSAT
get_model()                 // Returns Int32Array of assignments
delete()                    // Cleanup
nvars()                     // Number of variables
nclauses()                  // Number of clauses
```

### Solution Randomization Approaches

#### Approach 1: Blocking Clauses
**Concept**: After finding a solution, add a "blocking clause" that prevents the same solution from being found again.

**Implementation**:
1. Solve to get model M
2. Add clause: `NOT(x1=v1 AND x2=v2 AND ... AND xn=vn)` 
3. Convert to CNF: `(NOT x1 OR v1) OR (NOT x2 OR v2) OR ...`
4. Solve again for different solution

**Pros**: Guaranteed to find different solutions
**Cons**: Each iteration adds constraints, may slow down solving

#### Approach 2: Randomization Parameters  
**Investigation needed**: Check if JSMiniSolvers exposes randomization settings
- Variable ordering randomization
- Phase selection randomization  
- Initial activity randomization

#### Approach 3: Weighted Preferences
**Concept**: Add "soft" constraints that bias toward/away from certain roles
**Implementation**: Use very large clauses that prefer certain variable assignments

## Experimental Plan

### Test 1: Basic Multiple Solutions
1. Create simple SAT problem with multiple solutions
2. Find first solution
3. Add blocking clause 
4. Verify we get different solution

### Test 2: BOTC Bag Generation Variety
1. Generate bag for same player count multiple times
2. Add blocking clauses based on role selection
3. Measure diversity of generated setups

### Test 3: Performance Analysis
1. Measure solve time vs. number of blocking clauses
2. Determine practical limit for solution enumeration

## Expected Outcomes

**Best case**: JSMiniSolvers supports efficient multiple solution generation
**Likely case**: Blocking clauses work but with performance degradation
**Worst case**: No practical way to get solution variety, need algorithmic approach