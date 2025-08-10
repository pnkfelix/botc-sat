# PLT Redex Interactive Development Guide

## How PLT Redex Developers Typically Work

Based on the PLT Redex community and documentation, here's how developers typically explore and test their language definitions:

## 1. DrRacket Workflow (Most Common)

### Setup
1. Open `botc-complete.rkt` in **DrRacket**
2. Click **Run** button to load all definitions
3. Use the **Interactions** pane (bottom) for experimentation

### Basic Exploration Commands

```racket
;; In the interactions pane (after clicking Run):

;; Test if terms match the grammar
> (redex-match BOTC role (term (role-def baron Minion (constraints))))
(list (match (list (bind 'role '(role-def baron Minion (constraints))))))

;; Apply metafunctions directly
> (term (base-distribution 7))
(dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1))

> (term (player-count (player-circle Alice Bob Charlie)))
3

;; Test role constraints
> (term (apply-role-constraint (base-distribution 7) 
                              (role-def baron Minion (constraints (add-outsiders 2)))))
(dist (Townsfolk 3) (Outsider 2) (Minion 1) (Demon 1))
```

## 2. Interactive Term Building

```racket
;; Build terms with variables
> (define my-players 8)
> (term (base-distribution ,my-players))
(dist (Townsfolk 5) (Outsider 1) (Minion 1) (Demon 1))

;; Create complex scenarios
> (define test-roles (term (role-dist (role-def baron Minion (constraints (add-outsiders 2)))
                                     (role-def washerwoman Townsfolk (constraints)))))
> (term (roles-to-bag ,test-roles))
(bag (role-def baron Minion (constraints (add-outsiders 2))) 
     (role-def washerwoman Townsfolk (constraints)))
```

## 3. Testing and Validation Patterns

```racket
;; Test bag validation
> (term (valid-bag-pair (role-dist (role-def drunk Outsider (constraints (token-sub Outsider Townsfolk))))
                       (bag (role-def drunk Townsfolk (constraints)))))
#t

;; Test constraint combinations
> (define base (term (base-distribution 7)))
> (define roles (term (role-dist (role-def baron Minion (constraints (add-outsiders 2)))
                                (role-def godfather Minion (constraints (add-outsiders 1))))))
> (term (apply-constraints ,base ,roles))
(dist (Townsfolk 2) (Outsider 3) (Minion 1) (Demon 1))
```

## 4. Debugging Workflow

### When Things Don't Work:
1. **Check grammar**: `(redex-match BOTC your-non-terminal your-term)`
2. **Test small pieces**: Break complex terms into simpler parts
3. **Inspect intermediate results**: Use `term` to see what expressions evaluate to
4. **Pattern match testing**: Use `redex-match` to verify pattern matching

### Example Debugging Session:
```racket
;; Something's wrong with this role - let's debug step by step
> (define bad-role (term (role-def invalid-name Townsfolk (constraints))))

;; Check if role-name is valid
> (redex-match BOTC role-name (term invalid-name))
#f  ; Aha! invalid-name isn't in our role-name grammar

;; Fix it
> (define good-role (term (role-def washerwoman Townsfolk (constraints))))
> (redex-match BOTC role good-role)  
(list (match (list (bind 'role '(role-def washerwoman Townsfolk (constraints))))))
```

## 5. Exploration Patterns from the Community

### Random Testing (Advanced)
```racket
;; PLT Redex has built-in random testing
> (redex-check BOTC role 
               (valid-bag-pair (role-dist r) (roles-to-bag (role-dist r))))
```

### Visualization (DrRacket Feature)
- Use `traces` to visualize reduction sequences
- Use `stepper` to step through reductions manually

## 6. Typical Development Session

1. **Start small**: Test individual metafunctions
2. **Build incrementally**: Add complexity step by step  
3. **Test frequently**: After each addition, test in the REPL
4. **Use variables**: Define reusable test cases
5. **Debug systematically**: When errors occur, isolate the problem

## 7. Quick Reference Commands

| Purpose | Command | Example |
|---------|---------|---------|
| Test grammar | `redex-match` | `(redex-match BOTC role my-term)` |
| Apply function | `term` | `(term (base-distribution 7))` |
| Build with vars | `term` + `,` | `(term (func ,my-var))` |
| Check validation | direct call | `(term (valid-bag-pair d b))` |

## Best Practices from the Community

1. **Keep DrRacket open** with your language loaded
2. **Define helper variables** for complex test cases
3. **Test edge cases** interactively before writing formal tests
4. **Use the grammar checker** (`redex-match`) liberally
5. **Build up complex examples** from simple pieces

This interactive approach is what makes PLT Redex powerful for language experimentation!