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
  FloatingPanelCloseTrigger,
  FloatingPanelBody,
  FloatingPanelResizeTrigger,
} from '@moduix/solid/floating-panel';
import {
  Grip as GripIcon,
  Maximize2 as MaximizeIcon,
  Minimize2 as RestoreIcon,
  Minus as MinusIcon,
  X as XIcon,
} from 'lucide-solid';
import { For } from 'solid-js';
import styles from '@/components/examples/floating-panel/floating-panel-build-from-parts.module.css';

const axes = ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'] as const;

export default function BuildFromPartsFloatingPanelDemo() {
  return (
    <FloatingPanel
      defaultSize={{
        width: 360,
        height: 260,
      }}
    >
      <FloatingPanelTrigger asChild={(props) => <Button {...props()}>Open panel</Button>} />
      <FloatingPanelPositioner>
        <FloatingPanelContent>
          <FloatingPanelDragTrigger>
            <FloatingPanelHeader>
              <FloatingPanelTitle>
                <span aria-hidden="true" class={styles.dragIndicator}>
                  <GripIcon />
                </span>
                Inspector
              </FloatingPanelTitle>
              <FloatingPanelControl>
                <FloatingPanelStageTrigger stage="minimized">
                  <MinusIcon strokeWidth={3} />
                </FloatingPanelStageTrigger>
                <FloatingPanelStageTrigger stage="maximized">
                  <MaximizeIcon />
                </FloatingPanelStageTrigger>
                <FloatingPanelStageTrigger stage="default">
                  <RestoreIcon />
                </FloatingPanelStageTrigger>
                <FloatingPanelCloseTrigger aria-label="Close panel">
                  <XIcon strokeWidth={3} />
                </FloatingPanelCloseTrigger>
              </FloatingPanelControl>
            </FloatingPanelHeader>
          </FloatingPanelDragTrigger>
          <FloatingPanelBody>
            Drag the header to move this panel and resize it from any edge.
          </FloatingPanelBody>
          <div class={styles.footer}>Esc closes the panel without hiding the resize handles.</div>
          <For each={axes}>{(axis) => <FloatingPanelResizeTrigger axis={axis} />}</For>
        </FloatingPanelContent>
      </FloatingPanelPositioner>
    </FloatingPanel>
  );
}