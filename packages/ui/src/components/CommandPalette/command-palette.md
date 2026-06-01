# CommandPalette

`CommandPalette` is a thin composition of `Dialog` and `Autocomplete`.

- `CommandPalette` owns dialog state and the optional global keyboard shortcut.
- `CommandPaletteContent` is the recommended default shell: portal, optional backdrop, viewport,
  popup, and an inline always-open autocomplete root.
- The low-level layout parts stay exported for custom composition when the default shell is too
  opinionated.

## Defaults

| Surface                 | Prop             | Default    |
| ----------------------- | ---------------- | ---------- |
| `CommandPalette`        | `modal`          | `true`     |
| `CommandPalette`        | `shortcut`       | `mod+k`    |
| `CommandPalette`        | `shortcutTarget` | `document` |
| `CommandPaletteContent` | `autoHighlight`  | `always`   |
| `CommandPaletteContent` | `keepHighlight`  | `true`     |
| `CommandPaletteItem`    | `closeOnSelect`  | `true`     |

## Notes

- `mod` uses the platform primary modifier: `Meta` on macOS/iOS and `Control` elsewhere.
- The shortcut listener ignores editable targets such as inputs, textareas, selects, and
  `contenteditable` regions.
- `CommandPaletteContent` respects `modal={false}` by dropping the default backdrop and allowing
  pointer interaction outside the popup.
- When you need different layering or a different popup shell, compose
  `CommandPalettePortal`, `CommandPaletteBackdrop`, `CommandPaletteViewport`, and
  `CommandPalettePopup` directly instead of extending `CommandPaletteContent`.