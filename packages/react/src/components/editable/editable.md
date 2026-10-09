# Editable

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/editable
- Chakra UI: https://chakra-ui.com/docs/components/editable

## Purpose

`Editable` is the moduix wrapper around Ark UI's in-place text editing primitive for labels,
titles, names, short descriptions, and other values that switch between preview and edit modes.

## Upstream model to preserve

Preserve Ark's `Editable` composition, edit/value state, details-object callbacks, keyboard
commit and revert behavior, `Field` / `Fieldset` context integration, `EditableRootProvider`, and
`asChild` support.

Ark parts exposed by moduix are `Editable`, `EditableRootProvider`, `EditableLabel`,
`EditableArea`, `EditableInput`, `EditablePreview`, `EditableControl`, `EditableEditTrigger`,
`EditableSubmitTrigger`, and `EditableCancelTrigger`. moduix also exports the
`EditableControls` convenience part, `EditableContext`, `useEditable`, and `useEditableContext`.

## Current behavior contract

- `Editable` is the public root component.
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
  `--moduix-editable-control-align: start` to top-align controls with the multiline surface.
- `EditableControls` forwards its ref to the underlying `EditableControl` element.

## Anatomy and exported parts

```text
Editable
├─ EditableLabel
├─ EditableArea
│  ├─ EditableInput
│  └─ EditablePreview
├─ EditableControl or EditableControls
│  ├─ EditableEditTrigger
│  ├─ EditableSubmitTrigger
│  └─ EditableCancelTrigger

EditableRootProvider
└─ same part tree connected to Ark `useEditable()` state
```

| Part                    | `data-slot`               | Notes                                                      |
| ----------------------- | ------------------------- | ---------------------------------------------------------- |
| `Editable`              | `editable-root`           | Root state, form props, callbacks, and a11y.               |
| `EditableRootProvider`  | `editable-root-provider`  | Connects to `useEditable()` state.                         |
| `EditableLabel`         | `editable-label`          | Visible label for the input and preview.                   |
| `EditableArea`          | `editable-area`           | Shared visual surface around input and preview.            |
| `EditableInput`         | `editable-input`          | Managed text input; can render a textarea.                 |
| `EditablePreview`       | `editable-preview`        | Read-mode value or placeholder text.                       |
| `EditableControl`       | `editable-control`        | Optional wrapper for edit, submit, cancel buttons.         |
| `EditableControls`      | `editable-control`        | Convenience control that swaps triggers and forwards refs. |
| `EditableEditTrigger`   | `editable-edit-trigger`   | Renders a pencil icon when children are omitted.           |
| `EditableSubmitTrigger` | `editable-submit-trigger` | Renders a check icon when children are omitted.            |
| `EditableCancelTrigger` | `editable-cancel-trigger` | Renders a close icon when children are omitted.            |

Exported values: `Editable`, `EditableRootProvider`, `EditableLabel`, `EditableArea`,
`EditableInput`, `EditablePreview`, `EditableControl`, `EditableEditTrigger`,
`EditableSubmitTrigger`, `EditableCancelTrigger`, `EditableControls`, `EditableContext`,
`useEditable`, and `useEditableContext`.

## Composition

```tsx
import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/react/editable';

export function NameEditable() {
  return (
    <Editable defaultValue="Layer name">
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  );
}
```

Controlled usage keeps Ark detail objects:

```tsx
import {
  Editable,
  EditableArea,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/react/editable';
import { useState } from 'react';

export function ControlledNameEditable() {
  const [value, setValue] = useState('Layer name');

  return (
    <Editable value={value} onValueChange={(details) => setValue(details.value)}>
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
    </Editable>
  );
}
```

Use `EditableRootProvider` only with state created by moduix `useEditable()`; do not also render
`Editable` for the same state instance.

## Upstream feature coverage

- Basic composition: supported through `Editable`, `EditableLabel`, `EditableArea`,
  `EditableInput`, and `EditablePreview`.
- Controlled value: supported through `value` and `onValueChange`.
- Controlled edit state: supported through `edit` and `onEditChange`.
- Root provider: supported through moduix `useEditable()` and `EditableRootProvider`.
- Context access and custom controls: supported through moduix `EditableContext` /
  `useEditableContext()` together with the moduix trigger parts.
- Default controls: `EditableControls` swaps the edit trigger for submit and cancel triggers.
- Textarea: supported with `EditableInput asChild` and a semantic `<textarea />`.
- Field integration: preserved through Ark field context and the moduix `Field` wrapper.
- Guides: `autoResize`, `maxLength`, `activationMode`, `submitMode`, `placeholder`,
  `translations`, `name`, and `form` are forwarded directly to Ark.

## Accessibility and state

Every editable has Ark's default accessible input name; set `translations.input` when it needs a
contextual name. `EditableLabel` remains the visible label in the root tree. Ark owns ids, ARIA
wiring, keyboard interactions, focus lifecycle, and outside interaction handling. `Enter` commits
the value, `Escape` reverts it, and textarea composition commits on Cmd/Ctrl + Enter.

