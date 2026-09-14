import { Button } from '@moduix/solid/button';
import { FloatingPanel } from '@moduix/solid/floating-panel';

export default function AdvancedCustomizationFloatingPanelDemo() {
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
    >
      <FloatingPanel.Trigger asChild={(props) => <Button {...props()}>Open custom panel</Button>} />
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Header>
              <FloatingPanel.Title>Custom resize handles</FloatingPanel.Title>
              <FloatingPanel.Control>
                <FloatingPanel.CloseIcon />
              </FloatingPanel.Control>
            </FloatingPanel.Header>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.Body>
            Only the right, bottom, and bottom-right handles are rendered in this composition.
          </FloatingPanel.Body>
          <FloatingPanel.ResizeTrigger axis="e" />
          <FloatingPanel.ResizeTrigger axis="s" />
          <FloatingPanel.ResizeTrigger axis="se" />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel>
  );
}