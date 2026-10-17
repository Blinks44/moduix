# InputGroup

## Upstream reference

- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Ark UI Field: https://ark-ui.com/docs/components/field

Ark UI has no InputGroup primitive. This family combines factory parts with moduix `Input`,
`Textarea`, `Button`, and `CloseButton`.

## Public contract

The flat API is `InputGroup`, `InputGroupAddon`, `InputGroupText`, `InputGroupInput`,
`InputGroupTextarea`, `InputGroupButton`, and `InputGroupClearTrigger`, plus the `InputGroupSize`
and `InputGroupAddonAlign` types. The root provides
the visual size (`md` by default) as a reactive context; the input owns value and field state. A
local `size` on `InputGroupInput` controls its font and inline padding. `InputGroupTextarea`
renders a borderless `Textarea` with the group font and padding. `align="block"` on
`InputGroupAddon` or `InputGroupText` makes a full-width row above or below the control (DOM order
sets the side) and switches the root to a column; use a regular `Button` inside it.

`InputGroupButton` defaults to `variant="ghost"` and `type="button"` and stretches inside the group
without making it taller. `InputGroupClearTrigger` renders `CloseButton` with a close icon,
`type="button"`, and `aria-label="Clear input"`; explicit `aria-label` or `aria-labelledby`
replaces the fallback, children replace the icon. It does not clear, hide, or focus anything; handle
that in `onClick`. Solid uses a callback for `asChild`; attach the native ref inside that callback
because Ark factory replacement hosts do not forward the outer ref.

## Styling and accessibility

The nested input owns its accessible name. Prefer `FieldLabel`; use an explicitly named
`role="group"` only when the whole composition needs a group name. The group dims once when its
input is disabled; an outer disabled Field or Fieldset dims instead. CSS Modules expose only
`--moduix-input-group-width`, `--moduix-input-group-height`, and `--moduix-input-group-radius`.

## Preservation notes

- Keep explicit child parts instead of prefix/suffix props. Do not add a root role or move value
  state into the group.
- Preserve Ark Field integration, native form semantics, and Solid's `class` prop.