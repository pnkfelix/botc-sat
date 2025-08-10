#lang racket

;; Debug PLT Redex pattern matching issues

(require redex/reduction-semantics
         "botc-lang.rkt")

(provide (all-defined-out))

;; Test role-type-of with a very simple role
(define simple-role (term (role imp Demon evil (constraints) (abilities) (tokens))))

(display "Testing simple role:\n")
(display (format "~a\n" simple-role))

;; Test if this works with role-type-of
(display "Testing role-type-of with simple role:\n")
(display (format "~a\n" (term (role-type-of ,simple-role))))

;; Test the actual washerwoman role
(display "Testing washerwoman role from botc-roles:\n")
(require "botc-roles.rkt")
(display (format "~a\n" (term (role-type-of ,washerwoman-role))))