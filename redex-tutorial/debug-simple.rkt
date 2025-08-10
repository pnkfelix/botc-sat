#lang racket

(require redex/reduction-semantics
         "botc-complete.rkt")

;; Test pattern matching directly
(define test-assignment 
  (term (Alice (role-def baron Minion (constraints)) living)))

(display "Testing individual assignment: ")
(display test-assignment)
(newline)

;; Test if it matches player-assignment pattern
(display "Does it match player-assignment? ")
(display (redex-match BOTC-Game player-assignment test-assignment))
(newline)

;; Test a very simple metafunction - try base language
(define-metafunction BOTC
  test-simple-base : any -> bool
  [(test-simple-base any) #t])  ; Catch-all pattern

;; Test a very simple metafunction for extended language
(define-metafunction BOTC-Game
  test-simple : any -> bool
  [(test-simple any) #t])  ; Catch-all pattern

(display "Testing simple metafunction: ")
(display (term (test-simple ,test-assignment)))
(newline)