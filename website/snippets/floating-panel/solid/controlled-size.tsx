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

export default function ControlledSizeDemo() {
  const [size, setSize] = createSignal({ width: 360, height: 260 });

  return (
    <>
      <FloatingPanel size={size()} onSizeChange={(details) => setSize(details.size)}>
        <FloatingPanelTrigger
          asChild={(props) => <Button {...props()}>Open resizable panel</Button>}
        />
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
      <div data-preview-meta>
        <output>
          Size: {Math.round(size().width)} × {Math.round(size().height)}
        </output>
      </div>
    </>
  );
}