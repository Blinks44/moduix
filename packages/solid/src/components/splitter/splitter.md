# Splitter (Solid)

Same contract as the React `splitter.md`.

- `useSplitter()` and `useSplitterContext()` return accessors: pass the accessor to
  `SplitterRootProvider value` and call methods as `splitter().resizePanel('a', 25)`.
- A string `style` on the root is prefixed with empty `width` and `height` declarations, which clears
  Ark's inline sizes the same way as an object style.
- Ark Solid's render-function `asChild` does not forward the wrapper `ref` to the composed host; refs
  work on the ordinary part paths.