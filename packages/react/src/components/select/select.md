# Select

## Upstream reference

Checked 2026-08-13:

- Ark UI: https://ark-ui.com/docs/components/select
- Chakra UI: https://chakra-ui.com/docs/components/select
- shadcn/ui: https://ui.shadcn.com/docs/components/select

## Purpose

`Select` lets users choose one or more known values from a non-searchable popup list.

## Comparison decisions

| Source    | Finding                                                                                                  | moduix decision                                                                                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ark UI    | Collection state, the listbox interaction model, and native form controls define the primitive contract. | **Required correctness:** preserve Ark parts, detail objects, lifecycle, context, and native control synchronization.                                                  |
| Chakra UI | Its explicit tree separates an `IndicatorGroup` and supports recipe variants.                            | **Intentional difference:** `SelectField` is the concise default; explicit `Control`, `Trigger`, and visual parts remain available. Do not add a parallel variant API. |
| shadcn/ui | A compact trigger/content path is easy to discover.                                                      | **Rejected complexity:** keep Ark-shaped collections, item objects, and callbacks instead of compatibility aliases or a second state model.                            |

## Upstream model to preserve

The wrapper follows Ark UI's React `@ark-ui/react/select` primitive. Preserve the Ark collection
model (`collection={createListCollection(...)}`), string-array values, callback detail objects,
explicit popup composition, native form behavior, and `RootProvider` / context hooks.

## Current behavior contract

`Select` and `SelectRootProvider` portal `SelectPositioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

- `Select` is the root component value.
- The root renders a DOM element with `data-slot="select-root"` and moduix root styling.
- Compose `SelectHiddenSelect` explicitly inside `Select` or `SelectRootProvider` for native submission,
  autofill, validation, and reset. Virtualized collections should provide application-owned form
  integration when rendering all native options is undesirable.
- `SelectField` renders the standard control, value text, and an indicator; pass `clearLabel` to add a labeled clear action or `indicator` to replace the default chevron.
- Consumers must pass a `collection`; items render with `SelectItem item={item}`.
- `value` and `defaultValue` are string arrays, including single selection.
- `onValueChange(details)` exposes Ark `details.value` and `details.items`.
- `SelectIndicator` and `SelectItemIndicator` render moduix default icons when children are
  omitted. `SelectClearTrigger` composes Ark clearing behavior with the shared
  `CloseButton` by default.
- Keep `SelectIndicator` directly under `SelectControl`, after `SelectClearTrigger`. This follows
  Ark anatomy and leaves the trigger button with phrasing-content children only.
- While the select shows its placeholder, the trigger automatically reduces its end padding so it
  only reserves space for the indicator; selecting a value grows the padding back to make room for
  the clear action.
- Use `SelectContext`, `SelectItemContext`, `useSelectContext`, and
  `useSelectItemContext` for advanced state reads. Import collection helpers directly from
  `@ark-ui/react/collection`.
- Use `useSelect` with `SelectRootProvider`; do not render `Select` for the same state
  instance.
- `SelectItemTextContent`, `SelectItemTextIcon`, and `SelectItemTextLabel` are moduix span
  helpers for richer item text layout.
- No compatibility aliases or compound API are provided.
- Do not gate `Positioner` or `Content` with `SelectContext` and `select.open`;
  Ark's `lazyMount`, `unmountOnExit`, `present`, and exit callbacks own presence.

## Anatomy and exported parts

```text
Select
├─ SelectLabel
├─ SelectControl / SelectField
│  ├─ SelectTrigger
│  │  └─ SelectValueText
│  ├─ SelectClearTrigger
│  └─ SelectIndicator
├─ Overlay subtree (automatically portalled)
│  └─ SelectPositioner
│     └─ SelectContent
│        ├─ SelectList
│        └─ SelectItemGroup
│           ├─ SelectItemGroupLabel
│           └─ SelectItem[item]
│              ├─ SelectItemText
│              └─ SelectItemIndicator
└─ SelectHiddenSelect (explicit)
```

| Export                  | `data-slot`                | Notes                               |
| ----------------------- | -------------------------- | ----------------------------------- |
| `Select`                | `select-root`              | Ark root with moduix styling.       |
| `SelectRootProvider`    | `select-root-provider`     | RootProvider styled like root.      |
| `SelectContext`         | -                          | Ark root context.                   |
| `SelectHiddenSelect`    | -                          | Native form control.                |
| `SelectLabel`           | `select-label`             | Ark label.                          |
| `SelectControl`         | `select-control`           | Ark control state wrapper.          |
| `SelectField`           | `select-control`           | Moduix standard-control helper.     |
| `SelectTrigger`         | `select-trigger`           | Ark trigger button.                 |
| `SelectValueText`       | `select-value-text`        | Placeholder or selected label text. |
| `SelectClearTrigger`    | `select-clear-trigger`     | Ark clear behavior + `CloseButton`. |
| `SelectIndicator`       | `select-indicator`         | Default chevron icon.               |
| `SelectPositioner`      | `select-positioner`        | Floating layer and CSS variables.   |
| `SelectContent`         | `select-content`           | Popup content surface.              |
| `SelectList`            | `select-list`              | Optional list wrapper.              |
| `SelectItemGroup`       | `select-item-group`        | Group wrapper.                      |
| `SelectItemGroupLabel`  | `select-item-group-label`  | Group label.                        |
| `SelectItem`            | `select-item`              | Selectable collection item.         |
| `SelectItemText`        | `select-item-text`         | Item label text.                    |
| `SelectItemIndicator`   | `select-item-indicator`    | Default check icon.                 |
| `SelectItemContext`     | -                          | Ark item context.                   |
| `SelectItemTextContent` | `select-item-text-content` | Moduix span helper.                 |
| `SelectItemTextIcon`    | `select-item-text-icon`    | Moduix span helper.                 |
| `SelectItemTextLabel`   | `select-item-text-label`   | Moduix span helper.                 |

## Composition

```tsx
import { createListCollection } from '@ark-ui/react/collection';
import {
  Select,
  SelectField,
  SelectItem,
  SelectItemIndicator,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
  SelectPositioner,
  SelectContent,
  SelectList,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemText,
} from '@moduix/react/select';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ],
});

