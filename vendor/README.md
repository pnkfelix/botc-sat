# Vendored Third-Party Code

This directory contains third-party libraries that are included directly in our codebase.

## JSMiniSolvers

**Source**: https://github.com/liffiton/JSMiniSolvers  
**Version**: master branch (downloaded 2025-07-01)  
**License**: MIT License (see JSMiniSolvers-LICENSE)  
**Description**: JavaScript API for MiniSat and MiniCard constraint solvers, compiled to JS with Emscripten  
**Files**:
- `minisolvers.js` - Main library file (307KB)
- `JSMiniSolvers-LICENSE` - MIT license text

**Usage**: SAT solving for Blood on the Clocktower rule validation and constraint satisfaction.

**Why vendored**: Not available as npm package, need browser compatibility, want to ensure stable version.