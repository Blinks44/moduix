# InputGroup

## Upstream reference

- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Ark UI Field: https://ark-ui.com/docs/components/field

Ark UI has no InputGroup primitive. This family combines factory parts with moduix `Input` and `Button`.

## Purpose

`InputGroup` presents one input with inline addons, text, or actions while retaining native input and button behavior.

## Public contract

The flat API is `InputGroup`, `InputGroupAddon`, `InputGroupText`, `InputGroupInput`, and `InputGroupButton`. The root owns visual size context (`md` by default, with `sm` supported); the input remains the owner of value and field state.

## Preservation notes

- Keep explicit child parts instead of prefix/suffix props. Do not add a root role or move value state into the group.
- Preserve Ark Field integration, native form semantics, and Solid's `class` prop.

## Styling and accessibility

The nested input owns its accessible name. Prefer `FieldLabel`; use an explicitly named `role="group"` only when the whole composition needs a group name.