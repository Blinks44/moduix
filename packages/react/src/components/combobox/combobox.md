# Combobox

Upstream references (accessed 2026-08-10):

- Ark UI: https://ark-ui.com/react/docs/components/combobox
- Chakra UI: https://chakra-ui.com/docs/components/combobox
- shadcn/ui: https://ui.shadcn.com/docs/components/combobox

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

`Combobox` and `ComboboxRootProvider` portal `ComboboxPositioner` automatically by default. Set `portalled={false}` to
render it inline, or pass `portalRef` to target a custom container. The structural parts remain
explicit and independently styleable.

- Public composition is `Combobox`, `ComboboxLabel`, `ComboboxControl`, `ComboboxInput`,
  `ComboboxClearTrigger`, `ComboboxTrigger`, `ComboboxPositioner`, `ComboboxContent`,
  `ComboboxEmpty`, `ComboboxStatus`, `ComboboxList`, `ComboboxItemGroup`,
  `ComboboxItemGroupLabel`, `ComboboxItem`, `ComboboxItemText`, `ComboboxItemIndicator`, and
  `ComboboxOption`.
- `ComboboxRootProvider` renders the styled root for state created with moduix `useCombobox`.
- `Combobox` requires `collection`; use `createListCollection()` or `useListCollection()`.
- `onValueChange`, `onInputValueChange`, `onOpenChange`, and `onHighlightChange` preserve Ark detail
  objects without remapping.
- `ComboboxContext`, `useCombobox`, and `useComboboxContext` are exported by moduix. Import
  collection helpers from `@ark-ui/react/collection` and `useFilter` from `@ark-ui/react/locale`.
- Part props and callback detail types are re-exported from Ark (the same list in every adapter).
  `ComboboxRootProps` and `ComboboxRootProviderProps` are moduix types that add `portalled` and
  `portalRef`; `ComboboxOptionProps` describes the row helper.
- `ComboboxTrigger` and `ComboboxItemIndicator` provide default moduix icons when children are
  omitted. `ComboboxClearTrigger` composes Ark clearing behavior with the shared
  `CloseButton` by default.
- `ComboboxOption` is the recommended row helper for simple list options. It renders
  `ComboboxItem`, wraps its children in `ComboboxItemText`, and includes `ComboboxItemIndicator`.
  Pass `indicator={false}` to hide the indicator or `indicator={<Icon />}` to replace the default
  check icon.
- `ComboboxStatus` is a styled `div` for consumer-owned loading, error, or guidance messages in
  `ComboboxContent`. It does not set a loading state or ARIA role.

## Anatomy and exported parts

```text
Combobox
├─ ComboboxLabel
├─ ComboboxControl
│  ├─ ComboboxInput
│  ├─ ComboboxClearTrigger
│  └─ ComboboxTrigger
└─ Overlay subtree (automatically portalled)
   └─ ComboboxPositioner
      └─ ComboboxContent
         ├─ ComboboxEmpty
         ├─ ComboboxStatus
         ├─ ComboboxList
         │  └─ ComboboxItem
         │     ├─ ComboboxItemText
         │     └─ ComboboxItemIndicator
         │  └─ ComboboxOption
         └─ ComboboxItemGroup
            ├─ ComboboxItemGroupLabel
            └─ ComboboxItem
```

All styled parts expose matching kebab-case `data-slot` hooks. `ComboboxStatus` uses the same default visual
tokens as `ComboboxEmpty` and exposes `combobox-status`. `ComboboxRootProvider` exposes `combobox-root-provider`, while
keeping the same root styling and portal contract for state created with moduix `useCombobox`. `Option`
is sugar over the existing item parts and does not add a new styling hook.

## Composition

```tsx
import { useListCollection } from '@ark-ui/react/collection';
import { useFilter } from '@ark-ui/react/locale';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/react/combobox';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Mango', value: 'mango' },
];

export function ComboboxExample() {
  const { contains } = useFilter({ sensitivity: 'base' });
  const { collection, filter } = useListCollection({ initialItems: fruits, filter: contains });

  return (
    <Combobox collection={collection} onInputValueChange={(details) => filter(details.inputValue)}>
      <ComboboxLabel>Fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="e.g. Mango" />
        <ComboboxClearTrigger aria-label="Clear selection" />
        <ComboboxTrigger aria-label="Open options" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent>
          <ComboboxEmpty>No fruits found.</ComboboxEmpty>
          <ComboboxList>
            {collection.items.map((item) => (
              <ComboboxOption key={item.value} item={item}>
                {item.label}
              </ComboboxOption>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  );
}
```

For repeated consumer flows, a small local popup helper is the preferred way to remove boilerplate
without changing the public component contract:

```tsx
function FruitComboboxPopup({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <ComboboxPositioner>
      <ComboboxContent>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          {items.map((item) => (
            <ComboboxOption key={item.value} item={item}>
              {item.label}
            </ComboboxOption>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  );
}
```

## Upstream feature coverage

- Basic filtering: `useFilter` plus `useListCollection`.
- Controlled state: Ark `value`, `inputValue`, `open`, and detail callbacks.
- Custom objects: `itemToString` and `itemToValue` on the collection.
- Grouping: `groupBy`, `collection.group()`, `ComboboxItemGroup`, and `ComboboxItemGroupLabel`.
- Multiple selection: `multiple` plus controlled `value`; no combobox-specific chip API.
- Async search: replace collection items and handle `details.reason` from
  `onInputValueChange`; render `ComboboxStatus` while a request is pending when a styled message is needed.
