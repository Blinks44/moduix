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
  <Portal>
    <Tooltip.Positioner>
      <Tooltip.Content>
        <Tooltip.Arrow>
          <Tooltip.ArrowTip />
        </Tooltip.Arrow>
      </Tooltip.Content>
    </Tooltip.Positioner>
  </Portal>
</Tooltip>
```

Ark is the source of truth for controlled state, callback detail objects, positioning, `ids`,
presence props, `Context`, `RootProvider`, `useTooltip`, and `useTooltipContext`.

## Current behavior contract

`Tooltip` is the root component and also exposes Ark-aligned namespace parts:

- `Tooltip.Root`
- `Tooltip.RootProvider`
- `Tooltip.Trigger`
- `Tooltip.Positioner`
- `Tooltip.Content`
- `Tooltip.Arrow`
- `Tooltip.ArrowTip`
- `Tooltip.Context`

The package also exports `useTooltip`, `useTooltipContext`, `TooltipOpenChangeDetails`,
`TooltipTriggerValueChangeDetails`, `UseTooltipContext`, `UseTooltipProps`, and
`UseTooltipReturn`.

The wrapper adds default Moduix styling, stable `data-slot` hooks, and one narrow sugar:
`Tooltip.Arrow` renders `Tooltip.ArrowTip` by default when no children are provided.

## Anatomy and exported parts

| Part               | `data-slot`          | Notes                                                  |
| ------------------ | -------------------- | ------------------------------------------------------ |
| `Tooltip` / `Root` | none                 | No DOM wrapper; owns Ark tooltip state.                |
| `RootProvider`     | none                 | Renders from an external `useTooltip()` state object.  |
| `Trigger`          | `tooltip-trigger`    | Ref forwards to the Ark trigger button.                |
| `Positioner`       | `tooltip-positioner` | Ref forwards to the Ark positioner div.                |
| `Content`          | `tooltip-content`    | Ref forwards to the visible Ark content div.           |
| `Arrow`            | `tooltip-arrow`      | Ref forwards to the Ark arrow div; renders `ArrowTip`. |
| `ArrowTip`         | `tooltip-arrow-tip`  | Ref forwards to the Ark arrow tip div.                 |
| `Context`          | none                 | Ark render-prop state access.                          |

## Composition

```tsx
import { Button, Portal, Tooltip } from '@moduix/react';

export function Example() {
  return (
    <Tooltip positioning={{ placement: 'top', offset: { mainAxis: 8 } }}>
      <Tooltip.Trigger asChild aria-label="Save">
        <Button>Save</Button>
      </Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Save changes
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip>
  );
}
```

Use `asChild` for custom trigger hosts. The child must stay a single semantic interactive element.
Use `positioning` on `Tooltip` for placement, offset, strategy, collision, and fixed-container
behavior.

## Upstream feature coverage

Supported Ark examples and patterns:

- basic explicit composition with `Portal`, `Positioner`, and `Content`
- controlled `open` with `onOpenChange(details)`
- `RootProvider` with `useTooltip`
- `Arrow` and `ArrowTip`
- `openDelay` and `closeDelay`
- `positioning`
- `Tooltip.Context`
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

Relevant Ark attributes and variables:

- `data-scope="tooltip"` and `data-part` on Ark DOM parts
- `data-state="open" | "closed"` on trigger and content
- `data-value`, `data-current`, and `data-expanded` on trigger
- `data-instant`, `data-placement`, and `data-side` on content
- `--available-width`, `--available-height`, `--reference-width`, `--reference-height`, `--x`,
  `--y`, `--z-index`, and `--transform-origin` on the positioner/content path
- `--arrow-size`, `--arrow-size-half`, `--arrow-background`, and `--arrow-offset` for the arrow

## Defaults and styling

Default trigger styling is applied only when `Tooltip.Trigger` does not use `asChild`. With
`asChild`, the child component owns visual styling.

`Tooltip.Content` uses Moduix tokens for background, foreground, radius, border, shadow, font size,
and motion. Animations are tied to Ark `data-state` and use Ark `--transform-origin`.

Public CSS variables use the `--tooltip-*` prefix where Moduix owns the visual contract. Ark runtime
variables remain available for placement and arrow mechanics.

## Intentional sugar and differences from upstream

`Portal` is imported separately from `@moduix/react` because it is the shared Ark Portal utility,
not a tooltip-owned part.

`Tooltip.Arrow` renders `Tooltip.ArrowTip` by default. Consumers can pass custom children when they
need a custom arrow shape.

## Agent notes

Do not reintroduce legacy compatibility aliases. Tooltip is now an Ark-first popup family member,
matching the explicit composition rules used by migrated popup-like components.

Keep docs and stories on explicit popup composition with separate `Portal`. If upstream adds new
exported tooltip state helpers, mirror them from this wrapper and `index.ts` unless there is a
documented reason not to.

## Local changelog

- 2026-06-29: Audited the Ark migration, removed stale story/docs CSS, aligned documented
  trigger state attributes and presence behavior with Ark, and made `--tooltip-transition` a
  consistent duration token for trigger transitions and content animations.
- 2026-06-22: Removed the `Tooltip.Portal` namespace alias; examples now import the shared
  `Portal` from `@moduix/react`.
- 2026-06-21: Migrated Tooltip to Ark UI React. Replaced the legacy high-level
  wrapper contract with explicit Ark parts, Ark state callbacks, provider/context hooks, Ark data
  attributes, and synchronized docs/stories/examples.