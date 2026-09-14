import { Button } from '@moduix/solid/button';
import { FloatingPanel } from '@moduix/solid/floating-panel';

export default function FloatingPanelDemo() {
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
    >
      <FloatingPanel.Trigger asChild={(props) => <Button {...props()}>Open panel</Button>} />
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
                <FloatingPanel.StageTrigger stage="default" />
                <FloatingPanel.CloseIcon />
              </FloatingPanel.Control>
            </FloatingPanel.Header>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.Body>
            Drag the header to move this panel and resize it from any edge.
          </FloatingPanel.Body>
          <FloatingPanel.Footer>
            Esc closes the panel without hiding the resize handles.
          </FloatingPanel.Footer>
          <FloatingPanel.ResizeTriggerGroup />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel>
  );
}