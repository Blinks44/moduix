# Slider (Solid)

`Slider` is the styled Solid wrapper around Ark UI Solid Slider for selecting one numeric value
or a range of values.

## Public contract

`Slider` is the styled root. Compose the flat Ark wrappers explicitly:

```tsx
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/solid/slider';

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

The flat API exposes `SliderRootProvider`, `SliderContext`, `SliderLabel`, `SliderValueText`,
`SliderControl`, `SliderTrack`, `SliderRange`, `SliderThumb`, `SliderThumbs`, `SliderHiddenInput`,
`SliderMarkerGroup`, `SliderMarker`, and `SliderDraggingIndicator`, together with `useSlider` and
`useSliderContext`.

Values are `number[]`; controlled and uncontrolled props, Ark callback detail objects, keyboard
behavior, pointer dragging, orientation, IDs, and accessibility attributes pass through unchanged.
`SliderThumbs` renders one styled thumb with an Ark `HiddenInput` per value. With explicit
`SliderThumb` parts, nest `SliderHiddenInput` inside each thumb yourself.

## Solid composition

Ark Solid uses a render-function `asChild` prop:

```tsx
<Slider asChild={(props) => <section {...props()} />} defaultValue={[40]} aria-label={['Volume']}>
  <SliderControl>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumbs />
  </SliderControl>
</Slider>
```

Ordinary Solid refs are forwarded through Ark parts. Ark Solid does not forward refs through an
`asChild` render function, so custom-host composition and ordinary refs are supported as separate
native paths.

`SliderRootProvider` accepts the accessor returned by `useSlider()`. `useSliderContext()` exposes
accessor-based state, so read values as `slider().value` and `slider().dragging`.

## Styling

The wrapper uses the same CSS Module and `data-slot` hooks as the React component:
`slider-root`, `slider-root-provider`, `slider-label`, `slider-value-text`, `slider-control`,
`slider-track`, `slider-range`, `slider-thumb`, `slider-marker-group`, `slider-marker`, and
`slider-dragging-indicator`.
