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

## Single-Line Grimoire Format

### Specification

**Format**: `[player_entry player_entry ...]`

**Player Entry Format**:
- Living player: `name:role` or `name:role(tokens)`
- Dead player: `*name:role*` or `*name:role(tokens)*`
- Tokens: `(token1,token2,...)` - comma-separated list in parentheses

**Naming Conventions**:
- Player names: Initial capital letter (e.g., `Alice`, `Bob`)
- Roles: All lowercase with underscores (e.g., `baron`, `scarlet_woman`)
- Reminder tokens: All lowercase with underscores (e.g., `is_the_drunk`, `no_ability`)

### Context-Free Grammar

```
grimoire ::= '[' player_list ']'

player_list ::= player_entry
              | player_entry ' ' player_list
              | ε

player_entry ::= living_player | dead_player

living_player ::= name ':' role tokens?

dead_player ::= '*' name ':' role tokens? '*'

tokens ::= '(' token_list ')'

token_list ::= token
             | token ',' token_list

token ::= identifier

name ::= identifier

role ::= identifier

identifier ::= letter (letter | digit | '_')*

letter ::= 'a' | 'b' | ... | 'z' | 'A' | 'B' | ... | 'Z'

digit ::= '0' | '1' | ... | '9'
```

### Examples

**Basic grimoire with living players:**
```
[Alice:baron Bob:imp Charlie:butler]
```

**With reminder tokens:**
```
[Alice:baron(washerwoman:wrong,poisoned) Bob:imp Charlie:butler(is_the_drunk)]
```

**With dead players:**
```
[Alice:baron(poisoned) *Bob:imp* Charlie:butler(is_the_drunk)]
```

**Mixed living and dead:**
```
[Alice:baron Bob:imp(4) *Charlie:butler(is_the_drunk)* Dave:washerwoman *Eve:poisoner*]
```

**All dead:**
```
[*Alice:baron* *Bob:imp* *Charlie:butler* *Dave:washerwoman*]
```

**No reminder tokens:**
```
[Alice:baron Bob:imp *Charlie:butler*]
```

### Design Rationale

- **Asterisks for dead players**: Encompasses entire entry for clear visual distinction
- **Parentheses for tokens**: Consistent with ASCII art format convention
- **Square brackets**: Enclose entire player list for clear boundaries
- **Colon separation**: Clear delimiter between player name and role
- **Comma-separated tokens**: Natural list format within parentheses
- **No day/phase tracking**: Grimoire represents player state, not game progression

## Underspecified Areas

- **Event representation** - not yet designed
- **Implementation algorithm** for ASCII layout generation
- **Bag representation** examples - mentioned but not fully specified
- **Column spacing rules** - minimum separation, calculation method
- **Box alignment** - how to ensure consistent right borders
- **ASCII art dead player representation** - needs to be consistent with singleline format