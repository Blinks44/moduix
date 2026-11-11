<script lang="ts">
  import { HoverCard, HoverCardTrigger } from '@/components/hover-card';
  import HoverCardSurface from './HoverCardSurface.svelte';

  let open = $state(true);
</script>

<button type="button" onclick={() => (open = false)}>Close</button>
<HoverCard {open} portalled={false}>
  <HoverCardTrigger>Profile</HoverCardTrigger>
  <HoverCardSurface />
</HoverCard>