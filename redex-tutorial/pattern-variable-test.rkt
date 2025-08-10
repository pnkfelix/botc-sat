#lang racket

;; Isolated test file to understand PLT Redex pattern variable naming rules

(require redex/reduction-semantics)

;; Test language to experiment with pattern variable names
(define-language TestLang
  ;; Basic non-terminals
  [value ::= number string]
  [expr ::= value (plus expr expr)]
  
  ;; Test different pattern variable declarations
  [n ::= natural]                    ; Single letter
  [v ::= value]                      ; Single letter for value
  [e ::= expr]                       ; Single letter for expr
  
  ;; Test: Can we use dashes in pattern variable names?
  [num-val ::= number]               ; Dash in name
  [expr-val ::= expr]                ; Dash in name
  
  ;; Test: Can we use longer names?
  [expression ::= expr]              ; Longer name
  [numbervalue ::= number]           ; Longer name without dash
  
  ;; Test the exact case that caused issues in BOTC
  [role-dist ::= expr]               ; This was the problematic pattern variable
  
  ;; Now test a potential naming conflict scenario
  [role-distribution ::= (role-dist expr ...)]  ; Non-terminal with similar name
  )

;; Test metafunction with single-character pattern vars
(define-metafunction TestLang
  test-single-char : expr -> value
  [(test-single-char v) v]
  [(test-single-char (plus e_1 e_2)) (plus e_1 e_2)])

;; Test metafunction with dash pattern vars
(define-metafunction TestLang
  test-dash-vars : expr -> value  
  [(test-dash-vars num-val) num-val]
  [(test-dash-vars (plus expr-val_1 expr-val_2)) (plus expr-val_1 expr-val_2)])

;; Test metafunction with longer pattern vars
(define-metafunction TestLang
  test-long-vars : expr -> value
  [(test-long-vars numbervalue) numbervalue]
  [(test-long-vars (plus expression_1 expression_2)) (plus expression_1 expression_2)])

;; Test the problematic pattern: role-dist with underscore
(define-metafunction TestLang  
  test-problematic : expr -> expr
  [(test-problematic role-dist_1) role-dist_1])

;; Test: Does the naming conflict cause issues?
(define-metafunction TestLang
  test-naming-conflict : role-distribution -> expr
  [(test-naming-conflict (role-dist role-dist_1 role-dist_2 ...)) role-dist_1])

;; Test cases
(module+ test
  (require rackunit)
  
  (display "Testing pattern variable naming rules...\\n")
  
  ;; Test single character vars
  (check-equal? (term (test-single-char 42)) 42 "Single char vars should work")
  
  ;; Test dash vars
  (check-equal? (term (test-dash-vars 42)) 42 "Dash vars should work")
  
  ;; Test long vars
  (check-equal? (term (test-long-vars 42)) 42 "Long vars should work")
  
  ;; Test the problematic pattern
  (check-equal? (term (test-problematic 42)) 42 "Role-dist pattern should work")
  
  (display "All pattern variable tests completed!\\n"))