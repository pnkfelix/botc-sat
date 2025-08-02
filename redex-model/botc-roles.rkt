#lang racket

;; Blood on the Clocktower - Role Definitions
;; PLT Redex model for BOTC role abilities and deduction rules

(require redex/reduction-semantics
         "botc-lang.rkt"
         "botc-validation.rkt")

(provide (all-defined-out))

;; =============================================================================
;; ROLE ABILITY REDUCTION RULES
;; =============================================================================

;; Reduction relation for role ability activation
(define-relation BOTC
  ability-activates ⊆ (game-state × ability × (value ...) × game-state)
  
  ;; Information gathering abilities (Washerwoman, Librarian, Investigator, Chef, Empath)
  ;; These abilities add tokens to the grimoire during setup/night phases
  
  ;; Fortune Teller divination ability
  [(ability-activates (game (phase NIGHT)
                            (bag bag-state)
                            (grimoire grimoire-state_before)
                            (history event ...))
                      (fortune-tell-divine NIGHT once-per-night
                                          (params (target1 player) (target2 player))
                                          (requires (alive fortune-teller) (sober-healthy fortune-teller))
                                          (effects (learn-info fortune-teller yes-no)))
                      (player-id_1 player-id_2)
                      (game (phase NIGHT)
                            (bag bag-state)  
                            (grimoire grimoire-state_after)
                            (history event ... 
                                    (ability-event fortune-teller fortune-tell-divine 
                                                  (args player-id_1 player-id_2) NIGHT))))
   (where grimoire-state_after (process-fortune-teller-divine grimoire-state_before player-id_1 player-id_2))]
  
  ;; Monk protection ability
  [(ability-activates (game (phase NIGHT)
                            (bag bag-state)
                            (grimoire grimoire-state_before)
                            (history event ...))
                      (monk-protect NIGHT once-per-night
                                   (params (target player))
                                   (requires (alive monk) (sober-healthy monk) (not-self monk target))
                                   (effects (protect target)))
                      (player-id_target)
                      (game (phase NIGHT)
                            (bag bag-state)
                            (grimoire (add-token grimoire-state_before player-id_target (token-name monk safe)))
                            (history event ...
                                    (ability-event monk monk-protect (args player-id_target) NIGHT))))]
  
  ;; Slayer shoot ability  
  [(ability-activates (game (phase EVENING)
                            (bag bag-state)
                            (grimoire grimoire-state_before)
                            (history event ...))
                      (slayer-shoot EVENING once-per-game
                                   (params (target player))
                                   (requires (alive slayer) (sober-healthy slayer))
                                   (effects (kill target)))
                      (player-id_target)
                      (game (phase EVENING)
                            (bag bag-state)
                            (grimoire (process-slayer-shoot grimoire-state_before slayer player-id_target))
                            (history event ...
                                    (ability-event slayer slayer-shoot (args player-id_target) EVENING))))]
  
  ;; Poisoner poison ability
  [(ability-activates (game (phase NIGHT)
                            (bag bag-state)
                            (grimoire grimoire-state_before)
                            (history event ...))
                      (poisoner-poison NIGHT once-per-night
                                      (params (target player))
                                      (requires (alive poisoner) (sober-healthy poisoner))
                                      (effects (place-token target (token-name poisoner poisoned))))
                      (player-id_target)
                      (game (phase NIGHT)
                            (bag bag-state)
                            (grimoire (add-token grimoire-state_before player-id_target (token-name poisoner poisoned)))
                            (history event ...
                                    (ability-event poisoner poisoner-poison (args player-id_target) NIGHT))))]
  
  ;; Imp kill ability
  [(ability-activates (game (phase NIGHT)
                            (bag bag-state)
                            (grimoire grimoire-state_before)
                            (history event ...))
                      (imp-kill NIGHT once-per-night
                               (params (target player))
                               (requires (alive imp) (sober-healthy imp))
                               (effects (kill target)))
                      (player-id_target)
                      (game (phase NIGHT)
                            (bag bag-state)
                            (grimoire (add-token grimoire-state_before player-id_target (token-name imp dead)))
                            (history event ...
                                    (ability-event imp imp-kill (args player-id_target) NIGHT))))])

;; =============================================================================
;; ROLE ABILITY PROCESSING FUNCTIONS
;; =============================================================================

