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
- Keeps Ark part names, callback detail objects, controlled state, `RootProvider`, filtering,
  grouping, custom objects, multiple selection, async collections, and form behavior.
- Keeps popup structure explicit through Ark `Positioner` and `Content`; the root owns portalling.

## Current behavior contract

`Root` and `RootProvider` portal `Positioner` automatically by default. Set `portalled={false}` to
render it inline, or pass `portalRef` to target a custom container. The structural parts remain
explicit and independently styleable.

- Public composition is `Combobox.Root`, `Label`, `Control`, `Input`, `ClearTrigger`, `Trigger`,
  `Positioner`, `Content`, `Empty`, `List`, `ItemGroup`, `ItemGroupLabel`, `Item`, `ItemText`,
  `ItemIndicator`, and `Option`.
- `Combobox.RootProvider` renders the styled root for state created with Ark `useCombobox`.
- `Combobox.Root` requires `collection`; use `createListCollection()` or `useListCollection()`.
- `onValueChange`, `onInputValueChange`, `onOpenChange`, and `onHighlightChange` preserve Ark detail
  objects without remapping.
- Context parts, hooks, and types are imported directly from `@ark-ui/react/combobox`. Import
  collection helpers from `@ark-ui/react/collection` and `useFilter` from
  `@ark-ui/react/locale`.
- `Combobox.Trigger`, `Combobox.ClearTrigger`, and `Combobox.ItemIndicator` provide default moduix
  icons when children are omitted.
- `Combobox.Option` is the recommended row helper for simple list options. It renders
  `Combobox.Item`, wraps its children in `Combobox.ItemText`, and includes `Combobox.ItemIndicator`.
  Pass `indicator={false}` to hide the indicator or `indicator={<Icon />}` to replace the default
  check icon.

## Anatomy and exported parts

```text
Combobox.Root
├─ Combobox.Label
├─ Combobox.Control
│  ├─ Combobox.Input
│  ├─ Combobox.ClearTrigger
│  └─ Combobox.Trigger
└─ Overlay subtree (automatically portalled)
   └─ Combobox.Positioner
      └─ Combobox.Content
         ├─ Combobox.Empty
         ├─ Combobox.List
         │  └─ Combobox.Item
         │     ├─ Combobox.ItemText
         │     └─ Combobox.ItemIndicator
         │  └─ Combobox.Option
         └─ Combobox.ItemGroup
            ├─ Combobox.ItemGroupLabel
            └─ Combobox.Item
```

All styled parts expose matching kebab-case `data-slot` hooks. `RootProvider` accepts state created
with Ark `useCombobox` and keeps the same root styling and portal contract. `Option` is sugar over
the existing item parts and does not add a new styling hook.

## Composition

```tsx
import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import { Combobox } from '@moduix/react';

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
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>No fruits found.</Combobox.Empty>
          <Combobox.List>
            {collection.items.map((item) => (
              <Combobox.Option key={item.value} item={item}>
                {item.label}
              </Combobox.Option>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
}
```

For repeated consumer flows, a small local popup helper is the preferred way to remove boilerplate
without changing the public component contract:

```tsx
function FruitComboboxPopup({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <Combobox.Positioner>
      <Combobox.Content>
        <Combobox.Empty>No fruits found.</Combobox.Empty>
        <Combobox.List>
          {items.map((item) => (
            <Combobox.Option key={item.value} item={item}>
              {item.label}
            </Combobox.Option>
          ))}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Positioner>
  );
}
```

## Upstream feature coverage

- Basic filtering: `useFilter` plus `useListCollection`.
- Controlled state: Ark `value`, `inputValue`, `open`, and detail callbacks.
- Custom objects: `itemToString` and `itemToValue` on the collection.
- Grouping: `groupBy`, `collection.group()`, `ItemGroup`, and `ItemGroupLabel`.
- Multiple selection: `multiple` plus controlled `value`; no combobox-specific chip API.
- Async search: replace collection items and handle `details.reason` from
  `onInputValueChange`.
- Creatable values: preserved through `allowCustomValue`.
- Provider state: Ark `useCombobox` plus moduix `RootProvider`.
- Context state remains available directly from `@ark-ui/react/combobox`.
- Virtualization: preserved through `scrollToIndexFn` and collection-driven item rendering.
- Form integration: preserved through Ark root props such as `name` and `form`. The current
  `@ark-ui/react` Combobox package does not expose a `HiddenInput` part.
- Ark `Field.Root` context is preserved by the primitive. The current moduix `Field` wrapper is
  still legacy, so consumers that need Ark field-context inheritance must compose with
  `@ark-ui/react/field` until that component is migrated.
