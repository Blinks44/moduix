---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

CommandPalette: Items without `CommandPaletteItemIcon` no longer let a long label run under `CommandPaletteItemMeta`; items are a flex row where the text takes the free space and the meta and indicator sit at the end. `CommandPalette` is now the Ark Dialog root with an internal shortcut listener, so every presence prop reaches Ark (Solid used to drop `immediate`; Vue declared `present`, `immediate`, and `skipAnimationOnMount`, which Ark Vue does not support, and they are removed). Reduced motion now shortens the backdrop and content animations even when `--moduix-popup-motion-duration` is customized. Highlighted items use `accent-foreground`, and the Tailwind clear trigger uses the `CloseButton` focus ring.
Removed `CommandPaletteBody`: `CommandPalettePanel` renders the content directly, and the combobox already fills it. `CommandPaletteTrigger` is unstyled like `DialogTrigger`; compose it with `asChild` and `Button`. The content has a plain popover background and border. The CSS Modules packages keep 2 of the 133 `--moduix-command-palette-*` variables (`width`, `max-height`); colors, spacing, typography, and motion come from foundation tokens, the shared `--moduix-backdrop-*` and `--moduix-popup-motion-*` variables, or a class on the part.
`CommandPaletteRootProvider` accepts `shortcut` like `CommandPalette`. `CommandPaletteSearch` shows a decorative search icon before the input. `CommandPaletteRootProps` and `CommandPaletteRootProviderProps` are exported.