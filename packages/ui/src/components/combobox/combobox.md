# Combobox

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/combobox
- Chakra UI: https://chakra-ui.com/docs/components/combobox

## Purpose

`Combobox` is the moduix wrapper around Ark UI Combobox for selecting one or more values from a
filterable collection.

## Upstream model to preserve

- Uses `@ark-ui/react/combobox` directly.
- Keeps Ark collection-first state: `Root` requires a `ListCollection`.
- Keeps Ark part names, callback detail objects, controlled state, provider/context APIs, filtering,
  grouping, custom objects, multiple selection, async collections, and form behavior.
- Keeps popup structure explicit through Ark `Portal`, `Positioner`, and `Content`.

## Current behavior contract

- Public composition is `Combobox.Root`, `Label`, `Control`, `Input`, `ClearTrigger`, `Trigger`,
  `Positioner`, `Content`, `Empty`, `List`, `ItemGroup`, `ItemGroupLabel`, `Item`, `ItemText`, and
  `ItemIndicator`.
- `Combobox.Root` requires `collection`; use `createListCollection()` or `useListCollection()`.
- `onValueChange`, `onInputValueChange`, `onOpenChange`, and `onHighlightChange` preserve Ark detail
  objects without remapping.
- `Portal`, `createListCollection`, `useListCollection`, `useCombobox`, and `useFilter` are re-exported
  for the canonical Ark workflows.
- `Combobox.Trigger`, `Combobox.ClearTrigger`, and `Combobox.ItemIndicator` provide default moduix
  icons when children are omitted.

## Anatomy and exported parts

```text
Combobox.Root
├─ Combobox.Label
├─ Combobox.Control
│  ├─ Combobox.Input
│  ├─ Combobox.ClearTrigger
│  └─ Combobox.Trigger
└─ Portal
   └─ Combobox.Positioner
      └─ Combobox.Content
         ├─ Combobox.Empty
         ├─ Combobox.List
         │  └─ Combobox.Item
         │     ├─ Combobox.ItemText
         │     └─ Combobox.ItemIndicator
         └─ Combobox.ItemGroup
            ├─ Combobox.ItemGroupLabel
            └─ Combobox.Item
```

All styled parts expose matching kebab-case `data-slot` hooks. `Context` and `ItemContext` expose
Ark state without rendering a DOM node. `RootProvider` accepts a state object from `useCombobox`.

## Composition

```tsx
import { Combobox, Portal, useFilter, useListCollection } from 'moduix';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Mango', value: 'mango' },
];

export function ComboboxExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: fruits, filter: contains });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
    >
      <Combobox.Label>Fruit</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="e.g. Mango" />
        <Combobox.ClearTrigger aria-label="Clear selection" />
        <Combobox.Trigger aria-label="Open options" />
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No fruits found.</Combobox.Empty>
            <Combobox.List>
              {collection.items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
}
```

## Upstream feature coverage

- Basic filtering: `useFilter` plus `useListCollection`.
- Controlled state: Ark `value`, `inputValue`, `open`, and detail callbacks.
- Custom objects: `itemToString` and `itemToValue` on the collection.
- Grouping: `groupBy`, `collection.group()`, `ItemGroup`, and `ItemGroupLabel`.
- Multiple selection: `multiple` plus `Context.selectedItems`; no combobox-specific chip API.
- Async search: replace collection items and handle `details.reason` from
  `onInputValueChange`.
- Creatable values: preserved through `allowCustomValue`.
- Provider state: `useCombobox` plus `RootProvider`.
- Context state: `Context` and `ItemContext`.
- Virtualization: preserved through `scrollToIndexFn` and collection-driven item rendering.

## Accessibility and state

- Ark owns combobox/listbox ARIA, keyboard navigation, focus lifecycle, form values, and outside
  interaction.
- `Label`, `Control`, `Input`, `Trigger`, `ClearTrigger`, `Content`, `List`, `Item`, and group parts
  preserve Ark state attributes.
- Important hooks include `data-state`, `data-focus`, `data-invalid`, `data-disabled`,
  `data-highlighted`, `data-empty`, `data-placement`, and `data-side`.
- Positioning variables include `--reference-width`, `--available-width`, `--available-height`,
  `--transform-origin`, and `--z-index`.
- All Ark DOM parts preserve `asChild`.

## Defaults and styling

- moduix applies its tokens, radius, focus ring, popup shadow, item highlight, and motion defaults.
- `className` is accepted on every visual part.
- Public component variables are declared in `packages/ui/src/styles/theme.css`.
- `Content` uses Ark `--reference-width`, `--available-height`, and `--transform-origin`.

## Intentional sugar and differences from upstream

- moduix ships default icons for `Trigger`, `ClearTrigger`, and `ItemIndicator`.
- moduix re-exports Ark `Portal` and collection/filter hooks so examples can import the complete
  composition from `moduix`.
- Removed Base UI-only `Field`, `Value`, `InputGroup`, `ControlActions`, popup aliases, arrow,
  backdrop, status, row, separator, collection render props, and chip parts.
- Removed Base UI root props such as `items`, `itemToStringLabel`, `filter`, `filteredItems`,
  `openOnInputClick`, and converted callback signatures.

## Agent notes

- Do not hide `Portal`, `Positioner`, or `Content` behind convenience content wrappers.
- Keep `collection` required and callbacks Ark-shaped.
- Do not reintroduce combobox-owned chips; multiple-value rendering belongs in consumer composition
  through `Context`.
- Keep generic inference on `Root` and `RootProvider`.

## Local changelog

- 2026-06-18: Migrated Combobox from Base UI to Ark UI, replaced the legacy flat API with
  `Combobox.*`, adopted collection-first state and Ark callback details, removed hidden popup and
  chip abstractions, and moved styles to Ark state attributes and positioning variables.