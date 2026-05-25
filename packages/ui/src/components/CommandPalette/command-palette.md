# CommandPalette

`CommandPalette` is a small composition of `Dialog` and `Autocomplete`.

- `CommandPalette` is a dialog root with a built-in global shortcut listener.
- `CommandPaletteContent` is the default modal composition: portal, backdrop, viewport, popup, and
  an inline always-open autocomplete root.
- `CommandPalettePortal`, `CommandPaletteBackdrop`, `CommandPaletteViewport`, and
  `CommandPalettePopup` are exported for composition when the default content layout is not enough.

## Defaults

| Prop                                      | Default    |
| ----------------------------------------- | ---------- |
| `shortcut`                                | `mod+k`    |
| `shortcutTarget`                          | `document` |
| `autoHighlight` (`CommandPaletteContent`) | `always`   |
| `keepHighlight` (`CommandPaletteContent`) | `true`     |
| `closeOnSelect` (`CommandPaletteItem`)    | `true`     |

The shortcut listener ignores editable targets such as inputs, textareas, selects, and
contenteditable regions, and it matches the exact modifier set.