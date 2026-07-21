# HoverCard

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/hover-card
- Chakra UI: https://chakra-ui.com/docs/components/hover-card

## Purpose

Rich preview popup that appears from hover or focus on a trigger, commonly a link or profile mention.

## Upstream model to preserve

The wrapper follows Ark UI `@ark-ui/react/hover-card`. Preserve `Root`, `RootProvider`, `Trigger`,
`Positioner`, `Content`, `Arrow`, and `ArrowTip` as the public moduix model. Preserve Ark
`RootProvider` compatibility so externally owned state from `@ark-ui/react/hover-card` still works.

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

- `HoverCard` / `HoverCard.Root`: root state and lifecycle, `data-slot="hover-card-root"`.
- `HoverCard.RootProvider`: connects parts to Ark `useHoverCard()` state and adds `data-slot="hover-card-root-provider"`.
- `HoverCard.Trigger`: `data-slot="hover-card-trigger"`, default link-like styling when `asChild` is not used.
- `HoverCard.Positioner`: `data-slot="hover-card-positioner"`, Ark positioning layer.
- `HoverCard.Content`: `data-slot="hover-card-content"`, visible styled popup surface.
- `HoverCard.Arrow`: `data-slot="hover-card-arrow"`, renders `HoverCard.ArrowTip` by default.
- `HoverCard.ArrowTip`: `data-slot="hover-card-arrow-tip"`.

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
`RootProvider` with moduix `useHoverCard`, `openDelay`/`closeDelay`, `disabled`, `positioning`, and
multiple triggers through `Trigger value` plus `onTriggerValueChange(details)`. Moduix re-exports
`useHoverCard` and `useHoverCardContext`, and exposes Ark `Context` as `HoverCard.Context`. Event
and detail types remain available from Ark for rare type-level escape hatches.

## Accessibility and state

Ark owns hover/focus behavior, dismissable layer behavior, controlled/uncontrolled state, ids, and
keyboard/focus lifecycle. Use the card only for supplementary previews: required information must
remain available without it. `asChild` must receive a single semantic child that can preserve the
trigger behavior. Styling should target Ark `data-scope="hover-card"`, `data-part`, `data-state`,
`data-placement`, `data-side`, `data-value`, `data-current`, and moduix `data-slot` hooks. For
advanced state reads or external state ownership, use `HoverCard.Context`, `useHoverCard`, or
`useHoverCardContext` from `@moduix/react`.

## Defaults and styling

Content motion falls back to the shared `--popup-motion-*` tokens; `--hover-card-*` motion
variables remain the more specific override.

Moduix adds default visual styling to `Trigger`, `Positioner`, `Content`, `Arrow`, and `ArrowTip`.
Content animation uses Ark `data-state='open' | 'closed'` and `--transform-origin`. Positioning and
sizing use Ark runtime variables such as `--available-width`, `--available-height`,
`--reference-width`, `--reference-height`, `--layer-index`, `--arrow-size`, `--arrow-background`,
and `--arrow-offset`. Public theme variables use the `--hover-card-*` prefix.

## Intentional sugar and differences from upstream

`HoverCard.Arrow` renders `HoverCard.ArrowTip` when no children are passed. The root owns the portal
boundary. Use `portalled={false}` for a hover card inside a dialog or another overlay that must keep
its positioner in the parent layer. Dialog auto-focus can focus a hover-card trigger and open the
card after `openDelay`; use Dialog `initialFocusEl` to choose another initial target when needed.
`HoverCard.Context`, `useHoverCard`, and `useHoverCardContext` are moduix-owned paths to the
corresponding Ark state surfaces. No legacy `PreviewCard*` aliases are exported.

## Agent notes

Keep popup structure explicit. Do not reintroduce `HoverCardContent` sugar that hides positioner
and content. Do not reintroduce legacy `createHandle`, `handle`, `payload`, `render`,
`Popup`, `Viewport`, or `Backdrop` compatibility.
Keep `RootProvider` compatible with Ark-owned state. Preserve the moduix context and hook exports;
Ark utility types remain direct-import escape hatches.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-16: Added shared `--popup-motion-*` fallbacks for project-wide popup content motion.
- 2026-07-10: Exposed `HoverCard.Context`, `useHoverCard`, and `useHoverCardContext` through
  moduix; documented disabled state, overlay nesting, and the supplementary-content constraint.
- 2026-07-10: Documented how Dialog initial focus can intentionally open a nested hover card or
  keep it closed until hover or focus.
- 2026-07-03: Removed moduix re-exports of Ark hover-card context hooks and utility types; kept
  `RootProvider`, explicit structure, root refs, and root `data-slot` hooks.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-25: Audited Ark migration against current Ark Hover Card docs; simplified docs and
  stories data/content examples while preserving the Ark part tree and public wrapper API.
- 2026-06-20: Migrated from legacy `preview-card` to Ark UI `hover-card`, renamed the component,
  removed legacy aliases and handle API, exposed Ark namespace parts/hooks/types, and updated
  styling to Ark data attributes and CSS variables.