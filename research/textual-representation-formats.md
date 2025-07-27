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

## Game Trace Representation

### Overview

To support temporal constraint validation and game analysis, we need textual representations for **game event sequences**. These complement grimoire representations by capturing the **history** that led to a grimoire state.

**Design Goals**:
1. **Dual format approach**: Compact one-liner (parsing/constraint validation) + rich multi-line (human analysis)
2. **Mechanical focus**: One-liner captures only grimoire-affecting events for SAT constraint derivation
3. **Rich context**: Multi-line includes social dynamics, player communications, reasoning
4. **Consistent syntax**: Parallels grimoire format conventions where possible

### Game Trace One-Liner Format

**Purpose**: Encode mechanical game events for temporal constraint validation. Only events that affect grimoire state or game rules are included.

#### Phase Structure

**Syntax**: `<PHASE> event1, event2, ... <NEXT_PHASE> event3, ...`

**Phase Labels**:
- `<SETUP>` - Initial game setup
- `<N1>` `<N2>` `<N3>` ... - Night phases (abilities, demon kills)
- `<D1>` `<D2>` `[D3]` ... - Day phases (discussion, free talk)  
- `<E1>` `<E2>` `[E3]` ... - Evening phases (nominations, voting, executions)

**Sequence**: `<SETUP> <N1> <D1> <E1> <N2> <D2> <E2> <N3> ...`

#### Event Syntax

**Actor Syntax**: 
- `PlayerName:RoleName` - Player acting as specific role (e.g., `Alice:poisoner`)
- `PlayerName` - Player acting (role inferred from context)
- `RoleName` - Role acting (player inferred from context) 
- `st` - Storyteller action

**Grimoire Mutation Events**:
```
Actor!Target(+token)           # Add reminder token
Actor!Target(-token)           # Remove reminder token  
Actor!Target1(-token),Target2(+token)  # Move token between targets
```

**Game Action Events**:
```
Player!nominates->Target:Role  # Player nominates target
Player!votes->Target           # Player votes on current nomination
st!executes->Player           # Storyteller resolves execution
Player!dies                   # Player death (any cause)
```

#### Reminder Token Names

**From Trouble Brewing roles** (using official token names with role prefixes):

**Information Tokens**:
- `ww:townsfolk`, `ww:wrong` (washerwoman learns)
- `lib:outsider`, `lib:wrong` (librarian learns)
- `inv:minion`, `inv:wrong` (investigator learns)
- `undertaker:died_today` (undertaker learns execution victim)

