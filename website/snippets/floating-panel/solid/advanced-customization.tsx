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
  FloatingPanelResizeTrigger,
} from '@moduix/solid/floating-panel';

export default function AdvancedCustomizationFloatingPanelDemo() {
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
    >
      <FloatingPanelTrigger asChild={(props) => <Button {...props()}>Open custom panel</Button>} />
      <FloatingPanelPositioner>
        <FloatingPanelContent>
          <FloatingPanelDragTrigger>
            <FloatingPanelHeader>
              <FloatingPanelTitle>Custom resize handles</FloatingPanelTitle>
              <FloatingPanelControl>
                <FloatingPanelCloseIcon />
              </FloatingPanelControl>
            </FloatingPanelHeader>
          </FloatingPanelDragTrigger>
          <FloatingPanelBody>
            Only the right, bottom, and bottom-right handles are rendered in this composition.
          </FloatingPanelBody>
          <FloatingPanelResizeTrigger axis="e" />
          <FloatingPanelResizeTrigger axis="s" />
          <FloatingPanelResizeTrigger axis="se" />
        </FloatingPanelContent>
      </FloatingPanelPositioner>
    </FloatingPanel>
  );
}
