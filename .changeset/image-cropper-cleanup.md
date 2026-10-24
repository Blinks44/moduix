---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

ImageCropper: Images no longer stretch to the viewport. Ark forces `object-fit: fill`, so an image whose ratio differed from the viewport was distorted and an `aspectRatio` crop did not keep that ratio in the natural image; the image now keeps its own ratio, shrinks to fit, and stays centered over the checkerboard. The viewport keeps an 8:5 ratio of its own width instead of a `vw`-based height, so it no longer grows taller than wide in a narrow container.
CSS Modules drop all 33 `--moduix-image-cropper-*` variables; styles come from foundation tokens, so override them with a class on the part. The checkerboard uses the `muted` and `background` tokens in every package, so it stays visible in dark themes in the Tailwind packages too. The selection focus ring is the foundation outline, handles lose their invisible border and unused transitions, and rules that repeated Ark inline styles are removed.
`ImageCropperCropArea` no longer strips `asChild` and `children` at runtime; its types still omit them. Vue `ImageCropper` forwards Ark props and emits through attrs like the other roots. All adapters export `ImageCropperCropAreaProps`; React and Solid re-export the Ark part prop, detail, and hook types, and Vue drops the `*BaseProps` type re-exports.