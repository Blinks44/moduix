# FloatingPanel

## Upstream reference

Reviewed on 2026-08-10:

- Ark UI: https://ark-ui.com/docs/components/floating-panel
- Chakra UI: https://www.chakra-ui.com/docs/components/floating-panel
- Zag API: https://zagjs.com/api/mdx/components/react/floating-panel
- shadcn/ui: no matching floating-panel primitive in the component catalog:
  https://ui.shadcn.com/docs/components

## Purpose

`FloatingPanel` displays non-modal, detachable content above the main interface. Use it for
inspectors, property panels, small editors, and utility windows that can be dragged, resized,
minimized, or maximized.

## Upstream model to preserve

The component is a thin styled wrapper over `@ark-ui/react/floating-panel`. Preserve Ark part names,
open/position/size/stage state, drag and resize mechanics, boundary handling, focus behavior,
presence lifecycle, and `FloatingPanelRootProvider` support without remapping callback details.

## Current behavior contract

`FloatingPanel` and `FloatingPanelRootProvider` portal `FloatingPanelPositioner` automatically by
default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container.
The structural parts remain explicit and independently styleable.

- `FloatingPanel` is the root component and owns `open`, `position`, `size`, and stage transitions
  unless a controlled prop is passed.
- `FloatingPanel` defaults `closeOnEscape` and `persistRect` to `true`. Escape closes the focused topmost
  panel, while `persistRect` keeps the last size and position during Ark presence teardown.
- `onOpenChange`, `onPositionChange`, `onPositionChangeEnd`, `onSizeChange`,
  `onSizeChangeEnd`, and `onStageChange` receive Ark detail objects unchanged.
- `FloatingPanelTrigger`, `FloatingPanelPositioner`, `FloatingPanelContent`,
  `FloatingPanelDragTrigger`, `FloatingPanelHeader`, `FloatingPanelTitle`, `FloatingPanelControl`,
  `FloatingPanelStageTrigger`, `FloatingPanelCloseTrigger`, `FloatingPanelBody`, and
  `FloatingPanelResizeTrigger` map directly to Ark parts.
- `FloatingPanelStageTrigger` supplies default minimize, maximize, and restore icons when children are omitted
  on the default Ark button host. Ark only shows restore while the panel is minimized or maximized.
- `FloatingPanelCloseIcon`, `FloatingPanelDragIndicator`, `FloatingPanelFooter`, and
  `FloatingPanelResizeTriggerGroup` are moduix helpers layered on
  top of Ark composition.
- `FloatingPanelResizeTriggerGroup` renders all Ark `resizeTriggerAxes` by default or a caller-provided subset.

## Anatomy and exported parts

```text
FloatingPanel
├─ FloatingPanelTrigger
└─ Overlay subtree (automatically portalled)
   └─ FloatingPanelPositioner
      └─ FloatingPanelContent
         ├─ FloatingPanelDragTrigger
         │  └─ FloatingPanelHeader
         │     ├─ FloatingPanelTitle
         │     │  └─ FloatingPanelDragIndicator (moduix)
         │     └─ FloatingPanelControl
         │        ├─ FloatingPanelStageTrigger
         │        ├─ FloatingPanelCloseTrigger
         │        └─ FloatingPanelCloseIcon (moduix)
         ├─ FloatingPanelBody
         ├─ FloatingPanelFooter (moduix)
         └─ FloatingPanelResizeTrigger / FloatingPanelResizeTriggerGroup
```

Every rendered wrapper adds a stable kebab-case `data-slot`, for example
`floating-panel-content`, `floating-panel-stage-trigger`, and
`floating-panel-resize-trigger`. The internal portal transport does not render a DOM element.

`FloatingPanelRootProvider` stays public for externally owned state. `FloatingPanelContext`,
`useFloatingPanel`, and `useFloatingPanelContext` provide the Ark state
surfaces through the moduix namespace.

## Composition

