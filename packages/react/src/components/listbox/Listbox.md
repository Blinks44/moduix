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
- `Listbox.ItemIndicator` renders the moduix `CheckIcon` when children are omitted.
- Items reserve indicator space by default, so selecting an item does not shift item text.
- Pointer hover and keyboard highlight share the same accent affordance by default.
- `Listbox.ItemTextContent`, `Listbox.ItemTextIcon`, and `Listbox.ItemTextLabel` are moduix span
  helpers for richer item text layout.
- Advanced state hooks and context parts are imported directly from `@ark-ui/react/listbox`.

## Anatomy and exported parts

```text
Listbox / Listbox.Root
├─ Listbox.Label
├─ Listbox.Input (optional)
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

| Export                     | `data-slot`                 | Notes                          |
| -------------------------- | --------------------------- | ------------------------------ |
| `Listbox` / `Listbox.Root` | `listbox-root`              | Ark root with moduix styling.  |
| `Listbox.RootProvider`     | `listbox-root-provider`     | RootProvider styled like root. |
| `Listbox.Label`            | `listbox-label`             | Accessible label.              |
| `Listbox.Input`            | `listbox-input`             | Optional filtering input.      |
| `Listbox.Content`          | `listbox-content`           | Focusable listbox content.     |
| `Listbox.Empty`            | `listbox-empty`             | Empty-state content.           |
| `Listbox.ItemGroup`        | `listbox-item-group`        | Group wrapper.                 |
| `Listbox.ItemGroupLabel`   | `listbox-item-group-label`  | Group label.                   |
| `Listbox.Item`             | `listbox-item`              | Selectable collection item.    |
| `Listbox.ItemText`         | `listbox-item-text`         | Item label text.               |
| `Listbox.ItemIndicator`    | `listbox-item-indicator`    | Default check icon.            |
| `Listbox.ValueText`        | `listbox-value-text`        | Selected value summary.        |
| `Listbox.ItemTextContent`  | `listbox-item-text-content` | Moduix span helper.            |
| `Listbox.ItemTextIcon`     | `listbox-item-text-icon`    | Moduix span helper.            |
| `Listbox.ItemTextLabel`    | `listbox-item-text-label`   | Moduix span helper.            |

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

## Upstream feature coverage

- Basic, controlled, root provider, disabled item, multiple selection, extended selection,
  grouping, horizontal orientation, grid collection, filtering, select all, and value text are
  represented in docs.
- Filtering is composed with `Listbox.Input` and `useListCollection`.
- Grid layout is supported by passing an Ark grid collection; `Listbox.Content` uses Ark
  `data-layout="grid"` and `--column-count`.

## Accessibility and state

- Keep `Listbox.Label` connected to `Listbox.Content`; Ark owns the ARIA listbox pattern.
- `Listbox.Content` manages active descendant focus, keyboard navigation, Home/End, typeahead, and
  orientation-specific arrow keys.
- Preserve Ark state attributes: `data-orientation`, `data-disabled`, `data-empty`,
  `data-activedescendant`, `data-layout`, item `data-value`, `data-selected`,
  `data-state="checked" | "unchecked"`, and `data-highlighted`.
- Use `typeahead={false}` when a filtering input owns text entry.
- Use Ark `useListbox()` with `Listbox.RootProvider`; do not render `Listbox.Root` for the same
  state instance.
- Use `asChild` only with a single semantic child that can receive the required Ark props.

## Defaults and styling

- Moduix styling is applied through CSS Modules plus stable `data-slot` hooks.
- Default root width is `16rem` through `--listbox-width`.
- `Listbox.Content` is the main interactive surface and keeps its border stable on focus.
- `Listbox.Content` has a `14rem` default max height and scrolls long lists without blocking page scroll
  chaining.
- `Listbox.Input` is optional and only needed for filtering scenarios.
- `Listbox.Input` is styled with the same token shape as the standalone `Input`, while preserving
  Ark's listbox input behavior.
- `Listbox.ItemIndicator` is hidden by Ark when the item is unchecked.
- `Listbox.Content[data-layout='grid']` uses Ark's `--column-count` CSS variable.
- Grid items collapse the indicator column and should normally show selection through the neutral
  `--listbox-grid-selected-bg` background instead of `Listbox.ItemIndicator`.
- Grid item labels are centered by default.

## Intentional sugar and differences from upstream

- Default selected indicator icon is added for `Listbox.ItemIndicator`.
- `ItemTextContent`, `ItemTextIcon`, and `ItemTextLabel` are local leaf helpers only; they do not
  replace Ark item composition.
- No convenience wrapper hides Ark parts; consumers compose the content and items directly.

## Agent notes

- Keep package barrel exports aligned with the component file.
- Docs import from `@moduix/react`, not local component paths.
- When registry-shipped listbox source changes, run `npm run build:registry`.

## Local changelog

- 2026-07-03: Removed Ark hook, context, and duplicate type re-exports from the moduix surface.
  Kept `RootProvider`, the callable root, and the visible listbox parts.
- 2026-06-26: Simplified listbox spacing defaults to existing spacing tokens, changed content max
  height to `14rem`, removed the docs-only filter input focus override, and aligned the public
  docs composition section with the current Ark-backed contract.

- 2026-06-24: Removed collection helper re-exports from the Listbox public surface; docs now import
  `createListCollection`, `createGridCollection`, and `useListCollection` directly from Ark UI.

- 2026-06-22: Polished default sizing, scroll behavior, filtering input styling, indicator layout,
  horizontal/grid examples, stories, and docs snippets.
- 2026-06-22: Added item hover affordance, stable content focus styling, docs root sizing, and
  compact grid selection background.
- 2026-06-22: Added `--listbox-*` variables to the public theme reference and changed default
  width to `16rem`.
- 2026-06-22: Changed grid selected background from primary to neutral muted color.
- 2026-06-22: Kept listbox content focused after pointer selection and centered grid items.
- 2026-06-22: Added Ark UI `Listbox` wrapper with CSS Modules styling, item indicator defaults,
  rich item text helpers, stories, local docs, site docs, and registry metadata.