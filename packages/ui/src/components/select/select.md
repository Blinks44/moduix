# Select

Upstream primitive docs: https://base-ui.com/react/components/select

## Purpose

`Select` is the moduix wrapper for choosing one or more predefined values from a popup list when the
trigger itself is not searchable. It keeps Base UI selection, keyboard navigation, typeahead,
positioning, and form behavior, then layers on moduix styling, flat exports, default icons, and a
small amount of DX sugar for the common popup and item layouts.

Use `Combobox` instead when the list is large enough that typing to filter is part of the expected
interaction.

## Current behavior contract

- `Select` is a direct re-export of `SelectPrimitive.Root`. It renders no DOM node and does not add
  wrapper state.
- `SelectField` is a plain vertical `div` wrapper for the visible field anatomy.
- `SelectContent` is the default popup path. It always renders:

  ```text
  SelectContent
  └─ SelectPortal
     └─ SelectPositioner
        └─ SelectPopup
           ├─ SelectArrow (only when showArrow)
           └─ children
  ```

- `SelectContent` adds two wrapper defaults:
  - `showArrow={false}`
  - `sideOffset={8}`
- `SelectContent` exposes `alignItemWithTrigger`, because the primitive defaults to overlapping the
  popup with the trigger so the selected item text lines up with the trigger value. In that mode the
  popup can render with `data-side="none"` and some regular floating props become irrelevant until
  the primitive falls back to normal positioning.
- `SelectContent` does **not** render `SelectBackdrop`, `SelectScrollUpArrow`, or
  `SelectScrollDownArrow`. Those stay explicit so modal layering and scroll affordances are opt-in.
- `SelectItem indicator="end"` is moduix-only sugar that moves the selected-state indicator to the
  trailing column through `data-indicator-position="end"`.
- `SelectIcon`, `SelectArrow`, `SelectScrollUpArrow`, `SelectScrollDownArrow`, and
  `SelectItemIndicator` render moduix default icons when `children` are omitted.
- `SelectItemTextContent`, `SelectItemTextIcon`, and `SelectItemTextLabel` are plain `span` helpers
  for richer item rows. They are styling helpers, not primitive parts.
- `Select` does not add a built-in clear button. The current clearable path is a dedicated
  `SelectItem` with `value={null}`, or an external reset action.

## Composition

### Recommended anatomy

```tsx
import {
  Select,
  SelectContent,
  SelectField,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectTrigger,
  SelectValue,
} from 'moduix';

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
];

export function SelectDemo() {
  return (
    <Select items={fruits}>
      <SelectField>
        <SelectLabel>Choose fruit</SelectLabel>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
          <SelectIcon />
        </SelectTrigger>
      </SelectField>

      <SelectContent>
        <SelectList>
          {fruits.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <SelectItemIndicator />
              <SelectItemText>{item.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectList>
      </SelectContent>
    </Select>
  );
}
```

### Grouped or custom popup composition

Use the low-level popup parts when you need a backdrop, sticky positioning, a custom arrow, or other
popup structure that `SelectContent` intentionally does not own:

```tsx
<Select items={fruits}>
  <SelectField>
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectTrigger>
      <SelectValue placeholder="Select an option" />
      <SelectIcon />
    </SelectTrigger>
  </SelectField>

  <SelectPortal>
    <SelectBackdrop className={styles.backdrop} />
    <SelectPositioner alignItemWithTrigger={false} sideOffset={8} sticky>
      <SelectPopup>
        <SelectArrow />
        <SelectList>
          {fruits.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <SelectItemIndicator />
              <SelectItemText>{item.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </SelectPositioner>
  </SelectPortal>
</Select>
```

### Multiple selection

`multiple` keeps the primitive array-selection behavior. Format the trigger value explicitly:

```tsx
const languages = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
} as const;

type Language = keyof typeof languages;

function renderMultipleValue(value: Language[]) {
  if (value.length === 0) {
    return 'Select languages';
  }

  const first = languages[value[0]];
  const suffix = value.length > 1 ? ` (+${value.length - 1})` : '';

  return `${first}${suffix}`;
}

<Select<Language, true> multiple defaultValue={['javascript', 'typescript']}>
  <SelectField>
    <SelectLabel>Languages</SelectLabel>
    <SelectTrigger>
      <SelectValue>{renderMultipleValue}</SelectValue>
      <SelectIcon />
    </SelectTrigger>
  </SelectField>

  <SelectContent alignItemWithTrigger={false}>
    <SelectList>{/* items */}</SelectList>
  </SelectContent>
</Select>;
```

