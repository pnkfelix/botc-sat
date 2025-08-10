#lang racket

(require redex/reduction-semantics
         "botc-complete.rkt")

;; Test the all-demons-dead function
(define test-assignments 
  (term (assignments ((Alice (role-def baron Minion (constraints)) living)))))

(display "Testing assignments: ")
(display test-assignments)
(newline)

(display "Result of all-demons-dead?: ")
(display (term (all-demons-dead? ,test-assignments)))
(newline)