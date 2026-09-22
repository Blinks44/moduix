import { Button } from '@moduix/react/button';
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
} from '@moduix/react/floating-panel';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ControlledPositionDemo() {
  const [position, setPosition] = useState({
    x: 160,
    y: 140,
  });
  return (
    <>
      <FloatingPanel
        defaultSize={{
          width: 360,
          height: 260,
        }}
        position={position}
        onPositionChange={(details) => setPosition(details.position)}
      >
        <FloatingPanelTrigger asChild>
          <Button>Open positioned panel</Button>
        </FloatingPanelTrigger>
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
      <PreviewMeta>
        <output>
          Position: {Math.round(position.x)}, {Math.round(position.y)}
        </output>
      </PreviewMeta>
    </>
  );
}