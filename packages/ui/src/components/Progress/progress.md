# Progress

Upstream primitive docs: https://base-ui.com/react/components/progress

## Purpose

`Progress` shows task progress for work that may still be running or may not have a known completion
value yet. It is a thin styled wrapper over Base UI `Progress` with the same root semantics plus one
small DX shortcut: the high-level `Progress` component auto-renders the default track and indicator.

Use `Progress` when the value can be indeterminate (`value={null}`) or when you want a standard
label + value + bar layout with moduix styling. If the value is always known and represents a
measurement rather than ongoing work, prefer `Meter`.

## Current behavior contract

- `Progress` forwards its ref to the root progress element and auto-renders:
  - `ProgressTrack`
  - `ProgressIndicator`
- `Progress` renders the default track after `children`. If you need the track in a different place
  or want to replace its structure, use `ProgressRoot` and compose the parts explicitly.
- `value` is required and may be a `number` or `null`. `null` switches the component into the
  indeterminate state.
- `min` and `max` default to `0` and `100`.
- `ProgressRoot`, `ProgressLabel`, `ProgressValue`, `ProgressTrack`, and `ProgressIndicator` are
  exported for explicit composition. All exported parts forward their refs to the underlying Base UI
  primitive element.
- The wrapper does not add variants, status props, helper labels, threshold APIs, or slot prop bags.
  The only DX sugar is the default track/indicator rendered by `Progress`.

## Basic usage

```tsx
import { Progress, ProgressLabel, ProgressValue } from 'moduix';

export function ExportProgress() {
  return (
    <Progress value={24}>
      <ProgressLabel>Export data</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}
```

Indeterminate progress:

```tsx
import { Progress, ProgressLabel, ProgressValue } from 'moduix';

export function PreparingReportProgress() {
  return (
    <Progress value={null}>
      <ProgressLabel>Preparing report</ProgressLabel>
      <ProgressValue>{() => 'In progress'}</ProgressValue>
    </Progress>
  );
}
```

Explicit composition:

```tsx
import {
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressTrack,
  ProgressValue,
} from 'moduix';

export function TeamRolloutProgress() {
  return (
    <ProgressRoot value={58}>
      <ProgressLabel>Team rollout</ProgressLabel>
      <ProgressValue>{(formattedValue) => `${formattedValue} shipped`}</ProgressValue>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressRoot>
  );
}
```

## Parts

| Part                | Element/primitive             | Purpose                                                                     |
| ------------------- | ----------------------------- | --------------------------------------------------------------------------- |
| `Progress`          | `ProgressPrimitive.Root`      | High-level wrapper that renders the root plus the default track/fill.       |
| `ProgressRoot`      | `ProgressPrimitive.Root`      | Low-level root for explicit composition and custom DOM structure.           |
| `ProgressLabel`     | `ProgressPrimitive.Label`     | Accessible label associated with the root progress bar.                     |
| `ProgressValue`     | `ProgressPrimitive.Value`     | Visible formatted value text, optionally rendered with a child function.    |
| `ProgressTrack`     | `ProgressPrimitive.Track`     | Bar background that spans the full available range.                         |
| `ProgressIndicator` | `ProgressPrimitive.Indicator` | Filled or indeterminate moving bar that represents the current task status. |

`Progress` is the recommended default. Reach for `ProgressRoot` when you need to control where the
track sits in the layout, omit the default track, or restyle the bar with a distinct DOM structure.

## Public props

`Progress` and `ProgressRoot` accept Base UI root props. The most relevant public props are:

| Prop                 | Type                                                                   | Default | Notes                                                                                        |
| -------------------- | ---------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `value`              | `number \| null`                                                       | —       | Required current value. `null` switches to indeterminate progress.                           |
| `min`                | `number`                                                               | `0`     | Lower bound for value formatting and ARIA attributes.                                        |
| `max`                | `number`                                                               | `100`   | Upper bound for value formatting and ARIA attributes.                                        |
| `locale`             | `Intl.LocalesArgument`                                                 | runtime | Passed to `Intl.NumberFormat` for value formatting.                                          |
| `format`             | `Intl.NumberFormatOptions`                                             | —       | Formatting options for visible and accessible value text.                                    |
| `aria-valuetext`     | `string`                                                               | —       | Override accessible value text when the formatted number alone is not descriptive enough.    |
| `getAriaValueText`   | `(formattedValue: string \| null, value: number \| null) => string`    | —       | Generates accessible value text from the current formatted value and raw value.              |
| `className`          | Base UI `className` prop                                               | —       | Merged with moduix classes on each exported part.                                            |
| `style`              | Base UI `style` prop                                                   | —       | Passed through to the primitive. Callback form remains available.                            |
| `render`             | Base UI `render` prop                                                  | —       | Escape hatch for element replacement/composition. Preserve the received accessibility props. |
| `children` (`Value`) | `(formattedValue: string \| null, value: number \| null) => ReactNode` | —       | Custom visible value content for `ProgressValue`.                                            |

Useful state details:

- `className`, `style`, and `render` callback forms from Base UI remain available.
- Their state object includes `status`, where `status` is `'indeterminate' | 'progressing' | 'complete'`.

