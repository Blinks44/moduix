import { Button } from '@moduix/react/button';
import { FloatingPanel } from '@moduix/react/floating-panel';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderFloatingPanelDemo() {
  const panel = FloatingPanel.useFloatingPanel({
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
      <PreviewMeta>
        <Button onClick={() => panel.setOpen(true)}>Open via API</Button>
        <Button variant="outline" onClick={() => panel.maximize()}>
          Maximize
        </Button>
        <Button variant="outline" onClick={() => panel.minimize()}>
          Minimize
        </Button>
      </PreviewMeta>
    </>
  );
}