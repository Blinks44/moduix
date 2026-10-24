# Slider

Upstream (accessed 2026-10-22):

- Ark UI: https://ark-ui.com/docs/components/slider
- Chakra UI: https://chakra-ui.com/docs/components/slider
- shadcn/ui: https://ui.shadcn.com/docs/components/slider

| Source    | Useful difference                                                              | moduix decision                                                                                               |
| --------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Ark UI    | Root, Label, ValueText, Control, Track, Range, Thumb, HiddenInput, markers     | **Required correctness:** keep every part, `number[]` values, callback details, and Ark-owned positioning.    |
| Chakra UI | `Slider.Thumbs` sugar, `size`, `variant`, `colorPalette`, label/value header   | **Adopted:** `SliderThumbs`, label and value text on one row. **Rejected for now:** visual props.             |
| shadcn/ui | One closed `Slider` with generated track, range, and thumbs; no label or marks | **Rejected:** keep explicit composition so label, value text, markers, and dragging indicator stay available. |

## Current behavior contract

- Ark owns value state (`value`, `defaultValue`, `onValueChange(details)`,
  `onValueChangeEnd(details)`, `onFocusChange(details)`), `min`, `max`, `step`, `origin`,
  `orientation`, `minStepsBetweenThumbs`, `thumbAlignment`, `thumbCollisionBehavior`, `thumbSize`,
  `disabled`, `invalid`, `readOnly`, `name`, `form`, and `ids`. Values are arrays: a single thumb uses
  `[value]`; without `defaultValue` Ark starts at `[min]`.
- Ark provides the WAI-ARIA slider pattern, keyboard, pointer dragging, and `dir` from
  `LocaleProvider` on every part. Every thumb needs a name through `SliderLabel`, `aria-label`, or
  `aria-labelledby`.
- `SliderThumbs` renders one styled `SliderThumb` with an Ark `HiddenInput` per value and accepts
  `className` for those thumbs. Use explicit `SliderThumb` parts for per-thumb props or custom
  children, and nest `SliderHiddenInput` inside each one for form submission.
- `Slider` adds `data-readonly` when `readOnly` is set, so the control shows a default cursor.
  `SliderRootProvider` cannot read `readOnly` from `useSlider()` and does not add it.
- `SliderRootProvider` connects the parts to `useSlider()` state; `SliderContext` and
  `useSliderContext()` read state below a root or provider. Do not render both for one machine.
- Exports the Ark part, details, and hook types.

## Anatomy

```text
Slider / SliderRootProvider       data-slot="slider-root[-provider]"
├─ SliderLabel                    data-slot="slider-label"
├─ SliderValueText                data-slot="slider-value-text"
├─ SliderControl                  data-slot="slider-control"
│  ├─ SliderTrack                 data-slot="slider-track"
│  │  └─ SliderRange              data-slot="slider-range"
│  └─ SliderThumb[index]          data-slot="slider-thumb"   (or SliderThumbs)
│     ├─ SliderDraggingIndicator  data-slot="slider-dragging-indicator"
│     └─ SliderHiddenInput
└─ SliderMarkerGroup              data-slot="slider-marker-group"
   └─ SliderMarker[value]         data-slot="slider-marker"
```

## Defaults and styling

- The horizontal root is a full-width grid: label and value text share the first row, the control
  and marker group span the full width below. The vertical root is `max-content` wide and `12rem`
  tall, with label and value text above the control and markers to its side. Set `width` or
  `height` on the root to change them.
- Ark positions thumbs, range, markers, and the dragging indicator with inline styles and runtime
  variables. Do not position them manually. Ark also sets `position`, `touch-action`, and
  `user-select` on the control, label, track, and marker group, so the CSS does not repeat them.
- The marker group reserves one line for marker labels; marker dots are centered with logical
  margins so they stay centered in RTL. Vertical marker labels are not measured: the marker column
  is 0px wide, so leave room for the labels next to a vertical slider. The dragging indicator sits
  above a horizontal thumb and beside a vertical one.
- CSS Modules expose `--moduix-slider-track-size` (height when horizontal, width when vertical),
  `--moduix-slider-track-bg`, `--moduix-slider-range-bg` (also active marker dots), and
  `--moduix-slider-thumb-size`. Everything else comes from foundation tokens; override it with a
  class on the part.
- Focus uses thumb `:focus-visible` for keyboard and Ark `data-dragging` while pressed. Invalid
  sliders use the destructive color for track, range, thumb, and active markers.

## Composition

```tsx
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
```

## Agent notes

- Keep `SliderRootProvider` styled with the same root class as `Slider`.
- Keep `SliderThumbs` narrow: it only repeats `SliderThumb` with a hidden input.
- The "Advanced customization" docs example builds thumbs explicitly without `SliderThumbs`.