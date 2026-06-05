# Combobox

Upstream primitive docs: https://base-ui.com/react/components/combobox

## Purpose

`Combobox` is the moduix wrapper for selecting one or more predefined items through a text input,
searchable popup list, or trigger-first composition. The public contract in this repository is the
set of exported moduix parts, their default icons and styles, `data-slot` hooks, `ComboboxContent`
popup sugar, the `indicator` convenience prop on `ComboboxItem`, and the multiple-selection chip
composition.

Use it when the user must end up with selected items, not arbitrary free-form text. Use
`Autocomplete` when typing arbitrary text is the real value and suggestions only assist input.

## Current behavior contract

- `Combobox` itself is `@base-ui/react/combobox` root state. It does not render a DOM node.
- The default input composition is `ComboboxField > label (native) > ComboboxInputGroup >
ComboboxInput + ComboboxControlActions`.
- `ComboboxContent` is the high-level popup wrapper for the common case. It renders
  `ComboboxPortal > ComboboxPositioner > ComboboxPopup` and can opt into the built-in arrow with
  `showArrow`.
- `ComboboxFieldLabel` remains the trigger label for the trigger-first pattern where the search
  input lives inside the popup.
- `ComboboxFieldTrigger` plus `ComboboxValue` supports the trigger-first pattern where the search
  input lives inside the popup.
- `ComboboxInlineInputContainer` is the built-in wrapper for that popup-inline input pattern. It
  adds the divider and nested input border treatment so consumers do not need a raw wrapper `div`.
- `ComboboxItem indicator="end"` is moduix-only sugar that flips the item indicator to the trailing
  side via `data-indicator-position="end"`.
- `ComboboxTrigger`, `ComboboxIcon`, `ComboboxClear`, `ComboboxItemIndicator`, and
  `ComboboxChipRemove` render default moduix icons when no children are passed.
- Multiple selection is composed explicitly with `multiple`, `ComboboxValue`, `ComboboxChips`,
  `ComboboxChip`, `ComboboxChipText`, `ComboboxChipRemove`, and `ComboboxChipsInput`.
- `ComboboxStatus` is visually inert when empty and becomes the styled status row only when it has
  content.

## Composition

Recommended default composition:

```text
Combobox
├─ ComboboxField
│  ├─ label (native)
│  └─ ComboboxInputGroup
│     ├─ ComboboxInput
│     └─ ComboboxControlActions
│        ├─ ComboboxClear
│        └─ ComboboxTrigger
└─ ComboboxContent
   ├─ ComboboxStatus / ComboboxEmpty
   └─ ComboboxList
      ├─ ComboboxGroup / ComboboxCollection
      ├─ ComboboxRow
      ├─ ComboboxSeparator
      └─ ComboboxItem
         ├─ ComboboxItemIndicator
         └─ ComboboxItemText
```

Trigger-first popup composition:

```tsx
<Combobox items={countries} itemToStringLabel={(item) => item.label}>
  <ComboboxField>
    <ComboboxFieldLabel>Country</ComboboxFieldLabel>
    <ComboboxFieldTrigger>
      <ComboboxValue placeholder="Select country" />
      <ComboboxIcon />
    </ComboboxFieldTrigger>
  </ComboboxField>

  <ComboboxContent sideOffset={4}>
    <ComboboxInlineInputContainer>
      <ComboboxInput placeholder="Search country" />
    </ComboboxInlineInputContainer>
    <ComboboxEmpty>No countries found.</ComboboxEmpty>
    <ComboboxList>{/* items */}</ComboboxList>
  </ComboboxContent>
</Combobox>
```

Multiple selection composition:

