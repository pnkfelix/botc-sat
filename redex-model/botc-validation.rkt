#lang racket

;; Blood on the Clocktower - Validation Rules
;; PLT Redex model for BOTC constraint validation

(require redex/reduction-semantics
         "botc-lang.rkt")

(provide (all-defined-out))

;; =============================================================================
;; BAG LEGALITY VALIDATION
;; =============================================================================

;; Base setup distribution for different player counts (Trouble Brewing)
(define-metafunction BOTC
  base-setup : number -> distribution
  [(base-setup 5) (dist (Townsfolk 3) (Outsider 0) (Minion 1) (Demon 1))]
  [(base-setup 6) (dist (Townsfolk 3) (Outsider 1) (Minion 1) (Demon 1))]
  [(base-setup 7) (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1))]
  [(base-setup 8) (dist (Townsfolk 5) (Outsider 1) (Minion 1) (Demon 1))]
  [(base-setup 9) (dist (Townsfolk 5) (Outsider 2) (Minion 1) (Demon 1))]
  [(base-setup 10) (dist (Townsfolk 7) (Outsider 0) (Minion 2) (Demon 1))]
  [(base-setup 11) (dist (Townsfolk 7) (Outsider 1) (Minion 2) (Demon 1))]
  [(base-setup 12) (dist (Townsfolk 7) (Outsider 2) (Minion 2) (Demon 1))]
  [(base-setup 13) (dist (Townsfolk 9) (Outsider 0) (Minion 3) (Demon 1))]
  [(base-setup 14) (dist (Townsfolk 9) (Outsider 1) (Minion 3) (Demon 1))]
  [(base-setup 15) (dist (Townsfolk 9) (Outsider 2) (Minion 3) (Demon 1))])

;; Apply role constraints to base distribution
(define-metafunction BOTC
  apply-constraints : distribution (role-def ...) -> distribution
  [(apply-constraints dist ()) dist]
  [(apply-constraints dist (role-def_1 role-def_2 ...))
   (apply-constraints (apply-role-constraints dist role-def_1) (role-def_2 ...))])

;; Apply constraints from a single role
(define-metafunction BOTC
  apply-role-constraints : distribution role-def -> distribution
  [(apply-role-constraints dist (role role-id role-type alignment
                                      (constraints)
                                      (abilities ability ...)
                                      (tokens token-id ...)))
   dist]
  [(apply-role-constraints dist (role role-id role-type alignment
                                      (constraints (count-mod role-type_target delta) constraint ...)
                                      (abilities ability ...)
                                      (tokens token-id ...)))
   (apply-role-constraints 
    (update-count dist role-type_target 
                  ,(+ (term (get-count dist role-type_target)) (term delta)))
    (role role-id role-type alignment
          (constraints constraint ...)
          (abilities ability ...)
          (tokens token-id ...)))])

;; Check if bag distribution is legal given selected roles
(define-judgment-form BOTC
  #:mode (bag-legal I I)
  #:contract (bag-legal bag-state (role-def ...))
  
  ;; A bag is legal if the in-play distribution matches the expected distribution
  ;; after applying all role constraints, and physical bag accounts for substitutions
  [(where distribution_base (base-setup ,(length (term (role-id ...)))))
   (where distribution_expected (apply-constraints distribution_base (role-def ...)))
   (where distribution_physical (compute-physical-distribution distribution_expected (role-def ...)))
   ------------------------------------------------------------------------------- "Bag-Legal"
   (bag-legal (bag (in-play distribution_expected)
                   (physical distribution_physical) 
                   (selected role-id ...))
              (role-def ...))])

;; Compute physical bag distribution accounting for token substitutions (Drunk)
(define-metafunction BOTC
  compute-physical-distribution : distribution (role-def ...) -> distribution
  [(compute-physical-distribution dist ()) dist]
  [(compute-physical-distribution dist (role-def_1 role-def_2 ...))
   (compute-physical-distribution (apply-physical-substitutions dist role-def_1) (role-def_2 ...))])

;; Apply physical bag substitutions from a role (e.g., Drunk)  
(define-metafunction BOTC
  apply-physical-substitutions : distribution role-def -> distribution
  [(apply-physical-substitutions dist (role role-id role-type alignment
                                           (constraints)
                                           (abilities ability ...)
                                           (tokens token-id ...)))
   dist]
  [(apply-physical-substitutions dist (role role-id role-type alignment
                                           (constraints (token-sub from-type to-type) constraint ...)
                                           (abilities ability ...)
                                           (tokens token-id ...)))
   (apply-physical-substitutions
    (update-count (update-count dist from-type ,(- (term (get-count dist from-type)) 1))
                  to-type ,(+ (term (get-count dist to-type)) 1))
    (role role-id role-type alignment
          (constraints constraint ...)
          (abilities ability ...)
          (tokens token-id ...)))])

