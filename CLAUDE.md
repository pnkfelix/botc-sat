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
  - Core DSL implementation
/dist/
  - Compiled TypeScript output
```

## Development Workflow Preferences
- Use TodoWrite tool to plan and track implementation tasks
- Set up proper TypeScript project structure first
- Break down complex features into manageable, trackable tasks
- Prefer editing existing files over creating new ones unless necessary
- Never create documentation files unless explicitly requested

### Git Workflow Requirements
- **Always commit working code changes** before starting unrelated tasks
- After implementing and verifying functionality with passing tests, commit the work
- Commits don't need to be immediate, but must happen before switching to different tasks
- Use descriptive commit messages that explain the "why" not just the "what"
- Include the standard footer for Claude-generated commits

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

## Build Commands
- `npm run build` - Compile TypeScript for Node.js
- `npm run build:browser` - Compile TypeScript to UMD for browser
- `npm run dev` - Run with ts-node for development

## Testing
- **Node.js**: `npm run dev` runs TypeScript directly
- **Browser**: Open `test-browser.html` in browser to run same code
- **Unified Testing**: Same TypeScript code (`src/advanced-tests.ts`) runs in both environments

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