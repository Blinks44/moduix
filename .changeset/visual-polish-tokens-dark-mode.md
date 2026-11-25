---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
'@moduix/svelte': minor
'@moduix/svelte-tailwind': minor
---

Polish default visual styling, tokens, and dark mode across all framework and styling adapters:

- Enable automatic system dark mode (`color-scheme: light dark`) and built-in `.dark` / `.light` class support without extra CSS.
- Add dark-mode-aware `light-dark()` shadows and semantic status palette tokens (`--moduix-success`, `--moduix-warning`, `--moduix-info`, and their `*-foreground` counterparts).
- Add `success`, `warning`, and `info` variants to `Badge`, plus `info` status tinting on `Alert` and `Toast`.
- Fix primary and destructive `Button` hover contrast in light and dark themes, unify focus-ring thickness and offsets, convert typography/spacing/sizing scales from `px` to `rem`, align desktop `Input` typography with `Button` (keeping `1rem` on coarse pointers), remove boxed `TabsContent` styling in `variant="line"`, switch `Tooltip` to a compact inverted surface, and tokenize `Toast` easing curves.
- Support local inline `--moduix-radius` and `--moduix-spacing-*` recalculation for derived tokens.