# Slider

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/slider
- Chakra UI: https://chakra-ui.com/docs/components/slider

## Purpose

`Slider` is a styled Ark UI slider for selecting one numeric value or a range of numeric values.

## Upstream model to preserve

- Preserve Ark parts: `Root`, `RootProvider`, `Label`, `ValueText`, `Control`, `Track`, `Range`,
  `Thumb`, `MarkerGroup`, `Marker`, and `DraggingIndicator`. Each `Thumb` owns its internal native
  form input.
- Preserve Ark `number[]` value state, controlled/uncontrolled props, callback detail objects,
  keyboard behavior, pointer dragging, the native form input, IDs, refs, `asChild`, and orientation state.
- `RootProvider` owns an externally created `useSlider` instance and must not be nested with a
  `Root` for that same instance.

## Current behavior contract

- `Slider` is the styled root and is equivalent to `Slider.Root`.
- All DOM parts are thin wrappers over the corresponding Ark parts and forward refs.
- `value`, `defaultValue`, `min`, `max`, `step`, `origin`, `orientation`,
  `minStepsBetweenThumbs`, `thumbAlignment`, `thumbCollisionBehavior`, `disabled`, `invalid`,
  `readOnly`, `name`, `form`, `ids`, `thumbSize`, `onValueChange(details)`,
  `onValueChangeEnd(details)`, and `onFocusChange(details)` pass through unchanged.
- Values are arrays. Single-thumb sliders use `[value]`, not a bare number.
- `Slider.Thumbs` renders one styled `Thumb` per value from slider context. Each `Thumb` appends
  its native form input automatically.
- `Slider.Context`, `Slider.useSlider`, `Slider.useSliderContext`, `useSlider`, and
  `useSliderContext` are moduix-owned advanced state paths for `RootProvider` and inline state
  reads.

## Anatomy and exported parts

```text
Slider.Root
├─ Slider.Label
├─ Slider.ValueText
├─ Slider.Control
│  ├─ Slider.Track
│  │  └─ Slider.Range
│  └─ Slider.Thumbs
│     └─ Slider.Thumb[index]
│        ├─ Slider.DraggingIndicator
│        └─ native input (automatic)
└─ Slider.MarkerGroup
   └─ Slider.Marker[value]
```

Externally owned state replaces `Root` with `RootProvider`.

| Part                       | `data-slot`                  |
| -------------------------- | ---------------------------- |
| `Slider.Root`              | `slider-root`                |
| `Slider.RootProvider`      | `slider-root-provider`       |
| `Slider.Label`             | `slider-label`               |
| `Slider.ValueText`         | `slider-value-text`          |
| `Slider.Control`           | `slider-control`             |
| `Slider.Track`             | `slider-track`               |
| `Slider.Range`             | `slider-range`               |
| `Slider.Thumb`             | `slider-thumb`               |
| `Slider.Thumbs`            | Uses `slider-thumb` children |
| `Slider.MarkerGroup`       | `slider-marker-group`        |
| `Slider.Marker`            | `slider-marker`              |
| `Slider.DraggingIndicator` | `slider-dragging-indicator`  |

## Composition

```tsx
import { Slider } from '@moduix/react';

export function VolumeSlider() {
  return (
    <Slider defaultValue={[40]} name="volume">
      <Slider.Label>Volume</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider>
  );
}
```

## Upstream feature coverage

- Official examples covered in docs/stories: basic, range, min/max, step, change events, vertical,
  with marks, dragging indicator, context, root provider, center origin, thumb alignment, thumb
  collision, thumb overlap, disabled, and custom styling.
- `RootProvider` accepts the return value of moduix `useSlider`.
- Inline state reads work through moduix `useSliderContext` inside slider children.
- Marker state, dragging indicator state, orientation, invalid, disabled, read-only, and focus
  attributes pass through for styling.

## Accessibility and state

- Ark provides the WAI-ARIA slider pattern, keyboard navigation, pointer dragging, ARIA value
  attributes, and multi-thumb behavior.
- Every thumb needs an accessible name through `Slider.Label`, `aria-label`, or `aria-labelledby`.
- Every `Slider.Thumb`, including explicit thumb composition, appends its native form input
  automatically for form submission and reset synchronization.
- `Field.Root` / `Fieldset.Root` context can provide shared form state through Ark where
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

## Defaults and styling

- moduix supplies the rail, filled range, thumb, markers, dragging indicator, focus, dragging, and
  disabled visuals.
- Every rendered wrapper accepts `className` and preserves Ark `data-scope` / `data-part`.
- Public `--moduix-slider-*` variables are documented in the docs CSS properties table.
- Focus styling uses Ark thumb `:focus-visible` for keyboard navigation and `data-dragging` while
  the thumb is pressed; marker styling uses Ark marker `data-state`.
- Do not position `Thumb` manually. Ark owns thumb transform and range measurement.

## Intentional sugar and differences from upstream

- Ark is headless; moduix provides default visuals and stable `data-slot` hooks.
- `Slider.Thumbs` is narrow sugar for repeated `Thumb` parts. It accepts `className` for the
  generated thumbs; use explicit parts for per-thumb props or custom children.
- The public API is namespace-first: `Slider` with attached parts. Flat aliases such as
  `SliderRoot`, `SliderValue`, `SliderIndicator`, and `SliderThumb` are intentionally not exported.
- `RootProvider`, `Context`, `useSlider`, and `useSliderContext` stay on the moduix surface for
  normal advanced workflows. Direct Ark imports remain escape hatches for uncommon APIs and types.
- legacy props were removed. Use `ValueText` instead of `Value`, `Range` instead of `Indicator`,
  `onValueChangeEnd(details)` instead of `onValueCommitted`, `minStepsBetweenThumbs` instead of
  `minStepsBetweenValues`, and Ark `number[]` values instead of `number`.
- No legacy render prop, positional callback adapter, child-splitting wrapper, generated track, or
  generated range remains.

## Agent notes

- Keep `RootProvider` styled with the same root class as `Root`.
- Do not render both `Root` and `RootProvider` for one machine.
- Preserve Ark detail objects passed to callbacks.
- Keep `Slider.Thumbs` as the recommended path and document that every `Slider.Thumb` renders it automatically.
- Keep docs previews synchronized with `Code`, `CSS`, and `Data` tabs.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-13: Native form controls are now rendered automatically; the former public form-control part was removed.

- 2026-07-11: Added `Slider.Thumbs` and restored moduix exports for `Context`, `useSlider`, and
  `useSliderContext`; recommend the helper for standard thumb and form-input composition.
- 2026-07-11: Show the thumb focus ring during pointer dragging and keyboard focus.
- 2026-07-03: Removed `Slider.Context`, `useSlider`, `useSliderContext`, and Ark type re-exports
  from the moduix public surface; keep `RootProvider` and use Ark imports directly for advanced
  state workflows.
- 2026-06-27: Finished Ark migration audit; added missing Ark part prop type exports, documented
  `thumbSize`, and simplified the controlled docs example.
- 2026-06-20: Migrated to Ark UI React; replaced the flat legacy-compatible API with
  namespace-first Ark parts, exposed `RootProvider`, `Context`, hooks, and Ark types; updated
  styles, stories, docs, and registry dependencies for the Ark contract.