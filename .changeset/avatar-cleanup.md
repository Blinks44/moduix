---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Avatar: Add `AvatarGroup` for overlapping avatar stacks. `size` defaults to `md` and is always mirrored as `data-size`.
The CSS Modules packages keep 6 of the 12 `--moduix-avatar-*` variables: `bg`, `color`, `font-size`, `font-weight`, `radius`, and `size`. Removed: `fallback-bg`, `fallback-color`, `fallback-padding`, `image-object-fit`, `image-object-position`, and `line-height`; style the fallback or image with a class on the part. Clipping moved from the root to the fallback, so status indicators can overflow the circle.