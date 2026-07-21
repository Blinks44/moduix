# InputGroup

Upstream docs:

- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Ark UI Field: https://ark-ui.com/docs/components/field
- Chakra UI Input: https://chakra-ui.com/docs/components/input

Ark UI has no `InputGroup` primitive. `InputGroup` is a moduix-owned composition built from Ark
factory elements, the Ark-backed local `Input`, and the local `Button`.

## Purpose

`InputGroup` presents one single-line input with inline addons, text, or actions as one visual
control while preserving the native semantics of the nested input and buttons. It does not provide
preview/edit mode; use `Editable` when text should render read-only first and switch into editing
intentionally.

## Upstream model to preserve

- Use Ark factory elements for standalone polymorphic parts and `asChild`.
- Use the local Ark-backed `Input` for field context, ids, state, and native form behavior.
- Keep inline decoration compositional instead of adding prefix/suffix configuration props.
- Do not invent Ark state machines, callbacks, providers, contexts, or hidden form inputs.

## Current behavior contract

- `InputGroup` is the short root form and maps to `InputGroup.Root`.
- `InputGroup.Root` renders an Ark factory `div`, owns visual size context, and supports
  `asChild`.
- `InputGroup.Input` renders `Input`, inherits group size, and accepts native `onChange(event)`.
- `InputGroup.Addon` and `InputGroup.Text` render Ark factory `span` elements and support `asChild`.
- `InputGroup.Button` renders `Button`, inherits group size, defaults to `variant="ghost"` and
  `type="button"`.
- One `InputGroup.Input` per group is the supported composition.

## Anatomy and exported parts

```text
InputGroup / InputGroup.Root
├─ InputGroup.Addon (optional)
├─ InputGroup.Input
├─ InputGroup.Text (optional)
└─ InputGroup.Button (optional)
```

| Part                             | Stable slot          |
| -------------------------------- | -------------------- |
| `InputGroup` / `InputGroup.Root` | `input-group-root`   |
| `InputGroup.Input`               | `input-group-input`  |
| `InputGroup.Addon`               | `input-group-addon`  |
| `InputGroup.Text`                | `input-group-text`   |
| `InputGroup.Button`              | `input-group-button` |

## Composition

```tsx
import { Field, InputGroup } from '@moduix/react';

export function WorkspaceField() {
  return (
    <Field>
      <Field.Label>Workspace</Field.Label>
      <InputGroup>
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input name="workspace" />
        <InputGroup.Button>Check</InputGroup.Button>
      </InputGroup>
    </Field>
  );
}
```

Use `asChild` only with one semantic child that can receive the part props and ref. The root child
must remain a container; addon/text children should remain presentational.

Use `Editable` instead of composing manual inline editing around `InputGroup.Input`. `InputGroup`
should stay focused on ordinary input composition with addons, text, and actions.

## Upstream feature coverage

- Ark factory composition: supported on root, addon, and text.
- Ark Field integration: inherited by `InputGroup.Input`.
- Ark ref guidance: refs forward to the rendered root, input, addon, text, and button elements.
- Native controlled/uncontrolled input: `value`, `defaultValue`, and `onChange(event)`.
- Field and Fieldset state: invalid, disabled, required, and read-only state reaches the nested
  input through Ark Field context.
- RootProvider, component context hooks, ids, callbacks, and `HiddenInput` do not exist for
  `InputGroup`; those concepts belong to the nested components.
- Chakra-style start/end elements, addons, buttons, and keyboard hints are expressed with explicit
  child composition rather than `startElement`/`endElement` props.
- Preview-first inline editing belongs to `Editable`, not `InputGroup`.

## Accessibility and state

- The nested input owns the accessible name and native form value.
- Prefer `Field.Label`; use `role="group"` plus an accessible name only when the full standalone
  composition needs grouped semantics.
- The input ref targets the real `HTMLInputElement`.
- Root, addon, and text expose `data-scope="input-group"` plus matching `data-part` attributes.
- The nested input keeps Ark Field input state attributes and the grouped `input-group-input` slot.
- The grouped button keeps Button behavior while exposing the grouped `input-group-button` slot.
- Root visuals derive invalid, disabled, and read-only state from the nested input with `:has(...)`.
- Buttons retain native keyboard behavior and default to `type="button"`. They do not inherit the
  disabled state from `Field`; disable each action explicitly when it should be unavailable.

## Defaults and styling

The default `md` group uses `--size-md`; the `sm` variant uses `--size-sm`. The `md` input block padding is `--spacing-1`.

- Group size defaults to `md` and is exposed as `data-size`.
- `className` is supported on every exported part.
- Use stable `data-slot` hooks, `data-scope`/`data-part` on factory parts, Ark field attributes on
  `InputGroup.Input`, native state selectors, and public `--input-group-*` variables.
- The group exposes no Ark runtime CSS variables.

## Intentional sugar and differences from upstream

- There is no upstream Ark primitive; the size context, visual merging, and button defaults are
  moduix sugar.
- Explicit child parts are retained instead of Chakra's `startElement` and `endElement` props.

## Agent notes

- Keep one grouped input per root.
- Keep the root free of a default ARIA role.
- Do not move value state into the group or mirror child state with React state.
- Keep inline edit/read-only examples on `Editable`; do not reintroduce manual edit toggles here.
- Keep `PasswordInput` behavior isolated until its separate Ark Password Input migration.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Normalized the complete group scale to `24/32/36/40/48px` tokens and compacted input
  padding so typography no longer expands a selected size.

- 2026-07-10: Clarified that actions remain independently enabled in disabled fields and added
  disabled/read-only story coverage for the shared shell states.
- 2026-07-03: Simplified the public surface to the `InputGroup.*` namespace API and removed
  duplicate standalone part exports and prop aliases.
- 2026-06-25: Added `InputGroup.Root` and namespace part aliases, aligned factory data attributes,
  and made the grouped button's `input-group-button` slot render on the actual button.
- 2026-06-22: Removed shell focus redirection from `InputGroup`; the root now stays a passive
  composition wrapper and clicks focus only native interactive descendants.
- 2026-06-22: Removed the manual inline editing story and docs path; preview-first editing now
  belongs to `Editable`.
- 2026-06-19: Migrated structural elements to Ark factory composition and the nested input to Ark
  `Field.Input`; added `asChild`; replaced legacy value callbacks with native input events.