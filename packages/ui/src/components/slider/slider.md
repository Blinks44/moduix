# Slider

Upstream primitive docs: https://base-ui.com/react/components/slider

## Purpose

`Slider` is the moduix range input for selecting one numeric value or a bounded range of values. It is
a thin styled wrapper over Base UI `Slider` with one narrow convenience: the high-level `Slider`
component renders the default control, track, and indicator for you, so the common path only needs
labels, value output, and thumbs.

Use it for volume, ranges, quotas, budgets, and other interactive numeric selection. Reach for
`SliderRoot` when you need to control the structural track composition directly.

## Current behavior contract

- `Slider` preserves Base UI slider behavior and root props, including controlled and uncontrolled
  usage, form integration, keyboard interaction, range values, formatting, orientation, and collision
  handling.
- `Slider` auto-renders this structure after collecting its children:
  - `SliderControl`
  - `SliderTrack`
  - `SliderIndicator`
- `Slider` does **not** render a default thumb. Consumers must render one `SliderThumb` per selected
  value so each thumb can receive an accessible name.
- Direct `SliderThumb` children are moved into the default `SliderTrack`; other children stay in the
  outer `SliderRoot` layout before the control.
- `SliderRoot`, `SliderLabel`, `SliderValue`, `SliderControl`, `SliderTrack`, `SliderIndicator`, and
  `SliderThumb` are all exported for explicit composition and forward refs to the underlying primitive
  elements.
- There are no wrapper-specific variants, size props, slot-prop bags, or alternate layout flags. The
  only moduix sugar is the default control/track/indicator composition in `Slider`.

## Basic usage

Single value:

```tsx
import { Slider, SliderLabel, SliderThumb, SliderValue } from 'moduix';

export function VolumeSlider() {
  return (
    <Slider defaultValue={40}>
      <SliderLabel>Volume</SliderLabel>
      <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
      <SliderThumb aria-label="Volume" />
    </Slider>
  );
}
```

Range slider:

```tsx
import { Slider, SliderLabel, SliderThumb, SliderValue } from 'moduix';
import { useState } from 'react';

export function PriceRangeSlider() {
  const [value, setValue] = useState([20, 70] as readonly number[]);

  return (
    <Slider value={value} min={0} max={100} onValueChange={setValue}>
      <SliderLabel>Price range</SliderLabel>
      <SliderValue>{([minValue, maxValue]) => `${minValue} - ${maxValue}`}</SliderValue>
      <SliderThumb index={0} aria-label="Minimum price" />
      <SliderThumb index={1} aria-label="Maximum price" />
    </Slider>
  );
}
```

Custom structure:

```tsx
import {
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from 'moduix';

export function TemperatureSlider() {
  return (
    <SliderRoot defaultValue={56}>
      <SliderLabel>Temperature</SliderLabel>
      <SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb aria-label="Temperature" />
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  );
}
```

## Composition

Default wrapper anatomy:

```text
Slider
├─ SliderLabel
├─ SliderValue
└─ SliderThumb[index]
```

Rendered structure:

```text
SliderRoot
├─ SliderLabel
├─ SliderValue
└─ SliderControl
   └─ SliderTrack
      ├─ SliderIndicator
      └─ SliderThumb[index]
```

Exported parts:

| Part              | Element/primitive           | Purpose                                                                    |
| ----------------- | --------------------------- | -------------------------------------------------------------------------- |
| `Slider`          | `SliderPrimitive.Root`      | High-level wrapper with default control/track/indicator composition.       |
| `SliderRoot`      | `SliderPrimitive.Root`      | Low-level root for explicit composition and custom track placement.        |
| `SliderLabel`     | `SliderPrimitive.Label`     | Visible label associated with the slider thumbs.                           |
| `SliderValue`     | `SliderPrimitive.Value`     | Visible formatted value output.                                            |
| `SliderControl`   | `SliderPrimitive.Control`   | Interactive region for pointer and keyboard slider input.                  |
| `SliderTrack`     | `SliderPrimitive.Track`     | Full range track that contains the indicator and thumbs.                   |
| `SliderIndicator` | `SliderPrimitive.Indicator` | Filled portion between the current value bounds.                           |
| `SliderThumb`     | `SliderPrimitive.Thumb`     | Interactive handle; renders a nested `<input type="range">` for semantics. |

Use `Slider` for the default path. Use `SliderRoot` when:

- the track should appear somewhere else in the layout;
- you need direct classes on `SliderControl`, `SliderTrack`, or `SliderIndicator`;
- thumb elements are wrapped in custom components and should not rely on the direct-child sugar.

## Public props

`Slider` and `SliderRoot` accept Base UI root props. The most relevant ones are:

