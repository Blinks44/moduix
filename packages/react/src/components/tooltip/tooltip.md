# Tooltip

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/tooltip
- Chakra UI: https://chakra-ui.com/docs/components/tooltip

## Purpose

`Tooltip` shows a short label or hint when a trigger is hovered or focused.

## Upstream model to preserve

The wrapper follows Ark UI React `@ark-ui/react/tooltip`. Preserve the explicit part tree:

```tsx
<Tooltip>
  <Tooltip.Trigger />
  <Tooltip.Positioner>
    <Tooltip.Content>
      <Tooltip.Arrow>
        <Tooltip.ArrowTip />
      </Tooltip.Arrow>
    </Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip>
```

Ark is the source of truth for controlled state, callback detail objects, positioning, `ids`,
presence props, `RootProvider`, and the advanced state hooks available directly from
`@ark-ui/react/tooltip`.

## Current behavior contract

`Root` and `RootProvider` portal `Positioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

`Tooltip` is the root component and also exposes Ark-aligned namespace parts:

- `Tooltip.Root`
- `Tooltip.RootProvider`
- `Tooltip.Trigger`
- `Tooltip.Body`
- `Tooltip.Positioner`
- `Tooltip.Content`
- `Tooltip.Arrow`
- `Tooltip.ArrowTip`

For externally owned state, use the moduix exports `useTooltip` and `useTooltipContext` with
`Tooltip.RootProvider`.

The wrapper adds default Moduix styling, stable `data-slot` hooks, and two narrow sugars:
`Tooltip.Body` renders `Tooltip.Positioner` and `Tooltip.Content` together, and `Tooltip.Arrow`
renders `Tooltip.ArrowTip` by default when no children are provided.

## Anatomy and exported parts

| Part               | `data-slot`          | Notes                                                  |
| ------------------ | -------------------- | ------------------------------------------------------ |
| `Tooltip` / `Root` | none                 | No DOM wrapper; owns Ark tooltip state.                |
| `RootProvider`     | none                 | Renders from an external `useTooltip()` state object.  |
| `Body`             | none                 | Shortcut for `Positioner + Content`.                   |
| `Trigger`          | `tooltip-trigger`    | Ref forwards to the Ark trigger button.                |
| `Positioner`       | `tooltip-positioner` | Ref forwards to the Ark positioner div.                |
| `Content`          | `tooltip-content`    | Ref forwards to the visible Ark content div.           |
| `Arrow`            | `tooltip-arrow`      | Ref forwards to the Ark arrow div; renders `ArrowTip`. |
| `ArrowTip`         | `tooltip-arrow-tip`  | Ref forwards to the Ark arrow tip div.                 |

## Composition

```tsx
import { Button, Tooltip } from '@moduix/react';