## Public parts

| Part                    | Element                     | `data-slot`                | Purpose                                                               |
| ----------------------- | --------------------------- | -------------------------- | --------------------------------------------------------------------- |
| `Select`                | none                        | -                          | Root selection state, popup state, typeahead, and form integration.   |
| `SelectField`           | `div`                       | `select-field`             | Vertical field wrapper.                                               |
| `SelectLabel`           | primitive label             | `select-label`             | Visible field label.                                                  |
| `SelectTrigger`         | primitive trigger           | `select-trigger`           | Button that opens and closes the popup.                               |
| `SelectValue`           | primitive value             | `select-value`             | Placeholder or selected value renderer.                               |
| `SelectIcon`            | primitive icon              | `select-icon`              | Trigger icon wrapper with default chevron icon.                       |
| `SelectContent`         | composition                 | -                          | Convenience wrapper for portal + positioner + popup + optional arrow. |
| `SelectPortal`          | primitive portal            | `select-portal`            | Mount target for popup content.                                       |
| `SelectBackdrop`        | primitive backdrop          | `select-backdrop`          | Optional modal backdrop.                                              |
| `SelectPositioner`      | primitive positioner        | `select-positioner`        | Floating layout and collision-aware positioning layer.                |
| `SelectPopup`           | primitive popup             | `select-popup`             | Popup surface.                                                        |
| `SelectArrow`           | primitive arrow             | `select-arrow`             | Default decorative popup arrow.                                       |
| `SelectScrollUpArrow`   | primitive scroll-up arrow   | `select-scroll-up-arrow`   | Optional top scroll affordance for tall lists.                        |
| `SelectScrollDownArrow` | primitive scroll-down arrow | `select-scroll-down-arrow` | Optional bottom scroll affordance for tall lists.                     |
| `SelectList`            | primitive list              | `select-list`              | Select list container.                                                |
| `SelectItem`            | primitive item              | `select-item`              | Selectable option. Supports `indicator="start" \| "end"`.             |
| `SelectItemIndicator`   | primitive item indicator    | `select-item-indicator`    | Selected-state indicator with default check icon.                     |
| `SelectItemText`        | primitive item text         | `select-item-text`         | Primary item text content.                                            |
| `SelectItemTextContent` | `span`                      | `select-item-text-content` | Inline layout wrapper for icon + label item text.                     |
| `SelectItemTextIcon`    | `span`                      | `select-item-text-icon`    | Fixed-size icon slot inside richer item text.                         |
| `SelectItemTextLabel`   | `span`                      | `select-item-text-label`   | Ellipsized text label inside richer item text.                        |
| `SelectSeparator`       | primitive separator         | `select-separator`         | Visual separator between item groups.                                 |
| `SelectGroup`           | primitive group             | `select-group`             | Logical group wrapper for related items.                              |
| `SelectGroupLabel`      | primitive group label       | `select-group-label`       | Sticky group heading inside the popup.                                |

## Public props

Every DOM part accepts `className`. The root `Select` renders no DOM node; all root behavior comes
from the Base UI primitive. The wrapper does not add extra root props.

### `Select`

Important root props preserved in this repository:

| Prop                                      | Notes                                                                                   |
| ----------------------------------------- | --------------------------------------------------------------------------------------- |
| `items`                                   | Recommended when labels should come from structured items instead of raw values.        |
| `itemToStringLabel` / `itemToStringValue` | Strongly recommended for object values so labels and submitted values stay predictable. |
| `value` / `defaultValue`                  | Controlled or uncontrolled selected value.                                              |
| `onValueChange`                           | Called with the next selected value or value array.                                     |
| `multiple`                                | Enables array selection.                                                                |
| `open` / `defaultOpen` / `onOpenChange`   | Controlled or uncontrolled popup state.                                                 |
| `disabled`, `required`, `name`, `form`    | Native form and disabled state behavior forwarded to the primitive.                     |

