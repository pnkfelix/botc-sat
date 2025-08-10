#lang racket

;; Simple BOTC Judgments and Relations Example
;; Demonstrating the inference/dynamic side of PLT Redex

(require redex/reduction-semantics
         "botc-complete.rkt")

;; =============================================================================
;; SIMPLE JUDGMENT FORMS
;; =============================================================================

;; Judgment: A role has valid constraints for a given count distribution
(define-judgment-form BOTC
  #:mode (role-satisfiable I I)
  #:contract (role-satisfiable role role-count-dist)
  
  ;; Baron requires at least 2 Townsfolk to add 2 Outsiders
  [(where n_t (get-count-from-dist rcd Townsfolk))
   (side-condition (>= (term n_t) 2))
   ----------
   (role-satisfiable (role-def baron Minion (constraints (add-outsiders 2))) rcd)]
  
  ;; Roles with no constraints are always satisfiable
  [----------
   (role-satisfiable (role-def r_name r_type (constraints)) rcd)])

;; Helper metafunction to extract counts (needed for judgment)
(define-metafunction BOTC
  get-count-from-dist : role-count-dist role-type -> num
  [(get-count-from-dist (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)) Townsfolk) n_t]
  [(get-count-from-dist (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)) Outsider) n_o]
  [(get-count-from-dist (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)) Minion) n_m]
  [(get-count-from-dist (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)) Demon) n_d])

;; Judgment: A bag correctly represents a role distribution
(define-judgment-form BOTC
  #:mode (bag-represents I I)
  #:contract (bag-represents physical-bag role-distribution)
  
  ;; Empty bag represents empty distribution
  [----------
   (bag-represents (bag) (role-dist))]
  
  ;; Bag correctly represents distribution if conversion matches
  [(where b_expected (roles-to-bag rd))
   (bags-equal b b_expected)
   ----------
   (bag-represents b rd)])

;; Helper judgment: Two bags are equal
(define-judgment-form BOTC
  #:mode (bags-equal I I)
  #:contract (bags-equal physical-bag physical-bag)
  
  [----------
   (bags-equal (bag) (bag))]
   
  ;; For simplicity, just check if they're identical
  [----------
   (bags-equal b b)])

;; =============================================================================
;; SIMPLE REDUCTION RELATION
;; =============================================================================

;; Simple game phase transitions
(define-extended-language BOTC-Simple BOTC
  [game-phase ::= setup discussion voting night]
  [game-state ::= (state game-phase role-distribution physical-bag)])

(define phase-->
  (reduction-relation
   BOTC-Simple
   #:domain game-state
   
   ;; Setup transitions to discussion
   [--> (state setup rd b)
        (state discussion rd b)
        "setup-to-discussion"]
   
   ;; Discussion transitions to voting  
   [--> (state discussion rd b)
        (state voting rd b)
        "discussion-to-voting"]
   
   ;; Voting transitions to night
   [--> (state voting rd b)
        (state night rd b)
        "voting-to-night"]
   
   ;; Night transitions back to discussion (new day)
   [--> (state night rd b)
        (state discussion rd b)
        "night-to-discussion"]))

;; =============================================================================
;; TESTING AND EXAMPLES
;; =============================================================================

(module+ test
  (require rackunit)
  
  (display "=== TESTING SIMPLE JUDGMENTS ===\n")
  
  ;; Test role satisfiability
  (define good-dist (term (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1))))
  (define bad-dist (term (dist (Townsfolk 1) (Outsider 0) (Minion 1) (Demon 1))))
  
  (check-true (judgment-holds (role-satisfiable (role-def baron Minion (constraints (add-outsiders 2))) ,good-dist)))
  (display "Baron satisfiable with 5 Townsfolk ✓\n")
  
  (check-false (judgment-holds (role-satisfiable (role-def baron Minion (constraints (add-outsiders 2))) ,bad-dist)))
  (display "Baron not satisfiable with 1 Townsfolk ✓\n")
  
  ;; Test bag representation
  (define test-roles (term (role-dist (role-def washerwoman Townsfolk (constraints)))))
  (define test-bag (term (bag (role-def washerwoman Townsfolk (constraints)))))
  
  (check-true (judgment-holds (bag-represents ,test-bag ,test-roles)))
  (display "Bag correctly represents role distribution ✓\n")
  
  (display "\n=== TESTING REDUCTION RELATIONS ===\n")
  
  ;; Test phase transitions
  (define initial-game (term (state setup (role-dist (role-def baron Minion (constraints)))
                                          (bag (role-def baron Minion (constraints))))))
  
  (define after-one-step (apply-reduction-relation phase--> initial-game))
  (display (format "After one reduction step: ~a\n" after-one-step))
  
  ;; Test multiple steps
  (define after-two-steps (apply-reduction-relation phase--> (car after-one-step)))
  (display (format "After two reduction steps: ~a\n" after-two-steps))
  
  (display "Simple judgments and relations tests completed!\n"))

;; =============================================================================
;; COMPARISON: METAFUNCTIONS vs JUDGMENTS vs RELATIONS
;; =============================================================================

(display "\n=== PLT REDEX FEATURE COMPARISON ===\n")
(display "METAFUNCTIONS (what we used before):\n")
(display "  - Pure functional computation\n")
(display "  - Input → Output transformations\n") 
(display "  - Example: (base-distribution 7) → (dist ...)\n\n")

(display "JUDGMENTS (inference rules):\n")
(display "  - Logical assertions/proofs\n")
(display "  - Check if relationships hold\n")
(display "  - Example: (judgment-holds (role-satisfiable role dist))\n\n")

(display "REDUCTION RELATIONS (state transitions):\n")
(display "  - Model computation/execution\n")
(display "  - State → State transformations\n")
(display "  - Example: game-state --[rule]--> new-game-state\n\n")

(display "WHEN TO USE EACH:\n")
(display "  - Metafunctions: Computing values (counts, validations)\n")
(display "  - Judgments: Proving properties ('is this valid?')\n")
(display "  - Relations: Modeling execution ('what happens next?')\n\n")

(display "Try in REPL:\n")
(display "  (judgment-holds (role-satisfiable your-role your-dist))\n")
(display "  (apply-reduction-relation phase--> your-state)\n")
(display "  (traces phase--> initial-state)  ; Visualize transitions\n")