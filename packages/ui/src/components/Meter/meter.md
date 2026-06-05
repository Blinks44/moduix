# Meter

Upstream primitive docs: https://base-ui.com/react/components/meter.md

## Purpose

`Meter` displays a bounded numeric measurement such as storage usage, quota consumption, or service
health within a known range. It is a thin styled wrapper over Base UI `Meter` with a simple default
path: the high-level `Meter` component renders the track and indicator for you, while the exported
parts keep full composition available when you need a different layout or bar structure.

Use `Meter` for known values only. If the value can be unknown or indeterminate, use `Progress`
instead.

## Current behavior contract

- `Meter` forwards its ref to the root meter element and auto-renders:
  - `MeterTrack`
  - `MeterIndicator`
- `value` is required and must always be a `number`.
- `min` and `max` default to `0` and `100`.
- `Meter` has no internal state, uncontrolled mode, or `defaultValue`; consumers always own the
  current value.
- `MeterRoot`, `MeterLabel`, `MeterValue`, `MeterTrack`, and `MeterIndicator` are exported for
  explicit composition. All exported parts forward their refs to the underlying Base UI primitive
  element.
- The wrapper does not add extra feature props, variants, status flags, or slot prop bags. The only
  DX sugar is the default track/indicator rendered by `Meter`.

## Basic usage

```tsx
import { Meter, MeterLabel, MeterValue } from 'moduix';

export function StorageMeter() {
  return (
    <Meter value={24}>
      <MeterLabel>Storage used</MeterLabel>
      <MeterValue />
    </Meter>
  );
}
```

Custom accessible wording:

```tsx
import { Meter, MeterLabel, MeterValue } from 'moduix';

export function StorageHealthMeter() {
  return (
    <Meter
      value={68}
      getAriaValueText={(formattedValue, value) =>
        `${formattedValue} percent of storage used (${value} of 100)`
      }
    >
      <MeterLabel>Storage usage</MeterLabel>
      <MeterValue>{(formattedValue) => `${formattedValue}% used`}</MeterValue>
    </Meter>
  );
}
```

Advanced composition:

```tsx
import { MeterIndicator, MeterLabel, MeterRoot, MeterTrack, MeterValue } from 'moduix';

export function TeamCapacityMeter() {
  return (
    <MeterRoot value={58}>
      <MeterLabel>Team capacity</MeterLabel>
      <MeterValue>{(formattedValue) => `${formattedValue} available`}</MeterValue>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </MeterRoot>
  );
}
```

## Parts

| Part             | Element/primitive          | Purpose                                                                  |
| ---------------- | -------------------------- | ------------------------------------------------------------------------ |
| `Meter`          | `MeterPrimitive.Root`      | High-level wrapper that renders the root plus the default track/fill.    |
| `MeterRoot`      | `MeterPrimitive.Root`      | Low-level root for explicit composition and custom DOM structure.        |
| `MeterLabel`     | `MeterPrimitive.Label`     | Accessible label associated with the root meter.                         |
| `MeterValue`     | `MeterPrimitive.Value`     | Visible formatted value text, optionally rendered with a child function. |
| `MeterTrack`     | `MeterPrimitive.Track`     | Bar background covering the full range.                                  |
| `MeterIndicator` | `MeterPrimitive.Indicator` | Filled portion that reflects the current value within the range.         |

`Meter` is the recommended default. Reach for `MeterRoot` only when you need to control where the
track sits in the layout or when the visual bar needs distinct `render`, `className`, or DOM
structure.

## Public props

`Meter` and `MeterRoot` accept Base UI root props. The most relevant public props are:

| Prop                 | Type                                                                   | Default | Notes                                                                                        |
| -------------------- | ---------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `value`              | `number`                                                               | —       | Required current value. There is no `null` or indeterminate state.                           |
| `min`                | `number`                                                               | `0`     | Lower bound for value formatting and ARIA attributes.                                        |
| `max`                | `number`                                                               | `100`   | Upper bound for value formatting and ARIA attributes.                                        |
| `locale`             | `Intl.LocalesArgument`                                                 | runtime | Passed to `Intl.NumberFormat` for value formatting.                                          |
| `format`             | `Intl.NumberFormatOptions`                                             | —       | Formatting options for visible and accessible value text.                                    |
| `aria-valuetext`     | `string`                                                               | —       | Override accessible value text when the formatted number alone is not descriptive enough.    |
| `getAriaValueText`   | `(formattedValue: string, value: number) => string`                    | —       | Generates accessible value text from the current formatted value and raw number.             |
| `className`          | Base UI `className` prop                                               | —       | Merged with moduix classes on each exported part.                                            |
| `style`              | Base UI `style` prop                                                   | —       | Passed through to the primitive. Callback form remains available.                            |
| `render`             | Base UI `render` prop                                                  | —       | Escape hatch for element replacement/composition. Preserve the received accessibility props. |
| `children` (`Value`) | `(formattedValue: string, value: number) => React.ReactNode` \| `null` | —       | Custom visible value content for `MeterValue`.                                               |

