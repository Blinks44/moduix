# CommandPalette

`CommandPalette` is a best-practice composition built from Dialog and Autocomplete. It keeps the
autocomplete popup open inside the dialog instead of rendering a positioned popup.

The root opens with `mod+k` by default, where `mod` maps to Command on macOS and Control on
Windows/Linux. Pass `shortcut={false}` or `shortcutTarget={null}` to disable the global listener.
The listener ignores editable targets such as inputs, textareas, selects, and contenteditable
regions.

## Defaults

| Prop                                      | Default    |
| ----------------------------------------- | ---------- |
| `shortcut`                                | `mod+k`    |
| `shortcutTarget`                          | `document` |
| `withBackdrop` (`CommandPaletteContent`)  | `true`     |
| `autoHighlight` (`CommandPaletteContent`) | `always`   |
| `keepHighlight` (`CommandPaletteContent`) | `true`     |
| `mode` (`CommandPaletteContent`)          | `list`     |
| `closeOnSelect` (`CommandPaletteItem`)    | `true`     |

`CommandPaletteContent` also forwards commonly needed `Autocomplete.Root` props such as
`filteredItems`, `highlightItemOnHover`, `loopFocus`, `locale`, `onItemHighlighted`,
`openOnInputClick`, `submitOnItemClick`, `virtualized`, `disabled`, `readOnly`, `required`,
`inputRef`, `form`, and `id`.