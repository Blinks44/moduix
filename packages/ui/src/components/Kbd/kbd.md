# Kbd

`Kbd` is a compact keyboard keycap for shortcuts, command hints, and inline key labels.
It is a standalone moduix component built directly on the native `<kbd>` element because Base UI
does not ship a dedicated keyboard-key primitive.

## Default Path

Use `Kbd` for a single key and `KbdGroup` for multi-key shortcuts:

```tsx
<KbdGroup>
  <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
</KbdGroup>
```

## Parts

- `Kbd` (`data-slot="kbd-root"`)
- `KbdGroup` (`data-slot="kbd-group"`)

## Props

- `className` and standard `kbd` props on `Kbd`
- `className` and standard `span` props on `KbdGroup`

## Composition

`Kbd` keeps the public API intentionally small. There are no size, tone, or variant props.
Use native element props, `className`, and local CSS variables for one-off adjustments.

`KbdGroup` is only a lightweight inline wrapper for grouped shortcuts. Separators like `+` or `/`
stay in composition as normal text.

## Styling

Use `className` or the public `--kbd-*` CSS variables from `src/styles/theme.css` for local
styling. `KbdGroup` is an inline wrapper that keeps grouped keys aligned and uses
`--kbd-group-gap` for spacing. For denser or product-specific styling, prefer local CSS variables
instead of extra component props.
