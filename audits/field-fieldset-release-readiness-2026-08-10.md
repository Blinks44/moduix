# Field and Fieldset release-readiness audit — 2026-08-10

## Sources consulted

- Ark UI Field: <https://ark-ui.com/docs/components/field> (accessed 2026-08-10)
- Ark UI Fieldset: <https://ark-ui.com/docs/components/fieldset> (accessed 2026-08-10)
- Ark UI Forms: <https://ark-ui.com/docs/guides/forms> (accessed 2026-08-10)
- Chakra UI Field: <https://www.chakra-ui.com/docs/components/field> (accessed 2026-08-10)
- shadcn/ui Field: <https://ui.shadcn.com/docs/components/radix/field> (accessed 2026-08-10)

## Comparison

| Source    | Useful observation                                                                               | moduix decision                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Ark UI    | Field and Fieldset own ARIA/state context; Fieldset remains a native `fieldset`.                 | **Required correctness:** preserve all Ark parts, refs, state attributes, `asChild`, and provider/context paths. |
| Chakra UI | Its Field emphasizes a clear label/control/message composition and prominent error feedback.     | **Consumer friction:** give Field and Fieldset error text a semantic weight token.                               |
| shadcn/ui | Its Field examples foreground composed fields and fieldsets, but use a different component tree. | **Intentional difference:** retain Ark part names and context rather than add shadcn aliases.                    |

## Findings and disposition

- **P0:** none. Existing tests confirm native semantics, ARIA links, disabled/invalid state, refs, and provider/context behavior.
- **P1:** long labels, helper text, and error text could overflow narrow Field or Fieldset containers. Fixed with `overflow-wrap: anywhere`, long-content stories, documentation, and new Field `asChild`/ref coverage.
- **P1:** error-text emphasis was not independently themeable. Fixed with `--moduix-field-error-font-weight` and `--moduix-fieldset-error-text-font-weight` and synchronized CSS-variable references.
- **P2:** do not add Chakra orientation props or shadcn aliases; explicit layout composition preserves the smaller Ark-shaped API.

## Release decision

Ready when focused tests, registry generation, and repository validation pass. No API migration is required.