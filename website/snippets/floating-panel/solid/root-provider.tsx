import { Button } from '@moduix/solid/button';
import {
  FloatingPanelRootProvider,
  FloatingPanelPositioner,
  FloatingPanelContent,
  FloatingPanelDragTrigger,
  FloatingPanelHeader,
  FloatingPanelTitle,
  FloatingPanelControl,
  FloatingPanelStageTrigger,
  FloatingPanelCloseIcon,
  FloatingPanelBody,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelDragIndicator,
  useFloatingPanel,
} from '@moduix/solid/floating-panel';

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
      <FloatingPanelRootProvider value={panel}>
        <FloatingPanelPositioner>
          <FloatingPanelContent>
            <FloatingPanelDragTrigger>
              <FloatingPanelHeader>
                <FloatingPanelTitle>
                  <FloatingPanelDragIndicator />
                  Root provider
                </FloatingPanelTitle>
                <FloatingPanelControl>
                  <FloatingPanelStageTrigger stage="minimized" />
                  <FloatingPanelStageTrigger stage="maximized" />
                  <FloatingPanelStageTrigger stage="default" />
                  <FloatingPanelCloseIcon />
                </FloatingPanelControl>
              </FloatingPanelHeader>
            </FloatingPanelDragTrigger>
            <FloatingPanelBody>
              Ark useFloatingPanel owns the panel state outside the rendered part tree.
            </FloatingPanelBody>
            <FloatingPanelResizeTriggerGroup />
          </FloatingPanelContent>
        </FloatingPanelPositioner>
      </FloatingPanelRootProvider>
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
