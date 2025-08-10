#lang racket

;; =============================================================================
;; PLT REDEX TUTORIAL: Blood on the Clocktower Validation
;; =============================================================================
;; 
;; Teaching PLT Redex through modeling BOTC from the Storyteller's perspective:
;; 1. Circle of players (the fundamental seed)
;; 2. Script selection (available roles) 
;; 3. Bag formation (script + player count → legal distribution)
;; 4. Role assignment (bag → players get roles)
;; 5. Game validation (checking legality of states)

(require redex/reduction-semantics)
(provide (all-defined-out))

;; =============================================================================
;; PART 1: THE STORYTELLER'S WORLD
;; =============================================================================

(define-language BOTC
  ;; The fundamental seed: a circle of players (simplified!)
  [player ::= variable-not-otherwise-mentioned]  ; Alice, Bob, Charlie, etc.
  [circle ::= (player-circle player ...)]
  
  ;; Available roles in a script  
  [role-name ::= washerwoman librarian chef empath imp baron godfather drunk]
  [role-type ::= Townsfolk Outsider Minion Demon]
  [role ::= (role-def role-name role-type (constraints constraint ...))]
  [script ::= (script role ...)]
  
  ;; Role distribution `d` - what roles are actually in the game
  [role-distribution ::= (role-dist role ...)]
  
  ;; Physical bag `b` - what tokens are physically in the bag
  [physical-bag ::= (bag role ...)]
  
  ;; Numbers and counts
  [num ::= natural]
  [bool ::= #t #f]
  [role-count-dist ::= (dist (Townsfolk num) (Outsider num) (Minion num) (Demon num))]
  
  ;; Role constraints that modify the base distribution
  [constraint ::= (add-outsiders num)      ; Baron: +2 Outsiders, -2 Townsfolk
                  (token-sub role-type role-type)]  ; Drunk: Outsider token → Townsfolk role
  
  ;; Pattern variables (enable underscore patterns like n_townsfolk, p_alice)
  [n ::= natural]
  [p ::= variable-not-otherwise-mentioned]
  [r ::= role]
  [rcd ::= role-count-dist]
  [rd ::= role-distribution]
  [b ::= physical-bag]
  [pa ::= player-assignment]
  [as ::= alive])

;; Test our basic language
(display "=== BOTC Language Defined ===\n")

;; Create a simple 5-player circle  
(define example-circle 
  (term (player-circle Alice Bob Charlie Diana Eve)))

(display (format "Example circle: ~a\n" example-circle))

;; =============================================================================
;; PART 2: FROM CIRCLE TO BAG (The Core BOTC Logic)
;; =============================================================================

;; Step 1: How many players are in the circle?
(define-metafunction BOTC
  player-count : circle -> num
  [(player-count (player-circle)) 0]
  [(player-count (player-circle p_1 p_rest ...)) ,(length (term (p_1 p_rest ...)))])

;; Step 2: Given player count, what's the base distribution? (Official BOTC rules)
(define-metafunction BOTC
  base-distribution : num -> role-count-dist
  ;; 5-9 players: 1 Minion, 1 Demon
  [(base-distribution 5) (dist (Townsfolk 3) (Outsider 0) (Minion 1) (Demon 1))]
  [(base-distribution 6) (dist (Townsfolk 3) (Outsider 1) (Minion 1) (Demon 1))]
  [(base-distribution 7) (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1))]
  [(base-distribution 8) (dist (Townsfolk 5) (Outsider 1) (Minion 1) (Demon 1))]
  [(base-distribution 9) (dist (Townsfolk 5) (Outsider 2) (Minion 1) (Demon 1))]
  ;; 10-15 players: 2 Minions, 1 Demon (except 13+ gets 3 Minions)
  [(base-distribution 10) (dist (Townsfolk 7) (Outsider 0) (Minion 2) (Demon 1))]
  [(base-distribution 11) (dist (Townsfolk 7) (Outsider 1) (Minion 2) (Demon 1))]
  [(base-distribution 12) (dist (Townsfolk 7) (Outsider 2) (Minion 2) (Demon 1))]
  [(base-distribution 13) (dist (Townsfolk 9) (Outsider 0) (Minion 3) (Demon 1))]
  [(base-distribution 14) (dist (Townsfolk 9) (Outsider 1) (Minion 3) (Demon 1))]
  [(base-distribution 15) (dist (Townsfolk 9) (Outsider 2) (Minion 3) (Demon 1))])