Important Ark root props include `ids`, `name`, `form`, `disabled`, `readOnly`, `invalid`,
`required`, `activationMode`, `submitMode`, `selectOnFocus`, `maxLength`, `autoResize`,
`placeholder`, `translations`, `finalFocusEl`, `onValueChange`, `onValueCommit`,
`onValueRevert`, `onEditChange`, `onPointerDownOutside`, `onFocusOutside`, and
`onInteractOutside`.

The shipped CSS uses the data attributes that Ark emits on concrete parts: `data-focus` on
`EditableLabel` and `EditableArea`; `data-disabled` on `EditableArea`, `EditableInput`, and
`EditablePreview`; `data-readonly` / `aria-readonly` on read-only controls; `data-invalid` on
`EditableLabel`, `EditableInput`, and `EditablePreview`; `data-required` on `EditableLabel`;
`data-placeholder-shown` on `EditableArea` and `EditablePreview`; and `data-autoresize` on
`EditableInput` and `EditablePreview`.
Ark also exposes `data-scope="editable"` and `data-part` attributes for part-level selectors.

## Defaults and styling

The editable area and its square edit trigger share the `--moduix-size-md` baseline; the area uses `--moduix-spacing-1` block padding.

All exported parts accept `className`; Ark parts also support `asChild`. Trigger parts render the
moduix pencil, check, or close icon when `children` is omitted.

Public CSS variables:

- Layout: `--moduix-editable-gap`, `--moduix-editable-width`, `--moduix-editable-max-width`,
  `--moduix-editable-area-width`, `--moduix-editable-area-height`, `--moduix-editable-radius`.
- Text: `--moduix-editable-color`, `--moduix-editable-font-size`, `--moduix-editable-line-height`,
  `--moduix-editable-placeholder-color`, `--moduix-editable-preview-min-height`.
- Label: `--moduix-editable-label-gap`, `--moduix-editable-label-color`,
  `--moduix-editable-label-color-invalid`, `--moduix-editable-label-font-size`,
  `--moduix-editable-label-line-height`, `--moduix-editable-label-font-weight`.
- Surface: `--moduix-editable-bg`, `--moduix-editable-border-width`, `--moduix-editable-border-style`,
  `--moduix-editable-border-color`, `--moduix-editable-border-color-invalid`, `--moduix-editable-padding-x`,
  `--moduix-editable-padding-y`, `--moduix-editable-focus-ring-width`, `--moduix-editable-focus-ring-color`,
  `--moduix-editable-transition`, `--moduix-editable-disabled-opacity`.
- Controls: `--moduix-editable-control-align`, `--moduix-editable-control-gap`, `--moduix-editable-trigger-size`,
  `--moduix-editable-trigger-bg`, `--moduix-editable-trigger-bg-hover`, `--moduix-editable-trigger-bg-active`,
  `--moduix-editable-trigger-color`, `--moduix-editable-trigger-border-width`, `--moduix-editable-trigger-border-style`,
  `--moduix-editable-trigger-border-color`, `--moduix-editable-trigger-radius`,
  `--moduix-editable-trigger-icon-size`.
- Textarea: `--moduix-editable-textarea-min-height`, `--moduix-editable-textarea-resize`.

## Intentional sugar and differences from upstream

moduix adds visual defaults, stable `data-slot` hooks, default trigger icons, right-side control
layout with configurable vertical alignment, `activationMode="dblclick"` on `Editable`, and
`EditableControls` for the standard trigger flow. `EditableContext`, `useEditable`, and
`useEditableContext` are re-exported through moduix for advanced state access. moduix does not add
variants, sizes, callback adapters, or high-level state props over Ark behavior.

## Agent notes

Keep `EditableRootProvider`, `EditableContext`, `useEditable`, and `useEditableContext` aligned with Ark. Do not
style root-level disabled or invalid attributes for `Editable`; Ark emits those states on the
concrete parts. The area invalid border intentionally follows `Input` / `Preview` invalid state
with `:has(...)`. Docs examples must import from `moduix`, not from the component file. Registry source paths are under
`packages/react/src/components/editable`.

## Local changelog

- 2026-07-27: Made `EditableControls` ref-compatible with `EditableControl`, added focused
  interaction coverage, and kept public examples self-contained for forms and state variants.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Aligned the editable area and its square trigger to `--moduix-size-md` and compacted area padding.

- 2026-07-10: Added `EditableControls` for the standard trigger flow and re-exported context
  surfaces through moduix for advanced compositions.
- 2026-06-25: Replaced stale root-state styling guidance with real Ark part attributes, added
  explicit Context docs coverage, and synced editable CSS variable defaults.
- 2026-06-22: Matched the default trigger button size to `--moduix-editable-area-height` so single-line
  editable inputs and controls share the same height.
- 2026-06-22: Centered right-side controls by default for single-line editable inputs and added
  `--moduix-editable-control-align` for textarea top alignment.
- 2026-06-22: Changed the moduix default activation mode to double-click, aligned controls to the
  right of the editable area, and documented `Input` / `Textarea` as plain controls while inline
  editing belongs to `Editable`.
- 2026-06-22: Added Ark UI `Editable` wrapper, styling hooks, stories, local docs, package exports,
  docs page, and registry metadata.