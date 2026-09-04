# Slider (Solid)

`Slider` is the styled Solid wrapper around Ark UI Solid Slider for selecting one numeric value
or a range of values.

## Public contract

`Slider` is the styled root and is equivalent to `Slider.Root`. Compose the Ark parts explicitly:

```tsx
import { Slider } from '@moduix/solid/slider';

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

The namespace exposes `Root`, `RootProvider`, `Context`, `Label`, `ValueText`, `Control`, `Track`,
`Range`, `Thumb`, `Thumbs`, `MarkerGroup`, `Marker`, and `DraggingIndicator`, together with
`useSlider` and `useSliderContext`.

Values are `number[]`; controlled and uncontrolled props, Ark callback detail objects, keyboard
behavior, pointer dragging, orientation, IDs, and accessibility attributes pass through unchanged.
`Slider.Thumbs` renders one styled thumb per value. For form participation, compose explicit
`Slider.Thumb` parts and nest `Slider.HiddenInput` inside each thumb.

## Solid composition

Ark Solid uses a render-function `asChild` prop:

```tsx
<Slider asChild={(props) => <section {...props()} />} defaultValue={[40]} aria-label={['Volume']}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumbs />
  </Slider.Control>
</Slider>
```

Ordinary Solid refs are forwarded through Ark parts. Ark Solid does not forward refs through an
`asChild` render function, so custom-host composition and ordinary refs are supported as separate
native paths.

`RootProvider` accepts the accessor returned by `useSlider()`. `useSliderContext()` exposes
accessor-based state, so read values as `slider().value` and `slider().dragging`.

## Styling

The wrapper uses the same CSS Module and `data-slot` hooks as the React component:
`slider-root`, `slider-root-provider`, `slider-label`, `slider-value-text`, `slider-control`,
`slider-track`, `slider-range`, `slider-thumb`, `slider-marker-group`, `slider-marker`, and
`slider-dragging-indicator`.