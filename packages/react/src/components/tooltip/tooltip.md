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
  <TooltipTrigger />
  <TooltipPositioner>
    <TooltipContent>
      <TooltipArrow>
        <TooltipArrowTip />
      </TooltipArrow>
    </TooltipContent>
  </TooltipPositioner>
</Tooltip>
```

Ark is the source of truth for controlled state, callback detail objects, positioning, `ids`,
presence props, `TooltipRootProvider`, and the advanced state hooks available directly from
`@ark-ui/react/tooltip`.

## Current behavior contract

`Tooltip` and `TooltipRootProvider` portal `TooltipPositioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

`Tooltip` is the root component and the adapter exports these Ark-aligned parts:

- `Tooltip`
- `TooltipRootProvider`
- `TooltipTrigger`
- `TooltipDisabledTrigger`
- `TooltipBody`
- `TooltipPositioner`
- `TooltipContent`
- `TooltipArrow`
- `TooltipArrowTip`

For externally owned state, use the moduix exports `useTooltip` and `useTooltipContext` with
`TooltipRootProvider`.

The wrapper adds default Moduix styling, stable `data-slot` hooks, and three narrow sugars:
`TooltipDisabledTrigger` makes a disabled native control focusable for an explanatory tooltip,
`TooltipBody` renders `TooltipPositioner` and `TooltipContent` together, and `TooltipArrow`
renders `TooltipArrowTip` by default when no children are provided.

## Anatomy and exported parts

| Part                     | `data-slot`                | Notes                                                         |
| ------------------------ | -------------------------- | ------------------------------------------------------------- |
| `Tooltip`                | none                       | No DOM wrapper; owns Ark tooltip state.                       |
| `TooltipRootProvider`    | none                       | Renders from an external `useTooltip()` state object.         |
| `TooltipBody`            | none                       | Shortcut for `TooltipPositioner + TooltipContent`.            |
| `TooltipTrigger`         | `tooltip-trigger`          | Ref forwards to the Ark trigger button.                       |
| `TooltipDisabledTrigger` | `tooltip-disabled-trigger` | Focusable wrapper for one disabled native control.            |
| `TooltipPositioner`      | `tooltip-positioner`       | Ref forwards to the Ark positioner div.                       |
| `TooltipContent`         | `tooltip-content`          | Ref forwards to the visible Ark content div.                  |
| `TooltipArrow`           | `tooltip-arrow`            | Ref forwards to the Ark arrow div; renders `TooltipArrowTip`. |
| `TooltipArrowTip`        | `tooltip-arrow-tip`        | Ref forwards to the Ark arrow tip div.                        |

## Composition

```tsx
import { Button } from '@moduix/react/button';
import { Tooltip } from '@moduix/react/tooltip';

export function Example() {
  return (
    <Tooltip positioning={{ placement: 'top', offset: { mainAxis: 8 } }}>
      <TooltipTrigger asChild aria-label="Save">
        <Button>Save</Button>
      </TooltipTrigger>
      <TooltipBody>Save changes</TooltipBody>
    </Tooltip>
  );
}
```

Use `asChild` for custom trigger hosts. The child must stay a single semantic interactive element.
Use `TooltipDisabledTrigger` around one disabled native control when it needs an explanatory
tooltip; give the wrapper its own accessible name. The regular `TooltipTrigger` remains the
Ark-shaped path for every enabled trigger.
Use `positioning` on `Tooltip` for placement, offset, strategy, collision, and fixed-container
behavior. Use explicit `TooltipPositioner` and `TooltipContent` when you need positioner-specific
styling or a lower-level Ark-shaped composition path. For shadcn-style migration, `TooltipBody` is
the closest equivalent to the common single `TooltipContent` step.

## Upstream feature coverage

Supported Ark examples and patterns:

