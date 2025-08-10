#lang racket

;; PLT Redex Tutorial: BOTC Bag Validation
;; Step 2: Base setup rules (player count → base distribution)

(require redex/reduction-semantics
         "step1-bag-validation.rkt")
(provide (all-defined-out))

;; =============================================================================
;; BASE SETUP METAFUNCTIONS
;; =============================================================================

;; The core BOTC rule: given number of players, what's the base distribution?
(define-metafunction BOTC
  base-setup : num -> distribution
  ;; 5 players: 3 Townsfolk, 0 Outsiders, 1 Minion, 1 Demon
  [(base-setup 5) (dist (Townsfolk 3) (Outsider 0) (Minion 1) (Demon 1))]
  ;; 6 players: 3 Townsfolk, 1 Outsider, 1 Minion, 1 Demon  
  [(base-setup 6) (dist (Townsfolk 3) (Outsider 1) (Minion 1) (Demon 1))]
  ;; 7 players: 5 Townsfolk, 0 Outsiders, 1 Minion, 1 Demon
  [(base-setup 7) (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1))]) 

;; Helper: extract count for a specific role type from distribution
(define-metafunction BOTC
  get-count : distribution role-type -> num
  ;; Notice how we use our declared pattern variables n_t, n_o, n_m, n_d!
  [(get-count (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)) Townsfolk) n_t]
  [(get-count (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)) Outsider) n_o]
  [(get-count (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)) Minion) n_m]
  [(get-count (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)) Demon) n_d])

;; Helper: update count for a specific role type
(define-metafunction BOTC
  update-count : distribution role-type num -> distribution
  [(update-count (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)) 
                 Townsfolk n_new)
   (dist (Townsfolk n_new) (Outsider n_o) (Minion n_m) (Demon n_d))]
  [(update-count (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)) 
                 Outsider n_new)
   (dist (Townsfolk n_t) (Outsider n_new) (Minion n_m) (Demon n_d))]
  [(update-count (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)) 
                 Minion n_new)
   (dist (Townsfolk n_t) (Outsider n_o) (Minion n_new) (Demon n_d))]
  [(update-count (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_d)) 
                 Demon n_new)
   (dist (Townsfolk n_t) (Outsider n_o) (Minion n_m) (Demon n_new))])

;; =============================================================================
;; TESTING
;; =============================================================================

(module+ test
  (require rackunit)
  
  (display "Testing base setup rules...\n")
  
  ;; Test base setup for different player counts
  (check-equal? (term (base-setup 7))
                (term (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1)))
                "7 players should give 5-0-1-1 distribution")
  
  ;; Test our helper functions
  (check-equal? (term (get-count (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1)) 
                                 Townsfolk))
                5
                "Should extract Townsfolk count correctly")
  
  (check-equal? (term (update-count (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1))
                                   Outsider 2))
                (term (dist (Townsfolk 5) (Outsider 2) (Minion 1) (Demon 1)))
                "Should update Outsider count correctly")
  
  (display "Base setup tests passed!\n"))

;; =============================================================================
;; STEP 2 QUESTIONS FOR YOU:
;; =============================================================================

;; 1. Look at the `get-count` metafunction. Can you see how the pattern variables
;;    n_t, n_o, n_m, n_d work? What would happen if we hadn't declared `[n ::= natural]`?
;;
;; 2. What BOTC game mechanic does the `update-count` function enable us to model?
;;    Hint: Think about roles that change the base distribution...
;;
;; 3. Try adding the base setup rule for 8 players (5 Townsfolk, 1 Outsider, 1 Minion, 1 Demon)
;;    to the `base-setup` metafunction above!

(display "Ready for Step 3: Role Constraints (Baron, Drunk, etc.)\n")