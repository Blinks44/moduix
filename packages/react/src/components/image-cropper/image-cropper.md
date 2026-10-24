# ImageCropper

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/image-cropper (reviewed 2026-08-11)
- Chakra UI: https://www.chakra-ui.com/docs/components/concepts/overview (reviewed 2026-08-11); no dedicated image cropper recipe.
- shadcn/ui: https://ui.shadcn.com/llms.txt (reviewed 2026-08-11); no dedicated image cropper component, so use its registry conventions without adding a compatibility API.

## Purpose

`ImageCropper` lets users crop, pan, zoom, rotate, and flip an image through Ark UI's composable image cropper parts.

## Upstream model to preserve

The wrapper preserves Ark UI's `@ark-ui/react/image-cropper` primitive. Keep the part tree explicit:
`ImageCropper` or `ImageCropperRootProvider`, `ImageCropperViewport`, `ImageCropperImage`,
`ImageCropperSelection`, `ImageCropperGrid`, and `ImageCropperHandle`. Do not add a local state
layer or convert Ark callback details into positional arguments.

Ark owns pointer interactions, wheel and pinch zoom, keyboard nudging, transform state, generated IDs, ARIA labels, crop measurement, and output helpers such as `getCroppedImage()` and `getCropData()`.

## Current behavior contract

`ImageCropper` is the styled root component. The wrapper passes through Ark props including
`initialCrop`, `aspectRatio`, `cropShape`, `fixedCropArea`, controlled `zoom`, `rotation`, `flip`,
default transform props, size limits, nudge steps, zoom limits, `ids`, `translations`, and Ark callbacks.

The package exports `ImageCropper`, `useImageCropper`, `ImageCropperContext`, and `ImageCropperHandles`. `ImageCropperCropArea` is the recommended selection: it renders the selection, both grids, and every resize handle. Pass `className`, `gridClassName`, or `handleClassName` to style those levels.

`ImageCropperCropArea` owns its complete child anatomy, so its type omits `children` and `asChild`;
the wrapper does not strip them at runtime. Use `ImageCropperSelection`, `ImageCropperGrid`, and
`ImageCropperHandle` directly when the selection structure needs to differ.

Types: `ImageCropperCropAreaProps` plus the Ark part prop, detail, and hook types
(`ImageCropperRootProps`, `ImageCropperCropChangeDetails`, `UseImageCropperReturn`, and so on).

## Anatomy and exported parts

```tsx
<ImageCropper>
  <ImageCropperViewport>
    <ImageCropperImage />
    <ImageCropperCropArea />
  </ImageCropperViewport>
</ImageCropper>
```

- `ImageCropper`: `data-slot="image-cropper-root"`.
- `ImageCropperRootProvider`: `data-slot="image-cropper-root-provider"` for an externally created Ark `useImageCropper` instance.
- `ImageCropperViewport`: `data-slot="image-cropper-viewport"`; receives Ark panning handlers.
- `ImageCropperImage`: `data-slot="image-cropper-image"`; renders the transformed image.
- `ImageCropperSelection`: `data-slot="image-cropper-selection"`; focusable crop rectangle; `fixedCropArea` disables moving and resizing it.
- `ImageCropperGrid`: `data-slot="image-cropper-grid"`; requires `axis`.
- `ImageCropperHandle`: `data-slot="image-cropper-handle"`; requires `position`.
- `ImageCropperCropArea`: recommended styled selection with both grids and all handles.

## Composition

```tsx
import {
  ImageCropper,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperViewport,
} from '@moduix/react/image-cropper';

export function AvatarCropper() {
  return (
    <ImageCropper cropShape="circle" aspectRatio={1}>
      <ImageCropperViewport>
        <ImageCropperImage src="/avatar-source.jpg" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
  );
}
```

Use `ImageCropperContext` for nearby toolbar controls. Use `useImageCropper` with
`ImageCropperRootProvider` when toolbar state or crop output needs to live outside the rendered root.
Do not render `ImageCropper` and `ImageCropperRootProvider` for the same `useImageCropper` instance.

## Upstream feature coverage

The wrapper exposes the Ark examples and guides for basic cropping, aspect-ratio locking, circle crops,
`initialCrop`, controlled zoom, zoom limits, rotation, flip, min/max crop sizes, fixed crop areas,
crop preview, reset, and `ImageCropperRootProvider`. `useImageCropper` and `ImageCropperContext`
retain their Ark behavior through moduix exports.

Controlled state follows Ark exactly: pass `zoom`, `rotation`, or `flip` with `onZoomChange`, `onRotationChange`, or `onFlipChange`. Crop updates arrive through `onCropChange(details)` with `details.crop`.

## Accessibility and state

Ark applies `role="group"` to the root, `role="slider"` and keyboard interaction to the selection, localized labels through `translations`, and live crop descriptions while the image is ready. Arrow keys nudge the selection, `Shift` and `Ctrl`/`Cmd` use the Ark nudge step props, `Alt` plus arrow keys resizes, and `+`/`-` zoom.

