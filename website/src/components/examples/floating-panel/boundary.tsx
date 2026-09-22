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
  FloatingPanelCloseIcon,
  FloatingPanelBody,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelDragIndicator,
} from '@moduix/react/floating-panel';
import { useRef } from 'react';
import styles from '@/components/examples/floating-panel/floating-panel-boundary.module.css';

export default function BoundaryFloatingPanelDemo() {
  const boundaryRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={boundaryRef} className={styles.root}>
      <FloatingPanel
        allowOverflow={false}
        defaultSize={{ width: 300, height: 220 }}
        getBoundaryEl={() => boundaryRef.current}
        getAnchorPosition={({ boundaryRect }) => ({
          x: (boundaryRect?.x ?? 0) + 16,
          y: (boundaryRect?.y ?? 0) + 16,
        })}
      >
        <FloatingPanelTrigger asChild>
          <Button>Open constrained panel</Button>
        </FloatingPanelTrigger>
        <FloatingPanelPositioner>
          <FloatingPanelContent>
            <FloatingPanelDragTrigger>
              <FloatingPanelHeader>
                <FloatingPanelTitle>
                  <FloatingPanelDragIndicator />
                  Boundary
                </FloatingPanelTitle>
                <FloatingPanelControl>
                  <FloatingPanelCloseIcon />
                </FloatingPanelControl>
              </FloatingPanelHeader>
            </FloatingPanelDragTrigger>
            <FloatingPanelBody>
              This panel stays inside the dashed boundary while you drag it.
            </FloatingPanelBody>
            <FloatingPanelResizeTriggerGroup />
          </FloatingPanelContent>
        </FloatingPanelPositioner>
      </FloatingPanel>
    </div>
  );
}