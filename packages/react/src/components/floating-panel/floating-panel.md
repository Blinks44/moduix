# FloatingPanel

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/floating-panel
- Zag API: https://zagjs.com/api/mdx/components/react/floating-panel

## Purpose

`FloatingPanel` displays non-modal, detachable content above the main interface. Use it for
inspectors, property panels, small editors, and utility windows that can be dragged, resized,
minimized, or maximized.

## Upstream model to preserve

The component is a thin styled wrapper over `@ark-ui/react/floating-panel`. Preserve Ark part names,
open/position/size/stage state, drag and resize mechanics, boundary handling, focus behavior,
presence lifecycle, and provider/context APIs without remapping callback details.

## Current behavior contract

- `FloatingPanel` and `FloatingPanel.Root` are the same root component.
- `Root` owns `open`, `position`, `size`, and stage transitions unless a controlled prop is passed.
- `Root` and `useFloatingPanel` default `persistRect` to `true` so close animations keep the last
  size and position during Ark presence teardown.
- `onOpenChange`, `onPositionChange`, `onPositionChangeEnd`, `onSizeChange`,
  `onSizeChangeEnd`, and `onStageChange` receive Ark detail objects unchanged.
- `Trigger`, `Positioner`, `Content`, `DragTrigger`, `Header`, `Title`, `Control`,
  `StageTrigger`, `CloseTrigger`, `Body`, and `ResizeTrigger` map directly to Ark parts.
- `StageTrigger` supplies default minimize and maximize icons when children are omitted on the
  default Ark button host.
- `CloseIcon`, `DragIndicator`, and `ResizeTriggerGroup` are moduix helpers layered on top of Ark
  composition.
- `ResizeTriggerGroup` renders all Ark `resizeTriggerAxes`.

## Anatomy and exported parts

```text
FloatingPanel.Root
├─ FloatingPanel.Trigger
└─ Portal
   └─ FloatingPanel.Positioner
      └─ FloatingPanel.Content
         ├─ FloatingPanel.DragTrigger
         │  └─ FloatingPanel.Header
         │     ├─ FloatingPanel.Title
         │     │  └─ FloatingPanel.DragIndicator (moduix)
         │     └─ FloatingPanel.Control
         │        ├─ FloatingPanel.StageTrigger
         │        ├─ FloatingPanel.CloseTrigger
         │        └─ FloatingPanel.CloseIcon (moduix)
         ├─ FloatingPanel.Body
         └─ FloatingPanel.ResizeTrigger / ResizeTriggerGroup
```

Every rendered wrapper adds a stable kebab-case `data-slot`, for example
`floating-panel-content`, `floating-panel-stage-trigger`, and
`floating-panel-resize-trigger`. `Portal` does not render a DOM element.

Exported Ark-aligned state surfaces are `FloatingPanel.RootProvider`,
`FloatingPanel.Context`, `useFloatingPanel`, and `useFloatingPanelContext`.

## Composition

```tsx
import { Button, FloatingPanel, Portal } from '@moduix/react';

export function FloatingPanelDemo() {
  return (
    <FloatingPanel defaultSize={{ width: 360, height: 260 }}>
      <FloatingPanel.Trigger asChild>
        <Button>Open panel</Button>
      </FloatingPanel.Trigger>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header>
                <FloatingPanel.Title>
                  <FloatingPanel.DragIndicator />
                  Inspector
                </FloatingPanel.Title>
                <FloatingPanel.Control>
                  <FloatingPanel.StageTrigger stage="minimized" />
                  <FloatingPanel.StageTrigger stage="maximized" />
                  <FloatingPanel.CloseIcon />
                </FloatingPanel.Control>
              </FloatingPanel.Header>
            </FloatingPanel.DragTrigger>
            <FloatingPanel.Body>Panel content</FloatingPanel.Body>
            <FloatingPanel.ResizeTriggerGroup />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel>
  );
}
```

Use `asChild` with one semantic child when a trigger or control should use another component's
visuals. `StageTrigger` default icons are not injected for `asChild`; the child owns its semantics
and accessible name.

