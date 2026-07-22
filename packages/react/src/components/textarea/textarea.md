# Textarea

Upstream docs:

- Ark UI: no dedicated Textarea primitive; follows https://ark-ui.com/docs/components/field and `Field.Textarea`
- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Ark UI styling: https://ark-ui.com/docs/guides/styling
- Ark UI ref: https://ark-ui.com/docs/guides/ref
- Chakra UI: https://chakra-ui.com/docs/components/textarea

## Purpose

`Textarea` is the moduix multi-line plain text control: a styled Ark `Field.Textarea` root that keeps the native `<textarea>` API.

## Upstream model to preserve

Ark UI does not ship a dedicated `textarea` primitive. Moduix directly wraps Ark `Field.Textarea`
with styling, while preserving Ark's [composition](https://ark-ui.com/docs/guides/composition),
[styling](https://ark-ui.com/docs/guides/styling), and [ref](https://ark-ui.com/docs/guides/ref)
contracts.

Preserve the `Field.Textarea` contract: native textarea props, `autoresize`, ref forwarding to `HTMLTextAreaElement`, `asChild` from Ark polymorphic props, and inherited `Field.Root` / `Fieldset.Root` state.

Chakra's Textarea recipe informs the public examples for helper text, error text, `resize`, `autoresize`, Hook Form-style refs, and direct native textarea usage.

## Current behavior contract

- Renders one Ark `Field.Textarea`, which renders one native `<textarea>`.
- Accepts `ComponentProps<typeof FieldPrimitive.Textarea>` from Ark, including native textarea props and `autoresize`.
- Uses native `onChange` for controlled usage; no `onValueChange` compatibility layer is provided.
- Works standalone when consumers provide an accessible name, or inside moduix `Field` for labels, helper text, error text, and state inheritance.
- Adds moduix visual defaults, `data-slot="textarea-root"`, and public `--moduix-textarea-*` CSS variables.
- Does not provide preview/edit controls; use `Editable` for inline read/edit workflows.

## Anatomy and exported parts

```text
Field (optional)
└─ Textarea
```

| Part       | Element / Ark model  | `data-slot`     | Notes                                      |
| ---------- | -------------------- | --------------- | ------------------------------------------ |
| `Textarea` | Ark `Field.Textarea` | `textarea-root` | Styled textarea root and only public part. |

No `Textarea.Root`, provider, context hook, hidden input, wrapper shell, label prop, counter, or slot bag is exported for this component.

## Composition

```tsx
import { Field, Textarea } from '@moduix/react';

export function CommentField() {
  return (
    <Field>
      <Field.Label>Comment</Field.Label>
      <Field.HelperText>Visible to the whole team.</Field.HelperText>
      <Textarea name="comment" placeholder="Write a short comment" />
    </Field>
  );
}
```

Use `Field.Root` / `Field` for accessible labels, descriptions, required state, invalid state, and read-only/disabled inheritance. Use native textarea props such as `rows`, `maxLength`, `resize` styling, `value`, `defaultValue`, and `onChange` for browser behavior.

Use `Editable` when the UI should render preview text first and switch into a multiline editing
surface with edit, submit, and cancel controls.

## Upstream feature coverage

- Ark Field anatomy: covered through the optional `Field` wrapper plus `Textarea` as the control.
- Ark Field examples: textarea, textarea autoresize, field state, and custom control patterns remain available through the `Field` component; `Textarea` itself intentionally stays root-only.
- Ark Forms guide: accessible labels, helper text, error text, required state, invalid state, `readOnly`, `disabled`, and `Fieldset` inheritance are preserved by Ark.
- Chakra Textarea examples: basic usage, Field composition, helper/error text, native resizing, autoresize, refs, and form-library integration are supported.
- Inline read/edit flows belong to `Editable`, not `Textarea`.
- Chakra size and variant props are not supported; moduix uses CSS variables and `className` instead.

## Accessibility and state

- The forwarded ref targets the native `HTMLTextAreaElement`, which is the correct target for invalid focus and form-library registration.
- The textarea needs an accessible name from `Field.Label`, a native `<label>`, or `aria-label`.
- Ark links `Field.Label`, `Field.HelperText`, and `Field.ErrorText` to the textarea through IDs and `aria-describedby`.
- Ark applies `required`, `disabled`, `readOnly`, `aria-invalid`, `data-required`, `data-disabled`, `data-readonly`, and `data-invalid` from `Field` context.
- No `HiddenInput` is needed because native `<textarea>` already participates in form submission and form reset.
- `asChild` is inherited from Ark polymorphic props; if used, the child must be a single semantic textarea-compatible element.

## Defaults and styling

`Textarea` merges consumer `className` with `Textarea.module.css` and exposes these stable hooks:

- `data-scope="field"`
- `data-part="textarea"`
- `data-slot="textarea-root"`
- `data-autoresize` when `autoresize` is true
- native `[disabled]`, `[aria-invalid='true']`, `[readonly]`, `:read-only`, and Ark `data-disabled`, `data-readonly`, `data-invalid`

Public CSS variables from `theme.css`:

| Group        | Variables                                                                                                                                                                                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout       | `--moduix-textarea-width`, `--moduix-textarea-max-width`, `--moduix-textarea-min-height`                                                                                                                                                                                                          |
| Spacing      | `--moduix-textarea-padding-x`, `--moduix-textarea-padding-y`                                                                                                                                                                                                                                      |
| Typography   | `--moduix-textarea-font-size`, `--moduix-textarea-line-height`                                                                                                                                                                                                                                    |
| Surface      | `--moduix-textarea-bg`, `--moduix-textarea-color`, `--moduix-textarea-placeholder-color`, `--moduix-textarea-radius`, `--moduix-textarea-readonly-bg`, `--moduix-textarea-readonly-color`                                                                                                         |
| Border/focus | `--moduix-textarea-border-width`, `--moduix-textarea-border-style`, `--moduix-textarea-border-color`, `--moduix-textarea-border-color-invalid`, `--moduix-textarea-focus-ring-width`, `--moduix-textarea-focus-ring-offset`, `--moduix-textarea-focus-ring-color`, `--moduix-textarea-transition` |
| Interaction  | `--moduix-textarea-resize`, `--moduix-textarea-disabled-opacity`                                                                                                                                                                                                                                  |

## Intentional sugar and differences from upstream

- moduix provides visual defaults and theme variables; Ark remains the behavior source.
- The old `autoResize` prop was removed in favor of Ark `autoresize`.
- The old `onValueChange(value)` callback was removed in favor of native `onChange(event)`.
- `data-autoresize` is a moduix styling hook layered over Ark's `autoresize` behavior.
- Chakra `variant`, `size`, and style-prop APIs are intentionally not mirrored.
- Manual read-only/editing controls are intentionally not documented for `Textarea`; use `Editable`
  for that behavior.
- Duplicate `TextareaProps` re-exports are intentionally omitted; when a consumer needs the exact
  upstream prop type they can derive it from the component or import Ark types directly.

## Agent notes

- Do not reintroduce the legacy `Field.Control`, `render`, `mergeProps`, `autoResize`, or `onValueChange` adapter contract.
- Keep `Textarea` aligned with Ark `Field.Textarea`; use `Field.Textarea` as the local implementation reference.
- Keep inline edit/read-only examples on `Editable`, not `Textarea`.
- Keep stories, docs examples, `theme.css`, registry output, and this file synchronized when the public contract changes.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-11: Corrected the Ark implementation description and synchronized the controlled docs
  snippet and example ordering with the public component page.
- 2026-06-27: Protected Ark/moduix data hooks from rest-prop overrides, aligned the validation example with Ark `Field invalid`, and refreshed docs wording for the no-dedicated-primitive contract.
- 2026-07-03: Removed duplicate `TextareaProps` exports to keep the public surface aligned with the
  simplified root-only component pattern.
- 2026-06-22: Removed the manual read-only/editing story and docs path; inline editing now belongs
  to `Editable`.
- 2026-06-21: Migrated implementation to Ark `Field.Textarea`; replaced `autoResize` with `autoresize` and removed `onValueChange`.
- 2026-06-21: Rewrote the local contract around Ark Field, Chakra Textarea examples, native textarea behavior, and moduix styling hooks.