<script lang="ts">
  import {
    Avatar,
    AvatarContext,
    AvatarFallback,
    AvatarImage,
    type AvatarStatusChangeDetails,
  } from '@/components/avatar';
  import HookState from './HookState.svelte';

  let {
    onStatusChange,
    src,
  }: { onStatusChange?: (details: AvatarStatusChangeDetails) => void; src?: string } = $props();
</script>

<Avatar {onStatusChange}>
  <AvatarContext>
    {#snippet render(context)}
      <output>Slot: {context().loaded ? 'loaded' : 'loading'}</output>
    {/snippet}
  </AvatarContext>
  <HookState />
  <AvatarFallback>AT</AvatarFallback>
  <AvatarImage {src} alt="Alex T." />
</Avatar>