```tsx
<Combobox items={fruits} itemToStringLabel={(item) => item.label} multiple>
  <ComboboxField>
    <label htmlFor={id}>Select fruits</label>
    <ComboboxInputGroup>
      <ComboboxChips>
        <ComboboxValue>
          {(value) => (
            <>
              {value.map((item) => (
                <ComboboxChip key={item.id} aria-label={item.label}>
                  <ComboboxChipText>{item.label}</ComboboxChipText>
                  <ComboboxChipRemove aria-label={`Remove ${item.label}`} />
                </ComboboxChip>
              ))}
              <ComboboxChipsInput id={id} placeholder={value.length === 0 ? 'Select...' : ''} />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
    </ComboboxInputGroup>
  </ComboboxField>

  <ComboboxContent>
    <ComboboxEmpty>No fruits found.</ComboboxEmpty>
    <ComboboxList>{/* items */}</ComboboxList>
  </ComboboxContent>
</Combobox>
```

## Public parts

| Part                           | Element                  | Slot                                          | Notes                                                                                |
| ------------------------------ | ------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------------ |
| `Combobox`                     | none                     | -                                             | Root state, filtering, selected value(s), popup state, forms, and keyboard behavior. |
| `ComboboxField`                | `div`                    | `data-slot="combobox-field"`                  | Vertical field wrapper. Plain div wrapper.                                           |
| `ComboboxFieldLabel`           | primitive label          | `data-slot="combobox-field-label"`            | Trigger label for the popup-inline input composition.                                |
| `ComboboxValue`                | none                     | `data-slot="combobox-value"`                  | Reads the selected value or values.                                                  |
| `ComboboxInlineInputContainer` | `div`                    | `data-slot="combobox-inline-input-container"` | Helper for popup-inline input composition.                                           |
| `ComboboxInputGroup`           | primitive input-group    | `data-slot="combobox-input-group"`            | Styled control surface for the input path.                                           |
| `ComboboxInput`                | primitive input          | `data-slot="combobox-input"`                  | Search input for single-select and popup-inline patterns.                            |
| `ComboboxControlActions`       | `div`                    | `data-slot="combobox-control-actions"`        | Action container for clear/trigger buttons. Plain div wrapper.                       |
| `ComboboxTrigger`              | primitive trigger        | `data-slot="combobox-trigger"`                | Inline trigger button. Default chevron-down icon.                                    |
| `ComboboxFieldTrigger`         | primitive trigger        | `data-slot="combobox-field-trigger"`          | Trigger-style field for popup-inline input composition.                              |
| `ComboboxIcon`                 | primitive icon           | `data-slot="combobox-icon"`                   | Decorative icon for trigger-style fields. Default chevron-up-down icon.              |
| `ComboboxClear`                | primitive clear          | `data-slot="combobox-clear"`                  | Clears the current selection/input. Default close icon.                              |
| `ComboboxPortal`               | primitive portal         | `data-slot="combobox-portal"`                 | Low-level popup portal.                                                              |
| `ComboboxBackdrop`             | primitive backdrop       | `data-slot="combobox-backdrop"`               | Optional modal backdrop.                                                             |
| `ComboboxPositioner`           | primitive positioner     | `data-slot="combobox-positioner"`             | Floating positioning wrapper.                                                        |
| `ComboboxPopup`                | primitive popup          | `data-slot="combobox-popup"`                  | Popup surface.                                                                       |
| `ComboboxArrow`                | primitive arrow          | `data-slot="combobox-arrow"`                  | Optional popup arrow.                                                                |
| `ComboboxContent`              | popup via portal         | -                                             | Convenience wrapper around portal + positioner + popup + optional arrow.             |
| `ComboboxStatus`               | primitive status         | `data-slot="combobox-status"`                 | Optional loading/error/helper row.                                                   |
| `ComboboxEmpty`                | primitive empty          | `data-slot="combobox-empty"`                  | Empty state area.                                                                    |
| `ComboboxList`                 | primitive list           | `data-slot="combobox-list"`                   | Listbox/grid container and render-prop entry point.                                  |
| `ComboboxRow`                  | primitive row            | `data-slot="combobox-row"`                    | Grid row wrapper for `grid` mode.                                                    |
| `ComboboxItem`                 | primitive item           | `data-slot="combobox-item"`                   | Selectable item. Supports `indicator="start" \| "end"`.                              |
| `ComboboxItemIndicator`        | primitive item indicator | `data-slot="combobox-item-indicator"`         | Selected marker. Default check icon.                                                 |
| `ComboboxItemText`             | `span`                   | `data-slot="combobox-item-text"`              | Styled text wrapper. Plain span, not a primitive item-text part.                     |
| `ComboboxSeparator`            | primitive separator      | `data-slot="combobox-separator"`              | Visual separator.                                                                    |
| `ComboboxGroup`                | primitive group          | `data-slot="combobox-group"`                  | Group wrapper for nested items.                                                      |
| `ComboboxGroupLabel`           | primitive group label    | `data-slot="combobox-group-label"`            | Sticky group heading.                                                                |
| `ComboboxCollection`           | none                     | `data-slot="combobox-collection"`             | Nested render-prop collection inside a group.                                        |
| `ComboboxChips`                | primitive chips          | `data-slot="combobox-chips"`                  | Chip container for `multiple`.                                                       |
| `ComboboxChip`                 | primitive chip           | `data-slot="combobox-chip"`                   | One rendered selected item chip.                                                     |
| `ComboboxChipRemove`           | primitive chip remove    | `data-slot="combobox-chip-remove"`            | Removes a selected chip. Default close icon.                                         |
| `ComboboxChipText`             | `span`                   | `data-slot="combobox-chip-text"`              | Styled chip text wrapper. Plain span.                                                |
| `ComboboxChipsInput`           | primitive input          | `data-slot="combobox-chips-input"`            | Input used inside chip composition.                                                  |

