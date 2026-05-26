# Kbd

`Kbd` is a compact keyboard key primitive for shortcuts and command hints.
It is a standalone moduix component and does not wrap a Base UI primitive.

## Parts

- `Kbd` (`data-slot="kbd-root"`)
- `KbdGroup` (`data-slot="kbd-group"`)

## Props

- `className` and standard `kbd` props on `Kbd`
- `className` and standard `span` props on `KbdGroup`

## Styling

Use `className` or the public `--kbd-*` CSS variables from `src/styles/theme.css` for local
styling. `KbdGroup` is an inline wrapper that keeps grouped keys aligned and uses
`--kbd-group-gap` for spacing. For quieter or denser presentations, prefer local CSS variables
instead of component props.