- The dedicated Field example is deferred to the moduix Field migration, and matching-text
  highlighting remains ordinary composition because moduix does not currently ship an Ark
  Highlight wrapper.

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
- The field keeps its focus ring while the popup is open. Hovering the input or trigger highlights
  the field surface; hovering `ClearTrigger` highlights only that action.
- `className` is accepted on every visual part.
- `Combobox.Input asChild` preserves Ark input behavior without applying the default combobox input
  visual class to the child element.
- Public component variables are declared in `packages/react/src/lib/moduix/styles/theme.css`.
- `Content` uses Ark `--reference-width`, `--available-height`, `--transform-origin`, and
  `--layer-index`. Its z-index is declared on the content part so Ark can propagate it to
  `Positioner` through `--z-index`.

## Intentional sugar and differences from upstream

- moduix ships default icons for `Trigger`, `ClearTrigger`, and `ItemIndicator`.
- moduix ships `Option` as row-level sugar for the common `Item`/`ItemText`/`ItemIndicator`
  composition. It keeps the same ref target as `Item`, but does not support `asChild` because it
  always renders the nested text and indicator parts. Its `indicator` prop only controls the nested
  `ItemIndicator`.
- moduix keeps `RootProvider`, but does not re-export Ark context parts, state hooks, or Ark type
  aliases. Advanced consumers import those directly from `@ark-ui/react/combobox`.
- moduix does not add a hidden popup bundle such as `ComboboxContent` or a root-level `items` prop.
  Keep state collection-first and hide repeated popup structure in local helpers when needed.
- moduix does not ship combobox-owned chip parts. For richer multi-value controls, compose
  `Combobox` with controlled tags or with `TagsInput` when the chips must live inside one field.
- Removed legacy `Field`, `Value`, `InputGroup`, `ControlActions`, popup aliases, arrow,
  backdrop, status, row, separator, collection render props, and chip parts.
- Removed legacy root props such as `items`, `itemToStringLabel`, `filter`, `filteredItems`,
  `openOnInputClick`, and converted callback signatures.

## Migration notes

Common `shadcn` migration points:

- `items` on the root becomes `createListCollection()` or `useListCollection()`, then pass
  `collection` to `Combobox.Root`.
- `itemToStringValue` becomes `itemToString` and usually `itemToValue` on the Ark collection.
- `showClear` becomes an explicit `Combobox.ClearTrigger`.
- Plain `ComboboxItem` rows usually become `Combobox.Option`; keep `Combobox.Item` when a row needs
  `asChild`, nonstandard layout, or custom indicator placement.
- Built-in chip surfaces become controlled `value` plus consumer-owned tag rendering, or
  `TagsInput` composition when the chips must live in the same field shell.
- Hidden popup wrappers such as `ComboboxContent` become explicit `Positioner` and `Content`.

## Agent notes

- Keep `Positioner` and `Content` explicit; only portal transport belongs to the root.
- Keep `collection` required and callbacks Ark-shaped.
- Prefer `Option` in simple list examples. Use `indicator={false}` or `indicator={<Icon />}` for
  indicator-only changes, but keep raw `Item`, `ItemText`, and `ItemIndicator` visible when rows
  need `asChild`, nonstandard layout, or custom indicator placement.
- Keep input action spacing dependent on the rendered trigger/clear controls.
- Do not reintroduce combobox-owned chips; multiple-value rendering belongs in consumer composition
  through controlled state.
- Keep generic inference on the callable root, `Root`, and `RootProvider`.

## Local changelog

- 2026-07-10: Restricted `Combobox.Option` to simple rows by excluding `asChild`; use
  `Combobox.Item` for custom semantic elements and row layouts. Reordered public examples and added
  an explicit advanced-customization path.
- 2026-07-08: Added `Combobox.Option` as a narrow row helper for simple options, including
  indicator replacement/removal, updated the recommended composition to use it, made input
  end-padding depend on whether `Trigger` and `ClearTrigger` are rendered, documented the preferred
  local popup-helper pattern, and added explicit migration notes for users moving from shadcn.
- 2026-07-03: Synchronized field interaction styling with Select: open popups retain the focus ring,
  and clear-action hover no longer highlights the whole field surface.
- 2026-07-02: Removed duplicate Ark type exports, context parts, and state hooks from the moduix
  surface. Kept `RootProvider`, the callable root, and every styled visual part.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-27: Aligned `Combobox.Input asChild` with Ark composition so composed inputs keep their
  own visual styling while receiving combobox behavior.
- 2026-06-24: Removed collection and locale helper re-exports from the Combobox public surface;
  docs now import those helpers directly from Ark UI.

- 2026-06-22: Fixed the docs virtualized composition to use a dedicated scroll container,
  synchronous `scrollToIndexFn`, and non-scrolling virtual list rows so popup scrolling works with
  TanStack Virtual.
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