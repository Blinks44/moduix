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

  let exits = $state(0);
</script>

<FloatingPanel
  lazyMount
  unmountOnExit
  defaultSize={{ width: 360, height: 260 }}
  onExitComplete={() => exits++}
>
  <FloatingPanelTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open lazy panel</Button>{/snippet}
  </FloatingPanelTrigger>
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelDragTrigger>
        <FloatingPanelHeader>
          <FloatingPanelTitle><FloatingPanelDragIndicator />Lazy mounted</FloatingPanelTitle>
          <FloatingPanelControl>
            <FloatingPanelStageTrigger stage="minimized" />
            <FloatingPanelStageTrigger stage="maximized" />
            <FloatingPanelStageTrigger stage="default" />
            <FloatingPanelCloseIcon />
          </FloatingPanelControl>
        </FloatingPanelHeader>
      </FloatingPanelDragTrigger>
      <FloatingPanelBody
        >The panel content mounts on first open and unmounts after exit.</FloatingPanelBody
      >
      <FloatingPanelResizeTriggerGroup />
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>
<div data-preview-meta>
  <output>Exit completions: {exits}</output>
</div>