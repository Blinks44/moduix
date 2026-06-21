# InputGroup

Upstream docs:

- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Ark UI Field: https://ark-ui.com/docs/components/field
- Chakra UI Input: https://chakra-ui.com/docs/components/input

Ark UI has no `InputGroup` primitive. `InputGroup` is a moduix-owned composition built from Ark
factory elements, the Ark-backed local `Input`, and the local `Button`.

## Purpose

`InputGroup` presents one single-line input with inline addons, text, or actions as one visual
control while preserving the native semantics of the nested input and buttons.

## Upstream model to preserve

- Use Ark factory elements for standalone polymorphic parts and `asChild`.
- Use the local Ark-backed `Input` for field context, ids, state, and native form behavior.
- Keep inline decoration compositional instead of adding prefix/suffix configuration props.
- Do not invent Ark state machines, callbacks, providers, contexts, or hidden form inputs.

## Current behavior contract

- `InputGroup` renders an Ark factory `div`, owns visual size context, and supports `asChild`.
- `InputGroupInput` renders `Input`, inherits group size, and accepts native `onChange(event)`.
- `InputGroupAddon` and `InputGroupText` render Ark factory `span` elements and support `asChild`.
- `InputGroupButton` renders `Button`, inherits group size, defaults to `variant="ghost"` and
  `type="button"`.
- A plain primary-button press on non-interactive shell space focuses the first editable grouped
  input.
- One `InputGroupInput` per group is the supported composition.

## Anatomy and exported parts

```text
InputGroup
├─ InputGroupAddon (optional)
├─ InputGroupInput
├─ InputGroupText (optional)
└─ InputGroupButton (optional)
```

| Part               | Stable slot          |
| ------------------ | -------------------- |
| `InputGroup`       | `input-group-root`   |
| `InputGroupInput`  | `input-group-input`  |
| `InputGroupAddon`  | `input-group-addon`  |
| `InputGroupText`   | `input-group-text`   |
| `InputGroupButton` | `input-group-button` |

## Composition

```tsx
import {
  Field,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@moduix/react';

export function WorkspaceField() {
  return (
    <Field>
      <Field.Label>Workspace</Field.Label>
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput name="workspace" />
        <InputGroupButton>Check</InputGroupButton>
      </InputGroup>
    </Field>
  );
}
```

Use `asChild` only with one semantic child that can receive the part props and ref. The root child
must remain a container; addon/text children should remain presentational.

## Upstream feature coverage

- Ark factory composition: supported on root, addon, and text.
- Ark Field integration: inherited by `InputGroupInput`.
- Native controlled/uncontrolled input: `value`, `defaultValue`, and `onChange(event)`.
- Field and Fieldset state: invalid, disabled, required, and read-only state reaches the nested
  input through Ark Field context.
- RootProvider, component context hooks, ids, callbacks, and `HiddenInput` do not exist for
  `InputGroup`; those concepts belong to the nested components.
- Chakra-style start/end elements, addons, buttons, and keyboard hints are expressed with explicit
  child composition rather than `startElement`/`endElement` props.

## Accessibility and state

- The nested input owns the accessible name and native form value.
- Prefer `Field.Label`; use `role="group"` plus an accessible name only when the full standalone
  composition needs grouped semantics.
- The input ref targets the real `HTMLInputElement`.
- Root visuals derive invalid, disabled, and read-only state from the nested input with `:has(...)`.
- Shell focus redirection skips interactive descendants, modified clicks, disabled inputs, and
  read-only inputs.
- Buttons retain native keyboard behavior and default to `type="button"`.

## Defaults and styling

- Group size defaults to `md` and is exposed as `data-size`.
- `className` is supported on every exported part.
- Use stable `data-slot` hooks, Ark field attributes on `InputGroupInput`, native state selectors,
  and public `--input-group-*` variables.
- The group exposes no Ark runtime CSS variables.

## Intentional sugar and differences from upstream

- There is no upstream Ark primitive; the size context, shell focus redirect, visual merging, and
  button defaults are moduix sugar.
- Explicit child parts are retained instead of Chakra's `startElement` and `endElement` props.
- legacy `onValueChange`, `render`, and callback styling props disappear with the migrated
  `InputGroupInput`.

## Agent notes

- Keep one grouped input per root.
- Keep the root free of a default ARIA role.
- Do not move value state into the group or mirror child state with React state.
- Keep `PasswordInput` behavior isolated until its separate Ark Password Input migration.

## Local changelog

- 2026-06-19: Migrated structural elements to Ark factory composition and the nested input to Ark
  `Field.Input`; added `asChild`; replaced legacy value callbacks with native input events.