export function SelectDemo() {
  return (
    <Select collection={fruits} name="fruit">
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectField placeholder="Select an option" clearLabel="Clear selection" />
      <SelectPositioner>
        <SelectContent>
          {fruits.items.map((item) => (
            <SelectItem key={item.value} item={item}>
              <SelectItemText>{item.label}</SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPositioner>
    </Select>
  );
}
```

## Upstream feature coverage

- Basic, controlled, root provider, multiple, grouping, field, form usage, lazy mount,
  select-on-highlight, max selection, select all, overflow, dynamic collection, and custom item
  layout are represented in docs. Basic, controlled, and root-provider paths are covered by stories.
- Async loading, reactive collections, and virtualized rendering are supported by Ark through
  `collection`, `useListCollection`, and `scrollToIndexFn`; add task-specific examples when
  product docs need those larger integrations.
- Ark `SelectList` is exported for custom list and virtualization paths, but the simple content
  path can render items directly in `SelectContent`.

## Accessibility and state

- Add `SelectHiddenSelect` for form submission, browser autofill, native validation, and reset.
  Very large virtualized collections can instead provide application-owned form integration when
  rendering an option for every item is undesirable.
- Forward refs to the Ark DOM part for root, trigger, control, content, and item parts.
- Preserve Ark state attributes: `data-state`, `data-focus`, `data-invalid`, `data-disabled`,
  `data-readonly`, `data-required`, `data-placeholder-shown`, `data-highlighted`, and item
  `data-state="checked" | "unchecked"`.
- Disable trigger transitions and popup enter/exit animation when the user requests reduced motion.
- Use Ark `Field` / `Fieldset` context for disabled, invalid, required, and read-only
  state.
- Use `SelectContext`, `SelectItemContext`, `useSelectContext`, and
  `useSelectItemContext` for advanced state reads.
- Use `useSelect` with `SelectRootProvider`; do not render `Select` for the same state
  instance.
- Use `asChild` only with a single semantic container that can receive the required Ark props and
  render its children; do not use an interactive host such as `button`.

## Defaults and styling

The trigger defaults to `--moduix-size-md`. Single-line popup items default to `--moduix-size-sm` with `--moduix-spacing-1` block padding.

- Content motion falls back to the shared `--moduix-popup-motion-*` tokens. `--moduix-select-transition` and
  closed-state variables remain the more specific override.
- Moduix styling is applied through CSS Modules plus stable `data-slot` hooks.
- `SelectControl` owns Ark state attributes; `SelectTrigger` renders the visible field chrome.
- The trigger keeps its focus ring while the popup is open and after keyboard focus through
  `:focus-visible`; pointer dismissal does not leave a ring on a closed select. `SelectIndicator`
  highlights its own area inside the trigger; `SelectClearTrigger` does the same as a sibling
  action.
- `SelectClearTrigger` maps select action tokens to `CloseButton`; use `asChild` with one
  semantic child when the clear control needs a custom host or visual treatment.
- Trigger indicators are positioned at the logical inline end, so they follow RTL text flow.
- `SelectContent` uses Ark `--reference-width`, `--available-width`, `--available-height`, and
  `--transform-origin`.
- Open/closed animation is tied to Ark `data-state` attributes.
- Group labels inherit the shared `--moduix-popup-group-label-*` defaults: muted `xs` text, regular
  weight, and `--moduix-spacing-1` block padding. Select-specific variables still take precedence.
- Public theme variables are documented in `website/src/components/examples/select.tsx`.

## Intentional sugar and differences from upstream

- Default icons are added for indicator and item indicator. `ClearTrigger` uses the shared
  `CloseButton` without nesting buttons.
- `Field` is a narrow standard-control helper; `indicator` replaces only the default chevron, while popup positioning, content, and items stay explicit.
- `ItemTextContent`, `ItemTextIcon`, and `ItemTextLabel` are local leaf helpers only; they do not
  replace Ark item composition.
- moduix exposes Ark context parts and state hooks through the `Select` namespace without adding compatibility aliases or translating callback details.
- legacy aliases were removed: `SelectField`, `SelectValue`, `SelectIcon`, `SelectPopup`,
  `SelectArrow`, `SelectContent` as hidden portal wrapper, scroll arrows, separator, `items`,
  `itemToStringLabel`, `itemToStringValue`, null item clearing, and flat part exports.
- Consumers should use Ark `collection`, `item`, `ValueText`, `ClearTrigger`, `Indicator`, and
  `ItemGroup` names.

## Agent notes

- Keep `Positioner` and `Content` explicit; only portal transport belongs to the root.
- Keep package barrel exports aligned with the component file. Docs import from `moduix`, not local
  component paths.
- When registry-shipped select source changes, run `pnpm run build:registry`.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.

## Local changelog

- 2026-09-20: Keyed the trigger auto-padding to the trigger's own `data-placeholder-shown` state
  instead of the rendered clear trigger, dropping the `:has` selector in both styling systems.

- 2026-08-31: Moved the standard indicator directly under `SelectControl` to match Ark anatomy and
  preserve valid trigger-button markup.

- 2026-08-12: Added reduced-motion styling and release-gate coverage for keyboard selection,
  accessible clearing, portal placement, forwarded refs, component states, and long content.

- 2026-08-01: Defaulted portalled overlay presence to lazy mounting and unmounting after exit.

- 2026-09-04: Exposed Ark `HiddenSelect` explicitly and removed root child mutation and the
  wrapper-specific virtual form-control mode.
- 2026-07-30: Added Select tests/stories, standardized popup animation fill mode,
  and migrated docs previews to `PreviewFrame`/`PreviewMeta`.

- 2026-07-22: Removed the indicator-group API from the public API. Indicators belong inside
  `SelectTrigger`, while clear actions render directly under `SelectControl`.

- 2026-07-22: Changed closed-trigger focus styling from Ark's pointer-inclusive `data-focus` to
  `:focus-visible`, so pointer dismissal does not leave a stale focus ring.

- 2026-07-22: Standardized indicator and clear-action placement across docs and examples:
  `SelectIndicator` stays inside `SelectTrigger`; `SelectClearTrigger` sits directly under
  `SelectControl` so it does not overlap the chevron.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Normalized popup group labels to the shared regular-weight, `--moduix-spacing-1` contract.

- 2026-07-21: Reduced the default trigger to `--moduix-size-md` and compacted popup items to `--moduix-size-sm`.

- 2026-07-20: Removed field hover and popup-open surfaces; `SelectField` nests the indicator in the trigger for a precise icon hover target, while clear remains a sibling action.
- 2026-07-19: Positioned trigger indicators with a logical inline-end property for RTL.
- 2026-07-17: Composed the default clear action with `CloseButton` and mapped select action
  tokens to the shared close-button visual contract.
- 2026-07-16: Added shared `--moduix-popup-motion-*` fallbacks for project-wide popup content motion.
- 2026-07-13: Native select form controls were rendered automatically at this point in the wrapper history.

- 2026-07-11: Added `SelectField` for the standard control, including `indicator` customization, and restored moduix namespace access to Ark state hooks and contexts.
- 2026-07-03: Kept the trigger focus ring visible while the popup is open and documented the shared
  field/clear-action hover contract with Combobox.
- 2026-07-03: Removed Ark context parts, state hooks, and duplicate Ark type exports from the
  moduix surface. Kept `RootProvider`, visual parts, and moduix layout sugar.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-27: Removed docs-only manual popup gating so examples preserve Ark presence behavior,
  documented virtualized hidden input guidance, and normalized group label padding to `0.375rem`.
- 2026-06-24: Removed collection helper re-exports from the Select public surface; docs now import
  `createListCollection` and `useListCollection` directly from Ark UI.
- 2026-06-20: Reduced trigger end padding automatically when no clear trigger is rendered, so
  indicator-only selects no longer reserve empty clear-button space.
- 2026-06-19: Made closed popup content inert for stacked docs previews, removed sticky group
  labels, and tightened trigger action icon alignment.
- 2026-06-19: Realigned trigger/control styling with Ark anatomy, added an indicator-group API for
  clear/indicator layout, and changed highlighted item colors to accent tokens.
- 2026-06-19: Migrated `Select` to Ark UI. Replaced legacy flat aliases with
  namespace-first Ark parts, added RootProvider/context/hook exports, rewrote stories/docs, and
  removed legacy compatibility APIs.