# Blood on the Clocktower DSL Project

## Project Overview
This project is a prototype for domain-specific logical languages, specifically designed to model Blood on the Clocktower (BOTC). The goal is to create a comprehensive DSL that can:

1. Describe the universe of tokens and their effects on game setup and gameplay
2. Define scripts (collections of roles/tokens)
3. Define legal initial bags given a particular script
4. Describe legal initial grimoires given a bag
5. Model legal state transitions between grimoires

## Technology Stack
- **Language**: TypeScript (chosen for web compatibility and strong typing)
- **Target**: Web application integration
- **Build**: Standard TypeScript compilation with ts-node for development
- **SAT Solver**: Integration for constraint satisfaction and logical reasoning

## Project Structure
```
/src/
├── core/           # Core constraint system (solver, compiler, roles)
├── data/           # Game data definitions (Trouble Brewing roles)
├── analysis/       # Research and analysis tools  
├── rendering/      # ASCII grimoire visualization system
├── tests/          # Test suites (comprehensive coverage)
├── experiments/    # One-off experimental code
└── index.ts        # Main library entry point
/research/          # Analysis findings and documentation
/vendor/            # Third-party dependencies (JSMiniSolvers)
/dist/              # Compiled TypeScript output
```

## Development Workflow Preferences
- Use TodoWrite tool to plan and track implementation tasks
- Set up proper TypeScript project structure first
- Break down complex features into manageable, trackable tasks
- Prefer editing existing files over creating new ones unless necessary
- Never create documentation files unless explicitly requested

### 🔍 MANDATORY: Code Navigation with cclsp LSP Tools
**ALWAYS USE THESE TOOLS FIRST** when investigating code structure, bugs, or implementing features:

- **`mcp__cclsp__find_definition`** - Locate function/class definitions before editing
- **`mcp__cclsp__find_references`** - Find all uses of a symbol before modifying
- **`mcp__cclsp__rename_symbol`** - Safe refactoring instead of manual search/replace
- **`mcp__cclsp__get_diagnostics`** - Check TypeScript errors in specific files

**When to use cclsp tools**:
- ✅ BEFORE editing any function or class
- ✅ When investigating bugs (find all references to understand impact)
- ✅ When understanding code flow (trace function calls)
- ✅ When refactoring (find all usage sites)
- ✅ When exploring unfamiliar code areas

**Default pattern**:
1. `mcp__cclsp__find_definition` to locate the code
2. `mcp__cclsp__find_references` to understand usage
3. Read relevant files based on LSP results
4. Make informed changes

**Do NOT default to basic file reading and grep** - use the sophisticated LSP tools available!

### Git Workflow Requirements
- **Always commit working code changes** before starting unrelated tasks
- After implementing and verifying functionality with passing tests, commit the work
- Commits don't need to be immediate, but must happen before switching to different tasks
- Use descriptive commit messages that explain the "why" not just the "what"
- Include the standard footer for Claude-generated commits

### Branch Strategy Preferences
- **Feature branches preferred** over `it.skip()` for incomplete functionality
- Use incremental commits on feature branches to preserve progress
- Keep main branch clean with passing tests
- Merge back to main once features are complete and tested

## Lessons Learned About Preferred Workflow
Based on development sessions, these patterns lead to better outcomes:

### Avoid Mocking Critical Dependencies
- **Don't mock SAT solvers or other core functionality** - leads to interface divergence
- **Test with real implementations** - prevents false confidence in compatibility
- **Unified interface across environments** - Node.js and browser should use same underlying solver

### Licensing and Dependency Management
- **Check licenses before adopting libraries** - GPL/AGPL can be too restrictive
- **Prefer MIT/BSD/Apache** - for maximum flexibility in prototype and production use
- **Vendor third-party code properly** - track sources, versions, and licenses in vendor/README.md
- **Don't assume npm availability** - be prepared to vendor when packages aren't on npm

### Browser Compatibility Approach
- **Avoid complex deployment requirements** - SharedArrayBuffer, special headers limit deployment options
- **Test browser compatibility early** - don't build on assumptions about what "should work"
- **Prioritize GitHub Pages compatibility** - static hosting is simpler than server configuration
- **UMD patterns work well** - Universal Module Definition libraries work in both Node.js and browser

