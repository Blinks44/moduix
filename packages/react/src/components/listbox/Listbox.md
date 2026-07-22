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
`RootProvider`, and input/filtering composition.

## Current behavior contract

- `Listbox` is the short root form and is equivalent to `Listbox.Root`.
- Consumers must pass a `collection`; items render with `Listbox.Item item={item}`.
- `value` and `defaultValue` are string arrays, including single selection.
- `highlightedValue` and `defaultHighlightedValue` control active descendant focus movement.
- `selectionMode` supports `single`, `multiple`, and `extended`.
- `orientation="horizontal"` changes both layout and keyboard navigation.
- `onValueChange(details)`, `onHighlightChange(details)`, and `onSelect(details)` expose Ark detail
  objects unchanged.
- `Listbox.Filter` is the recommended visual wrapper for filtering. It renders the moduix search
  icon and joins with an immediately following `Listbox.Content` as one surface.
- `Listbox.Input` remains available as a separately styled Ark input for fully custom filter
  layouts.
- `Listbox.ClearTrigger` is a regular `button` with a default close icon and `type="button"`.
  Consumers own filter text and collection updates, so they render it only for a non-empty query and
  clear both values in its `onClick` handler.
- `Listbox.ItemIndicator` renders the moduix `CheckIcon` when children are omitted.
- Items reserve indicator space by default, so selecting an item does not shift item text.
- Pointer hover and keyboard highlight share the same accent affordance by default.
- `Listbox.ItemTextContent`, `Listbox.ItemTextIcon`, and `Listbox.ItemTextLabel` are moduix span
  helpers for richer item text layout.
- `useListbox`, `useListboxContext`, `useListboxItemContext`, `Listbox.Context`, and
  `Listbox.ItemContext` are available from moduix for advanced state and context composition.

## Anatomy and exported parts

```text
Listbox / Listbox.Root
├─ Listbox.Label
├─ Listbox.Filter (optional)
│  ├─ Listbox.Input
│  └─ Listbox.ClearTrigger (when the query is non-empty)
├─ Listbox.Content
│  ├─ Listbox.Empty
│  ├─ Listbox.ItemGroup
│  │  ├─ Listbox.ItemGroupLabel
│  │  └─ Listbox.Item[item]
│  │     ├─ Listbox.ItemText
│  │     └─ Listbox.ItemIndicator
│  └─ Listbox.Item[item]
│     ├─ Listbox.ItemText
│     └─ Listbox.ItemIndicator
└─ Listbox.ValueText
```

| Export                     | `data-slot`                 | Notes                                   |
| -------------------------- | --------------------------- | --------------------------------------- |
| `Listbox` / `Listbox.Root` | `listbox-root`              | Ark root with moduix styling.           |
| `Listbox.RootProvider`     | `listbox-root-provider`     | RootProvider styled like root.          |
| `Listbox.Label`            | `listbox-label`             | Accessible label.                       |
| `Listbox.Filter`           | `listbox-filter`            | Search icon and unified filter surface. |
| `Listbox.Input`            | `listbox-input`             | Filter input, normally inside `Filter`. |
| `Listbox.ClearTrigger`     | `listbox-clear-trigger`     | Consumer-wired query reset button.      |
| `Listbox.Content`          | `listbox-content`           | Focusable listbox content.              |
| `Listbox.Empty`            | `listbox-empty`             | Empty-state content.                    |
| `Listbox.ItemGroup`        | `listbox-item-group`        | Group wrapper.                          |
| `Listbox.ItemGroupLabel`   | `listbox-item-group-label`  | Group label.                            |
| `Listbox.Item`             | `listbox-item`              | Selectable collection item.             |
| `Listbox.ItemText`         | `listbox-item-text`         | Item label text.                        |
| `Listbox.ItemIndicator`    | `listbox-item-indicator`    | Default check icon.                     |
| `Listbox.ValueText`        | `listbox-value-text`        | Selected value summary.                 |
| `Listbox.ItemTextContent`  | `listbox-item-text-content` | Moduix span helper.                     |
| `Listbox.ItemTextIcon`     | `listbox-item-text-icon`    | Moduix span helper.                     |
| `Listbox.ItemTextLabel`    | `listbox-item-text-label`   | Moduix span helper.                     |

## Composition

```tsx
import { createListCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';

const countries = createListCollection({
  items: [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
  ],
});

export function ListboxDemo() {
  return (
    <Listbox collection={countries}>
      <Listbox.Label>Select country</Listbox.Label>
      <Listbox.Content>
        {countries.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  );
}
```

For the standard search appearance, wrap `Listbox.Input` in `Listbox.Filter` immediately before
`Listbox.Content`. Consumers can instead render `Listbox.Input` directly when the search field and
results should remain visually separate or need a custom wrapper.

## Upstream feature coverage

