# DateInput

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/date-input
- Chakra UI: https://chakra-ui.com/docs/components/date-picker

## Purpose

`DateInput` is a segmented date entry control for typing single dates or date ranges with locale-aware
segments and native form submission.

## Upstream model to preserve

Preserve Ark UI's `DateInput.Root` primitive, explicit segmented composition, `DateValue[]` state,
details-object callbacks, `RootProvider`, and the upstream segmented rendering flow through
`DateInputSegmentContext` and `useDateInput()`. `DateInput.Segments` may hide the repeated render
helper for the common path, but `DateInput.SegmentGroup` and `DateInput.Segment` must remain
available for custom segment rendering.

Ark owns keyboard editing, segment focus, parsing, min/max validation, unavailable-date validation,
locale formatting, `HiddenInput` synchronization, and form reset behavior. Do not translate dates to
strings or local callback shapes in the wrapper.

## Current behavior contract

- `DateInput` is the short root form and maps to `DateInput.Root`.
- Advanced hooks, renderless context helpers, and Ark type aliases are imported directly from
  `@ark-ui/react/date-input`.
- `DateInput.Segments` is the recommended convenience part for rendering locale-aware segments
  inside a `DateInput.Control`; pass `segmentClassName` to style each generated segment.
- `DateInputSegmentContext` from `@ark-ui/react/date-input` remains the low-level Ark path for
  custom segment rendering inside a `DateInput.SegmentGroup`.
- `DateInput.HiddenInput` is explicit so consumers choose form names for single or range inputs.
- `DateInput.Separator` is moduix sugar for non-interactive text between segment groups.
- No local calendar popup, string parser, automatic segment renderer, or date-picker bundle is added.

## Anatomy and exported parts

```tsx
DateInput.Root
├─ DateInput.Label
├─ DateInput.Control
│  ├─ DateInput.Segments
│  └─ DateInput.Separator (optional, range layouts)
└─ DateInput.HiddenInput

Advanced custom segment rendering:

DateInput.SegmentGroup
└─ DateInputSegmentContext (from @ark-ui/react/date-input)
   └─ DateInput.Segment

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
| `DateInput.Segments`           | `date-input-segment-group` | Convenience renderer for one locale-aware group.   |
| `DateInput.HiddenInput`        | `date-input-hidden-input`  | Native hidden input for form submission and reset. |
| `DateInput.Separator`          | `date-input-separator`     | Presentational text between segment groups.        |

Exported values: `DateInput`.

## Composition

```tsx
import { CalendarDate } from '@internationalized/date';
import { DateInput } from '@moduix/react';

