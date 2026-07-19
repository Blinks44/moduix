# Editable

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/editable
- Chakra UI: https://chakra-ui.com/docs/components/editable

## Purpose

`Editable` is the moduix wrapper around Ark UI's in-place text editing primitive for labels,
titles, names, short descriptions, and other values that switch between preview and edit modes.

## Upstream model to preserve

Preserve Ark's `Editable.Root` composition, edit/value state, details-object callbacks, keyboard
commit and revert behavior, `Field` / `Fieldset` context integration, `RootProvider`, and
`asChild` support.

Ark parts exposed by moduix are `Root`, `RootProvider`, `Label`, `Area`, `Input`, `Preview`,
`Control`, `EditTrigger`, `SubmitTrigger`, and `CancelTrigger`. moduix also exports the
`Controls` convenience part, `Context`, `useEditable`, and `useEditableContext`.

## Current behavior contract

- `Editable` is the short root form and maps to `Editable.Root`.
- `value` / `defaultValue` control the text value; `edit` / `defaultEdit` control edit mode.
- `activationMode` defaults to `dblclick` in moduix to reduce accidental edits; pass another Ark
  activation mode when needed.
- `onValueChange`, `onValueCommit`, `onValueRevert`, and `onEditChange` keep Ark detail objects.
- `activationMode`, `submitMode`, `selectOnFocus`, `maxLength`, `autoResize`, `placeholder`,
  `translations`, `ids`, `name`, `form`, `disabled`, `readOnly`, `invalid`, and `required` are
  forwarded directly to Ark.
- The wrapper adds visual styling, stable `data-slot` hooks, and default icons for edit, submit,
  and cancel triggers. The default layout places `Control` to the right of `Area` and centers it
  next to single-line input surfaces; textarea compositions can set
  `--editable-control-align: start` to top-align controls with the multiline surface.

## Anatomy and exported parts

```text
Editable.Root
├─ Editable.Label
├─ Editable.Area
│  ├─ Editable.Input
│  └─ Editable.Preview
├─ Editable.Control or Editable.Controls
│  ├─ Editable.EditTrigger
│  ├─ Editable.SubmitTrigger
│  └─ Editable.CancelTrigger

Editable.RootProvider
└─ same part tree connected to Ark `useEditable()` state
```

| Part                         | `data-slot`               | Notes                                              |
| ---------------------------- | ------------------------- | -------------------------------------------------- |
| `Editable` / `Editable.Root` | `editable-root`           | Root state, form props, callbacks, and a11y.       |
| `Editable.RootProvider`      | `editable-root-provider`  | Connects to `useEditable()` state.                 |
| `Editable.Label`             | `editable-label`          | Accessible label for the input and preview.        |
| `Editable.Area`              | `editable-area`           | Shared visual surface around input and preview.    |
| `Editable.Input`             | `editable-input`          | Managed text input; can render a textarea.         |
| `Editable.Preview`           | `editable-preview`        | Read-mode value or placeholder text.               |
| `Editable.Control`           | `editable-control`        | Optional wrapper for edit, submit, cancel buttons. |
| `Editable.Controls`          | `editable-control`        | Convenience control that swaps default triggers.   |
| `Editable.EditTrigger`       | `editable-edit-trigger`   | Renders a pencil icon when children are omitted.   |
| `Editable.SubmitTrigger`     | `editable-submit-trigger` | Renders a check icon when children are omitted.    |
| `Editable.CancelTrigger`     | `editable-cancel-trigger` | Renders a close icon when children are omitted.    |

Exported values: `Editable`, `useEditable`, and `useEditableContext`.

## Composition

```tsx
import { Editable } from '@moduix/react';

export function NameEditable() {
  return (
    <Editable defaultValue="Layer name">
      <Editable.Label>Name</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
      <Editable.Controls />
    </Editable>
  );
}
```

Controlled usage keeps Ark detail objects:

```tsx
import { Editable } from '@moduix/react';
import { useState } from 'react';

export function ControlledNameEditable() {
  const [value, setValue] = useState('Layer name');

  return (
    <Editable value={value} onValueChange={(details) => setValue(details.value)}>
      <Editable.Label>Name</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
    </Editable>
  );
}
```

Use `Editable.RootProvider` only with state created by moduix `useEditable()`; do not also render
`Editable.Root` for the same state instance.

## Upstream feature coverage

- Basic composition: supported through `Editable`, `Label`, `Area`, `Input`, and `Preview`.
- Controlled value: supported through `value` and `onValueChange`.
- Controlled edit state: supported through `edit` and `onEditChange`.
- Root provider: supported through moduix `useEditable()` and `Editable.RootProvider`.
- Context access and custom controls: supported through moduix `Editable.Context` /
  `useEditableContext()` together with the moduix trigger parts.
- Default controls: `Editable.Controls` swaps the edit trigger for submit and cancel triggers.
- Textarea: supported with `Editable.Input asChild` and a semantic `<textarea />`.
- Field integration: preserved through Ark field context and the moduix `Field` wrapper.
- Guides: `autoResize`, `maxLength`, `activationMode`, `submitMode`, `placeholder`,
  `translations`, `name`, and `form` are forwarded directly to Ark.

