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
  FloatingPanelCloseIcon,
  FloatingPanelBody,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelDragIndicator,
} from '@moduix/solid/floating-panel';
import styles from '@/components/examples/floating-panel/floating-panel-boundary.module.css';

export default function BoundaryFloatingPanelDemo() {
  let boundaryRef: HTMLDivElement | null = null;

  return (
    <div ref={(element) => (boundaryRef = element)} class={styles.root}>
      <FloatingPanel
        allowOverflow={false}
        defaultSize={{ width: 300, height: 220 }}
        getBoundaryEl={() => boundaryRef}
        getAnchorPosition={({ boundaryRect }) => ({
          x: (boundaryRect?.x ?? 0) + 16,
          y: (boundaryRect?.y ?? 0) + 16,
        })}
      >
        <FloatingPanelTrigger
          asChild={(props) => <Button {...props()}>Open constrained panel</Button>}
        />
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
