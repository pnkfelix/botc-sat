#lang racket

;; Blood on the Clocktower - Core Language Definition
;; PLT Redex model for BOTC game system

(require redex/reduction-semantics
         redex/pict)

(provide (all-defined-out))

;; =============================================================================
;; CORE LANGUAGE SYNTAX
;; =============================================================================

(define-language BOTC
  ;; Role identifiers and types
  [role-id ::= washerwoman librarian investigator chef empath fortune-teller
               undertaker monk ravenkeeper virgin slayer soldier mayor
               butler drunk recluse saint
               poisoner spy scarlet-woman baron
               imp]
  
  [role-type ::= Townsfolk Outsider Minion Demon]
  [alignment ::= good evil]
  
  ;; Player identifiers
  [player-id ::= variable-not-otherwise-mentioned]
  
  ;; Tokens and game entities
  [token ::= (token-name role-id token-id)]
  [token-id ::= townsfolk wrong outsider minion red-herring died-today safe
                no-ability master poisoned is-the-drunk is-the-demon dead]
  
  ;; Numbers and boolean values
  [num ::= natural]
  [bool ::= true false]
  
  ;; Variable patterns for metafunctions
  [nt ::= natural]  ; for n_t style variables
  
  ;; =============================================================================
  ;; GAME STATE STRUCTURES
  ;; =============================================================================
  
  ;; Role definition with constraints and abilities
  [role-def ::= (role role-id role-type alignment
                     (constraints constraint ...)
                     (abilities ability ...)
                     (tokens token-id ...))]
  
  ;; Bag constraints (Baron: +2 Outsiders, Drunk: token substitution)
  [constraint ::= (count-mod role-type num)              ; Baron: (count-mod Outsider 2)
                  (token-sub role-type role-type)        ; Drunk: (token-sub Outsider Townsfolk)
                  (requires-present role-id)             ; Token requires role in game
                  (only-on-type role-type)               ; Token only on specific type
                  (only-on-role role-id)]                ; Token only on specific role
  
  ;; Role abilities as deduction rules
  [ability ::= (ability-name phase frequency 
                            (params param ...)
                            (requires condition ...)
                            (effects effect ...))]
  
  [param ::= (param-name param-type)]
  [param-type ::= player role yes-no num]
  [param-name ::= variable-not-otherwise-mentioned]
  
  [condition ::= (alive player-id)
                 (sober-healthy player-id)
                 (phase-is phase)
                 (not-self player-id player-id)]
  
  [effect ::= (learn-info player-id info-type)
              (place-token player-id token)
              (kill player-id)
              (protect player-id)]
  
  [info-type ::= yes-no role-name count]
  
  ;; Game phases
  [phase ::= SETUP N1 DAWN EVENING NIGHT]
  [frequency ::= once-per-game once-per-night unlimited]
  
  ;; =============================================================================
  ;; GAME STATE
  ;; =============================================================================
  
  ;; Complete game state
  [game-state ::= (game (phase phase)
                        (bag bag-state)
                        (grimoire grimoire-state)
                        (history event ...))]
  
  ;; Bag state: role distribution and physical bag contents
  [bag-state ::= (bag (in-play distribution)
                      (physical distribution)
                      (selected role-id ...))]
  
  [distribution ::= (dist (Townsfolk num) (Outsider num) 
                          (Minion num) (Demon num))]
  
  ;; Grimoire state: player assignments and tokens
  [grimoire-state ::= (grimoire player-state ...)]
  
  [player-state ::= (player player-id role-id alive-status
                           (tokens token ...))]
  
  [alive-status ::= alive (dead ghost-vote)]
  [ghost-vote ::= has-ghost no-ghost]
  
  ;; =============================================================================  
  ;; GAME EVENTS AND TRACES
  ;; =============================================================================
  
  ;; Game events for trace validation
  [event ::= (setup-event player-id role-id)
             (token-event action player-id token phase)
             (ability-event player-id ability-name (args value ...) phase)
             (death-event player-id cause phase)
             (phase-transition phase phase)]
  
  [action ::= add remove]
  [cause ::= execution night-kill ability]
  [value ::= player-id role-id num bool]
  
  ;; =============================================================================
  ;; JUDGMENTS AND RELATIONS
  ;; =============================================================================
  
  ;; Bag legality judgment
  [bag-judgment ::= (bag-legal bag-state (roles role-def ...))]
  
  ;; Token placement legality
  [token-judgment ::= (token-legal token player-state grimoire-state)]
  
  ;; Game state validity
  [state-judgment ::= (valid-state game-state)]
)

;; =============================================================================
;; HELPER FUNCTIONS
;; =============================================================================

;; Extract role type from role definition
(define-metafunction BOTC
  role-type-of : role-def -> role-type
  [(role-type-of (role role-id role-type alignment
                       (constraints constraint ...)
                       (abilities ability ...)
                       (tokens token-id ...)))
   role-type])

;; Extract role alignment  
(define-metafunction BOTC
  alignment-of : role-def -> alignment
  [(alignment-of (role role-id role-type alignment
                       (constraints constraint ...)
                       (abilities ability ...)
                       (tokens token-id ...)))
   alignment])

