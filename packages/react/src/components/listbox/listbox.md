# Listbox

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/listbox
- Zag: https://zagjs.com/components/react/listbox

## Purpose

`Listbox` displays a visible selectable collection. Use it when users should pick one item, multiple
items, or an extended modifier-key selection without opening a popup.

## Upstream model to preserve

The wrapper follows Ark UI's React `@ark-ui/react/listbox` primitive. Preserve Ark collection-based
rendering, value arrays, highlighted value control, selection modes, callback detail objects,
`ListboxRootProvider`, and input/filtering composition.

## Current behavior contract

- `Listbox` is the root component.
- Consumers must pass a `collection`; items render with `ListboxItem item={item}`.
- `value` and `defaultValue` are string arrays, including single selection.
- `highlightedValue` and `defaultHighlightedValue` control active descendant focus movement.
- `selectionMode` supports `single`, `multiple`, and `extended`.
- `orientation="horizontal"` changes both layout and keyboard navigation.
- `onValueChange(details)`, `onHighlightChange(details)`, and `onSelect(details)` expose Ark detail
  objects unchanged.
- `ListboxFilter` is the recommended visual wrapper for filtering. It renders the moduix search
  icon and joins with an immediately following `ListboxContent` as one surface.
- `ListboxInput` remains available as a separately styled Ark input for fully custom filter
  layouts.
- `ListboxClearTrigger` is a regular `button` with a default close icon and `type="button"`.
  Consumers own filter text and collection updates, so they render it only for a non-empty query and
  clear both values in its `onClick` handler.
- `ListboxItemIndicator` renders the moduix `CheckIcon` when children are omitted.
- Items reserve indicator space by default, so selecting an item does not shift item text.
- Pointer hover and keyboard highlight share the same accent affordance by default.
- `ListboxItemTextContent`, `ListboxItemTextIcon`, and `ListboxItemTextLabel` are moduix span
  helpers for richer item text layout.
- `useListbox`, `useListboxContext`, `useListboxItemContext`, `ListboxContext`, and
  `ListboxItemContext` are available from moduix for advanced state and context composition.

## Anatomy and exported parts

```text
Listbox
├─ ListboxLabel
├─ ListboxFilter (optional)
│  ├─ ListboxInput
│  └─ ListboxClearTrigger (when the query is non-empty)
├─ ListboxContent
│  ├─ ListboxEmpty
│  ├─ ListboxItemGroup
│  │  ├─ ListboxItemGroupLabel
│  │  └─ ListboxItem[item]
│  │     ├─ ListboxItemText
│  │     └─ ListboxItemIndicator
│  └─ ListboxItem[item]
│     ├─ ListboxItemText
│     └─ ListboxItemIndicator
└─ ListboxValueText
```

| Export                     | `data-slot`                 | Notes                                   |
| -------------------------- | --------------------------- | --------------------------------------- |
| `Listbox` | `listbox-root`              | Ark root with moduix styling.           |
| `ListboxRootProvider`     | `listbox-root-provider`     | RootProvider styled like root.          |
| `ListboxLabel`            | `listbox-label`             | Accessible label.                       |
| `ListboxFilter`           | `listbox-filter`            | Search icon and unified filter surface. |
| `ListboxInput`            | `listbox-input`             | Filter input, normally inside `ListboxFilter`. |
| `ListboxClearTrigger`     | `listbox-clear-trigger`     | Consumer-wired query reset button.      |
| `ListboxContent`          | `listbox-content`           | Focusable listbox content.              |
| `ListboxEmpty`            | `listbox-empty`             | Empty-state content.                    |
| `ListboxItemGroup`        | `listbox-item-group`        | Group wrapper.                          |
| `ListboxItemGroupLabel`   | `listbox-item-group-label`  | Group label.                            |
| `ListboxItem`             | `listbox-item`              | Selectable collection item.             |
| `ListboxItemText`         | `listbox-item-text`         | Item label text.                        |
| `ListboxItemIndicator`    | `listbox-item-indicator`    | Default check icon.                     |
| `ListboxValueText`        | `listbox-value-text`        | Selected value summary.                 |
| `ListboxItemTextContent`  | `listbox-item-text-content` | Moduix span helper.                     |
| `ListboxItemTextIcon`     | `listbox-item-text-icon`    | Moduix span helper.                     |
| `ListboxItemTextLabel`    | `listbox-item-text-label`   | Moduix span helper.                     |

