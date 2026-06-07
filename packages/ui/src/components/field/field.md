# Field

Upstream primitive docs: https://base-ui.com/react/components/field.md

## Purpose

`Field` is the moduix form-field wrapper that provides label association, validation, accessible
descriptions, and error messaging for form controls. It is a thin styled wrapper over the Base UI
field primitive with moduix CSS Modules styling, `data-slot` hooks, and flat exported composition
parts.

Use `Field` any time a form control needs a visible label, helper text, or validation feedback.

## Current behavior contract

- `Field` (root) renders a `<div>` that establishes field context for all nested parts. It owns
  `name`, `disabled`, `validate`, `validationMode`, `validationDebounceTime`, `dirty`, `touched`,
  and `invalid` props. `disabled` propagates automatically to all child parts through Base UI
  context.
- `FieldLabel` renders a `<label>` that auto-associates with `FieldControl`. When the form control
  is a moduix composite component (`NumberField`, `Combobox`, etc.) that does not render
  `FieldControl`, wire the label manually with `htmlFor` + `id`.
- `FieldControl` renders a styled `<input>` intended for plain native inputs. **Do not wrap moduix
  form components** (`Input`, `Textarea`, `Checkbox`, `Switch`, `Radio`, `NumberField`, etc.) with
  `FieldControl`. Those components register with the field context on their own.
- `FieldItem` renders a `<div>` grid container used to group a single checkbox or radio option with
  its label inside a list (`RadioGroup`, `CheckboxGroup`). It is not required for simple text fields.
- `FieldDescription` renders a `<p>` with supplementary hint text. It is always visible.
- `FieldError` renders a `<div>` that is conditionally displayed based on the field's validity
  state. Without a `match` prop it shows when `validate` returns an error. With a `match` prop it
  shows for the matched native `ValidityState` key. Multiple `FieldError` elements with different
  `match` values are supported in the same field.
- `FieldValidity` is a direct re-export of the Base UI validity render-prop. It calls `children` as
  a function with the current validity state and does not render a DOM element itself — it has no
  `data-slot`.
- `className` on each part is merged with the moduix root class via `mergeClassName`, so Base UI
  state callback class names continue to work.

## Composition

Basic text input with validation:

```tsx
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from 'moduix';

export function NameField() {
  return (
    <Field validationMode="onBlur">
      <FieldLabel>Name</FieldLabel>
      <FieldControl required placeholder="Enter your name" />
      <FieldError match="valueMissing">Please enter your name.</FieldError>
      <FieldDescription>Visible on your public profile.</FieldDescription>
    </Field>
  );
}
```

With a custom validate function and `FieldValidity`:

```tsx
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldValidity,
} from 'moduix';

export function UsernameField() {
  return (
    <Field
      validationMode="onChange"
      validate={(value) => {
        if (typeof value !== 'string' || value.length < 3) {
          return 'Username must be at least 3 characters.';
        }
        return null;
      }}
    >
      <FieldLabel>Username</FieldLabel>
      <FieldControl placeholder="e.g. vinny" />
      <FieldError match="customError" />
      <FieldValidity>
        {(state) => <p>{state.validity.valid ? 'Looks good.' : 'Waiting for valid value.'}</p>}
      </FieldValidity>
      <FieldDescription>Use at least 3 characters.</FieldDescription>
    </Field>
  );
}
```

Disabled field:

```tsx
import { Field, FieldControl, FieldDescription, FieldLabel } from 'moduix';

export function DisabledField() {
  return (
    <Field disabled>
      <FieldLabel>Organization</FieldLabel>
      <FieldControl placeholder="Acme Inc." />
      <FieldDescription>This field is currently managed by your workspace.</FieldDescription>
    </Field>
  );
}
```

With moduix `Input` (skip `FieldControl`):

```tsx
import { Field, FieldDescription, FieldError, FieldLabel } from 'moduix';
import { Input } from 'moduix';

export function EmailField() {
  return (
    <Field validationMode="onBlur">
      <FieldLabel>Email</FieldLabel>
      <Input required type="email" placeholder="name@example.com" />
      <FieldError match="valueMissing">Please enter your email.</FieldError>
      <FieldError match="typeMismatch">Enter a valid email address.</FieldError>
    </Field>
  );
}
```

