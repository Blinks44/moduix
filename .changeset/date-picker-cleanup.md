---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

DatePicker: New `DatePickerMonthTable` and `DatePickerYearTable` render the standard month and year views with the same optional header as `DatePickerDayTable`. `DatePickerDayTable` now reads week numbers from the root `showWeekNumbers` prop (its own `showWeekNumbers` prop is removed) and takes `offset` as a number of months, so a second visible month is `<DatePickerDayTable offset={1} />`.
Today's date is now marked with a visible ring-colored border. Disabled days, the calendar trigger of a disabled picker, and a disabled picker inside a disabled `Field` or `Fieldset` are no longer dimmed twice; read-only pickers are no longer dimmed. Day cells show the focus ring only on keyboard focus.
CSS Modules keep five variables: `--moduix-date-picker-width`, `--moduix-date-picker-control-height`, `--moduix-date-picker-radius`, `--moduix-date-picker-content-width`, and `--moduix-date-picker-table-cell-size`; the other 113 are removed, override colors and spacing with a plain class instead. Month and year selects no longer style the `multiple` / `size` list mode. All adapters now re-export the Ark DatePicker callback details, `DateValue`, and hook types.