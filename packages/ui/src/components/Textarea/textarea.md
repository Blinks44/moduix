# Textarea

Upstream primitive docs: https://base-ui.com/react/components/field.md

## Purpose

`Textarea` is the default moduix control for multi-line plain text input. It is a thin styled wrapper
over Base UI `Field.Control` that renders one native `<textarea>`, keeps the browser textarea API
intact, and adds stable styling hooks through `data-slot="textarea-root"` plus moduix
`--textarea-*` CSS variables.

Use it for notes, comments, descriptions, and other long-form text. For single-line text input use
`Input`; for labels, descriptions, and validation UI compose it with `Field`.

## Current behavior contract

- Renders one native `<textarea>` element and forwards its ref to that element.
- Accepts native `<textarea>` props plus one moduix wrapper prop: `autoResize`.
- Works standalone or inside `Field`. When used with `Field`, skip `FieldControl`; `Textarea`
  registers with field context directly and receives field state data attributes from Base UI.
- Controlled usage is native React textarea usage: `value` + `onChange`. Uncontrolled usage uses
  `defaultValue`.
- `autoResize` is progressive CSS sugar. In browsers that support `field-sizing: content`, the
  textarea grows with content and the native resize handle is disabled. In browsers without that
  support, the textarea keeps normal sizing behavior.
- The wrapper stays intentionally small: no label prop, no character counter, no resize presets, no
  clear button, and no custom `render` escape hatch.

## Basic usage

Standalone textarea with an explicit label:

```tsx
import { Textarea } from 'moduix';

export function SummaryField() {
  return (
    <label>
      Summary
      <Textarea name="summary" rows={4} placeholder="Add a short release summary" />
    </label>
  );
}
```

With `Field` validation:

```tsx
import { Field, FieldDescription, FieldError, FieldLabel, Textarea } from 'moduix';

export function IssueDetailsField() {
  return (
    <Field validationMode="onBlur">
      <FieldLabel>Details</FieldLabel>
      <FieldDescription>
        Include enough context for the team to reproduce the issue.
      </FieldDescription>
      <Textarea required minLength={10} placeholder="Add at least 10 characters" />
      <FieldError match="valueMissing">Please provide details.</FieldError>
      <FieldError match="tooShort">Enter at least 10 characters.</FieldError>
    </Field>
  );
}
```

Auto-resizing textarea:

```tsx
import { Field, FieldLabel, Textarea } from 'moduix';

export function DescriptionField() {
  return (
    <Field>
      <FieldLabel>Issue description</FieldLabel>
      <Textarea
        autoResize
        name="description"
        placeholder="Start typing a longer description. Height grows with content."
      />
    </Field>
  );
}
```

## Parts

| Part       | Element/primitive   | Purpose                                              |
| ---------- | ------------------- | ---------------------------------------------------- |
| `Textarea` | native `<textarea>` | Styled textarea root with Base UI field integration. |

`Textarea` exposes one public part. It does not provide wrapper shells, sub-parts, `slotProps`, or
extra composition helpers.

## Public props

`Textarea` accepts all native `<textarea>` props plus the moduix wrapper prop below.

| Prop         | Type               | Default | Notes                                                               |
| ------------ | ------------------ | ------- | ------------------------------------------------------------------- |
| `autoResize` | `boolean`          | `false` | Enables CSS auto-resize where `field-sizing: content` is supported. |
| `className`  | native `className` | —       | Merged with the moduix root class.                                  |

Exported helper types:

- `TextareaProps`

Important native passthrough props remain available, including:

- `value`, `defaultValue`, and `onChange`
- `name`, `rows`, `cols`, `placeholder`, `maxLength`, `minLength`, `readOnly`, `disabled`,
  `required`, `spellCheck`, `autoComplete`, `inputMode`, and `enterKeyHint`
- `style`

Unlike moduix `Input`, `Textarea` does **not** expose Base UI `onValueChange`, `htmlSize`, or a
consumer `render` prop. Treat it like a styled native `<textarea>`.

## Styling API

Stable root hooks:

