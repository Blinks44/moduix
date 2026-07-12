# DatePicker

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/date-picker
- Zag API: https://zagjs.com/api/mdx/components/react/date-picker

## Purpose

`DatePicker` is an Ark UI calendar picker for selecting single dates, date ranges, or multiple
dates through an editable input, popup calendar, or inline calendar.

## Upstream model to preserve

Preserve Ark UI's `DatePicker.Root` primitive, explicit popup / inline composition,
`DateValue[]` state, details-object callbacks, and `RootProvider`.

Ark owns input parsing, calendar view state, keyboard navigation, focus management, min/max
validation, unavailable dates, range hover state, form integration, positioning, locale formatting,
and accessible labels. Do not translate dates to strings or local callback shapes in the wrapper.

## Current behavior contract

`Root` and `RootProvider` portal `Positioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

- `DatePicker` is the short root form and maps to `DatePicker.Root`.
- Values use Ark's `DateValue[]` shape from `@ark-ui/react/date-picker`.
- `DatePicker.Field` renders the standard single input control with `Input`, `ClearTrigger`, and
  `Trigger`.
- `DatePicker.RangeField` renders the standard range control with two indexed inputs plus clear and
  open triggers.
- `DatePicker.Input` is the native input that participates in forms through Ark.
- Range selection renders two indexed inputs: `DatePicker.Input index={0}` and
  `DatePicker.Input index={1}`.
- `DatePicker.DayTable` renders the standard day-view header and table from Ark context.
- Multiple selection should render selected values through `ArkDatePicker.Context` from
  `@ark-ui/react/date-picker` instead of trying to display every date in one text input.
- Popup calendars are explicit: render `DatePicker.Positioner` and
  `DatePicker.Content` when the picker should float.
- Inline calendars use `inline` and render `DatePicker.Content` directly in the root.
- No local date math, parser, focus manager, or calendar machine is added.

## Anatomy and exported parts

```tsx
DatePicker.Root
├─ DatePicker.Label
├─ DatePicker.Control
│  ├─ DatePicker.Input
│  ├─ DatePicker.ClearTrigger
│  └─ DatePicker.Trigger
├─ DatePicker.Field / DatePicker.RangeField (convenience control)
├─ Overlay subtree (automatically portalled)
│  └─ DatePicker.Positioner
│     └─ DatePicker.Content
│        ├─ DatePicker.View[view="day" | "month" | "year"]
│        │  ├─ DatePicker.ViewControl
│        │  │  ├─ DatePicker.PrevTrigger
│        │  │  ├─ DatePicker.ViewTrigger / DatePicker.RangeText
│        │  │  └─ DatePicker.NextTrigger
│        │  ├─ DatePicker.DayTable (convenience day grid)
│        │  └─ DatePicker.Table
│        │     ├─ DatePicker.TableHead
│        │     ├─ DatePicker.TableBody
│        │     ├─ DatePicker.TableRow
│        │     ├─ DatePicker.TableHeader
│        │     ├─ DatePicker.TableCell
│        │     └─ DatePicker.TableCellTrigger
│        ├─ DatePicker.MonthSelect / DatePicker.YearSelect
│        └─ DatePicker.PresetTrigger
└─ ArkDatePicker.Context (optional Ark state access)