## Composition

```tsx
import { createListCollection } from '@ark-ui/react/collection';
import { Listbox, ListboxContent, ListboxItem, ListboxItemIndicator, ListboxItemText, ListboxLabel } from '@moduix/react/listbox';

const countries = createListCollection({
  items: [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
  ],
});

export function ListboxDemo() {
  return (
    <Listbox collection={countries}>
      <ListboxLabel>Select country</ListboxLabel>
      <ListboxContent>
        {countries.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  );
}
```

For the standard search appearance, wrap `ListboxInput` in `ListboxFilter` immediately before
`ListboxContent`. Consumers can instead render `ListboxInput` directly when the search field and
results should remain visually separate or need a custom wrapper.

## Upstream feature coverage

- Basic, controlled, root provider, disabled item, multiple selection, extended selection,
  grouping, horizontal orientation, grid collection, filtering, select all, and value text are
  represented in docs.
- Filtering can use the unified `ListboxFilter` composition or a direct `ListboxInput`, with
  `useListCollection` in either case.
- Grid layout is supported by passing an Ark grid collection; `ListboxContent` uses Ark
  `data-layout="grid"` and `--column-count`.

## Accessibility and state

- Keep `ListboxLabel` connected to `ListboxContent`; Ark owns the ARIA listbox pattern.
- `ListboxContent` manages active descendant focus, keyboard navigation, Home/End, typeahead, and
  orientation-specific arrow keys.
- Refs target the rendered Ark parts: the root and root provider render `div` elements, `ListboxInput`
  renders an `input`, and `ListboxContent`, items, labels, and value text forward to their matching Ark
  elements.
- `ListboxFilter` is a visual wrapper only. It does not own input state or filtering, so its
  optional `ListboxClearTrigger` must reset the external query and call the collection filter.
- Listbox does not render a native form control for its selected values. Keep submission and reset
  state in the consumer's form model when the selection must be submitted.
- `ListboxClearTrigger` is semantic button content with an accessible `Clear search` label by
  default. Its standard rendering uses `CloseButton`, while custom content remains supported.
- Preserve Ark state attributes: `data-orientation`, `data-disabled`, `data-empty`,
  `data-activedescendant`, `data-layout`, item `data-value`, `data-selected`,
  `data-state="checked" | "unchecked"`, and `data-highlighted`.
- Use `typeahead={false}` when a filtering input owns text entry.
- Use Ark `useListbox()` with `ListboxRootProvider`; do not render `Listbox` for the same
  state instance.
- `useListboxContext`, `useListboxItemContext`, `ListboxContext`, and `ListboxItemContext` stay
  available from `@moduix/react` for advanced root- and item-level composition.
- Pass `ids` when surrounding UI needs stable root, content, label, item, or group IDs.
- Use `asChild` only with a single semantic child that can receive the required Ark props.

## Defaults and styling

The input and filter default to `--moduix-size-md`. Single-line list items default to `--moduix-size-sm` with `--moduix-spacing-1` block padding.
Empty messages use the same compact `--moduix-spacing-1` block padding.

Group labels inherit the shared `--moduix-popup-group-label-*` defaults: muted `xs` text, regular weight,
and `--moduix-spacing-1` block padding. Listbox-specific variables still take precedence.

- Moduix styling is applied through CSS Modules plus stable `data-slot` hooks.
- Default root width is `16rem` through `--moduix-listbox-width`.
- `ListboxFilter` has a default search icon. When placed immediately before `ListboxContent`, the
  content provides the visible boundary and divider between the input and results.
- `ListboxInput` and `ListboxContent` show the shared focus ring on keyboard focus, including
  when the input is composed inside `ListboxFilter`.