## Upstream feature coverage

- Basic detached panel composition, controlled open state, controlled position, controlled size,
  anchor-derived initial position, context render-prop access, `useFloatingPanel`, `RootProvider`,
  lazy mounting, and exit lifecycle props are supported.
- Dragging, resizing, `minSize`, `maxSize`, `lockAspectRatio`, `gridSize`, `allowOverflow`,
  `getBoundaryEl`, `draggable`, `resizable`, `disabled`, `persistRect`, `strategy`, `ids`,
  `translations`, `present`, `lazyMount`, and `unmountOnExit` pass through Ark unchanged.
- Stage transitions use Ark stage values: `default`, `minimized`, and `maximized`.
- `ResizeTrigger` requires an Ark axis. `ResizeTriggerGroup` is only a convenience for rendering all
  axes.

## Accessibility and state

- Ark wires trigger/content/title/header IDs through `ids` and manages Escape handling through
  `closeOnEscape`.
- The panel is non-modal: it does not trap focus, lock scroll, or hide outside content from
  assistive technology.
- `DragTrigger` and `ResizeTrigger` preserve Ark pointer interaction and disabled state.
- `Trigger` exposes `data-state` and `data-dragging`.
- `Content`, `Header`, and `Body` expose stage and drag state attributes such as `data-dragging`,
  `data-minimized`, `data-maximized`, and `data-staged`.
- `Content` additionally exposes `data-topmost` and `data-behind`; `ResizeTrigger` exposes
  `data-axis`.
- `Positioner` exposes Ark runtime variables such as `--width`, `--height`, `--x`, `--y`,
  `--available-width`, `--available-height`, `--reference-width`, `--reference-height`,
  `--z-index`, and `--transform-origin`.

## Defaults and styling

The wrappers preserve Ark `data-scope` and `data-part` attributes and add stable `data-slot` hooks.
Styling uses moduix color, radius, shadow, spacing, typography, z-index, and motion tokens.

Open and close animations target `[data-state='open']` and `[data-state='closed']`. The wrapper
defaults `persistRect` to `true` so close animations keep the last Ark position and size instead of
flashing at the viewport origin during presence teardown. Stage styling uses Ark's
`[data-minimized]`, `[data-maximized]`, and `[data-staged]` attributes.

The public `--floating-panel-*` variables are declared in `theme.css`. Position and size are owned
by Ark runtime variables on `Positioner`; the wrapper does not duplicate those measurements.

## Intentional sugar and differences from upstream

- `FloatingPanel.CloseIcon` composes Ark `CloseTrigger` with the shared `CloseButton`.
- `FloatingPanel.StageTrigger` renders the shared `MinusIcon` and `MaximizeIcon` by default for the
  `minimized` and `maximized` stages when it renders Ark's default button host.
- `FloatingPanel.DragIndicator` renders the shared grip icon for title/header composition.
- `FloatingPanel.ResizeTriggerGroup` renders all Ark resize handles from `resizeTriggerAxes`.
- No custom state adapters, modal behavior, backdrop, synthetic restore icon, or renamed Ark
  callbacks are added.

## Agent notes

- Keep `Portal`, `FloatingPanel.Positioner`, and `FloatingPanel.Content` explicit in public
  examples.
- Keep Ark callback detail objects unchanged.
- Do not replace Ark drag, resize, boundary, stage, or presence behavior with local state.
- Keep helper parts visual only; they must not hide required Ark parts or alter focus management.

## Local changelog

- 2026-06-25: Preserved `StageTrigger asChild` semantics by limiting default icons to the default
  Ark button host and normalized floating-panel size defaults to the shared spacing/size scale.
- 2026-06-22: Restored close animation by defaulting `persistRect` to `true` on `Root` and
  `useFloatingPanel`.
- 2026-06-22: Added Storybook coverage and completed docs snippets so examples are closed by
  default and show full imports/composition.
- 2026-06-22: Added the Ark-backed `FloatingPanel` wrapper, styling contract, helper parts, public
  docs, and registry integration.