;; Add a token to a player in the grimoire
(define-metafunction BOTC
  add-token : grimoire-state player-id token -> grimoire-state
  [(add-token (grimoire player-state_1 ...
                       (player player-id_target role-id alive-status (tokens token_old ...))
                       player-state_2 ...)
             player-id_target
             token_new)
   (grimoire player-state_1 ...
            (player player-id_target role-id alive-status (tokens token_old ... token_new))
            player-state_2 ...)])

;; Remove a token from a player in the grimoire (simplified for now)
(define-metafunction BOTC
  remove-token : grimoire-state player-id token -> grimoire-state
  [(remove-token grimoire-state player-id token)
   ;; For now, just return the grimoire unchanged
   ;; Full implementation would actually remove the token
   grimoire-state])

;; Kill a player (set to dead status)
(define-metafunction BOTC
  kill-player : grimoire-state player-id -> grimoire-state
  [(kill-player (grimoire player-state_1 ...
                         (player player-id_target role-id alive (tokens token ...))
                         player-state_2 ...)
               player-id_target)
   (grimoire player-state_1 ...
            (player player-id_target role-id (dead no-ghost) (tokens token ...))
            player-state_2 ...)])

;; Process Fortune Teller divination (simplified - just records the targets)
(define-metafunction BOTC
  process-fortune-teller-divine : grimoire-state player-id player-id -> grimoire-state
  [(process-fortune-teller-divine grimoire-state player-id_1 player-id_2)
   ;; For now, just return the grimoire unchanged - in full implementation,
   ;; this would determine the yes/no result based on demon status and red herring
   grimoire-state])

;; Process Slayer shoot (kill target if demon, kill slayer if not)
(define-metafunction BOTC
  process-slayer-shoot : grimoire-state player-id player-id -> grimoire-state
  [(process-slayer-shoot grimoire-state slayer-id target-id)
   ;; Simplified: assume target is not demon, so slayer dies
   ;; Full implementation would check target's role
   (add-token (kill-player grimoire-state slayer-id) 
             slayer-id (token-name slayer no-ability))])

;; =============================================================================
;; ROLE DEFINITIONS FOR TROUBLE BREWING
;; =============================================================================

;; Define all Trouble Brewing roles with their constraints and abilities

;; Townsfolk roles
(define washerwoman-role
  (term (role washerwoman Townsfolk good
              (constraints)
              (abilities (washerwoman-info SETUP once-per-game
                                          (params)
                                          (requires (sober-healthy washerwoman))
                                          (effects (place-token player1 (token-name washerwoman townsfolk))
                                                  (place-token player2 (token-name washerwoman wrong)))))
              (tokens townsfolk wrong))))

(define librarian-role
  (term (role librarian Townsfolk good
              (constraints)
              (abilities (librarian-info SETUP once-per-game
                                        (params)
                                        (requires (sober-healthy librarian))
                                        (effects (place-token player1 (token-name librarian outsider))
                                                (place-token player2 (token-name librarian wrong)))))
              (tokens outsider wrong))))

(define investigator-role
  (term (role investigator Townsfolk good
              (constraints)
              (abilities (investigator-info SETUP once-per-game
                                           (params)
                                           (requires (sober-healthy investigator))
                                           (effects (place-token player1 (token-name investigator minion))
                                                   (place-token player2 (token-name investigator wrong)))))
              (tokens minion wrong))))

(define chef-role
  (term (role chef Townsfolk good
              (constraints)
              (abilities (chef-info SETUP once-per-game
                                   (params)
                                   (requires (sober-healthy chef))
                                   (effects (learn-info chef count))))
              (tokens))))

(define empath-role
  (term (role empath Townsfolk good
              (constraints)
              (abilities (empath-info NIGHT once-per-night
                                     (params)
                                     (requires (alive empath) (sober-healthy empath))
                                     (effects (learn-info empath count))))
              (tokens))))

(define fortune-teller-role
  (term (role fortune-teller Townsfolk good
              (constraints)
              (abilities (fortune-tell-divine NIGHT once-per-night
                                             (params (target1 player) (target2 player))
                                             (requires (alive fortune-teller) (sober-healthy fortune-teller))
                                             (effects (learn-info fortune-teller yes-no))))
              (tokens red-herring))))