## Public props

Every visual part accepts `className`. Refs are forwarded for the primitive-based parts and for
`ComboboxInlineInputContainer`. Plain wrappers such as `ComboboxField`, `ComboboxControlActions`,
`ComboboxItemText`, and `ComboboxChipText` do not expose refs.

### `Combobox`

Important root props that are used and preserved in this repository:

| Prop                                                             | Type                             | Notes                                                                               |
| ---------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| `items`                                                          | item array or grouped item array | Source items for filtering and render props.                                        |
| `itemToStringLabel`                                              | `(item) => string`               | Recommended for object items so selected labels and input text stay predictable.    |
| `itemToStringValue`                                              | `(item) => string`               | Useful when the form value should come from a stable string field.                  |
| `value` / `defaultValue`                                         | selected item or item array      | Controlled/uncontrolled selected value.                                             |
| `onValueChange`                                                  | callback                         | Fires when the selected value changes.                                              |
| `inputValue` / `defaultInputValue`                               | `string`                         | Controlled/uncontrolled input text.                                                 |
| `onInputValueChange`                                             | callback                         | Required for async/manual filtering flows.                                          |
| `open` / `defaultOpen` / `onOpenChange` / `onOpenChangeComplete` | popup state props                | Control popup visibility when needed.                                               |
| `multiple`                                                       | `boolean`                        | Enables array selection and chip composition.                                       |
| `filter` / `filteredItems` / `limit`                             | filtering props                  | Use `filter={null}` for async or externally filtered results.                       |
| `grid` / `virtualized` / `loopFocus` / `autoHighlight`           | behavior props                   | Advanced list navigation and rendering modes from the primitive.                    |
| `modal` / `openOnInputClick`                                     | behavior props                   | Useful for modal popups or input-driven open behavior.                              |
| `disabled` / `readOnly` / `required` / `name` / `form`           | form props                       | Pass these on the root so the primitive coordinates the control and popup behavior. |

### `ComboboxContent`

`ComboboxContent` renders `ComboboxPortal > ComboboxPositioner > ComboboxPopup` and forwards its ref
to `ComboboxPopup`.

