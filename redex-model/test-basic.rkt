#lang racket

;; Basic test file for the PLT Redex BOTC model
;; Tests that all modules load and basic functionality works

(require redex/reduction-semantics
         "botc-lang.rkt"
         "botc-validation.rkt"
         "botc-roles.rkt")

(provide (all-defined-out))

;; Test that basic language constructs work
(module+ test
  (require rackunit)
  
  (display "Testing PLT Redex BOTC Model...\n")
  
  ;; Test basic metafunctions
  (check-equal? (term (get-count (dist (Townsfolk 5) (Outsider 1) (Minion 1) (Demon 1)) 
                                 Townsfolk))
                5
                "get-count should work")
  
  ;; Test role type extraction
  (check-equal? (term (role-type-of ,washerwoman-role))
                (term Townsfolk)
                "Role type extraction should work")
  
  ;; Test base setup calculations
  (check-equal? (term (base-setup 7))
                (term (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1)))
                "Base setup for 7 players should be correct")
  
  ;; Test that role definitions are well-formed
  (check-pred list? trouble-brewing-roles "Trouble Brewing roles should be a list")
  (check-equal? (length trouble-brewing-roles) 20 "Should have 20 Trouble Brewing roles")
  
  ;; Test constraint application  
  (define test-dist (term (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1))))
  (check-equal? (term (apply-role-constraints ,test-dist ,baron-role))
                (term (dist (Townsfolk 3) (Outsider 2) (Minion 1) (Demon 1)))
                "Baron constraints should modify distribution")
  
  ;; Test token operations
  (define test-grimoire (term (grimoire (player Alice washerwoman alive (tokens)))))
  (define test-token (term (token-name washerwoman townsfolk)))
  
  (check-equal? (term (add-token ,test-grimoire Alice ,test-token))
                (term (grimoire (player Alice washerwoman alive (tokens (token-name washerwoman townsfolk)))))
                "Token addition should work")
  
  ;; Test player queries
  (check-equal? (term (is-alive Alice ,test-grimoire))
                'true
                "Player should be alive")
  
  (display "All basic tests passed!\n"))

;; Run the tests when this file is executed
(module+ main
  (display "PLT Redex BOTC model loaded successfully!\n"))