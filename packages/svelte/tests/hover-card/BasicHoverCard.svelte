<script lang="ts">
  import { HoverCard, HoverCardTrigger, type HoverCardRootProps } from '@/components/hover-card';
  import HoverCardSurface from './HoverCardSurface.svelte';

  let { open = $bindable(false), ...props }: HoverCardRootProps = $props();
</script>

<output>{open ? 'open' : 'closed'}</output>
<HoverCard {...props} bind:open>
  <HoverCardTrigger>Profile</HoverCardTrigger>
  <HoverCardSurface />
</HoverCard>