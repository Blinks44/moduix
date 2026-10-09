# DatePicker (Vue)

## Upstream reference

[Ark DatePicker](https://ark-ui.com/docs/components/date-picker).

## Public contract

DatePicker composes Ark date state and parts with moduix styles and portal defaults.
Use the flat DatePicker-prefixed exports and top-level useDatePicker / useDatePickerContext.
DatePickerPositioner is portalled by default; the root accepts portalled and portalRef.

DatePickerField owns input index 0. DatePickerRangeField owns indexes 0 and 1.
DatePickerDayTable owns its rows, optional view header and optional week-number column.
These three fixed-tree conveniences accept neither asChild nor a default slot.
Unsupported JavaScript asChild attrs do not replace their anatomy. For custom layouts,
compose DatePickerControl, DatePickerInput and DatePickerTable directly.

## Preservation notes

Optional placeholders and accessible labels are omitted when undefined so Ark localization
can apply. Consumer input/trigger props override convenience props; input indexes remain owned.
Keep the small computed props objects: directly binding undefined through Vue attrs can erase
Ark's generated defaults. Reactive overrides, v-model, native form values and SSR/hydration
are covered by tests.

Root and primitive parts preserve native Vue component refs through $el and single-host
asChild slots. DatePickerDayTable has multiple template roots when its view header is shown;
do not promise one DOM ref target for that sugar.

DatePickerMonthSelect and DatePickerYearSelect expose the native select through their component
ref, not the decorative outer span. Native attributes such as multiple and size stay reactive;
Tailwind uses these two props to switch the existing list appearance and hide the indicator.
Ark owns their options and month/year navigation.

DatePickerValueText without a default slot renders Ark's span, including placeholder, separator,
class and data-slot. A supplied scoped slot receives Ark's value, index, valueAsString and remove.
Ark renders that path as a fragment (or placeholder text when empty); wrapper host classes and
data-slot are not applied there. Put DOM attributes on the consumer's slot elements and do not
assume one component $el target for scoped rendering. Absence of a slot must reach Ark unchanged
so its default formatted text remains available.

## Styling and accessibility

CSS Modules parts accept class and expose data-slot plus Ark state attributes.
Tailwind shares behavior but uses utility overrides, not the CSS Modules token contract.
Ark owns date parsing, labels, keyboard navigation, form state and calendar ARIA.

## Local changelog

- 2026-10-03: Fixed-tree conveniences exclude unsupported asChild/default-slot composition.