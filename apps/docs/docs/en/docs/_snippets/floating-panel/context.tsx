import { Button, FloatingPanel } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function ContextFloatingPanelDemo() {
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
    >
      <PreviewLayout gap="var(--moduix-spacing-2)">
        <FloatingPanel.Trigger asChild>
          <Button>Open context panel</Button>
        </FloatingPanel.Trigger>
        <FloatingPanel.Context>
          {(panel) => (
            <span>
              open: {String(panel.open)}, dragging: {String(panel.dragging)}
            </span>
          )}
        </FloatingPanel.Context>
      </PreviewLayout>
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
    </FloatingPanel>
  );
}