# Autocomplete

`Autocomplete` is a moduix composition for free-form text input with optional suggestions. It wraps
Base UI autocomplete primitives, but the public surface in this package is the exported moduix parts,
their built-in styles, icons, `data-slot` attributes, and the `AutocompleteContent` convenience
wrapper.

Use it when the user may type any text and suggestions only help complete that text. Use
`Combobox` when the component must remember selected items as selection state.

## Basic usage

```tsx
import { useId, useState, useTransition } from 'react';
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteControlActions,
  AutocompleteEmpty,
  AutocompleteField,
  AutocompleteFieldLabel,
  AutocompleteFieldTrigger,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteInlineInputContainer,
  AutocompleteItem,
  AutocompleteItemText,
  AutocompleteList,
  AutocompleteStatus,
  AutocompleteTrigger,
  AutocompleteValue,
  useAutocompleteFilter,
} from 'moduix';

interface TagItem {
  id: string;
  value: string;
}

const tags: TagItem[] = [
  { id: 't1', value: 'feature' },
  { id: 't2', value: 'fix' },
  { id: 't3', value: 'bug' },
  { id: 't4', value: 'docs' },
];

export function AutocompleteDemo() {
  const id = useId();

  return (
    <Autocomplete items={tags} itemToStringValue={(item) => item.value}>
      <AutocompleteField>
        <label htmlFor={id}>Search tags</label>
        <AutocompleteInputGroup>
          <AutocompleteInput id={id} placeholder="e.g. feature" />
          <AutocompleteControlActions>
            <AutocompleteClear aria-label="Clear value" />
            <AutocompleteTrigger aria-label="Open suggestions" />
          </AutocompleteControlActions>
        </AutocompleteInputGroup>
      </AutocompleteField>

      <AutocompleteContent>
        <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
        <AutocompleteList>
          {(item: TagItem) => (
            <AutocompleteItem key={item.id} value={item}>
              <AutocompleteItemText>{item.value}</AutocompleteItemText>
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  );
}
```

`AutocompleteTrigger`, `AutocompleteIcon`, `AutocompleteClear`, and `AutocompleteArrow` render moduix
default icons when no children are passed.

## Parts

