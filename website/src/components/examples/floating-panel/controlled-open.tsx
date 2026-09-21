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

export default function ControlledFloatingPanelDemo() {
  const [open, setOpen] = useState(false);
  return (
    <FloatingPanel
      open={open}
      defaultSize={{
        width: 360,
        height: 260,
      }}
      onOpenChange={(details) => setOpen(details.open)}
    >
      <FloatingPanelTrigger asChild>
        <Button>{open ? 'Focus panel' : 'Open controlled panel'}</Button>
      </FloatingPanelTrigger>
      <FloatingPanelPositioner>
        <FloatingPanelContent>
          <FloatingPanelDragTrigger>
            <FloatingPanelHeader>
              <FloatingPanelTitle>
                <FloatingPanelDragIndicator />
                Controlled open
              </FloatingPanelTitle>
              <FloatingPanelControl>
                <FloatingPanelStageTrigger stage="minimized" />
                <FloatingPanelStageTrigger stage="maximized" />
                <FloatingPanelStageTrigger stage="default" />
                <FloatingPanelCloseIcon />
              </FloatingPanelControl>
            </FloatingPanelHeader>
          </FloatingPanelDragTrigger>
          <FloatingPanelBody>Open state is synchronized with React state.</FloatingPanelBody>
          <FloatingPanelResizeTriggerGroup />
        </FloatingPanelContent>
      </FloatingPanelPositioner>
    </FloatingPanel>
  );
}