## Styling API

Stable `data-slot` hooks:

| Hook value           | Written by                 |
| -------------------- | -------------------------- |
| `progress-root`      | `Progress`, `ProgressRoot` |
| `progress-label`     | `ProgressLabel`            |
| `progress-value`     | `ProgressValue`            |
| `progress-track`     | `ProgressTrack`            |
| `progress-indicator` | `ProgressIndicator`        |

State attributes from Base UI are available on all exported primitive parts:

- `data-complete`
- `data-progressing`
- `data-indeterminate`

Use `className` for local overrides and `--progress-*` variables for token-level customization.
Public variables from `theme.css`:

| Variable group | Variables                                                                                                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout         | `--progress-width`, `--progress-gap`, `--progress-color`                                                                                                                                                                                       |
| Text           | `--progress-label-color`, `--progress-label-font-size`, `--progress-label-font-weight`, `--progress-label-line-height`, `--progress-value-color`, `--progress-value-font-size`, `--progress-value-font-weight`, `--progress-value-line-height` |
| Track          | `--progress-track-height`, `--progress-track-radius`, `--progress-track-bg`, `--progress-track-border-width`, `--progress-track-border-color`                                                                                                  |
| Indicator      | `--progress-indicator-bg`, `--progress-indicator-radius`, `--progress-indicator-transition`, `--progress-indicator-indeterminate-width`, `--progress-indicator-indeterminate-animation`                                                        |

Styling details worth preserving:

- `.root` defines the default text color via `--progress-color`; label and value inherit from
  `currentColor` unless their own token is overridden.
- `.track` spans the full grid width and carries the default border, radius, and background.
- `.indicator` only styles the fill, transition, and indeterminate animation. Width calculation and
  status data attributes stay owned by Base UI.
- Indeterminate progress uses a moving indicator by default and disables that animation under
  `prefers-reduced-motion`.
- There are no moduix variants, size props, or wrapper-specific state props beyond `data-slot`.

Example:

```css
.quotaProgress {
  --progress-width: 16rem;
  --progress-track-height: 0.75rem;
  --progress-track-bg: var(--color-accent);
}

.quotaProgress [data-slot='progress-track'] {
  box-shadow: inset 0 0 0 var(--border-width-md)
    color-mix(in oklab, var(--color-primary), transparent 75%);
}

.quotaProgress [data-slot='progress-indicator'] {
  background: linear-gradient(90deg, var(--color-primary), var(--color-chart-2));
}
```

## UX and accessibility

- Every progress bar needs an accessible name. Use `ProgressLabel` for the default path or provide
  `aria-label`/`aria-labelledby` when composing without a visible label.
- `Progress` inherits the progressbar role and value ARIA behavior from Base UI. When `value={null}`,
  Base UI handles indeterminate semantics for assistive technology.
- Use `aria-valuetext` or `getAriaValueText` when the numeric value needs domain-specific wording for
  screen readers.
- `Progress` is informational, not interactive. There is no keyboard interaction, focus management,
  disabled, or readOnly wrapper state to preserve.
- Prefer `ProgressValue` for visible numeric output so formatting stays aligned with the root value.

## Limitations and recommendations

- Use `Meter` when the value is always known and represents a bounded measurement instead of ongoing
  task progress.
- Do not add helper props for labels, thresholds, status colors, tooltips, or alternate layouts. Use
  composition or adjacent UI when those concerns are needed.
- Use `ProgressRoot` instead of `Progress` when you need custom track placement or want to omit the
  default track entirely.
- If you use `render`, forward the provided props to an element that preserves the progress semantics
  and measurements from Base UI.

## Intentional differences from Base UI

- Import from `moduix` when you want the moduix styling contract and convenience wrapper.
- `Progress` is a high-level root wrapper that auto-renders `ProgressTrack` and `ProgressIndicator`;
  Base UI exposes only the primitive parts.
- moduix exports flat parts (`Progress`, `ProgressRoot`, `ProgressTrack`, and so on) instead of the
  upstream namespaced `Progress.Root` API.
- The local docs describe the shipped moduix wrapper contract, not the full upstream API reference.

## Agent notes

- Preserve the high-level `Progress` sugar that auto-renders the track and indicator after
  `children`.
- Keep the ref behavior of all exported parts aligned with `Meter`.
- Preserve the indeterminate contract: `value={null}` is supported and the indicator remains visibly
  active without requiring additional props.
- Keep stories, docs examples, and this file synchronized when root props, data attributes, or
  `--progress-*` variables change.
- If new public CSS variables are added, register them in `theme.css` and update this file in the
  same task.

## Local changelog

- Rewrote the local documentation to describe the actual moduix `Progress` wrapper, composition
  model, styling contract, indeterminate behavior, and accessibility guidance instead of mirroring
  the upstream Base UI docs.
- Documented the default auto-track composition, public `data-slot` hooks, Base UI state attributes,
  and the recommendation to use `ProgressRoot` for custom track placement.
- Disabled the indeterminate animation under `prefers-reduced-motion` to better respect reduced
  motion user preferences without changing the public API.