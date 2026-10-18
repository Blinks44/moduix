# Popover

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/popover
- Chakra UI: https://chakra-ui.com/docs/components/popover
- shadcn/ui: https://ui.shadcn.com/docs/components/popover

Last compared: 2026-10-18.

## Purpose

`Popover` displays compact interactive content anchored to a trigger or a separate anchor element.
Use `Dialog` for larger or strongly interruptive workflows and `Tooltip` for non-interactive hints.

## Upstream model to preserve

The component is a thin styled wrapper over `@ark-ui/react/popover`. Preserve Ark part names,
controlled state details, focus management, dismiss behavior, positioning options, nesting, presence,
and provider/context APIs without remapping them.

## Current behavior contract

- `Popover` is the root component; it does not render a DOM element.
- `PopoverPositioner` is portalled by default. Set `portalled={false}` to render it inline, or pass
  `portalRef` to target a custom container. A `modal` popover stays portalled even with
  `portalled={false}`.
- `PopoverRootProvider` connects the parts to `usePopover()` state. Configure `portalled` in the
  hook; the provider accepts only `portalRef`. Do not render `Popover` for the same state.
- `lazyMount` and `unmountOnExit` default to `true` (Ark defaults to `false`): content is absent
  until the first open and removed after its exit animation.
- Positioning is configured through `positioning` on `Popover` or `usePopover`, not on
  `PopoverPositioner` or `PopoverContent`.
- `PopoverTrigger` and `PopoverCloseTrigger` render outlined buttons only when `asChild` is not
  used. While a shared popover is open, only the trigger with `data-current` is highlighted.
- `PopoverCloseIcon` composes `PopoverCloseTrigger` with `CloseButton`, defaults its label to
  `Close popover`, and sits in the content's top-end corner. `PopoverHeader` reserves space for it
  whenever it is present in the content.
- `PopoverArrow` renders `PopoverArrowTip` when it has no children.
- `PopoverHeader`, `PopoverBody`, and `PopoverFooter` are layout helpers. `PopoverBody` is spaced
  from a preceding `PopoverHeader` and scrolls when it is a direct child of `PopoverContent` and the
  content reaches its height limit. Keep `PopoverArrow`, `PopoverHeader`, and `PopoverFooter`
  outside `PopoverBody`.

## Anatomy and exported parts

```text
Popover
├─ PopoverAnchor (optional)
├─ PopoverTrigger
│  └─ PopoverIndicator (optional)
└─ PopoverPositioner (portalled)
   └─ PopoverContent
      ├─ PopoverArrow
      │  └─ PopoverArrowTip
      ├─ PopoverCloseIcon
      ├─ PopoverHeader
      │  ├─ PopoverTitle
      │  └─ PopoverDescription
      ├─ PopoverBody
      └─ PopoverFooter
         └─ PopoverCloseTrigger
```

Every rendered part has `data-slot="popover-<part>"` in kebab-case. `Popover`,
`PopoverRootProvider`, and `PopoverContext` render no DOM. The package also exports `usePopover`,
`usePopoverContext`, `PopoverRootProps`, `PopoverRootProviderProps`, and the Ark part prop, event,
detail, and hook types.

## Composition

```tsx
import { Button } from '@moduix/react/button';
import {
  Popover,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/react/popover';

export function PopoverDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverTrigger asChild>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverCloseIcon />
          <PopoverHeader>
            <PopoverTitle>Project status</PopoverTitle>
            <PopoverDescription>Everything is on schedule.</PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <PopoverCloseTrigger>Close</PopoverCloseTrigger>
          </PopoverFooter>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}
```

The docs "Advanced customization" example builds the popup without the moduix helpers:
`PopoverCloseTrigger asChild` around `CloseButton` and an explicit `PopoverArrowTip`.

## Accessibility and state

Ark owns open state, focus management, dismissal, IDs, ARIA relationships, and positioning. In
`modal` mode Ark traps focus, blocks outside interaction and scrolling, and hides outside content
from assistive technology. Callbacks receive Ark detail and event objects unchanged.

`PopoverTrigger` exposes `data-state`, `data-placement`, and, with `value`, `data-value` and
`data-current`. `PopoverContent` exposes `data-state`, `data-placement`, `data-side`,
`data-nested`, `data-has-nested`, and `data-expanded`. `PopoverPositioner` exposes
`--reference-width`, `--reference-height`, `--available-width`, `--available-height`, `--x`, `--y`,
`--z-index`, and `--transform-origin`; `PopoverContent` exposes `--layer-index` and
`--nested-layer-count`.

## Defaults and styling

Content is 16–28rem wide and at most 24rem tall, limited by `--available-width` and
`--available-height`. It stays overflow-visible so an in-surface `PopoverArrow` is not clipped. Long
unbroken text wraps. Content motion uses the shared `moduix-popup-in` and `moduix-popup-out`
keyframes, which read the `--moduix-popup-motion-*` variables, and is disabled when the user
requests reduced motion.

CSS Modules have no `--moduix-popover-*` variables: styles come from foundation tokens, so override
them with a class on the part. Tailwind variants use the same tokens through theme utilities.

## Agent notes

- Keep `PopoverPositioner` and `PopoverContent` explicit in public examples.
- Keep positioning options on `Popover` and `usePopover`.
- Do not add `Backdrop`, `Popup`, `Viewport`, `openOnHover`, `render`, `handle`, or `showArrow`.
- Mirror future Ark provider, context, hook, part, or public type additions through the barrel.