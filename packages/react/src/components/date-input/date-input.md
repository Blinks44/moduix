# DateInput

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/date-input
- Chakra UI: https://chakra-ui.com/docs/components/date-picker

## Purpose

`DateInput` is a segmented date entry control for typing single dates or date ranges with locale-aware
segments and native form submission.

## Upstream model to preserve

Preserve Ark UI's `DateInput.Root` primitive, explicit segmented composition, `DateValue[]` state,
details-object callbacks, `RootProvider`, `Context`, `SegmentContext`, `useDateInput()`, and
`useDateInputContext()`.

Ark owns keyboard editing, segment focus, parsing, min/max validation, unavailable-date validation,
locale formatting, `HiddenInput` synchronization, and form reset behavior. Do not translate dates to
strings or local callback shapes in the wrapper.

## Current behavior contract

- `DateInput` is the short root form and maps to `DateInput.Root`.
- Values use Ark's `DateInputDateValue[]` shape from `@ark-ui/react/date-input`.
- `DateInput.SegmentContext` is the recommended Ark path for rendering locale-aware segments inside
  a `DateInput.SegmentGroup`.
- `DateInput.HiddenInput` is explicit so consumers choose form names for single or range inputs.
- `DateInput.Separator` is moduix sugar for non-interactive text between segment groups.
- No local calendar popup, string parser, automatic segment renderer, or date-picker bundle is added.

## Anatomy and exported parts

```tsx
DateInput.Root
├─ DateInput.Label
├─ DateInput.Control
│  ├─ DateInput.SegmentGroup
│  │  └─ DateInput.SegmentContext
│  │     └─ DateInput.Segment
│  └─ DateInput.Separator (optional, range layouts)
├─ DateInput.HiddenInput
└─ DateInput.Context / DateInput.SegmentContext (optional state access)

DateInput.RootProvider
└─ same part tree connected to a useDateInput() store
```

| Exported part                  | `data-slot`                | Notes                                              |
| ------------------------------ | -------------------------- | -------------------------------------------------- |
| `DateInput` / `DateInput.Root` | `date-input-root`          | Root state, locale, validation, and form context.  |
| `DateInput.RootProvider`       | `date-input-root-provider` | Connects to a store created by `useDateInput()`.   |
| `DateInput.Label`              | `date-input-label`         | Accessible label.                                  |
| `DateInput.Control`            | `date-input-control`       | Visual input frame and focus ring.                 |
| `DateInput.SegmentGroup`       | `date-input-segment-group` | Groups segments for one date index.                |
| `DateInput.Segment`            | `date-input-segment`       | Editable or literal date segment from Ark.         |
| `DateInput.HiddenInput`        | `date-input-hidden-input`  | Native hidden input for form submission and reset. |
| `DateInput.Separator`          | `date-input-separator`     | Presentational text between segment groups.        |
| `DateInput.Context`            | —                          | Ark render-prop access to root state.              |
| `DateInput.SegmentContext`     | —                          | Ark render-prop access to segment state.           |

Exported values: `DateInput`, `useDateInput`, and `useDateInputContext`.

Exported types: `DateInputDateValue`, `DateInputFocusChangeDetails`,
`DateInputContextProps`, `DateInputSelectionMode`, `DateInputSegmentContextProps`,
`DateInputValueChangeDetails`, `UseDateInputContext`, `UseDateInputProps`, and
`UseDateInputReturn`.

## Composition

```tsx
import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';

function DateInputSegments() {
  return (
    <DateInput.SegmentGroup>
      <DateInput.SegmentContext>
        {(segment) => <DateInput.Segment segment={segment} />}
      </DateInput.SegmentContext>
    </DateInput.SegmentGroup>
  );
}

export function ReleaseDateInput() {
  return (
    <DateInput defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date">
      <DateInput.Label>Release date</DateInput.Label>
      <DateInput.Control>
        <DateInputSegments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput>
  );
}
```

For ranges, set `selectionMode="range"` and render indexed `SegmentGroup` / `HiddenInput` pairs.
Use `DateInput.RootProvider` only with state created by `useDateInput()`; do not also render
`DateInput.Root` for the same state instance.

## Upstream feature coverage

