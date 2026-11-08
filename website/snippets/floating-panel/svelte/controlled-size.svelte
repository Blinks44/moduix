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

  let size = $state({ width: 360, height: 260 });
</script>

<FloatingPanel bind:size>
  <FloatingPanelTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open resizable panel</Button>{/snippet}
  </FloatingPanelTrigger>
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelDragTrigger>
        <FloatingPanelHeader>
          <FloatingPanelTitle><FloatingPanelDragIndicator />Controlled size</FloatingPanelTitle>
          <FloatingPanelControl>
            <FloatingPanelStageTrigger stage="minimized" />
            <FloatingPanelStageTrigger stage="maximized" />
            <FloatingPanelStageTrigger stage="default" />
            <FloatingPanelCloseIcon />
          </FloatingPanelControl>
        </FloatingPanelHeader>
      </FloatingPanelDragTrigger>
      <FloatingPanelBody>Resize handles update controlled width and height.</FloatingPanelBody>
      <FloatingPanelResizeTriggerGroup />
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>
<div data-preview-meta>
  <output>Size: {Math.round(size.width)} × {Math.round(size.height)}</output>
</div>