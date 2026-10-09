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

## Styling and accessibility

Ark owns the group and slider semantics, keyboard nudging, and localized labels. Keep each part's `data-slot` hook and the viewport/selection anatomy.