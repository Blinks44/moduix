---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

QrCode: Fix `QrCodeOverlay` being centered on the whole root instead of the code when `QrCodeDownloadTrigger` or other content follows the frame. The root is now a one-column grid and the overlay sits in the frame's cell.
`QrCodeOverlay` is now a square one third of the frame width, like Chakra UI, instead of a fixed `--moduix-size-lg` (40px). At the default 8rem size it grows to about 43px; on larger codes it scales with the code.
The CSS Modules packages drop 27 `--moduix-qr-code-*` variables and keep only `--moduix-qr-code-size`. Set the module color with `fill` or `color` on `QrCodeFrame` (or the text color of a parent) instead of `--moduix-qr-code-fill`, and style the overlay and download trigger with a class. The root no longer forces the foreground text color; it inherits it.
Remove no-op styles (`QrCodePattern` has no default class now) and the dead `data-disabled` download trigger styles.
Export the Ark part, details, and hook types from React and Solid; Vue no longer exports the `*BaseProps` types and adds `QrCodeValueChangeDetails`.