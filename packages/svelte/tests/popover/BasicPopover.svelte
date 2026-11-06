<script lang="ts">
  import { Popover, PopoverTrigger, type PopoverRootProps } from '@/components/popover';
  import PopoverSurface from './PopoverSurface.svelte';

  let { open = $bindable(), ...props }: PopoverRootProps = $props();
</script>

<div data-testid="host">
  <Popover {...props} bind:open>
    <PopoverTrigger>Open popover</PopoverTrigger>
    <PopoverSurface />
  </Popover>
</div>