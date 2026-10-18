# CommandPalette

Upstream references (accessed 2026-10-15):

- Ark UI: no command-palette primitive; the family composes
  https://ark-ui.com/docs/components/dialog and https://ark-ui.com/docs/components/combobox, and
  local leaf parts use https://ark-ui.com/docs/guides/composition#the-ark-factory
- Chakra UI: no command-palette component.
- shadcn/ui: `Command` (cmdk) and `CommandDialog`, `apps/v4/registry/new-york-v4/ui/command.tsx`.

## Purpose

`CommandPalette` is a dialog with an Ark Combobox command list and an optional global shortcut.

## Current behavior contract

- `CommandPalette` is Ark `Dialog.Root`; `CommandPaletteRootProvider` is Ark `Dialog.RootProvider`
  for state from `useDialog`. Both portal `CommandPaletteBackdrop` and `CommandPalettePositioner`
  by default. Set `portalled={false}` to render them inline, or pass `portalRef` for a custom
  container.
- Both roots default `lazyMount` and `unmountOnExit` to `true` (Ark: `false`), so the overlay is
  absent until the first open and removed after its exit animation.
- `shortcut` defaults to `false` on both roots. A hotkey string such as `mod+k` (parsed by `@zag-js/hotkeys`)
  toggles the palette. It ignores repeats, IME composition, prevented events and, while closed,
  editable targets. The listener is removed on unmount or when the shortcut changes.
- `CommandPaletteCombobox` is Ark `Combobox.Root` with `open`, `disableLayer`, and `closeOnSelect`
  set to `true`, `inputBehavior="autohighlight"`, and `selectionBehavior="preserve"`. Selection
  calls `onSelect` and then closes the dialog unless `closeOnSelect={false}`.
- `CommandPaletteClearTrigger` is Ark `Combobox.ClearTrigger` with the shared close-button styles.
  It is visible while the query is not empty and clears only the query, not the selected value.
  The icon-only default gets the `clearSearch` label.
- `CommandPaletteSearch` renders `CommandPaletteControl`, a decorative `SearchIcon`
  (`command-palette-search-icon`), `CommandPaletteInput` with the `searchCommands` label, and
  `CommandPaletteClearTrigger`.
- `CommandPalettePanel` renders `CommandPaletteBackdrop`, `CommandPalettePositioner`, and
  `CommandPaletteContent`; its props go to the content.
- `CommandPaletteList` is Ark `Combobox.Content` wrapped in the local `ScrollArea` without a visible
  scrollbar track. `CommandPaletteItemIndicator` renders a check icon by default.
- `CommandPaletteTrigger` is unstyled; compose it with `asChild` and `Button`.
- Consumers own collection filtering. When an external `useListCollection` filter is used, reset it
  when the dialog closes.

## Anatomy and exported parts

```text
CommandPalette
├─ CommandPaletteTrigger
└─ CommandPalettePanel (or Backdrop + Positioner > Content)
   ├─ CommandPaletteHeader > CommandPaletteTitle, CommandPaletteDescription
   └─ CommandPaletteCombobox
      ├─ CommandPaletteSearch (or Control > Input, ClearTrigger)
      ├─ CommandPaletteList
      │  ├─ CommandPaletteEmpty
      │  ├─ CommandPaletteSeparator
      │  └─ CommandPaletteItemGroup > CommandPaletteItemGroupLabel, CommandPaletteItem
      │     └─ ItemIcon, ItemText > ItemLabel, ItemDescription, ItemMeta, ItemIndicator
      └─ CommandPaletteFooter > CommandPaletteKbd
```

`CommandPaletteRootProps` and `CommandPaletteRootProviderProps` are exported types.
`CommandPaletteHeader`, `CommandPaletteItemIcon`, `CommandPaletteItemLabel`,
`CommandPaletteItemDescription`, `CommandPaletteItemMeta`, `CommandPaletteSeparator`, and
`CommandPaletteFooter` are Ark factory leaf parts. `CommandPaletteKbd` wraps the local `Kbd` with a
smaller, muted size. Every part has a `data-slot="command-palette-*"` hook, and the list adds
`command-palette-scroll-area`, `-scroll-viewport`, and `-scroll-content`.

## Styling

- Public variables: `--moduix-command-palette-width` (37.5rem) and
  `--moduix-command-palette-max-height` (34rem). The viewport still caps both. Everything else is
  a foundation token or a class on the part.
- The backdrop uses the shared `--moduix-backdrop-bg` and `--moduix-backdrop-filter`. Content motion
  uses the foundation `moduix-command-palette-*` keyframes with the shared
  `--moduix-popup-motion-*` variables; the default offset is `-0.75rem`. Reduced motion disables
  both animations; Ark presence completes the exit at once.
- Items lay out as a flex row: `CommandPaletteItemText` takes the free space and
  `CommandPaletteItemMeta` / `CommandPaletteItemIndicator` sit at the end, with or without an icon.
  Items use the shared `--moduix-popup-item-*` and `--moduix-popup-group-label-*` variables.
- Content uses the `--moduix-z-popup` base plus Ark's `--layer-index`; the backdrop sits one level
  below the positioner's mirrored `--z-index`.

## Accessibility

Give the dialog a name with `aria-label` on the root or with `CommandPaletteTitle`. A direct
`CommandPaletteInput` needs its own label. A custom `asChild` clear trigger must name itself.

## Agent notes

Do not reintroduce render-prop APIs, imperative handles, or a styled native trigger. Keep dialog
structure explicit; `CommandPalettePanel` and `CommandPaletteSearch` are the only bundling helpers.
Import collections and `useFilter` from Ark directly instead of re-exporting them.