Important notes:

- `MeterValue` can render the default formatted text or a child render function. That function
  receives both the formatted text and the raw `value`.
- Callback forms like `className={(state) => ...}` remain available from Base UI, but `Meter`
  state objects are intentionally empty. Do not expect `status`, `complete`, or similar wrapper
  state fields.

## Styling API

Stable `data-slot` hooks:

| Hook value        | Written by           |
| ----------------- | -------------------- |
| `meter-root`      | `Meter`, `MeterRoot` |
| `meter-label`     | `MeterLabel`         |
| `meter-value`     | `MeterValue`         |
| `meter-track`     | `MeterTrack`         |
| `meter-indicator` | `MeterIndicator`     |

Use `className` for local overrides and `--meter-*` variables for token-level customization.
Public variables from `theme.css`:

| Variable group | Variables                                                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout         | `--meter-width`, `--meter-gap`                                                                                                                                                                                                          |
| Text           | `--meter-color`, `--meter-label-color`, `--meter-label-font-size`, `--meter-label-font-weight`, `--meter-label-line-height`, `--meter-value-color`, `--meter-value-font-size`, `--meter-value-font-weight`, `--meter-value-line-height` |
| Track          | `--meter-track-height`, `--meter-track-radius`, `--meter-track-bg`, `--meter-track-border-width`, `--meter-track-border-color`                                                                                                          |
| Indicator      | `--meter-indicator-bg`, `--meter-indicator-radius`, `--meter-indicator-transition`                                                                                                                                                      |

Styling details worth preserving:

- `.root` defines the default text color via `--meter-color`; label and value inherit from
  `currentColor` unless their own token is overridden.
- `.track` spans the full grid width and carries the default border, radius, and background.
- `.indicator` only styles the fill and transition; width calculation stays owned by Base UI.
- There are no moduix variants, size props, or wrapper-specific state attributes beyond
  `data-slot`.

Example:

```css
.quotaMeter {
  --meter-width: 16rem;
  --meter-track-height: 0.75rem;
  --meter-track-bg: var(--color-accent);
}

.quotaMeter [data-slot='meter-track'] {
  box-shadow: inset 0 0 0 var(--border-width-md)
    color-mix(in oklab, var(--color-primary), transparent 75%);
}

.quotaMeter [data-slot='meter-indicator'] {
  background: linear-gradient(90deg, var(--color-primary), var(--color-chart-2));
}
```

## UX and accessibility

- Every meter needs an accessible name. Use `MeterLabel` for the default path or provide
  `aria-label`/`aria-labelledby` when composing without a visible label.
- `Meter` inherits the semantic meter role and `aria-valuemin`, `aria-valuemax`, and
  `aria-valuenow` behavior from Base UI.
- Use `aria-valuetext` or `getAriaValueText` when the numeric value needs domain-specific wording
  for screen readers.
- `Meter` is informational, not interactive. There is no keyboard interaction, focus management, or
  disabled/readOnly wrapper state to preserve.
- Prefer `MeterValue` for visible numeric output so formatting stays aligned with the root value.

## Limitations and recommendations

- Do not add null/indeterminate support here. Unknown progress belongs to `Progress`.
- Do not add helper props for thresholds, status colors, tooltips, or labels. Use composition or
  adjacent UI when those concerns are needed.
- Use explicit composition when you need a different visual structure. Do not disable the built-in
  track with additional sugar props.
- If you use `render`, forward the provided props to an element that preserves the root semantics and
  measurements.

## Intentional differences from Base UI

- Import from `moduix` when you want the library styling contract and convenience wrapper.
- `Meter` is a high-level root wrapper that auto-renders `MeterTrack` and `MeterIndicator`; Base UI
  exposes only the primitive parts.
- The moduix contract is documented here around the shipped wrapper, not the full upstream API
  reference surface.

## Agent notes

- Preserve the high-level `Meter` sugar that auto-renders the track and indicator after `children`.
- Keep the ref behavior of all exported parts aligned with `Progress`.
- Preserve the non-null `value` contract and the absence of indeterminate/status styling APIs.
- Keep stories, docs examples, and this file synchronized when root props or `--meter-*` variables
  change.
- If new public CSS variables are added, register them in `theme.css` and update this file in the
  same task.

## Local changelog

- Rewrote the local documentation to describe the real moduix `Meter` wrapper contract instead of
  the upstream Base UI reference content.
- Documented the default auto-track composition, public styling hooks, accessibility guidance, and
  the intentional non-indeterminate contract.
- Meter and all exported parts now forward refs for API consistency with sibling range-display
  components such as `Progress`.