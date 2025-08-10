#lang racket

;; PLT Redex Tutorial: BOTC Bag Validation
;; Step 1: Basic language definition for roles and distributions

(require redex/reduction-semantics)
(provide (all-defined-out))

;; =============================================================================
;; LANGUAGE DEFINITION
;; =============================================================================

(define-language BOTC
  ;; Basic role types in BOTC
  [role-type ::= Townsfolk Outsider Minion Demon]
  
  ;; Individual role names (simplified set for tutorial)
  [role-name ::= washerwoman chef imp baron drunk]
  
  ;; Numbers for counting
  [num ::= natural]
  
  ;; Distribution: how many of each type
  [distribution ::= (dist (Townsfolk num) (Outsider num) (Minion num) (Demon num))]
  
  ;; Role constraints that affect bag setup
  [constraint ::= (add-outsiders num)     ; Baron adds outsiders
                  (token-substitution)]    ; Drunk changes bag contents
  
  ;; A role definition
  [role ::= (role role-name role-type (constraints constraint ...))]
  
  ;; A bag is a list of selected roles
  [bag ::= (bag role ...)]
  
  ;; Pattern variables for metafunctions (CRITICAL: these enable underscore patterns)
  [n ::= natural]
  [r ::= variable-not-otherwise-mentioned])

;; =============================================================================
;; STEP 1 QUESTION FOR YOU:
;; =============================================================================

;; Before we continue, let me ask: What do you think the `[n ::= natural]` 
;; and `[r ::= variable-not-otherwise-mentioned]` lines do?
;; 
;; Try to guess based on what we learned about PLT Redex pattern matching!

(display "Language defined! Ready for Step 2: Base Setup Rules\n")