### Code Quality and Validation
- **Address TypeScript warnings immediately** - unused variables indicate incomplete implementation
- **Test the same scenarios in both environments** - ensures true compatibility
- **Use setTimeout as antipattern indicator** - proper event handling is preferred
- **Verify actual functionality** - browser tests should show real results, not placeholder messages

### Testing and Validation Workflow
- **Test assumptions explicitly** - don't assume existing code works as described
- **Write tests that actually test the claimed functionality** - avoid misleading test descriptions
- **Isolate and verify component behavior** - test individual pieces before building on them
- **Use branches for experimental work** - keep main branch stable for foundational features
- **Document findings in research/ directory** - capture insights and decision rationale for future reference

### Problem Investigation Approach
- **Question initial hypotheses** - if something seems wrong, investigate rather than assume
- **Create minimal test cases** - isolate the specific behavior being tested
- **Verify actual vs. expected behavior** - don't rely on high-level descriptions
- **Capture both successful patterns and false paths** - document what didn't work and why

### File Reading Strategy
- **For large files near size limit** - read first half then second half instead of using offset/limit
- **Files within 2x of 256KB limit** - split reading approach is more efficient than small chunks

### Long-Running Command Output Strategy
- **For long-running commands** - Always pipe output to a file so results can be reviewed repeatedly without re-execution
- **For commands with long output** - Use `>` redirection, NOT `tee`, to avoid consuming token budget
- **Good pattern**: `npm run analysis:constraint-matrix > analysis-results.log 2>&1`
- **Avoid**: `npm run analysis:constraint-matrix 2>&1 | tee analysis-results.log` (wastes tokens)
- **Review strategy**: Use `tail`, `head`, `grep` to examine specific sections of large output files
- **Rationale**: Token budget is limited; don't spend it on command output that's saved to files

### Dealing with Minified/Unreadable Code
- **Problem**: Minified vendor code (like minisolvers.js) exceeds size limits and is unreadable
- **Solution**: Use `npx js-beautify` to create readable versions for analysis
- **Pattern**: Create `vendor/filename-readable.js` alongside original minified files
- **Benefits**: Enables Claude Code tool analysis of vendored dependencies
- **Example**: `npx js-beautify vendor/minisolvers.js > vendor/minisolvers-readable.js`
- **Keep both versions**: Original for production, readable for development analysis

### SAT Solver Integration Learnings
- **Incremental solving works** - JSMiniSolvers allows adding clauses after solve() for blocking patterns
- **VSIDS bias is real** - Variable State Independent Decaying Sum creates systematic bias toward lower-numbered variables
- **Variable indirection is the solution** - Create slot variables that inherit bias, then randomly map to actual roles
- **Blocking clauses enable variety** - Can generate multiple diverse solutions by excluding previous ones
- **Performance is acceptable** - ~50K clauses compile reasonably fast, incremental solving is efficient

### Solution Variety Generation Patterns
- **Bias analysis essential** - Always test for systematic patterns in generated solutions
- **Web search for domain expertise** - Research SAT solver heuristics revealed root cause of bias
- **Elegant solutions exist** - Variable indirection avoids expensive recompilation while solving bias
- **Incremental development** - Start with simple blocking, identify bias, design targeted solution

### Bias Measurement and Validation Approach
- **Coefficient of Variation (CV) is the key metric** - CV = (stdDev / mean) × 100%, lower is better
- **Multiple approaches needed** - No single bias reduction technique is sufficient:
  - Permutation-only approach: Improves variety (47.3% → 40.4% CV) but misses rare roles
  - Constraint-only approach: Forces exploration of edge cases but may introduce other biases  
  - **Combined approach is optimal**: Variable indirection + systematic constraints achieves lowest bias (35.0% CV)
- **Question mathematical vs algorithmic bias** - High CV might reflect game rules, not just algorithm bias
- **Validate with ground truth experiments** - Use uniform sampling of constrained subspaces to establish baselines
- **Document all bias analysis results** - Track CV improvements across different methodologies in research/ files

### Architecture Documentation Strategy  
- **DESIGN.md must comprehensively catalog all source files** - Future Claude invocations need complete file purpose mapping
- **Distinguish algorithmic choices from mathematical constraints** - Be explicit about implementation convenience vs semantic requirements
- **Research findings belong in research/ directory** - Capture analysis results, failed approaches, and insights for future reference
- **Update documentation immediately after major findings** - Don't let insights get lost in conversation history