| Prop                     | Type                                       | Default      | Notes                                                                                        |
| ------------------------ | ------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------- |
| `value`                  | `number \| readonly number[]`              | —            | Controlled value. Use a number for one thumb or an array for a range.                        |
| `defaultValue`           | `number \| readonly number[]`              | —            | Uncontrolled initial value.                                                                  |
| `onValueChange`          | `(value, eventDetails) => void`            | —            | Fires on drag, keyboard input, track press, or hidden input change.                          |
| `onValueCommitted`       | `(value, eventDetails) => void`            | —            | Fires when the interaction is committed, such as on pointer release.                         |
| `min`                    | `number`                                   | `0`          | Lower bound.                                                                                 |
| `max`                    | `number`                                   | `100`        | Upper bound.                                                                                 |
| `step`                   | `number`                                   | `1`          | Small keyboard/pointer increment.                                                            |
| `largeStep`              | `number`                                   | `10`         | Page Up/Page Down and Shift+Arrow increment.                                                 |
| `minStepsBetweenValues`  | `number`                                   | `0`          | Minimum distance between thumbs for range sliders.                                           |
| `orientation`            | `'horizontal' \| 'vertical'`               | `horizontal` | Switches the layout and interaction axis.                                                    |
| `thumbAlignment`         | `'center' \| 'edge' \| 'edge-client-only'` | `center`     | Controls whether thumbs overflow or stay inset at the min/max edges.                         |
| `thumbCollisionBehavior` | `'push' \| 'swap' \| 'none'`               | `push`       | Defines how multiple thumbs behave when dragged into each other.                             |
| `disabled`               | `boolean`                                  | `false`      | Prevents interaction and applies disabled styling hooks.                                     |
| `name`                   | `string`                                   | —            | Enables form submission via the hidden range input(s).                                       |
| `form`                   | `string`                                   | —            | Associates the hidden input(s) with an external form.                                        |
| `locale`                 | `Intl.LocalesArgument`                     | runtime      | Locale used by `Intl.NumberFormat`.                                                          |
| `format`                 | `Intl.NumberFormatOptions`                 | —            | Formatting options for visible and accessible values.                                        |
| `className`              | Base UI `className` prop                   | —            | Merged with moduix classes on each exported part. Callback form remains available.           |
| `style`                  | Base UI `style` prop                       | —            | Passed through to the primitive. Callback form remains available.                            |
| `render`                 | Base UI `render` prop                      | —            | Escape hatch for element replacement/composition. Preserve the provided semantics and props. |

Important part-specific props:

| Part          | Prop               | Notes                                                                                   |
| ------------- | ------------------ | --------------------------------------------------------------------------------------- |
| `SliderThumb` | `aria-label`       | Recommended accessible name for a thumb when you are not relying only on `SliderLabel`. |
| `SliderThumb` | `getAriaLabel`     | Useful for multi-thumb sliders that generate labels from the thumb index.               |
| `SliderThumb` | `getAriaValueText` | Accessible thumb-specific value text for screen readers.                                |
| `SliderThumb` | `index`            | Required for SSR-safe multi-thumb sliders and recommended for stable thumb identity.    |
| `SliderThumb` | `inputRef`         | Ref to the nested `<input type="range">`.                                               |
| `SliderValue` | `children`         | Render function receives `(formattedValues, values)` as arrays, even for one thumb.     |

Examples:

```tsx
<SliderValue>{([formattedValue]) => `${formattedValue}%`}</SliderValue>

<SliderValue>{([minLabel, maxLabel], [minValue, maxValue]) => `${minLabel} - ${maxLabel}`}</SliderValue>
```

There is no wrapper-level `readOnly` prop today. Use `disabled` when the current value should stay
visible but interaction must stop.

## Styling API

Stable `data-slot` hooks:

| Hook value         | Written by             |
| ------------------ | ---------------------- |
| `slider-root`      | `Slider`, `SliderRoot` |
| `slider-label`     | `SliderLabel`          |
| `slider-value`     | `SliderValue`          |
| `slider-control`   | `SliderControl`        |
| `slider-track`     | `SliderTrack`          |
| `slider-indicator` | `SliderIndicator`      |
| `slider-thumb`     | `SliderThumb`          |

State attributes used by moduix styles:

- `data-orientation` on `SliderRoot`, `SliderValue`, `SliderControl`, and `SliderTrack`
- `data-disabled` on `SliderRoot`, `SliderControl`, and `SliderThumb`
- `data-dragging` on `SliderThumb`

Base UI also provides state objects to callback `className` and `style` props. For root-derived
parts, those states include fields like `activeThumbIndex`, `disabled`, `dragging`, `min`, `max`,
`minStepsBetweenValues`, `orientation`, `step`, and `values`.

Public CSS variables from `theme.css`:

