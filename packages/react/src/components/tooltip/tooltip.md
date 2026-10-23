# Tooltip

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/tooltip
- Chakra UI: https://chakra-ui.com/docs/components/tooltip
- shadcn/ui: https://ui.shadcn.com/docs/components/tooltip

Last compared: 2026-10-23.

## Purpose

`Tooltip` shows a short, non-interactive hint when its trigger is hovered or focused. Use `Popover`
or `HoverCard` for long or interactive content.

## Upstream model to preserve

The component is a thin styled wrapper over `@ark-ui/react/tooltip`. Preserve Ark part names,
controlled state details, delays, dismiss behavior, positioning options, multiple triggers, presence,
and provider/context APIs without remapping them.

## Current behavior contract

- `Tooltip` is the root component; it does not render a DOM element.
- `TooltipPositioner` is portalled by default. Set `portalled={false}` on `Tooltip` or
  `TooltipRootProvider` to render it inline, or pass `portalRef` to target a custom container.
- `TooltipRootProvider` connects the parts to `useTooltip()` state. Do not render `Tooltip` for the
  same state.
- `lazyMount` and `unmountOnExit` default to `true` (Ark defaults to `false`): content is absent
  until the first open and removed after its exit animation.
- Positioning is configured through `positioning` on `Tooltip` or `useTooltip`.
- `TooltipTrigger` renders an outlined button only when `asChild` is not used. While a shared
  tooltip is open, only the trigger with `data-current` is highlighted.
- `TooltipDisabledTrigger` renders Ark trigger behavior on a focusable `span` (`tabIndex` defaults to
  `0`) around one disabled native control and makes that child ignore pointer events. Give the
  wrapper its own accessible name.
- `TooltipBody` renders `TooltipPositioner` and `TooltipContent` and forwards props and ref to the
  content. It has no DOM node or `data-slot` of its own.
- `TooltipArrow` renders `TooltipArrowTip` when it has no children.

## Anatomy and exported parts

```text
Tooltip
├─ TooltipTrigger | TooltipDisabledTrigger
└─ TooltipPositioner (portalled)
   └─ TooltipContent
      ├─ TooltipArrow (optional)
      │  └─ TooltipArrowTip
      └─ content
```

Every rendered part has `data-slot="tooltip-<part>"` in kebab-case. `Tooltip`,
`TooltipRootProvider`, `TooltipContext`, and `TooltipBody` render no DOM of their own. The package
also exports `useTooltip`, `useTooltipContext`, `TooltipRootProps`, `TooltipRootProviderProps`, and
the Ark part prop, detail, and hook types.

## Composition

```tsx
import { Button } from '@moduix/react/button';
import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/react/tooltip';

export function TooltipDemo() {
  return (
    <Tooltip positioning={{ placement: 'top', offset: { mainAxis: 8 } }}>
      <TooltipTrigger asChild>
        <Button>Save</Button>
      </TooltipTrigger>
      <TooltipBody>Save changes</TooltipBody>
    </Tooltip>
  );
}
```

The docs "Advanced customization" example uses explicit `TooltipPositioner` and `TooltipContent`
instead of `TooltipBody`.

## Accessibility and state

Ark owns hover and focus opening, delays, Escape, scroll, and pointer-down dismissal, IDs, and
`aria-describedby`. Tooltip content is supplemental: the trigger keeps its own accessible name.
Callbacks receive Ark details unchanged: `onOpenChange(details)` and
`onTriggerValueChange(details)`.

`TooltipTrigger` exposes `data-state`, `data-expanded`, and, with `value`, `data-value` and
`data-current`. `TooltipContent` exposes `data-state`, `data-placement`, `data-side`, and
`data-instant`. `TooltipPositioner` exposes `--reference-width`, `--reference-height`,
`--available-width`, `--available-height`, `--x`, `--y`, `--z-index`, and `--transform-origin`.

## Defaults and styling

Content is at most 20rem wide, limited by `--available-width`, and grows with its text; long
unbroken text wraps. Content motion uses the shared `moduix-popup-in` and `moduix-popup-out`
keyframes, which read the `--moduix-popup-motion-*` variables. Motion is skipped when Ark sets
`data-instant` (switching between tooltips) and when the user requests reduced motion.

CSS Modules have no `--moduix-tooltip-*` variables: styles come from foundation tokens, so override
them with a class on the part. Tailwind variants use the same tokens through theme utilities.

## Agent notes

- Keep `TooltipPositioner` and `TooltipContent` explicit in the advanced example; `TooltipBody` is
  the shortcut for ordinary examples.
- Keep positioning options on `Tooltip` and `useTooltip`.
- Mirror future Ark provider, context, hook, part, or public type additions through the barrel.