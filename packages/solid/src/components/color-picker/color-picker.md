# ColorPicker (Solid)

`ColorPicker` preserves the React wrapper's Ark anatomy, popup structure, explicit form input,
default visual children, color callbacks, and CSS-variable contract.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <section {...props()} />}`. Its factory does not forward `ref` through
`asChild`, so ordinary refs and custom-host composition are supported as separate native paths.
The Solid tests cover both paths independently.

`ColorPicker` and `ColorPickerRootProvider` accept `portalled`, `portalRef`, `lazyMount`, and
`unmountOnExit`. `parseColor`, `useColorPicker`, and `useColorPickerContext` are re-exported.

## Style contract

The root owns disabled opacity. Swatch triggers dim on their own when disabled and reset inside a
disabled root; a disabled Field or Fieldset owns the outer opacity instead. Default children are the
exported moduix parts, and Ark types are re-exported as in React and Vue.