| Variable group | Variables                                                                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Layout         | `--slider-color`, `--slider-gap`, `--slider-height`, `--slider-width`, `--slider-width-vertical`                                                                                                                                                 |
| Label          | `--slider-label-color`, `--slider-label-font-size`, `--slider-label-font-weight`, `--slider-label-line-height`                                                                                                                                   |
| Value          | `--slider-value-color`, `--slider-value-font-size`, `--slider-value-font-weight`, `--slider-value-line-height`                                                                                                                                   |
| Control        | `--slider-control-padding-x`, `--slider-control-padding-y`, `--slider-disabled-opacity`                                                                                                                                                          |
| Track          | `--slider-track-bg`, `--slider-track-border-color`, `--slider-track-border-width`, `--slider-track-radius`, `--slider-track-size`                                                                                                                |
| Indicator      | `--slider-indicator-bg`, `--slider-indicator-radius`                                                                                                                                                                                             |
| Thumb          | `--slider-focus-ring-color`, `--slider-thumb-bg`, `--slider-thumb-border-color`, `--slider-thumb-border-width`, `--slider-thumb-radius`, `--slider-thumb-shadow`, `--slider-thumb-shadow-dragging`, `--slider-thumb-size`, `--slider-transition` |

Styling details worth preserving:

- `.root` owns the overall grid layout and width. `Slider` is the right place for width and layout
  overrides in the default path.
- `.control` owns the interactive hit area and the vertical padding/inset contract.
- `.track` owns thickness, border, background, and orientation-aware sizing.
- `.indicator` only styles the filled range. Base UI still owns position and length calculations.
- `.thumb` styles the outer thumb wrapper while focus styling comes from the nested input via
  `:has(:focus-visible)`.

Example:

```css
.budgetSlider {
  --slider-width: 16rem;
  --slider-track-size: 0.625rem;
  --slider-track-bg: color-mix(in oklab, var(--color-chart-4) 18%, var(--color-muted));
}

.budgetSlider [data-slot='slider-indicator'] {
  --slider-indicator-bg: var(--color-chart-4);
}

.budgetSlider [data-slot='slider-thumb'] {
  --slider-thumb-size: 1.25rem;
  --slider-thumb-bg: var(--color-chart-4);
  --slider-thumb-border-color: var(--color-background);
}
```

## UX and accessibility

- Every slider needs an accessible name. `SliderLabel` is the recommended default visible label.
- Each `SliderThumb` should still have a thumb-specific accessible name when there is more than one
  thumb. For example: `"Minimum price"` and `"Maximum price"`.
- `SliderThumb` renders a nested `<input type="range">`; use `inputRef` if you need direct access to
  that control.
- Keyboard interaction, pointer dragging, focus management, range semantics, and hidden input/form
  behavior stay owned by Base UI and should not be reimplemented in the wrapper.
- `largeStep` matters for keyboard usability on large ranges. Prefer setting it intentionally when
  `step` is small but the domain is broad.
- Use `getAriaValueText` on `SliderThumb` when the numeric value needs more descriptive spoken output
  than the formatted text alone provides.

## Limitations and recommendations

- `Slider` only auto-detects direct `SliderThumb` children, including thumbs nested in React
  fragments. If a thumb is wrapped in another custom component, it will not be moved into the default
  track. In that case, use explicit `SliderRoot` composition instead.
- Do not add a default thumb to `Slider`. Each thumb needs an explicit accessible naming decision, so
  requiring the consumer to render thumbs is intentional.
- For range sliders, keep `index` aligned with the value array order. This avoids SSR mismatches and
  keeps thumb identity stable when values cross or collide.
- Use `thumbAlignment="edge"` when thumb overflow at the control boundaries is undesirable in tight
  layouts.
- Use `SliderRoot` instead of `Slider` when the track placement, thumb wrappers, or DOM structure need
  to differ from the default wrapper.

## Intentional differences from Base UI

- moduix exports flat parts (`Slider`, `SliderRoot`, `SliderThumb`, and so on) instead of the
  upstream namespaced `Slider.Root` API.
- `Slider` is a high-level convenience wrapper that auto-renders `SliderControl`, `SliderTrack`, and
  `SliderIndicator`; Base UI exposes only the primitive parts.
- moduix styles are part of the public contract through CSS Modules, `data-slot`, and `--slider-*`
  variables.
- The local docs describe the shipped moduix wrapper contract, not the full upstream API reference.

## Agent notes

- Preserve the current sugar boundary: `Slider` may auto-render the control/track/indicator, but
  thumbs stay explicit.
- Keep the direct-child thumb collection behavior documented. If it ever changes, update stories,
  docs, and this file in the same task.
- Keep the `Slider` and `Progress` root-part ref behavior aligned.
- If `--slider-*` variables or public `data-slot` names change, update `theme.css`, docs examples,
  Storybook usage, and this file in the same task.

## Local changelog

- Revalidated the documented `--slider-*` variable list against `packages/ui/src/styles/theme.css`
  and tightened the docs around form labeling, range-thumb naming, and the high-level default path.
- Rewrote the local documentation to describe the actual moduix `Slider` wrapper, composition model,
  styling hooks, accessibility guidance, and limitations instead of mirroring Base UI docs.
- Documented the default sugar boundary: `Slider` auto-renders control/track/indicator, but thumbs
  remain explicit and only direct `SliderThumb` children are auto-placed into the track.
- `Slider` and all exported parts now forward refs for API consistency with sibling range components
  and direct access to the underlying primitive elements.