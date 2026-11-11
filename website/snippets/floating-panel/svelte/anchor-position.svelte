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
    FloatingPanelStageTrigger,
    FloatingPanelTitle,
    FloatingPanelTrigger,
  } from '@moduix/svelte/floating-panel';

  const getAnchorPosition = ({ triggerRect }: { triggerRect: DOMRect | null }) => ({
    x: (triggerRect?.x ?? 0) + (triggerRect?.width ?? 0) / 2,
    y: (triggerRect?.y ?? 0) + (triggerRect?.height ?? 0) + 12,
  });
</script>

<FloatingPanel defaultSize={{ width: 360, height: 260 }} {getAnchorPosition}>
  <FloatingPanelTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open from trigger</Button>{/snippet}
  </FloatingPanelTrigger>
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelDragTrigger>
        <FloatingPanelHeader>
          <FloatingPanelTitle><FloatingPanelDragIndicator />Anchored start</FloatingPanelTitle>
          <FloatingPanelControl>
            <FloatingPanelStageTrigger stage="minimized" />
            <FloatingPanelStageTrigger stage="maximized" />
            <FloatingPanelStageTrigger stage="default" />
            <FloatingPanelCloseIcon />
          </FloatingPanelControl>
        </FloatingPanelHeader>
      </FloatingPanelDragTrigger>
      <FloatingPanelBody
        >The initial panel position is derived from the trigger rect.</FloatingPanelBody
      >
      <FloatingPanelResizeTriggerGroup />
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>