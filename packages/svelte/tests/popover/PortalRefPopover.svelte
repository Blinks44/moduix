<script lang="ts">
  import { Popover, PopoverTrigger } from '@/components/popover';
  import PopoverSurface from './PopoverSurface.svelte';

  let { targetType }: { targetType: 'element' | 'getter' } = $props();
  let portalTarget: HTMLElement | undefined = $state();
</script>

<div bind:this={portalTarget} data-testid="portal"></div>
{#if portalTarget}
  <Popover defaultOpen portalRef={targetType === 'getter' ? () => portalTarget : portalTarget}>
    <PopoverTrigger>Open</PopoverTrigger>
    <PopoverSurface />
  </Popover>
{/if}