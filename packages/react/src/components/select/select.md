# Select

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/select
- Chakra UI: https://chakra-ui.com/docs/components/select

## Purpose

`Select` lets users choose one or more known values from a non-searchable popup list.

## Upstream model to preserve

The wrapper follows Ark UI's React `@ark-ui/react/select` primitive. Preserve the Ark collection
model (`collection={createListCollection(...)}`), string-array values, callback detail objects,
explicit popup composition, `HiddenSelect`, and `RootProvider` / context hooks.

## Current behavior contract

`Root` and `RootProvider` portal `Positioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

- `Select` is the short root form and is equivalent to `Select.Root`.
- The root renders a DOM element with `data-slot="select-root"` and moduix root styling.
- Consumers must pass a `collection`; items render with `Select.Item item={item}`.
- `value` and `defaultValue` are string arrays, including single selection.
- `onValueChange(details)` exposes Ark `details.value` and `details.items`.
- `Select.ClearTrigger`, `Select.Indicator`, and `Select.ItemIndicator` render moduix default icons
  when children are omitted.
- `Select.Indicators` is a moduix layout helper that matches Ark's recommended plain wrapper
  around `ClearTrigger` and `Indicator`.
- When `Select.ClearTrigger` is omitted or hidden, the trigger automatically reduces its end
  padding so it only reserves space for the indicator.
- `useSelect`, `useSelectContext`, and `useSelectItemContext` are exported from the
  package barrel. Import collection helpers directly from `@ark-ui/react/collection`.
- `Select.ItemTextContent`, `Select.ItemTextIcon`, and `Select.ItemTextLabel` are moduix span
  helpers for richer item text layout.
- legacy flat aliases and compatibility APIs are intentionally removed.
- Do not gate `Positioner` or `Content` with `Select.Context` and `select.open`;
  Ark's `lazyMount`, `unmountOnExit`, `present`, and exit callbacks own presence.

## Anatomy and exported parts

```text
Select / Select.Root
├─ Select.Label
├─ Select.Control
│  ├─ Select.Trigger
│  │  └─ Select.ValueText
│  └─ Select.Indicators
│     ├─ Select.ClearTrigger
│     └─ Select.Indicator
├─ Overlay subtree (automatically portalled)
│  └─ Select.Positioner
│     └─ Select.Content
│        ├─ Select.List
│        └─ Select.ItemGroup
│           ├─ Select.ItemGroupLabel
│           └─ Select.Item[item]
│              ├─ Select.ItemText
│              └─ Select.ItemIndicator
└─ Select.HiddenSelect
```

| Export                   | `data-slot`                | Notes                               |
| ------------------------ | -------------------------- | ----------------------------------- |
| `Select` / `Select.Root` | `select-root`              | Ark root with moduix styling.       |
| `Select.RootProvider`    | `select-root-provider`     | RootProvider styled like root.      |
| `Select.Label`           | `select-label`             | Ark label.                          |
| `Select.Control`         | `select-control`           | Ark control state wrapper.          |
| `Select.Trigger`         | `select-trigger`           | Ark trigger button.                 |
| `Select.ValueText`       | `select-value-text`        | Placeholder or selected label text. |
| `Select.ClearTrigger`    | `select-clear-trigger`     | Default `CloseIcon`.                |
| `Select.Indicator`       | `select-indicator`         | Default chevron icon.               |
| `Select.Indicators`      | `select-indicators`        | Moduix icon layout helper.          |
| `Select.Positioner`      | `select-positioner`        | Floating layer and CSS variables.   |
| `Select.Content`         | `select-content`           | Popup content surface.              |
| `Select.List`            | `select-list`              | Optional list wrapper.              |
| `Select.ItemGroup`       | `select-item-group`        | Group wrapper.                      |
| `Select.ItemGroupLabel`  | `select-item-group-label`  | Group label.                        |
| `Select.Item`            | `select-item`              | Selectable collection item.         |
| `Select.ItemText`        | `select-item-text`         | Item label text.                    |
| `Select.ItemIndicator`   | `select-item-indicator`    | Default check icon.                 |
| `Select.HiddenSelect`    | `select-hidden-select`     | Native hidden select.               |
| `Select.ItemTextContent` | `select-item-text-content` | Moduix span helper.                 |
| `Select.ItemTextIcon`    | `select-item-text-icon`    | Moduix span helper.                 |
| `Select.ItemTextLabel`   | `select-item-text-label`   | Moduix span helper.                 |

## Composition

```tsx
import { createListCollection } from '@ark-ui/react/collection';
import { Select } from '@moduix/react';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ],
});

