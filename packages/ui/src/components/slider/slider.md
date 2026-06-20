# Slider

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/slider
- Chakra UI: https://chakra-ui.com/docs/components/slider

## Purpose

`Slider` is a styled Ark UI slider for selecting one numeric value or a range of numeric values.

## Upstream model to preserve

- Preserve Ark parts: `Root`, `RootProvider`, `Context`, `Label`, `ValueText`, `Control`,
  `Track`, `Range`, `Thumb`, `HiddenInput`, `MarkerGroup`, `Marker`, and `DraggingIndicator`.
- Preserve Ark `number[]` value state, controlled/uncontrolled props, callback detail objects,
  keyboard behavior, pointer dragging, `HiddenInput`, IDs, refs, `asChild`, and orientation state.
- `RootProvider` owns an externally created `useSlider` instance and must not be nested with a
  `Root` for that same instance.

## Current behavior contract

- `Slider` is the styled root and is equivalent to `Slider.Root`.
- All DOM parts are thin wrappers over the corresponding Ark parts and forward refs.
- `Slider.Context`, `useSlider`, and `useSliderContext` expose the Ark state API without remapping.
- `value`, `defaultValue`, `min`, `max`, `step`, `origin`, `orientation`,
  `minStepsBetweenThumbs`, `thumbAlignment`, `thumbCollisionBehavior`, `disabled`, `invalid`,
  `readOnly`, `name`, `form`, `ids`, `onValueChange(details)`, `onValueChangeEnd(details)`, and
  `onFocusChange(details)` pass through unchanged.
- Values are arrays. Single-thumb sliders use `[value]`, not a bare number.

## Anatomy and exported parts

```text
Slider.Root
├─ Slider.Label
├─ Slider.ValueText
├─ Slider.Control
│  ├─ Slider.Track
│  │  └─ Slider.Range
│  └─ Slider.Thumb[index]
│     ├─ Slider.DraggingIndicator
│     └─ Slider.HiddenInput
└─ Slider.MarkerGroup
   └─ Slider.Marker[value]
```

Externally owned state replaces `Root` with `RootProvider`.

| Part                       | `data-slot`                 |
| -------------------------- | --------------------------- |
| `Slider.Root`              | `slider-root`               |
| `Slider.RootProvider`      | `slider-root-provider`      |
| `Slider.Label`             | `slider-label`              |
| `Slider.ValueText`         | `slider-value-text`         |
| `Slider.Control`           | `slider-control`            |
| `Slider.Track`             | `slider-track`              |
| `Slider.Range`             | `slider-range`              |
| `Slider.Thumb`             | `slider-thumb`              |
| `Slider.HiddenInput`       | `slider-hidden-input`       |
| `Slider.MarkerGroup`       | `slider-marker-group`       |
| `Slider.Marker`            | `slider-marker`             |
| `Slider.DraggingIndicator` | `slider-dragging-indicator` |

`Slider.Context` does not render a DOM element and therefore has no `data-slot`.

## Composition

```tsx
import { Slider } from 'moduix';

export function VolumeSlider() {
  return (
    <Slider defaultValue={[40]} name="volume">
      <Slider.Label>Volume</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} aria-label="Volume">
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
  );
}
```

## Upstream feature coverage

- Official examples covered in docs/stories: basic, range, min/max, step, change events, vertical,
  with marks, dragging indicator, context, root provider, center origin, thumb alignment, thumb
  collision, thumb overlap, disabled, and custom styling.
- `RootProvider` accepts the return value of `useSlider`.
- `Context` exposes Ark state such as `value`, `dragging`, and focus state.
- Marker state, dragging indicator state, orientation, invalid, disabled, read-only, and focus
  attributes pass through for styling.

## Accessibility and state

- Ark provides the WAI-ARIA slider pattern, keyboard navigation, pointer dragging, ARIA value
  attributes, and multi-thumb behavior.
- Every thumb needs an accessible name through `Slider.Label`, `aria-label`, or `aria-labelledby`.
- `HiddenInput` is required inside each thumb when native form submission and reset
  synchronization are needed.
- `Field.Root` / `Fieldset.Root` context can provide shared form state through Ark where
  supported by the primitive.
- `asChild` is available on Ark DOM parts and requires one semantic child that preserves the part's
  interaction contract.
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
- Public `--slider-*` variables are documented in the docs CSS properties table.
- Focus styling uses Ark thumb `:focus-visible`; marker styling uses Ark marker `data-state`.
- Do not position `Thumb` manually. Ark owns thumb transform and range measurement.

## Intentional sugar and differences from upstream

- Ark is headless; moduix provides default visuals and stable `data-slot` hooks.
- The public API is namespace-first: `Slider` with attached parts. Flat aliases such as
  `SliderRoot`, `SliderValue`, `SliderIndicator`, and `SliderThumb` are intentionally not exported.
- Base UI props were removed. Use `ValueText` instead of `Value`, `Range` instead of `Indicator`,
  `onValueChangeEnd(details)` instead of `onValueCommitted`, `minStepsBetweenThumbs` instead of
  `minStepsBetweenValues`, and Ark `number[]` values instead of `number`.
- No Base UI render prop, positional callback adapter, child-splitting wrapper, generated track, or
  generated range remains.

## Agent notes

- Keep `RootProvider` styled with the same root class as `Root`.
- Do not render both `Root` and `RootProvider` for one machine.
- Preserve Ark detail objects passed to callbacks.
- Keep `HiddenInput` explicit in examples and docs.
- Keep docs previews synchronized with `Code`, `CSS`, and `Data` tabs.

## Local changelog

- 2026-06-20: Migrated from Base UI to Ark UI React; replaced the flat Base UI-compatible API with
  namespace-first Ark parts, exposed `RootProvider`, `Context`, hooks, and Ark types; updated
  styles, stories, docs, and registry dependencies for the Ark contract.