(define undertaker-role
  (term (role undertaker Townsfolk good
              (constraints)
              (abilities (undertaker-info NIGHT once-per-night
                                         (params)
                                         (requires (alive undertaker) (sober-healthy undertaker))
                                         (effects (learn-info undertaker role-name))))
              (tokens died-today))))

(define monk-role
  (term (role monk Townsfolk good
              (constraints)
              (abilities (monk-protect NIGHT once-per-night
                                      (params (target player))
                                      (requires (alive monk) (sober-healthy monk) (not-self monk target))
                                      (effects (protect target))))
              (tokens safe))))

(define ravenkeeper-role
  (term (role ravenkeeper Townsfolk good
              (constraints)
              (abilities (ravenkeeper-info NIGHT once-per-game
                                          (params (target player))
                                          (requires (not (alive ravenkeeper)))
                                          (effects (learn-info ravenkeeper role-name))))
              (tokens))))

(define virgin-role
  (term (role virgin Townsfolk good
              (constraints)
              (abilities (virgin-trigger EVENING once-per-game
                                        (params (nominator player))
                                        (requires (alive virgin))
                                        (effects (kill nominator))))
              (tokens no-ability))))

(define slayer-role
  (term (role slayer Townsfolk good
              (constraints)
              (abilities (slayer-shoot EVENING once-per-game
                                      (params (target player))
                                      (requires (alive slayer) (sober-healthy slayer))
                                      (effects (kill target))))
              (tokens no-ability))))

(define soldier-role
  (term (role soldier Townsfolk good
              (constraints)
              (abilities)
              (tokens))))

(define mayor-role
  (term (role mayor Townsfolk good  
              (constraints)
              (abilities (mayor-redirect NIGHT unlimited
                                        (params (attack-target player))
                                        (requires (alive mayor))
                                        (effects)))
              (tokens))))

;; Outsider roles
(define butler-role
  (term (role butler Outsider good
              (constraints)
              (abilities (butler-choose NIGHT once-per-night
                                       (params (master player))
                                       (requires (alive butler) (not-self butler master))
                                       (effects (place-token master (token-name butler master)))))
              (tokens master))))

(define drunk-role
  (term (role drunk Outsider good
              (constraints (token-sub Outsider Townsfolk))
              (abilities)
              (tokens is-the-drunk))))

(define recluse-role
  (term (role recluse Outsider good
              (constraints)
              (abilities)
              (tokens))))

(define saint-role
  (term (role saint Outsider good
              (constraints)
              (abilities)
              (tokens))))

;; Minion roles  
(define poisoner-role
  (term (role poisoner Minion evil
              (constraints)
              (abilities (poisoner-poison NIGHT once-per-night
                                         (params (target player))
                                         (requires (alive poisoner) (sober-healthy poisoner))
                                         (effects (place-token target (token-name poisoner poisoned)))))
              (tokens poisoned))))

(define spy-role
  (term (role spy Minion evil
              (constraints)
              (abilities (spy-grimoire NIGHT once-per-night
                                     (params)
                                     (requires (alive spy))
                                     (effects)))
              (tokens))))

(define scarlet-woman-role
  (term (role scarlet-woman Minion evil
              (constraints)
              (abilities (scarlet-woman-transform NIGHT once-per-game
                                                 (params)
                                                 (requires (not (alive demon)))
                                                 (effects)))
              (tokens is-the-demon))))

(define baron-role
  (term (role baron Minion evil
              (constraints (count-mod Townsfolk -2) (count-mod Outsider 2))
              (abilities)
              (tokens))))

;; Demon role
(define imp-role
  (term (role imp Demon evil
              (constraints)
              (abilities (imp-kill NIGHT once-per-night
                                  (params (target player))
                                  (requires (alive imp) (sober-healthy imp))
                                  (effects (kill target))))
              (tokens dead))))

;; Complete Trouble Brewing role set
(define trouble-brewing-roles
  (list washerwoman-role librarian-role investigator-role chef-role empath-role
        fortune-teller-role undertaker-role monk-role ravenkeeper-role virgin-role
        slayer-role soldier-role mayor-role
        butler-role drunk-role recluse-role saint-role
        poisoner-role spy-role scarlet-woman-role baron-role
        imp-role))

;; =============================================================================
;; ROLE ABILITY INFERENCE RULES
;; =============================================================================

;; Deduction rules for role abilities (Gentzen-style natural deduction)

