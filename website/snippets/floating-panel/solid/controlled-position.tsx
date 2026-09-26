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
  FloatingPanelStageTrigger,
  FloatingPanelCloseIcon,
  FloatingPanelBody,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelDragIndicator,
} from '@moduix/solid/floating-panel';
import { createSignal } from 'solid-js';

export default function ControlledPositionDemo() {
  const [position, setPosition] = createSignal({ x: 160, y: 140 });

  return (
    <>
      <FloatingPanel
        defaultSize={{
          width: 360,
          height: 260,
        }}
        position={position()}
        onPositionChange={(details) => setPosition(details.position)}
      >
        <FloatingPanelTrigger
          asChild={(props) => <Button {...props()}>Open positioned panel</Button>}
        />
        <FloatingPanelPositioner>
          <FloatingPanelContent>
            <FloatingPanelDragTrigger>
              <FloatingPanelHeader>
                <FloatingPanelTitle>
                  <FloatingPanelDragIndicator />
                  Controlled position
                </FloatingPanelTitle>
                <FloatingPanelControl>
                  <FloatingPanelStageTrigger stage="minimized" />
                  <FloatingPanelStageTrigger stage="maximized" />
                  <FloatingPanelStageTrigger stage="default" />
                  <FloatingPanelCloseIcon />
                </FloatingPanelControl>
              </FloatingPanelHeader>
            </FloatingPanelDragTrigger>
            <FloatingPanelBody>Dragging updates the controlled position object.</FloatingPanelBody>
            <FloatingPanelResizeTriggerGroup />
          </FloatingPanelContent>
        </FloatingPanelPositioner>
      </FloatingPanel>
      <div data-preview-meta>
        <output>
          Position: {Math.round(position().x)}, {Math.round(position().y)}
        </output>
      </div>
    </>
  );
}