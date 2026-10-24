# SplitButton

Upstream docs:

- Ark UI: no dedicated primitive; built from https://ark-ui.com/docs/components/menu
- Chakra UI: https://chakra-ui.com/docs/components/button#split-menu
- shadcn/ui: https://ui.shadcn.com/docs/components/button-group

## Contract

- `SplitButton` is a moduix composition of `Button` and the shared Ark-backed `Menu`. Parts:
  `SplitButton`, `SplitButtonAction`, `SplitButtonTrigger`, `SplitButtonPositioner`,
  `SplitButtonContent`. Menu rows are the shared `Menu*` parts.
- The root renders `<div role="group">` inside `Menu`. `ref`, `className`, `aria-label`, and
  `aria-labelledby` go to the group; every other prop goes to `Menu` (`open`, `onOpenChange`,
  `onSelect`, `closeOnSelect`, `ids`, `lazyMount`, `unmountOnExit`, `portalled`, `portalRef`, …).
- Root `size` (`xs`…`xl`, default `md`) and `variant` (every Button variant except `link`, default
  `default`) are defaults for `SplitButtonAction` and `SplitButtonTrigger`; each part can override them.
- Root `positioning` is merged over `{ placement: 'bottom-end', gutter: 4 }`.
- `SplitButtonAction` is a `Button` with the full Button API, including `asChild` for links.
- `SplitButtonTrigger` is an Ark `MenuTrigger` rendered on a `Button`. Without children it shows
  `ChevronDownIcon` and falls back to `aria-label` from `a11yLabels.moreActions` ("More actions").
  It has no `asChild`: custom content goes through `children` so trigger and Button stay one element.
- `SplitButtonPositioner` is portalled by default and keeps Ark positioning variables;
  `SplitButtonContent` wraps children in `MenuViewport` unless `asChild` is set.
- Exported types: `SplitButtonRootProps`, `SplitButtonActionProps`, `SplitButtonTriggerProps`,
  `SplitButtonPositionerProps`, `SplitButtonContentProps`, `SplitButtonSize`, `SplitButtonVariant`.

```text
SplitButton (group)
├─ SplitButtonAction
├─ SplitButtonTrigger
└─ SplitButtonPositioner (portalled)
   └─ SplitButtonContent
      └─ MenuItem, MenuSeparator, MenuItemGroup, …
```

`data-slot` hooks: `split-button-root`, `split-button-action`, `split-button-trigger`,
`split-button-positioner`, `split-button-content`.

## Styling

- The action loses its end radii, the trigger loses its start radii and overlaps the action by the
  Button border width, so the borders collapse into one.
- Filled variants draw a separator on the trigger `::before`; outline variants hide it and rely on
  the shared border.
- The trigger uses narrower inline padding than Button for each size.
- CSS Modules expose one variable, `--moduix-split-button-separator-color`
  (default `color-mix(in srgb, currentColor 16%, transparent)`). Change padding or the separator
  geometry with a class on the part.
- Button already skips its press offset for any `data-slot` other than `button-root`, so the
  action and trigger need no press reset.

## Agent notes

- Do not add a split-button provider or context API; use `Menu` directly for external state.
- Keep the popup explicit (`Positioner -> Content`) and keep menu rows on shared `Menu*` parts.