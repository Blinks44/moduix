# HoverCard (Solid)

`HoverCard` is a styled Ark UI hover and focus preview. The Solid adapter preserves the React
component's explicit anatomy, callback details, portal placement, lifecycle, positioning, state
attributes, and CSS hooks.

## Composition

```tsx
<HoverCard>
  <HoverCardTrigger
    asChild={(props) => (
      <a {...props()} href="#profile">
        @sarah_chen
      </a>
    )}
  />
  <HoverCardPositioner>
    <HoverCardContent>
      <HoverCardArrow />
      <HoverCardBody>Profile details</HoverCardBody>
    </HoverCardContent>
  </HoverCardPositioner>
</HoverCard>
```

`HoverCard` is the only public root value. `HoverCardPositioner` is portalled by default; use
`portalled={false}` or `portalRef` on the root to control overlay placement. `lazyMount` and
`unmountOnExit` default to `true`. When the available viewport height limits the popup, content
inside `HoverCardBody` scrolls inside the surface instead of escaping it.

When used, `HoverCardArrow` belongs inside `HoverCardContent`, matching Ark's examples and
keeping the popup border behind the arrow. `HoverCardContent` remains overflow-visible for the
arrow; put constrained content in `HoverCardBody`.

## API surface

The adapter exports `HoverCard`, all family-prefixed parts, `HoverCardContext`, `useHoverCard`, and
`useHoverCardContext`. `HoverCardRootProvider` receives the accessor returned by `useHoverCard()`:

```tsx
const hoverCard = useHoverCard();

<HoverCardRootProvider value={hoverCard}>
  <HoverCardTrigger>Profile</HoverCardTrigger>
  <HoverCardPositioner>
    <HoverCardContent>
      <HoverCardBody>Profile details</HoverCardBody>
    </HoverCardContent>
  </HoverCardPositioner>
</HoverCardRootProvider>;
```

Ark owns hover and focus behavior, open state, dismissal, IDs, positioning, presence, and runtime
CSS variables. Callback handlers receive Ark detail objects, including `details.open` and
`details.value`.

## Solid composition notes

Ark Solid uses render-function `asChild`:
`asChild={(props) => <a {...props()} href="#profile">Profile</a>}`. Its factory does not forward
`ref` through `asChild`, so ordinary refs and custom-host composition are supported as separate
native paths.