export function SelectDemo() {
  return (
    <Select collection={fruits} name="fruit">
      <Select.Label>Choose fruit</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select an option" />
        </Select.Trigger>
        <Select.Indicators>
          <Select.ClearTrigger aria-label="Clear selection" />
          <Select.Indicator />
        </Select.Indicators>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {fruits.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select>
  );
}
```

## Upstream feature coverage

- Basic, controlled, root provider, multiple, grouping, field, form usage, lazy mount,
  select-on-highlight, max selection, select all, overflow, dynamic collection, and custom item
  layout are represented in docs/stories.
- Async loading, reactive collections, and virtualized rendering are supported by Ark through
  `collection`, `useListCollection`, and `scrollToIndexFn`; add task-specific examples when
  product docs need those larger integrations.
- Ark `Select.List` is exported for custom list and virtualization paths, but the simple content
  path can render items directly in `Select.Content`.

## Accessibility and state

- Keep `Select.HiddenSelect` for form submission, browser autofill, and form reset behavior.
- For very large virtualized collections, avoid `HiddenSelect` and compose a lightweight hidden
  input with `useSelectContext` so the DOM does not render one native option for every item.
- Forward refs to the Ark DOM part for root, trigger, control, content, and item parts.
- Preserve Ark state attributes: `data-state`, `data-focus`, `data-invalid`, `data-disabled`,
  `data-readonly`, `data-required`, `data-placeholder-shown`, `data-highlighted`, and item
  `data-state="checked" | "unchecked"`.
- Use Ark `Field.Root` / `Fieldset.Root` context for disabled, invalid, required, and read-only
  state.
- Use `Select.Context`, `Select.ItemContext`, `useSelectContext`, and `useSelectItemContext` for
  state reads.
- Use `useSelect` with `Select.RootProvider`; do not render `Select.Root` for the same state
  instance.
- Use `asChild` only with a single semantic child that can receive the required Ark props.

## Defaults and styling

- Moduix styling is applied through CSS Modules plus stable `data-slot` hooks.
- `Select.Control` owns Ark state attributes; `Select.Trigger` renders the visible field chrome.
- `Select.Content` uses Ark `--reference-width`, `--available-width`, `--available-height`, and
  `--transform-origin`.
- Open/closed animation is tied to Ark `data-state` attributes.
- Group labels use a standard `0.375rem` vertical padding default through
  `--select-item-group-label-padding-y`.
- Public theme variables are documented in `apps/docs/src/components/examples/select.tsx`.

## Intentional sugar and differences from upstream

- Default icons are added for clear trigger, indicator, and item indicator.
- `ItemTextContent`, `ItemTextIcon`, and `ItemTextLabel` are local leaf helpers only; they do not
  replace Ark item composition.
- legacy aliases were removed: `SelectField`, `SelectValue`, `SelectIcon`, `SelectPopup`,
  `SelectArrow`, `SelectContent` as hidden portal wrapper, scroll arrows, separator, `items`,
  `itemToStringLabel`, `itemToStringValue`, null item clearing, and flat part exports.
- Consumers should use Ark `collection`, `item`, `ValueText`, `ClearTrigger`, `Indicator`,
  `ItemGroup`, and `HiddenSelect` names.

## Agent notes

- Keep `Positioner` and `Content` explicit; only portal transport belongs to the root.
- Keep package barrel exports aligned with the component file. Docs import from `moduix`, not local
  component paths.
- When registry-shipped select source changes, run `npm run build:registry`.

## Local changelog

- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-27: Removed docs-only manual popup gating so examples preserve Ark presence behavior,
  documented virtualized hidden input guidance, and normalized group label padding to `0.375rem`.
- 2026-06-24: Removed collection helper re-exports from the Select public surface; docs now import
  `createListCollection` and `useListCollection` directly from Ark UI.
- 2026-06-20: Reduced trigger end padding automatically when no clear trigger is rendered, so
  indicator-only selects no longer reserve empty clear-button space.
- 2026-06-19: Made closed popup content inert for stacked docs previews, removed sticky group
  labels, and tightened trigger action icon alignment.
- 2026-06-19: Realigned trigger/control styling with Ark anatomy, added `Select.Indicators` for
  clear/indicator layout, and changed highlighted item colors to accent tokens.
- 2026-06-19: Migrated `Select` to Ark UI. Replaced legacy flat aliases with
  namespace-first Ark parts, added RootProvider/context/hook exports, preserved HiddenSelect,
  rewrote stories/docs, and removed legacy compatibility APIs.