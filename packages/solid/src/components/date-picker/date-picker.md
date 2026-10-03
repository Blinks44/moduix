# DatePicker (Solid)

`DatePicker` is a styled Ark UI calendar picker for single dates, ranges, and multiple dates.
The Solid adapter preserves the React component's explicit anatomy, Ark state shape, popup
behavior, form participation, accessibility attributes, and CSS-variable contract.

## Composition

```tsx
import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerView,
} from '@moduix/solid/date-picker';
import { parseDate } from '@ark-ui/solid/date-picker';

<DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
  <DatePickerLabel>Release date</DatePickerLabel>
  <DatePickerField />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerView view="day">
        <DatePickerDayTable />
      </DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>;
```

`DatePicker` is the only public root value. `DatePickerPositioner` is portalled by default;
set `portalled={false}` or pass `portalRef` to control the overlay target. `lazyMount` and
`unmountOnExit` default to `true`.

## API surface

The barrel exports `DatePicker`, all `DatePicker`-prefixed parts, `DatePickerContext`,
`useDatePicker`, and `useDatePickerContext`.

`DatePickerField` reserves input index `0`; `DatePickerRangeField` renders inputs at indexes `0` and `1`.
These parts and `DatePickerDayTable` own their child trees and do not accept consumer `children`.
Their native Solid `asChild` callback remains supported: spread `props()` onto the replacement
host to preserve the generated inputs, triggers, or calendar rows.
Use `DatePickerControl` and `DatePickerInput` directly for a custom input layout. Ark owns date parsing, calendar
state, keyboard navigation, min/max validation, unavailable dates, labels, form values, IDs,
and details-object callbacks.

`DatePickerRootProvider` receives the accessor returned by `useDatePicker()`:

```tsx
const datePicker = useDatePicker();

<DatePickerRootProvider value={datePicker}>
  <DatePickerLabel>Report date</DatePickerLabel>
  <DatePickerField />
</DatePickerRootProvider>;
```

Solid render props expose the accessor directly, so read state as `datePicker().value`,
`datePicker().weeks`, or `datePicker().getYearsGrid({ columns: 4 })`.

## Solid composition notes

Clear-trigger classes stay reactive in both default and callback `asChild` compositions.

Ark Solid uses a render-function `asChild` prop:
`asChild={(props) => <button {...props()} type="button" />}`. Its factory does not forward refs
through an `asChild` render function, so ordinary refs and custom-host composition are separate
native paths.

The root inherits `disabled` and `invalid` from the closest Ark `Field` or `Fieldset`, and
`readOnly` and `required` from `Field`; direct DatePicker props take precedence. The default
trigger renders `CalendarIcon`, and `DatePickerClearTrigger` composes `CloseButton` while preserving
Ark-provided accessible labels.

All visual parts accept `class`. Consumer-targetable state attributes include `data-state`,
`data-disabled`, `data-readonly`, `data-invalid`, `data-focus`, `data-selected`,
`data-today`, `data-unavailable`, `data-outside-range`, and range state attributes.
The CSS module exposes `--moduix-date-picker-*` variables for sizing, colors, focus rings,
actions, popup content, calendar cells, and transitions.

## Style contract (2026-10-03)

Content scrolls within the smaller of Ark --available-height and 100dvh minus 2rem. Inline calendars fit their container rather than forcing an 18rem minimum width.

## Local changelog

- 2026-10-03: Fixed-tree sugar types exclude consumer children while preserving native Solid callback composition.