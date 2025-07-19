# Blood on the Clocktower DSL

A prototype domain-specific language for modeling Blood on the Clocktower rules and game states using formal logical constraints.

## Quick Start

First, compile the TypeScript code:
```bash
npm install
npm run build
```

### Human-Oriented Entry Points

Copy and paste these commands to see the system in action:

```bash
# Generate a random legal setup
node examples/generate-bag.js

# Complete game setup workflow (bag → players → rendering)
node examples/complete-game-setup.js

# Generate multiple diverse setups for variety
node examples/generate-multiple-bags.js

# Validate a legal setup (Baron with proper Outsiders)  
node examples/validate-legal-bag.js

# Validate an illegal setup (Baron without Outsiders)
node examples/validate-illegal-bag.js

# One-liner for quick testing
node examples/one-liner.js
```

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

### Development and Testing

**Run all tests:**
```bash
npm run dev
```

**Browser compatibility test:**
```bash
npm run build:browser
# Then open test-browser.html in a browser
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

## Documentation

### For Developers
- **[`DESIGN.md`](DESIGN.md)** - Complete architectural overview and technical implementation details
  - High-level explanation of script-to-SAT compilation approach
  - Core design patterns and technical innovations
  - Performance characteristics and optimization strategies
  - Comprehensive mapping of all source files and their purposes

### For Development Planning
- **[`TODO.md`](TODO.md)** - Current tasks, research directions, and strategic planning
  - Immediate implementation tasks and their priority
  - Research experiments and validation approaches
  - Long-term architectural evolution plans
  - Lessons learned and technical debt tracking

### For AI Assistant (Claude)
- **[`CLAUDE.md`](CLAUDE.md)** - Development workflow preferences and architectural guidance
  - Preferred development patterns and workflow approaches
  - Lessons learned from previous development sessions
  - Technical constraints and compatibility requirements
  - Bias analysis methodology and validation approaches