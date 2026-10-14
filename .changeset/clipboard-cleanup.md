---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Clipboard: `ClipboardInput` and `ClipboardTrigger` no longer add their own styles under `asChild`, so a composed moduix `Input` or `Button` keeps its own padding, transitions, and press feedback. The default icons render as a direct `svg` child of `ClipboardIndicator`, so the extra span and its `clipboard-indicator-idle-icon` and `clipboard-indicator-copied-icon` slots are gone.
The CSS Modules packages keep 9 `--moduix-clipboard-*` variables instead of 47: `gap`, `control-gap`, `height`, `radius`, `border-color`, `input-bg`, `trigger-bg`, `trigger-bg-hover`, and `icon-size`. `height`, `radius`, and `border-color` apply to the input and the trigger together. Width, color, label, value text, typography, padding, focus-ring, transition, read-only, and disabled variables are removed in favor of foundation tokens, along with the fallbacks to `--moduix-input-*` and `--moduix-button-*`; set those with a class on the part. Dead `data-disabled` styles are removed: Ark sets no such attribute on these parts, and native `disabled` keeps working.
The input now uses the same 12px inline padding as `Input` (was 14px), and the default copy icon has the same stroke width as the copied check icon, so the icon no longer changes weight after copying.