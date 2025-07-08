# Textual Representation Formats for BOTC Game State

## Overview

Design work for textual representations focusing on:
1. **Single-line text** (for logs, data formats, Gentzen rules)
2. **ASCII art grids** (for development and debugging)
3. **HTML fragments** (future work)

Current focus: single-line and ASCII art formats.

## Design Constraints

### Single-Line Format
- Use punctuation for structure
- `[a b c]` for sequences (ordered)
- `{a b c}` for bags/multisets (unordered)
- Record types (key:value) - syntax TBD when needed

### ASCII Art Format
- Easy to parse programmatically
- Human readable
- Strict layout rules for parsing
- Each player gets unique column number
- All text for a player (name, role, reminder tokens) starts at same column

## Grimoire ASCII Art - 12 Player Test Case

**Final agreed layout with extension lines:**

```
┌─ Grimoire (12 players) ────────────────────────────────────────────────────────┐
│                                                                                │
│   (librarian:outsider)                                                         │
│   ()                                                                           │
│   ()        (is_the_drunk)                                                     │
│   ()        ()                                                                 │
│   ()        ()           (librarian:wrong)                                     │
│   ()        ()           ()                       (washerwoman:townsfolk)      │
│   (4)       (14)         (27)      (37)           (52)                         │
│   Alice     Bob          Charlie   David          Eve                          │
│   butler    washerwoman  baron     scarlet_woman  poisoner                     │
│                                                                                │
│ Ian                                                 Frank                      │
│ mayor (2)                                           virgin (54)                │
│       (poisoned)                                           (virgin:no_ability) │
│                                                                                │
│    Leo       Mark      Kate      Hannah     Grace                              │
│    chef      monk      slayer    librarian  imp                                │
│    (5)       (15)      (25)      (35)       (46)                               │
│              ()        ()                                                      │
│              ()        (slayer:no_ability)                                     │
│              ()                                                                │
│              (washerwoman:wrong)                                               │
└────────────────────────────────────────────────────────────────────────────────┘
```

**Key insights from this example:**
- Each player has unique column: Ian(2), Alice(4), Leo(5), Bob(14), Mark(15), Kate(25), Charlie(27), Hannah(35), David(37), Grace(46), Eve(52), Frank(54)
- Balanced distribution around rectangle sides
- **Extension direction strategy**:
  - **Top, right, bottom sides**: Extensions go to exterior (unlimited space)
  - **Left side**: Extensions go to interior (center of circle)
  - If left side tokens conflict, widen box to create more interior space
- Parentheses notation for position markers and tokens
- Game mechanics example: Librarian shown outsider token, told it's either Alice (`librarian:outsider`) or Charlie (`librarian:wrong`)

## Underspecified Areas

- **Single-line format syntax** for bags and grimoires - specific delimiters TBD
- **Event representation** - not yet designed
- **Implementation algorithm** for ASCII layout generation
- **Bag representation** examples - mentioned but not fully specified
- **Column spacing rules** - minimum separation, calculation method
- **Box alignment** - how to ensure consistent right borders