;; Check if role has specific constraint
(define-metafunction BOTC
  has-constraint : role-def constraint -> bool
  [(has-constraint (role role-id role-type alignment
                         (constraints constraint ...)
                         (abilities ability ...)
                         (tokens token-id ...))
                   constraint_to_find)
   ,(member (term constraint_to_find) (term (constraint ...)))])

;; Get distribution count for role type
(define-metafunction BOTC  
  get-count : distribution role-type -> num
  [(get-count (dist (Townsfolk nt) (Outsider no) (Minion nm) (Demon nd)) Townsfolk) nt]
  [(get-count (dist (Townsfolk nt) (Outsider no) (Minion nm) (Demon nd)) Outsider) no]
  [(get-count (dist (Townsfolk nt) (Outsider no) (Minion nm) (Demon nd)) Minion) nm]
  [(get-count (dist (Townsfolk nt) (Outsider no) (Minion nm) (Demon nd)) Demon) nd])

;; Update distribution count
(define-metafunction BOTC
  update-count : distribution role-type num -> distribution
  [(update-count (dist (Townsfolk nt) (Outsider no) (Minion nm) (Demon nd)) 
                 Townsfolk nnew)
   (dist (Townsfolk nnew) (Outsider no) (Minion nm) (Demon nd))]
  [(update-count (dist (Townsfolk nt) (Outsider no) (Minion nm) (Demon nd)) 
                 Outsider nnew) 
   (dist (Townsfolk nt) (Outsider nnew) (Minion nm) (Demon nd))]
  [(update-count (dist (Townsfolk nt) (Outsider no) (Minion nm) (Demon nd)) 
                 Minion nnew)
   (dist (Townsfolk nt) (Outsider no) (Minion nnew) (Demon nd))]
  [(update-count (dist (Townsfolk nt) (Outsider no) (Minion nm) (Demon nd)) 
                 Demon nnew)
   (dist (Townsfolk nt) (Outsider no) (Minion nm) (Demon nnew))])

;; Check if player is alive in grimoire
(define-metafunction BOTC
  is-alive : player-id grimoire-state -> bool
  [(is-alive player-target 
             (grimoire player-state-1 ... 
                      (player player-target role-id alive (tokens token ...)) 
                      player-state-2 ...))
   true]
  [(is-alive player-target grimoire-state)
   false])

;; Get player's role from grimoire
(define-metafunction BOTC
  player-role : player-id grimoire-state -> role-id
  [(player-role player-id_target
                (grimoire player-state_1 ...
                         (player player-id_target role-id_target alive-status (tokens token ...))
                         player-state_2 ...))
   role-id_target])

;; Count roles of specific type in grimoire
(define-metafunction BOTC
  count-role-type : role-type grimoire-state (roles role-def ...) -> num
  [(count-role-type role-type_target (grimoire) (roles role-def ...))
   0]
  [(count-role-type role-type_target 
                    (grimoire (player player-id role-id alive-status (tokens token ...))
                             player-state ...)
                    (roles role-def_1 ... 
                           (role role-id role-type_target alignment
                                 (constraints constraint ...)
                                 (abilities ability ...)
                                 (tokens token-id ...))
                           role-def_2 ...))
   ,(+ 1 (term (count-role-type role-type_target (grimoire player-state ...) (roles role-def_1 ... role-def_2 ...))))]
  [(count-role-type role-type_target
                    (grimoire (player player-id role-id alive-status (tokens token ...))
                             player-state ...)
                    (roles role-def ...))
   ,(term (count-role-type role-type_target (grimoire player-state ...) (roles role-def ...)))])

;; =============================================================================
;; BASIC TESTING
;; =============================================================================

;; Test basic language constructs
(module+ test
  (require rackunit)
  
  ;; Test role type extraction
  (check-equal? (term (role-type-of (role washerwoman Townsfolk good
                                          (constraints)
                                          (abilities)
                                          (tokens townsfolk wrong))))
                (term Townsfolk))
  
  ;; Test distribution operations
  (check-equal? (term (get-count (dist (Townsfolk 5) (Outsider 1) (Minion 1) (Demon 1)) 
                                 Townsfolk))
                5)
  
  (check-equal? (term (update-count (dist (Townsfolk 5) (Outsider 1) (Minion 1) (Demon 1))
                                   Outsider 2))
                (term (dist (Townsfolk 5) (Outsider 2) (Minion 1) (Demon 1))))
  
  ;; Test grimoire queries  
  (check-equal? (term (is-alive Alice (grimoire (player Alice washerwoman alive (tokens)))))
                #t)
  
  (check-equal? (term (player-role Alice (grimoire (player Alice washerwoman alive (tokens)))))
                (term washerwoman)))

;; Pretty printing for debugging
(define (pretty-print-term term)
  (display (format "~a~n" term)))

;; Export language for other modules
(provide BOTC
         role-type-of alignment-of has-constraint
         get-count update-count 
         is-alive player-role count-role-type)