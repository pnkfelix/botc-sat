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
- Dead player with ghost vote: `*name:role*` or `*name:role(tokens)*`
- Dead player with used ghost vote: `*~~name~~:role*` or `*~~name~~:role(tokens)*`
- Tokens: `(token1,token2,...)` - comma-separated list in parentheses with role prefixes

**Naming Conventions**:
- Player names: Initial capital letter (e.g., `Alice`, `Bob`)
- Roles: All lowercase with underscores (e.g., `baron`, `scarlet_woman`)
- Reminder tokens: All lowercase with underscores and role prefixes (e.g., `drunk:is_the_drunk`, `washerwoman:townsfolk`)

### Context-Free Grammar

```
grimoire ::= '[' player_list ']'

player_list ::= player_entry
              | player_entry ' ' player_list
              | ε

player_entry ::= living_player | dead_player

living_player ::= name ':' role tokens?

dead_player ::= '*' dead_name ':' role tokens? '*'

dead_name ::= name | '~~' name '~~'

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
[Alice:baron(washerwoman:townsfolk,poisoner:poisoned) Bob:imp Charlie:butler(drunk:is_the_drunk)]
```

**With dead players (ghost votes available):**
```
[Alice:baron(poisoner:poisoned) *Bob:imp* Charlie:butler(drunk:is_the_drunk)]
```

**With used ghost votes:**
```
[Alice:baron *~~Bob~~:imp* Charlie:butler(drunk:is_the_drunk)]
```

**Mixed living, dead with ghost votes, and used ghost votes:**
```
[Alice:baron *Bob:imp* *~~Charlie~~:butler(drunk:is_the_drunk)* Dave:washerwoman *~~Eve~~:poisoner*]
```

**All dead with mixed ghost vote status:**
```
[*Alice:baron* *~~Bob~~:imp* *Charlie:butler* *~~Dave~~:washerwoman*]
```

**No reminder tokens:**
```
[Alice:baron Bob:imp *~~Charlie~~:butler*]
```

### Design Rationale

- **Asterisks for dead players**: Encompasses entire entry for clear visual distinction
- **Double tildes for used ghost votes**: `~~name~~` evokes Markdown strikethrough, semantically representing "struck out of the game"
- **Three-state voting system**: Living (can vote), dead with ghost vote (`*name*`), dead without ghost vote (`*~~name~~*`)
- **Parentheses for tokens**: Consistent with ASCII art format convention
- **Role prefixes on tokens**: Tokens include role source (e.g., `washerwoman:townsfolk`) since players often have tokens from other roles
- **Square brackets**: Enclose entire player list for clear boundaries
- **Colon separation**: Clear delimiter between player name and role
- **Comma-separated tokens**: Natural list format within parentheses
- **Round-trip compatibility**: Format contains exactly the information needed to reconstruct grimoire state

## Layout Pattern Analysis for Left and Right Sides

### Visual Quality Research Findings

**Research Methodology**: Generated 9 different layout configurations across 8, 10, and 12 player scenarios to analyze visual patterns for left and right side player placement.

### Key Layout Insights

**Left Side Characteristics**:
- **Interior space usage**: Left side players naturally create interior space for token extension lines
- **Readability**: Text flows right-to-left, creating clear visual hierarchy 
- **Compactness**: Left-heavy layouts tend to be wider but more compact in area
- **Best configurations**: 2-4 players on left side provide good balance without overcrowding

**Right Side Characteristics**:
- **Exterior space usage**: Right side players extend tokens toward exterior (unlimited space)
- **Visual flow**: Natural left-to-right reading pattern aligns with token placement
- **Height efficiency**: Right-heavy layouts tend to be taller but narrower
- **Optimal range**: 3-5 players on right side create visually pleasing vertical towers

### Recommended Layout Patterns

**Balanced Layouts** (equal left/right usage):
```
8-player: [top=2, right=2, bottom=2, left=2] → 73×15 (area=1095)
10-player: [top=3, right=2, bottom=3, left=2] → 80×15 (area=1200)  
12-player: [top=3, right=3, bottom=3, left=3] → 93×18 (area=1674)
```

**Compact Layouts** (optimized for area):
```
8-player: [top=2, right=4, bottom=2, left=0] → 57×19 (area=1083) - Right Heavy
12-player: [top=5, right=1, bottom=5, left=1] → 109×12 (area=1308) - Horizontal
```

**Vertical Tower Layouts** (tall, narrow profiles):
```
8-player: [top=2, right=0, bottom=2, left=4] → 57×21 - Left Heavy
10-player: [top=3, right=5, bottom=2, left=0] → 74×22 - Right Heavy
12-player: [top=2, right=4, bottom=2, left=4] → 76×21 - Balanced Vertical
```

### Layout Quality Guidelines

1. **Left side works well with 2-4 players** - provides interior space without overcrowding
2. **Right side optimal with 3-5 players** - creates clean vertical alignment
3. **Balanced configurations** produce most visually pleasing results across player counts
4. **Avoid extreme concentrations** (>5 players on one side) - creates visual imbalance
5. **Horizontal spread layouts** work well for wide displays but may be too wide for constrained formats

### Token Rendering Implications

**Left Side Token Strategy**:
- Tokens extend inward toward grimoire center
- Requires interior space management to prevent overlap
- Text alignment: right-justified token labels for visual consistency

**Right Side Token Strategy**:
- Tokens extend outward to unlimited exterior space
- Simpler placement algorithm - no collision concerns
- Text alignment: left-justified token labels (natural flow)

## Underspecified Areas

- **Event representation** - not yet designed
- **Implementation algorithm** for ASCII layout generation
- **Bag representation** examples - mentioned but not fully specified
- **Column spacing rules** - minimum separation, calculation method
- **Box alignment** - how to ensure consistent right borders
- **ASCII art dead player representation** - needs to be consistent with singleline format