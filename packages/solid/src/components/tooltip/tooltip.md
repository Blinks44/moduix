# Tooltip (Solid)

Primary upstream source: Ark UI Tooltip docs, https://ark-ui.com/docs/components/tooltip
(accessed 2026-09-03).

`Tooltip` is a native Solid adapter over `@ark-ui/solid/tooltip`. It preserves the React
component's explicit Ark anatomy, open state, trigger value callbacks, positioning, portal boundary,
presence defaults, `data-slot` hooks, CSS variables, and default arrow-tip sugar.

## Composition

```tsx
<Tooltip positioning={{ placement: 'top', offset: { mainAxis: 8 } }}>
  <TooltipTrigger
    asChild={(props) => (
      <button {...props()} type="button">
        Save
      </button>
    )}
  />
  <TooltipBody>Save changes</TooltipBody>
</Tooltip>
```

`Tooltip` is the root. `TooltipPositioner` is portalled by default; set
`portalled={false}` or pass `portalRef` on `Tooltip`/`TooltipRootProvider` to control placement.
`lazyMount` and `unmountOnExit` default to `true`, matching the React wrapper rather than Ark's
unmounted-by-default primitive settings.

## API surface

The adapter exports `Tooltip`, `useTooltip`, and `useTooltipContext`, together with
`TooltipRootProvider`, `TooltipContext`, `TooltipTrigger`, `TooltipDisabledTrigger`, `TooltipBody`,
`TooltipPositioner`, `TooltipContent`, `TooltipArrow`, and `TooltipArrowTip`.

`TooltipBody` renders `TooltipPositioner` plus `TooltipContent` and forwards props/ref to the
visible content. Use explicit `Positioner` and `Content` for advanced composition.

`TooltipArrow` renders `TooltipArrowTip` by default when it has no children.

`TooltipDisabledTrigger` renders Ark's trigger behavior onto a focusable `span` wrapper around one
disabled native control. Give the wrapper its own accessible name.

## Solid composition notes

Ark Solid uses render-function `asChild`:
`asChild={(props) => <button {...props()} type="button">Save</button>}`. Its factory does not
forward `ref` through `asChild`, so ordinary refs and custom-host composition are supported as
separate native paths.

`useTooltip()` and `useTooltipContext()` return Solid accessors. Read state as `tooltip().open` and
pass the accessor directly to `TooltipRootProvider value={tooltip}`.