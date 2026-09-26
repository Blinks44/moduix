# DateInput

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/date-input

## Purpose

`DateInput` is a locale-aware segmented date or date-range control with native form participation.

## Public contract

The flat API is `DateInput`, `DateInputRootProvider`, `DateInputLabel`, `DateInputControl`, `DateInputSegmentGroup`, `DateInputSegment`, `DateInputSeparator`, `DateInputSegments`, `DateInputHiddenInput`, `DateInputContext`, `DateInputSegmentContext`, `DateInputDateValue`, `useDateInput`, and `useDateInputContext`. Ark owns `DateValue[]` state and details callbacks.

## Preservation notes

- Keep custom segment composition available alongside the `DateInputSegments` convenience part.
- Preserve Ark segment focus, spinbutton semantics, keyboard editing, and native submission.
- Keep Solid's reactive segment children and native `class` prop.

## Styling and accessibility

Every control needs an accessible name through `DateInputLabel`, a native label, or ARIA. Keep the explicit hidden input and stable `data-slot` hooks.