With moduix `NumberField` — label requires manual `htmlFor`/`id` wiring:

```tsx
import { useId } from 'react';
import { Field, FieldError, FieldLabel } from 'moduix';
import { NumberField } from 'moduix';

export function QuantityField() {
  const id = useId();

  return (
    <Field name="quantity" validationMode="onBlur">
      <FieldLabel htmlFor={id}>Items</FieldLabel>
      <NumberField id={id} min={1} max={10} required />
      <FieldError match="valueMissing">Please provide a number.</FieldError>
      <FieldError match="rangeUnderflow">Value should be at least 1.</FieldError>
      <FieldError match="rangeOverflow">Value should be at most 10.</FieldError>
    </Field>
  );
}
```

With `Checkbox` inside the label:

```tsx
import { Field, FieldDescription, FieldError, FieldLabel } from 'moduix';
import { Checkbox, CheckboxIndicator } from 'moduix';

export function TermsField() {
  return (
    <Field validationMode="onBlur">
      <FieldLabel>
        <Checkbox required name="terms">
          <CheckboxIndicator />
        </Checkbox>
        I agree to the terms
      </FieldLabel>
      <FieldError match="valueMissing">Please accept the terms.</FieldError>
      <FieldDescription>Required to continue.</FieldDescription>
    </Field>
  );
}
```

With `RadioGroup` and `FieldItem` for multi-option layout:

```tsx
import { Field, FieldError, FieldLabel, FieldItem } from 'moduix';
import { Radio, RadioField, RadioGroup, RadioLabel } from 'moduix';

export function AccountTypeField() {
  return (
    <Field name="account-type" validationMode="onBlur">
      <FieldLabel>Account type</FieldLabel>
      <RadioGroup>
        <FieldItem>
          <RadioField>
            <Radio value="personal" required />
            <RadioLabel>Personal account</RadioLabel>
          </RadioField>
        </FieldItem>
        <FieldItem>
          <RadioField>
            <Radio value="team" />
            <RadioLabel>Team account</RadioLabel>
          </RadioField>
        </FieldItem>
      </RadioGroup>
      <FieldError match="valueMissing">Please choose an account type.</FieldError>
    </Field>
  );
}
```

## Exported parts

| Part               | Element/primitive            | Purpose                                                                           |
| ------------------ | ---------------------------- | --------------------------------------------------------------------------------- |
| `Field`            | `FieldPrimitive.Root`        | Root container; establishes field context for all nested parts.                   |
| `FieldItem`        | `FieldPrimitive.Item`        | Grid wrapper for a single checkbox/radio option inside a list.                    |
| `FieldLabel`       | `FieldPrimitive.Label`       | `<label>` that auto-associates with `FieldControl`.                               |
| `FieldControl`     | `FieldPrimitive.Control`     | Styled `<input>` for plain native inputs; skip for moduix form components.        |
| `FieldDescription` | `FieldPrimitive.Description` | `<p>` with always-visible hint text.                                              |
| `FieldError`       | `FieldPrimitive.Error`       | Conditional `<div>` error message; shown based on `match` prop or validate error. |
| `FieldValidity`    | `FieldPrimitive.Validity`    | Render-prop that exposes full validity state; no DOM element, no `data-slot`.     |

## Public props

`Field` accepts `FieldPrimitive.Root.Props`. Key props:

| Prop                     | Type                                                              | Default      | Notes                                                                           |
| ------------------------ | ----------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------- |
| `name`                   | `string`                                                          | —            | Form field name; takes precedence over `name` on `FieldControl`.                |
| `disabled`               | `boolean`                                                         | `false`      | Disables the field and all nested parts.                                        |
| `invalid`                | `boolean`                                                         | —            | Forces invalid state (for external validation libraries).                       |
| `dirty`                  | `boolean`                                                         | —            | Externally controlled dirty state.                                              |
| `touched`                | `boolean`                                                         | —            | Externally controlled touched state.                                            |
| `validate`               | `(value, formValues) => string \| string[] \| null \| Promise<…>` | —            | Custom validation function; return a string to show an error, `null` for valid. |
| `validationMode`         | `'onSubmit' \| 'onBlur' \| 'onChange'`                            | `'onSubmit'` | When validation is triggered.                                                   |
| `validationDebounceTime` | `number`                                                          | `0`          | Debounce delay in ms, used with `validationMode="onChange"`.                    |
| `actionsRef`             | `React.RefObject<{ validate: () => void }>`                       | —            | Imperative handle to trigger validation programmatically.                       |
| `className`              | `string`                                                          | —            | Merged with moduix root class.                                                  |

`FieldError` key props:

| Prop    | Type                                                                                                                                                                                             | Default | Notes                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------- |
| `match` | `boolean \| 'valid' \| 'badInput' \| 'customError' \| 'patternMismatch' \| 'rangeOverflow' \| 'rangeUnderflow' \| 'stepMismatch' \| 'tooLong' \| 'tooShort' \| 'typeMismatch' \| 'valueMissing'` | —       | Determines when the error is shown. Omit to show when `validate` returns an error. |

`FieldItem` key props:

| Prop       | Type      | Default | Notes                                                              |
| ---------- | --------- | ------- | ------------------------------------------------------------------ |
| `disabled` | `boolean` | `false` | Disables the wrapped control; `Field` `disabled` takes precedence. |

`FieldControl` accepts all native `<input>` props plus Base UI state props. `FieldValidity`
requires `children` to be a function: `(state: FieldPrimitive.Validity.State) => React.ReactNode`.

## Styling API

Public `data-slot` values:

| Part               | `data-slot`         |
| ------------------ | ------------------- |
| `Field`            | `field-root`        |
| `FieldItem`        | `field-item`        |
| `FieldLabel`       | `field-label`       |
| `FieldControl`     | `field-control`     |
| `FieldDescription` | `field-description` |
| `FieldError`       | `field-error`       |

State attributes (on all parts that render a DOM element, provided by Base UI):
`data-disabled`, `data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-filled`,
`data-focused`.

`FieldError` additionally receives `data-starting-style` and `data-ending-style` for enter/exit
animations.

Public CSS variables:

| Variable                               | Default fallback                | Purpose                                           |
| -------------------------------------- | ------------------------------- | ------------------------------------------------- |
| `--field-gap`                          | `var(--spacing-1)`              | Gap between root children.                        |
| `--field-width`                        | `100%`                          | Root width.                                       |
| `--field-max-width`                    | `none`                          | Root max-width.                                   |
| `--field-color`                        | `var(--color-foreground)`       | Root text color.                                  |
| `--field-disabled-opacity`             | `var(--opacity-disabled)`       | Opacity for all parts when disabled.              |
| `--field-item-gap`                     | `var(--spacing-1)`              | Gap between `FieldItem` children.                 |
| `--field-label-gap`                    | `var(--spacing-2)`              | Gap between `FieldLabel` children.                |
| `--field-label-color`                  | `var(--color-foreground)`       | Label text color.                                 |
| `--field-label-font-size`              | `var(--text-sm)`                | Label font size.                                  |
| `--field-label-font-weight`            | `var(--weight-medium)`          | Label font weight.                                |
| `--field-label-line-height`            | `var(--line-height-text-sm)`    | Label line height.                                |
| `--field-description-color`            | `var(--color-muted-foreground)` | Description text color.                           |
| `--field-description-font-size`        | `var(--text-sm)`                | Description font size.                            |
| `--field-description-line-height`      | `var(--line-height-text-sm)`    | Description line height.                          |
| `--field-control-width`                | `100%`                          | Control width.                                    |
| `--field-control-height`               | `var(--size-lg)`                | Control min-height.                               |
| `--field-control-border-width`         | `var(--border-width-sm)`        | Control border width.                             |
| `--field-control-border-style`         | `solid`                         | Control border style.                             |
| `--field-control-border-color`         | `var(--color-border)`           | Control default border color.                     |
| `--field-control-border-color-invalid` | `var(--color-destructive)`      | Control border and focus-ring color when invalid. |
| `--field-control-radius`               | `var(--radius-md)`              | Control border radius.                            |
| `--field-control-padding-y`            | `0.5rem`                        | Control vertical padding.                         |
| `--field-control-padding-x`            | `0.875rem`                      | Control horizontal padding.                       |
| `--field-control-bg`                   | `var(--color-background)`       | Control background color.                         |
| `--field-control-color`                | `var(--color-foreground)`       | Control text color.                               |
| `--field-control-font-size`            | `var(--text-md)`                | Control font size.                                |
| `--field-control-line-height`          | `var(--line-height-text-md)`    | Control line height.                              |
| `--field-control-placeholder-color`    | `var(--color-muted-foreground)` | Control placeholder color.                        |
| `--field-control-transition`           | `var(--transition-default)`     | Control border/outline/opacity transition timing. |
| `--field-focus-ring-width`             | `var(--border-width-sm)`        | Control focus ring width.                         |
| `--field-focus-ring-offset`            | `-1px`                          | Control focus ring offset.                        |
| `--field-focus-ring-color`             | `var(--color-ring)`             | Control focus ring color.                         |
| `--field-error-color`                  | `var(--color-destructive)`      | Error text color.                                 |
| `--field-error-font-size`              | `var(--text-sm)`                | Error font size.                                  |
| `--field-error-line-height`            | `var(--line-height-text-sm)`    | Error line height.                                |