### Test-Driven Development Best Practices
- **Implementation code belongs in source files, not test files** - Extract feature code from test files once TDD cycle completes
- **Focus tests on realistic domain scenarios** - Avoid edge cases that violate fundamental domain constraints
- **Example**: BOTC minimum 5 players - don't test 1-4 player scenarios (academic exercises with no practical value)
- **Domain-driven edge case evaluation** - Question whether edge cases represent real-world usage vs theoretical completeness

### ASCII Grimoire Rendering System Development Insights
Based on the successful implementation of the ASCII grimoire visualization:

#### Spacing Algorithm Design
- **Hybrid dense/justified approach works well** - Keep naturally longer sides dense, justify shorter sides to match
- **Role abbreviations provide significant compactness** - 31% width reduction with abbreviations (ww, lib, inv, poi, ft, etc.)
- **Fix layout calculations to use abbreviated widths** - Don't calculate spacing with full tokens then render abbreviated
- **Character aspect ratio matters for auto mode** - 6:10 point ratio (width:height) for visual squareness scoring

#### Four-Sided Layout Implementation
- **Coordinate separation is critical** - Ensure proper spacing between layout quadrants to prevent text overlap
- **Auto mode via exhaustive evaluation** - Enumerate all possible turn configurations and score for "squareness"
- **Visual squareness scoring** - Use actual rendered dimensions with character aspect ratio correction
- **Bottom-to-top ordering for left side** - Maintains clockwise player flow around the table

#### Text Overlap Prevention
- **Test with realistic player/role combinations** - Use actual BOTC role names, not placeholder data
- **Coordinate collision detection** - Ensure left players start after bottom players finish (bottomRow + 4)
- **Create standalone bug reproduction tests** - Isolate specific scenarios that trigger overlap issues
- **Verify role name integrity** - Check that role names don't merge incorrectly in rendered output

#### Token Visualization Patterns
- **Bubble column format** - Vertical token stacking with visual connections to player names
- **Right-to-left token placement** - Fill token matrix systematically for consistent visual appearance
- **Placeholder system** - Use () for visual connections even when no tokens present
- **Abbreviation toggle support** - Maintain backward compatibility with full token names

#### Dead Player Rendering and Format Consistency
- **Maintain format consistency across rendering systems** - Single-line and ASCII formats must use identical visual conventions
- **PlayerPosition interface completeness** - Ensure all player properties (alive, ghost, position) are preserved through rendering pipeline
- **Width calculations include formatting** - Account for additional characters (*Harold*, *~~Harold~~*) in layout spacing algorithms
- **Visual indicator patterns established**:
  - Living players: `Harold` / `imp` (no formatting)
  - Dead with ghost vote: `*Harold*` / `*imp*` (asterisk formatting)
  - Dead without ghost vote: `*~~Harold~~*` / `*~~imp~~*` (asterisk + strikethrough)
- **Test expectations must reflect actual output** - Update ASCII art test cases when visual formatting changes
- **Helper function patterns** - Use `formatPlayerDisplayText()` and `getPlayerDisplayWidth()` consistently across all rendering locations

### TypeScript Code Navigation Tools (cclsp MCP)
This project has **Language Server Protocol (LSP) tools** available via the cclsp MCP server that provide superior TypeScript code navigation:

#### When to Use LSP Tools vs Traditional Search:
- **Prefer LSP tools for TypeScript symbol navigation**:
  - `mcp__cclsp__find_definition` - Find where classes, functions, variables are defined
  - `mcp__cclsp__find_references` - Find all usages of a symbol across the codebase  
  - `mcp__cclsp__rename_symbol` - Rename symbols with type-aware refactoring
  - `mcp__cclsp__get_diagnostics` - Get TypeScript compiler errors/warnings

- **Use traditional Grep/Glob for**:
  - Text content searches within files
  - Pattern matching across file types
  - When searching for strings that aren't TypeScript symbols

#### LSP Tool Benefits for BOTC DSL:
- **Cross-file symbol tracking** - See how core classes flow through constraint system
- **Method usage analysis** - Track SAT solver patterns across compilers and tests  
- **Type-aware navigation** - Understands TypeScript semantics, not just text matching
- **Zero false positives** - Only finds actual symbol references, not string matches

