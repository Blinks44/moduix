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
- `Portal`, `createListCollection`, `useListCollection`, `useCombobox`, `useComboboxContext`,
  `useComboboxItemContext`, and `useFilter` are re-exported for the canonical Ark workflows.
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
import { Combobox, Portal, useFilter, useListCollection } from '@moduix/react';

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
- Context state: `Context`, `ItemContext`, `useComboboxContext`, and `useComboboxItemContext`.
- Async value rehydration: `useComboboxContext().syncSelectedItems()` after a delayed collection
  receives items for an existing `value` or `defaultValue`.
- Virtualization: preserved through `scrollToIndexFn` and collection-driven item rendering.
- Ark `Field.Root` context is preserved by the primitive. The current moduix `Field` wrapper is
  still legacy, so consumers that need Ark field-context inheritance must compose with
  `@ark-ui/react/field` until that component is migrated.
- Public docs adapt 15 of Ark's 17 React examples (88%). The dedicated Field example is deferred
  to the moduix Field migration, and matching-text highlighting remains ordinary composition
  because moduix does not currently ship an Ark Highlight wrapper.

## Accessibility and state

- Ark owns combobox/listbox ARIA, keyboard navigation, focus lifecycle, form values, and outside
  interaction.
- `Label`, `Control`, `Input`, `Trigger`, `ClearTrigger`, `Content`, `List`, `Item`, and group parts
  preserve Ark state attributes.
- Important hooks include `data-state`, `data-focus`, `data-invalid`, `data-disabled`,
  `data-highlighted`, `data-empty`, `data-placement`, and `data-side`.
- Positioning variables include `--reference-width`, `--available-width`, `--available-height`,
  `--transform-origin`, `--z-index`, and `--layer-index`.
- All Ark DOM parts preserve `asChild`.

## Defaults and styling

- moduix applies its tokens, radius, focus ring, popup shadow, item highlight, and motion defaults.
- `className` is accepted on every visual part.
- Public component variables are declared in `packages/react/src/core/styles/theme.css`.
- `Content` uses Ark `--reference-width`, `--available-height`, `--transform-origin`, and
  `--layer-index`. Its z-index is declared on the content part so Ark can propagate it to
  `Positioner` through `--z-index`.

## Intentional sugar and differences from upstream

- moduix ships default icons for `Trigger`, `ClearTrigger`, and `ItemIndicator`.
- moduix re-exports Ark `Portal` and collection/filter hooks so examples can import the complete
  composition from `moduix`.
- Removed legacy `Field`, `Value`, `InputGroup`, `ControlActions`, popup aliases, arrow,
  backdrop, status, row, separator, collection render props, and chip parts.
- Removed legacy root props such as `items`, `itemToStringLabel`, `filter`, `filteredItems`,
  `openOnInputClick`, and converted callback signatures.

## Agent notes

- Do not hide `Portal`, `Positioner`, or `Content` behind convenience content wrappers.
- Keep `collection` required and callbacks Ark-shaped.
- Do not reintroduce combobox-owned chips; multiple-value rendering belongs in consumer composition
  through `Context`.
- Keep generic inference on `Root` and `RootProvider`.

## Local changelog

- 2026-06-19: Aligned Combobox interactive styling with Select by moving item highlight to accent
  tokens, adding open and hover surface states on the control, and matching checked/disabled item
  colors to the Select visual contract.
- 2026-06-18: Registered Ark `--layer-index` and `--z-index` in the shared theme runtime-variable
  declarations.
- 2026-06-18: Added the missing Ark context hooks to the public barrel, aligned popup layering with
  Ark's content-to-positioner z-index contract, and documented async value rehydration and the
  current Ark Field integration boundary.
- 2026-06-18: Registered Ark `--reference-width` in the shared theme runtime-variable declarations.
- 2026-06-18: Migrated Combobox to Ark UI, replaced the legacy flat API with
  `Combobox.*`, adopted collection-first state and Ark callback details, removed hidden popup and
  chip abstractions, and moved styles to Ark state attributes and positioning variables.