| Part                          | Element          | Slot data attribute                          | Purpose                                                                         |
| ----------------------------- | ---------------- | -------------------------------------------- | ------------------------------------------------------------------------------- |
| `Autocomplete`                | none             | -                                            | Root state, filtering, value, open state, and keyboard behavior.                |
| `AutocompleteField`           | `div`            | `data-slot="autocomplete-field"`             | Vertical field layout wrapper.                                                  |
| `AutocompleteFieldLabel`      | primitive label  | `data-slot="autocomplete-field-label"`       | Trigger label for the input-inside-popup composition.                           |
| `AutocompleteInputGroup`      | `div`            | `data-slot="autocomplete-input-group"`       | Styled input control surface.                                                   |
| `AutocompleteInput`           | `input`          | `data-slot="autocomplete-input"`             | Text input that drives filtering.                                               |
| `AutocompleteControlActions`  | `div`            | `data-slot="autocomplete-control-actions"`   | Absolute-positioned clear/trigger action group.                                 |
| `AutocompleteClear`           | `button`         | `data-slot="autocomplete-clear"`             | Clears the input value.                                                         |
| `AutocompleteTrigger`         | `button`         | `data-slot="autocomplete-trigger"`           | Opens or closes suggestions from the input control.                             |
| `AutocompleteFieldTrigger`    | `button`         | `data-slot="autocomplete-field-trigger"`     | Trigger-style control for input-inside-popup composition.                       |
| `AutocompleteValue`           | none             | `data-slot="autocomplete-value"`             | Render prop for the current input value.                                        |
| `AutocompleteIcon`            | `span`           | `data-slot="autocomplete-icon"`              | Decorative icon for trigger-style composition.                                  |
| `AutocompleteContent`         | popup via portal | -                                            | Convenience wrapper around `Portal`, `Positioner`, `Popup`, and optional arrow. |
| `AutocompletePortal`          | portal           | `data-slot="autocomplete-portal"`            | Low-level portal for custom content composition.                                |
| `AutocompleteBackdrop`        | `div`            | `data-slot="autocomplete-backdrop"`          | Optional modal backdrop.                                                        |
| `AutocompletePositioner`      | `div`            | `data-slot="autocomplete-positioner"`        | Floating positioning wrapper.                                                   |
| `AutocompletePopup`           | `div`            | `data-slot="autocomplete-popup"`             | Styled popup surface.                                                           |
| `AutocompleteArrow`           | `div`            | `data-slot="autocomplete-arrow"`             | Popup arrow.                                                                    |
| `AutocompleteStatus`          | `div`            | `data-slot="autocomplete-status"`            | Optional status row for loading/error/result text.                              |
| `AutocompleteEmpty`           | `div`            | `data-slot="autocomplete-empty"`             | Empty-state content shown when the filtered list is empty.                      |
| `AutocompleteList`            | listbox/grid     | `data-slot="autocomplete-list"`              | Renders filtered items or groups.                                               |
| `AutocompleteRow`             | row              | `data-slot="autocomplete-row"`               | Row wrapper for `grid` mode.                                                    |
| `AutocompleteItem`            | option           | `data-slot="autocomplete-item"`              | Suggestion item.                                                                |
| `AutocompleteItemText`        | `span`           | `data-slot="autocomplete-item-text"`         | Text wrapper with ellipsis behavior.                                            |
| `AutocompleteItemTextContent` | `span`           | `data-slot="autocomplete-item-text-content"` | Inline icon + label layout.                                                     |
| `AutocompleteItemTextIcon`    | `span`           | `data-slot="autocomplete-item-text-icon"`    | Leading item icon slot.                                                         |
| `AutocompleteItemTextLabel`   | `span`           | `data-slot="autocomplete-item-text-label"`   | Truncated item label slot.                                                      |
| `AutocompleteSeparator`       | separator        | `data-slot="autocomplete-separator"`         | Visual separator between groups/items.                                          |
| `AutocompleteGroup`           | group            | `data-slot="autocomplete-group"`             | Group wrapper with nested items.                                                |
| `AutocompleteGroupLabel`      | label            | `data-slot="autocomplete-group-label"`       | Sticky group heading.                                                           |
| `AutocompleteCollection`      | none             | `data-slot="autocomplete-collection"`        | Renders nested group items from group data.                                     |

Recommended input composition:

```text
Autocomplete
├─ AutocompleteField
│  ├─ label (native)
│  └─ AutocompleteInputGroup
│     ├─ AutocompleteInput
│     └─ AutocompleteControlActions
│        ├─ AutocompleteClear
│        └─ AutocompleteTrigger
└─ AutocompleteContent
   ├─ AutocompleteEmpty
   └─ AutocompleteList
      └─ AutocompleteItem
         └─ AutocompleteItemText
```

## Input inside popup

For command-picker-like layouts, render a trigger field and put `AutocompleteInput` inside the popup.
This is the composition used by the Storybook `InputInsidePopup` story. Without `htmlFor`,
`AutocompleteFieldLabel` keeps the Base UI label behavior for the trigger-first field.

```tsx
<Autocomplete items={tags} itemToStringValue={(item) => item.value}>
  <AutocompleteField>
    <AutocompleteFieldLabel>Tag</AutocompleteFieldLabel>
    <AutocompleteFieldTrigger>
      <AutocompleteValue>{(value) => value || 'Type to search'}</AutocompleteValue>
      <AutocompleteIcon />
    </AutocompleteFieldTrigger>
  </AutocompleteField>

  <AutocompleteContent>
    <AutocompleteInlineInputContainer>
      <AutocompleteInput placeholder="Search tag" />
    </AutocompleteInlineInputContainer>
    <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
    <AutocompleteList>
      {(item: TagItem) => (
        <AutocompleteItem key={item.id} value={item}>
          <AutocompleteItemText>{item.value}</AutocompleteItemText>
        </AutocompleteItem>
      )}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>
```