```tsx
import { Button } from '@moduix/react/button';
import {
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseIcon,
  FloatingPanelControl,
  FloatingPanelContent,
  FloatingPanelDragIndicator,
  FloatingPanelDragTrigger,
  FloatingPanelFooter,
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
} from '@moduix/react/floating-panel';

export function FloatingPanelDemo() {
  return (
    <FloatingPanel defaultSize={{ width: 360, height: 260 }}>
      <FloatingPanelTrigger asChild>
        <Button>Open panel</Button>
      </FloatingPanelTrigger>
      <FloatingPanelPositioner>
        <FloatingPanelContent>
          <FloatingPanelDragTrigger>
            <FloatingPanelHeader>
              <FloatingPanelTitle>
                <FloatingPanelDragIndicator />
                Inspector
              </FloatingPanelTitle>
              <FloatingPanelControl>
                <FloatingPanelStageTrigger stage="minimized" />
                <FloatingPanelStageTrigger stage="maximized" />
                <FloatingPanelCloseIcon />
              </FloatingPanelControl>
            </FloatingPanelHeader>
          </FloatingPanelDragTrigger>
          <FloatingPanelBody>Panel content</FloatingPanelBody>
          <FloatingPanelFooter>Status: synced</FloatingPanelFooter>
          <FloatingPanelResizeTriggerGroup />
        </FloatingPanelContent>
      </FloatingPanelPositioner>
    </FloatingPanel>
  );
}
```

Use `asChild` with one semantic child when a trigger or control should use another component's
visuals. `FloatingPanelStageTrigger` default icons are not injected for `asChild`; the child owns its semantics
and accessible name.

## Upstream feature coverage

- Basic detached panel composition, controlled open state, controlled position, controlled size,
  anchor-derived initial position, context render-prop access, `useFloatingPanel`,
  `FloatingPanelRootProvider`, lazy mounting, and exit lifecycle props are supported.
- Dragging, resizing, `minSize`, `maxSize`, `lockAspectRatio`, `gridSize`, `allowOverflow`,
  `getBoundaryEl`, `draggable`, `resizable`, `disabled`, `closeOnEscape`, `persistRect`, `strategy`, `ids`,
  `translations`, `present`, `lazyMount`, and `unmountOnExit` pass through Ark unchanged. The default
  stage-control icons preserve Ark's translated accessible labels.
- Stage transitions use Ark stage values: `default`, `minimized`, and `maximized`.
- `FloatingPanelResizeTrigger` requires an Ark axis. `FloatingPanelResizeTriggerGroup` renders all axes by default or a subset
  through `axes`.

## Accessibility and state

- Ark wires trigger/content/title/header IDs through `ids` and manages Escape handling through
  `closeOnEscape`.
- `FloatingPanelContent` has `role="dialog"`; when it has focus, Arrow keys move the panel by `gridSize` and
  honor `dir`. Use `initialFocusEl`, `finalFocusEl`, and `restoreFocus` for explicit focus handoff.
- The panel is non-modal: it does not trap focus, lock scroll, or hide outside content from
  assistive technology.
- `FloatingPanelDragTrigger` and `FloatingPanelResizeTrigger` preserve Ark pointer interaction and disabled state.
- `FloatingPanelTrigger` exposes `data-state` and `data-dragging`.
- `FloatingPanelContent`, `FloatingPanelHeader`, and `FloatingPanelBody` expose stage and drag state attributes such as `data-dragging`,
  `data-minimized`, `data-maximized`, and `data-staged`.
- `FloatingPanelContent` additionally exposes `data-topmost` and `data-behind`; `FloatingPanelResizeTrigger` exposes
  `data-axis`.
- `FloatingPanelPositioner` exposes Ark runtime variables such as `--width`, `--height`, `--x`, `--y`,
  `--available-width`, `--available-height`, `--reference-width`, `--reference-height`,
  `--z-index`, and `--transform-origin`.

