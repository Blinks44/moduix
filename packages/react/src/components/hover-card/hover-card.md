# HoverCard

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/hover-card
- Chakra UI: https://chakra-ui.com/docs/components/hover-card

## Purpose

Rich preview popup that appears from hover or focus on a trigger, commonly a link or profile mention.

## Upstream model to preserve

The wrapper follows Ark UI `@ark-ui/react/hover-card`. Preserve `Root`, `RootProvider`, `Trigger`,
`Positioner`, `Content`, `Arrow`, `ArrowTip`, `Context`, `useHoverCard`, and
`useHoverCardContext` as the public model.

## Current behavior contract

`Root` and `RootProvider` portal `Positioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

`HoverCard` is the short root form and `HoverCard.Root` is the equivalent namespace part. Root props,
controlled state, delay props, positioning, ids, presence props, outside-interaction callbacks, and
callback detail objects pass through Ark without remapping. The previous legacy `PreviewCard`
contract, detached handle API, `render` prop examples, `Popup`, `Viewport`, `Backdrop`, and
high-level content wrapper are intentionally removed.

## Anatomy and exported parts

```tsx
<HoverCard>
  <HoverCard.Context>{(context) => null}</HoverCard.Context>
  <HoverCard.Trigger asChild>
    <a href="#profile">@sarah_chen</a>
  </HoverCard.Trigger>
  <HoverCard.Positioner>
    <HoverCard.Content>
      <HoverCard.Arrow>
        <HoverCard.ArrowTip />
      </HoverCard.Arrow>
    </HoverCard.Content>
  </HoverCard.Positioner>
</HoverCard>
```

- `HoverCard` / `HoverCard.Root`: root state and lifecycle, no default class or `data-slot`.
- `HoverCard.RootProvider`: connects parts to `useHoverCard()` state.
- `HoverCard.Trigger`: `data-slot="hover-card-trigger"`, default link-like styling when `asChild` is not used.
- `HoverCard.Positioner`: `data-slot="hover-card-positioner"`, Ark positioning layer.
- `HoverCard.Content`: `data-slot="hover-card-content"`, visible styled popup surface.
- `HoverCard.Arrow`: `data-slot="hover-card-arrow"`, renders `HoverCard.ArrowTip` by default.
- `HoverCard.ArrowTip`: `data-slot="hover-card-arrow-tip"`.
- `HoverCard.Context`: Ark render-prop context.

## Composition

```tsx
import { HoverCard } from '@moduix/react';

export function Example() {
  return (
    <HoverCard positioning={{ placement: 'bottom-start', gutter: 8 }}>
      <HoverCard.Trigger asChild>
        <a href="#profile">@sarah_chen</a>
      </HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow />
          Profile details
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}
```

## Upstream feature coverage

Covered Ark examples: basic composition, controlled `open` with `onOpenChange(details)`,
`RootProvider` plus `useHoverCard`, `openDelay`/`closeDelay`, `positioning`, `Context`, and
multiple triggers through `Trigger value` plus `onTriggerValueChange(details)`. The wrapper also
exports Ark event/detail types from the package barrel.

## Accessibility and state

Ark owns hover/focus behavior, dismissable layer behavior, controlled/uncontrolled state, ids, and
keyboard/focus lifecycle. `asChild` must receive a single semantic child that can preserve the
trigger behavior. Styling should target Ark `data-scope="hover-card"`, `data-part`, `data-state`,
`data-placement`, `data-side`, `data-value`, `data-current`, and moduix `data-slot` hooks.

## Defaults and styling

Moduix adds default visual styling to `Trigger`, `Positioner`, `Content`, `Arrow`, and `ArrowTip`.
Content animation uses Ark `data-state='open' | 'closed'` and `--transform-origin`. Positioning and
sizing use Ark runtime variables such as `--available-width`, `--available-height`,
`--reference-width`, `--reference-height`, `--layer-index`, `--arrow-size`, `--arrow-background`,
and `--arrow-offset`. Public theme variables use the `--hover-card-*` prefix.

## Intentional sugar and differences from upstream

`HoverCard.Arrow` renders `HoverCard.ArrowTip` when no children are passed. The root owns the portal
boundary. No legacy `PreviewCard*` aliases are exported.

## Agent notes

Keep popup structure explicit. Do not reintroduce `HoverCardContent` sugar that hides positioner
and content. Do not reintroduce legacy `createHandle`, `handle`, `payload`, `render`,
`Popup`, `Viewport`, or `Backdrop` compatibility.

## Local changelog

- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-25: Audited Ark migration against current Ark Hover Card docs; simplified docs and
  stories data/content examples while preserving the Ark part tree and public wrapper API.
- 2026-06-20: Migrated from legacy `preview-card` to Ark UI `hover-card`, renamed the component,
  removed legacy aliases and handle API, exposed Ark namespace parts/hooks/types, and updated
  styling to Ark data attributes and CSS variables.