- Basic, controlled, root provider, disabled item, multiple selection, extended selection,
  grouping, horizontal orientation, grid collection, filtering, select all, and value text are
  represented in docs.
- Filtering can use the unified `Listbox.Filter` composition or a direct `Listbox.Input`, with
  `useListCollection` in either case.
- Grid layout is supported by passing an Ark grid collection; `Listbox.Content` uses Ark
  `data-layout="grid"` and `--column-count`.

## Accessibility and state

- Keep `Listbox.Label` connected to `Listbox.Content`; Ark owns the ARIA listbox pattern.
- `Listbox.Content` manages active descendant focus, keyboard navigation, Home/End, typeahead, and
  orientation-specific arrow keys.
- `Listbox.Filter` is a visual wrapper only. It does not own input state or filtering, so its
  optional `Listbox.ClearTrigger` must reset the external query and call the collection filter.
- `Listbox.ClearTrigger` is semantic button content with an accessible `Clear search` label by
  default. Its standard rendering uses `CloseButton`, while custom content remains supported.
- Preserve Ark state attributes: `data-orientation`, `data-disabled`, `data-empty`,
  `data-activedescendant`, `data-layout`, item `data-value`, `data-selected`,
  `data-state="checked" | "unchecked"`, and `data-highlighted`.
- Use `typeahead={false}` when a filtering input owns text entry.
- Use Ark `useListbox()` with `Listbox.RootProvider`; do not render `Listbox.Root` for the same
  state instance.
- Use `asChild` only with a single semantic child that can receive the required Ark props.

## Defaults and styling

The input and filter default to `--moduix-size-md`. Single-line list items default to `--moduix-size-sm` with `--moduix-spacing-1` block padding.

Group labels inherit the shared `--moduix-popup-group-label-*` defaults: muted `xs` text, regular weight,
and `--moduix-spacing-1` block padding. Listbox-specific variables still take precedence.

- Moduix styling is applied through CSS Modules plus stable `data-slot` hooks.
- Default root width is `16rem` through `--moduix-listbox-width`.
- `Listbox.Filter` has a default search icon. When placed immediately before `Listbox.Content`, the
  content provides the visible boundary and divider between the input and results.
- `Listbox.Filter` deliberately has no focus treatment. Its input keeps the base border but leaves
  its outline transparent on `:focus-visible`; the clear button uses the shared `CloseButton`
  focus ring.
- `Listbox.Content` has a `14rem` default max height and scrolls long lists without blocking page scroll
  chaining.
- `Listbox.Input` is optional and only needed for filtering scenarios. Its default border matches
  `Listbox.Content`; used directly, `:focus-visible` animates only its outline color. Inside
  `Listbox.Filter`, it keeps that border and suppresses the outline.
- `Listbox.ItemIndicator` is hidden by Ark when the item is unchecked.
- `Listbox.Content[data-layout='grid']` uses Ark's `--column-count` CSS variable.
- Grid items collapse the indicator column and should normally show selection through the neutral
  `--moduix-listbox-grid-selected-bg` background instead of `Listbox.ItemIndicator`.
- Grid item labels are centered by default.

## Intentional sugar and differences from upstream

- Default selected indicator icon is added for `Listbox.ItemIndicator`.
- `Listbox.Filter` and `Listbox.ClearTrigger` add search-field visuals only. `Listbox.Input` also
  remains available without `Filter` for custom layouts; both paths keep filtering state and
  collection updates explicit through the existing Ark input and collection APIs.
- `Listbox.ClearTrigger` composes the shared `CloseButton` for its default icon, interaction, and
  focus styling without taking ownership of the consumer-managed filter reset.
- `ItemTextContent`, `ItemTextIcon`, and `ItemTextLabel` are local leaf helpers only; they do not
  replace Ark item composition.
- No convenience wrapper hides Ark parts; consumers compose the content and items directly.

## Agent notes

- Keep package barrel exports aligned with the component file.
- Docs import from `@moduix/react`, not local component paths.
- When registry-shipped listbox source changes, run `npm run build:registry`.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Normalized group labels to the shared regular-weight popup-label contract.

- 2026-07-21: Reduced the default input and filter to `--moduix-size-md` and compacted list items to `--moduix-size-sm`.

- 2026-07-17: Composed the standard filter clear action with `CloseButton` and mapped existing
  Listbox tokens to the shared button styling.

- 2026-07-17: Added the unified `Listbox.Filter` and `Listbox.ClearTrigger` defaults, including
  search and clear icons, a filter/content divider, and styling tokens. Documented the direct
  `Listbox.Input` alternative, aligned Filter with the content background, and removed its outer
  focus ring. Standalone inputs retain their default border and animate their outline color on
  focus, while Filter preserves its input border and suppresses the outline.
- 2026-07-10: Re-exported Listbox state and context surfaces from moduix so `RootProvider`, select-all,
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