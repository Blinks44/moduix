# PasswordInput

Upstream primitive docs: there is no dedicated Base UI `PasswordInput` primitive. moduix
`PasswordInput` composes the local `Input`, `InputGroup`, and `Button` wrappers, which in turn use
Base UI primitives.

## Purpose

`PasswordInput` is the default moduix password field with a built-in visibility toggle. It keeps the
native single-line password input contract, forwards its ref to the actual input element, and wraps
the common show/hide-password affordance into one field-ready component.

Use it when the field value is a password or secret that should start masked but remain revealable on
request. For plain text-like fields use `Input`. For richer inline affordances use explicit
`InputGroup` composition.

## Current behavior contract

- Renders one `InputGroup` shell with a real native `<input>` plus an inline toggle button.
- Forwards its ref to the actual input element, not the toggle button.
- The input `type` is always controlled internally and switches between `password` and `text`.
  Consumer-provided `type` is intentionally not accepted.
- Reuses the local `Input` API for value, validation, native attributes, `size`, and `htmlSize`.
- Visibility state is uncontrolled only:
  - `defaultVisible` sets the initial reveal state;
  - `onVisibleChange` notifies when the reveal state changes.
- The toggle button:
  - defaults to `type="button"` through `InputGroupButton`;
  - uses `aria-label` text from `visibilityToggleLabels`;
  - writes `aria-pressed` with the current reveal state;
  - keeps the input focused on pointer interaction by preventing default on mouse down.
- When `disabled`, both the input and toggle button are disabled.
- When `readOnly`, the value stays non-editable but the visibility toggle still works.
- The grouped input keeps `data-slot="input-group-input"` intentionally so `InputGroup` shell click
  focus and grouped invalid/disabled styling keep working.

## Composition

Basic field usage:

```tsx
import { Field, PasswordInput } from 'moduix';

export function SignInPasswordField() {
  return (
    <Field>
      <Field.Label>Password</Field.Label>
      <PasswordInput required autoComplete="current-password" placeholder="Enter your password" />
      <Field.ErrorText>Please enter your password.</Field.ErrorText>
    </Field>
  );
}
```

With a custom default visibility and toggle labels:

```tsx
import { PasswordInput } from 'moduix';

export function TemporaryPasswordField() {
  return (
    <PasswordInput
      defaultVisible
      defaultValue="S3cur3!"
      visibilityToggleLabels={{
        show: 'Reveal temporary password',
        hide: 'Mask temporary password',
      }}
    />
  );
}
```

## Public props

`PasswordInput` accepts the local `Input` props except `type` and `className`, plus the wrapper props
below.

| Prop                     | Type                            | Default | Notes                                                                   |
| ------------------------ | ------------------------------- | ------- | ----------------------------------------------------------------------- |
| `className`              | native `div` `className`        | —       | Merged with the grouped shell root, not the nested input element.       |
| `defaultVisible`         | `boolean`                       | `false` | Sets the initial reveal state for the password value.                   |
| `onVisibleChange`        | `(visible: boolean) => void`    | —       | Called after the visibility toggle changes.                             |
| `visibilityToggleLabels` | `{ show: string; hide: string}` | —       | Accessible labels for the toggle button. Defaults to English show/hide. |

Important passthrough props from `Input` remain available, including:

- `value`, `defaultValue`, and `onValueChange`
- native attributes such as `name`, `placeholder`, `autoComplete`, `readOnly`, `disabled`,
  `required`, `minLength`, `maxLength`, and `pattern`
- `size`, `htmlSize`, `style`, and `render`

## Styling API

Stable wrapper hooks:

| Part          | Hook                                |
| ------------- | ----------------------------------- |
| shell root    | `data-slot="password-input-root"`   |
| nested input  | `data-slot="input-group-input"`     |
| toggle button | `data-slot="password-input-toggle"` |

Additional state hooks:

- root always writes `data-size` through `InputGroup`
- nested input still receives Base UI / moduix field state attributes such as `data-invalid`,
  `data-valid`, `data-disabled`, `data-focused`, and `data-filled`
- toggle button writes `aria-pressed="true"` when the value is currently revealed

`PasswordInput` does not add public `--password-input-*` variables. Style it through:

- `className` on the root shell
- existing `--input-group-*`, `--input-*`, and `--button-*` variables
- descendant selectors targeting `data-slot="input-group-input"` or `data-slot="password-input-toggle"`

## UX and accessibility

- Use a real label, `Field.Label`, or `aria-label` so the input has an accessible name.
- Prefer semantic password autofill hints such as `autoComplete="current-password"` or
  `autoComplete="new-password"`.
- The toggle button is separate from the input semantics, so the input still behaves like a normal
  text/password field for forms and validation.
- `disabled` removes both the input and toggle from interaction; `readOnly` keeps reveal/hide
  available while preventing edits.

## Intentional differences from Base UI

- There is no upstream `PasswordInput` primitive; this is a moduix composition wrapper.
- Unlike standalone `Input`, this component intentionally includes one narrow piece of DX sugar: a
  built-in visibility toggle for the common password-field path.
- The wrapper exposes a grouped visual root, so `className` styles the shell rather than the nested
  input element.

## Agent notes

- Keep the nested input on `data-slot="input-group-input"` unless `InputGroup` shell behavior is
  redesigned too.
- Do not reintroduce a generic `type` prop; `PasswordInput` should remain password-specific.
- Keep the toggle accessible with both a stateful `aria-pressed` value and an action-oriented
  `aria-label`.

## Local changelog

- Added `PasswordInput` as a dedicated grouped password field with built-in show/hide behavior,
  preserving the thin standalone `Input` contract.
- Added `EyeIcon` and `EyeClosedIcon` to the shared UI icon set for password visibility toggles.