- `ListboxContent` has a `14rem` default max height and scrolls long lists without blocking page scroll
  chaining.
- `ListboxInput` is optional and only needed for filtering scenarios. Its default border matches
  `ListboxContent`; used directly, `:focus-visible` animates only its outline color. Inside
  `ListboxFilter`, it keeps that border and suppresses the outline.
- Moduix visually hides `ListboxItemIndicator` when Ark marks the item as unchecked, preserving
  the reserved indicator space.
- `ListboxContent[data-layout='grid']` uses Ark's `--column-count` CSS variable.
- Grid items collapse the indicator column and should normally show selection through the neutral
  `--moduix-listbox-grid-selected-bg` background instead of `ListboxItemIndicator`.
- Grid item labels are centered by default.

## Intentional sugar and differences from upstream

- Default selected indicator icon is added for `ListboxItemIndicator`.
- `ListboxFilter` and `ListboxClearTrigger` add search-field visuals only. `ListboxInput` also
  remains available without `ListboxFilter` for custom layouts; both paths keep filtering state and
  collection updates explicit through the existing Ark input and collection APIs.
- `ListboxClearTrigger` composes the shared `CloseButton` for its default icon, interaction, and
  focus styling without taking ownership of the consumer-managed filter reset.
- `ListboxItemTextContent`, `ListboxItemTextIcon`, and `ListboxItemTextLabel` are local leaf helpers only; they do not
  replace Ark item composition.
- No convenience wrapper hides Ark parts; consumers compose the content and items directly.

## Agent notes

- Keep package barrel exports aligned with the component file.
- Docs import from `@moduix/react`, not local component paths.
- When registry-shipped listbox source changes, run `pnpm run build:registry`.

## Local changelog

- 2026-07-23: Compacted empty-message block padding to `--moduix-spacing-1` to align with popup items.
- 2026-07-28: Restored visible keyboard focus for content and unified filter inputs; added Listbox
  regression coverage and synchronized public docs with the advanced state and item-text helpers.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Normalized group labels to the shared regular-weight popup-label contract.

- 2026-07-21: Reduced the default input and filter to `--moduix-size-md` and compacted list items to `--moduix-size-sm`.

- 2026-07-17: Composed the standard filter clear action with `CloseButton` and mapped existing
  Listbox tokens to the shared button styling.

- 2026-07-17: Added the unified `ListboxFilter` and `ListboxClearTrigger` defaults, including
  search and clear icons, a filter/content divider, and styling tokens. Documented the direct
  `ListboxInput` alternative, aligned ListboxFilter with the content background, and removed its outer
  focus ring. Standalone inputs retain their default border and animate their outline color on
  focus, while ListboxFilter preserves its input border and suppresses the outline.
- 2026-07-10: Re-exported Listbox state and context surfaces from moduix so `ListboxRootProvider`, select-all,
  and item-level customization do not require direct Ark Listbox imports. Collection helpers remain Ark imports.
- 2026-06-26: Simplified listbox spacing defaults to existing spacing tokens, changed content max
  height to `14rem`, removed the docs-only filter input focus override, and aligned the public
  docs composition section with the current Ark-backed contract.

- 2026-06-24: Removed collection helper re-exports from the Listbox public surface; docs now import
  `createListCollection`, `createGridCollection`, and `useListCollection` directly from Ark UI.

- 2026-06-22: Polished default sizing, scroll behavior, filtering input styling, indicator layout,
  horizontal/grid examples, stories, and docs snippets.
- 2026-06-22: Added item hover affordance, stable content focus styling, docs root sizing, and
  compact grid selection background.
- 2026-06-22: Added `--moduix-listbox-*` variables to the public theme reference and changed default
  width to `16rem`.
- 2026-06-22: Changed grid selected background from primary to neutral muted color.
- 2026-06-22: Kept listbox content focused after pointer selection and centered grid items.
- 2026-06-22: Added Ark UI `Listbox` wrapper with CSS Modules styling, item indicator defaults,
  rich item text helpers, stories, local docs, site docs, and registry metadata.
