# OTPField

Upstream primitive docs: https://base-ui.com/react/components/otp-field.md

## Purpose

`OTPField` is the moduix one-time-code input for verification codes, PINs, backup codes, and similar
short multi-character secrets. It is a thin styled wrapper over the Base UI preview OTP field with:

- flat moduix exports instead of the namespaced Base UI preview API;
- a short default path that renders one styled slot per character when `children` is omitted;
- stable styling hooks through `data-slot` and `--otp-field-*` CSS variables.

Use it with `Field` when the code needs label, description, and validation messaging. Use manual
composition only when you need grouped layouts, separators, or per-slot native input props.

## Current behavior contract

- `OTPField` renders `OTPFieldPrimitive.Root` with `data-slot="otp-field-root"` and moduix default
  styles.
- `length` is required. It drives value clamping, completion, generated ids, and the default slot
  rendering path.
- When `children` is omitted, `OTPField` renders exactly `length` `OTPFieldInput` parts for you.
- In the default path, the first slot stays unlabeled so `id` + `label htmlFor` / `FieldLabel htmlFor`
  can name the field. Generated slots `2..N` receive `aria-label="Character X of N"`.
- When `children` is provided, moduix renders it as-is. You are responsible for rendering exactly
  `length` inputs and for adding position-aware `aria-label` values to slots after the first one.
- `OTPFieldSeparator` is decorative by default: it renders with `aria-hidden="true"` and
  `role="presentation"`. Override both only when you intentionally need semantic separator behavior.
- The wrapper keeps Base UI controlled/uncontrolled behavior, validation flow, completion callbacks,
  masking, and form integration intact.
- moduix does not add variants, size props, slot prop bags, group wrappers, or label helper props.

## Basic usage

Default composition:

```tsx
import { Field, FieldLabel, OTPField } from 'moduix';
import { useId } from 'react';

export function VerificationCodeField() {
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>Verification code</FieldLabel>
      <OTPField id={id} length={6} />
    </Field>
  );
}
```

Manual grouped composition:

```tsx
import {
  Field,
  FieldLabel,
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
  SeparatorMarkIcon,
} from 'moduix';
import { useId } from 'react';

export function GroupedVerificationCodeField() {
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>Verification code</FieldLabel>
      <OTPField id={id} length={6}>
        <div className="otp-group">
          <OTPFieldInput />
          <OTPFieldInput aria-label="Character 2 of 6" />
          <OTPFieldInput aria-label="Character 3 of 6" />
        </div>
        <OTPFieldSeparator>
          <SeparatorMarkIcon />
        </OTPFieldSeparator>
        <div className="otp-group">
          <OTPFieldInput aria-label="Character 4 of 6" />
          <OTPFieldInput aria-label="Character 5 of 6" />
          <OTPFieldInput aria-label="Character 6 of 6" />
        </div>
      </OTPField>
    </Field>
  );
}
```

## Public parts

| Part                | Element/primitive         | Slot                              | Notes                                                                 |
| ------------------- | ------------------------- | --------------------------------- | --------------------------------------------------------------------- |
| `OTPField`          | `OTPFieldPrimitive.Root`  | `data-slot="otp-field-root"`      | Root state machine. Renders default slots when `children` is omitted. |
| `OTPFieldInput`     | `OTPFieldPrimitive.Input` | `data-slot="otp-field-input"`     | One visible OTP slot.                                                 |
| `OTPFieldSeparator` | Base UI separator part    | `data-slot="otp-field-separator"` | Decorative group separator by default.                                |

## Public props

### `OTPField`

`OTPField` accepts Base UI OTP root props. The most important wrapper-facing props are:

| Prop                                 | Type                                    | Default           | Notes                                                                                          |
| ------------------------------------ | --------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------- |
| `length`                             | `number`                                | —                 | Required. Must match the number of rendered `OTPFieldInput` parts.                             |
| `id`                                 | `string`                                | —                 | Applied to the first slot. Later slots derive ids like `{id}-2`, `{id}-3`, and so on.          |
| `value` / `defaultValue`             | `string`                                | —                 | Controlled or uncontrolled OTP value.                                                          |
| `onValueChange`                      | `(value, details) => void`              | —                 | Fires for typing, paste, autofill, and keyboard edits.                                         |
| `onValueInvalid`                     | `(value, details) => void`              | —                 | Fires when typed or pasted characters are rejected before value update.                        |
| `onValueComplete`                    | `(value, details) => void`              | —                 | Fires when the OTP becomes complete.                                                           |
| `validationType`                     | `'numeric' \| 'alphanumeric' \| 'none'` | `'numeric'`       | Built-in character filtering mode.                                                             |
| `normalizeValue`                     | `(value: string) => string`             | —                 | Post-filter normalizer. Keep it idempotent because the primitive may normalize more than once. |
| `mask`                               | `boolean`                               | `false`           | Masks displayed characters in slot inputs.                                                     |
| `autoSubmit`                         | `boolean`                               | `false`           | Submits the owning form when the OTP becomes complete.                                         |
| `inputMode`                          | native `inputMode`                      | primitive default | Keyboard hint applied to slot inputs and the hidden validation input.                          |
| `required` / `disabled` / `readOnly` | `boolean`                               | `false`           | Standard form states handled by the primitive.                                                 |
| `name` / `form`                      | `string`                                | —                 | Hidden input form-submission props.                                                            |
| `className`                          | primitive `className`                   | —                 | Merged with the moduix root class. Base UI callback form still works.                          |

### Part-specific notes