### `SelectValue`

| Prop          | Notes                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------- |
| `placeholder` | Placeholder shown when there is no value.                                                   |
| `children`    | Optional render function for formatting selected value(s), including multiple-selection UI. |

### `SelectContent`

`SelectContent` applies popup props to `SelectPopup` and positioning props to `SelectPositioner`.

| Prop                                                          | Default           | Notes                                                                                                                |
| ------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `showArrow`                                                   | `false`           | Renders the built-in `SelectArrow` before popup children.                                                            |
| `sideOffset`                                                  | `8`               | Gap between trigger and popup when regular floating positioning is active.                                           |
| `alignItemWithTrigger`                                        | primitive default | Keeps Base UI's select-specific overlap positioning. Use `false` for normal floating layout or when using the arrow. |
| `side`, `align`, `alignOffset`, `arrowPadding`                | -                 | Forwarded to `SelectPositioner`.                                                                                     |
| `collisionAvoidance`, `collisionBoundary`, `collisionPadding` | -                 | Forwarded to `SelectPositioner`.                                                                                     |
| `className` and popup props                                   | -                 | Applied to `SelectPopup`.                                                                                            |

`SelectContent` does **not** accept portal props such as `keepMounted` or `container`. Switch to
explicit `SelectPortal` composition when those are needed.

### `SelectItem`

| Prop        | Type               | Notes                                                       |
| ----------- | ------------------ | ----------------------------------------------------------- |
| `value`     | item value         | Source of truth for the selected option.                    |
| `indicator` | `'start' \| 'end'` | moduix-only indicator placement sugar. Defaults to `start`. |

### Other exported parts

- `SelectLabel`, `SelectTrigger`, `SelectValue`, `SelectIcon`, `SelectPortal`, `SelectBackdrop`,
  `SelectPositioner`, `SelectPopup`, `SelectArrow`, `SelectScrollUpArrow`,
  `SelectScrollDownArrow`, `SelectList`, `SelectItemIndicator`, `SelectItemText`,
  `SelectSeparator`, `SelectGroup`, and `SelectGroupLabel` forward the corresponding Base UI part
  props and add moduix classes plus `data-slot`.
- `SelectField`, `SelectItemTextContent`, `SelectItemTextIcon`, and `SelectItemTextLabel` are plain
  wrappers around native elements.

## Styling API

### Slot hooks

All exported DOM parts expose `data-slot`. The most useful hooks for consumer CSS are:

- `select-field`
- `select-label`
- `select-trigger`
- `select-value`
- `select-icon`
- `select-popup`
- `select-arrow`
- `select-list`
- `select-item`
- `select-item-indicator`
- `select-item-text`
- `select-group-label`

### State and structural attributes

The shipped styles rely on Base UI state attributes plus one moduix attribute:

| Attribute                                  | Appears on         | Meaning                                                 |
| ------------------------------------------ | ------------------ | ------------------------------------------------------- |
| `data-popup-open`                          | `SelectTrigger`    | Popup is open.                                          |
| `data-placeholder`                         | `SelectValue`      | No value is selected.                                   |
| `data-disabled` / `disabled`               | trigger and items  | Non-interactive state.                                  |
| `data-highlighted`                         | `SelectItem`       | Keyboard or pointer-highlighted row.                    |
| `data-indicator-position="end"`            | `SelectItem`       | Moves the item indicator to the trailing column.        |
| `data-direction="up" / "down"`             | scroll arrows      | Which scroll affordance is rendered.                    |
| `data-side`                                | popup and arrow    | Current floating side; can be `"none"` in overlap mode. |
| `data-starting-style`, `data-ending-style` | popup and backdrop | Enter and exit transition lifecycle.                    |

### CSS variables

The public token surface lives in `packages/ui/src/styles/theme.css`. The main groups are:

