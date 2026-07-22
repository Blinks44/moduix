# Image

Upstream docs:

- Ark UI: [Ark UI has no dedicated image primitive](https://ark-ui.com/docs/guides/composition);
  this component does not use an Ark primitive.
- Unpic React: https://unpic.pics/img/react/

## Purpose

`Image` renders responsive, CDN-aware images with Unpic while retaining a small moduix styling
contract.

## Upstream model to preserve

Unpic owns responsive `srcset` and `sizes` generation, supported CDN detection, layout modes,
loading priority, and native `<img>` attributes. `Image.Source` preserves Unpic's `<picture>`
composition for art direction and format sources.

## Current behavior contract

- `Image` and `Image.Root` are the same ref-forwarding `<img>` component.
- `Image.Source` is a ref-forwarding `<source>` component that must be a child of a native
  `<picture>`; put `Image` last in that picture as the fallback image.
- The component passes through Unpic React props: `layout`, `priority`, `background`,
  `aspectRatio`, `fallback`, `operations`, `options`, and `breakpoints`, alongside native image
  attributes. Unpic generates `srcset`.
- Supported image CDN URLs are transformed automatically. URLs from other sources remain regular
  images unless a Unpic `fallback` provider is supplied.
- moduix adds a display block, a rounded default, and stable `data-slot` hooks. Unpic owns the
  layout-mode width constraints.

## Anatomy and exported parts

```text
Image / Image.Root
└─ img

picture (native)
├─ Image.Source
└─ Image / Image.Root
```

| Part                   | Hook                       | Notes                                      |
| ---------------------- | -------------------------- | ------------------------------------------ |
| `Image` / `Image.Root` | `data-slot="image-root"`   | Responsive native `<img>` element.         |
| `Image.Source`         | `data-slot="image-source"` | Responsive `<source>` for native pictures. |

## Composition

```tsx
import { Image } from '@moduix/react';

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

Pass `width` and `height` for `constrained` or `fixed` layouts so the browser can reserve the
correct space before the image loads. Use `layout="fullWidth"` when the image should fill its
container width.

## Upstream feature coverage

- `layout="constrained" | "fixed" | "fullWidth"`: preserved from Unpic. `fixed` keeps its exact
  pixel dimensions and can overflow a narrower parent.
- `priority`: preserved; it sets eager loading and high fetch priority unless those native props
  are set explicitly.
- `background="auto"`: preserved; Unpic generates a low-resolution background from supported
  image providers. The background remains after loading, so use it only for opaque images.
- `fallback`, `operations`, `options`, and `breakpoints`: preserved for CDN-specific control.
- `Image.Source`: preserved for native `<picture>` media and type selection.

## Accessibility and state

- `Image` is a native image element; provide meaningful `alt` text when it conveys information.
  Use `alt=""` for decorative media.
- Unpic gives decorative images `role="presentation"` when `alt=""` unless a role is supplied.
- The forwarded `Image` ref targets the underlying `<img>` and `Image.Source` targets `<source>`.
- The component has no managed state, callbacks, form integration, or Ark context.

## Defaults and styling

| Variable                | Default                   | Effect                       |
| ----------------------- | ------------------------- | ---------------------------- |
| `--moduix-image-radius` | `var(--moduix-radius-md)` | Controls image border radius |

`Image` has `display: block`. Unpic supplies inline layout styles, including width constraints for
responsive layouts, unless `unstyled` is set. Pass `className` to `Image` for visual
customization; use the `data-slot` hooks for global selectors.

## Intentional sugar and differences from upstream

- moduix adds `Image.Root` as a namespace alias and exposes Unpic's source component as
  `Image.Source` instead of a separate top-level export.
- moduix does not expose Unpic's Next.js entry point. The shipped component uses Unpic's standard
  React entry point and relies on supported image providers or the consumer's `fallback`
  configuration.
- moduix adds only the rounded visual baseline; it does not configure a CDN or replace Unpic's URL
  transformation behavior.

## Agent notes

- Keep this wrapper thin and preserve Unpic prop names and generated responsive attributes.
- Keep `Image.Source` attached to `Image` and document native `<picture>` composition whenever it
  changes.
- Do not add Next.js-specific behavior to this entry point.

## Local changelog

- 2026-07-14: Added the Unpic-backed responsive `Image` component, `Image.Source`, styles,
  stories, docs, package exports, and registry metadata. Fixed layout now preserves Unpic's exact
  dimensions and has dedicated Storybook and documentation examples.