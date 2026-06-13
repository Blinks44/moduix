# InputGroup

Upstream primitive docs: there is no dedicated Base UI `InputGroup` primitive. moduix `InputGroup`
composes the local `Input` and `Button` wrappers, which in turn use Base UI `Input` and `Button`.

## Purpose

`InputGroup` is the moduix field shell for single-line inputs that need inline decoration or actions:
prefixes, suffixes, fixed text, or compact buttons. It keeps those parts visually merged into one
control while preserving the real input and button semantics on the nested parts.

Use it when the affordance belongs to the same row as the input value. For plain text fields, use
`Input`. For multi-line content, use `Textarea`.

## Current behavior contract

- `InputGroup` renders a styled `<div>` shell with `data-slot="input-group-root"` and `data-size`.
- The shell itself does **not** add a default ARIA role. The real interactive semantics stay on the
  nested `InputGroupInput` and `InputGroupButton`.
- Clicking the shell focuses the first nested `InputGroupInput` unless:
  - the event was already prevented;
  - the click is not a plain primary-button click;
  - the target is inside an interactive descendant (`button`, `a`, `input`, `select`, `textarea`,
    `[role="button"]`, `[role="link"]`);
  - the input is `disabled` or `readOnly`.
- `InputGroup` is designed around **one** `InputGroupInput` per group. The focus redirect uses
  `querySelector`, so if multiple grouped inputs are rendered only the first one participates in the
  shell-click focus behavior.
- `InputGroupInput` reuses the local `Input` API and inherits the group `size` unless `size` is
  passed directly.
- `InputGroupButton` reuses the local `Button` API, defaults to `variant="ghost"` and
  `type="button"`, and inherits the group `size` unless overridden.
- Invalid and disabled shell styles are derived from the nested input state:
  - invalid shell state appears when the grouped input has `data-invalid` or `aria-invalid="true"`;
  - disabled shell opacity appears when the grouped input has `data-disabled` or `disabled`.
- `readOnly` shell styles are also derived from the nested input state. The shell can react to the
  grouped input with readonly-specific border, background, and text tokens, and shell clicks still
  do not programmatically focus the input.

## Composition

Basic field usage:

```tsx
import { Field, FieldLabel, InputGroup, InputGroupAddon, InputGroupInput } from 'moduix';

export function WorkspaceField() {
  return (
    <Field>
      <FieldLabel>Workspace</FieldLabel>
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="maps" />
      </InputGroup>
    </Field>
  );
}
```

With a suffix and inline action:

```tsx
import { InputGroup, InputGroupButton, InputGroupInput, InputGroupText } from 'moduix';

export function DomainField() {
  return (
    <InputGroup role="group" aria-label="Workspace domain">
      <InputGroupInput placeholder="company" />
      <InputGroupText>.test.com</InputGroupText>
      <InputGroupButton>Check</InputGroupButton>
    </InputGroup>
  );
}
```

For single-line inline editing, prefer keeping one mounted `InputGroupInput`, toggling its
`readOnly` state, and swapping only the trailing `InputGroupButton` actions. That avoids layout
shift better than replacing text content with a different edit shell.

### Exported parts

| Part               | Element / wrapper | Purpose                                              |
| ------------------ | ----------------- | ---------------------------------------------------- |
| `InputGroup`       | `div`             | Shared border, radius, focus ring, and size context. |
| `InputGroupInput`  | moduix `Input`    | The real single-line input inside the group.         |
| `InputGroupAddon`  | `span`            | Filled prefix or suffix surface with a separator.    |
| `InputGroupText`   | `span`            | Inline helper text without addon background fill.    |
| `InputGroupButton` | moduix `Button`   | Compact inline action aligned to the group shell.    |

Recommended order is addon/text before or after the input. Keep `InputGroupAddon` and
`InputGroupText` non-interactive; if you need an inline action, use `InputGroupButton`.

## Public props

### `InputGroup`

`InputGroup` accepts native `div` props plus:

