#lang racket

;; PLT Redex REPL Exploration Guide
;; How to interactively explore the BOTC system

(require redex/reduction-semantics
         "botc-complete.rkt")

;; =============================================================================
;; INTERACTIVE EXPLORATION PATTERNS FOR PLT REDEX
;; =============================================================================

;; 1. TESTING TERMS - Does a term match the grammar?
;; Use redex-match to check if terms are well-formed

(display "=== 1. TESTING TERMS ===\n")

;; Test if a role definition is well-formed
(redex-match BOTC role (term (role-def baron Minion (constraints (add-outsiders 2)))))
;; Should return a match

;; Test a malformed role
(redex-match BOTC role (term (bad-role invalid stuff)))
;; Should return #f

;; Test role distributions
(redex-match BOTC role-distribution 
             (term (role-dist (role-def baron Minion (constraints)) 
                              (role-def washerwoman Townsfolk (constraints)))))

(display "Try: (redex-match BOTC role (term (role-def imp Demon (constraints))))\n")

;; =============================================================================
;; 2. APPLYING METAFUNCTIONS - Test your logic directly
;; =============================================================================

(display "\n=== 2. APPLYING METAFUNCTIONS ===\n")

;; Test base distribution calculations
(display (format "Base distribution for 7 players: ~a\n" 
                 (term (base-distribution 7))))

(display (format "Base distribution for 13 players: ~a\n" 
                 (term (base-distribution 13))))

;; Test role constraint application
(define test-base (term (base-distribution 7)))
(define test-baron (term (role-def baron Minion (constraints (add-outsiders 2)))))

(display (format "Applying Baron to 7-player base: ~a\n"
                 (term (apply-role-constraint ,test-base ,test-baron))))

;; Test token substitution
(define test-drunk-roles (term (role-dist (role-def drunk Outsider (constraints (token-sub Outsider Townsfolk)))
                                          (role-def washerwoman Townsfolk (constraints)))))

(display (format "Converting Drunk roles to bag: ~a\n"
                 (term (roles-to-bag ,test-drunk-roles))))

(display "Try: (term (player-count (player-circle Alice Bob Charlie)))\n")

;; =============================================================================
;; 3. INTERACTIVE TERM CONSTRUCTION
;; =============================================================================

(display "\n=== 3. INTERACTIVE TERM CONSTRUCTION ===\n")

;; Build terms interactively using term and unquote
(define my-player-count 5)
(define my-base-dist (term (base-distribution ,my-player-count)))
(display (format "Dynamic base distribution: ~a\n" my-base-dist))

;; Create role collections interactively
(define my-roles (term (role-dist (role-def baron Minion (constraints (add-outsiders 2)))
                                  (role-def godfather Minion (constraints (add-outsiders 1)))
                                  (role-def washerwoman Townsfolk (constraints)))))

(display (format "My role collection: ~a\n" my-roles))

;; Apply constraints dynamically
(define final-dist (term (apply-constraints ,my-base-dist ,my-roles)))
(display (format "Final distribution after constraints: ~a\n" final-dist))

(display "Try: (term (valid-bag-pair ,my-roles (roles-to-bag ,my-roles)))\n")

;; =============================================================================
;; 4. SYSTEMATIC TESTING PATTERNS
;; =============================================================================

(display "\n=== 4. SYSTEMATIC TESTING ===\n")

;; Test all player counts
(for ([players (in-range 5 16)])
  (define base (term (base-distribution ,players)))
  (display (format "~a players: ~a\n" players base)))

;; Test constraint combinations
(define constraint-combinations
  (list (list baron-role)
        (list baron-role washerwoman-role)
        (list baron-role godfather-role washerwoman-role)))

(for ([combo constraint-combinations])
  (define roles (term (role-dist ,@combo)))
  (define base (term (base-distribution 7)))
  (define result (term (apply-constraints ,base ,roles)))
  (display (format "Combination ~a: ~a\n" (map (lambda (r) (cadr (caddr r))) combo) result)))

;; =============================================================================
;; 5. EXPLORATION HELPERS
;; =============================================================================

(display "\n=== 5. USEFUL REPL COMMANDS ===\n")

(display "Basic exploration:\n")
(display "  (redex-match BOTC role-distribution your-term)  ; Check grammar\n")
(display "  (term (metafunction-name args...))             ; Apply functions\n")
(display "  (term (your-expression ,variable))             ; Build terms dynamically\n")

(display "\nDebugging:\n")
(display "  (redex-match BOTC pattern term)                ; Test pattern matching\n")
(display "  (term your-expression)                         ; Evaluate expressions\n")

(display "\nTesting workflows:\n")
(display "  1. Create base terms with (term ...)\n")
(display "  2. Apply metafunctions to see results\n")
(display "  3. Use redex-match to verify well-formedness\n")
(display "  4. Build up complex scenarios incrementally\n")

(display "\n=== READY FOR INTERACTIVE EXPLORATION! ===\n")
(display "Load this file in DrRacket and experiment in the interactions pane below.\n")