---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

HoverCard: CSS Modules drop all 36 `--moduix-hover-card-*` variables; styles come from foundation tokens, so override them with a plain class on the part. Content motion now uses the shared `moduix-popup-in` and `moduix-popup-out` keyframes with the same 200ms ease-in-out default as the Tailwind packages and the other popups, and reads only the shared `--moduix-popup-motion-*` variables.
`HoverCardBody` now scrolls by itself instead of through a selector on `HoverCardContent`. The trigger underline follows `currentColor`, so a `color` class recolors it too, and the unreachable `data-disabled` trigger style is removed: Ark never sets it, and a disabled root only stops the card from opening. React and Solid now re-export the Ark Hover Card part prop, event, detail, and hook types; Vue exports the moduix `HoverCardRootProps` and `HoverCardRootProviderProps` with `portalled` and `portalRef`, plus `HoverCardArrowTipProps` and `HoverCardContextProps`.