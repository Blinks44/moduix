# Input

Upstream docs:

- Ark UI: no dedicated Input primitive; follows https://ark-ui.com/docs/components/field and `Field.Input`
- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Ark UI styling: https://ark-ui.com/docs/guides/styling
- Ark UI ref: https://ark-ui.com/docs/guides/ref
- Chakra UI Input: https://chakra-ui.com/docs/components/input

Ark UI has no standalone `Input` component page. The wrapper uses Ark `Field.Input`, which renders
an Ark factory input with field context, as its behavioral and accessibility model.

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
- Exposes `Input.Root` as the same root component for namespace consistency.
- Supports `asChild` with one semantic input-like child.
- Adds no value state, validation state, label, clear trigger, mask, or prefix/suffix API.
- Adds no preview/edit mode; use `Editable` for inline read/edit workflows.

## Anatomy and exported parts

```text
Field.Root (optional)
└─ Input / Input.Root
```

- `Input` / `Input.Root` -> `data-slot="input-root"`, `data-scope="field"`, `data-part="input"`

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

Use `Editable` when the UI should render preview text first and switch into input editing with
edit, submit, and cancel controls.

## Upstream feature coverage

- Field input: supported through `Field.Input`.
- Disabled, invalid, read-only, and required state: inherited from `Field.Root`; disabled also
  inherits from `Fieldset.Root`.
- Native controlled/uncontrolled input: supported with `value`, `defaultValue`, and
  `onChange(event)`.
- Custom control: supported through `asChild` when one semantic input element must own the DOM
  node.
- Root provider, context, ids, helper/error text, and required indicator belong to `Field`, not
  `Input`.
- Preview/edit state belongs to `Editable`, not `Input`.
- No `HiddenInput` is needed because `Input` is the native form control.

## Accessibility and state

- The ref targets the real input and is suitable for form-library invalid focus.
- `Field` supplies ids, `aria-describedby`, `aria-invalid`, native state props, and
  `data-invalid`, `data-required`, and `data-readonly`.
- Standalone `disabled`, `readOnly`, `required`, and `aria-invalid` remain native props.
- Every input requires an accessible name from a label, `aria-label`, or `aria-labelledby`.
- There is no component-managed keyboard navigation; native input behavior is preserved.

## Defaults and styling

The default `md` input uses `--moduix-size-md` with `--moduix-spacing-1` block padding; explicit size variants and `--moduix-input-*` overrides remain available.

- `size` defaults to `md`; native character width uses `htmlSize`.
- `className` is merged with the moduix CSS module class.
- Stable hooks are `data-slot`, `data-size`, `data-scope`, `data-part`, Ark field state attributes,
  native state selectors, and the public `--moduix-input-*` variables in `theme.css`.
- Visual size defaults use the shared control scale: `xs` uses `--moduix-size-xs`, `sm` uses `--moduix-size-sm`,
  `md` uses `--moduix-size-md`, `lg` uses `--moduix-size-xl`, and `xl` uses an overrideable `3.5rem` fallback.
- The component exposes no Ark runtime CSS variables.

## Intentional sugar and differences from upstream

- moduix adds visual sizes, `htmlSize`, design tokens, and `data-slot`.
- `Input` is exported as a standalone wrapper even though its upstream implementation is
  `Field.Input`.
- `Input.Root` is an alias of `Input` for the root-only namespace pattern used across moduix.
- Legacy value adapters, render shims, callback styling props, and duplicated field-state
  attributes are intentionally not part of the current contract.

## Agent notes

- Keep the wrapper as one Ark `Field.Input`; do not add local value or validation state.
- Keep controlled examples on native `onChange(event)`.
- Use `InputGroup` for inline decoration and actions.
- Keep inline edit/read-only examples on `Editable`, not `Input`.
- Do not migrate `PasswordInput` to Ark Password Input as part of `Input` changes.

## Local changelog

- 2026-07-21: Normalized the complete input scale to `24/32/36/40/48px` tokens and compacted block
  padding so typography no longer expands a selected size.

- 2026-06-25: Added `Input.Root`, normalized `className`, simplified size token defaults, and
  refreshed docs examples for accessible standalone inputs.
- 2026-06-22: Documented `Input` as plain native entry only; preview/edit behavior belongs to
  `Editable`.
- 2026-06-19: Migrated from legacy Input to Ark UI `Field.Input`; added `asChild` and Ark field
  anatomy/state hooks; removed compatibility adapters and duplicated state contracts.