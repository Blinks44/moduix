# Tooltip (Solid)

Primary upstream source: Ark UI Tooltip docs, https://ark-ui.com/docs/components/tooltip
(accessed 2026-09-03).

`Tooltip` is a native Solid adapter over `@ark-ui/solid/tooltip`. It preserves the React
component's explicit Ark anatomy, open state, trigger value callbacks, positioning, portal boundary,
presence defaults, `data-slot` hooks, CSS variables, and default arrow-tip sugar.

## Composition

```tsx
<Tooltip positioning={{ placement: 'top', offset: { mainAxis: 8 } }}>
  <Tooltip.Trigger
    asChild={(props) => (
      <button {...props()} type="button">
        Save
      </button>
    )}
  />
  <Tooltip.Body>Save changes</Tooltip.Body>
</Tooltip>
```

`Tooltip` and `Tooltip.Root` are equivalent roots. `Positioner` is portalled by default; set
`portalled={false}` or pass `portalRef` on `Tooltip`/`Tooltip.RootProvider` to control placement.
`lazyMount` and `unmountOnExit` default to `true`, matching the React wrapper rather than Ark's
unmounted-by-default primitive settings.

## API surface

The adapter exports `Tooltip`, `useTooltip`, and `useTooltipContext`. `Tooltip` exposes `Root`,
`RootProvider`, `Context`, `Trigger`, `DisabledTrigger`, `Body`, `Positioner`, `Content`, `Arrow`,
and `ArrowTip`.

`Tooltip.Body` renders `Tooltip.Positioner` plus `Tooltip.Content` and forwards props/ref to the
visible content. Use explicit `Positioner` and `Content` for advanced composition.

`Tooltip.Arrow` renders `Tooltip.ArrowTip` by default when it has no children.

`Tooltip.DisabledTrigger` renders Ark's trigger behavior onto a focusable `span` wrapper around one
disabled native control. Give the wrapper its own accessible name.

## Solid composition notes

Ark Solid uses render-function `asChild`:
`asChild={(props) => <button {...props()} type="button">Save</button>}`. Its factory does not
forward `ref` through `asChild`, so ordinary refs and custom-host composition are supported as
separate native paths.

`useTooltip()` and `useTooltipContext()` return Solid accessors. Read state as `tooltip().open` and
pass the accessor directly to `Tooltip.RootProvider value={tooltip}`.