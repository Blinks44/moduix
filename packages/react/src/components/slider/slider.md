# Slider

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/slider
- Chakra UI: https://chakra-ui.com/docs/components/slider

## Purpose

`Slider` is a styled Ark UI slider for selecting one numeric value or a range of numeric values.

## Upstream model to preserve

- Preserve Ark parts: `Root`, `RootProvider`, `Label`, `ValueText`, `Control`, `Track`, `Range`,
  `Thumb`, `MarkerGroup`, `Marker`, `DraggingIndicator`, and the explicit `HiddenInput`.
- Preserve Ark `number[]` value state, controlled/uncontrolled props, callback detail objects,
  keyboard behavior, pointer dragging, the native form input, IDs, refs, `asChild`, and orientation state.
- `RootProvider` owns an externally created `useSlider` instance and must not be nested with a
  `Root` for that same instance.

## Current behavior contract

- `Slider` is the styled root.
- All DOM parts are thin wrappers over the corresponding Ark parts and forward refs.
- `value`, `defaultValue`, `min`, `max`, `step`, `origin`, `orientation`,
  `minStepsBetweenThumbs`, `thumbAlignment`, `thumbCollisionBehavior`, `disabled`, `invalid`,
  `readOnly`, `name`, `form`, `ids`, `thumbSize`, `onValueChange(details)`,
  `onValueChangeEnd(details)`, and `onFocusChange(details)` pass through unchanged.
- Values are arrays. Single-thumb sliders use `[value]`, not a bare number.
- When `defaultValue` is omitted, Ark initializes the value to `[min]` (`[0]` by default).
- `SliderThumbs` renders one styled `SliderThumb` with an Ark `HiddenInput` per value from slider
  context. With explicit `SliderThumb` parts, nest `SliderHiddenInput` inside each thumb yourself.
- `SliderContext`, `useSlider`, and `useSliderContext` are moduix-owned advanced state paths for
  `SliderRootProvider` and inline state reads.

## Anatomy and exported parts

```text
Slider
├─ SliderLabel
├─ SliderValueText
├─ SliderControl
│  ├─ SliderTrack
│  │  └─ SliderRange
│  └─ SliderThumb[index]
│     ├─ SliderDraggingIndicator
│     └─ SliderHiddenInput
└─ SliderMarkerGroup
   └─ SliderMarker[value]
```

Externally owned state replaces `Root` with `RootProvider`.

| Part                      | `data-slot`                  |
| ------------------------- | ---------------------------- |
| `Slider`                  | `slider-root`                |
| `SliderRootProvider`      | `slider-root-provider`       |
| `SliderLabel`             | `slider-label`               |
| `SliderValueText`         | `slider-value-text`          |
| `SliderControl`           | `slider-control`             |
| `SliderTrack`             | `slider-track`               |
| `SliderRange`             | `slider-range`               |
| `SliderThumb`             | `slider-thumb`               |
| `SliderThumbs`            | Uses `slider-thumb` children |
| `SliderMarkerGroup`       | `slider-marker-group`        |
| `SliderMarker`            | `slider-marker`              |
| `SliderDraggingIndicator` | `slider-dragging-indicator`  |

## Composition

```tsx
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';

export function VolumeSlider() {
  return (
    <Slider defaultValue={[40]} name="volume">
      <SliderLabel>Volume</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
    </Slider>
  );
}
```

## Upstream feature coverage

- Official examples covered in docs/stories: basic, range, min/max, step, change events, vertical,
  vertical marks, dragging indicator, context, root provider, center origin, thumb alignment, thumb
  collision, thumb overlap, disabled, invalid, read-only, form submission, and custom styling.
- `RootProvider` accepts the return value of moduix `useSlider`.
- Inline state reads work through moduix `useSliderContext` inside slider children.
- Marker state, dragging indicator state, orientation, invalid, disabled, read-only, and focus
  attributes pass through for styling.

## Accessibility and state

- Ark provides the WAI-ARIA slider pattern, keyboard navigation, pointer dragging, ARIA value
  attributes, and multi-thumb behavior.
- Every thumb needs an accessible name through `SliderLabel`, `aria-label`, or `aria-labelledby`.
- `SliderHiddenInput` must be nested inside its matching `SliderThumb` for form submission and
  reset synchronization.
- `Field` / `Fieldset` context can provide shared form state through Ark where
  supported by the primitive.
- `asChild` is available on Ark DOM parts and requires one semantic child that preserves the part's
  interaction contract.
- `thumbSize` can override Ark's measured thumb dimensions when custom thumb rendering needs a
  known size.