| Prop        | Type                                   | Default | Notes                                                                          |
| ----------- | -------------------------------------- | ------- | ------------------------------------------------------------------------------ |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  | Shared visual size for the shell, `InputGroupInput`, and `InputGroupButton`.   |
| `className` | `string`                               | —       | Merged with the root CSS module class.                                         |
| `role`      | native `div` prop                      | —       | Optional escape hatch for standalone grouped widgets; add an accessible name.  |
| `aria-*`    | native `div` props                     | —       | Use `aria-label` or `aria-labelledby` when `role="group"` is applied manually. |

### `InputGroupInput`

`InputGroupInput` accepts the full moduix `Input` API. Important inherited behavior:

- controlled: `value` + `onValueChange`
- uncontrolled: `defaultValue`
- native input props such as `type`, `name`, `placeholder`, `inputMode`, `readOnly`, `disabled`
- moduix `Input` visual props such as `size` and `htmlSize`

`size` defaults to the group size. If you override it, only that input changes size.

### `InputGroupAddon` and `InputGroupText`

Both parts accept native `span` props and `className`. They are presentational wrappers only.

### `InputGroupButton`

`InputGroupButton` accepts the full moduix `Button` API. Important defaults:

| Prop      | Default    | Notes                                                                |
| --------- | ---------- | -------------------------------------------------------------------- |
| `variant` | `'ghost'`  | Matches the grouped-action default path.                             |
| `type`    | `'button'` | Prevents accidental form submission unless you opt into `submit`.    |
| `size`    | inherited  | Inherits `xs` / `sm` / `md` / `lg` / `xl` from the group by default. |

`Button` icon sizes (`icon-sm`, `icon-md`, `icon-lg`) are **not** inherited from the group context.
Pass them explicitly when you render an icon-only grouped action.

## Styling API

### Stable `data-slot` values

| Part               | `data-slot`          |
| ------------------ | -------------------- |
| `InputGroup`       | `input-group-root`   |
| `InputGroupInput`  | `input-group-input`  |
| `InputGroupAddon`  | `input-group-addon`  |
| `InputGroupText`   | `input-group-text`   |
| `InputGroupButton` | `input-group-button` |

### Stable state hooks

- `InputGroup` always writes `data-size`.
- The shell does **not** mirror child state with its own `data-invalid`, `data-disabled`, or
  `data-readonly` attributes. Root styling is driven by `:has(...)` selectors on the nested input
  for invalid, disabled, and readonly states.
- `InputGroupInput` uses `data-slot="input-group-input"` instead of the standalone `Input`
  `data-slot="input-root"`. Target grouped input styles through the group slot, not the standalone
  input slot.
- `InputGroupInput` still receives Base UI / moduix input state attributes such as `data-disabled`,
  `data-invalid`, `data-valid`, `data-focused`, `data-filled`, `data-dirty`, and `data-touched`
  when those states exist.

### Public CSS variables

Use `className` for local styling and `--input-group-*` variables for token-level overrides on the
shell and its inline parts.

| Group        | Variables                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout       | `--input-group-width`, `--input-group-max-width`, `--input-group-height`, `--input-group-height-xs`, `--input-group-height-sm`, `--input-group-height-md`, `--input-group-height-lg`, `--input-group-height-xl`, `--input-group-radius`                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Surface      | `--input-group-bg`, `--input-group-color`, `--input-group-readonly-bg`, `--input-group-readonly-color`, `--input-group-addon-bg`, `--input-group-addon-color`, `--input-group-button-color`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Border/focus | `--input-group-border-width`, `--input-group-border-style`, `--input-group-border-color`, `--input-group-border-color-invalid`, `--input-group-readonly-border-color`, `--input-group-focus-ring-width`, `--input-group-focus-ring-offset`, `--input-group-focus-ring-color`, `--input-group-button-focus-ring-offset`, `--input-group-separator-width`, `--input-group-separator-color`                                                                                                                                                                                                                                                                                                 |
| Spacing      | `--input-group-addon-gap`, `--input-group-addon-padding-x`, `--input-group-addon-padding-x-xs`, `--input-group-addon-padding-x-sm`, `--input-group-addon-padding-x-md`, `--input-group-addon-padding-x-lg`, `--input-group-addon-padding-x-xl`, `--input-group-input-padding-x`, `--input-group-input-padding-x-xs`, `--input-group-input-padding-x-sm`, `--input-group-input-padding-x-md`, `--input-group-input-padding-x-lg`, `--input-group-input-padding-x-xl`, `--input-group-input-padding-y`, `--input-group-input-padding-y-xs`, `--input-group-input-padding-y-sm`, `--input-group-input-padding-y-md`, `--input-group-input-padding-y-lg`, `--input-group-input-padding-y-xl` |
| Typography   | `--input-group-font-size`, `--input-group-font-size-xs`, `--input-group-font-size-sm`, `--input-group-font-size-md`, `--input-group-font-size-lg`, `--input-group-font-size-xl`, `--input-group-line-height`, `--input-group-line-height-xs`, `--input-group-line-height-sm`, `--input-group-line-height-md`, `--input-group-line-height-lg`, `--input-group-line-height-xl`, `--input-group-icon-size`                                                                                                                                                                                                                                                                                  |
| State/motion | `--input-group-disabled-opacity`, `--input-group-transition`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

