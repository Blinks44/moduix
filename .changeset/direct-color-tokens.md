---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

**Breaking.** Components and Tailwind utilities read `--moduix-<color>` tokens directly, and the `--moduix-color-*` alias layer is removed. Rename overrides such as `--moduix-color-primary` to `--moduix-primary`. Color overrides now work on any element, and `--moduix-destructive-foreground` is a regular token.
Removed unused tokens and utilities: `overlay-foreground`, `sidebar-primary` and `sidebar-primary-foreground`, the `z-xs`…`z-xl` scale, `opacity-loading`, `ease-standard`, `ease-emphasized`, `transition-emphasized`, `tracking-text-*`, `spacing-xs`…`spacing-2xl`, and the `*-space-*` utilities.
Field borders use `--moduix-input`, with at least 3:1 contrast against background, card, and popover in every preset and color scheme. This covers the form controls, Listbox, the AngleSlider thumb, the TreeView checkbox, and the CommandPalette search field.