<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    FloatingPanel,
    FloatingPanelBody,
    FloatingPanelCloseIcon,
    FloatingPanelContent,
    FloatingPanelControl,
    FloatingPanelDragIndicator,
    FloatingPanelDragTrigger,
    FloatingPanelHeader,
    FloatingPanelPositioner,
    FloatingPanelResizeTriggerGroup,
    FloatingPanelTitle,
    FloatingPanelTrigger,
  } from '@moduix/svelte/floating-panel';
  import styles from '@/components/examples/floating-panel/floating-panel-boundary.module.css';

  let boundaryRef = $state<HTMLDivElement>();
  const getAnchorPosition = ({ boundaryRect }: { boundaryRect: DOMRect | null }) => ({
    x: (boundaryRect?.x ?? 0) + 16,
    y: (boundaryRect?.y ?? 0) + 16,
  });
</script>

<div bind:this={boundaryRef} class={styles.root}>
  <FloatingPanel
    allowOverflow={false}
    defaultSize={{ width: 300, height: 220 }}
    getBoundaryEl={() => boundaryRef ?? null}
    {getAnchorPosition}
  >
    <FloatingPanelTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open constrained panel</Button>{/snippet}
    </FloatingPanelTrigger>
    <FloatingPanelPositioner>
      <FloatingPanelContent>
        <FloatingPanelDragTrigger>
          <FloatingPanelHeader>
            <FloatingPanelTitle><FloatingPanelDragIndicator />Boundary</FloatingPanelTitle>
            <FloatingPanelControl>
              <FloatingPanelCloseIcon />
            </FloatingPanelControl>
          </FloatingPanelHeader>
        </FloatingPanelDragTrigger>
        <FloatingPanelBody
          >This panel stays inside the dashed boundary while you drag it.</FloatingPanelBody
        >
        <FloatingPanelResizeTriggerGroup />
      </FloatingPanelContent>
    </FloatingPanelPositioner>
  </FloatingPanel>
</div>