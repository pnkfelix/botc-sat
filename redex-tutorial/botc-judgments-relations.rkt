#lang racket

;; BOTC with Judgments and Reduction Relations
;; Exploring the dynamic/inference side of PLT Redex

(require redex/reduction-semantics
         "botc-complete.rkt")

;; =============================================================================
;; PART 6: JUDGMENT FORMS (Inference Rules)
;; =============================================================================

;; Judgment: A role distribution is valid for a given player count
(define-judgment-form BOTC
  #:mode (valid-role-dist I I)
  #:contract (valid-role-dist num role-distribution)
  
  ;; Base case: empty distribution is always valid
  [----------
   (valid-role-dist n (role-dist))]
  
  ;; Inductive case: role distribution is valid if constraints are satisfiable
  [(role-count-matches n rd rcd)
   (constraints-satisfied rd rcd)
   ----------
   (valid-role-dist n rd)])

;; Judgment: Role counts match player count and base distribution
(define-judgment-form BOTC
  #:mode (role-count-matches I I I)
  #:contract (role-count-matches num role-distribution role-count-dist)
  
  [(where rcd_base (base-distribution n))
   (where rcd_final (apply-constraints rcd_base rd))
   (counts-equal rcd rcd_final)
   ----------
   (role-count-matches n rd rcd)])

;; Judgment: Two role count distributions are equal
(define-judgment-form BOTC
  #:mode (counts-equal I I)
  #:contract (counts-equal role-count-dist role-count-dist)
  
  [----------
   (counts-equal (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d))
                 (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)))])

;; Judgment: All role constraints are satisfied
(define-judgment-form BOTC
  #:mode (constraints-satisfied I I)
  #:contract (constraints-satisfied role-distribution role-count-dist)
  
  [----------
   (constraints-satisfied (role-dist) rcd)]
  
  [(constraint-satisfied r rcd)
   (constraints-satisfied (role-dist r_rest ...) rcd)
   ----------
   (constraints-satisfied (role-dist r r_rest ...) rcd)])

;; Judgment: A single role's constraints are satisfied
(define-judgment-form BOTC
  #:mode (constraint-satisfied I I)  
  #:contract (constraint-satisfied role role-count-dist)
  
  ;; Baron constraint: need at least 2 Townsfolk to convert to Outsiders
  [(where n_t (get-count-from-dist rcd Townsfolk))
   (side-condition (>= (term n_t) 2))
   ----------
   (constraint-satisfied (role-def baron Minion (constraints (add-outsiders 2))) rcd)]
  
  ;; Roles with no constraints are always satisfied
  [----------
   (constraint-satisfied (role-def r_name r_type (constraints)) rcd)])

;; =============================================================================
;; PART 7: REDUCTION RELATIONS (Game State Transitions)
;; =============================================================================

;; Game state for modeling actual game progression
(define-extended-language BOTC-Game BOTC
  [game-state ::= (game-setup phase role-distribution physical-bag player-assignments)]
  [phase ::= setup day-phase night-phase game-over]
  [player-assignments ::= (assignments (player-id role) ...)]
  [player-id ::= variable-not-otherwise-mentioned])

;; Reduction relation: Game state transitions
(define --> 
  (reduction-relation
   BOTC-Game
   #:domain game-state
   
   ;; Setup phase: validate and assign roles
   [--> (game-setup setup rd b (assignments))
        (game-setup day-phase rd b (assignments (p_1 r_1) ... (p_n r_n)))
        (where ((p_1 r_1) ... (p_n r_n)) (assign-roles rd))
        (judgment-holds (valid-bag-pair rd b))
        "setup-complete"]
   
   ;; Day phase: players discuss (no state change for now)
   [--> (game-setup day-phase rd b assignments)
        (game-setup night-phase rd b assignments)
        "day-to-night"]
   
   ;; Night phase: roles act (simplified)
   [--> (game-setup night-phase rd b assignments)
        (game-setup day-phase rd b assignments)
        "night-to-day"]
   
   ;; Game over conditions (simplified)
   [--> (game-setup day-phase rd b assignments)
        (game-setup game-over rd b assignments)
        (side-condition (game-over? (term assignments)))
        "game-over"]))

;; Helper metafunction for role assignment (simplified)
(define-metafunction BOTC-Game
  assign-roles : role-distribution -> ((player-id role) ...)
  [(assign-roles (role-dist r_1 ... r_n))
   ((Alice r_1) (Bob r_2) (Charlie r_3))])  ; Simplified for demo

;; Helper for game over detection
(define-metafunction BOTC-Game
  game-over? : player-assignments -> bool
  [(game-over? assignments) #f])  ; Simplified - never ends

;; =============================================================================
;; TESTING JUDGMENTS AND RELATIONS
;; =============================================================================

(module+ test
  (require rackunit)
  
  (display "=== TESTING JUDGMENTS ===\n")
  
  ;; Test basic judgment forms
  (check-true (judgment-holds (valid-role-dist 7 (role-dist))))
  (display "Empty role distribution is valid ✓\n")
  
  ;; Test constraint satisfaction
  (define test-dist (term (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1))))
  (check-true (judgment-holds (constraint-satisfied (role-def washerwoman Townsfolk (constraints)) ,test-dist)))
  (display "Washerwoman constraint satisfied ✓\n")
  
  (check-true (judgment-holds (constraint-satisfied (role-def baron Minion (constraints (add-outsiders 2))) ,test-dist)))
  (display "Baron constraint satisfied (enough Townsfolk) ✓\n")
  
  ;; Test counts equality
  (check-true (judgment-holds (counts-equal ,test-dist ,test-dist)))
  (display "Distribution equals itself ✓\n")
  
  (display "\n=== TESTING REDUCTION RELATIONS ===\n")
  
  ;; Test game state transitions
  (define initial-state 
    (term (game-setup setup 
                      (role-dist (role-def baron Minion (constraints (add-outsiders 2)))
                                (role-def washerwoman Townsfolk (constraints)))
                      (bag (role-def baron Minion (constraints (add-outsiders 2)))
                           (role-def washerwoman Townsfolk (constraints)))
                      (assignments))))
  
  (define after-setup (apply-reduction-relation --> initial-state))
  (display (format "Game state after setup: ~a\n" after-setup))
  
  ;; Test traces (visualize reduction sequence)
  (display "\nReduction trace from initial state:\n")
  (traces --> initial-state)
  
  (display "Judgments and relations tests completed!\n"))

;; =============================================================================
;; INTERACTIVE EXPLORATION GUIDE
;; =============================================================================

(display "\n=== JUDGMENT AND RELATION EXPLORATION ===\n")
(display "Try these in the REPL:\n\n")

(display "Test judgments:\n")
(display "  (judgment-holds (valid-role-dist 7 (role-dist)))\n")
(display "  (judgment-holds (constraint-satisfied (role-def baron Minion (constraints (add-outsiders 2))) (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1))))\n\n")

(display "Test reduction relations:\n")
(display "  (apply-reduction-relation --> your-game-state)\n")
(display "  (traces --> initial-state)  ; Visualize transitions\n\n")

(display "Advanced exploration:\n")
(display "  (stepper --> initial-state)  ; Step through reductions manually\n")
(display "  (reduction-relation-trace --> initial-state)  ; Get trace as data\n")