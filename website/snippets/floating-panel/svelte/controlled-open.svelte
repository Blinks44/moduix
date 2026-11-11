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

  let open = $state(false);
</script>

<FloatingPanel bind:open defaultSize={{ width: 360, height: 260 }}>
  <FloatingPanelTrigger>
    {#snippet asChild(props)}<Button {...props()}
        >{open ? 'Focus panel' : 'Open controlled panel'}</Button
      >{/snippet}
  </FloatingPanelTrigger>
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelDragTrigger>
        <FloatingPanelHeader>
          <FloatingPanelTitle><FloatingPanelDragIndicator />Controlled open</FloatingPanelTitle>
          <FloatingPanelControl>
            <FloatingPanelStageTrigger stage="minimized" />
            <FloatingPanelStageTrigger stage="maximized" />
            <FloatingPanelStageTrigger stage="default" />
            <FloatingPanelCloseIcon />
          </FloatingPanelControl>
        </FloatingPanelHeader>
      </FloatingPanelDragTrigger>
      <FloatingPanelBody>Open state is synchronized with Svelte state.</FloatingPanelBody>
      <FloatingPanelResizeTriggerGroup />
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>