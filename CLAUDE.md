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

## Build Commands
- `npm run build` - Compile TypeScript
- `npm run dev` - Run with ts-node for development

## SAT Solver Integration Use Cases
1. **Legality Checking**: Verify if a logical expression/game state is valid
2. **Counter-example Generation**: Generate examples that disprove assertions
3. **Inference from Partial Observations**: Given fragmented player observations of state transitions, enumerate all potential legal grimoires consistent with those observations

## Browser Compatibility Requirements (z3-solver)
**Important**: z3-solver requires SharedArrayBuffer support for browser deployment, which has specific requirements:

### Required HTTP Headers for Browser Deployment:
- `Cross-Origin-Embedder-Policy: require-corp`
- `Cross-Origin-Opener-Policy: same-origin`

### Additional Browser Requirements:
- HTTPS required (SharedArrayBuffer disabled over HTTP)
- Cross-origin isolation enabled
- Modern browser with SharedArrayBuffer support
- z3-built.js must be included separately (not bundled with webpack/vite)

### Development Impact:
- Local development server must serve proper headers
- Deployment requires server configuration for headers
- May limit cross-origin resource loading
- Consider fallback to lighter SAT solver for basic browser compatibility

### Deployment Limitations:
**GitHub Pages**: Cannot set custom HTTP headers - z3-solver will NOT work on GitHub Pages
**Static Hosts**: Most static hosting (Netlify, Vercel) can set headers via config files
**Server Required**: Full control over HTTP headers requires server-side hosting

### Fallback Strategy:
Consider implementing dual solver approach:
- z3-solver for Node.js and controlled server environments
- Lighter pure-JS SAT solver (like SAT.js) for GitHub Pages/static hosting

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