export function ReleaseDateInput() {
  return (
    <DateInput defaultValue={[new CalendarDate(2026, 6, 22)]} name="release-date">
      <DateInput.Label>Release date</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput>
  );
}
```

For ranges, set `selectionMode="range"` and render indexed `DateInput.Segments` /
`DateInput.HiddenInput` pairs. Use `DateInput.RootProvider` only with state created by Ark
`useDateInput()`; do not also render `DateInput.Root` for the same state instance.

Pass `segmentClassName` to `DateInput.Segments` when every generated segment needs the same custom
class. Use `DateInput.SegmentGroup`, Ark `DateInputSegmentContext`, and `DateInput.Segment` directly
when segment rendering needs to vary per segment.

## Upstream feature coverage

- Basic segmented date input: supported through `Label`, `Control`, `SegmentGroup`, `Segment`, and
  `HiddenInput`. Render the standard locale-aware group with `DateInput.Segments`, or render custom
  segments with `DateInputSegmentContext` from `@ark-ui/react/date-input`.
- Controlled and uncontrolled state: supported with `value`, `defaultValue`, and
  `onValueChange(details)`.
- Placeholder control: supported with `placeholderValue`, `defaultPlaceholderValue`, and
  `onPlaceholderChange(details)`.
- Focus state: supported with `focused`, `defaultFocused`, and `onFocusChange(details)`.
- Single and range selection: supported with `selectionMode="single"` or `"range"`.
- Locale and formatting: supported with `locale`, `timeZone`, `hourCycle`, `granularity`,
  `formatter`, `format`, `translations`, and `createCalendar`.
- Validation: supported with `min`, `max`, `isDateUnavailable`, and `invalid`.
- Forms: supported by explicit `DateInput.HiddenInput`, `name`, `form`, and `required`.
- Provider/state hooks: `DateInput.RootProvider` is preserved; import Ark `useDateInput()`,
  `useDateInputContext()`, `DateInputContext`, and `DateInputSegmentContext` directly from
  `@ark-ui/react/date-input` when needed.
- `asChild` and `ids`: preserved on Ark parts and root props.

## Accessibility and state

Every date input needs an accessible name from `DateInput.Label`, a native label, or ARIA props.
Ark wires segment spinbutton semantics, arrow-key editing, numeric typing, focus movement, ARIA value
text, and label association. `Field` can provide surrounding helper and error text, but pass
`required`, `disabled`, or `invalid` to `DateInput` when those state attributes must be present on
the date input itself.

`DateInput.HiddenInput` keeps native form submission and form reset synchronized with the Ark state.
For range inputs, render indexed hidden inputs and pass names explicitly when the submitted start/end
fields need separate keys.

Ark emits `data-scope="date-input"` and `data-part` attributes for `root`, `label`, `control`,
`segment-group`, `segment`, and `hidden-input`. State attributes include `data-disabled`,
`data-readonly`, `data-invalid`, `data-focus` on control and segment groups, `data-type`,
`data-editable`, and `data-placeholder-shown`.

## Defaults and styling

All visual parts accept `className`. The CSS module defines defaults for root spacing, label text,
the control frame, segment focus, placeholder color, invalid state, disabled/readonly state, and
presentational separators. Disabled inputs are visually muted; read-only inputs remain focusable and
non-editable.

Public styling hooks:

- Root: `--date-input-gap`, `--date-input-width`, `--date-input-max-width`,
  `--date-input-disabled-opacity`
- Label: `--date-input-label-color`, `--date-input-label-font-size`,
  `--date-input-label-font-weight`, `--date-input-label-line-height`
- Control: `--date-input-control-height`, `--date-input-border-width`,
  `--date-input-control-width`, `--date-input-border-style`, `--date-input-border-color`,
  `--date-input-border-color-invalid`, `--date-input-radius`, `--date-input-padding-x`, `--date-input-padding-y`,
  `--date-input-bg`, `--date-input-color`, `--date-input-focus-ring-width`,
  `--date-input-focus-ring-offset`, `--date-input-focus-ring-color`, `--date-input-transition`
- Segment: `--date-input-segment-gap`, `--date-input-segment-min-width`,
  `--date-input-segment-radius`, `--date-input-segment-padding-x`,
  `--date-input-segment-padding-y`, `--date-input-segment-color`,
  `--date-input-segment-bg-focus`, `--date-input-segment-color-focus`,
  `--date-input-segment-line-height`, `--date-input-placeholder-color`,
  `--date-input-separator-color`

## Intentional sugar and differences from upstream

`DateInput.Segments` is local sugar for the standard locale-aware segment group. It keeps the Ark
segment order and state while removing repeated `DateInputSegmentContext` boilerplate from the
common path. Its `className` styles the generated segment group, and `segmentClassName` styles each
generated segment. `DateInput.Separator` renders a presentational span for text such as `to` between
range segment groups. The wrapper keeps `RootProvider`, but does not re-export Ark hooks, renderless
context helpers, or Ark type aliases. Import those directly from `@ark-ui/react/date-input` when
needed. The wrapper does not add date-picker popovers, calendar buttons, string parsing, segment
shortcuts, or local event aliases.

## Agent notes

- Keep default examples on `DateInput.Segments`; use `segmentClassName` for shared segment styling
  and Ark `DateInputSegmentContext` only for per-segment custom rendering examples.
- Keep callback details untouched: `onValueChange(details)` reports `details.value` and
  `details.valueAsString`.
- Do not hide `HiddenInput`; form behavior depends on explicit names, especially for ranges.
- Keep `@internationalized/date` examples in docs because Ark values are `DateValue` objects.

## Local changelog

- 2026-07-08: Added `DateInput.Segments` as the default segment rendering sugar with
  `segmentClassName`, updated the recommended composition, and made the root/control width default
  to `100%`.
- 2026-07-02: Simplified the public surface to match other Ark wrappers by keeping `RootProvider`
  and all visual parts, preserving `Separator`, and moving Ark hooks, renderless context helpers,
  and type aliases back to direct upstream imports.
- 2026-06-25: Finalized the Ark migration audit by fixing the placeholder callback name in docs,
  preserving read-only pointer interaction, removing an unused segment shadow hook, and adding
  disabled/read-only and granularity docs coverage.
- 2026-06-22: Added the Ark-backed `DateInput` wrapper, segmented composition, CSS module, stories,
  local docs, public exports, docs page, and registry metadata.