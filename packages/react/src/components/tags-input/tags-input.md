# TagsInput

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/tags-input
- Zag API: https://zagjs.com/components/react/tags-input

## Purpose

`TagsInput` lets users enter, edit, remove, and submit a list of string tags from one input-like
control. It is backed by Ark UI `@ark-ui/react/tags-input`; Ark owns the state machine, keyboard
navigation, focus management, validation hooks, hidden form input, and data attributes.

## Upstream model to preserve

- Ark UI: https://ark-ui.com/docs/components/tags-input
- Zag API: https://zagjs.com/components/react/tags-input

The upstream component is a multipart form control. Values are `string[]`, `inputValue` is the
editable text field value, and callbacks receive Ark/Zag detail objects. The wrapper must preserve
controlled and uncontrolled `value` / `inputValue`, `validate`, `delimiter`,
`blurBehavior`, `addOnPaste`, `editable`, `max`, `allowOverflow`, `allowDuplicates`,
`sanitizeValue`, `ids`, and outside-interaction callbacks without translating them to local aliases.

## Current behavior contract

`TagsInput` is the default root and `TagsInput.Root` is the same component. Consumers compose the
label, control, input, and clear trigger; `Root` and `RootProvider` render the native form input
internally.
`TagsInput.Items` renders the standard editable item tree from root context, while explicit item
parts remain available for custom tags.
`TagsInput.ItemDeleteTrigger` provides the compact tag-level `CloseIcon` when no children are
passed. `TagsInput.ClearTrigger` composes the shared `CloseButton.Root` by default through Ark
`asChild`, including when custom icon children are passed, so clearing all tags has the library
close affordance without nesting buttons.
Use root props such as `name` and `form` to configure native form participation.

## Anatomy and exported parts

```tsx
<TagsInput>
  <TagsInput.Label />
  <TagsInput.Control>
    <TagsInput.Items />
    <TagsInput.Input />
    <TagsInput.ClearTrigger />
  </TagsInput.Control>
</TagsInput>
```

| Export                        | Slot / behavior                                                 |
| ----------------------------- | --------------------------------------------------------------- |
| `TagsInput` / `.Root`         | `data-slot="tags-input-root"`; Ark root state machine.          |
| `TagsInput.RootProvider`      | `data-slot="tags-input-root-provider"`; external Ark state.     |
| `TagsInput.Label`             | `data-slot="tags-input-label"`; accessible label.               |
| `TagsInput.Control`           | `data-slot="tags-input-control"`; input shell and tag wrapper.  |
| `TagsInput.Items`             | Default editable item tree rendered from `TagsInput.Context`.   |
| `TagsInput.Item`              | `data-slot="tags-input-item"`; requires `index` and `value`.    |
| `TagsInput.ItemContext`       | Ark render-prop state for the current item.                     |
| `TagsInput.ItemPreview`       | `data-slot="tags-input-item-preview"`; visible tag surface.     |
| `TagsInput.ItemText`          | `data-slot="tags-input-item-text"`; rendered tag text.          |
| `TagsInput.ItemDeleteTrigger` | `data-slot="tags-input-item-delete-trigger"`; removes one tag.  |
| `TagsInput.ItemInput`         | `data-slot="tags-input-item-input"`; edit-mode input for a tag. |
| `TagsInput.Input`             | `data-slot="tags-input-input"`; entry input for new tags.       |
| `TagsInput.ClearTrigger`      | `data-slot="tags-input-clear-trigger"`; clears all tags.        |
| `TagsInput.Context`           | Ark root render-prop context.                                   |

## Composition

Use `TagsInput.Items` inside `Control` for the standard editable tag tree. Keep
`TagsInput.Input` inside `Control` for entry. The root renders its native form input automatically. For custom tag
content or actions, map `tagsInput.value` from `TagsInput.Context`, pass `index` and `value` to each
`TagsInput.Item`, and keep `ItemInput` inside the item so edit mode works.

Use `RootProvider` plus moduix `useTagsInput` only when state or imperative methods like `addValue`,
`setValue`, `clearValue`, or `focus` must be controlled outside the component tree. Use `ids` to
share an input/control between `TagsInput` and other Ark primitives such as `Combobox`, and compose
the shared text field with `Combobox.Input asChild` around `TagsInput.Input`.

