<script lang="ts">
  import {
    FloatingPanel,
    FloatingPanelCloseTrigger,
    FloatingPanelTrigger,
    type FloatingPanelOpenChangeDetails,
  } from '@/components/floating-panel';
  import PanelContent from './PanelContent.svelte';

  let { details }: { details: FloatingPanelOpenChangeDetails[] } = $props();
  let open = $state(false);
</script>

<output>Bound open: {open}</output>
<FloatingPanel bind:open portalled={false} onOpenChange={(detail) => details.push(detail)}>
  <FloatingPanelTrigger>Open controlled inspector</FloatingPanelTrigger>
  <PanelContent>
    <FloatingPanelCloseTrigger>Close inspector</FloatingPanelCloseTrigger>
  </PanelContent>
</FloatingPanel>
<button type="button" onclick={() => (open = false)}>Close outside</button>