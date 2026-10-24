---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Popover: CSS Modules drop all 62 `--moduix-popover-*` variables, including the `--moduix-popover-content-*` motion family and `--moduix-popover-transition`. Colors, borders, spacing, sizes, and typography come from foundation tokens, so override them with a plain class on the part. Content motion now uses the shared `moduix-popup-in` and `moduix-popup-out` keyframes with the same 200ms ease-in-out default as the Tailwind packages, and reads only the shared `--moduix-popup-motion-*` variables, which also work as a local exception when set on `PopoverContent`.
`PopoverBody` is now spaced from a preceding `PopoverHeader` instead of sitting flush against the description. In Vue, `Popover` now follows runtime changes to `portalled` and `modal`; before, it read them once at setup. The Tailwind `PopoverCloseIcon` now uses the same focus ring as `CloseButton` and the CSS Modules variant, and the trigger drops the unreachable `data-disabled` styles: Ark never sets that attribute on popover triggers, so only a native `disabled` trigger is dimmed. React and Solid now re-export the Ark Popover part prop, event, detail, and hook types; Vue exports the moduix `PopoverRootProps` and `PopoverRootProviderProps` with `portalled` and `portalRef` instead of the bare Ark types, and no longer re-exports the Ark `Popover*BaseProps` types.