;; =============================================================================
;; TOKEN PLACEMENT VALIDATION
;; =============================================================================

;; Check if a token can be legally placed on a player
(define-judgment-form BOTC
  #:mode (token-placement-legal I I I I)
  #:contract (token-placement-legal token player-id grimoire-state (role-def ...))
  
  ;; Information tokens can be placed anywhere if the source role is present
  [(where role-id_source (token-source token-id))
   (role-present role-id_source grimoire-state)
   ------------------------------------------------------------------------------- "Info-Token"
   (token-placement-legal (token-name role-id_source token-id) player-id grimoire-state (role-def ...))]
  
  ;; Type-restricted tokens can only be placed on players of specific role types
  [(where role-id_source (token-source token-id))
   (where role-type_target (token-restriction token-id))
   (role-present role-id_source grimoire-state)
   (player-has-type player-id role-type_target grimoire-state (role-def ...))
   ------------------------------------------------------------------------------- "Type-Restricted-Token"
   (token-placement-legal (token-name role-id_source token-id) player-id grimoire-state (role-def ...))]
  
  ;; Role-specific tokens can only be placed on specific roles
  [(where role-id_source (token-source token-id))
   (where role-id_target (token-role-restriction token-id))
   (role-present role-id_source grimoire-state)
   (player-has-role player-id role-id_target grimoire-state)
   ------------------------------------------------------------------------------- "Role-Specific-Token"
   (token-placement-legal (token-name role-id_source token-id) player-id grimoire-state (role-def ...))])

;; Helper judgments for token placement
(define-judgment-form BOTC
  #:mode (role-present I I)
  #:contract (role-present role-id grimoire-state)
  
  [(where (grimoire player-state_1 ... (player player-id role-id_target alive-status (tokens token ...)) player-state_2 ...) grimoire-state)
   ------------------------------------------------------------------------------- "Role-Present"
   (role-present role-id_target grimoire-state)])

(define-judgment-form BOTC
  #:mode (player-has-role I I I)
  #:contract (player-has-role player-id role-id grimoire-state)
  
  [(where (grimoire player-state_1 ... (player player-id_target role-id_target alive-status (tokens token ...)) player-state_2 ...) grimoire-state)
   ------------------------------------------------------------------------------- "Player-Has-Role"  
   (player-has-role player-id_target role-id_target grimoire-state)])

(define-judgment-form BOTC
  #:mode (player-has-type I I I I)
  #:contract (player-has-type player-id role-type grimoire-state (role-def ...))
  
  [(where role-id_player (player-role player-id grimoire-state))
   (where (role role-id_player role-type_player alignment (constraints constraint ...) (abilities ability ...) (tokens token-id ...)) (lookup-role role-id_player (role-def ...)))
   ------------------------------------------------------------------------------- "Player-Has-Type"
   (player-has-type player-id role-type_player grimoire-state (role-def ...))])

;; Lookup role definition by ID
(define-metafunction BOTC
  lookup-role : role-id (role-def ...) -> role-def
  [(lookup-role role-id_target (role-def_1 ... (role role-id_target role-type alignment (constraints constraint ...) (abilities ability ...) (tokens token-id ...)) role-def_2 ...))
   (role role-id_target role-type alignment (constraints constraint ...) (abilities ability ...) (tokens token-id ...))])

;; Get token source role and restrictions
(define-metafunction BOTC  
  token-source : token-id -> role-id
  [(token-source townsfolk) washerwoman]
  [(token-source wrong) washerwoman] 
  [(token-source outsider) librarian]
  [(token-source minion) investigator]
  [(token-source red-herring) fortune-teller]
  [(token-source died-today) undertaker]
  [(token-source safe) monk]
  [(token-source no-ability) virgin]
  [(token-source master) butler]
  [(token-source poisoned) poisoner]
  [(token-source is-the-drunk) drunk]
  [(token-source is-the-demon) scarlet-woman]
  [(token-source dead) imp])

;; Get token type restrictions (for tokens that can only go on certain role types)
(define-metafunction BOTC
  token-restriction : token-id -> role-type
  [(token-restriction is-the-drunk) Townsfolk]  ; Drunk token only on Townsfolk players
  [(token-restriction red-herring) good])       ; Red herring only on good players

