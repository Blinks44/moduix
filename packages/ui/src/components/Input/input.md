# Input

Upstream primitive docs: https://base-ui.com/react/components/input.md

## Purpose

`Input` is the default single-line text control in moduix. It is a thin styled wrapper over Base UI
`Input` that keeps the native `<input>` contract, adds moduix size tokens, and exposes stable
styling hooks through `data-slot="input-root"` and `data-size`.

Use it for plain text-like fields that do not need prefix/suffix layout or specialized formatting.
For grouped affordances use `InputGroup`; for multi-line content use `Textarea`; for numeric parsing
and steppers use `NumberField`.

## Current behavior contract

- Renders one styled native `<input>` element and forwards its ref to that element.
- Accepts Base UI `Input` props except the primitive `size` prop name is reserved for moduix visual
  sizing. The native HTML `size` attribute is available as `htmlSize`.
- Works standalone or inside `Field`. When used with `Field`, skip `FieldControl`; `Input`
  registers with field context directly and receives Base UI validation state attributes.
- Controlled and uncontrolled usage stay unchanged: use `value` + `onValueChange` for controlled
  input, or `defaultValue` for uncontrolled input.
- The wrapper is intentionally small: no built-in label, clear button, prefix/suffix props, loading
  state, masking, or validation UI.

## Basic usage

Standalone input with an explicit label:

```tsx
import { Input } from 'moduix';

export function WorkspaceNameField() {
  return (
    <label>
      Name
      <Input name="workspaceName" placeholder="Acme Maps" />
    </label>
  );
}
```

With `Field` validation:

```tsx
import { Field, FieldDescription, FieldError, FieldLabel, Input } from 'moduix';

export function EmailField() {
  return (
    <Field validationMode="onBlur">
      <FieldLabel>Email</FieldLabel>
      <FieldDescription>We use this for account updates.</FieldDescription>
      <Input required type="email" placeholder="name@example.com" />
      <FieldError match="valueMissing">Please enter your email.</FieldError>
      <FieldError match="typeMismatch">Enter a valid email address.</FieldError>
    </Field>
  );
}
```

With grouped affordances:

```tsx
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from 'moduix';

export function UsernameField() {
  return (
    <InputGroup>
      <InputGroupAddon>@</InputGroupAddon>
      <InputGroupInput aria-label="Username" placeholder="workspace" />
      <InputGroupButton>Check</InputGroupButton>
    </InputGroup>
  );
}
```

## Parts

| Part    | Element/primitive | Purpose                                                              |
| ------- | ----------------- | -------------------------------------------------------------------- |
| `Input` | `InputPrimitive`  | Styled input root with moduix size tokens and Base UI field support. |

`Input` exposes one public part. It does not provide `slotProps`, icon props, prefix/suffix props,
or extra wrapper elements.

## Public props

`Input` accepts Base UI `Input` props plus the moduix wrapper props below.

| Prop        | Type                                   | Default | Notes                                                                           |
| ----------- | -------------------------------------- | ------- | ------------------------------------------------------------------------------- |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  | Visual density only. Sets `data-size` and the size-specific CSS variables.      |
| `htmlSize`  | native `<input size>` value            | —       | Writes the HTML `size` attribute. Use this when you need character-based width. |
| `className` | Base UI `className` prop               | —       | Merged with the moduix root class; callback form from Base UI still works.      |

Exported helper types:

- `InputProps`
- `InputSize`

Important passthrough props remain available from Base UI and the native element, including:

- `value`, `defaultValue`, and `onValueChange`
- native attributes such as `type`, `name`, `placeholder`, `autoComplete`, `inputMode`, `readOnly`,
  `disabled`, `required`, `minLength`, `maxLength`, and `pattern`
- `style` and `render`

Use `render` only when you still preserve input semantics and forward the received props to the
actual input-like element.

## Styling API

Stable root hooks:

