import { Button } from '@moduix/solid/button';
import { FloatingPanel, useFloatingPanel } from '@moduix/solid/floating-panel';

export default function RootProviderFloatingPanelDemo() {
  const panel = useFloatingPanel({
    defaultSize: {
      width: 360,
      height: 260,
    },
    persistRect: true,
  });

  return (
    <>
      <FloatingPanel.RootProvider value={panel}>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header>
                <FloatingPanel.Title>
                  <FloatingPanel.DragIndicator />
                  Root provider
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
              Ark useFloatingPanel owns the panel state outside the rendered part tree.
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggerGroup />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </FloatingPanel.RootProvider>
      <div data-preview-meta>
        <Button onClick={() => panel().setOpen(true)}>Open via API</Button>
        <Button variant="outline" onClick={() => panel().maximize()}>
          Maximize
        </Button>
        <Button variant="outline" onClick={() => panel().minimize()}>
          Minimize
        </Button>
      </div>
    </>
  );
}