# AngleSlider (Solid)

`AngleSlider` preserves the React wrapper's Ark parts, circular styling hooks, value callbacks,
keyboard behavior, native form participation, and explicit `HiddenInput` composition. The public
surface follows the shared flat API: `AngleSlider`, `AngleSliderLabel`, `AngleSliderControl`,
`AngleSliderDial`, `AngleSliderThumb`, `AngleSliderMarkerGroup`, `AngleSliderMarker`,
`AngleSliderMarks`, `AngleSliderValueText`, `AngleSliderRootProvider`, `AngleSliderContext`,
`AngleSliderHiddenInput`, `useAngleSlider()`, and `useAngleSliderContext()`.

## Design and pointer focus contract

- The dial is a circular track: a `conic-gradient` fill from the top masked to the ring band, a
  rounded start cap, a circle thumb riding the ring centerline, and the centered value text
  (`AngleSliderDial` renders `Control`, the centered `ValueText`, and `Thumb`).
- `AngleSliderControl` focuses the thumb synchronously on a left pointer down with
  `focus({ preventScroll: true, focusVisible: false })` after `event.preventDefault()`, so the
  pointer interaction and its release state stay free of the keyboard focus ring; the deferred Ark
  focus becomes redundant. The handler calls the consumer `onPointerDown` first and skips the focus
  when the event is prevented or the control is disabled or read-only.
- While the dial is pressed, the thumb shows the dragging ring through the native `:active` control
  state (Zag exposes no `data-dragging` attribute on the angle slider thumb).

## Design and pointer focus contract

- The dial is a circular track: a `conic-gradient` fill from the top masked to the ring band, a
  rounded start cap, a circle thumb riding the ring centerline, and the centered value text
  (`Dial` renders `Control`, the centered `ValueText`, and `Thumb`).
- `AngleSliderControl` focuses the thumb synchronously on a left pointer down with
  `focus({ preventScroll: true, focusVisible: false })` after `event.preventDefault()`, so the
  pointer interaction and its release state stay free of the keyboard focus ring; the deferred Ark
  focus becomes redundant. The handler calls the consumer `onPointerDown` first and skips the focus
  when the event is prevented or the control is disabled or read-only.
- While the dial is pressed, the thumb shows the dragging ring through the native `:active` control
  state (Zag exposes no `data-dragging` attribute on the angle slider thumb).

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <section {...props()} />}`. Its factory does not forward `ref` through
`asChild`, so custom-host composition and ordinary refs are supported as separate native paths.
The Solid tests cover both paths independently.

`useAngleSlider()` and `useAngleSliderContext()` keep their Solid accessor-based APIs.
`AngleSliderRootProvider` accepts the accessor returned by `useAngleSlider()`, while controlled
state remains owned by the external machine owner.