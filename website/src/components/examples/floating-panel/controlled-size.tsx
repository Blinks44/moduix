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

export default function ControlledSizeDemo() {
  const [size, setSize] = useState({
    width: 360,
    height: 260,
  });
  return (
    <>
      <FloatingPanel size={size} onSizeChange={(details) => setSize(details.size)}>
        <FloatingPanelTrigger asChild>
          <Button>Open resizable panel</Button>
        </FloatingPanelTrigger>
        <FloatingPanelPositioner>
          <FloatingPanelContent>
            <FloatingPanelDragTrigger>
              <FloatingPanelHeader>
                <FloatingPanelTitle>
                  <FloatingPanelDragIndicator />
                  Controlled size
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
              Resize handles update controlled width and height.
            </FloatingPanelBody>
            <FloatingPanelResizeTriggerGroup />
          </FloatingPanelContent>
        </FloatingPanelPositioner>
      </FloatingPanel>
      <PreviewMeta>
        <output>
          Size: {Math.round(size.width)} × {Math.round(size.height)}
        </output>
      </PreviewMeta>
    </>
  );
}
