<script lang="ts">
  import {
    HoverCardContext,
    HoverCardRootProvider,
    HoverCardTrigger,
    useHoverCard,
  } from '@/components/hover-card';
  import HoverCardHookState from './HoverCardHookState.svelte';
  import HoverCardSurface from './HoverCardSurface.svelte';

  const hoverCard = useHoverCard({ id: 'provider-hover-card', openDelay: 0 });
</script>

<HoverCardRootProvider value={hoverCard} portalled={false}>
  <HoverCardContext>
    {#snippet render(context)}
      <output>Slot: {context().open ? 'open' : 'closed'}</output>
    {/snippet}
  </HoverCardContext>
  <HoverCardTrigger>Profile</HoverCardTrigger>
  <HoverCardSurface />
  <HoverCardHookState />
</HoverCardRootProvider>