DatePicker.RootProvider
└─ same part tree connected to an Ark `useDatePicker()` store
```

| Exported part                     | `data-slot`                           | Notes                                             |
| --------------------------------- | ------------------------------------- | ------------------------------------------------- |
| `DatePicker` / `DatePicker.Root`  | `date-picker-root`                    | Root state, value, locale, validation, popup.     |
| `DatePicker.RootProvider`         | `date-picker-root-provider`           | Connects to a store created by `useDatePicker()`. |
| `DatePicker.Label`                | `date-picker-label`                   | Accessible label for input and calendar.          |
| `DatePicker.Control`              | `date-picker-control`                 | Visual input wrapper.                             |
| `DatePicker.Field`                | `date-picker-control`                 | Standard single-date control sugar.               |
| `DatePicker.RangeField`           | `date-picker-control`                 | Standard range control sugar.                     |
| `DatePicker.Input`                | `date-picker-input`                   | Editable date input and form value.               |
| `DatePicker.Trigger`              | `date-picker-trigger`                 | Opens the calendar. Defaults to `CalendarIcon`.   |
| `DatePicker.ClearTrigger`         | `date-picker-clear-trigger`           | Clears the value. Defaults to `CloseIcon`.        |
| `DatePicker.Positioner`           | `date-picker-positioner`              | Floating layer positioner.                        |
| `DatePicker.Content`              | `date-picker-content`                 | Calendar surface.                                 |
| `DatePicker.View`                 | `date-picker-view`                    | Day, month, or year panel.                        |
| `DatePicker.ViewControl`          | `date-picker-view-control`            | Calendar header controls.                         |
| `DatePicker.PrevTrigger`          | `date-picker-prev-trigger`            | Previous month/year/decade.                       |
| `DatePicker.NextTrigger`          | `date-picker-next-trigger`            | Next month/year/decade.                           |
| `DatePicker.ViewTrigger`          | `date-picker-view-trigger`            | Switches the active view.                         |
| `DatePicker.RangeText`            | `date-picker-range-text`              | Visible range label.                              |
| `DatePicker.ValueText`            | `date-picker-value-text`              | Render-prop value text.                           |
| `DatePicker.DayTable`             | `date-picker-table`                   | Standard day-view table sugar.                    |
| `DatePicker.Table*`               | `date-picker-table-*`                 | Calendar table composition.                       |
| `DatePicker.WeekNumberHeaderCell` | `date-picker-week-number-header-cell` | Week-number header cell.                          |
| `DatePicker.WeekNumberCell`       | `date-picker-week-number-cell`        | Week-number body cell.                            |
| `DatePicker.MonthSelect`          | `date-picker-month-select`            | Native month select.                              |
| `DatePicker.YearSelect`           | `date-picker-year-select`             | Native year select.                               |
| `DatePicker.PresetTrigger`        | `date-picker-preset-trigger`          | Range preset button.                              |
| `ArkDatePicker.Context`           | -                                     | Direct Ark render-prop access to root state.      |

Exported values: `DatePicker`.

`useDatePicker`, `useDatePickerContext`, and `DatePicker.Context` are exported from moduix for
the documented provider and custom-grid compositions. Ark utilities such as `parseDate` and Ark
event/detail types remain direct imports from `@ark-ui/react/date-picker`.

## Composition

```tsx
import { DatePicker } from '@moduix/react';
import { parseDate } from '@ark-ui/react/date-picker';