## UX and accessibility

- Every form control must have an accessible name. Use `FieldLabel` (for `FieldControl`) or
  `htmlFor`/`id` pairing (for composite components like `NumberField`).
- `disabled` on `Field` propagates automatically to all child parts through Base UI context, setting
  `data-disabled` and `pointer-events: none` on the control.
- `FieldError` is wired to `aria-describedby` by Base UI and is read by screen readers when it
  becomes visible.
- `FieldDescription` is also auto-associated via `aria-describedby`.
- Keyboard navigation, focus management, hidden input behavior, and ARIA state attributes are owned
  by the Base UI primitive and must not be reimplemented in the wrapper.
- Use `validationMode="onBlur"` for most text fields; use `"onChange"` with `validationDebounceTime`
  when immediate feedback is important.

## Intentional differences from Base UI

- moduix exports flat parts (`Field`, `FieldLabel`, `FieldControl`, etc.) instead of the upstream
  namespaced `Field.Root`, `Field.Label` API.
- Styling is not unstyled: CSS Modules, `data-slot`, and `--field-*` CSS variables are part of the
  public styling contract.
- `FieldValidity` is a direct re-export without wrapping because it is a render-prop-only part that
  does not render a DOM element.
- The local docs describe only the moduix wrapper contract; link to the upstream docs for full Base
  UI primitive details.

## Agent notes

- Keep `Field`, `Fieldset`, and `Form` aligned as the three form-structural wrappers. `Field` owns
  per-control context; `Fieldset` groups multiple fields; `Form` owns the form element.
- Do not add convenience props that duplicate Base UI primitive props under different names.
- Do not render a DOM element in `FieldValidity` — it must stay a render-prop alias.
- If CSS variables or `data-slot` names change, update `theme.css`, stories, and this file in the
  same task.
- When `FieldControl` styles are updated, verify the visual output matches moduix `Input` and
  `Textarea` components for consistency.
- The `disabled` opacity rule uses `:is()` to target all styleable parts with a single selector.
  Do not split this into per-part rules unless per-part opacity values are needed.

## Local changelog

- Rewrote the local documentation to describe the actual moduix Field wrapper, composition model,
  CSS variables, `data-slot` hooks, and usage patterns instead of the upstream Base UI documentation.
- `FieldControl` focus ring now transitions with the same timing token as its border color so text
  inputs inside `Field` match moduix `Input` more closely.