#### Example Usage Patterns:
```typescript
// Find where BOTCValidator class is defined
mcp__cclsp__find_definition(file_path: "src/index.ts", symbol_name: "BOTCValidator", symbol_kind: "class")

// Find all references to troubleBrewing script across codebase
mcp__cclsp__find_references(file_path: "src/core/scripts.ts", symbol_name: "troubleBrewing")

// Check for TypeScript compilation errors
mcp__cclsp__get_diagnostics(file_path: "src/core/solver.ts")
```

**Integration verified**: All LSP tools tested and working with this TypeScript project structure.

**Setup note**: The cclsp MCP server must be installed separately by each developer who wants these enhanced navigation capabilities. See https://github.com/anthropics/cclsp for installation instructions. The tools are optional but recommended for TypeScript development on this project.
### Documentation Ecosystem
This project maintains multiple documentation files for different audiences:
- **README.md**: Public-facing project overview and navigation hub for humans
- **DESIGN.md**: Complete architectural documentation for developers and future Claude invocations
- **TODO.md**: Current tasks, priorities, and strategic development directions  
- **CLAUDE.md** (this file): AI assistant guidance and development workflow preferences
- **research/**: Analysis findings, experimental results, and research documentation

**For efficient project understanding**: Always read DESIGN.md first for architectural context, then TODO.md for current priorities

### TODO.md Structure and Maintenance
**CRITICAL**: Maintain strict priority ordering in TODO.md to ensure focus on most important work.

**Structure Rules**:
- **High-priority sections come FIRST** - unfixed critical issues must appear before completed items
- **Completed items belong at the END** - move to "Recently Completed" section at bottom of document
- **Never mark items as "✅ completed" within high-priority sections** - remove them entirely and relocate
- **Update immediately after completion** - don't let completed items linger in active priority lists

**Rationale**: High-priority lists should only contain actionable items that need immediate attention. Completed items serve as reference but should not compete for visual attention with active work.

## Build Commands
- `npm run build` - Compile TypeScript for Node.js
- `npm run build:browser` - Compile TypeScript to UMD for browser
- `npm run dev` - Run with ts-node for development

## Testing
- **Node.js**: `npm run dev` runs TypeScript directly (executes `src/tests/test-runner.ts`)
- **Browser**: Open `test-browser.html` in browser to run same code
- **Unified Testing**: Same TypeScript code runs in both environments
- **Analysis Scripts**: Use `npm run analysis:*` commands for research tools

## SAT Solver Integration Use Cases
1. **Legality Checking**: Verify if a logical expression/game state is valid
2. **Counter-example Generation**: Generate examples that disprove assertions
3. **Inference from Partial Observations**: Given fragmented player observations of state transitions, enumerate all potential legal grimoires consistent with those observations

## SAT Solver: JSMiniSolvers
**Current Solution**: JSMiniSolvers (vendored) provides industrial-strength SAT solving

### Key Benefits:
- **MIT License** - No restrictions on use or distribution
- **Universal Compatibility** - Works in both Node.js and browsers via UMD pattern
- **No Special Requirements** - No SharedArrayBuffer, special headers, or HTTPS needed
- **GitHub Pages Compatible** - Can deploy anywhere static hosting is available
- **Industrial Strength** - Based on proven MiniSat algorithm
- **Small Footprint** - Single 307KB JavaScript file

### Implementation:
- **Vendored Location**: `vendor/minisolvers.js`
- **Node.js**: Loaded via `require('../vendor/minisolvers.js')`
- **Browser**: Loaded via `<script src="./vendor/minisolvers.js"></script>`
- **Unified Interface**: Same `SATSolver` class works in both environments

## Implementation Plan (High Level)
1. Core token types and effects system
2. Script definition DSL and parser
3. SAT solver integration and constraint modeling
4. Bag generation logic
5. Grimoire state representation
6. State transition system with constraint validation
7. Partial observation inference system
8. Validation and testing

## Notes for Future Development
- This is a prototype/experimental project
- Focus on modeling the logical structure of BOTC rules
- Will eventually integrate into a web application

## Third-Party Dependencies

This project includes vendored third-party code with specific licensing requirements.

See [`vendor/README.md`](vendor/README.md) for complete details on:
- What libraries are vendored and their licenses
- Attribution and compliance information
- Why vendoring was chosen over npm dependencies