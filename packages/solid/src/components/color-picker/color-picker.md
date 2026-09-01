# ColorPicker (Solid)

`ColorPicker` preserves the React wrapper's Ark anatomy, popup structure, automatic form input,
default visual children, color callbacks, and CSS-variable contract.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <section {...props()} />}`. Its factory does not forward `ref` through
`asChild`, so ordinary refs and custom-host composition are supported as separate native paths.
The Solid tests cover both paths independently.

`ColorPicker` and `RootProvider` accept `portalled`, `portalRef`, `lazyMount`, and
`unmountOnExit`. `parseColor`, `useColorPicker`, and `useColorPickerContext` are re-exported.