| Prop                                                          | Type             | Default |
| ------------------------------------------------------------- | ---------------- | ------- |
| `showArrow`                                                   | `boolean`        | `false` |
| `sideOffset`                                                  | `number`         | `5`     |
| `side`, `align`, `alignOffset`, `arrowPadding`                | positioner props | -       |
| `collisionAvoidance`, `collisionBoundary`, `collisionPadding` | positioner props | -       |
| `className` and popup props                                   | popup props      | -       |

### `ComboboxItem`

| Prop        | Type               | Notes                                                                                   |
| ----------- | ------------------ | --------------------------------------------------------------------------------------- |
| `value`     | item               | The actual selected item. This is the source of truth, not `ComboboxItemText` children. |
| `indicator` | `'start' \| 'end'` | moduix-only convenience prop for selected-indicator placement.                          |

### Hooks

| Hook                               | Purpose                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| `useComboboxFilter()`              | Returns primitive filter helpers such as `contains`.                           |
| `useComboboxFilteredItems<Item>()` | Reads the filtered items from combobox context for custom list/grid rendering. |

## Styling API

### Slot hooks

All visual parts expose `data-slot` hooks. The most useful ones in consumer CSS are:

- `combobox-field`
- `combobox-field-label`
- `combobox-inline-input-container`
- `combobox-input-group`
- `combobox-input`
- `combobox-control-actions`
- `combobox-trigger`
- `combobox-field-trigger`
- `combobox-icon`
- `combobox-clear`
- `combobox-popup`
- `combobox-status`
- `combobox-empty`
- `combobox-list`
- `combobox-item`
- `combobox-item-indicator`
- `combobox-item-text`
- `combobox-chip`
- `combobox-chip-remove`
- `combobox-chip-text`
- `combobox-chips-input`

### State and structural attributes

The shipped styles rely on primitive attributes plus one moduix attribute:

| Attribute                                  | Appears on         | Meaning                                          |
| ------------------------------------------ | ------------------ | ------------------------------------------------ |
| `data-highlighted`                         | items and chips    | Highlighted by keyboard or pointer.              |
| `data-disabled` / `disabled`               | controls and items | Non-interactive state.                           |
| `data-popup-open`                          | triggers           | Popup is open.                                   |
| `data-empty`                               | list               | Filtered list rendered no items.                 |
| `data-starting-style`, `data-ending-style` | popup/backdrop     | Enter and exit transitions.                      |
| `data-side`                                | arrow              | Current popup side.                              |
| `data-indicator-position="end"`            | item               | Moves the item indicator to the trailing column. |

### CSS variables

The public token surface lives in `packages/ui/src/styles/theme.css`. The main groups are:

| Group                   | Examples                                                                                                                                   | Affects                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| Control                 | `--combobox-width`, `--combobox-control-height`, `--combobox-radius`, `--combobox-bg`, `--combobox-border-color`, `--combobox-color`       | Input group and field trigger.              |
| Actions and icons       | `--combobox-action-size`, `--combobox-action-radius`, `--combobox-actions-gap`, `--combobox-icon-color`, `--combobox-icon-size`            | Clear/trigger controls and icons.           |
| Input                   | `--combobox-input-padding-x-start`, `--combobox-input-padding-x-end`, `--combobox-input-placeholder-color`                                 | Input spacing and placeholder color.        |
| Popup                   | `--combobox-popup-bg`, `--combobox-popup-border-color`, `--combobox-popup-max-height`, `--combobox-shadow`                                 | Popup surface and size.                     |
| List and items          | `--combobox-list-max-height`, `--combobox-item-min-height`, `--combobox-item-gap`, `--combobox-highlight-bg`, `--combobox-highlight-color` | List scrolling and item presentation.       |
| Groups and support rows | `--combobox-group-label-*`, `--combobox-empty-*`, `--combobox-status-*`                                                                    | Group headers, empty state, and status row. |
| Chips                   | `--combobox-chip-*`, `--combobox-chips-*`                                                                                                  | Multiple-selection chip layout.             |
| Arrow and backdrop      | `--combobox-arrow-*`, `--combobox-backdrop-*`                                                                                              | Optional arrow and modal backdrop.          |

