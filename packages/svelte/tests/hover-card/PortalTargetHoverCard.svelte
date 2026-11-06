<script lang="ts">
  import { HoverCard, HoverCardTrigger } from '@/components/hover-card';
  import HoverCardSurface from './HoverCardSurface.svelte';

  let { target }: { target: HTMLElement } = $props();
</script>

<HoverCard open portalRef={target}>
  <HoverCardTrigger>Profile</HoverCardTrigger>
  <HoverCardSurface />
</HoverCard>