The root exposes `data-scope="image-cropper"`, `data-part="root"`, `data-fixed`, `data-shape`, `data-pinch`, `data-dragging`, and `data-panning`. Other parts expose Ark `data-part` values for `viewport`, `image`, `selection`, `grid`, and `handle`; notable state attributes include `data-ready`, `data-flip-horizontal`, `data-flip-vertical`, `data-disabled`, `data-measured`, `data-axis`, and `data-position`.

Ark writes the runtime CSS variables `--crop-width`, `--crop-height`, `--crop-x`, `--crop-y`, `--image-zoom`, `--image-rotation`, `--image-offset-x`, and `--image-offset-y` on the root. They are documented in `variables-ark.css` as read-only runtime values; do not override them.

## Defaults and styling

The root is `32rem` wide with a `100%` max width. The bordered viewport keeps an `8 / 5` aspect ratio
of its own width, so it follows the container instead of the window, and shows a checkerboard from
the `muted` and `background` tokens where the image does not cover it. The outside area is dimmed,
the selection has a primary border, a crop grid, near-white handles (slim edge bars, square corners),
and the foundation focus outline.

Ark sets `object-fit: fill` and the image transform inline and maps crops through the image element
box. The image therefore keeps its natural ratio through `max-width`/`max-height: 100%` and is
centered with `inset: 0; margin: auto`; stretching it to the viewport would distort the preview and
make `aspectRatio` crops non-proportional in natural pixels. Ark also sets viewport `position` and
`overflow`, handle position and cursors, and grid position and `pointer-events` inline, so the CSS
does not repeat them.

CSS Modules have no `--moduix-image-cropper-*` variables: styles come from foundation tokens, so
override them with a class on the part (for example a different viewport `aspect-ratio` or `height`).
CSS targets local classes and Ark state attributes; it does not add custom modifier classes.

## Intentional sugar and differences from upstream

The sugar over Ark is styling, stable `data-slot` hooks, `ImageCropperHandles`, and
`ImageCropperCropArea`. `ImageCropperCropArea` only assembles the existing selection, grids, and
handles; it does not change crop state or hide the explicit Ark composition path.

## Agent notes

- Keep `ImageCropperCropArea` as the canonical composition; preserve the explicit parts and
  `ImageCropperHandles` for customization.
- Preserve Ark callback detail objects and context methods.
- Keep `ImageCropperRootProvider` examples separate from `ImageCropper`; never nest both for the same
  cropper instance.
- Keep `useImageCropper` and `ImageCropperContext` aligned with Ark's signatures.
- Keep fixed-area selection semantics intact: the selection stays focusable (arrow keys pan the
  image) while the viewport remains the panning surface.
- Do not stretch `ImageCropperImage` to the viewport: Ark measures the element box, so a stretched
  box distorts the preview and the crop ratio.

## Local changelog

- 2026-10-16: Fixed image distortion (the image keeps its ratio and is centered) and sized the
  viewport by `aspect-ratio` instead of `vw`. Removed all `--moduix-image-cropper-*` variables, styles
  that duplicate Ark inline styles, dead transitions, and the runtime `asChild`/`children` stripping
  in `ImageCropperCropArea`; the focus ring is now the foundation outline. Exported
  `ImageCropperCropAreaProps` and the Ark types.
- 2026-09-21: Replaced the compound `ImageCropper.*` value surface with flat exports across React,
  Solid, and both styling tracks. `ImageCropper` is the only root value; all parts, context, and
  handle positions use `ImageCropper`-prefixed names.
- 2026-08-11: Added keyboard and fixed-crop-area regression coverage, a matching Storybook state, and the complete Ark state-hook reference in localized docs.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-28: Made the default viewport responsive on narrow screens, aligned selection geometry with Ark crop bounds, restricted `ImageCropperCropArea` to its fixed child anatomy, and removed the redundant circle selection border.
- 2026-07-10: Added `ImageCropperCropArea`, `ImageCropperContext`, and `useImageCropper` as moduix-owned advanced surfaces.

- 2026-07-03: Removed duplicate moduix exports for Ark image cropper hooks, context, and types;
  `ImageCropperRootProvider` remains the supported advanced entry point.
- 2026-06-22: Added `ImageCropper` as a styled Ark UI image cropper wrapper with docs, stories, package exports, and registry metadata.
- 2026-06-22: Stabilized default sizing for Storybook/docs rendering, switched examples to a real Unsplash image with CORS, and changed cropper toolbar examples to icon-only controls.
- 2026-06-22: Refined handles, aligned cropper toolbar examples and Tabs default indicator with SegmentGroup styling, and switched docs/stories to a closer 640x400 Unsplash image.
- 2026-06-22: Changed resize handles to near-white slim edge bars with larger 2px-rounded square corner handles and switched the crop preview action to the default `Button`.
- 2026-06-25: Aligned image, grid, handle, and focus styles with Ark runtime attributes; removed `data-focus` styling, kept side handles visually connected to corner handles, and synced docs CSS values.