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

export default function LazyMountFloatingPanelDemo() {
  const [exits, setExits] = useState(0);
  return (
    <>
      <FloatingPanel
        lazyMount
        unmountOnExit
        defaultSize={{
          width: 360,
          height: 260,
        }}
        onExitComplete={() => setExits((count) => count + 1)}
      >
        <FloatingPanelTrigger asChild>
          <Button>Open lazy panel</Button>
        </FloatingPanelTrigger>
        <FloatingPanelPositioner>
          <FloatingPanelContent>
            <FloatingPanelDragTrigger>
              <FloatingPanelHeader>
                <FloatingPanelTitle>
                  <FloatingPanelDragIndicator />
                  Lazy mounted
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
              The panel content mounts on first open and unmounts after exit.
            </FloatingPanelBody>
            <FloatingPanelResizeTriggerGroup />
          </FloatingPanelContent>
        </FloatingPanelPositioner>
      </FloatingPanel>
      <PreviewMeta>
        <output>Exit completions: {exits}</output>
      </PreviewMeta>
    </>
  );
}
