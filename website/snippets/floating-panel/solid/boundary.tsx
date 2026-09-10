import { Button } from '@moduix/solid/button';
import { FloatingPanel } from '@moduix/solid/floating-panel';
import styles from '@/components/examples/floating-panel/floating-panel-boundary.module.css';

export default function BoundaryFloatingPanelDemo() {
  let boundaryRef: HTMLDivElement | null = null;

  return (
    <div ref={(element) => (boundaryRef = element)} class={styles.root}>
      <FloatingPanel
        allowOverflow={false}
        defaultSize={{ width: 300, height: 220 }}
        getBoundaryEl={() => boundaryRef}
        getAnchorPosition={({ boundaryRect }) => ({
          x: (boundaryRect?.x ?? 0) + 16,
          y: (boundaryRect?.y ?? 0) + 16,
        })}
      >
        <FloatingPanel.Trigger
          asChild={(props) => <Button {...props()}>Open constrained panel</Button>}
        />
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header>
                <FloatingPanel.Title>
                  <FloatingPanel.DragIndicator />
                  Boundary
                </FloatingPanel.Title>
                <FloatingPanel.Control>
                  <FloatingPanel.CloseIcon />
                </FloatingPanel.Control>
              </FloatingPanel.Header>
            </FloatingPanel.DragTrigger>
            <FloatingPanel.Body>
              This panel stays inside the dashed boundary while you drag it.
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggerGroup />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </FloatingPanel>
    </div>
  );
}