- Creatable values: preserved through `allowCustomValue`.
- Provider state: moduix `useCombobox` plus `ComboboxRootProvider`.
- Context state: moduix `ComboboxContext` or `useComboboxContext`.
- Virtualization: preserved through `scrollToIndexFn` and collection-driven item rendering.
- Form integration: preserved through Ark root props such as `name` and `form`. The current
  `@ark-ui/react` Combobox package does not expose a `HiddenInput` part.
- Ark `Field` context is preserved by the primitive. Compose with the Ark-backed moduix
  `Field` when the combobox should inherit field state.
- Matching-text highlighting remains ordinary composition because moduix does not currently ship
  an Ark Highlight wrapper.

## Accessibility and state

- Ark owns combobox/listbox ARIA, keyboard navigation, focus lifecycle, form values, and outside
  interaction.
- `ComboboxLabel`, `ComboboxControl`, `ComboboxInput`, `ComboboxTrigger`, `ComboboxClearTrigger`,
  `ComboboxContent`, `ComboboxList`, `ComboboxItem`, and group parts
  preserve Ark state attributes.
- Important hooks include `data-state`, `data-focus`, `data-invalid`, `data-disabled`,
  `data-highlighted`, `data-empty`, `data-placement`, and `data-side`.
- Positioning variables include `--reference-width`, `--available-width`, `--available-height`,
  `--transform-origin`, `--z-index`, and `--layer-index`.
- All Ark DOM parts preserve `asChild`.
- `ids`, `readOnly`, `selectionBehavior`, and `closeOnSelect` pass through unchanged. `present`,
  `lazyMount`, and `unmountOnExit` keep Ark's presence lifecycle for CSS exit animations.
- `ComboboxContext`, `ComboboxItemContext`, `useComboboxContext`, and `useComboboxItemContext` are available from
  moduix for provider and item-context composition.

## Defaults and styling

The input defaults to `--moduix-size-md`. Single-line popup options default to `--moduix-size-sm` with
`--moduix-spacing-1` block padding. Empty and status messages share the same compact styles.

Popup items and group labels read the shared `--moduix-popup-item-*` and
`--moduix-popup-group-label-*` defaults. When popup content scrolls, `ItemGroupLabel` sticks to its
top edge and keeps an opaque popup surface above the scrolled options.

Public CSS Modules variables are limited to sizes that several parts depend on:
`--moduix-combobox-width`, `--moduix-combobox-radius` (control and content),
`--moduix-combobox-control-height`, `--moduix-combobox-action-size` (trigger, clear action, and the
input space reserved for them), and `--moduix-combobox-content-max-height` (capped by
`--available-height`). Everything else comes from foundation tokens or a class on the part. They are
declared in `packages/foundation/src/styles/variables-moduix.css`. Popup variables must be set on
`:root` or `ComboboxContent` because the content is portalled.

- Content motion uses the shared `--moduix-popup-motion-*` tokens.
- The field keeps its focus ring while the popup is open. `Trigger` and `ClearTrigger` use the shared
  focus ring (`--moduix-focus-ring-width`, `--moduix-focus-ring-offset`), like `CloseButton`.
- `Trigger` and `ClearTrigger` sit at the logical inline end, so they follow RTL. A lone
  `ClearTrigger` takes the trigger position. The input reserves space for one action or for both,
  depending on which parts are rendered; a hidden clear action keeps its space so text does not jump.
- `ComboboxClearTrigger` composes `CloseButton` and only passes the action size to it; use `asChild`
  with one semantic child when the clear control needs a custom host or visual treatment.
- `ComboboxInput asChild` preserves Ark input behavior without applying the default input class.
- Items use inline margins, not a computed width, so absolutely positioned virtual rows can use
  `left: 0; right: 0`.
- `Content` uses Ark `--reference-width`, `--available-height`, `--transform-origin`, and
  `--layer-index`. Its z-index is declared on the content part so Ark can propagate it to
  `Positioner` through `--z-index`.

## Intentional sugar and differences from upstream

- moduix ships default icons for `Trigger` and `ItemIndicator`, and composes `ClearTrigger` with the
  shared `CloseButton` without nesting buttons.
- moduix ships `Option` as row-level sugar for the common `Item`/`ItemText`/`ItemIndicator`
  composition. It keeps the same ref target as `Item`, but does not support `asChild` because it
  always renders the nested text and indicator parts. Its `indicator` prop only controls the nested
  `ItemIndicator`.
- moduix adds `Status` because Ark has no status part. It is a styled `div`; consumers retain control
  of async state and any loading or error announcement semantics.
- moduix exports `RootProvider`, `Context`, `ItemContext`, `useCombobox`, `useComboboxContext`, and
  `useComboboxItemContext` for provider and context paths. Collection helpers remain direct Ark
  imports.
- moduix does not add a hidden popup bundle such as `ComboboxContent` or a root-level `items` prop.
  Keep state collection-first and hide repeated popup structure in local helpers when needed.
- moduix does not ship combobox-owned chip parts. For richer multi-value controls, compose
  `Combobox` with controlled tags or with `TagsInput` when the chips must live inside one field.

## Migration notes

Common `shadcn` migration points:

- `items` on the root becomes `createListCollection()` or `useListCollection()`, then pass
  `collection` to `Combobox`.
- `itemToStringValue` becomes `itemToString` and usually `itemToValue` on the Ark collection.
- `showClear` becomes an explicit `ComboboxClearTrigger`.
- Plain `ComboboxItem` rows usually become `ComboboxOption`; keep `ComboboxItem` when a row needs
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
- Keep generic inference on `Combobox` and `ComboboxRootProvider`.
- Keep item context on the moduix export path; do not redirect consumers to Ark for
  `ComboboxItemContext` or `useComboboxItemContext`.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.