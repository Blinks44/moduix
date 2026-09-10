import { Button } from '@moduix/solid/button';
import { FloatingPanel } from '@moduix/solid/floating-panel';

export default function ContextFloatingPanelDemo() {
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
    >
      <FloatingPanel.Trigger
        asChild={(props) => <Button {...props()}>Open context panel</Button>}
      />
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Header>
              <FloatingPanel.Title>
                <FloatingPanel.DragIndicator />
                Context state
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
            FloatingPanel.Context exposes the panel API to descendants.
          </FloatingPanel.Body>
          <FloatingPanel.ResizeTriggerGroup />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
      <FloatingPanel.Context>
        {(panel) => (
          <div data-preview-meta>
            <output>
              Open: {String(panel().open)}, dragging: {String(panel().dragging)}
            </output>
          </div>
        )}
      </FloatingPanel.Context>
    </FloatingPanel>
  );
}