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
  FloatingPanelCloseTrigger,
  FloatingPanelBody,
  FloatingPanelResizeTrigger,
} from '@moduix/react/floating-panel';
import {
  Grip as GripIcon,
  Maximize2 as MaximizeIcon,
  Minimize2 as RestoreIcon,
  Minus as MinusIcon,
  X as XIcon,
} from 'lucide-react';
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
      <FloatingPanelTrigger asChild>
        <Button>Open panel</Button>
      </FloatingPanelTrigger>
      <FloatingPanelPositioner>
        <FloatingPanelContent>
          <FloatingPanelDragTrigger>
            <FloatingPanelHeader>
              <FloatingPanelTitle>
                <span aria-hidden="true" className={styles.dragIndicator}>
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
          <div className={styles.footer}>
            Esc closes the panel without hiding the resize handles.
          </div>
          {axes.map((axis) => (
            <FloatingPanelResizeTrigger key={axis} axis={axis} />
          ))}
        </FloatingPanelContent>
      </FloatingPanelPositioner>
    </FloatingPanel>
  );
}