- Basic segmented date input: supported through `Label`, `Control`, `Context`, `SegmentGroup`,
  `Segment`, and `HiddenInput`.
- Controlled and uncontrolled state: supported with `value`, `defaultValue`, and
  `onValueChange(details)`.
- Placeholder control: supported with `placeholderValue`, `defaultPlaceholderValue`, and
  `onPlaceholderValueChange(details)`.
- Focus state: supported with `focused`, `defaultFocused`, and `onFocusChange(details)`.
- Single and range selection: supported with `selectionMode="single"` or `"range"`.
- Locale and formatting: supported with `locale`, `timeZone`, `hourCycle`, `granularity`,
  `formatter`, `format`, `translations`, and `createCalendar`.
- Validation: supported with `min`, `max`, `isDateUnavailable`, `invalid`, and Ark field context.
- Forms: supported by explicit `DateInput.HiddenInput`, `name`, `form`, and `required`.
- Provider/state hooks: supported by `useDateInput()`, `DateInput.RootProvider`,
  `DateInput.Context`, `DateInput.SegmentContext`, and `useDateInputContext()`.
- `asChild` and `ids`: preserved on Ark parts and root props.

## Accessibility and state

Every date input needs an accessible name from `DateInput.Label`, a native label, or ARIA props.
Ark wires segment spinbutton semantics, arrow-key editing, numeric typing, focus movement, ARIA value
text, and label association.

`DateInput.HiddenInput` keeps native form submission and form reset synchronized with the Ark state.
For range inputs, render indexed hidden inputs and pass names explicitly when the submitted start/end
fields need separate keys.

Ark emits `data-scope="date-input"` and `data-part` attributes for `root`, `label`, `control`,
`segment-group`, `segment`, and `hidden-input`. State attributes include `data-disabled`,
`data-readonly`, `data-invalid`, `data-focus`, `data-type`, and `data-placeholder-shown`.

## Defaults and styling

All visual parts accept `className`. The CSS module defines defaults for root spacing, label text,
the control frame, segment focus, placeholder color, invalid state, disabled/readonly state, and
presentational separators.

Public styling hooks:

- Root: `--date-input-gap`, `--date-input-width`, `--date-input-max-width`,
  `--date-input-disabled-opacity`
- Label: `--date-input-label-color`, `--date-input-label-font-size`,
  `--date-input-label-font-weight`, `--date-input-label-line-height`
- Control: `--date-input-control-height`, `--date-input-border-width`,
  `--date-input-border-style`, `--date-input-border-color`, `--date-input-border-color-invalid`,
  `--date-input-radius`, `--date-input-padding-x`, `--date-input-padding-y`,
  `--date-input-bg`, `--date-input-color`, `--date-input-focus-ring-width`,
  `--date-input-focus-ring-offset`, `--date-input-focus-ring-color`, `--date-input-transition`
- Segment: `--date-input-segment-gap`, `--date-input-segment-min-width`,
  `--date-input-segment-radius`, `--date-input-segment-padding-x`,
  `--date-input-segment-padding-y`, `--date-input-segment-color`,
  `--date-input-segment-bg-focus`, `--date-input-segment-color-focus`,
  `--date-input-segment-shadow-focus`, `--date-input-segment-line-height`,
  `--date-input-placeholder-color`, `--date-input-separator-color`

## Intentional sugar and differences from upstream

`DateInput.Separator` is the only local sugar. It renders a presentational span for text such as
`to` between range segment groups. The wrapper does not add date-picker popovers, calendar buttons,
string parsing, segment shortcuts, or local event aliases.

## Agent notes

- Keep the default examples aligned with Ark `DateInput.SegmentContext`; use `DateInput.Context`
  only when consumers need root API access such as `clearValue()`, `focus()`, or `valueAsString`.
- Keep callback details untouched: `onValueChange(details)` reports `details.value` and
  `details.valueAsString`.
- Do not hide `HiddenInput`; form behavior depends on explicit names, especially for ranges.
- Keep `@internationalized/date` examples in docs because Ark values are `DateValue` objects.

## Local changelog

- 2026-06-22: Added the Ark-backed `DateInput` wrapper, segmented composition, CSS module, stories,
  local docs, public exports, docs page, and registry metadata.