## Groups and grid layout

Grouped data is an array of objects with an `items` array. Render nested items through
`AutocompleteCollection`.

```tsx
interface GroupedTags {
  value: string;
  items: TagItem[];
}

const groupedTags: GroupedTags[] = [
  { value: 'General', items: tags.slice(0, 3) },
  { value: 'Scope', items: tags.slice(3) },
];

function GroupedAutocomplete() {
  const id = useId();

  return (
    <Autocomplete items={groupedTags} itemToStringValue={(item) => item.value}>
      <AutocompleteField>
        <label htmlFor={id}>Search grouped tags</label>
        <AutocompleteInputGroup>
          <AutocompleteInput id={id} placeholder="e.g. docs" />
          <AutocompleteControlActions>
            <AutocompleteClear aria-label="Clear value" />
            <AutocompleteTrigger aria-label="Open suggestions" />
          </AutocompleteControlActions>
        </AutocompleteInputGroup>
      </AutocompleteField>

      <AutocompleteContent>
        <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
        <AutocompleteList>
          {(group: GroupedTags) => (
            <AutocompleteGroup key={group.value} items={group.items}>
              <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
              <AutocompleteCollection>
                {(item: TagItem) => (
                  <AutocompleteItem key={item.id} value={item}>
                    <AutocompleteItemText>{item.value}</AutocompleteItemText>
                  </AutocompleteItem>
                )}
              </AutocompleteCollection>
            </AutocompleteGroup>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  );
}
```

Set `grid` on the root when items are arranged in rows. `AutocompleteRow` styles each row and the
primitive switches keyboard navigation to row/column movement.

## Async search

Use a controlled `value`, `onValueChange`, external results, and `filter={null}` when filtering is
handled outside the primitive. `AutocompleteStatus` is styled only when it has content.

```tsx
interface Movie {
  id: string;
  title: string;
  year: number;
}

const topMovies: Movie[] = [
  { id: '1', title: 'The Shawshank Redemption', year: 1994 },
  { id: '2', title: 'The Godfather', year: 1972 },
  { id: '3', title: 'The Dark Knight', year: 2008 },
  { id: '4', title: 'Pulp Fiction', year: 1994 },
];

function AsyncSearch() {
  const id = useId();
  const { contains } = useAutocompleteFilter();
  const [value, setValue] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [isPending, startTransition] = useTransition();

  return (
    <Autocomplete
      items={results}
      value={value}
      filter={null}
      itemToStringValue={(item) => item.title}
      onValueChange={(nextValue) => {
        setValue(nextValue);

        startTransition(() => {
          setResults(
            topMovies.filter(
              (movie) =>
                contains(movie.title, nextValue) || contains(String(movie.year), nextValue),
            ),
          );
        });
      }}
    >
      <AutocompleteField>
        <label htmlFor={id}>Search movies by name or year</label>
        <AutocompleteInputGroup>
          <AutocompleteInput id={id} placeholder="e.g. Pulp Fiction or 1994" />
          <AutocompleteControlActions>
            <AutocompleteClear aria-label="Clear value" />
            <AutocompleteTrigger aria-label="Open suggestions" />
          </AutocompleteControlActions>
        </AutocompleteInputGroup>
      </AutocompleteField>

      <AutocompleteContent sideOffset={4}>
        <AutocompleteStatus>{isPending ? 'Searching...' : null}</AutocompleteStatus>
        <AutocompleteEmpty>No movies found.</AutocompleteEmpty>
        <AutocompleteList>
          {(movie: Movie) => (
            <AutocompleteItem key={movie.id} value={movie}>
              <AutocompleteItemText>
                {movie.title} ({movie.year})
              </AutocompleteItemText>
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  );
}
```

## Public props

Every visual part accepts `className` and forwards the relevant primitive or native element props.
Refs are forwarded for primitive parts and native wrapper parts.

### `Autocomplete`

