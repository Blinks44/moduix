<script lang="ts">
  import type { DialogOpenChangeDetails } from '@/components/dialog';
  import BasicDialog from './BasicDialog.svelte';

  let { details }: { details: DialogOpenChangeDetails[] } = $props();
  let open = $state(false);
</script>

<BasicDialog
  bind:open
  closeTrigger
  portalled={false}
  onOpenChange={(detail) => details.push(detail)}
/>
<output>Bound open: {String(open)}</output>