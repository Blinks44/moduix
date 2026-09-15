# AngleSlider (Solid)

`AngleSlider` preserves the React wrapper's Ark parts, circular styling hooks, value callbacks,
keyboard behavior, native form participation, and explicit `HiddenInput` composition.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <section {...props()} />}`. Its factory does not forward `ref` through
`asChild`, so custom-host composition and ordinary refs are supported as separate native paths.
The Solid tests cover both paths independently.

`useAngleSlider()` and `useAngleSliderContext()` keep their Solid accessor-based APIs. `RootProvider`
accepts the accessor returned by `useAngleSlider()`, while controlled state remains owned by the
external machine owner.