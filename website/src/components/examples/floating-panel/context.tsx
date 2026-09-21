import { Button } from '@moduix/react/button';
import {
  FloatingPanel,
  FloatingPanelContext,
  FloatingPanelTrigger,
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
} from '@moduix/react/floating-panel';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ContextFloatingPanelDemo() {
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
    >
      <FloatingPanelTrigger asChild>
        <Button>Open context panel</Button>
      </FloatingPanelTrigger>
      <FloatingPanelPositioner>
        <FloatingPanelContent>
          <FloatingPanelDragTrigger>
            <FloatingPanelHeader>
              <FloatingPanelTitle>
                <FloatingPanelDragIndicator />
                Context state
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
            FloatingPanelContext exposes the panel API to descendants.
          </FloatingPanelBody>
          <FloatingPanelResizeTriggerGroup />
        </FloatingPanelContent>
      </FloatingPanelPositioner>
      <FloatingPanelContext>
        {(panel) => (
          <PreviewMeta>
            <output>
              Open: {String(panel.open)}, dragging: {String(panel.dragging)}
            </output>
          </PreviewMeta>
        )}
      </FloatingPanelContext>
    </FloatingPanel>
  );
}
