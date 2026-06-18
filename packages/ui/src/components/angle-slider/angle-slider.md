# AngleSlider

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/angle-slider

## Purpose

`AngleSlider` is the moduix wrapper around Ark UI Angle Slider for selecting a single value on a
circular 0-360 degree range.

The wrapper keeps Ark keyboard, drag, and form behavior intact while adding moduix default styles,
CSS variables, and stable `data-slot` hooks.

## Upstream model to preserve

- Uses the Ark UI angle slider primitive directly.
- Keeps Ark anatomy centered on `Root`, `Label`, `Control`, `Thumb`, `MarkerGroup`, `Marker`,
  `ValueText`, and `HiddenInput`.
- Keeps Ark single-value state, callback shapes, marker state, and form-submission model intact.

## Current behavior contract

- Uses Ark composition: `AngleSlider.Root`, `AngleSlider.Label`, `AngleSlider.Control`,
  `AngleSlider.Thumb`, `AngleSlider.MarkerGroup`, `AngleSlider.Marker`,
  `AngleSlider.ValueText`, and `AngleSlider.HiddenInput`.
- Supports Ark controlled and uncontrolled value with `value`, `defaultValue`,
  `onValueChange(details)`, and `onValueChangeEnd(details)`.
- Preserves Ark `details.value` and `details.valueAsDegree` callback shape.
- Does not auto-render markers, thumb, or hidden input. Consumers compose the visible dial
  explicitly.
- Marker ticks are optional. The default moduix recommendation is a clean dial with only the thumb
  and value text.
- Does not export Ark `RootProvider` or context helpers. The public wrapper stays focused on the
  structural parts used in normal app composition.

## Anatomy and exported parts

```text
AngleSlider.Root
├─ AngleSlider.Label
├─ AngleSlider.Control
│  └─ AngleSlider.Thumb
├─ AngleSlider.ValueText
└─ AngleSlider.HiddenInput
```

Optional marker ring:

```text
AngleSlider.Control
├─ AngleSlider.MarkerGroup
│  └─ AngleSlider.Marker[value]
└─ AngleSlider.Thumb
```

Every exported part accepts `className` and receives a stable `data-slot`:

| Part                      | `data-slot`                 | Notes                                      |
| ------------------------- | --------------------------- | ------------------------------------------ |
| `AngleSlider.Root`        | `angle-slider-root`         | Styled Ark root.                           |
| `AngleSlider.Label`       | `angle-slider-label`        | Styled Ark label.                          |
| `AngleSlider.Control`     | `angle-slider-control`      | Styled dial surface.                       |
| `AngleSlider.Thumb`       | `angle-slider-thumb`        | Styled active thumb and angle line.        |
| `AngleSlider.MarkerGroup` | `angle-slider-marker-group` | Optional marker container.                 |
| `AngleSlider.Marker`      | `angle-slider-marker`       | Optional marker positioned by `value`.     |
| `AngleSlider.ValueText`   | `angle-slider-value-text`   | Styled value output.                       |
| `AngleSlider.HiddenInput` | `angle-slider-hidden-input` | Hidden input for explicit form submission. |

## Composition

```tsx
import { AngleSlider } from 'moduix';

export function RotationAngleSlider() {
  return (
    <AngleSlider.Root defaultValue={135} aria-label="Rotation">
      <AngleSlider.Label>Rotation</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Thumb />
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  );
}
```

Optional marker ring:

```tsx
const markerValues = Array.from({ length: 8 }, (_, index) => index * 45);

<AngleSlider.Control>
  <AngleSlider.MarkerGroup>
    {markerValues.map((value) => (
      <AngleSlider.Marker key={value} value={value} />
    ))}
  </AngleSlider.MarkerGroup>
  <AngleSlider.Thumb />
</AngleSlider.Control>;
```

## Upstream feature coverage

- `Anatomy`: preserved directly through the exported Ark-shaped parts.
- `Basic`: preserved through the standard root/label/control/thumb/value-text/hidden-input path.
- `Controlled`: preserved through `value`, `defaultValue`, and `onValueChange(details)`.
- `Steps`: preserved through `step`.
- `Markers`: preserved through `AngleSlider.MarkerGroup` and `AngleSlider.Marker`.
- `Root Provider` and `Context`: intentionally not exported by the current wrapper surface.
- `API parts`: preserved for the exported visible parts listed above.

## Accessibility and state

- Ark state and data attributes remain available to consumers:
  - `data-disabled`, `data-invalid`, and `data-readonly` on root, label, control, and thumb
  - `data-state="under-value" | "at-value" | "over-value"` on markers
  - `data-value` on markers
- Ark CSS variables remain available:
  - root `--value` and `--angle`
  - marker `--marker-value` and `--marker-display-value`
- Ark callback shapes remain unchanged:
  - `onValueChange(details)`
  - `onValueChangeEnd(details)`
- `AngleSlider.HiddenInput` keeps Ark form participation explicit instead of automatic.

## Defaults and styling

Primary CSS variables:

| Variable                              | Default                            |
| ------------------------------------- | ---------------------------------- |
| `--angle-slider-size`                 | `8rem`                             |
| `--angle-slider-gap`                  | `0.75rem`                          |
| `--angle-slider-indicator-bg`         | `var(--color-primary)`             |
| `--angle-slider-track-bg`             | `var(--color-muted)`               |
| `--angle-slider-ring-thickness`       | `0.875rem`                         |
| `--angle-slider-thumb-line-width`     | `0.1875rem`                        |
| `--angle-slider-thumb-size`           | `1rem`                             |
| `--angle-slider-thumb-bg`             | `var(--angle-slider-indicator-bg)` |
| `--angle-slider-marker-color`         | `var(--color-muted-foreground)`    |
| `--angle-slider-marker-active-color`  | `var(--color-primary)`             |
| `--angle-slider-marker-current-color` | `var(--color-foreground)`          |
| `--angle-slider-control-bg`           | `var(--color-background)`          |
| `--angle-slider-center-dot-color`     | `var(--angle-slider-color)`        |
| `--angle-slider-invalid-color`        | `var(--color-destructive)`         |

## Intentional sugar and differences from upstream

- moduix ships a visible circular ring, thumb, and value presentation by default; Ark is headless.
- moduix keeps the Ark-shaped namespace API and does not add extra convenience props for generated
  markers, presets, or labels.
- moduix styles the active angle as part of the thumb, following the Ark examples, instead of
  treating the whole ring as a progress track.
- moduix does not export Ark `RootProvider` or `Context`; use the visible structural parts instead.

## Agent notes

- Preserve Ark callback shape with `details.value` and `details.valueAsDegree`.
- Keep marker styling tied to Ark marker `data-state` and root `--angle` instead of adding wrapper
  state.
- `AngleSlider.HiddenInput` stays opt-in so form participation remains explicit in composition.
- Keep marker ticks opt-in in docs and examples unless the task explicitly asks for a dial scale.

## Local changelog

- 2026-06-17: Added the initial Ark UI-based `AngleSlider` wrapper with namespace parts, circular
  default styles, theme tokens, Storybook examples, and registry export.
- 2026-06-17: Corrected the dial geometry to match Ark UI examples: the active line now belongs to
  the thumb, the thumb marker stays on the rim, and marker ticks are no longer the default
  recommended composition.