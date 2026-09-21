# DatePicker

Upstream docs (accessed 2026-08-10):

- Ark UI: https://ark-ui.com/docs/components/date-picker
- Zag API: https://zagjs.com/api/mdx/components/react/date-picker

## Purpose

`DatePicker` is an Ark UI calendar picker for selecting single dates, date ranges, or multiple
dates through an editable input, popup calendar, or inline calendar.

## Upstream model to preserve

Preserve Ark UI's `DatePicker` primitive, explicit popup / inline composition,
`DateValue[]` state, details-object callbacks, and `DatePickerRootProvider`.

Ark owns input parsing, calendar view state, keyboard navigation, focus management, min/max
validation, unavailable dates, range hover state, form integration, positioning, locale formatting,
and accessible labels. Do not translate dates to strings or local callback shapes in the wrapper.

## Current behavior contract

`DatePicker` and `DatePickerRootProvider` portal `DatePickerPositioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

- `DatePicker` is the only public root value.
- Values use Ark's `DateValue[]` shape from `@ark-ui/react/date-picker`.
- `DatePickerField` renders the standard single input control with `DatePickerInput`,
  `DatePickerClearTrigger`, and `DatePickerTrigger`.
- `DatePickerRangeField` renders the standard range control with two indexed inputs plus clear and
  open triggers.
- `DatePickerInput` is the native input that participates in forms through Ark.
- Range selection renders two indexed inputs: `DatePickerInput index={0}` and
  `DatePickerInput index={1}`.
- `DatePickerField` reserves input index `0`; `DatePickerRangeField` reserves indexes `0` and
  `1`. Compose `DatePickerControl` and `DatePickerInput` directly for a different input layout.
- `DatePicker` inherits `disabled` and `invalid` from the closest Ark `Field` or `Fieldset`,
  and `readOnly` and `required` from `Field`. Values passed directly to `DatePicker` take
  precedence.
- `DatePickerDayTable` renders the standard day-view header and table from Ark context.
- Multiple selection should render selected values through `DatePickerContext` instead of trying to
  display every date in one text input.
- Popup calendars are explicit: render `DatePickerPositioner` and
  `DatePickerContent` when the picker should float.
- Inline calendars use `inline` and render `DatePickerContent` directly in the root.
- No local date math, parser, focus manager, or calendar machine is added.

## Anatomy and exported parts

```tsx
DatePicker
├─ DatePickerLabel
├─ DatePickerControl
│  ├─ DatePickerInput
│  ├─ DatePickerClearTrigger
│  └─ DatePickerTrigger
├─ DatePickerField / DatePickerRangeField (convenience control)
├─ Overlay subtree (automatically portalled)
│  └─ DatePickerPositioner
│     └─ DatePickerContent
│        ├─ DatePickerView[view="day" | "month" | "year"]
│        │  ├─ DatePickerViewControl
│        │  │  ├─ DatePickerPrevTrigger
│        │  │  ├─ DatePickerViewTrigger / DatePickerRangeText
│        │  │  └─ DatePickerNextTrigger
│        │  ├─ DatePickerDayTable (convenience day grid)
│        │  └─ DatePickerTable
│        │     ├─ DatePickerTableHead
│        │     ├─ DatePickerTableBody
│        │     ├─ DatePickerTableRow
│        │     ├─ DatePickerTableHeader
│        │     ├─ DatePickerTableCell
│        │     └─ DatePickerTableCellTrigger
│        ├─ DatePickerMonthSelect / DatePickerYearSelect
│        └─ DatePickerPresetTrigger
└─ ArkDatePickerContext (optional Ark state access)