## Upstream feature coverage

The wrapper exposes upstream controlled and uncontrolled values, controlled input value, max tags,
max with overflow, duplicate values, custom delimiter, disabled, invalid, read-only, maxLength,
validation, blur behavior, paste behavior, editable tags, sanitizeValue, provider/context, field
integration, combobox composition with shared `ids`, native forms, and programmatic control.

## Accessibility and state

Ark owns labeling, item edit mode, visual tag highlighting, deletion, paste handling, hidden form
input behavior, and keyboard navigation. Navigation follows the upstream contract: ArrowLeft and
ArrowRight move visual focus between tags when the entry input is empty or at the start, Enter edits
a highlighted tag or adds the entry input value, Backspace/Delete remove highlighted tags, and
Control+V can add pasted values when `addOnPaste` is enabled.

Ark state attributes to preserve include `data-scope="tags-input"`, `data-part`, `data-invalid`,
`data-readonly`, `data-disabled`, `data-focus`, `data-empty`, `data-required`, `data-value`, and
`data-highlighted` on the parts where upstream emits them.

## Defaults and styling

The one-line control follows Input's `--size-md` default, while wrapping tag content may naturally increase its height.

Styling targets Ark `data-scope="tags-input"` / `data-part` attributes plus stable moduix
`data-slot` hooks. Public CSS variables are `--tags-input-*` and live in `theme.css`. Ark does not
expose component-specific runtime CSS variables for this primitive.

Important hooks:

- root: `data-disabled`, `data-invalid`, `data-readonly`, `data-focus`, `data-empty`
- control: `data-disabled`, `data-readonly`, `data-invalid`, `data-focus`
- input: `data-invalid`, `data-readonly`, `data-empty`
- item preview/text/delete trigger: `data-disabled`, `data-highlighted`
- clear trigger: `data-readonly`; default rendering also carries the shared close-button visual
  class while preserving Ark `data-scope="tags-input"` and `data-part="clear-trigger"`

## Intentional sugar and differences from upstream

The wrapper adds moduix classes, `data-slot` hooks, `TagsInput.Items` as a fixed standard item
renderer, a default compact close icon for item deletion, the shared `CloseButton.Root` for clearing
all tags, and default input/tag styling. `ClearTrigger asChild` leaves the child in control of its
own host and visual treatment. `Items` has no prop bags; use lower-level parts when item structure
needs customization.

## Agent notes

Keep docs, examples, registry metadata, and generated registry artifacts in sync with the namespace
API. Do not replace Ark detail objects with positional callbacks. `TagsInput.Context` and
`TagsInput.ItemContext` stay because custom composition
needs them; `useTagsInput`, `useTagsInputContext`, and `useTagsInputItemContext` are moduix exports
for normal provider and state access.

## Local changelog

- 2026-07-21: Aligned the default one-line control with the compact Input `md` baseline.

- 2026-07-17: Routed custom default clear-trigger children through `CloseButton.Root` so every
  non-`asChild` clear action uses the shared visual contract.
- 2026-07-13: Native form controls are now rendered automatically; the former public form-control part was removed.

- 2026-07-12: Exposed `ItemContext`, `useTagsInput()`, `useTagsInputContext()`, and
  `useTagsInputItemContext()` through moduix so provider and custom-item examples avoid direct Ark
  imports.
- 2026-07-11: Added `TagsInput.Items` as the recommended standard item renderer; explicit item
  composition remains the advanced customization path.
- 2026-07-03: Removed moduix re-exports for Ark tags-input hooks, item context, and type aliases.
  `TagsInput.Context` stays for ordinary uncontrolled composition, and `RootProvider` still accepts
  state created with direct Ark imports.
- 2026-06-27: Audited the Ark UI v5.37.2 migration, documented `allowDuplicates`, max overflow,
  and combobox composition coverage, and synced docs examples with the current Ark feature set.
- 2026-06-23: Added the initial Ark-backed `TagsInput` component with multipart namespace API,
  provider/context hooks, default trigger icons, CSS Modules styling, local docs, docs examples, and
  registry metadata.
- 2026-06-23: Switched the default clear-all trigger to shared `CloseButton.Root` via Ark `asChild`
  and anchored it to the inline end of wrapped controls so it does not jump left when the input
  wraps.