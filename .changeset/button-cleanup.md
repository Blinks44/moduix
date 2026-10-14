---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Button: Replace the 69 per-variant and per-size `--moduix-button-*` variables with 14 generic ones: `bg`, `bg-hover`, `color`, `border-color`, `border-width`, `radius`, `height`, `padding-x`, `padding-y`, `font-size`, `font-weight`, `line-height`, `content-gap`, and `icon-size`. To theme one variant, set them on `[data-slot='button-root'][data-variant='<variant>']`. Focus ring, transition, and disabled opacity now use the foundation tokens directly.
The `destructive` hover now darkens the background like `default` instead of using `brightness(0.96)`.
Export the `ButtonRootProps`, `ButtonSize`, and `ButtonVariant` types, and remove dead `cursor` and link `padding-inline` styles.
Clipboard, Field, FileUpload, Input, PasswordInput, and QrCode no longer read the removed Button variables; their defaults are unchanged. Vue `InputGroupButton` now uses the Button size padding, like React and Solid.