| Hook            | When it exists                                                                 |
| --------------- | ------------------------------------------------------------------------------ |
| `data-slot`     | Direct usage writes `data-slot="input-root"`.                                  |
| `data-size`     | Always present with the current moduix visual size.                            |
| `data-disabled` | Present when disabled.                                                         |
| `data-valid`    | Present inside `Field` when the current field state is valid.                  |
| `data-invalid`  | Present inside `Field` when the current field state is invalid.                |
| `data-dirty`    | Present inside `Field` after the value changes from its initial state.         |
| `data-touched`  | Present inside `Field` after interaction.                                      |
| `data-filled`   | Present inside `Field` when the input currently has a value.                   |
| `data-focused`  | Present while focused; useful for composed controls such as field-like shells. |

Use `className` for local styling and `--input-*` variables for token-level customization. Public
variables from `theme.css`:

| Variable group | Variables                                                                                                                                                                                                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout         | `--input-width`, `--input-max-width`, `--input-height`, `--input-height-xs`, `--input-height-sm`, `--input-height-md`, `--input-height-lg`, `--input-height-xl`                                                                                                                                      |
| Spacing        | `--input-padding-x`, `--input-padding-y`, `--input-padding-x-xs`, `--input-padding-y-xs`, `--input-padding-x-sm`, `--input-padding-y-sm`, `--input-padding-x-md`, `--input-padding-y-md`, `--input-padding-x-lg`, `--input-padding-y-lg`, `--input-padding-x-xl`, `--input-padding-y-xl`             |
| Typography     | `--input-font-size`, `--input-line-height`, `--input-font-size-xs`, `--input-line-height-xs`, `--input-font-size-sm`, `--input-line-height-sm`, `--input-font-size-md`, `--input-line-height-md`, `--input-font-size-lg`, `--input-line-height-lg`, `--input-font-size-xl`, `--input-line-height-xl` |
| Surface        | `--input-bg`, `--input-color`, `--input-placeholder-color`, `--input-radius`                                                                                                                                                                                                                         |
| Border/focus   | `--input-border-width`, `--input-border-style`, `--input-border-color`, `--input-border-color-invalid`, `--input-focus-ring-width`, `--input-focus-ring-offset`, `--input-focus-ring-color`, `--input-transition`                                                                                    |
| Disabled       | `--input-disabled-opacity`                                                                                                                                                                                                                                                                           |

Example:

```css
.workspaceInput {
  --input-border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
  --input-bg: color-mix(in srgb, var(--color-primary) 5%, transparent);
  --input-focus-ring-color: var(--color-primary);
  --input-radius: var(--radius-full);
}
```

## UX and accessibility

- Every input needs an accessible name. Use a real `<label>`, `FieldLabel`, or `aria-label` for
  compact cases such as icon-only or demo-only layouts.
- Placeholder text is not a label and should not carry essential instructions on its own.
- `disabled` removes the field from interaction and form submission; `readOnly` keeps it focusable
  and submittable while preventing edits.
- Prefer semantic native attributes (`type`, `autoComplete`, `inputMode`, `enterKeyHint`) over
  custom logic whenever the browser already supports the behavior.
- Use `validationMode="onBlur"` on `Field` for most text inputs; reserve on-change validation for
  cases where immediate feedback materially helps the user.

## Intentional differences from Base UI

- Import from `moduix`, not `@base-ui/react/input`, when you want the library styling contract.
- The wrapper is styled by default and writes `data-slot="input-root"` plus moduix `data-size`.
- moduix `size` is visual only. Native `<input size>` is renamed to `htmlSize`.
- The local docs intentionally describe the moduix wrapper instead of re-documenting the entire Base
  UI primitive API.

## Agent notes

- Preserve the single-root wrapper shape unless a real composition requirement appears.
- Keep `size`, `htmlSize`, CSS variables, stories, and this file synchronized.
- Do not add icon, prefix, suffix, clear, or loading props to `Input`; use `InputGroup` or explicit
  composition instead.
- If new public `--input-*` variables are added, register them in `theme.css` and update this file.

## Local changelog

- Rewrote the local documentation to describe the shipped moduix `Input` API, styling hooks,
  examples, and constraints instead of Base UI reference content.
- Exported `InputProps` and `InputSize` for wrapper authors and consumer-side typing.