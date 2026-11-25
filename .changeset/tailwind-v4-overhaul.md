---
'@moduix/react-tailwind': minor
'@moduix/solid-tailwind': minor
'@moduix/vue-tailwind': minor
'@moduix/svelte-tailwind': minor
---

Overhaul the Tailwind v4 packages and blocks so they are idiomatic, host-safe, and aligned with CSS Modules:

- Preserve host Tailwind v4 spacing and typography scales by removing `--spacing-*`, `--text-xs..3xl`, `--font-weight-*`, and `--default-border-width` overrides from `tailwind-theme.css`, and simplify `cn` (`extendTailwindMerge`) to drop custom `text-md` and `font-regular` overrides.
- Replace `text-md` with `text-base`, `font-regular` with `font-normal`, and remove redundant `[@media(hover:hover)]:` wrappers across all components.
- Refactor `Card`, `Dialog`, `Input`, `Select`, `Tabs`, and `Toast` using `cva`, grouped utility arrays, and `@utility` helpers (`moduix-card-interactive-elevation`, `moduix-dialog-nested`) for readability.
- Fix styling parity with CSS Modules in `Select` (dynamic action spacing for presets and `SelectValueText > svg`), `Dialog` (`motion-reduce:transition-none` and preset spacing), `Toast` (preset-aware padding and max-width), and `CardLink` (`after:rounded-[inherit]`).
- Rewrite all 15 Tailwind registry blocks across React, Solid, Vue, and Svelte with pure Tailwind v4 classes and zero `.module.css` dependencies.