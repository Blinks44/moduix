# ImageCropper

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/image-cropper
- Chakra UI: no dedicated image cropper recipe; this wrapper follows the Ark UI primitive directly.

## Purpose

`ImageCropper` lets users crop, pan, zoom, rotate, and flip an image through Ark UI's composable image cropper parts.

## Upstream model to preserve

The wrapper preserves Ark UI's `@ark-ui/react/image-cropper` primitive. Keep the part tree explicit:
`Root` or `RootProvider`, `Viewport`, `Image`, `Selection`, `Grid`, and `Handle`. Do not add a local state layer or convert Ark callback details into positional arguments.

Ark owns pointer interactions, wheel and pinch zoom, keyboard nudging, transform state, generated IDs, ARIA labels, crop measurement, and output helpers such as `getCroppedImage()` and `getCropData()`.

## Current behavior contract

`ImageCropper` is the styled root component and is equivalent to `ImageCropper.Root`. The wrapper passes through Ark props including `initialCrop`, `aspectRatio`, `cropShape`, `fixedCropArea`, controlled `zoom`, `rotation`, `flip`, default transform props, size limits, nudge steps, zoom limits, `ids`, `translations`, and Ark callbacks.

The package exports `ImageCropper`, `useImageCropper`, `useImageCropperContext`, and the Ark image cropper detail/types with the `ImageCropper*` prefix. `ImageCropper.handles` exposes Ark's handle-position array for rendering all resize handles.

## Anatomy and exported parts

```tsx
<ImageCropper>
  <ImageCropper.Viewport>
    <ImageCropper.Image />
    <ImageCropper.Selection>
      <ImageCropper.Grid axis="horizontal" />
      <ImageCropper.Grid axis="vertical" />
      {ImageCropper.handles.map((position) => (
        <ImageCropper.Handle key={position} position={position} />
      ))}
    </ImageCropper.Selection>
  </ImageCropper.Viewport>
</ImageCropper>
```

- `ImageCropper` / `ImageCropper.Root`: `data-slot="image-cropper-root"`.
- `ImageCropper.RootProvider`: `data-slot="image-cropper-root-provider"` for an externally created `useImageCropper` instance.
- `ImageCropper.Viewport`: `data-slot="image-cropper-viewport"`; receives Ark panning handlers.
- `ImageCropper.Image`: `data-slot="image-cropper-image"`; renders the transformed image.
- `ImageCropper.Selection`: `data-slot="image-cropper-selection"`; focusable crop rectangle unless `fixedCropArea` disables resizing.
- `ImageCropper.Grid`: `data-slot="image-cropper-grid"`; requires `axis`.
- `ImageCropper.Handle`: `data-slot="image-cropper-handle"`; requires `position`.
- `ImageCropper.Context`: Ark render-prop context for inline controls.

## Composition

```tsx
import { ImageCropper } from '@moduix/react';

export function AvatarCropper() {
  return (
    <ImageCropper cropShape="circle" aspectRatio={1}>
      <ImageCropper.Viewport>
        <ImageCropper.Image src="/avatar-source.jpg" />
        <ImageCropper.Selection>
          <ImageCropper.Grid axis="horizontal" />
          <ImageCropper.Grid axis="vertical" />
          {ImageCropper.handles.map((position) => (
            <ImageCropper.Handle key={position} position={position} />
          ))}
        </ImageCropper.Selection>
      </ImageCropper.Viewport>
    </ImageCropper>
  );
}
```

Use `ImageCropper.Context` for nearby toolbar controls. Use `useImageCropper` with `ImageCropper.RootProvider` when toolbar state or crop output needs to live outside the rendered root. Do not render `Root` and `RootProvider` for the same `useImageCropper` instance.

## Upstream feature coverage

The wrapper exposes the Ark examples and guides for basic cropping, aspect-ratio locking, circle crops, `initialCrop`, controlled zoom, zoom limits, rotation, flip, min/max crop sizes, fixed crop areas, crop preview, reset, events, `Context`, and `RootProvider`.

Controlled state follows Ark exactly: pass `zoom`, `rotation`, or `flip` with `onZoomChange`, `onRotationChange`, or `onFlipChange`. Crop updates arrive through `onCropChange(details)` with `details.crop`.

## Accessibility and state

Ark applies `role="group"` to the root, `role="slider"` and keyboard interaction to the selection, localized labels through `translations`, and live crop descriptions while the image is ready. Arrow keys nudge the selection, `Shift` and `Ctrl`/`Cmd` use the Ark nudge step props, `Alt` plus arrow keys resizes, and `+`/`-` zoom.

The root exposes `data-scope="image-cropper"`, `data-part="root"`, `data-fixed`, `data-shape`, `data-pinch`, `data-dragging`, and `data-panning`. Other parts expose Ark `data-part` values for `viewport`, `image`, `selection`, `grid`, and `handle`; notable state attributes include `data-ready`, `data-flip-horizontal`, `data-flip-vertical`, `data-disabled`, `data-measured`, `data-axis`, and `data-position`.

Ark runtime CSS variables set on the root are `--crop-width`, `--crop-height`, `--crop-x`, `--crop-y`, `--image-zoom`, `--image-rotation`, `--image-offset-x`, and `--image-offset-y`. They are declared in `theme.css` because the primitive writes them at runtime.

## Defaults and styling

The wrapper uses CSS Modules and adds default cropper visuals: a stable `32rem` root width, `100%` max width, fixed `20rem` viewport height, bordered viewport, checkerboard background, dimmed outside area, crop grid, near-white resize handles with slim edge bars and 2px-rounded square corners, and focus ring. Consumers can pass `className` to each exported visual part.

Public override variables use the `--image-cropper-*` prefix and are documented in the docs site. CSS targets local classes and Ark state attributes; it does not add custom modifier classes.

## Intentional sugar and differences from upstream

The only sugar over Ark is styling, stable `data-slot` hooks, prefixed type exports, and `ImageCropper.handles` on the moduix namespace. No Ark parts are hidden, renamed, or bundled into convenience containers.

## Agent notes

- Keep `ImageCropper.handles` available; docs and stories use it as the canonical way to render handles.
- Preserve Ark callback detail objects and context methods.
- Keep `RootProvider` examples separate from `Root`; never nest both for the same cropper instance.
- If Ark adds new parts, hooks, or public types, mirror them through the wrapper and package barrel unless intentionally documented otherwise.

## Local changelog

- 2026-06-22: Added `ImageCropper` as a styled Ark UI image cropper wrapper with docs, stories, package exports, and registry metadata.
- 2026-06-22: Stabilized default sizing for Storybook/docs rendering, switched examples to a real Unsplash image with CORS, and changed cropper toolbar examples to icon-only controls.
- 2026-06-22: Refined handles, aligned cropper toolbar examples and Tabs default indicator with SegmentGroup styling, and switched docs/stories to a closer 640x400 Unsplash image.
- 2026-06-22: Changed resize handles to near-white slim edge bars with larger 2px-rounded square corner handles and switched the crop preview action to the default `Button`.