- `ids` can stabilize root, thumb, hidden input, control, track, range, label, value text, and
  marker IDs.
- Ark state hooks include `data-orientation`, `data-disabled`, `data-invalid`, `data-focus`,
  `data-dragging`, marker `data-state="under-value | at-value | over-value"`, and dragging
  indicator `data-state="open | closed"`.
- Ark CSS variables include `--slider-thumb-width`, `--slider-thumb-height`,
  `--slider-thumb-transform`, `--slider-range-start`, `--slider-range-end`, `--translate-x`, and
  `--translate-y`.
- moduix adds `data-readonly` to `Root` so the default control can expose a non-interactive cursor.

## Defaults and styling

- moduix supplies the rail, filled range, thumb, markers, dragging indicator, focus, dragging,
  disabled, invalid, and read-only visuals.
- Every rendered wrapper accepts `className` and preserves Ark `data-scope` / `data-part`.
- Public `--moduix-slider-*` variables are documented in the docs CSS properties table.
- Invalid rail, range, thumb, focus ring, and active marker colors have independent public overrides:
  `--moduix-slider-track-border-color-invalid`, `--moduix-slider-range-bg-invalid`,
  `--moduix-slider-thumb-border-color-invalid`, `--moduix-slider-thumb-focus-ring-color-invalid`,
  and `--moduix-slider-marker-dot-bg-active-invalid`.
- Focus styling uses Ark thumb `:focus-visible` for keyboard navigation and `data-dragging` while
  the thumb is pressed; marker styling uses Ark marker `data-state`.
- Do not position `Thumb` manually. Ark owns thumb transform and range measurement.

## Intentional sugar and differences from upstream

- Ark is headless; moduix provides default visuals and stable `data-slot` hooks.
- `SliderThumbs` is narrow sugar for repeated `SliderThumb` parts. It accepts `className` for the
  generated thumbs; use explicit parts for per-thumb props or custom children.
- The public API is flat: `Slider` is the root and every other component value is prefixed with
  `Slider`. Hooks remain top-level exports.
- `SliderRootProvider`, `SliderContext`, `useSlider`, and `useSliderContext` stay on the moduix
  surface for normal advanced workflows. Direct Ark imports remain escape hatches for uncommon APIs
  and types.
- legacy props were removed. Use `ValueText` instead of `Value`, `Range` instead of `Indicator`,
  `onValueChangeEnd(details)` instead of `onValueCommitted`, `minStepsBetweenThumbs` instead of
  `minStepsBetweenValues`, and Ark `number[]` values instead of `number`.
- No legacy render prop, positional callback adapter, child-splitting wrapper, generated track, or
  generated range remains.

## Agent notes

- Keep `SliderRootProvider` styled with the same root class as `Slider`.
- Do not render both `Slider` and `SliderRootProvider` for one machine.
- Preserve Ark detail objects passed to callbacks.
- Keep `SliderThumbs` as the recommended path; it already nests `HiddenInput` in every generated
  thumb. Use explicit `SliderThumb` parts for per-thumb props, custom children, or custom ordering.
- Keep docs previews synchronized with `Code`, `CSS`, and `Data` tabs.

## Local changelog

- 2026-08-13: Added independent invalid-state CSS variables, including active markers, and covered
  form reset plus `asChild` ref composition.

- 2026-07-30: Added responsive vertical-marker layout, invalid and read-only default states, native
  form coverage, and centered self-contained docs previews.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-09-04: Exposed Ark `HiddenInput` explicitly and removed thumb child mutation.
- 2026-07-13: Native form controls were rendered automatically at this point in the wrapper history.

- 2026-07-11: Added `SliderThumbs` and restored moduix exports for `SliderContext`, `useSlider`,
  and `useSliderContext`; recommend the helper for standard thumb and form-input composition.
- 2026-07-11: Show the thumb focus ring during pointer dragging and keyboard focus.
- 2026-07-03: Removed `SliderContext`, `useSlider`, `useSliderContext`, and Ark type re-exports
  from the moduix public surface; keep `RootProvider` and use Ark imports directly for advanced
  state workflows.
- 2026-06-27: Finished Ark migration audit; added missing Ark part prop type exports, documented
  `thumbSize`, and simplified the controlled docs example.
- 2026-06-20: Migrated to Ark UI React; replaced the flat legacy-compatible API with Ark parts,
  exposed `SliderRootProvider`, `SliderContext`, hooks, and Ark types; updated styles, stories,
  docs, and registry dependencies for the Ark contract.