# Textarea

Upstream (accessed 2026-10-23):

- Ark UI Field (no standalone Textarea primitive): https://ark-ui.com/docs/components/field
- Chakra UI Textarea: https://chakra-ui.com/docs/components/textarea
- shadcn/ui Textarea: https://ui.shadcn.com/r/styles/new-york-v4/textarea.json

| Source             | Useful difference                                        | moduix decision                                                                              |
| ------------------ | -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Ark Field          | Native field state, ids, refs, `asChild`, `autoresize`   | **Required correctness:** preserve the primitive and native event contract.                  |
| Chakra Textarea    | `size` xs–xl and `outline`, `subtle`, `flushed` variants | **Adopted:** `size` on the `Input` scale. **Rejected:** variants; moduix keeps one recipe.   |
| shadcn/ui Textarea | A plain styled `<textarea>` with `field-sizing: content` | **Intentional difference:** moduix uses Ark `FieldTextarea` and its `autoresize` for growth. |

## Purpose

`Textarea` is the styled multi-line plain text control. It keeps native textarea semantics, works
standalone, and inherits `disabled`, `invalid`, `readOnly`, `required`, ids, labels, helper text,
and error text inside `Field`.

## Current behavior contract

- Renders one Ark `FieldTextarea` and forwards the ref to its `HTMLTextAreaElement`.
- Accepts Ark `FieldTextarea` props, including native textarea props and `autoresize`.
- Adds visual `size="xs" | "sm" | "md" | "lg" | "xl"`, default `md`, mirrored as `data-size`.
- Supports `asChild` with one semantic textarea child.
- Uses native `onChange(event)`; adds no value state, validation, label, counter, or preview/edit
  API. Use `Editable` for inline read/edit flows.
- Exports `TextareaRootProps` and `TextareaSize`.

## Anatomy

```text
Field (optional)
└─ Textarea  data-slot="textarea-root" data-scope="field" data-part="textarea" data-size
```

`data-scope` and `data-part` are set by the wrapper too, so a standalone textarea outside `Field`
has the same hooks as one inside it.

## Defaults and styling

- Sizes set padding, font size, and line height. Inline padding and font size match `Input` of the
  same size (`--moduix-spacing-2` for `xs`/`sm`, `3` for `md`, `4` for `lg`/`xl`), so stacked
  controls line up. Block padding grows from `--moduix-spacing-1` to `--moduix-spacing-3`.
- No `min-height`: height comes from the native `rows` attribute (2 by default), so it scales with
  the size. Set `rows` or a class for a taller field.
- `resize: vertical` by default. With `autoresize`, Ark sets inline `resize: none` and manages
  `overflow-y` itself; moduix adds no styles for that mode.
- CSS Modules expose `--moduix-textarea-width` and `--moduix-textarea-radius`; everything else
  comes from foundation tokens. Override it with a plain
  class on `Textarea`.
- A disabled `Field`, `FieldRootProvider`, or `Fieldset` owns the opacity; the textarea is not dimmed
  a second time. A standalone disabled textarea dims itself.
- Read-only uses the regular surface; there is no separate read-only style.

## Agent notes

- Keep the wrapper as one Ark `FieldTextarea`; do not add local value or validation state.
- `InputGroupTextarea` renders `Textarea` and removes its border, background, outline, and resize
  handle with a `[data-slot='textarea-root']` selector; keep that slot stable.