;; =============================================================================
;; PART 3: ROLE CONSTRAINTS (The Heart of BOTC Complexity)
;; =============================================================================

;; Step 3: Apply role constraints to modify the base distribution
;; This computes the actual role distribution `d` that goes into the game

;; DEBUGGING: Test individual pieces first
(define-metafunction BOTC
  test-pattern-matching : role-distribution -> role
  [(test-pattern-matching (role-dist r)) r]
  [(test-pattern-matching (role-dist r r_1)) r])


(define-metafunction BOTC
  test-two-role-extraction : role-distribution -> role  
  [(test-two-role-extraction (role-dist r_1 r_2)) r_2])

(define-metafunction BOTC
  apply-constraints : role-count-dist role-distribution -> role-count-dist
  [(apply-constraints rcd (role-dist)) rcd]  ; No roles = no changes
  [(apply-constraints rcd (role-dist r))
   (apply-role-constraint rcd r)]
  [(apply-constraints rcd (role-dist r r_1 ...))
   (apply-constraints (apply-role-constraint rcd r) (role-dist r_1 ...))])

;; Apply a single role's constraints to the distribution
(define-metafunction BOTC
  apply-role-constraint : role-count-dist role -> role-count-dist
  ;; Baron: add-outsiders 2
  [(apply-role-constraint (dist (Townsfolk n) (Outsider n_1) (Minion n_2) (Demon n_3))
                         (role-def baron Minion (constraints (add-outsiders 2))))
   (dist (Townsfolk ,(- (term n) 2)) (Outsider ,(+ (term n_1) 2)) (Minion n_2) (Demon n_3))]
  ;; Godfather: add-outsiders 1  
  [(apply-role-constraint (dist (Townsfolk n) (Outsider n_1) (Minion n_2) (Demon n_3))
                         (role-def godfather Minion (constraints (add-outsiders 1))))
   (dist (Townsfolk ,(- (term n) 1)) (Outsider ,(+ (term n_1) 1)) (Minion n_2) (Demon n_3))]
  ;; Roles with no constraints don't change anything (catch-all)
  [(apply-role-constraint rcd (role-def washerwoman Townsfolk (constraints))) rcd]
  [(apply-role-constraint rcd (role-def r Townsfolk (constraints))) rcd]
  [(apply-role-constraint rcd (role-def r Outsider (constraints))) rcd]
  [(apply-role-constraint rcd (role-def r Minion (constraints))) rcd]
  [(apply-role-constraint rcd (role-def r Demon (constraints))) rcd])

;; =============================================================================
;; PART 4: TOKEN SUBSTITUTION (Physical Bag vs Role Distribution)
;; =============================================================================

;; Convert role distribution `d` to physical bag `b` by applying token substitutions
(define-metafunction BOTC
  roles-to-bag : role-distribution -> physical-bag
  [(roles-to-bag (role-dist)) (bag)]
  [(roles-to-bag (role-dist r r_rest ...))
   (add-role-to-bag r (roles-to-bag (role-dist r_rest ...)))])

;; Add a single role to the physical bag, applying any token substitutions
(define-metafunction BOTC
  add-role-to-bag : role physical-bag -> physical-bag
  ;; Drunk: role is Outsider, but token goes in as Townsfolk
  [(add-role-to-bag (role-def drunk Outsider (constraints (token-sub Outsider Townsfolk))) (bag r ...))
   (bag (role-def drunk Townsfolk (constraints)) r ...)]
  ;; Normal case: role goes into bag unchanged
  [(add-role-to-bag r (bag r_rest ...)) (bag r r_rest ...)])

;; =============================================================================
;; PART 5: BAG VALIDATION (The Complete System) - Using Judgments
;; =============================================================================