export function ReleaseDatePicker() {
  return (
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
    </DatePicker>
  );
}
```

Use `DatePicker.Context` to render week days, weeks, month grids, and year grids when
`DatePicker.DayTable` is not enough. Use `DatePicker.RootProvider` only with state created by
moduix `useDatePicker()`; do not also render `DatePicker.Root` for the same state instance.

The default root and popup width is `18.75rem` (300px). Override `--date-picker-width` for the
field and `--date-picker-content-width` for wider popup compositions such as two visible months.
For portalled popups, set popup sizing variables on `DatePicker.Content` or another element inside
the overlay subtree because variables on `DatePicker.Root` do not inherit across the portal boundary.
Each input has `--date-picker-input-min-width: 7.5rem`; range inputs use
`--date-picker-range-input-min-width`.

## Upstream feature coverage

- Basic popup picker: supported through `Label`, `Field`, `Positioner`, `Content`, `View`, and
  `DayTable`. The low-level `Control`, `Input`, `Trigger`, `Context`, and table parts remain
  available for custom composition.
- Controlled and uncontrolled state: supported with `value`, `defaultValue`, and
  `onValueChange(details)`.
- Open state: supported with `open`, `defaultOpen`, `onOpenChange(details)`, `openOnClick`, and
  `closeOnSelect`.
- View state: supported with `view`, `defaultView`, `minView`, `maxView`, and
  `onViewChange(details)`.
- Single, range, and multiple selection: supported with `selectionMode`, indexed range inputs,
  custom multiple-value displays, `maxSelectedDates`, and range preset triggers.
- Multiple months and week numbers: supported with `numOfMonths`, `fixedWeeks`, and
  `showWeekNumbers`.
- Month-only, year-only, default-view, select-today, and date-with-time flows are supported through
  Ark view props, `ArkDatePicker.Context`, `format`, `parse`, and `CalendarDateTime` values.
- Validation: supported with `min`, `max`, `isDateUnavailable`, `invalid`, `disabled`,
  `readOnly`, and `required`.
- Locale and parsing: supported with `locale`, `timeZone`, `format`, `parse`, `translations`,
  and `createCalendar`.
- Inline calendar: supported with `inline` and direct `DatePicker.Content` composition.
- Provider/state hooks: `useDatePicker()`, `DatePicker.Context`, and `useDatePickerContext()` are
  exported by moduix for use with `DatePicker.RootProvider`.
- `asChild`, `ids`, `dir`, and `positioning`: preserved on Ark parts and root props.

## Accessibility and state

Every date picker needs an accessible name from `DatePicker.Label`, a native label, or ARIA props.
Ark wires input semantics, dialog/grid semantics, roving focus, keyboard navigation, range
announcements, live-region updates, button labels, and field context integration.

Ark emits `data-scope="date-picker"` and `data-part` attributes for each part. State attributes
include `data-state`, `data-disabled`, `data-readonly`, `data-invalid`, `data-focus`,
`data-selected`, `data-today`, `data-unavailable`, `data-outside-range`, `data-in-range`,
`data-range-start`, `data-range-end`, `data-in-hover-range`, `data-hover-range-start`,
`data-hover-range-end`, and `data-view`.

## Defaults and styling

All visual parts accept `className`. The CSS module defines defaults for root spacing, label text,
input frame, icon triggers, popup surface, view controls, calendar cells, month/year selects,
week-number cells, and preset buttons.

The CSS also handles the Ark range input layout by making sibling `DatePicker.Input` fields share
one `DatePicker.Control`, keeping each input wide enough for a date, and keeping the end input clear
of the trigger icons.

Disabled and read-only opacity is applied at the root level only. Do not duplicate the same opacity
on `DatePicker.Control`, because Ark can emit disabled/read-only state on both parts.

Preset triggers use a muted surface by default through `--date-picker-preset-trigger-bg` and
`--date-picker-preset-trigger-bg-hover`, so quick range actions read as buttons even before they
are selected.

## Intentional sugar and differences from upstream

- `DatePicker.Field` renders `Control`, one `Input`, `ClearTrigger`, and `Trigger` for the standard
  single-date field.
- `DatePicker.RangeField` renders `Control`, two indexed `Input` parts, `ClearTrigger`, and
  `Trigger` for range fields.
- `DatePicker.DayTable` renders the standard day-view header and table from Ark context. Pass
  `showHeader={false}` when an external header is composed, `showWeekNumbers` for week-number
  cells, and `offset` for additional visible months.
- `DatePicker.Trigger` renders `CalendarIcon` when children are omitted.
- `DatePicker.ClearTrigger` renders `CloseIcon` when children are omitted.
- `DatePicker.PrevTrigger` and `DatePicker.NextTrigger` render chevron icons when children are
  omitted.
- `DatePicker.ViewTrigger` renders `DatePicker.RangeText` plus a chevron when children are omitted.
- Docs may show a custom month/year header built with the moduix `Select` and
  `ArkDatePicker.Context`. Keep the exported `DatePicker.MonthSelect` / `DatePicker.YearSelect`
  native Ark parts available; the custom select header is composition, not replacement wrapper API.

## Agent notes

- Keep callback details untouched: read `details.value`, `details.valueAsString`, and
  `details.view`.
- Keep `DatePicker.DayTable` narrow: it renders the standard day table only. Keep custom month/year,
  multiple-month, and non-table layouts on Ark `DatePicker.Context` plus the low-level table parts.
- Keep popup structure explicit through `Positioner` and `Content`.
- Keep inline examples free of `Positioner`.
- Keep `@internationalized/date` / Ark `parseDate()` examples because Ark values are `DateValue`
  objects.

## Local changelog

- 2026-07-09: Added `DatePicker.Field`, `DatePicker.RangeField`, and `DatePicker.DayTable` as
  recommended-path sugar, while keeping full Ark table composition as the advanced customization
  path.

- 2026-07-10: Re-exported `useDatePicker`, `useDatePickerContext`, and `DatePicker.Context` for
  provider and custom-grid composition; corrected week-number row indexing in `DayTable` offsets.

- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-25: Audited the Ark UI migration against the official Date Picker MDX, removed stale
  non-Ark focus styling, avoided double disabled/read-only opacity, expanded docs examples, and
  synchronized the docs CSS variable table with the full theme contract.
- 2026-06-22: Restored two-month popup composition, switched presets to range inputs, added muted
  preset trigger surface variables, and documented custom month/year header composition with
  moduix `Select`.
- 2026-06-22: Added the Ark-backed `DatePicker` wrapper, CSS module, stories, local docs, public
  exports, docs page, and registry metadata.