## Accessibility and state

Every editable needs an accessible name; prefer `Editable.Label` in the root tree. Ark owns ids,
ARIA wiring, keyboard interactions, focus lifecycle, and outside interaction handling. `Enter`
commits the value, `Escape` reverts it, and textarea composition commits on Cmd/Ctrl + Enter.

Important Ark root props include `ids`, `name`, `form`, `disabled`, `readOnly`, `invalid`,
`required`, `activationMode`, `submitMode`, `selectOnFocus`, `maxLength`, `autoResize`,
`placeholder`, `translations`, `finalFocusEl`, `onValueChange`, `onValueCommit`,
`onValueRevert`, `onEditChange`, `onPointerDownOutside`, `onFocusOutside`, and
`onInteractOutside`.

The shipped CSS uses the data attributes that Ark emits on concrete parts: `data-focus` on
`Label` and `Area`; `data-disabled` on `Area`, `Input`, and `Preview`; `data-readonly` /
`aria-readonly` on read-only controls; `data-invalid` on `Label`, `Input`, and `Preview`;
`data-required` on `Label`; `data-placeholder-shown` on `Area` and `Preview`; and
`data-autoresize` on `Input` and `Preview`.
Ark also exposes `data-scope="editable"` and `data-part` attributes for part-level selectors.

## Defaults and styling

All exported parts accept `className`; Ark parts also support `asChild`. Trigger parts render the
moduix pencil, check, or close icon when `children` is omitted.

Public CSS variables:

- Layout: `--editable-gap`, `--editable-width`, `--editable-max-width`,
  `--editable-area-width`, `--editable-area-height`, `--editable-radius`.
- Text: `--editable-color`, `--editable-font-size`, `--editable-line-height`,
  `--editable-placeholder-color`, `--editable-preview-min-height`.
- Label: `--editable-label-gap`, `--editable-label-color`,
  `--editable-label-color-invalid`, `--editable-label-font-size`,
  `--editable-label-line-height`, `--editable-label-font-weight`.
- Surface: `--editable-bg`, `--editable-border-width`, `--editable-border-style`,
  `--editable-border-color`, `--editable-border-color-invalid`, `--editable-padding-x`,
  `--editable-padding-y`, `--editable-focus-ring-width`, `--editable-focus-ring-color`,
  `--editable-transition`, `--editable-disabled-opacity`.
- Controls: `--editable-control-align`, `--editable-control-gap`, `--editable-trigger-size`,
  `--editable-trigger-bg`, `--editable-trigger-bg-hover`, `--editable-trigger-bg-active`,
  `--editable-trigger-color`, `--editable-trigger-border-width`, `--editable-trigger-border-style`,
  `--editable-trigger-border-color`, `--editable-trigger-radius`,
  `--editable-trigger-icon-size`.
- Textarea: `--editable-textarea-min-height`, `--editable-textarea-resize`.

## Intentional sugar and differences from upstream

moduix adds visual defaults, stable `data-slot` hooks, default trigger icons, right-side control
layout with configurable vertical alignment, `activationMode="dblclick"` on `Editable.Root`, and
`Editable.Controls` for the standard trigger flow. `Editable.Context`, `useEditable`, and
`useEditableContext` are re-exported through moduix for advanced state access. moduix does not add
variants, sizes, callback adapters, or high-level state props over Ark behavior.

## Agent notes

Keep `RootProvider`, `Context`, `useEditable`, and `useEditableContext` aligned with Ark. Do not
style root-level disabled or invalid attributes for `Editable`; Ark emits those states on the
concrete parts. The area invalid border intentionally follows `Input` / `Preview` invalid state
with `:has(...)`. Docs examples must import from `moduix`, not from the component file. Registry source paths are under
`packages/react/src/components/editable`.

## Local changelog

- 2026-07-10: Added `Editable.Controls` for the standard trigger flow and re-exported context
  surfaces through moduix for advanced compositions.
- 2026-07-02: Removed `Editable.Context`, `useEditable`, `useEditableContext`, and duplicate Ark
  type re-exports from the moduix surface. `RootProvider` remains, and advanced state access now
  imports directly from `@ark-ui/react/editable`.
- 2026-06-25: Replaced stale root-state styling guidance with real Ark part attributes, added
  explicit Context docs coverage, and synced editable CSS variable defaults.
- 2026-06-22: Matched the default trigger button size to `--editable-area-height` so single-line
  editable inputs and controls share the same height.
- 2026-06-22: Centered right-side controls by default for single-line editable inputs and added
  `--editable-control-align` for textarea top alignment.
- 2026-06-22: Changed the moduix default activation mode to double-click, aligned controls to the
  right of the editable area, and documented `Input` / `Textarea` as plain controls while inline
  editing belongs to `Editable`.
- 2026-06-22: Added Ark UI `Editable` wrapper, styling hooks, stories, local docs, package exports,
  docs page, and registry metadata.