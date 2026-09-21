import { Button } from '@moduix/react/button';
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
} from '@moduix/react/floating-panel';
import { PreviewMeta } from '@/components/mdx/Components';

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