;; Information gathering rule: If a role has sober+healthy info ability, 
;; it can derive information tokens
(define-judgment-form BOTC
  #:mode (can-learn-info I I I I)
  #:contract (can-learn-info role-id phase grimoire-state (role-def ...))
  
  [(where (role role-id-target role-type alignment (constraints constraint ...) 
                (abilities ability-1 ... 
                          (ability-name-target phase-target frequency
                                              (params param ...)
                                              (requires (alive role-id-target) (sober-healthy role-id-target) condition ...)
                                              (effects (learn-info role-id-target info-type) effect ...))
                          ability-2 ...)
                (tokens token-id ...)) 
          (lookup-role role-id-target (role-def ...)))
   (where true (is-alive role-id-target grimoire-state))
   (is-sober-healthy role-id-target grimoire-state)
   ------------------------------------------------------------------------------- "Info-Ability"
   (can-learn-info role-id-target phase-target grimoire-state (role-def ...))])

;; Check if a player is sober and healthy (not drunk or poisoned)
(define-judgment-form BOTC
  #:mode (is-sober-healthy I I)
  #:contract (is-sober-healthy player-id grimoire-state)
  
  ;; Player is sober and healthy if they don't have drunk or poisoned tokens
  [(where (grimoire player-state-1 ... 
                   (player player-id-target role-id alive-status (tokens token ...))
                   player-state-2 ...) grimoire-state)
   (not-drunk-or-poisoned (token ...))
   ------------------------------------------------------------------------------- "Sober-Healthy"
   (is-sober-healthy player-id-target grimoire-state)])

;; Check that token list doesn't contain drunk or poisoned tokens
(define-judgment-form BOTC
  #:mode (not-drunk-or-poisoned I)
  #:contract (not-drunk-or-poisoned (token ...))
  
  [------------------------------------------------------------------------------- "No-Tokens"
   (not-drunk-or-poisoned ())]
  
  [(not-drunk-or-poisoned (token ...))
   (where false (is-impairment-token token-first))
   ------------------------------------------------------------------------------- "Not-Impaired"
   (not-drunk-or-poisoned (token-first token ...))])

;; Check if a token represents drunkenness or poisoning
(define-metafunction BOTC
  is-impairment-token : token -> bool
  [(is-impairment-token (token-name role-id is-the-drunk)) true]
  [(is-impairment-token (token-name role-id poisoned)) true]
  [(is-impairment-token token) false])

;; =============================================================================
;; TESTING
;; =============================================================================

(module+ test
  (require rackunit)
  
  ;; Test role definition structure
  (check-equal? (term (role-type-of ,washerwoman-role)) (term Townsfolk))
  (check-equal? (term (alignment-of ,imp-role)) (term evil))
  
  ;; Test constraint presence
  (check-equal? (term (has-constraint ,baron-role (count-mod Outsider 2))) #t)
  (check-equal? (term (has-constraint ,drunk-role (token-sub Outsider Townsfolk))) #t)
  
  ;; Test token manipulation
  (define test-grimoire
    (term (grimoire (player Alice washerwoman alive (tokens))
                    (player Bob imp alive (tokens)))))
  
  (define test-token (term (token-name washerwoman townsfolk)))
  
  (check-equal? (term (add-token ,test-grimoire Alice ,test-token))
                (term (grimoire (player Alice washerwoman alive (tokens (token-name washerwoman townsfolk)))
                                (player Bob imp alive (tokens)))))
  
  ;; Test sober/healthy status  
  (define healthy-grimoire
    (term (grimoire (player Alice washerwoman alive (tokens)))))
  
  (define poisoned-grimoire  
    (term (grimoire (player Alice washerwoman alive (tokens (token-name poisoner poisoned))))))
  
  (check-pred (lambda (x) (judgment-holds (is-sober-healthy Alice ,healthy-grimoire))) #t)
  (check-pred (lambda (x) (not (judgment-holds (is-sober-healthy Alice ,poisoned-grimoire)))) #t)
  
  ;; Test ability inference
  (check-pred (lambda (x) (judgment-holds (can-learn-info washerwoman SETUP ,healthy-grimoire ,trouble-brewing-roles))) #t))

;; Export role definitions and functions
(provide trouble-brewing-roles
         ability-activates
         add-token remove-token kill-player
         can-learn-info is-sober-healthy)