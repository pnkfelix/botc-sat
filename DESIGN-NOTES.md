# ASCII Grimoire Layout Optimization - Design Notes

## Alternative Objectives for Auto Mode

**Current Implementation**: Optimizes for "visual squareness" (aspect ratio closest to 1.0 accounting for 6:10 character dimensions)

**Potential Issues with Squareness-Only Optimization**:
- May produce layouts with excessive blank space
- "Most square" output might still not look right
- Information density may be more important than geometric squareness
- Readability and usability could be sacrificed for mathematical optimization

**Alternative/Additional Objectives to Consider**:

1. **Information Density**
   - Minimize blank space / maximize content utilization
   - Prefer compact layouts that efficiently use screen real estate

2. **Readability Optimization** 
   - Ensure adequate spacing between text elements
   - Avoid cramped or overlapping content
   - Prioritize scannable, easy-to-read layouts

3. **Natural Table Feel**
   - Layouts that feel like sitting around a game table
   - Prefer traditional "around the perimeter" arrangements

4. **Content-Aware Layout**
   - Adapt to role name lengths, token counts
   - Account for actual text width variations
   - Dynamic spacing based on content density

5. **Practical Constraints**
   - Terminal window width optimization
   - Screen height limitations
   - Accessibility considerations

**Multi-Objective Approach**:
Could combine multiple scoring factors:
```
score = w1 * squareness + w2 * density + w3 * readability + w4 * content_fit
```

**Next Steps**:
- Debug text overlap bug first
- Evaluate auto mode outputs across player counts for "goodness"
- Consider implementing multi-factor scoring if squareness alone proves insufficient

---

*Note: Added 2025-07-19 during auto mode implementation review*

---

# Reminder Token Constraint Semantics - Design Notes

## Critical Implementation Details for Future Development

**IMPORTANT**: The following information is essential for implementing DSL constraints for reminder tokens. These semantics were clarified during development and must be preserved.

### Roles with NO Reminder Tokens (By Design)
These roles intentionally have no reminder tokens and should never have any added:
- **chef** - No tokens (ability is immediate at game start)
- **empath** - No tokens (information is nightly, not persistent)  
- **ravenkeeper** - No tokens (ability triggers only on death)
- **mayor** - No tokens (passive abilities)
- **recluse** - No tokens (passive misregistration)
- **saint** - No tokens (passive execution consequence)
- **spy** - No tokens (passive abilities)

### Special Token Placement Rules

#### **drunk:is_the_drunk** Token - CRITICAL CONSTRAINT
- **NEVER placed on the drunk player itself**
- **ONLY placed on TOWNSFOLK players**
- **Represents substitution mechanic**: The townsfolk with this token is actually the drunk but believes they are their displayed role
- **Example**: Librarian with `drunk:is_the_drunk` token = player is actually drunk but thinks they're librarian
- **DSL Constraint**: `only_on_role_type` with target `townsfolk`

#### **fortune_teller:red_herring** Token  
- **ONLY placed on GOOD players** (townsfolk or outsider)
- **NEVER placed on evil players** (minion or demon)
- **Represents**: The good player who registers as demon to fortune teller
- **DSL Constraint**: `only_on_role_type` with target `good` (needs new type)

#### **imp:dead** Token
- **CAN be placed on ANY player** 
- **Represents**: Who died last night (information for storyteller/players)
- **DSL Constraint**: `information_token` (no placement restrictions)

### Information Tokens (Can Be Placed Anywhere)
These tokens represent information and can be placed on any player:
- **washerwoman**: `townsfolk`, `wrong` 
- **librarian**: `outsider`, `wrong`
- **investigator**: `minion`, `wrong`
- **undertaker**: `died_today`
- **monk**: `safe`
- **butler**: `master`
- **poisoner**: `poisoned`
- **imp**: `dead`

### Role-Specific Placement Tokens
These tokens can ONLY be placed on specific roles:
- **virgin**: `no_ability` (only on virgin)
- **slayer**: `no_ability` (only on slayer)
- **scarlet_woman**: `is_the_demon` (only on scarlet woman, when she becomes demon)

### DSL Constraint Types Needed
1. **`only_on_role_type`** - New constraint type needed for drunk (townsfolk only) and fortune teller (good only)
2. **`information_token`** - Already implemented for tokens that can go anywhere
3. **`only_on_role`** - Already implemented for role-specific tokens
4. **`requires_role_present`** - Already implemented 
5. **`role_requires_token`** - Already implemented

### Implementation Priority
**High Priority** (existing tokens without DSL constraints):
- librarian, investigator, fortune_teller, undertaker, monk, drunk, butler, poisoner, scarlet_woman, imp

**Future Consideration**: 
- New constraint type `only_on_role_type` with `good`/`evil`/`townsfolk`/`outsider`/`minion`/`demon` options

---

*Note: Added 2025-07-26 during reminder token compiler implementation*