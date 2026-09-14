# DatePicker (Solid)

`DatePicker` is a styled Ark UI calendar picker for single dates, ranges, and multiple dates.
The Solid adapter preserves the React component's explicit anatomy, Ark state shape, popup
behavior, form participation, accessibility attributes, and CSS-variable contract.

## Composition

```tsx
import { DatePicker } from '@moduix/solid/date-picker';
import { parseDate } from '@ark-ui/solid/date-picker';

<DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
  <DatePicker.Label>Release date</DatePicker.Label>
  <DatePicker.Field />
  <DatePicker.Positioner>
    <DatePicker.Content>
      <DatePicker.View view="day">
        <DatePicker.DayTable />
      </DatePicker.View>
    </DatePicker.Content>
  </DatePicker.Positioner>
</DatePicker>;
```

`DatePicker` and `DatePicker.Root` are equivalent roots. `Positioner` is portalled by default;
set `portalled={false}` or pass `portalRef` to control the overlay target. `lazyMount` and
`unmountOnExit` default to `true`.

## API surface

The barrel exports `DatePicker`, `useDatePicker`, and `useDatePickerContext`.
`DatePicker` exposes `Root`, `RootProvider`, `Context`, `Label`, `Control`, `Field`,
`RangeField`, `Input`, `Trigger`, `ClearTrigger`, `Positioner`, `Content`, `View`,
`ViewControl`, `PrevTrigger`, `NextTrigger`, `ViewTrigger`, `RangeText`, `ValueText`, `Table`,
`TableHead`, `TableBody`, `TableRow`, `TableHeader`, `TableCell`, `TableCellTrigger`, `DayTable`,
`WeekNumberHeaderCell`, `WeekNumberCell`, `MonthSelect`, `YearSelect`, and `PresetTrigger`.

`Field` reserves input index `0`; `RangeField` renders inputs at indexes `0` and `1`.
Use `Control` and `Input` directly for a custom input layout. Ark owns date parsing, calendar
state, keyboard navigation, min/max validation, unavailable dates, labels, form values, IDs,
and details-object callbacks.

`DatePicker.RootProvider` receives the accessor returned by `useDatePicker()`:

```tsx
const datePicker = useDatePicker();

<DatePicker.RootProvider value={datePicker}>
  <DatePicker.Label>Report date</DatePicker.Label>
  <DatePicker.Field />
</DatePicker.RootProvider>;
```

Solid render props expose the accessor directly, so read state as `datePicker().value`,
`datePicker().weeks`, or `datePicker().getYearsGrid({ columns: 4 })`.

## Solid composition notes

Ark Solid uses a render-function `asChild` prop:
`asChild={(props) => <button {...props()} type="button" />}`. Its factory does not forward refs
through an `asChild` render function, so ordinary refs and custom-host composition are separate
native paths.

The root inherits `disabled` and `invalid` from the closest Ark `Field` or `Fieldset`, and
`readOnly` and `required` from `Field`; direct DatePicker props take precedence. The default
trigger renders `CalendarIcon`, and `ClearTrigger` composes `CloseButton.Root` while preserving
Ark-provided accessible labels.

All visual parts accept `class`. Consumer-targetable state attributes include `data-state`,
`data-disabled`, `data-readonly`, `data-invalid`, `data-focus`, `data-selected`,
`data-today`, `data-unavailable`, `data-outside-range`, and range state attributes.
The CSS module exposes `--moduix-date-picker-*` variables for sizing, colors, focus rings,
actions, popup content, calendar cells, and transitions.