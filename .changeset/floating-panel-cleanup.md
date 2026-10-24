---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

FloatingPanel: CSS Modules drop all 70 `--moduix-floating-panel-*` variables; styles come from foundation tokens, so override them with a plain class on the part. Content motion still reads the shared `--moduix-popup-motion-*` variables.
`FloatingPanelTrigger` is unstyled, like the Dialog and Drawer triggers, so compose it with `asChild` and a `Button`. `FloatingPanelContent` no longer sets a CSS minimum size, which made the panel larger than its Ark size and moved resize handles away from the pointer; use `minSize` on the root instead. Styles that Ark already overrides inline (positioner z-index, resize-handle offsets, `transform-origin`, the minimized body) are removed. `FloatingPanelCloseIcon` now has the same hover as the stage buttons, and CSS Modules control buttons get the pressed state Tailwind already had. React and Solid now re-export the Ark Floating Panel prop, detail, context, and hook types; Vue exports the moduix `FloatingPanelRootProps` and `FloatingPanelRootProviderProps` with `portalled` and `portalRef`.