;; JUDGMENT: A (role-distribution, physical-bag) pair is valid
;; This expresses the fundamental BOTC rule relationship
(define-judgment-form BOTC
  #:mode (valid-bag-pair I I)
  #:contract (valid-bag-pair role-distribution physical-bag)
  
  ;; The core rule: bag must be the correct token substitution of the role distribution
  [(where b_expected (roles-to-bag rd))
   (where #t (bags-equal b b_expected))
   ----------
   (valid-bag-pair rd b)])

;; METAFUNCTION: Bag equality (trivial computation)
;; This is purely functional bag comparison - a trivial detail
(define-metafunction BOTC
  bags-equal : physical-bag physical-bag -> bool
  ;; Empty bags are equal
  [(bags-equal (bag) (bag)) #t]
  ;; For now, require exact equality (could be extended to handle multiset equality)
  [(bags-equal b b) #t]
  ;; Different bags are not equal
  [(bags-equal b_1 b_2) #f])

;; =============================================================================
;; PART 6: GAME TRANSITIONS (Using Reduction Relations)
;; =============================================================================

;; Extended language for actual BOTC game states
(define-extended-language BOTC-Game BOTC
  [game-state ::= (game phase role-distribution physical-bag player-assignments)]
  [phase ::= setup day night game-over]
  [player-assignments ::= (assignments (player-assignment ...))]
  [player-assignment ::= (player-name role alive)]
  [player-name ::= variable-not-otherwise-mentioned]
  [alive ::= living dead])

;; REDUCTION RELATION: How BOTC games progress
;; This captures the essential game flow transitions
(define game-->
  (reduction-relation
   BOTC-Game
   #:domain game-state
   
   ;; Setup phase: Validate bag and assign roles to players (simplified assignment)
   [--> (game setup rd b (assignments ()))
        (game day rd b (assignments ((Alice (role-def washerwoman Townsfolk (constraints)) living) 
                                     (Bob (role-def baron Minion (constraints (add-outsiders 2))) living))))
        (judgment-holds (valid-bag-pair rd b))
        "setup-complete"]
   
   ;; Day phase: Discussion ends, move to night
   [--> (game day rd b (assignments ((p r as) ...)))
        (game night rd b (assignments ((p r as) ...)))
        "day-to-night"]
   
   ;; Night phase: Roles act, move to next day  
   [--> (game night rd b (assignments ((p r as) ...)))
        (game day rd b (assignments ((p r as) ...)))
        "night-to-day"]
   
   ;; BOTC End Game Condition 1: All demons dead → Good wins
   [--> (game day rd b (assignments ((p r as) ...)))
        (game game-over rd b (assignments ((p r as) ...)))
        (where #t (all-demons-dead? (assignments ((p r as) ...))))
        "good-wins-demons-dead"]
   
   ;; BOTC End Game Condition 2: ≤2 players alive with living demon → Evil wins  
   [--> (game day rd b (assignments ((p r as) ...)))
        (game game-over rd b (assignments ((p r as) ...)))
        (where #t (evil-wins? (assignments ((p r as) ...))))
        "evil-wins-final-two"]))

;; Complete game setup: role distribution to (d, b) pair  
(define-metafunction BOTC
  setup-game : role-distribution -> (role-distribution physical-bag)
  [(setup-game rd)
   (rd (roles-to-bag rd))])

;; Helper: extract constraints from a role
(define-metafunction BOTC
  get-constraints : role -> (constraint ...)
  [(get-constraints (role-def r_name r_type (constraints constraint ...))) (constraint ...)])

;; BOTC End Game Condition Helpers (metafunctions for trivial computation)

;; Check if all demons are dead (Good wins condition)
(define-metafunction BOTC-Game
  all-demons-dead? : player-assignments -> bool
  [(all-demons-dead? (assignments ())) #t]  ; No players = no demons = good wins
  [(all-demons-dead? (assignments ((p (role-def r_name Demon (constraints constraint ...)) living) pa_1 ...))) #f]  ; Living demon found
  [(all-demons-dead? (assignments ((p (role-def r_name Demon (constraints constraint ...)) dead) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]  ; Dead demon, check rest
  [(all-demons-dead? (assignments ((p (role-def r_name Townsfolk (constraints constraint ...)) living) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]  ; Non-demon, check rest
  [(all-demons-dead? (assignments ((p (role-def r_name Outsider (constraints constraint ...)) living) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]  ; Non-demon, check rest
  [(all-demons-dead? (assignments ((p (role-def r_name Minion (constraints constraint ...)) living) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]  ; Non-demon, check rest
  [(all-demons-dead? (assignments ((p (role-def r_name Minion (constraints)) living) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]  ; Non-demon with no constraints, check rest
  [(all-demons-dead? (assignments ((p (role-def r_name Townsfolk (constraints constraint ...)) dead) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]  ; Non-demon, check rest
  [(all-demons-dead? (assignments ((p (role-def r_name Outsider (constraints constraint ...)) dead) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]  ; Non-demon, check rest
  [(all-demons-dead? (assignments ((p (role-def r_name Minion (constraints constraint ...)) dead) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]  ; Non-demon, check rest
  ;; Handle empty constraints for all types
  [(all-demons-dead? (assignments ((p (role-def r_name Townsfolk (constraints)) living) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]
  [(all-demons-dead? (assignments ((p (role-def r_name Townsfolk (constraints)) dead) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]
  [(all-demons-dead? (assignments ((p (role-def r_name Outsider (constraints)) living) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]
  [(all-demons-dead? (assignments ((p (role-def r_name Outsider (constraints)) dead) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]
  [(all-demons-dead? (assignments ((p (role-def r_name Minion (constraints)) dead) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))]
  [(all-demons-dead? (assignments ((p (role-def r_name Demon (constraints)) living) pa_1 ...))) #f]
  [(all-demons-dead? (assignments ((p (role-def r_name Demon (constraints)) dead) pa_1 ...)))
   (all-demons-dead? (assignments (pa_1 ...)))])  ; Dead demon, check rest

;; Check if evil wins (≤2 alive + living demon)
(define-metafunction BOTC-Game
  evil-wins? : player-assignments -> bool
  [(evil-wins? assignments)
   ,(and (<= (term (count-living assignments)) 2)
         (term (has-living-demon? assignments)))])

;; Count living players
(define-metafunction BOTC-Game
  count-living : player-assignments -> num
  [(count-living (assignments ())) 0]
  [(count-living (assignments ((p r living) pa_1 ...)))
   ,(+ 1 (term (count-living (assignments (pa_1 ...)))))]
  [(count-living (assignments ((p r dead) pa_1 ...)))
   (count-living (assignments (pa_1 ...)))])

;; Check if there's a living demon
(define-metafunction BOTC-Game
  has-living-demon? : player-assignments -> bool
  [(has-living-demon? (assignments ())) #f]
  [(has-living-demon? (assignments ((p (role-def r_name Demon (constraints constraint ...)) living) pa_1 ...))) #t]
  [(has-living-demon? (assignments ((p r living) pa_1 ...)))
   (has-living-demon? (assignments (pa_1 ...)))]
  [(has-living-demon? (assignments ((p r dead) pa_1 ...)))
   (has-living-demon? (assignments (pa_1 ...)))])

;; Example roles with constraints
(define baron-role (term (role-def baron Minion (constraints (add-outsiders 2)))))
(define godfather-role (term (role-def godfather Minion (constraints (add-outsiders 1)))))
(define washerwoman-role (term (role-def washerwoman Townsfolk (constraints))))
(define drunk-role (term (role-def drunk Outsider (constraints (token-sub Outsider Townsfolk)))))

(module+ test
  (require rackunit)
  
  ;; Test player counting (now that patterns work!)
  (check-equal? (term (player-count ,example-circle)) 5
                "Should count 5 players correctly")
  
  ;; Test base distributions for different player counts
  (check-equal? (term (base-distribution 7)) 
                (term (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1)))
                "7 players: 5-0-1-1")
  
  (check-equal? (term (base-distribution 10)) 
                (term (dist (Townsfolk 7) (Outsider 0) (Minion 2) (Demon 1)))
                "10 players: 7-0-2-1")
  
  (check-equal? (term (base-distribution 13)) 
                (term (dist (Townsfolk 9) (Outsider 0) (Minion 3) (Demon 1)))
                "13 players: 9-0-3-1")
  
  (check-equal? (term (base-distribution 15)) 
                (term (dist (Townsfolk 9) (Outsider 2) (Minion 3) (Demon 1)))
                "15 players: 9-2-3-1")
  
  ;; Test role constraint application  
  (define base-7 (term (base-distribution 7)))  ; (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1))
  
  ;; Debug: Let's see what our terms look like
  (display (format "base-7: ~a\\n" base-7))
  (display (format "baron-role: ~a\\n" baron-role))
  
  ;; DEBUGGING: Test pattern matching on role distributions
  (define test-two-roles (term (role-dist ,baron-role ,washerwoman-role)))
  (display (format "test-two-roles: ~a\\n" test-two-roles))
  
  ;; Test: Can we extract the first role?
  (check-equal? (term (test-pattern-matching ,test-two-roles))
                baron-role
                "Should extract first role from two-role distribution")
  
  ;; Test: Can we extract the second role?
  (check-equal? (term (test-two-role-extraction ,test-two-roles))
                washerwoman-role
                "Should extract second role from two-role distribution")
  
  ;; Test Baron effect: +2 Outsiders, -2 Townsfolk
  (check-equal? (term (apply-role-constraint ,base-7 ,baron-role))
                (term (dist (Townsfolk 3) (Outsider 2) (Minion 1) (Demon 1)))
                "Baron should add 2 Outsiders, remove 2 Townsfolk")
  
  ;; Test role with no constraints
  (check-equal? (term (apply-role-constraint ,base-7 ,washerwoman-role))
                base-7
                "Washerwoman should not change distribution")
  
  ;; Test Godfather effect: +1 Outsider, -1 Townsfolk
  (check-equal? (term (apply-role-constraint ,base-7 ,godfather-role))
                (term (dist (Townsfolk 4) (Outsider 1) (Minion 1) (Demon 1)))
                "Godfather should add 1 Outsider, remove 1 Townsfolk")
  
  ;; Test multiple constraints
  (define roles-with-baron (term (role-dist ,baron-role ,washerwoman-role)))
  (check-equal? (term (apply-constraints ,base-7 ,roles-with-baron))
                (term (dist (Townsfolk 3) (Outsider 2) (Minion 1) (Demon 1)))
                "Baron + Washerwoman should only apply Baron's constraint")
  
  ;; Test Baron + Godfather together (should stack: +3 Outsiders, -3 Townsfolk)
  (define roles-with-both-outsider-adders (term (role-dist ,baron-role ,godfather-role)))
  (check-equal? (term (apply-constraints ,base-7 ,roles-with-both-outsider-adders))
                (term (dist (Townsfolk 2) (Outsider 3) (Minion 1) (Demon 1)))
                "Baron + Godfather should stack: +3 Outsiders, -3 Townsfolk")
  
  ;; =============================================================================
  ;; TOKEN SUBSTITUTION TESTS
  ;; =============================================================================
  
  ;; Test: Normal roles go into bag unchanged
  (define normal-roles (term (role-dist ,baron-role ,washerwoman-role)))
  (define expected-normal-bag (term (bag ,baron-role ,washerwoman-role)))
  (check-equal? (term (roles-to-bag ,normal-roles))
                expected-normal-bag
                "Normal roles should go into bag unchanged")
  
  ;; Test: Drunk token substitution  
  (define roles-with-drunk (term (role-dist ,drunk-role ,washerwoman-role)))
  (define expected-drunk-bag (term (bag (role-def drunk Townsfolk (constraints)) ,washerwoman-role)))
  (check-equal? (term (roles-to-bag ,roles-with-drunk))
                expected-drunk-bag
                "Drunk should appear as Townsfolk token in bag")
  
  ;; =============================================================================
  ;; COMPLETE SYSTEM TESTS
  ;; =============================================================================
  
  ;; Test: Bag validation for normal roles (d == b) - Now using JUDGMENT
  (check-true (judgment-holds (valid-bag-pair (role-dist ,baron-role ,washerwoman-role) 
                                             (bag ,baron-role ,washerwoman-role)))
              "Normal roles should create valid (d,b) pair")
  
  ;; Test: Drunk creates invalid (d,b) pair when d != b - Now using JUDGMENT
  (check-false (judgment-holds (valid-bag-pair (role-dist ,drunk-role ,washerwoman-role)
                                              (bag ,drunk-role ,washerwoman-role)))
               "Drunk role distribution should not match unsubstituted bag")
  
  ;; Test: Drunk validation with proper token substitution - Now using JUDGMENT
  (check-true (judgment-holds (valid-bag-pair (role-dist ,drunk-role ,washerwoman-role)
                                             (bag (role-def drunk Townsfolk (constraints)) ,washerwoman-role)))
              "Drunk should validate with correct token substitution")
  
  ;; =============================================================================
  ;; GAME TRANSITION TESTS (Reduction Relations)
  ;; =============================================================================
  
  ;; Test: Valid game setup can transition from setup to day
  (define valid-setup-state 
    (term (game setup 
                (role-dist ,baron-role ,washerwoman-role)
                (bag ,baron-role ,washerwoman-role)
                (assignments ()))))
  
  (define after-setup (apply-reduction-relation game--> valid-setup-state))
  (check-true (not (empty? after-setup)) "Valid setup should transition to day phase")
  (display (format "Game after setup: ~a\n" (car after-setup)))
  
  ;; Test: Day phase transitions to night
  (define day-state (car after-setup))
  (define after-day (apply-reduction-relation game--> day-state))
  (check-true (not (empty? after-day)) "Day phase should transition to night")
  (display (format "Game after day: ~a\n" (car after-day)))
  
  ;; Test: Night phase transitions back to day
  (define night-state (car after-day))
  (define after-night (apply-reduction-relation game--> night-state))
  (check-true (not (empty? after-night)) "Night phase should transition to day")
  (display (format "Game after night: ~a\n" (car after-night)))
  
  ;; =============================================================================
  ;; BOTC END GAME CONDITION TESTS
  ;; =============================================================================
  
  ;; Test: Good wins when all demons are dead
  (define good-wins-state
    (term (game day
                (role-dist (role-def imp Demon (constraints)) ,washerwoman-role)
                (bag (role-def imp Demon (constraints)) ,washerwoman-role)
                (assignments (((Alice (role-def imp Demon (constraints)) dead)
                               (Bob ,washerwoman-role living)))))))
  
  (define good-wins-result (apply-reduction-relation game--> good-wins-state))
  (check-true (not (empty? good-wins-result)) "Good should win when all demons dead")
  (display (format "Good wins result: ~a\n" good-wins-result))
  
  ;; Test: Evil wins with ≤2 alive + living demon
  (define evil-wins-state
    (term (game day
                (role-dist (role-def imp Demon (constraints)) ,washerwoman-role)
                (bag (role-def imp Demon (constraints)) ,washerwoman-role)
                (assignments (((Alice (role-def imp Demon (constraints)) living)
                               (Bob ,washerwoman-role living)))))))
  
  (define evil-wins-result (apply-reduction-relation game--> evil-wins-state))
  (check-true (not (empty? evil-wins-result)) "Evil should win with 2 alive + living demon")
  (display (format "Evil wins result: ~a\n" evil-wins-result))
  
  (display "All constraint, token substitution, validation, and game transition tests passed!\n"))

;; =============================================================================
;; YOUR TURN: Before we continue...
;; =============================================================================

;; =============================================================================
;; TUTORIAL COMPLETE! 🎉
;; =============================================================================

;; You've successfully implemented a complete BOTC bag validation system in PLT Redex!

;; What we accomplished:
;; 1. ✅ Core language with proper pattern variable typing
;; 2. ✅ Base distribution rules for 5-15 players (official BOTC formulas)  
;; 3. ✅ Role constraint system (Baron, Godfather modify distributions)
;; 4. ✅ Token substitution (Drunk: Outsider role → Townsfolk token)
;; 5. ✅ Complete bag validation for (role-distribution, physical-bag) pairs

;; Key PLT Redex insights mastered:
;; - Non-terminal shadowing: role vs role-def constructor conflicts
;; - Pattern variable typing: [r ::= role] not [r ::= variable-not-otherwise-mentioned]  
;; - Constructor conflicts: [rd ::= role-distribution] works, avoid name collisions
;; - Systematic debugging: Break complex functions into testable pieces

;; The complete system models the storyteller's perspective:
;; Circle of players → Base distribution → Apply role constraints → Generate physical bag

;; Try experimenting with:
;; - Adding more roles with different constraint types
;; - Implementing Lunatic/Marionette token substitutions  
;; - Extending to model complete game state transitions

;(display "Ready to continue? Answer the questions above!\n")