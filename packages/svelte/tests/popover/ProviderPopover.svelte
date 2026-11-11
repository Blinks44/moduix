<script lang="ts">
  import {
    PopoverContext,
    PopoverRootProvider,
    PopoverTrigger,
    usePopover,
  } from '@/components/popover';
  import PopoverHookState from './PopoverHookState.svelte';
  import PopoverSurface from './PopoverSurface.svelte';

  const popover = usePopover({ portalled: false });
</script>

<PopoverRootProvider value={popover}>
  <button type="button" onclick={() => popover().setOpen(true)}>Open from API</button>
  <PopoverContext>
    {#snippet render(context)}
      <output>Slot: {context().open ? 'open' : 'closed'}</output>
    {/snippet}
  </PopoverContext>
  <PopoverTrigger>Open popover</PopoverTrigger>
  <PopoverSurface />
  <PopoverHookState />
</PopoverRootProvider>