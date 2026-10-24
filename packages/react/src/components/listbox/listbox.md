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

| Export                   | `data-slot`                 | Notes                                          |
| ------------------------ | --------------------------- | ---------------------------------------------- |
| `Listbox`                | `listbox-root`              | Ark root with moduix styling.                  |
| `ListboxRootProvider`    | `listbox-root-provider`     | RootProvider styled like root.                 |
| `ListboxLabel`           | `listbox-label`             | Accessible label.                              |
| `ListboxFilter`          | `listbox-filter`            | Search icon and unified filter surface.        |
| `ListboxInput`           | `listbox-input`             | Filter input, normally inside `ListboxFilter`. |
| `ListboxClearTrigger`    | `listbox-clear-trigger`     | Consumer-wired query reset button.             |
| `ListboxContent`         | `listbox-content`           | Focusable listbox content.                     |
| `ListboxEmpty`           | `listbox-empty`             | Empty-state content.                           |
| `ListboxItemGroup`       | `listbox-item-group`        | Group wrapper.                                 |
| `ListboxItemGroupLabel`  | `listbox-item-group-label`  | Group label.                                   |
| `ListboxItem`            | `listbox-item`              | Selectable collection item.                    |
| `ListboxItemText`        | `listbox-item-text`         | Item label text.                               |
| `ListboxItemIndicator`   | `listbox-item-indicator`    | Default check icon.                            |
| `ListboxValueText`       | `listbox-value-text`        | Selected value summary.                        |
| `ListboxItemTextContent` | `listbox-item-text-content` | Moduix span helper.                            |
| `ListboxItemTextIcon`    | `listbox-item-text-icon`    | Moduix span helper.                            |
| `ListboxItemTextLabel`   | `listbox-item-text-label`   | Moduix span helper.                            |

## Composition

```tsx
import { createListCollection } from '@ark-ui/react/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/react/listbox';

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

- CSS Modules expose two variables: `--moduix-listbox-width` (root, `16rem`) and
  `--moduix-listbox-content-max-height` (vertical content, `14rem`). Colors, spacing, typography,
  focus rings, and disabled opacity come from foundation tokens; override them with a class on the
  part. Items, group labels, and list padding also follow the shared `--moduix-popup-item-*`,
  `--moduix-popup-group-label-*`, and `--moduix-popup-list-padding-y` variables.
- The input and filter default to `--moduix-size-md`; items default to `--moduix-size-sm`.
- `ListboxFilter` places the search icon at the inline start and reserves 44px at the inline end for
  `ListboxClearTrigger` (12px offset, 24px action, 8px gap). The clear trigger keeps the
  `CloseButton` colors, hover, and focus ring and only sets its size and position.
- When `ListboxFilter` immediately precedes `ListboxContent`, both form one surface: focus on either
  part highlights the shared outer border, and the internal divider stays neutral. Standalone
  `ListboxInput` and `ListboxContent` keep their own inset focus outline.
- `ListboxContent` scrolls long lists and does not contain overscroll, so page scrolling chains past
  it; it is not a popup.
- Items reserve a 16px indicator column, so selecting an item does not shift its text. Ark sets
  `hidden` on unchecked indicators; moduix also sets `visibility: hidden` for apps whose reset does
  not hide `[hidden]` elements.
- Grid collections (`data-layout="grid"`, Ark `--column-count`) collapse the indicator column, center
  item labels, and show selection with a neutral muted fill.
- Horizontal content does not cap its height and scrolls inline; its items are `11rem` wide.
- Disabled items dim with the shared disabled opacity only, without a second muted text color.
  A disabled root dims once; its input and items do not dim again.

## Intentional sugar and differences from upstream

- `ListboxItemIndicator` renders the moduix `CheckIcon` when children are omitted.
- `ListboxFilter` and `ListboxClearTrigger` add search-field visuals only; filter text and
  collection updates stay explicit through Ark input and collection APIs.
- `ListboxItemTextContent`, `ListboxItemTextIcon`, and `ListboxItemTextLabel` are leaf span helpers
  shared in shape with Menu and Select; they do not replace Ark item composition.
- No convenience wrapper hides Ark parts; consumers compose content and items directly.
- React and Solid re-export the Ark Listbox part props, callback details, and hook types.

## Agent notes

- Keep package barrel exports aligned with the component file.
- Docs import from `@moduix/react`, not local component paths.
- When registry-shipped listbox source changes, run `pnpm run build:registry`.