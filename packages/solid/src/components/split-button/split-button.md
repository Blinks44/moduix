# SplitButton (Solid)

Same contract as the React `split-button.md`.

Ark Solid's render-function `asChild` drops refs from the props it passes to the composed child, so
`SplitButtonTrigger` applies its `ref` to the `Button` inside the render function. A trigger ref
points at the rendered button, as in React; the Solid tests cover it.