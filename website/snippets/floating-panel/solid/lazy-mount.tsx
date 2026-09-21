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

export default function LazyMountFloatingPanelDemo() {
  const [exits, setExits] = createSignal(0);

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
        <FloatingPanelTrigger asChild={(props) => <Button {...props()}>Open lazy panel</Button>} />
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
      <div data-preview-meta>
        <output>Exit completions: {exits()}</output>
      </div>
    </>
  );
}
