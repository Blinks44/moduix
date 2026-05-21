# CommandPalette

`CommandPalette` is a best-practice composition built from Dialog and Autocomplete. It keeps the
autocomplete popup open inside the dialog instead of rendering a positioned popup.

The root opens with `mod+k` by default, where `mod` maps to Command on macOS and Control on
Windows/Linux. Pass `shortcut={false}` to disable the global listener.