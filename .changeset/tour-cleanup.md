---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Tour: floating steps with `placement: 'center'` now sit in the viewport center instead of starting at it, and floating `top` and `bottom` steps stay centered in RTL.
The CSS Modules packages drop all 83 `--moduix-tour-*` variables, including `--moduix-tour-z-index` and the content and backdrop motion families. Styles come from foundation tokens, so override a part with a class or a `data-slot` selector; the backdrop still reads the shared `--moduix-backdrop-bg` and `--moduix-backdrop-filter`. Content motion uses the shared `moduix-popup-in` and `moduix-popup-out` keyframes, and the backdrop uses the dialog backdrop keyframes, in both styling tracks; the Tailwind backdrop no longer hard-codes 200ms, so reduced-motion and duration tokens apply to it.
`TourCloseTrigger` is now unstyled, like `DialogCloseTrigger`; use `TourCloseIcon` for the styled icon-only close button, which now relies on `CloseButton` defaults and keeps only its position and hover colors. Overlay layers stack from the new `--moduix-z-tour` token (65, between popups and toasts) plus Ark's `--tour-layer`, so a tour started from an open dialog or popover shows above it; before, it rendered at 50 under the dialog. Open tour content also restores pointer events that a modal dialog disables outside itself, so its actions stay clickable. The Tailwind packages use the token instead of hard-coded `50` and `60`. Dialog steps center with `safe center`, so the top of tall content stays reachable on short screens. Progress text and the action row no longer use CSS `order`, so the visual order follows the markup.
React and Solid export the Ark Tour part props, step, callback detail, and hook types, as Vue already did. Every framework exports `TourActionListProps`.