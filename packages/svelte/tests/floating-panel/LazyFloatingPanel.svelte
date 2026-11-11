<script lang="ts">
  import { FloatingPanel, FloatingPanelTrigger } from '@/components/floating-panel';
  import PanelContent from './PanelContent.svelte';
</script>

<FloatingPanel portalled={false}>
  <FloatingPanelTrigger>
    {#snippet asChild(props)}<button {...props()} type="button">Open inspector</button>{/snippet}
  </FloatingPanelTrigger>
  <PanelContent />
</FloatingPanel>