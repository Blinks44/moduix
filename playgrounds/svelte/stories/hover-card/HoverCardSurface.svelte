<script lang="ts">
  import {
    HoverCardArrow,
    HoverCardBody,
    HoverCardContent,
    HoverCardPositioner,
  } from '@/components/hover-card';
  import ProfileCard from './ProfileCard.svelte';
  import type { Profile } from './profiles';

  let { profile, withArrow = false }: { profile: Profile; withArrow?: boolean } = $props();
</script>

<HoverCardPositioner>
  <HoverCardContent>
    {#if withArrow}<HoverCardArrow />{/if}
    <HoverCardBody><ProfileCard {profile} /></HoverCardBody>
  </HoverCardContent>
</HoverCardPositioner>