`InputGroupButton` also accepts normal `Button` CSS variables, and `InputGroupInput` still accepts
normal `Input` props. Prefer `--input-group-*` variables for shared shell styling; standalone
`--input-*` border and background variables are mostly neutralized inside the group because the shell
owns the visible border and surface.

## UX and accessibility

- Prefer `Field` + `FieldLabel` for normal form fields. That gives the nested input its accessible
  name and lets the group stay purely visual.
- For standalone widgets that combine an input and action into one logical control, pass
  `role="group"` plus `aria-label` or `aria-labelledby` to `InputGroup` yourself.
- `InputGroupButton` defaults to `type="button"`. Pass `type="submit"` explicitly when the grouped
  action should submit the surrounding form.
- `disabled` removes the grouped input from interaction and dims the shell. `readOnly` keeps the
  input available for focus and form submission, but shell clicks intentionally do not move focus to
  it.
- If you use `InputGroupInput.render`, keep an actual `<input>` as the rendered control. Shell-click
  focus redirection currently expects an `HTMLInputElement`.

## Intentional differences from Base UI

- There is no upstream `InputGroup` primitive; this is a moduix composition wrapper.
- moduix exports flat parts (`InputGroup`, `InputGroupInput`, `InputGroupAddon`, `InputGroupText`,
  `InputGroupButton`) instead of a namespaced compound API.
- The wrapper adds small DX defaults:
  - shared group `size` context for `InputGroupInput` and `InputGroupButton`;
  - shell-click focus redirection to the grouped input;
  - grouped button defaults of `variant="ghost"` and `type="button"`.
- Local docs describe the moduix wrapper contract only; refer to local `Input` and `Button`
  documentation for the full wrapped control APIs.

## Agent notes

- Preserve the one-input-per-group assumption unless the public API is explicitly redesigned.
- Keep shell-click focus behavior in sync with the docs, stories, and any standalone accessibility
  examples.
- If root invalid or disabled styling selectors change, update this file and the docs-site CSS
  properties table in the same task.
- Keep `InputGroupInput` on `data-slot="input-group-input"`; do not silently fall back to
  `input-root`, or grouped styling hooks will drift.

## Local changelog

- Rewrote the local documentation to describe the shipped moduix `InputGroup` API, composition,
  styling hooks, accessibility guidance, and implementation constraints instead of Base UI-oriented
  reference text.
- Removed the default anonymous `role="group"` from the shell so the component keeps the nested input
  semantics by default and only becomes an ARIA group when consumers label it intentionally.
- Expanded invalid shell styling to react to `aria-invalid="true"` on the grouped input in addition
  to Base UI `data-invalid`.
- Documented the recommended inline-editing composition: keep one mounted grouped input and toggle
  `readOnly` instead of replacing it with a separate edit shell.
- Added readonly-aware shell styling and public `--input-group-readonly-*` tokens so consumers can
  restyle the visible grouped surface, not just the nested input.