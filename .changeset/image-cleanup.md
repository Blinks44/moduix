---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Image: URLs without a supported CDN or `fallback` now go through Unpic's base transform. Unpic-only props such as `layout`, `priority`, `background`, and `aspectRatio` no longer reach the `<img>` as invalid attributes (React logged warnings for them), and the `layout` styles now apply to local images too, so `layout="fixed"` keeps its exact size and `constrained` caps the width. The loading, decoding, and fetch-priority defaults are unchanged and now come from Unpic instead of hand-written defaults in each adapter.
The Solid CSS Modules adapter renders native hosts with `@unpic/core` like the Solid Tailwind adapter and no longer depends on `@unpic/solid`; every package now depends on `unpic` for CDN detection. Vue `Image` and `ImageSource` no longer re-expose `$el`, which Vue already provides for the single root element. All adapters now export the `ImageRootProps` and `ImageSourceProps` types.