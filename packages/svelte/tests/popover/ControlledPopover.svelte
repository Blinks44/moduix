<script lang="ts">
  import { Popover, PopoverTrigger, type PopoverOpenChangeDetails } from '@/components/popover';
  import PopoverSurface from './PopoverSurface.svelte';

  let { details }: { details: PopoverOpenChangeDetails[] } = $props();
  let open = $state(false);
</script>

<Popover bind:open portalled={false} onOpenChange={(detail) => details.push(detail)}>
  <PopoverTrigger>Open popover</PopoverTrigger>
  <PopoverSurface />
</Popover>
<output>Bound open: {open}</output>
<button type="button" onclick={() => (open = !open)}>Toggle from outside</button>