- basic explicit composition with `Positioner` and `Content`
- controlled `open` with `onOpenChange(details)`
- `TooltipRootProvider` with moduix `useTooltip`
- `TooltipBody` as a shortcut over `TooltipPositioner + TooltipContent`
- `DisabledTrigger` for the common disabled-native-control wrapper
- `Arrow` and `ArrowTip`
- `openDelay` and `closeDelay`
- `positioning`
- multiple triggers via trigger `value` and `onTriggerValueChange(details)`
- fixed-position containers via `positioning.strategy = 'fixed'`

No Ark tooltip form integration or `HiddenInput` is involved because tooltip is not a native form
control.

## Accessibility and state

Ark owns hover, focus, Escape, scroll, and pointer-down behavior. `TooltipTrigger` must keep its
own accessible name because tooltip content is supplemental.

`TooltipDisabledTrigger` keeps its wrapper in the tab sequence and makes its disabled direct child
ignore pointer events, so the tooltip remains discoverable by pointer and keyboard. It is for a
single disabled native control, not for arbitrary composite content.

Preserve Ark callback shapes:

- `onOpenChange(details)` with `details.open`
- `onTriggerValueChange(details)` with `details.value`

`TooltipBody` forwards its ref and props to `TooltipContent`, so imperative access still targets
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

Default trigger styling is applied only when `TooltipTrigger` does not use `asChild`. With
`asChild`, the child component owns visual styling.

`TooltipContent` uses Moduix tokens for background, foreground, radius, border, shadow, font size,
and motion. Animations are tied to Ark `data-state` and use Ark `--transform-origin`. It wraps
long unbroken text, and respects `prefers-reduced-motion` by disabling trigger transitions and
content animations. Tooltip remains for short, non-essential hints; use Popover or HoverCard for
long or interactive content.

Public CSS variables use the `--moduix-tooltip-*` prefix where Moduix owns the visual contract. Ark runtime
variables remain available for placement and arrow mechanics. `TooltipBody` has no DOM node or
`data-slot`; style `Positioner` and `Content` when you need lower-level control.

## Intentional sugar and differences from upstream

The root owns the portal boundary; `Positioner` and `Content` remain tooltip-owned parts.

`TooltipBody` removes the repeated `Positioner + Content` ceremony for common tooltips without
introducing a new positioning API.

`TooltipArrow` renders `TooltipArrowTip` by default. Add it when the popup needs a visual anchor;
consumers can pass custom children when they need a custom arrow shape.

`TooltipDisabledTrigger` replaces the repeated focusable wrapper and pointer-events rule needed for
a disabled native control. It keeps the lower-level `TooltipTrigger asChild` path available when a
different trigger host is required.

## Agent notes

Do not reintroduce legacy compatibility aliases. Tooltip is now an Ark-first popup family member,
matching the explicit composition rules used by migrated popup-like components.

Keep docs and stories on explicit `Positioner` and `Content` composition. Normal advanced state
access uses the moduix `useTooltip` and `useTooltipContext` exports; direct Ark imports remain
escape hatches only.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.

## Local changelog

- 2026-08-14: Added reduced-motion handling and coverage for keyboard dismissal, provider state,
  multiple triggers, portalling, and the default arrow tip.

- 2026-08-11: Made the recommended popup composition arrowless and kept `TooltipArrow` as an
  explicit visual-anchor option.

- 2026-08-01: Defaulted portalled overlay presence to lazy mounting and unmounting after exit.

- 2026-08-01: Added `TooltipDisabledTrigger` for accessible disabled native controls, made long
  unbroken tooltip text wrap safely, and synchronized component tests and consumer-facing docs
  examples.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Reduced the styled tooltip trigger to `--moduix-size-md` and compacted its block padding.

- 2026-07-16: Added shared `--moduix-popup-motion-*` fallbacks for project-wide popup content motion.
- 2026-07-07: Added `TooltipBody` as the default shortcut for `TooltipPositioner +
TooltipContent`, updated docs/examples, and kept the explicit Ark parts available for advanced
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