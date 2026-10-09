# InputGroup

## Upstream reference

- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Ark UI Field: https://ark-ui.com/docs/components/field

Ark UI has no InputGroup primitive. This family combines factory parts with moduix `Input` and `Button`.

## Purpose

`InputGroup` presents one input with inline addons, text, or actions while retaining native input and button behavior.

## Public contract

The flat API is `InputGroup`, `InputGroupAddon`, `InputGroupText`, `InputGroupInput`, `InputGroupButton`, and `InputGroupClearTrigger`. The root owns visual size context (`md` by default, with `sm` supported); the input remains the owner of value and field state.

## Preservation notes

- Keep explicit child parts instead of prefix/suffix props. Do not add a root role or move value state into the group.
- Preserve Ark Field integration, native form semantics, and Solid's `class` prop.

## Styling and accessibility

The nested input owns its accessible name. Prefer `FieldLabel`; use an explicitly named `role="group"` only when the whole composition needs a group name.

## Clear action

`InputGroupClearTrigger` renders the local `CloseButton`, with the same compact hover surface as
Select and Combobox. Its action is 24px (20px in an `xs` group), centered with an 8px end inset.
It inherits the group size and defaults to `type="button"`, a decorative close icon, and
`aria-label="Clear input"`. Explicit `aria-label` or `aria-labelledby` replaces the fallback label.
Children replace the icon; `asChild`, native button refs, events, disabled behavior, and
consumer classes follow `CloseButton`. Solid uses a callback for `asChild`; attach the native
ref inside that callback because Ark factory replacement hosts do not forward the outer ref. The host owns `data-scope="input-group"`,
`data-part="clear-trigger"`, and `data-slot="input-group-clear-trigger"`.

This part does not own value state, clear an input automatically, hide itself, reset a form, or
redirect focus. Handle clearing and focus in the consumer's `onClick`, and render it conditionally
for non-empty values. Set `disabled` explicitly for disabled or read-only fields; actions do not
inherit Field state.

Upstream composition reviewed 2026-10-01: https://ark-ui.com/docs/guides/composition.
This is moduix-owned composition; there is no Ark InputGroup clear primitive.

## Clear action changelog

- 2026-10-01: Added `InputGroupClearTrigger` across React, Solid, Vue, CSS Modules, and Tailwind.

## Style contract (2026-10-03)

The group owns disabled opacity when its input is disabled; its input keeps opacity 1. An outer disabled Field/Fieldset owns opacity instead.