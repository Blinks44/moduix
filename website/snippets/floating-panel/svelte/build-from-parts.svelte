<script lang="ts">
  import {
    Grip as GripIcon,
    Maximize2 as MaximizeIcon,
    Minimize2 as RestoreIcon,
    Minus as MinusIcon,
    X as XIcon,
  } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import {
    FloatingPanel,
    FloatingPanelBody,
    FloatingPanelCloseTrigger,
    FloatingPanelContent,
    FloatingPanelControl,
    FloatingPanelDragTrigger,
    FloatingPanelHeader,
    FloatingPanelPositioner,
    FloatingPanelResizeTrigger,
    FloatingPanelStageTrigger,
    FloatingPanelTitle,
    FloatingPanelTrigger,
  } from '@moduix/svelte/floating-panel';
  import styles from '@/components/examples/floating-panel/floating-panel-build-from-parts.module.css';

  const axes = ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'] as const;
</script>

<FloatingPanel defaultSize={{ width: 360, height: 260 }}>
  <FloatingPanelTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open panel</Button>{/snippet}
  </FloatingPanelTrigger>
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelDragTrigger>
        <FloatingPanelHeader>
          <FloatingPanelTitle>
            <span aria-hidden="true" class={styles.dragIndicator}><GripIcon /></span>
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
            <FloatingPanelCloseTrigger aria-label="Close panel"><XIcon /></FloatingPanelCloseTrigger
            >
          </FloatingPanelControl>
        </FloatingPanelHeader>
      </FloatingPanelDragTrigger>
      <FloatingPanelBody>
        Drag the header to move this panel and resize it from any edge.
      </FloatingPanelBody>
      <div class={styles.footer}>Esc closes the panel without hiding the resize handles.</div>
      {#each axes as axis (axis)}
        <FloatingPanelResizeTrigger {axis} />
      {/each}
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>