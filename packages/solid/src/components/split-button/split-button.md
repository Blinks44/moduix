# SplitButton (Solid)

`SplitButton` preserves the React component's compound anatomy, shared button defaults, menu
behavior, accessibility hooks, and attached visual treatment.

## Ark Solid composition

`SplitButton` is a local composition of the Solid `Button` and `Menu` wrappers. Use
`SplitButton.Action`, `SplitButton.Trigger`, `SplitButton.Positioner`, and `SplitButton.Content`
with shared `Menu.*` items.

The root is equivalent to `SplitButton.Root` and renders a semantic `role="group"`. It accepts
`aria-label` or `aria-labelledby`, inherits Ark Menu props such as `open`, `onOpenChange`,
`onSelect`, `closeOnSelect`, `positioning`, `lazyMount`, and `unmountOnExit`, and defaults
positioning to `bottom-end` with a gutter of `4`.

Root `size` and `variant` values provide defaults for `Action` and `Trigger`. An icon-only
`Trigger` renders `ChevronDownIcon` and defaults its accessible name to `More actions`.
`Positioner` remains explicitly composed and is portalled by the shared `Menu` wrapper unless
`portalled={false}` is set.

Ark Solid's render-function `asChild` drops refs from the props it transports to the composed
child. Therefore both `Action` and `Trigger` forward their refs explicitly: `Trigger` applies its
`ref` to the moduix `Button` host inside the `asChild` render function, so a trigger ref matches
the React behavior and points at the rendered button. This parity is covered by the Solid tests.

## Styling hooks

The component keeps stable `data-slot` hooks:

- `split-button-root`
- `split-button-action`
- `split-button-trigger`
- `split-button-positioner`
- `split-button-content`

The CSS Module preserves the React component's attached radii, separator, size-specific trigger
padding, outline behavior, and `--moduix-split-button-*` customization variables.