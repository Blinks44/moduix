# Input

Upstream docs:

- Ark UI Field: https://ark-ui.com/docs/components/field
- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Chakra UI Input: https://chakra-ui.com/docs/components/input

Ark UI has no standalone `Input` component page. The wrapper uses Ark `Field.Input` as its
behavioral and accessibility model.

## Purpose

`Input` is the default styled single-line input for moduix. It keeps native input semantics, works
standalone, and inherits `disabled`, `invalid`, `readOnly`, `required`, ids, labels, helper text,
and error text when rendered inside `Field`.

## Upstream model to preserve

- Render `Field.Input` from `@ark-ui/react/field`.
- Preserve Ark `asChild` composition and native input props.
- Preserve `Field.Root` and `Fieldset.Root` state propagation.
- Keep `data-scope="field"` and `data-part="input"` on the rendered control.
- Use native `onChange(event)`, not a remapped value callback.

## Current behavior contract

- Renders one `Field.Input` and forwards the ref to its `HTMLInputElement`.
- Accepts Ark `Field.Input` props except native `size`, which is renamed to `htmlSize`.
- Adds visual `size="xs" | "sm" | "md" | "lg" | "xl"` with `md` as the default.
- Supports `asChild` with one semantic input-like child.
- Adds no value state, validation state, label, clear trigger, mask, or prefix/suffix API.

## Anatomy and exported parts

```text
Field.Root (optional)
└─ Input
```

- `Input` -> `data-slot="input-root"`, `data-scope="field"`, `data-part="input"`
- Exported types: `InputProps`, `InputSize`

## Composition

```tsx
import { Field, Input } from '@moduix/react';

export function EmailField() {
  return (
    <Field required>
      <Field.Label>Email</Field.Label>
      <Input name="email" type="email" />
      <Field.HelperText>Used for account notifications.</Field.HelperText>
    </Field>
  );
}
```

`asChild` follows Ark composition rules: provide exactly one child and preserve input semantics,
focusability, refs, and forwarded props.

## Upstream feature coverage

- Field input: supported through `Field.Input`.
- Disabled, invalid, read-only, and required state: inherited from `Field.Root`; disabled also
  inherits from `Fieldset.Root`.
- Native controlled/uncontrolled input: supported with `value`, `defaultValue`, and
  `onChange(event)`.
- Custom control: supported through `asChild`; use `Field.Context` directly for more specialized
  controls that need `getInputProps()`.
- Root provider, context, ids, helper/error text, and required indicator belong to `Field`, not
  `Input`.
- No `HiddenInput` is needed because `Input` is the native form control.

## Accessibility and state

- The ref targets the real input and is suitable for form-library invalid focus.
- `Field` supplies ids, `aria-describedby`, `aria-invalid`, native state props, and
  `data-invalid`, `data-required`, and `data-readonly`.
- Standalone `disabled`, `readOnly`, `required`, and `aria-invalid` remain native props.
- Every input requires an accessible name from a label, `aria-label`, or `aria-labelledby`.
- There is no component-managed keyboard navigation; native input behavior is preserved.

## Defaults and styling

- `size` defaults to `md`; native character width uses `htmlSize`.
- `className` is merged with the moduix CSS module class.
- Stable hooks are `data-slot`, `data-size`, `data-scope`, `data-part`, Ark field state attributes,
  native state selectors, and the public `--input-*` variables in `theme.css`.
- The component exposes no Ark runtime CSS variables.

## Intentional sugar and differences from upstream

- moduix adds visual sizes, `htmlSize`, design tokens, and `data-slot`.
- `Input` is exported as a standalone wrapper even though its upstream implementation is
  `Field.Input`.
- legacy `onValueChange`, `render`, callback `className`, callback `style`, and legacy field-state
  attributes are intentionally removed.

## Agent notes

- Keep the wrapper as one Ark `Field.Input`; do not add local value or validation state.
- Keep controlled examples on native `onChange(event)`.
- Use `InputGroup` for inline decoration and actions.
- Do not migrate `PasswordInput` to Ark Password Input as part of `Input` changes.

## Local changelog

- 2026-06-19: Migrated from legacy Input to Ark UI `Field.Input`; added `asChild` and Ark field
  anatomy/state hooks; removed legacy callback, render, and state contracts.