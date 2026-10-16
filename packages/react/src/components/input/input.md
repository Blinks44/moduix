# Input

Upstream (accessed 2026-10-16):

- Ark UI Field (no standalone Input primitive): https://ark-ui.com/docs/components/field
- Chakra UI Input recipe: https://github.com/chakra-ui/chakra-ui/blob/main/packages/react/src/theme/recipes/input.ts
- shadcn/ui Input: https://ui.shadcn.com/r/styles/new-york-v4/input.json

| Source          | Useful difference                                        | moduix decision                                                                          |
| --------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Ark Field       | Native field state, ids, refs, and `asChild` composition | **Required correctness:** preserve the primitive and native event contract.              |
| Chakra Input    | Adds `outline`, `subtle`, and `flushed` variants         | **Rejected complexity:** moduix keeps one style recipe.                                  |
| shadcn/ui Input | A plain styled `<input>`                                 | **Intentional difference:** moduix uses Ark `FieldInput` so the `Field` context applies. |

## Purpose

`Input` is the styled single-line input. It keeps native input semantics, works standalone, and
inherits `disabled`, `invalid`, `readOnly`, `required`, ids, labels, helper text, and error text
inside `Field`.

## Current behavior contract

- Renders one Ark `FieldInput` and forwards the ref to its `HTMLInputElement`.
- Accepts Ark `FieldInput` props except native `size`, which is renamed to `htmlSize`.
- Adds visual `size="xs" | "sm" | "md" | "lg" | "xl"`, default `md`.
- Supports `asChild` with one semantic input-like child.
- Uses native `onChange(event)`; adds no value state, validation, label, clear trigger, mask, or
  prefix/suffix API.
- Exports `InputRootProps` and `InputSize`.

## Anatomy

```text
Field (optional)
└─ Input  data-slot="input-root" data-scope="field" data-part="input" data-size
```

`data-scope` and `data-part` are set by the wrapper too, so a standalone input outside `Field` has
the same hooks as one inside it.

## Defaults and styling

- `min-width: 0`, as in Chakra and shadcn, so an input with `htmlSize` shrinks in a narrow flex row.
- Sizes use the shared control scale: `--moduix-size-xs` through `--moduix-size-xl`.
- With `htmlSize`, the native `size` attribute is rendered and the default width becomes `auto`, so
  the browser's character-based width applies. CSS Modules select `[size]`; Tailwind adds `w-auto`
  so that a consumer width utility can still replace it.
- CSS Modules expose `--moduix-input-width`, `--moduix-input-height`, and `--moduix-input-radius`;
  everything else comes from foundation tokens. Override it with a plain class on `Input`.
- A disabled `Field`, `FieldRootProvider`, `Fieldset`, or `InputGroup` owns the opacity; the input
  is not dimmed a second time. A standalone disabled input dims itself.
- Native file inputs get a compact primary file-selector button.

## Agent notes

- Keep the wrapper as one Ark `FieldInput`; do not add local value or validation state.
- Use `InputGroup` for inline decoration and actions, `Editable` for preview/edit flows,
  `PasswordInput` for visibility toggles, and `FileUpload` when files need state or upload UI.
- Other input-like components (`TagsInput`, `PasswordInput`) do not read `--moduix-input-*`; they
  have their own variables.