Root does not render a DOM element. Important props:

| Prop                                               | Type                                     | Default                         | Notes                                                                   |
| -------------------------------------------------- | ---------------------------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| `items`                                            | `readonly Item[]` or grouped items       | -                               | Source items for filtering and render props.                            |
| `itemToStringValue`                                | `(item: Item) => string`                 | inferred for `{ value, label }` | Required for object items whose display value is not inferable.         |
| `value` / `defaultValue`                           | `string`                                 | -                               | Controlled or uncontrolled input value.                                 |
| `onValueChange`                                    | `(value, details) => void`               | -                               | Called on typing, clear, item press, and other value changes.           |
| `filter`                                           | function or `null`                       | built-in contains filter        | Use `null` with already-filtered async results.                         |
| `filteredItems`                                    | item array                               | -                               | External filtered list while still keeping primitive filtering helpers. |
| `limit`                                            | `number`                                 | `-1`                            | Maximum rendered items.                                                 |
| `mode`                                             | `'list' \| 'both' \| 'inline' \| 'none'` | `'list'`                        | Controls filtering and inline autocompletion.                           |
| `autoHighlight`                                    | `boolean \| 'always'`                    | `false`                         | Automatically highlights the first matching item.                       |
| `open`, `defaultOpen`, `onOpenChange`              | popup state props                        | -                               | Controlled/uncontrolled popup state.                                    |
| `openOnInputClick`                                 | `boolean`                                | `false`                         | Opens suggestions when the input is clicked.                            |
| `disabled`, `readOnly`, `required`, `name`, `form` | form/control props                       | -                               | Forwarded through the primitive to the internal input behavior.         |
| `grid`                                             | `boolean`                                | `false`                         | Enables row/column keyboard navigation with `AutocompleteRow`.          |
| `modal`                                            | `boolean`                                | `false`                         | Makes the popup modal and useful with `AutocompleteBackdrop`.           |

### `AutocompleteContent`

`AutocompleteContent` renders `AutocompletePortal > AutocompletePositioner > AutocompletePopup`.

| Prop                                                          | Type             | Default |
| ------------------------------------------------------------- | ---------------- | ------- |
| `showArrow`                                                   | `boolean`        | `false` |
| `side`                                                        | positioner side  | -       |
| `sideOffset`                                                  | `number`         | `5`     |
| `align`, `alignOffset`, `arrowPadding`                        | positioner props | -       |
| `collisionAvoidance`, `collisionBoundary`, `collisionPadding` | positioner props | -       |
| `className` and popup props                                   | popup props      | -       |

Use the low-level `AutocompletePortal`, `AutocompletePositioner`, `AutocompletePopup`, and
`AutocompleteArrow` directly when you need backdrop, custom portal props, or non-standard layout.

### Hooks

| Hook                                   | Purpose                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------ |
| `useAutocompleteFilter()`              | Returns the primitive filter helpers such as `contains`.                             |
| `useAutocompleteFilteredItems<Item>()` | Reads the currently filtered items from context; used by custom list/grid renderers. |

## Styling API

All visual parts expose the `data-slot` attributes listed in the Parts table. Primitive state
attributes used by styles include:

| Attribute                                  | Appears on                                        | Meaning                        |
| ------------------------------------------ | ------------------------------------------------- | ------------------------------ |
| `data-highlighted`                         | `AutocompleteItem`, `AutocompleteRow` descendants | Keyboard or pointer highlight. |
| `data-disabled` / `disabled`               | disabled items and controls                       | Non-interactive state.         |
| `data-popup-open`                          | triggers                                          | Popup is open.                 |
| `data-empty`                               | list                                              | No items are rendered.         |
| `data-starting-style`, `data-ending-style` | popup/backdrop                                    | Enter/exit animation states.   |
| `data-side`                                | arrow                                             | Current floating side.         |

The main customization variables are:

