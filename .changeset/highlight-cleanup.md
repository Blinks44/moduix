---
'@moduix/react': minor
'@moduix/react-tailwind': patch
'@moduix/solid': minor
'@moduix/solid-tailwind': patch
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Highlight: Remove the `--moduix-highlight-shadow` variable and the no-op `box-shadow: none` and `text-decoration: none` styles (`shadow-none` and `no-underline` in Tailwind); a native `<mark>` has neither, and `text-decoration: none` cannot cancel an underline inherited from a link. Set `box-shadow` in your own class if you need one.
Vue packages export the moduix `HighlightRootProps` type instead of re-exporting Ark's `HighlightProps`, `HighlightChunk`, and `UseHighlightProps`; the last two only describe Ark's `useHighlight`, which moduix does not export. Import them from `@ark-ui/vue/highlight` when needed.