# FloatingPanel

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/floating-panel
- Chakra UI: https://chakra-ui.com/docs/components/floating-panel
- shadcn/ui has no floating panel.

## Purpose

`FloatingPanel` is a non-modal window for inspectors, property panels, and utility tools that users
can drag, resize, minimize, and maximize.

## Public contract

- Every Ark part has a thin wrapper with a class and a `data-slot`. Ark owns open, position, size,
  stage, drag, resize, focus, ids, and presence; callbacks receive Ark detail objects unchanged.
- `FloatingPanel` defaults `closeOnEscape`, `persistRect`, `lazyMount`, and `unmountOnExit` to
  `true`. `persistRect` keeps the last rect during the exit animation instead of jumping to the
  default position. `FloatingPanelRootProvider` defaults only `lazyMount` and `unmountOnExit`;
  pass `closeOnEscape` and `persistRect` to `useFloatingPanel` for the same behavior.
- `FloatingPanelPositioner` is portalled; `portalled={false}` renders inline and `portalRef`
  targets a container.
- `FloatingPanelTrigger` and `FloatingPanelPositioner` are unstyled. Compose the trigger with
  `asChild` and a `Button`.
- Sugar: `FloatingPanelStageTrigger` renders a minimize, maximize, or restore icon when it has no
  children and no `asChild`; Ark supplies the translated `aria-label` and hides the triggers that
  do not apply to the current stage. `FloatingPanelCloseIcon` composes `CloseTrigger` with
  `CloseButton` and the `Close panel` label. `FloatingPanelDragIndicator` is a decorative grip,
  `FloatingPanelFooter` is a status or action row that mirrors `data-minimized`, and
  `FloatingPanelResizeTriggerGroup` renders `resizeTriggerAxes` or the given `axes`.
- The barrel re-exports the Ark prop, detail, context, and hook types.

```text
FloatingPanel | FloatingPanelRootProvider
├─ FloatingPanelTrigger
└─ FloatingPanelPositioner (portalled)
   └─ FloatingPanelContent
      ├─ FloatingPanelDragTrigger
      │  └─ FloatingPanelHeader
      │     ├─ FloatingPanelTitle
      │     │  └─ FloatingPanelDragIndicator
      │     └─ FloatingPanelControl
      │        ├─ FloatingPanelStageTrigger
      │        └─ FloatingPanelCloseTrigger | FloatingPanelCloseIcon
      ├─ FloatingPanelBody
      ├─ FloatingPanelFooter
      └─ FloatingPanelResizeTriggerGroup | FloatingPanelResizeTrigger
```

## Composition

```tsx
import { Button } from '@moduix/react/button';
import {
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseIcon,
  FloatingPanelContent,
  FloatingPanelControl,
  FloatingPanelDragIndicator,
  FloatingPanelDragTrigger,
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
} from '@moduix/react/floating-panel';

export function Inspector() {
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
                <FloatingPanelStageTrigger stage="default" />
                <FloatingPanelCloseIcon />
              </FloatingPanelControl>
            </FloatingPanelHeader>
          </FloatingPanelDragTrigger>
          <FloatingPanelBody>Panel content</FloatingPanelBody>
          <FloatingPanelResizeTriggerGroup />
        </FloatingPanelContent>
      </FloatingPanelPositioner>
    </FloatingPanel>
  );
}
```

## Accessibility and state

- `FloatingPanelContent` has `role="dialog"` and is labelled by the title. When it has focus, Escape
  closes the topmost panel and arrow keys move it by `gridSize`.
- The panel is non-modal: no focus trap, scroll lock, or hidden outside content.
- Content, header, and body carry `data-dragging`, `data-minimized`, `data-maximized`, and
  `data-staged`; content also carries `data-topmost` and `data-behind`. Ark hides the body with
  `hidden` while minimized.

## Styling

- Size and position come from Ark state; the content has no CSS min size, so use `minSize` and
  `maxSize`. Ark positions the resize handles inline; the wrapper sets only their hit area.
- Panels behind the topmost one are dimmed. Content motion reads `--moduix-popup-motion-*`.
- CSS Modules have no `--moduix-floating-panel-*` variables; Tailwind uses utilities and consumer
  classes.

## Agent notes

- Keep `FloatingPanelPositioner` and `FloatingPanelContent` explicit in examples.
- Do not replace Ark drag, resize, boundary, stage, or presence behavior with local state, and keep
  sugar parts visual only.