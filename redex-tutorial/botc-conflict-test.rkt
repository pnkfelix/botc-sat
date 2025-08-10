#lang racket

;; Test exact scenario from BOTC file that caused issues

(require redex/reduction-semantics)

;; Minimal reproduction of BOTC language structure
(define-language BOTC-Test
  [role-name ::= baron washerwoman]
  [role-type ::= Townsfolk Minion] 
  [constraint ::= (add-outsiders natural)]
  [role ::= (role-def role-name role-type (constraints constraint ...))]
  [role-distribution ::= (role-dist role ...)]
  
  ;; The problematic pattern variable declarations from our failing case
  [r ::= role]
  ;; Test: What if we declare a pattern variable with the same name as a constructor?
  [role-dist ::= role-distribution]  ; Pattern var same name as constructor in role-distribution rule
  )

;; Test metafunction that failed
(define-metafunction BOTC-Test
  test-apply-constraints : role-distribution -> role
  [(test-apply-constraints (role-dist r)) r]
  [(test-apply-constraints (role-dist r r_1 ...)) r])

;; Create test terms
(define baron-role (term (role-def baron Minion (constraints (add-outsiders 2)))))
(define washerwoman-role (term (role-def washerwoman Townsfolk (constraints))))
(define test-role-dist (term (role-dist ,baron-role ,washerwoman-role)))

(module+ test
  (require rackunit)
  
  (display "Testing exact BOTC conflict scenario...\\n")
  (display (format "baron-role: ~a\\n" baron-role))
  (display (format "test-role-dist: ~a\\n" test-role-dist))
  
  ;; This should work or fail just like in our BOTC file
  (check-equal? (term (test-apply-constraints ,test-role-dist))
                baron-role
                "Should extract first role from distribution")
  
  (display "BOTC conflict test completed!\\n"))