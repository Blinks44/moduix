# ImageCropper

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/image-cropper

## Purpose

`ImageCropper` supports image selection, pan, zoom, rotation, and flip through Ark's cropper state machine.

## Public contract

The flat API includes `ImageCropper`, `ImageCropperRootProvider`, `ImageCropperViewport`, `ImageCropperImage`, `ImageCropperSelection`, `ImageCropperGrid`, `ImageCropperHandle`, `ImageCropperHandles`, `ImageCropperCropArea`, `ImageCropperContext`, `useImageCropper`, and `useImageCropperContext`.

## Preservation notes

- Keep Ark controlled and initial crop/transform props, crop limits, callbacks, generated IDs, and output helpers intact.
- `ImageCropperCropArea` and `ImageCropperHandles` are composition helpers; do not add a second state layer.
- Preserve Solid `class` and reactive prop forwarding.
- `ImageCropperCropArea` types omit `children` and `asChild`; it does not strip them at runtime.
- Do not stretch `ImageCropperImage` to the viewport: Ark sets `object-fit: fill` and measures the
  element box, so the image keeps its ratio with `max-width`/`max-height: 100%` and is centered.

## Styling and accessibility

Ark owns the group and slider semantics, keyboard nudging, and localized labels. Keep each part's `data-slot` hook and the viewport/selection anatomy.

The viewport keeps an `8 / 5` aspect ratio of its own width. CSS Modules have no
`--moduix-image-cropper-*` variables; override foundation-token styles with a class on the part.
Types: `ImageCropperCropAreaProps` plus the Ark part prop, detail, and hook types.