;; Get token role restrictions (for tokens that can only go on specific roles)
(define-metafunction BOTC
  token-role-restriction : token-id -> role-id
  [(token-role-restriction no-ability) virgin]        ; Virgin's no-ability only on virgin
  [(token-role-restriction is-the-demon) scarlet-woman])  ; Scarlet Woman's demon token only on her

;; =============================================================================
;; GRIMOIRE STATE VALIDATION
;; =============================================================================

;; Check if entire grimoire state is valid
(define-judgment-form BOTC
  #:mode (valid-grimoire I I)
  #:contract (valid-grimoire grimoire-state (role-def ...))
  
  ;; Grimoire is valid if all tokens are legally placed and required tokens are present
  [(tokens-legally-placed grimoire-state (role-def ...))
   (required-tokens-present grimoire-state (role-def ...))
   ------------------------------------------------------------------------------- "Valid-Grimoire"
   (valid-grimoire grimoire-state (role-def ...))])

;; Check that all tokens in grimoire are legally placed
(define-judgment-form BOTC
  #:mode (tokens-legally-placed I I)
  #:contract (tokens-legally-placed grimoire-state (role-def ...))
  
  ;; Empty grimoire is trivially valid
  [------------------------------------------------------------------------------- "Empty-Grimoire"
   (tokens-legally-placed (grimoire) (role-def ...))]
  
  ;; Grimoire is valid if first player's tokens are legal and rest of grimoire is valid
  [(all-tokens-legal player-id (token ...) (grimoire (player player-id role-id alive-status (tokens token ...)) player-state ...) (role-def ...))
   (tokens-legally-placed (grimoire player-state ...) (role-def ...))
   ------------------------------------------------------------------------------- "Tokens-Legal-Rec"
   (tokens-legally-placed (grimoire (player player-id role-id alive-status (tokens token ...)) player-state ...) (role-def ...))])

;; Simplified approach - just check individual tokens
(define-judgment-form BOTC
  #:mode (all-tokens-legal I I I I)
  #:contract (all-tokens-legal player-id (token ...) grimoire-state (role-def ...))
  
  ;; Empty token list is trivially legal
  [------------------------------------------------------------------------------- "No-Tokens-Legal"
   (all-tokens-legal player-id () grimoire-state (role-def ...))]
  
  ;; Single token must be legally placed
  [(token-placement-legal token-only player-id grimoire-state (role-def ...))
   ------------------------------------------------------------------------------- "Single-Token-Legal"
   (all-tokens-legal player-id (token-only) grimoire-state (role-def ...))])

;; Check that all required tokens are present (roles that must place tokens)
(define-judgment-form BOTC
  #:mode (required-tokens-present I I)
  #:contract (required-tokens-present grimoire-state (role-def ...))
  
  ;; For now, this is a placeholder - would check roles like Washerwoman that must place tokens
  [------------------------------------------------------------------------------- "Required-Tokens-Placeholder"
   (required-tokens-present grimoire-state (role-def ...))])

;; =============================================================================
;; TESTING
;; =============================================================================

(module+ test
  (require rackunit)
  
  ;; Test base setup calculations
  (check-equal? (term (base-setup 7))
                (term (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1))))
  
  ;; Test Baron constraint application
  (define baron-role 
    (term (role baron Minion evil
                (constraints (count-mod Townsfolk -2) (count-mod Outsider 2))
                (abilities)
                (tokens))))
  
  (check-equal? (term (apply-role-constraints (dist (Townsfolk 5) (Outsider 0) (Minion 1) (Demon 1))
                                             ,baron-role))
                (term (dist (Townsfolk 3) (Outsider 2) (Minion 1) (Demon 1))))
  
  ;; Test token source lookups
  (check-equal? (term (token-source townsfolk)) (term washerwoman))
  (check-equal? (term (token-source poisoned)) (term poisoner))
  
  ;; Test simple grimoire validation
  (define simple-grimoire
    (term (grimoire (player Alice washerwoman alive (tokens))
                    (player Bob imp alive (tokens)))))
  
  (define simple-roles
    (list (term (role washerwoman Townsfolk good (constraints) (abilities) (tokens townsfolk wrong)))
          (term (role imp Demon evil (constraints) (abilities) (tokens dead)))))
  
  (check-pred (lambda (x) (judgment-holds (tokens-legally-placed ,simple-grimoire ,simple-roles)))
              #t))

(provide base-setup apply-constraints 
         bag-legal token-placement-legal valid-grimoire
         token-source lookup-role)