`ComboboxInlineInputContainer` intentionally reuses the regular combobox border, radius, and spacing
tokens instead of introducing a separate inline-input variable family.

## UX and accessibility

- Prefer a native `<label htmlFor={id}>` plus `ComboboxInput id={id}` for the standard input path.
- For icon-only `ComboboxClear` and `ComboboxTrigger`, always pass an accessible name with
  `aria-label`.
- In the trigger-first composition, keep `ComboboxFieldLabel`, `ComboboxFieldTrigger`,
  `ComboboxInlineInputContainer`, and `ComboboxInput` inside the same combobox tree so the primitive
  maintains labeling and focus correctly.
- Keyboard behavior comes from the primitive: typing filters, arrow keys move the highlight, Enter
  commits the highlighted item, Escape closes the popup, and `grid` switches navigation to
  row/column movement.
- `disabled` and `readOnly` should be applied at the root, not on isolated child parts.
- `ComboboxStatus` is the intended place for async loading or error messaging. Add `aria-busy` on
  `ComboboxContent` or `ComboboxPopup` in async flows when the list is loading.

## Intentional differences from Base UI

- Consumers import moduix parts from `moduix`, not Base UI combobox primitives directly.
- `ComboboxContent` is a convenience popup wrapper with the shared popup positioning props and
  `showArrow`.
- `ComboboxItem` adds the small `indicator` prop for start/end selected-marker placement.
- `ComboboxInlineInputContainer` is a moduix helper for popup-inline input layouts.
- Default icons are bundled into trigger/clear/icon/indicator/remove parts when children are omitted.
- `ComboboxItemText` and `ComboboxChipText` are plain styled spans, not additional primitive parts.
- moduix styling contracts include the shipped CSS modules, theme variables, and `data-slot` hooks.

## Limitations and recommendations

- Keep item values stable. For object items, use the same object shape in `items` and
  `ComboboxItem value`, and provide `itemToStringLabel`.
- Use `filter={null}` when results are already filtered by application state or a remote request.
- Use `ComboboxContent` for the standard popup path. Drop to `ComboboxPortal`,
  `ComboboxPositioner`, `ComboboxPopup`, `ComboboxBackdrop`, and `ComboboxArrow` only when popup
  infrastructure itself must change.
- `ComboboxInput` is styled for the standard inline-actions control by default. For popup-inline
  search, prefer `ComboboxInlineInputContainer` rather than re-creating the divider and nested input
  treatment manually.
- `ComboboxItemText` content does not drive selection labeling. The displayed selected label comes
  from the root item string helpers such as `itemToStringLabel`.

## Agent notes

- Preserve `ComboboxContent` as thin popup sugar. Do not move backdrop logic or additional layout
  APIs into it.
- Keep the built-in arrow opt-in via `showArrow={false}` by default.
- Preserve `ComboboxInlineInputContainer` as the recommended helper for input-inside-popup examples.
- Preserve the `indicator="end"` contract and its `data-indicator-position` styling hook.
- Keep disabled styling coordinated across the input group, field trigger, and action buttons.

## Local changelog

- 2026-06-02: Rewrote the local docs around the actual moduix wrapper, added
  `ComboboxInlineInputContainer` for the popup-inline input pattern, forwarded refs through
  `ComboboxContent`, and documented the real slot, styling, and composition contracts instead of
  upstream Base UI copy.
- 2026-06-05: Updated the recommended input-first composition to use a native `<label>` while
  keeping `ComboboxFieldLabel` for the trigger-first pattern that Base UI labels directly.