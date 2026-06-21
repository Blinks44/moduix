# Progress Linear

Upstream primitive docs: https://ark-ui.com/docs/components/progress-linear

## Purpose

`ProgressLinear` shows determinate or indeterminate progress with the Ark linear progress anatomy.
It is a styled wrapper over `@ark-ui/react/progress` and preserves Ark props, callback detail
objects, context, `RootProvider`, and state attributes.

Use `ProgressLinear` for horizontal task progress, uploads, quotas, health states, and loading
states where a bar communicates progress better than a circular indicator.

## Current behavior contract

- `ProgressLinear` is the same part as `ProgressLinear.Root`; it does not auto-render child parts.
- Standard anatomy is `ProgressLinear.Label`, `ProgressLinear.ValueText`,
  `ProgressLinear.Track`, and `ProgressLinear.Range`.
- `defaultValue` controls the initial uncontrolled value. `value` plus
  `onValueChange(details)` controls the component.
- `defaultValue={null}` or `value={null}` switches to indeterminate progress.
- `min` and `max` default to `0` and `100`.
- `translations.value(details)` controls the visible and accessible value string.
- `ProgressLinear.RootProvider`, `ProgressLinear.Context`, `useProgressLinear()`, and
  `useProgressLinearContext()` expose Ark state management without remapping.
- `ProgressLinear.View` lets adjacent UI switch on Ark progress state without a separate state
  layer.

## Basic usage

```tsx
import { ProgressLinear } from 'moduix';

export function ExportProgress() {
  return (
    <ProgressLinear defaultValue={24}>
      <ProgressLinear.Label>Export data</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track>
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}
```

## Anatomy

```text
ProgressLinear.Root
├─ ProgressLinear.Label
├─ ProgressLinear.ValueText
└─ ProgressLinear.Track
   └─ ProgressLinear.Range

ProgressLinear.RootProvider
└─ same part tree connected to useProgressLinear()
```

| Part                                     | Role                                                                  |
| ---------------------------------------- | --------------------------------------------------------------------- |
| `ProgressLinear` / `ProgressLinear.Root` | Owns progress state, formatting, and ids.                             |
| `ProgressLinear.RootProvider`            | Connects parts to a store created with `useProgressLinear()`.         |
| `ProgressLinear.Label`                   | Accessible label for the progressbar.                                 |
| `ProgressLinear.ValueText`               | Visible value text derived from Ark translations.                     |
| `ProgressLinear.Track`                   | Linear progressbar rail with ARIA progressbar semantics.              |
| `ProgressLinear.Range`                   | Filled range that reflects the current percent/state.                 |
| `ProgressLinear.View`                    | Conditional view for `indeterminate`, `loading`, or `complete` state. |
| `ProgressLinear.Context`                 | Render-prop access to the Ark progress API.                           |

## Public props

`ProgressLinear` and `ProgressLinear.Root` accept Ark progress root props.

| Prop                 | Type                                           | Default                | Notes                                      |
| -------------------- | ---------------------------------------------- | ---------------------- | ------------------------------------------ |
| `defaultValue`       | `number \| null`                               | `50`                   | Initial uncontrolled value.                |
| `value`              | `number \| null`                               | —                      | Controlled value. `null` is indeterminate. |
| `onValueChange`      | `(details: { value: number \| null }) => void` | —                      | Ark callback shape.                        |
| `min`                | `number`                                       | `0`                    | Lower bound for percent and ARIA.          |
| `max`                | `number`                                       | `100`                  | Upper bound for percent and ARIA.          |
| `formatOptions`      | `Intl.NumberFormatOptions`                     | `{ style: 'percent' }` | Value formatter options.                   |
| `locale`             | `string`                                       | `'en-US'`              | Formatter locale.                          |
| `translations.value` | `(details) => string`                          | Ark default            | Visible and accessible value text.         |
| `ids`                | `{ root?, track?, label?, circle? }`           | —                      | Stable ids for composition.                |
| `orientation`        | `'horizontal' \| 'vertical'`                   | `'horizontal'`         | Ark orientation.                           |
| `asChild`            | `boolean`                                      | —                      | Ark host composition escape hatch.         |

## Styling API

Stable `data-slot` hooks:

| Hook value                      | Written by                    |
| ------------------------------- | ----------------------------- |
| `progress-linear-root`          | `ProgressLinear.Root`         |
| `progress-linear-root-provider` | `ProgressLinear.RootProvider` |
| `progress-linear-label`         | `ProgressLinear.Label`        |
| `progress-linear-value-text`    | `ProgressLinear.ValueText`    |
| `progress-linear-track`         | `ProgressLinear.Track`        |
| `progress-linear-range`         | `ProgressLinear.Range`        |
| `progress-linear-view`          | `ProgressLinear.View`         |

Ark attributes are preserved, including `data-scope="progress"`, `data-part`, `data-state`,
`data-orientation`, `data-value`, and `data-max`. `data-state` is
`'indeterminate' | 'loading' | 'complete'`.

Public variables from `theme.css` use the `--progress-linear-*` prefix and cover layout, label
text, value text, track, range, and the indeterminate animation.

## UX and accessibility

- Every progressbar needs an accessible name. Use `ProgressLinear.Label` or provide an
  `aria-label`/`aria-labelledby` through Ark composition.
- `ProgressLinear.Track` receives progressbar role and value ARIA attributes from Ark.
- `ProgressLinear.ValueText` uses `aria-live="polite"`.
- Use `translations.value(details)` when the default formatted percent is not descriptive enough.
- Progress is informational and has no keyboard interaction.

## Intentional differences from the old previous wrapper

- `Progress`, `ProgressRoot`, `ProgressLabel`, `ProgressValue`, `ProgressTrack`, and
  `ProgressIndicator` were removed.
- `ProgressLinear` no longer auto-renders a default track/range. Ark anatomy is explicit.
- `format` was replaced by Ark `formatOptions`.
- `getAriaValueText` and `aria-valuetext` examples were replaced by Ark `translations.value`.
- `ProgressValue` was replaced by Ark `ValueText`.
- State selectors changed from legacy status attributes to Ark `data-state`.

## Local changelog

- Migrated linear progress to Ark UI.
- Split progress into `ProgressLinear` and `ProgressCircular` public components.
- Replaced flat aliases with namespace-first Ark parts.
- Added RootProvider, Context, and hook exports.
- Replaced `--progress-*` tokens with `--progress-linear-*` tokens.