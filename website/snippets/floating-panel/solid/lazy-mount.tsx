import { Button } from '@moduix/solid/button';
import { FloatingPanel } from '@moduix/solid/floating-panel';
import { createSignal } from 'solid-js';

export default function LazyMountFloatingPanelDemo() {
  const [exits, setExits] = createSignal(0);

  return (
    <>
      <FloatingPanel
        lazyMount
        unmountOnExit
        defaultSize={{
          width: 360,
          height: 260,
        }}
        onExitComplete={() => setExits((count) => count + 1)}
      >
        <FloatingPanel.Trigger asChild={(props) => <Button {...props()}>Open lazy panel</Button>} />
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header>
                <FloatingPanel.Title>
                  <FloatingPanel.DragIndicator />
                  Lazy mounted
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
              The panel content mounts on first open and unmounts after exit.
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggerGroup />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </FloatingPanel>
      <div data-preview-meta>
        <output>Exit completions: {exits()}</output>
      </div>
    </>
  );
}