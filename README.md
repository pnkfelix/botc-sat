# Blood on the Clocktower DSL

A prototype domain-specific language for modeling Blood on the Clocktower rules and game states using formal logical constraints.

## Project Goals

This project aims to create a comprehensive DSL that can:

1. **Describe the universe of tokens** and their effects on game setup and gameplay
2. **Define scripts** (collections of roles/tokens) with their constraints and interactions
3. **Define legal initial bags** given a particular script
4. **Describe legal initial grimoires** given a bag configuration
5. **Model legal state transitions** between grimoires during gameplay
6. **Validate game states** and detect rule violations
7. **Generate counter-examples** when assertions about game states are incorrect
8. **Infer possible game states** from partial observations (e.g., fragmentary player knowledge)

## Design Decisions

### Technology Stack
- **TypeScript** - Chosen for web compatibility, strong typing, and broad ecosystem support
- **SAT Solving** - Uses boolean satisfiability for constraint validation and logical reasoning
- **Target Platform** - Web application integration with deployment flexibility

### SAT Solver: JSMiniSolvers
- **MIT Licensed** - No restrictions on use or distribution
- **Universal Compatibility** - Works in both Node.js and browsers
- **Industrial Strength** - Based on proven MiniSat algorithm
- **No Dependencies** - Vendored single-file solution
- **GitHub Pages Compatible** - No special server requirements

### Architecture Principles
- **Unified Interface** - Same SAT solving API works across all environments
- **Real Validation** - No mocking of critical constraint satisfaction logic
- **Deployment Flexibility** - Can run on static hosting or full server environments
- **Type Safety** - Leverages TypeScript for catching modeling errors at compile time

## Use Cases

### Primary: Game State Validation
Given a game state (who has what roles, who's alive/dead, etc.), verify if it's legally reachable according to BOTC rules.

### Advanced: Partial Information Inference
Given fragmentary observations from multiple players about state transitions, enumerate all potential legal grimoires consistent with those observations.

### Development: Rule Modeling
Express complex BOTC interactions as logical constraints, enabling systematic analysis of edge cases and rule interactions.

## Vendored Code

This project includes third-party code that is embedded directly in the codebase rather than installed via package managers.

See [`vendor/README.md`](vendor/README.md) for complete details on:
- What libraries are vendored
- Their sources, versions, and licenses
- Why they were vendored instead of using npm
- Attribution and compliance information

## Development

```bash
# Install dependencies
npm install

# Run development server (Node.js)
npm run dev

# Compile TypeScript for Node.js
npm run build

# Compile TypeScript for browser (UMD modules)
npm run build:browser

# Test browser compatibility
# Open test-browser.html in a browser
```

## Project Status

**Current Phase**: Solution Variety Generation
- ✅ SAT solver integration (JSMiniSolvers)
- ✅ Unified Node.js and browser compatibility
- ✅ BOTC-specific rule modeling (Baron, Drunk working)
- ✅ Bag legality validation and generation
- ✅ Solution variety generation (with bias mitigation in progress)
- 🚧 Variable indirection for unbiased role selection
- 🚧 Advanced preference-based generation

This is a prototype/experimental project focused on exploring the feasibility of formal logical approaches to complex game rule modeling.