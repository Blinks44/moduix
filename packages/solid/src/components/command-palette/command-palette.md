# CommandPalette

## Upstream reference

- Ark UI Dialog: https://ark-ui.com/docs/components/dialog
- Ark UI Combobox: https://ark-ui.com/docs/components/combobox
- Ark UI factory: https://ark-ui.com/docs/guides/composition#the-ark-factory

Ark UI has no dedicated command-palette primitive. This family composes Dialog and Combobox.

## Purpose

`CommandPalette` provides a dialog surface with a searchable command list and an optional keyboard shortcut.

## Public contract

The flat API includes `CommandPalette`, `CommandPaletteRootProvider`, `CommandPaletteTrigger`, `CommandPaletteBackdrop`, `CommandPalettePositioner`, `CommandPaletteContent`, `CommandPalettePanel`, `CommandPaletteTitle`, `CommandPaletteDescription`, `CommandPaletteHeader`, `CommandPaletteBody`, `CommandPaletteFooter`, `CommandPaletteCombobox`, `CommandPaletteSearch`, `CommandPaletteControl`, `CommandPaletteInput`, `CommandPaletteClearTrigger`, `CommandPaletteList`, `CommandPaletteItem`, `CommandPaletteItemText`, `CommandPaletteItemLabel`, `CommandPaletteItemDescription`, `CommandPaletteItemIcon`, `CommandPaletteItemMeta`, `CommandPaletteItemIndicator`, `CommandPaletteItemGroup`, `CommandPaletteItemGroupLabel`, `CommandPaletteEmpty`, `CommandPaletteSeparator`, and `CommandPaletteKbd`.

## Preservation notes

- Preserve Dialog focus, dismissal, modal, and lifecycle behavior plus Combobox collection state. The popup portals by default.
- Keep the global shortcut opt-in and Solid reactive cleanup for its listener.

## Styling and accessibility

Give the root an accessible name with `aria-label` or `CommandPaletteTitle`. Keep search input labeling and `data-slot` hooks on the composed parts.