| Hook               | When it exists                                                         | Default moduix CSS   |
| ------------------ | ---------------------------------------------------------------------- | -------------------- |
| `data-slot`        | Always present as `textarea-root`.                                     | Yes                  |
| `data-auto-resize` | Present when `autoResize` is `true`.                                   | Yes                  |
| `disabled`         | Native attribute from the textarea props.                              | Yes                  |
| `readonly`         | Native `readonly` attribute from the textarea props.                   | Yes via `:read-only` |
| `data-disabled`    | Present when disabled through Base UI field state.                     | Yes                  |
| `data-readonly`    | Present when readonly state is reflected through field state.          | Yes                  |
| `data-invalid`     | Present inside `Field` when the current field state is invalid.        | Yes                  |
| `data-valid`       | Present inside `Field` when the current field state is valid.          | No                   |
| `data-dirty`       | Present inside `Field` after the value changes from its initial state. | No                   |
| `data-touched`     | Present inside `Field` after interaction.                              | No                   |
| `data-filled`      | Present inside `Field` when the textarea currently has a value.        | No                   |
| `data-focused`     | Present while focused.                                                 | No                   |

Use `className` for local styling and `--textarea-*` variables for token-level customization. Public
variables from `theme.css`:

| Variable group | Variables                                                                                                                                                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout         | `--textarea-width`, `--textarea-max-width`, `--textarea-min-height`                                                                                                                                                                       |
| Spacing        | `--textarea-padding-x`, `--textarea-padding-y`                                                                                                                                                                                            |
| Typography     | `--textarea-font-size`, `--textarea-line-height`                                                                                                                                                                                          |
| Surface        | `--textarea-bg`, `--textarea-color`, `--textarea-placeholder-color`, `--textarea-radius`, `--textarea-readonly-bg`, `--textarea-readonly-color`                                                                                           |
| Border/focus   | `--textarea-border-width`, `--textarea-border-style`, `--textarea-border-color`, `--textarea-border-color-invalid`, `--textarea-focus-ring-width`, `--textarea-focus-ring-offset`, `--textarea-focus-ring-color`, `--textarea-transition` |
| Interaction    | `--textarea-resize`, `--textarea-disabled-opacity`                                                                                                                                                                                        |

Example:

```css
.notesTextarea {
  --textarea-border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
  --textarea-bg: color-mix(in srgb, var(--color-primary) 5%, transparent);
  --textarea-focus-ring-color: var(--color-primary);
}
```

## UX and accessibility

- Every textarea needs an accessible name. Use a real `<label>`, `FieldLabel`, or `aria-label` for
  compact standalone cases.
- Placeholder text is not a label and should not carry required instructions on its own.
- `disabled` removes the textarea from interaction and form submission. `readOnly` keeps it focusable
  and submittable while preventing edits.
- Prefer native attributes such as `rows`, `maxLength`, `spellCheck`, `autoComplete`, and
  `enterKeyHint` over custom wrapper props when the browser already supports the behavior.
- Use `Field`, `FieldDescription`, and `FieldError` for accessible help text and validation
  messaging.
- Do not combine `autoResize` with custom `resize` styles on the same instance. When auto-resize is
  active in supported browsers, moduix intentionally disables the resize handle.

## Intentional differences from Base UI

- Import from `moduix`, not `@base-ui/react/field`, when you want the library styling contract.
- `Textarea` is a styled native `<textarea>` wrapper, not a re-export of the full Base UI primitive
  surface.
- The local docs intentionally describe the shipped moduix contract instead of re-documenting all
  Base UI `Field` behavior.

## Agent notes

- Preserve the single-root wrapper shape unless a real composition requirement appears.
- Keep `autoResize`, `TextareaProps`, stories, docs examples, and this file synchronized.
- Do not add helper props for counters, autoresize strategies, labels, or validation UI; compose with
  `Field` and adjacent UI instead.
- If new public `--textarea-*` variables are added, register them in `theme.css` and update this
  file.

## Local changelog

- Rewrote the local documentation to describe the shipped moduix `Textarea` API, styling hooks,
  examples, state attributes, and constraints instead of the older Base UI-oriented summary.
- Exported `TextareaProps` for consumer-side typing consistency with adjacent form controls.