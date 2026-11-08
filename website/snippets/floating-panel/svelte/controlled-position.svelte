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

  let position = $state({ x: 160, y: 140 });
</script>

<FloatingPanel bind:position defaultSize={{ width: 360, height: 260 }}>
  <FloatingPanelTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open positioned panel</Button>{/snippet}
  </FloatingPanelTrigger>
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelDragTrigger>
        <FloatingPanelHeader>
          <FloatingPanelTitle><FloatingPanelDragIndicator />Controlled position</FloatingPanelTitle>
          <FloatingPanelControl>
            <FloatingPanelStageTrigger stage="minimized" />
            <FloatingPanelStageTrigger stage="maximized" />
            <FloatingPanelStageTrigger stage="default" />
            <FloatingPanelCloseIcon />
          </FloatingPanelControl>
        </FloatingPanelHeader>
      </FloatingPanelDragTrigger>
      <FloatingPanelBody>Dragging updates the controlled position object.</FloatingPanelBody>
      <FloatingPanelResizeTriggerGroup />
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>
<div data-preview-meta>
  <output>Position: {Math.round(position.x)}, {Math.round(position.y)}</output>
</div>