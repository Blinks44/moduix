import { Button, FloatingPanel } from '@moduix/react';
import { useRef } from 'react';

export default function BoundaryFloatingPanelDemo() {
  const boundaryRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={boundaryRef}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        inlineSize: '100%',
        minHeight: 320,
        border: '1px dashed var(--moduix-color-border)',
        borderRadius: 'var(--moduix-radius-md)',
        padding: 'var(--moduix-spacing-3)',
      }}
    >
      <FloatingPanel
        allowOverflow={false}
        defaultSize={{ width: 300, height: 220 }}
        getBoundaryEl={() => boundaryRef.current}
        getAnchorPosition={({ boundaryRect }) => ({
          x: (boundaryRect?.x ?? 0) + 16,
          y: (boundaryRect?.y ?? 0) + 16,
        })}
      >
        <FloatingPanel.Trigger asChild>
          <Button>Open constrained panel</Button>
        </FloatingPanel.Trigger>
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