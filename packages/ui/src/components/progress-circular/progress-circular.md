# Progress Circular

Upstream primitive docs: https://ark-ui.com/docs/components/progress-circular

## Purpose

`ProgressCircular` shows determinate or indeterminate progress with the Ark circular progress
anatomy. It is a styled wrapper over `@ark-ui/react/progress` and preserves Ark props, callback
detail objects, context, `RootProvider`, SVG circle parts, and state attributes.

Use `ProgressCircular` when progress needs to fit in a compact badge, toolbar, card, or inline
status area where a horizontal bar would take too much width.

## Current behavior contract

- `ProgressCircular` is the same part as `ProgressCircular.Root`; it does not auto-render child
  parts.
- Standard anatomy is `ProgressCircular.Circle`, `ProgressCircular.CircleTrack`,
  `ProgressCircular.CircleRange`, and optional `ProgressCircular.ValueText`.
- `defaultValue` controls the initial uncontrolled value. `value` plus
  `onValueChange(details)` controls the component.
- `defaultValue={null}` or `value={null}` switches to indeterminate progress.
- `min` and `max` default to `0` and `100`.
- `translations.value(details)` controls the visible and accessible value string.
- `ProgressCircular.RootProvider`, `ProgressCircular.Context`, `useProgressCircular()`, and
  `useProgressCircularContext()` expose Ark state management without remapping.
- `ProgressCircular.View` lets adjacent UI switch on Ark progress state without a separate state
  layer.

## Basic usage

```tsx
import { ProgressCircular } from 'moduix';

export function ExportProgress() {
  return (
    <ProgressCircular defaultValue={42}>
      <ProgressCircular.Label>Export data</ProgressCircular.Label>
      <ProgressCircular.Circle>
        <ProgressCircular.CircleTrack />
        <ProgressCircular.CircleRange />
      </ProgressCircular.Circle>
      <ProgressCircular.ValueText />
    </ProgressCircular>
  );
}
```

## Anatomy

```text
ProgressCircular.Root
├─ ProgressCircular.Label
├─ ProgressCircular.Circle
│  ├─ ProgressCircular.CircleTrack
│  └─ ProgressCircular.CircleRange
└─ ProgressCircular.ValueText

ProgressCircular.RootProvider
└─ same part tree connected to useProgressCircular()
```

| Part                                         | Role                                                                  |
| -------------------------------------------- | --------------------------------------------------------------------- |
| `ProgressCircular` / `ProgressCircular.Root` | Owns progress state, formatting, and ids.                             |
| `ProgressCircular.RootProvider`              | Connects parts to a store created with `useProgressCircular()`.       |
| `ProgressCircular.Label`                     | Accessible label for the progressbar.                                 |
| `ProgressCircular.Circle`                    | SVG progressbar surface with ARIA semantics.                          |
| `ProgressCircular.CircleTrack`               | Background circle.                                                    |
| `ProgressCircular.CircleRange`               | Foreground circle that reflects current percent/state.                |
| `ProgressCircular.ValueText`                 | Visible value text derived from Ark translations.                     |
| `ProgressCircular.View`                      | Conditional view for `indeterminate`, `loading`, or `complete` state. |
| `ProgressCircular.Context`                   | Render-prop access to the Ark progress API.                           |

## Public props

`ProgressCircular` and `ProgressCircular.Root` accept Ark progress root props.

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
| `asChild`            | `boolean`                                      | —                      | Ark host composition escape hatch.         |

## Styling API

Stable `data-slot` hooks:

| Hook value                        | Written by                      |
| --------------------------------- | ------------------------------- |
| `progress-circular-root`          | `ProgressCircular.Root`         |
| `progress-circular-root-provider` | `ProgressCircular.RootProvider` |
| `progress-circular-label`         | `ProgressCircular.Label`        |
| `progress-circular-circle`        | `ProgressCircular.Circle`       |
| `progress-circular-circle-track`  | `ProgressCircular.CircleTrack`  |
| `progress-circular-circle-range`  | `ProgressCircular.CircleRange`  |
| `progress-circular-value-text`    | `ProgressCircular.ValueText`    |
| `progress-circular-view`          | `ProgressCircular.View`         |

Ark attributes are preserved, including `data-scope="progress"`, `data-part`, `data-state`,
`data-orientation`, `data-value`, and `data-max`. `data-state` is
`'indeterminate' | 'loading' | 'complete'`.

Ark circle variables `--size`, `--thickness`, `--radius`, `--circumference`, and `--percent` stay
owned by Ark. Moduix maps public tokens to `--size` and `--thickness` on the circle part.

Public variables from `theme.css` use the `--progress-circular-*` prefix and cover root layout,
circle size/thickness, track color, range color, value text, and the indeterminate animation.

## UX and accessibility

- Every circular progressbar needs an accessible name. Use `ProgressCircular.Label` or provide an
  `aria-label`/`aria-labelledby` through Ark composition.
- `ProgressCircular.Circle` receives progressbar role and value ARIA attributes from Ark.
- `ProgressCircular.ValueText` uses `aria-live="polite"`.
- Use `translations.value(details)` when the default formatted percent is not descriptive enough.
- Progress is informational and has no keyboard interaction.

## Intentional differences from the old Base UI wrapper

- `Progress`, `ProgressRoot`, `ProgressLabel`, `ProgressValue`, `ProgressTrack`, and
  `ProgressIndicator` were removed.
- Circular progress is now a dedicated public component instead of a variant prop on old
  `Progress`.
- `format` was replaced by Ark `formatOptions`.
- `getAriaValueText` and `aria-valuetext` examples were replaced by Ark `translations.value`.
- `ProgressValue` was replaced by Ark `ValueText`.
- State selectors changed from Base UI status attributes to Ark `data-state`.

## Local changelog

- Added `ProgressCircular` as an Ark UI circular progress wrapper.
- Split progress into `ProgressLinear` and `ProgressCircular` public components.
- Added RootProvider, Context, and hook exports.
- Added `--progress-circular-*` styling tokens and SVG circle styling.