## Defaults and styling

The visible trigger defaults to `--moduix-size-md`; title-bar control buttons use `--moduix-size-sm`.

`FloatingPanelContent` motion falls back to the shared `--moduix-popup-motion-*` tokens; `--moduix-floating-panel-*` motion
variables remain the more specific override.

The wrappers preserve Ark `data-scope` and `data-part` attributes and add stable `data-slot` hooks.
Styling uses moduix color, radius, shadow, spacing, typography, z-index, and motion tokens.

Open and close animations target `[data-state='open']` and `[data-state='closed']`. The wrapper
defaults `persistRect` to `true` so close animations keep the last Ark position and size instead of
flashing at the viewport origin during presence teardown. Stage styling uses Ark's
`[data-minimized]`, `[data-maximized]`, and `[data-staged]` attributes.

The public `--moduix-floating-panel-*` variables are declared in `variables-moduix.css`. Position, size, and resize
handle geometry are owned by Ark runtime styles; configure them with Ark state props rather than CSS.

## Intentional sugar and differences from upstream

- `FloatingPanelCloseIcon` composes Ark `CloseTrigger` with the shared `CloseButton`.
- `FloatingPanelStageTrigger` renders the shared `MinusIcon` and `MaximizeIcon` by default for the
  `minimized` and `maximized` stages, and `RestoreIcon` for the `default` stage, when it renders
  Ark's default button host.
- `FloatingPanelDragIndicator` renders the shared grip icon for title/header composition.
- `FloatingPanelFooter` is a plain layout helper for status rows or action groups below the body.
- `FloatingPanelResizeTriggerGroup` renders all Ark resize handles from `resizeTriggerAxes` by
  default; pass `axes` to render a subset.
- `FloatingPanelContext`, `useFloatingPanel`, and
  `useFloatingPanelContext` expose Ark state surfaces through the moduix namespace.
- `useFloatingPanel` callers should pass `persistRect: true` when they want the same
  close-animation behavior as the moduix root default.
- `useFloatingPanel` callers should also pass `closeOnEscape: true` when they want the
  root default. Escape is handled by the focused topmost `FloatingPanelContent`; use `autoFocus` when it should
  receive focus on open.
- No custom state adapters, modal behavior, backdrop, synthetic restore icon, or renamed Ark
  callbacks are added.

## Agent notes

- Keep `FloatingPanelPositioner` and `FloatingPanelContent` explicit in public
  examples.
- Keep Ark callback detail objects unchanged.
- Do not replace Ark drag, resize, boundary, stage, or presence behavior with local state.
- Keep helper parts visual only; they must not hide required Ark parts or alter focus management.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.

## Local changelog

- 2026-08-01: Defaulted portalled overlay presence to lazy mounting and unmounting after exit.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Reduced the default floating-panel trigger to `--moduix-size-md` and compacted its block padding.

- 2026-07-16: Added shared `--moduix-popup-motion-*` fallbacks for project-wide popup content motion.
- 2026-07-10: Re-exported Ark state surfaces through `FloatingPanel`, added `FloatingPanelResizeTriggerGroup.axes`,
  defaulted `closeOnEscape` on `Root`, added the default restore control, and made the docs use the
  moduix state API as the recommended path.
- 2026-07-05: Added `FloatingPanelFooter` so panel layouts can expose a consistent bottom action or status row without hiding Ark parts.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-25: Preserved `FloatingPanelStageTrigger asChild` semantics by limiting default icons to the default
  Ark button host and normalized floating-panel size defaults to the shared spacing/size scale.
- 2026-06-22: Restored close animation by defaulting `persistRect` to `true` on `Root` and
  `useFloatingPanel`.
- 2026-06-22: Added Storybook coverage and completed docs snippets so examples are closed by
  default and show full imports/composition.
- 2026-06-22: Added the Ark-backed `FloatingPanel` wrapper, styling contract, helper parts, public
  docs, and registry integration.