| Group              | Examples                                                                                                                                       | Affects                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Field and trigger  | `--select-width`, `--select-control-height`, `--select-trigger-padding-x`, `--select-bg`, `--select-border-color`, `--select-focus-ring-color` | Field layout, trigger size, border, focus |
| Popup              | `--select-popup-bg`, `--select-popup-border-color`, `--select-popup-max-height`, `--select-shadow`, `--select-radius`                          | Popup surface and overall shape           |
| List and items     | `--select-list-max-height`, `--select-item-min-height`, `--select-item-gap`, `--select-highlight-bg`, `--select-highlight-color`               | Scroll area and item presentation         |
| Item text helpers  | `--select-item-text-content-gap`, `--select-item-text-icon-size`, `--select-item-text-icon-color`                                              | Richer item text composition              |
| Groups and divider | `--select-group-label-*`, `--select-group-padding-bottom`, `--select-separator-*`                                                              | Group headings and separators             |
| Arrow and backdrop | `--select-arrow-*`, `--select-backdrop-*`, `--select-scroll-arrow-*`                                                                           | Popup arrow, optional backdrop, scroll UI |

There are no component-level variant props. Style the part that owns the visual concern:

- use `className` on `SelectTrigger` for field chrome overrides
- use `className` on `SelectContent` or `SelectPopup` for popup surface overrides
- use `className` on `SelectItem` / `SelectItemText` for row layout changes
- use `className` on `SelectGroupLabel` for sticky heading styling

## UX and accessibility

- Every select needs an accessible name. Prefer `SelectLabel`, or provide `aria-label` on
  `SelectTrigger` when there is no visible label.
- Use `items` when possible so `SelectValue` can render the correct label for the selected value
  without manual lookup code.
- For object values, provide both `itemToStringLabel` and `itemToStringValue`. This keeps trigger
  rendering, typeahead, and submitted form values stable.
- Use `alignItemWithTrigger={false}` whenever the popup needs a conventional floating relationship,
  a built-in arrow, or positioning props such as `side`/`align` to predictably affect placement.
- Add `SelectScrollUpArrow` and `SelectScrollDownArrow` for tall option lists so overflow is easier
  to discover.
- For clearable fields, include a `null` option or provide an external reset control. Placeholder
  text alone does not create a clear action.
- Keyboard navigation, typeahead, focus management, selection state, hidden input behavior, and ARIA
  roles are owned by Base UI and should stay delegated to the primitive.

## Intentional differences from Base UI

- moduix documents and exports flat parts (`SelectTrigger`, `SelectContent`, `SelectItem`, etc.)
  instead of teaching the namespaced upstream API in local docs.
- The wrapper ships with CSS Modules styling, `data-slot` hooks, and public `--select-*` variables.
- `SelectContent` is the default high-level popup path with built-in `showArrow` and `sideOffset`
  sugar.
- `SelectItem indicator="end"` and the `SelectItemTextContent/Icon/Label` helpers are moduix-only
  composition conveniences.
- Default chevron, check, and popup-arrow icons come from moduix when the corresponding icon parts
  do not receive custom children.

## Agent notes

- Preserve the split between the simple `SelectContent` path and explicit low-level popup parts.
  Do not fold backdrop, portal props, or scroll arrows into `SelectContent`.
- Preserve the select-specific overlap behavior exposed through `alignItemWithTrigger`, including the
  `data-side="none"` styling path on the popup.
- Preserve the anchor-width popup sizing and `overflow: visible` popup surface, because the current
  arrow and overlap behavior depend on them.
- Keep the item indicator API aligned with other popup-like list components: `showArrow` on content,
  `indicator="end"` on items, explicit item text composition for richer layouts.
- If `data-slot` values or `--select-*` variables change, update `theme.css`, Storybook, docs
  examples, and this file in the same task.

## Motion tokens

`SelectBackdrop` and `SelectPopup` now expose phase-specific motion variables. Override the backdrop `starting/ending-opacity` and `starting/ending-blur` tokens, plus `--select-popup-transition` and the matching popup `starting/ending-opacity`, `*-scale`, and `*-translate-x/y` tokens to switch the popup from the default scale-in behavior to fade, slide, or custom motion.

## Local changelog

- 2026-06-10: Added phase-specific backdrop and popup motion tokens so select overlays can be retuned to fade, slide, or mixed effects through CSS variables while preserving the current default animation.
- Rewrote the local documentation around the actual moduix `Select` wrapper contract, including the
  exported parts, popup composition, styling API, accessibility guidance, and current DX sugar.