export function Example() {
  return (
    <Tooltip positioning={{ placement: 'top', offset: { mainAxis: 8 } }}>
      <Tooltip.Trigger asChild aria-label="Save">
        <Button>Save</Button>
      </Tooltip.Trigger>
      <Tooltip.Body>
        <Tooltip.Arrow />
        Save changes
      </Tooltip.Body>
    </Tooltip>
  );
}
```

Use `asChild` for custom trigger hosts. The child must stay a single semantic interactive element.
Use `positioning` on `Tooltip` for placement, offset, strategy, collision, and fixed-container
behavior. Use explicit `Tooltip.Positioner` and `Tooltip.Content` when you need positioner-specific
styling or a lower-level Ark-shaped composition path. For shadcn-style migration, `Tooltip.Body` is
the closest equivalent to the common single `TooltipContent` step.

## Upstream feature coverage

Supported Ark examples and patterns:

- basic explicit composition with `Positioner` and `Content`
- controlled `open` with `onOpenChange(details)`
- `RootProvider` with moduix `useTooltip`
- `Body` as a shortcut over `Positioner + Content`
- `Arrow` and `ArrowTip`
- `openDelay` and `closeDelay`
- `positioning`
- multiple triggers via trigger `value` and `onTriggerValueChange(details)`
- fixed-position containers via `positioning.strategy = 'fixed'`

No Ark tooltip form integration or `HiddenInput` is involved because tooltip is not a native form
control.

## Accessibility and state

Ark owns hover, focus, Escape, scroll, and pointer-down behavior. `Tooltip.Trigger` must keep its
own accessible name because tooltip content is supplemental.

Preserve Ark callback shapes:

- `onOpenChange(details)` with `details.open`
- `onTriggerValueChange(details)` with `details.value`

`Tooltip.Body` forwards its ref and props to `Tooltip.Content`, so imperative access still targets
the visible content element.

Relevant Ark attributes and variables:

- `data-scope="tooltip"` and `data-part` on Ark DOM parts
- `data-state="open" | "closed"` on trigger and content
- `data-value`, `data-current`, and `data-expanded` on trigger
- `data-instant`, `data-placement`, and `data-side` on content
- `--available-width`, `--available-height`, `--reference-width`, `--reference-height`, `--x`,
  `--y`, `--z-index`, and `--transform-origin` on the positioner/content path
- `--arrow-size`, `--arrow-size-half`, `--arrow-background`, and `--arrow-offset` for the arrow

## Defaults and styling

The styled tooltip trigger defaults to `--moduix-size-md` with `--moduix-spacing-1` block padding.

Content motion falls back to the shared `--moduix-popup-motion-*` tokens; `--moduix-tooltip-*` motion variables
remain the more specific override.

Default trigger styling is applied only when `Tooltip.Trigger` does not use `asChild`. With
`asChild`, the child component owns visual styling.

`Tooltip.Content` uses Moduix tokens for background, foreground, radius, border, shadow, font size,
and motion. Animations are tied to Ark `data-state` and use Ark `--transform-origin`.

Public CSS variables use the `--moduix-tooltip-*` prefix where Moduix owns the visual contract. Ark runtime
variables remain available for placement and arrow mechanics. `Tooltip.Body` has no DOM node or
`data-slot`; style `Positioner` and `Content` when you need lower-level control.

## Intentional sugar and differences from upstream

The root owns the portal boundary; `Positioner` and `Content` remain tooltip-owned parts.

`Tooltip.Body` removes the repeated `Positioner + Content` ceremony for common tooltips without
introducing a new positioning API.

`Tooltip.Arrow` renders `Tooltip.ArrowTip` by default. Consumers can pass custom children when they
need a custom arrow shape.

## Agent notes

Do not reintroduce legacy compatibility aliases. Tooltip is now an Ark-first popup family member,
matching the explicit composition rules used by migrated popup-like components.

Keep docs and stories on explicit `Positioner` and `Content` composition. Normal advanced state
access uses the moduix `useTooltip` and `useTooltipContext` exports; direct Ark imports remain
escape hatches only.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Reduced the styled tooltip trigger to `--moduix-size-md` and compacted its block padding.

- 2026-07-16: Added shared `--moduix-popup-motion-*` fallbacks for project-wide popup content motion.
- 2026-07-07: Added `Tooltip.Body` as the default shortcut for `Tooltip.Positioner +
Tooltip.Content`, updated docs/examples, and kept the explicit Ark parts available for advanced
  composition.
- 2026-07-12: Restored moduix exports for `useTooltip` and `useTooltipContext` so normal advanced
  composition does not require direct Ark imports.

- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-29: Audited the Ark migration, removed stale story/docs CSS, aligned documented
  trigger state attributes and presence behavior with Ark, and made `--moduix-tooltip-transition` a
  consistent duration token for trigger transitions and content animations.
- 2026-06-21: Migrated Tooltip to Ark UI React. Replaced the legacy high-level
  wrapper contract with explicit Ark parts, Ark state callbacks, provider/context hooks, Ark data
  attributes, and synchronized docs/stories/examples.