DatePickerRootProvider
└─ same part tree connected to an Ark `useDatePicker()` store
```

| Exported part                    | `data-slot`                           | Notes                                             |
| -------------------------------- | ------------------------------------- | ------------------------------------------------- |
| `DatePicker`                     | `date-picker-root`                    | Root state, value, locale, validation, popup.     |
| `DatePickerRootProvider`         | `date-picker-root-provider`           | Connects to a store created by `useDatePicker()`. |
| `DatePickerLabel`                | `date-picker-label`                   | Accessible label for input and calendar.          |
| `DatePickerControl`              | `date-picker-control`                 | Visual input wrapper.                             |
| `DatePickerField`                | `date-picker-control`                 | Standard single-date control sugar.               |
| `DatePickerRangeField`           | `date-picker-control`                 | Standard range control sugar.                     |
| `DatePickerInput`                | `date-picker-input`                   | Editable date input and form value.               |
| `DatePickerTrigger`              | `date-picker-trigger`                 | Opens the calendar. Defaults to `CalendarIcon`.   |
| `DatePickerClearTrigger`         | `date-picker-clear-trigger`           | Ark clearing behavior + `CloseButton`.            |
| `DatePickerPositioner`           | `date-picker-positioner`              | Floating layer positioner.                        |
| `DatePickerContent`              | `date-picker-content`                 | Calendar surface.                                 |
| `DatePickerView`                 | `date-picker-view`                    | Day, month, or year panel.                        |
| `DatePickerViewControl`          | `date-picker-view-control`            | Calendar header controls.                         |
| `DatePickerPrevTrigger`          | `date-picker-prev-trigger`            | Previous month/year/decade.                       |
| `DatePickerNextTrigger`          | `date-picker-next-trigger`            | Next month/year/decade.                           |
| `DatePickerViewTrigger`          | `date-picker-view-trigger`            | Switches the active view.                         |
| `DatePickerRangeText`            | `date-picker-range-text`              | Visible range label.                              |
| `DatePickerValueText`            | `date-picker-value-text`              | Render-prop value text.                           |
| `DatePickerDayTable`             | `date-picker-table`                   | Standard day-view table sugar.                    |
| `DatePickerTable*`               | `date-picker-table-*`                 | Calendar table composition.                       |
| `DatePickerWeekNumberHeaderCell` | `date-picker-week-number-header-cell` | Week-number header cell.                          |
| `DatePickerWeekNumberCell`       | `date-picker-week-number-cell`        | Week-number body cell.                            |
| `DatePickerMonthSelect`          | `date-picker-month-select`            | Native month select.                              |
| `DatePickerYearSelect`           | `date-picker-year-select`             | Native year select.                               |
| `DatePickerPresetTrigger`        | `date-picker-preset-trigger`          | Range preset button.                              |
| `DatePickerContext`              | -                                     | Render-prop access to root state.                 |

The barrel exports `DatePicker`, all `DatePicker`-prefixed parts, `DatePickerContext`,
`useDatePicker`, and `useDatePickerContext`.

`useDatePicker`, `useDatePickerContext`, and `DatePickerContext` are exported from moduix for
the documented provider and custom-grid compositions. Ark utilities such as `parseDate` and Ark
event/detail types remain direct imports from `@ark-ui/react/date-picker`.

## Composition

```tsx
import {
  DatePicker,
  DatePickerContext,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
} from '@moduix/react/date-picker';
import { parseDate } from '@ark-ui/react/date-picker';

