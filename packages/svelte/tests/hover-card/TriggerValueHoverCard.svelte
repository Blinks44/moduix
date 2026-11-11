<script lang="ts">
  import { HoverCard, HoverCardTrigger } from '@/components/hover-card';
  import HoverCardSurface from './HoverCardSurface.svelte';

  let value = $state('');
</script>

<output>{value}</output>
<HoverCard
  openDelay={0}
  portalled={false}
  onTriggerValueChange={(details) => (value = details.value ?? '')}
>
  <HoverCardTrigger value="sarah">Sarah</HoverCardTrigger>
  <HoverCardTrigger value="alex">Alex</HoverCardTrigger>
  <HoverCardSurface />
</HoverCard>