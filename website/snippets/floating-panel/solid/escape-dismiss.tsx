import { Button } from '@moduix/solid/button';
import {
  FloatingPanel,
  FloatingPanelTrigger,
  FloatingPanelPositioner,
  FloatingPanelContent,
  FloatingPanelDragTrigger,
  FloatingPanelHeader,
  FloatingPanelTitle,
  FloatingPanelControl,
  FloatingPanelCloseIcon,
  FloatingPanelBody,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelDragIndicator,
} from '@moduix/solid/floating-panel';

export default function EscapeDismissFloatingPanelDemo() {
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
    >
      <FloatingPanelTrigger asChild={(props) => <Button {...props()}>Open panel</Button>} />
      <FloatingPanelPositioner>
        <FloatingPanelContent autofocus>
          <FloatingPanelDragTrigger>
            <FloatingPanelHeader>
              <FloatingPanelTitle>
                <FloatingPanelDragIndicator />
                Escape dismiss
              </FloatingPanelTitle>
              <FloatingPanelControl>
                <FloatingPanelCloseIcon />
              </FloatingPanelControl>
            </FloatingPanelHeader>
          </FloatingPanelDragTrigger>
          <FloatingPanelBody>
            The content receives focus on open, so Escape dismisses this topmost panel immediately.
          </FloatingPanelBody>
          <FloatingPanelResizeTriggerGroup />
        </FloatingPanelContent>
      </FloatingPanelPositioner>
    </FloatingPanel>
  );
}
