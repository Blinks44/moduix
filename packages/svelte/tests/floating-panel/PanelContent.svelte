<script lang="ts">
  import type { Snippet } from 'svelte';
  import {
    FloatingPanelBody,
    FloatingPanelContent,
    FloatingPanelControl,
    FloatingPanelDragTrigger,
    FloatingPanelHeader,
    FloatingPanelPositioner,
    FloatingPanelStageTrigger,
    FloatingPanelTitle,
  } from '@/components/floating-panel';

  let { children }: { children?: Snippet } = $props();
</script>

<FloatingPanelPositioner>
  <FloatingPanelContent>
    <FloatingPanelDragTrigger>
      <FloatingPanelHeader>
        <FloatingPanelTitle>Inspector</FloatingPanelTitle>
        <FloatingPanelControl>
          <FloatingPanelStageTrigger stage="minimized" />
        </FloatingPanelControl>
      </FloatingPanelHeader>
    </FloatingPanelDragTrigger>
    <FloatingPanelBody>Panel content</FloatingPanelBody>
    {@render children?.()}
  </FloatingPanelContent>
</FloatingPanelPositioner>