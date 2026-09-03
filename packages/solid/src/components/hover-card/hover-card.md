# HoverCard (Solid)

`HoverCard` is a styled Ark UI hover and focus preview. The Solid adapter preserves the React
component's explicit anatomy, callback details, portal placement, lifecycle, positioning, state
attributes, and CSS hooks.

## Composition

```tsx
<HoverCard>
  <HoverCard.Trigger
    asChild={(props) => (
      <a {...props()} href="#profile">
        @sarah_chen
      </a>
    )}
  />
  <HoverCard.Positioner>
    <HoverCard.Content>
      <HoverCard.Arrow />
      <HoverCard.Body>Profile details</HoverCard.Body>
    </HoverCard.Content>
  </HoverCard.Positioner>
</HoverCard>
```

`HoverCard` and `HoverCard.Root` are equivalent roots. `Positioner` is portalled by default; use
`portalled={false}` or `portalRef` on the root to control overlay placement. `lazyMount` and
`unmountOnExit` default to `true`. When the available viewport height limits the popup, content
inside `HoverCard.Body` scrolls inside the surface instead of escaping it.

When used, `HoverCard.Arrow` belongs inside `HoverCard.Content`, matching Ark's examples and
keeping the popup border behind the arrow. `HoverCard.Content` remains overflow-visible for the
arrow; put constrained content in `HoverCard.Body`.

## API surface

The adapter exports `HoverCard`, `useHoverCard`, and `useHoverCardContext`. `HoverCard` exposes
`Root`, `RootProvider`, `Context`, `Trigger`, `Positioner`, `Content`, `Arrow`, `ArrowTip`, and
`Body`.

`HoverCard.RootProvider` receives the accessor returned by `useHoverCard()`:

```tsx
const hoverCard = useHoverCard();

<HoverCard.RootProvider value={hoverCard}>
  <HoverCard.Trigger>Profile</HoverCard.Trigger>
  <HoverCard.Positioner>
    <HoverCard.Content>
      <HoverCard.Body>Profile details</HoverCard.Body>
    </HoverCard.Content>
  </HoverCard.Positioner>
</HoverCard.RootProvider>;
```

Ark owns hover and focus behavior, open state, dismissal, IDs, positioning, presence, and runtime
CSS variables. Callback handlers receive Ark detail objects, including `details.open` and
`details.value`.

## Solid composition notes

Ark Solid uses render-function `asChild`:
`asChild={(props) => <a {...props()} href="#profile">Profile</a>}`. Its factory does not forward
`ref` through `asChild`, so ordinary refs and custom-host composition are supported as separate
native paths.