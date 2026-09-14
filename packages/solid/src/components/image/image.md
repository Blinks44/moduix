# Image (Solid)

`Image` is a native Solid wrapper around `@unpic/core`. It preserves the React component's
responsive `srcset` and `sizes` generation, CDN detection, layout modes, priority, background,
native image attributes, and `Image.Source` picture composition without a React runtime.

## Composition

```tsx
import { Image } from '@moduix/solid/image';

export function HeroImage() {
  return (
    <Image
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
      alt="Mountain landscape"
      width={800}
      height={520}
      layout="constrained"
    />
  );
}
```

Use `Image.Source` inside a native `<picture>` and place `Image` last as the fallback image.
`Image` and `Image.Root` are the same component. The Solid API uses native `class` and
`fetchpriority` attribute names.

The wrapper adds `data-slot="image-root"` and
`border-radius: var(--moduix-image-radius, var(--moduix-radius-md))`; `Image.Source` adds
`data-slot="image-source"`. Solid uses `@unpic/core` directly because Unpic does not publish a
Solid adapter.