export function ReleaseDatePicker() {
  return (
    <DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
      <DatePickerLabel>Release date</DatePickerLabel>
      <DatePickerField />
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerView view="day">
            <DatePickerDayTable />
          </DatePickerView>
          <DatePickerView view="month">
            <DatePickerContext>
              {(datePicker) => (
                <>
                  <DatePickerViewControl>
                    <DatePickerPrevTrigger />
                    <DatePickerViewTrigger />
                    <DatePickerNextTrigger />
                  </DatePickerViewControl>
                  <DatePickerTable columns={4}>
                    <DatePickerTableBody>
                      {datePicker
                        .getMonthsGrid({ columns: 4, format: 'short' })
                        .map((months, rowIndex) => (
                          <DatePickerTableRow key={rowIndex}>
                            {months.map((month) => (
                              <DatePickerTableCell key={month.value} value={month.value}>
                                <DatePickerTableCellTrigger>
                                  {month.label}
                                </DatePickerTableCellTrigger>
                              </DatePickerTableCell>
                            ))}
                          </DatePickerTableRow>
                        ))}
                    </DatePickerTableBody>
                  </DatePickerTable>
                </>
              )}
            </DatePickerContext>
          </DatePickerView>
          <DatePickerView view="year">
            <DatePickerContext>
              {(datePicker) => (
                <>
                  <DatePickerViewControl>
                    <DatePickerPrevTrigger />
                    <DatePickerViewTrigger />
                    <DatePickerNextTrigger />
                  </DatePickerViewControl>
                  <DatePickerTable columns={4}>
                    <DatePickerTableBody>
                      {datePicker.getYearsGrid({ columns: 4 }).map((years, rowIndex) => (
                        <DatePickerTableRow key={rowIndex}>
                          {years.map((year) => (
                            <DatePickerTableCell
                              key={year.value}
                              value={year.value}
                              disabled={year.disabled}
                            >
                              <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
                            </DatePickerTableCell>
                          ))}
                        </DatePickerTableRow>
                      ))}
                    </DatePickerTableBody>
                  </DatePickerTable>
                </>
              )}
            </DatePickerContext>
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  );
}
```

Use `DatePickerContext` to render week days, weeks, month grids, and year grids when
`DatePickerDayTable` is not enough. Use `DatePickerRootProvider` only with state created by
moduix `useDatePicker()`; do not also render `DatePicker` for the same state instance.
Render every view between `minView` and `maxView` whenever the composition exposes a
`DatePickerViewTrigger`; for a single-panel picker, set both bounds to that panel.

The default root and popup width is `18.75rem` (300px), while range fields use `24rem` (384px) so both
inputs have enough room for their values and shared action icons. Override `--moduix-date-picker-width`
for the field and `--moduix-date-picker-content-width` for wider popup compositions such as two visible months.
For portalled popups, set popup sizing variables on `DatePickerContent` or another element inside
the overlay subtree because variables on `DatePicker` do not inherit across the portal boundary.
Each input has `--moduix-date-picker-input-min-width: 7.5rem`; range inputs use
`--moduix-date-picker-range-input-min-width`.

## Upstream feature coverage

- Basic popup picker: supported through `DatePickerLabel`, `DatePickerField`, `DatePickerPositioner`,
  `DatePickerContent`, `DatePickerView`, and `DatePickerDayTable`. The low-level
  `DatePickerControl`, `DatePickerInput`, `DatePickerTrigger`, `DatePickerContext`, and table parts remain
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
  Ark view props, `DatePickerContext`, `format`, `parse`, and `CalendarDateTime` values.
- Validation: supported with `min`, `max`, `isDateUnavailable`, `invalid`, `disabled`,
  `readOnly`, and `required`.
- Locale and parsing: supported with `locale`, `timeZone`, `format`, `parse`, `translations`,
  and `createCalendar`.
- Inline calendar: supported with `inline` and direct `DatePickerContent` composition.
- Provider/state hooks: `useDatePicker()`, `DatePickerContext`, and `useDatePickerContext()` are
  exported by moduix for use with `DatePickerRootProvider`.
- `asChild`, `ids`, `dir`, and `positioning`: preserved on Ark parts and root props.

## Accessibility and state

Every date picker needs an accessible name from `DatePickerLabel`, a native label, or ARIA props.
Ark wires input semantics, dialog/grid semantics, roving focus, keyboard navigation, range
announcements, live-region updates, button labels, and field context integration.

Ark emits `data-scope="date-picker"` and `data-part` attributes for each part. State attributes
include `data-state`, `data-disabled`, `data-readonly`, `data-invalid`, `data-focus`,
`data-selected`, `data-today`, `data-unavailable`, `data-outside-range`, `data-in-range`,
`data-range-start`, `data-range-end`, `data-in-hover-range`, `data-hover-range-start`,
`data-hover-range-end`, and `data-view`.

## Defaults and styling

The text input defaults to `--moduix-size-md` with `--moduix-spacing-1` block padding. Calendar navigation, day cells, selects, view triggers, and preset triggers use `--moduix-size-sm`.

Content motion falls back to the shared `--moduix-popup-motion-*` tokens. `--moduix-date-picker-transition` and
closed-state variables remain the more specific override.

Calendar content does not scroll by default. Keep a constrained, scrollable calendar as an explicit consumer
composition when the available viewport space requires it.

All visual parts accept `className`. The CSS module defines defaults for root spacing, label text,
input frame, icon triggers, popup surface, view controls, calendar cells, month/year selects,
week-number cells, and preset buttons.

The CSS also handles the Ark range input layout by making sibling `DatePickerInput` fields share
one `DatePickerControl`, keeping each input wide enough for a date, and keeping the end input clear
of the trigger icons.

Disabled and read-only opacity is applied at the root level only. Do not duplicate the same opacity
on `DatePickerControl`, because Ark can emit disabled/read-only state on both parts.

Preset triggers use a muted surface by default through `--moduix-date-picker-preset-trigger-bg` and
`--moduix-date-picker-preset-trigger-bg-hover`, so quick range actions read as buttons even before they
are selected.

`DatePickerClearTrigger` maps date-picker action tokens to `CloseButton`; use `asChild` with
one semantic child when the clear control needs a custom host or visual treatment.

The calendar and clear actions use logical inline-end positioning, so they follow RTL text flow.

## Intentional sugar and differences from upstream

- `DatePickerField` renders `DatePickerControl`, one `DatePickerInput`, `DatePickerClearTrigger`, and
  `DatePickerTrigger` for the standard
  single-date field. When its placeholders and labels are omitted, Ark supplies locale-aware input
  placeholders and translated action labels.
- `DatePickerRangeField` renders `DatePickerControl`, two indexed `DatePickerInput` parts,
  `DatePickerClearTrigger`, and `DatePickerTrigger` for range fields, with the same Ark-provided
  localized defaults.
- `DatePickerDayTable` renders the standard day-view header and table from Ark context. Pass
  `showHeader={false}` when an external header is composed, `showWeekNumbers` for week-number
  cells, and `offset` for additional visible months.
- `DatePickerTrigger` renders `CalendarIcon` when children are omitted.
- `DatePickerClearTrigger` composes Ark clearing behavior with `CloseButton` when `asChild`
  is not used, without nesting buttons.
- `DatePickerPrevTrigger` and `DatePickerNextTrigger` render chevron icons when children are
  omitted.
- `DatePickerViewTrigger` renders `DatePickerRangeText` plus a chevron when children are omitted.
- Docs may show a custom month/year header built with the moduix `Select` and
  `DatePickerContext`. Keep the exported `DatePickerMonthSelect` / `DatePickerYearSelect`
  native Ark parts available; the custom select header is composition, not replacement wrapper API.

## Agent notes

- Keep callback details untouched: read `details.value`, `details.valueAsString`, and
  `details.view`.
- Keep `DatePickerDayTable` narrow: it renders the standard day table only. Keep custom month/year,
  multiple-month, and non-table layouts on Ark `DatePickerContext` plus the low-level table parts.
- Keep popup structure explicit through `DatePickerPositioner` and `DatePickerContent`.
- Keep inline examples free of `DatePickerPositioner`.
- Keep `@internationalized/date` / Ark `parseDate()` examples because Ark values are `DateValue`
  objects.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.

## Local changelog

- 2026-08-10: Made the root inherit Ark `Field` / `Fieldset` state and kept `DatePickerField` /
  `DatePickerRangeField` convenience-field
  input indexes fixed.

- 2026-08-01: Defaulted portalled overlay presence to lazy mounting and unmounting after exit.

- 2026-07-27: Let `DatePickerField` and `DatePickerRangeField` preserve Ark's locale-aware placeholders and translated
  action labels when their optional override props are omitted.
- 2026-07-23: Removed the default popup scroll container and documented the complete day/month/year view composition required by the default view-switching contract.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Reduced the input to `--moduix-size-md` and aligned calendar popup controls to `--moduix-size-sm`.

- 2026-07-20: Removed hover surfaces from date inputs and native month/year selects; icon actions retain their local hover treatment.
- 2026-07-19: Positioned calendar and clear actions with logical inline-end properties for RTL.
- 2026-07-17: Composed the default clear action with `CloseButton` and mapped date-picker
  action tokens to the shared close-button visual contract.
- 2026-07-16: Added shared `--moduix-popup-motion-*` fallbacks for project-wide popup content motion.
- 2026-07-09: Added `DatePickerField`, `DatePickerRangeField`, and `DatePickerDayTable` as
  recommended-path sugar, while keeping full Ark table composition as the advanced customization
  path.

- 2026-07-10: Re-exported `useDatePicker`, `useDatePickerContext`, and `DatePickerContext` for
  provider and custom-grid composition; corrected week-number row indexing in `DatePickerDayTable` offsets.

- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-25: Audited the Ark UI migration against the official Date Picker MDX, removed stale
  non-Ark focus styling, avoided double disabled/read-only opacity, expanded docs examples, and
  synchronized the docs CSS variable table with the full theme contract.
- 2026-06-22: Restored two-month popup composition, switched presets to range inputs, added muted
  preset trigger surface variables, and documented custom month/year header composition with
  moduix `Select`.
- 2026-06-22: Added the Ark-backed `DatePicker` wrapper, CSS module, stories, local docs, public
  exports, docs page, and registry metadata.