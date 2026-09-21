import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/floating-panel';

export default function ContextFloatingPanelDemo() {
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
    >
      <FloatingPanelTrigger
        asChild={(props) => <Button {...props()}>Open context panel</Button>}
      />
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
          <div data-preview-meta>
            <output>
              Open: {String(panel().open)}, dragging: {String(panel().dragging)}
            </output>
          </div>
        )}
      </FloatingPanelContext>
    </FloatingPanel>
  );
}