- `OTPFieldInput` accepts Base UI input props, including `className`, `placeholder`, `aria-label`,
  `type`, `style`, and `render`.
- `OTPFieldInput` is a real `<input>`, so native input props such as `placeholder` behave normally.
- `OTPFieldSeparator` accepts generic separator/div props, but defaults to decorative semantics. If
  you intentionally want a semantic separator, pass both `aria-hidden={false}` and
  `role="separator"`.

## Styling API

### Stable slot hooks

| Part                | `data-slot`           |
| ------------------- | --------------------- |
| `OTPField`          | `otp-field-root`      |
| `OTPFieldInput`     | `otp-field-input`     |
| `OTPFieldSeparator` | `otp-field-separator` |

### Styled state attributes

These state hooks are styled by the shipped moduix CSS:

| Part  | Attributes                       | Effect                                                   |
| ----- | -------------------------------- | -------------------------------------------------------- |
| root  | `data-disabled`, `data-readonly` | Applies disabled opacity to the whole control.           |
| input | `data-filled`                    | Switches filled background color.                        |
| input | `data-invalid`                   | Switches border and focus ring to the invalid color.     |
| input | `data-complete[data-filled]`     | Uses the complete border color when the field is filled. |
| input | `data-disabled`, `data-readonly` | Disables pointer interaction per slot.                   |

Base UI also exposes additional field-state attributes such as `data-required`, `data-valid`,
`data-invalid`, `data-touched`, `data-dirty`, `data-filled`, `data-focused`, and `data-complete` on
relevant parts. moduix does not style most of them by default, but they remain available for
consumer CSS.

### CSS variables

Public `--otp-field-*` variables from `theme.css` and the component stylesheet:

| Group        | Variables                                                                                                                                                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout       | `--otp-field-gap`, `--otp-field-width`, `--otp-field-max-width`, `--otp-field-input-size`, `--otp-field-input-width`, `--otp-field-input-height`, `--otp-field-radius`                                                                                     |
| Spacing      | `--otp-field-input-padding-x`, `--otp-field-input-padding-y`, `--otp-field-separator-width`, `--otp-field-separator-height`, `--otp-field-separator-size`                                                                                                  |
| Typography   | `--otp-field-font-size`, `--otp-field-font-weight`, `--otp-field-line-height`                                                                                                                                                                              |
| Surface      | `--otp-field-bg`, `--otp-field-bg-filled`, `--otp-field-color`, `--otp-field-placeholder-color`, `--otp-field-separator-color`                                                                                                                             |
| Border/focus | `--otp-field-border-width`, `--otp-field-border-color`, `--otp-field-border-color-invalid`, `--otp-field-border-color-complete`, `--otp-field-focus-ring-width`, `--otp-field-focus-ring-offset`, `--otp-field-focus-ring-color`, `--otp-field-transition` |
| Disabled     | `--otp-field-disabled-opacity`                                                                                                                                                                                                                             |

Example:

```css
.inviteCode {
  --otp-field-input-width: 3rem;
  --otp-field-input-height: 3rem;
  --otp-field-font-size: var(--text-xl);
  --otp-field-bg-filled: var(--color-muted);
  --otp-field-separator-color: var(--color-primary);
}
```

There are no built-in variants, size props, slot prop maps, or class name maps. Style the specific
part with `className` or override the public CSS variables.

## UX and accessibility

- Every OTP field needs an accessible name. Use `FieldLabel htmlFor={id}`, a native `<label>`, or
  `aria-label` for compact cases.
- In manual composition, keep the first slot unlabeled so the shared field label names the control.
  Add position-aware labels such as `"Character 2 of 6"` to later slots.
- Keep `length` aligned with the number of rendered `OTPFieldInput` parts. Mismatches make focus,
  completion, and validation behavior confusing.
- The primitive defaults `autoComplete` to `one-time-code`; keep it unless you intentionally need a
  different browser autofill hint.
- `disabled` prevents interaction and form submission. `readOnly` keeps the value focusable and
  submittable while preventing edits.
- Use `validationType="alphanumeric"` for recovery or invite codes. Use `validationType="none"` only
  when you also own the sanitization rules, typically via `normalizeValue`.
- `mask` only changes visible character rendering; it does not replace labeling, validation, or form
  requirements.

## Intentional differences from Base UI

- moduix exports `OTPField`, `OTPFieldInput`, and `OTPFieldSeparator` directly instead of the
  `OTPFieldPreview.Root/Input/Separator` namespace.
- `OTPField` renders default styled inputs for the common case when `children` is omitted.
- The wrapper ships moduix styling, `data-slot` hooks, and public `--otp-field-*` variables.
- `OTPFieldSeparator` is decorative by default, unlike the generic upstream separator primitive.
- This local file documents the moduix wrapper contract, not the full upstream preview API.

## Agent notes

- Preserve the default rendered-input path and the current generated `aria-label` contract unless the
  user explicitly asks to change the accessibility model.
- Keep `length`, default input rendering, stories, docs examples, and this file synchronized.
- Do not add label arrays, slot prop bags, or other broad sugar unless repeated real usage shows the
  default path is insufficient.
- If new public `--otp-field-*` variables or styling hooks are added, update `theme.css`, stories,
  docs examples, and this file in the same task.

## Local changelog

- Rewrote the local documentation to describe the shipped moduix wrapper, composition model, styling
  hooks, accessibility contract, and maintenance constraints instead of copying Base UI reference
  material.
- `OTPFieldSeparator` now defaults to decorative semantics (`aria-hidden="true"` and
  `role="presentation"`), which better matches its actual use in grouped OTP layouts.