**Setup/Status Tokens**:
- `dr:is_the_drunk` (drunk player receives townsfolk token)
- `ft:red_herring` (fortune teller's false positive)
- `sw:is_the_demon` (scarlet woman becomes demon)

**Transient Effect Tokens**:
- `poi:poisoned` (poisoner's current target)
- `monk:safe` (monk's protection)
- `but:master` (butler's chosen master)
- `imp:dead` (imp's kill target)

**Ability Loss Tokens**:
- `virgin:no_ability` (virgin loses power after nomination)
- `slayer:no_ability` (slayer loses power after use)

#### Example One-Liner Traces

**Basic 7-player game**:
```
<SETUP> st!Alice(+dr:is_the_drunk), st!Eve(+ft:red_herring) <N1> Alice:poisoner!Bob(+poi:poisoned), st!Dave(+ww:townsfolk),Frank(+ww:wrong), Carol:butler!Grace(+but:master) <E1> Frank!nominates->Alice:virgin, st!Alice(+virgin:no_ability) <N2> Alice:poisoner!Bob(-poi:poisoned),Carol(+poi:poisoned), Dave:imp!Grace(+imp:dead), Grace!dies
```

**With execution sequence**:
```
<SETUP> st!Bob(+dr:is_the_drunk) <N1> Alice:poisoner!Carol(+poi:poisoned), st!Dave(+ww:townsfolk),Eve(+ww:wrong) <E1> Frank!nominates->Alice:virgin, Grace!votes->Alice, Bob!votes->Alice, Carol!votes->Alice, st!executes->Alice, Alice!dies <N2> st!demon_kill->Bob, Bob!dies
```

### Game Trace Multi-Line Format

**Purpose**: Human-readable format with rich context including social dynamics, player reasoning, and non-mechanical events.

#### Structure

**Phase headers** with indented events:
```
<SETUP>
  storyteller places drunk token on Alice
  storyteller places red herring token on Eve

<N1> 
  Alice (poisoner) adds poisoned token to Bob
  storyteller determines washerwoman learns Dave:townsfolk, Frank:wrong
  Carol (butler) chooses Grace as master

MSG (N1): Alice -> Bob (whisper): "I'm the washerwoman, you're safe"
MSG (N1): Carol -> ALL: "I need to vote with my master tomorrow"

<D1>
  Alice claims washerwoman (false - she's actually drunk)
  Frank claims investigator (lie - he's evil)
  
<E1>
  Frank nominates Alice (virgin) - stated reason: "Alice's info seems suspicious"
  Grace votes Alice, Bob votes Alice, Carol votes Alice
  storyteller executes Alice (3 votes, majority reached)  
  Alice dies, virgin ability triggered
```

#### Extended Context Elements

**Message Tracking**:
```
MSG (PHASE): Source -> Target: "quoted content"
MSG (PHASE): Source -> Target (whisper): "private content"
MSG (PHASE): Source -> ALL: "public statement"
```

**Reasoning/Notes**:
```
NOTE: Alice doesn't know she's drunk, shares false info confidently
STORYTELLER: Chose conservative washerwoman info to avoid confirming roles
STRATEGY: Frank targeting Alice to eliminate virgin threat
```

**Vote Dynamics**:
```
Frank nominates Carol (virgin) - reason: "Carol's voting patterns suspicious"
Alice votes Carol - influenced by Frank's argument
Bob abstains - worried about virgin trigger
Carol defends - claims washerwoman but info contradicts Alice
Grace votes Carol - trusts Frank as fellow evil
RESULT: Carol executed (2 votes), virgin ability triggers, Alice dies
```

### Parsing and Conversion

**One-liner → Temporal Context**: Parse mechanical events to derive constraint variables
```typescript
parseGameTrace(oneLineTrace: string): TemporalContextValues {
    // Extract events like "st!Alice(+dr:is_the_drunk)"
    // Derive facts like "washerwoman_was_sober_and_healthy_when_acting = false"
    // Return constraint variables for SAT validation
}
```

**Multi-line → Rich Analysis**: Parse full context for human analysis tools
```typescript
parseRichTrace(multiLineTrace: string): GameAnalysis {
    // Extract mechanical events, messages, reasoning, vote patterns
    // Build timeline with social and strategic context
    // Support post-game analysis and strategy learning
}
```

### Integration with Temporal Constraints

**Workflow**:
1. **Game occurs** → generates both trace formats
2. **One-liner parsed** → derives temporal context values
3. **Temporal constraints applied** → validates final grimoire consistency
4. **Multi-line used** → for human review, strategy analysis, rule disputes

**Constraint Derivation Examples**:
```
Trace: "st!Alice(+dr:is_the_drunk) ... st!Dave(+ww:townsfolk),Eve(+ww:wrong)"
Derived: washerwoman_was_sober_and_healthy_when_acting = false (Alice was drunk)

Trace: "Frank!nominates->Carol:virgin, st!Carol(+virgin:no_ability)"  
Derived: virgin_was_nominated = true, nominator_was_townsfolk = true
```

This creates a complete **game state validation pipeline**: Game Events → Trace → Temporal Context → SAT Constraints → Grimoire Validation.

## Implementation Status

### ✅ Completed Components

**Game Trace Parser** (`src/core/game-trace-parser.ts`):
- ✅ One-liner format parsing with phase structure (`<SETUP>`, `<N1>`, `<E1>`, etc.)
- ✅ Event syntax parsing: token manipulation, nominations, voting, executions, deaths
- ✅ Simplified token syntax support (`Target(+token)` implies storyteller action)
- ✅ Temporal context derivation from parsed events
- ✅ Sober/healthy status tracking for information gathering roles
- ✅ Event trigger detection (virgin nominations, etc.)
- ✅ Transient state tracking (poisoning, protection, etc.)
- ✅ Constraint variable generation for SAT validation

**Temporal Constraint System** (`src/core/temporal-constraint-compiler.ts`):
- ✅ Role temporal property analysis (abilityType, abilityTiming, abilityConstraints)
- ✅ Historical context variable generation
- ✅ Conditional token constraint compilation
- ✅ Game trace integration with SAT constraints
- ✅ Grimoire consistency validation against game history

**Role Extensions** (`src/data/trouble-brewing-roles.ts`):
- ✅ Temporal properties added to key Trouble Brewing roles
- ✅ Information gathering roles: washerwoman, librarian, investigator
- ✅ Event-triggered roles: virgin (nomination), slayer (ability use)
- ✅ Transient effect roles: poisoner (affects_transient_state)

**Integration Tests** (`src/tests/temporal-trace-integration.test.ts`):
- ✅ End-to-end game trace validation
- ✅ Sober/healthy constraint application
- ✅ Virgin nomination event detection
- ✅ Complex multi-phase game sequence handling
- ✅ Reminder token constraint integration

### 🔍 Implementation Insights

**Parser Design Decisions**:
- **Dual syntax support**: Both explicit (`st!Alice(+token)`) and simplified (`Alice(+token)`) formats
- **Phase-based structure**: Clear separation of game phases for temporal ordering
- **Event categorization**: Token manipulation, game actions (nominate/vote/execute), state changes
- **Error tolerance**: Failed parsing logged but doesn't halt processing

**Temporal Constraint Architecture**:
- **Separation of concerns**: Game history (external) vs constraint validation (SAT system)
- **Conditional constraints**: Token placement depends on sober/healthy status
- **Variable indirection compatibility**: Works with bias reduction techniques
- **Backward compatibility**: Extends existing reminder token system

**SAT Integration Strategy**:
- **Unit clauses for trace facts**: Force variables to match observed game history
- **Constraint bridging**: Temporal context values become SAT constraint inputs
- **Validation pipeline**: Game Events → Trace → Temporal Context → SAT → Grimoire Validation

### 📋 Remaining Underspecified Areas

- **Implementation algorithm** for ASCII layout generation
- **Bag representation** examples - mentioned but not fully specified
- **Column spacing rules** - minimum separation, calculation method
- **Box alignment** - how to ensure consistent right borders
- **ASCII art dead player representation** - needs to be consistent with singleline format
- **~~Game trace parser implementation~~** - ✅ **COMPLETED**
- **~~Temporal context derivation rules~~** - ✅ **COMPLETED**
- **Multi-line trace format extensions** - voting patterns, madness tracking, timing constraints
- **Trace validation** - ensure trace events are legal according to BOTC rules
- **Role assignment tracking** - map player names to roles for complete temporal context
- **Advanced temporal patterns** - chain reactions, ability interactions, timing conflicts