| Variable group     | Examples                                                                                                                                                     | Affects                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Control            | `--autocomplete-width`, `--autocomplete-control-height`, `--autocomplete-radius`, `--autocomplete-bg`, `--autocomplete-border-color`, `--autocomplete-color` | Input group and field trigger.           |
| Focus              | `--autocomplete-focus-ring-color`, `--autocomplete-focus-ring-width`, `--autocomplete-focus-ring-offset`                                                     | Focus-visible and focus-within rings.    |
| Input/actions      | `--autocomplete-input-padding-x-start`, `--autocomplete-input-padding-x-end-with-actions`, `--autocomplete-action-size`, `--autocomplete-icon-color`         | Input padding and clear/trigger buttons. |
| Popup              | `--autocomplete-popup-bg`, `--autocomplete-popup-border-color`, `--autocomplete-popup-max-height`, `--autocomplete-shadow`                                   | Popup surface and sizing.                |
| List/items         | `--autocomplete-list-max-height`, `--autocomplete-item-min-height`, `--autocomplete-highlight-bg`, `--autocomplete-highlight-color`                          | List scrolling and item highlight.       |
| Group/status/empty | `--autocomplete-group-label-*`, `--autocomplete-status-*`, `--autocomplete-empty-*`                                                                          | Supporting rows and group labels.        |
| Inline input       | `--autocomplete-inline-input-*`, `--autocomplete-inline-list-*`                                                                                              | Input-inside-popup composition.          |
| Arrow/backdrop     | `--autocomplete-arrow-*`, `--autocomplete-backdrop-*`                                                                                                        | Optional arrow and modal backdrop.       |

Override variables on the root composition wrapper, `AutocompleteField`, `AutocompleteContent`, or a
higher theme scope:

```css
.wideAutocomplete {
  --autocomplete-width: 20rem;
}
```

```tsx
<AutocompleteField className="wideAutocomplete">
  <label htmlFor={id}>Search tags</label>
  <AutocompleteInputGroup>
    <AutocompleteInput id={id} placeholder="e.g. feature" />
    <AutocompleteControlActions>
      <AutocompleteClear aria-label="Clear value" />
      <AutocompleteTrigger aria-label="Open suggestions" />
    </AutocompleteControlActions>
  </AutocompleteInputGroup>
</AutocompleteField>
```

## UX and accessibility

- Always provide an accessible name for the input. Prefer a native `<label htmlFor={id}>` with
  `AutocompleteInput id={id}` for input-first fields. Use `AutocompleteFieldLabel` only for the
  trigger-first composition.
- Pass `aria-label` to icon-only `AutocompleteClear` and `AutocompleteTrigger`.
- Keyboard behavior comes from the primitive: typing filters, arrow keys move highlight, Enter accepts
  the highlighted item, Escape closes, and grid mode changes navigation to rows/columns.
- `Autocomplete` accepts free-form text. Choosing an item updates the input value but does not create
  persistent selection state like `Combobox`.
- Use `AutocompleteStatus` for loading or error text in async flows. Add `aria-busy` to
  `AutocompleteContent`/`AutocompletePopup` when the result area is loading.
- `disabled` and `readOnly` should be set on the root so the primitive can coordinate the input,
  trigger, clear button, and item interactions.

## Limitations and recommendations

- Do not import Base UI autocomplete parts directly in moduix examples. Import the exported moduix
  parts from `moduix` so default styling, icons, slots, and CSS variables are present.
- Keep item values stable. When values are objects, pass the same object shape to `items` and
  `AutocompleteItem value`, and provide `itemToStringValue` unless `{ value, label }` is enough.
- Use `filter={null}` for server-side or manually filtered lists; otherwise the primitive filters the
  provided `items` again.
- Use `AutocompleteContent` for standard popups. Drop to low-level portal/positioner/popup parts only
  when you need custom backdrop or portal behavior.
- Prefer `Combobox` for required selection, single/multiple selected values, chips, or selected-item
  indicators.

## Local changelog

- 2026-06-05: Updated the recommended input-first composition to use a native `<label>` while
  keeping `AutocompleteFieldLabel` for the trigger-first pattern that Base UI labels directly.