#lang racket

(require redex/reduction-semantics
         "botc-complete.rkt")

;; Test reduction relation pattern matching

;; Create a simple test that doesn't have demons (won't trigger end game)
(define simple-test-state 
  (term (game night 
              (role-dist (role-def baron Minion (constraints)))
              (bag (role-def baron Minion (constraints)))
              (assignments ((Alice (role-def baron Minion (constraints)) living))))))

(display "Simple night state: ")
(display simple-test-state)
(newline)

(display "Trying night->day reduction: ")
(define result (apply-reduction-relation game--> simple-test-state))
(display result)
(newline)

;; Test the pattern directly
(display "Pattern match test: ")
(display (redex-match BOTC-Game game-state simple-test-state))
(newline)

;; Also test direct application of all-demons-dead function
(display "Testing all-demons-dead? function: ")
(define test-assignments (term (assignments ((Alice (role-def baron Minion (constraints)) living)))))
(display test-assignments)
(newline)
(display "Result: ")
(display (term (all-demons-dead? ,test-assignments)))
(newline)