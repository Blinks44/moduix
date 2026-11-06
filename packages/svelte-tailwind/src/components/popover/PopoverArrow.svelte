<script lang="ts">
  import { PopoverArrow, type PopoverArrowProps } from '@ark-ui/svelte/popover';
  import { cn } from '@/lib/moduix/cn';
  import PopoverArrowTip from './PopoverArrowTip.svelte';

  let { children, class: className, ref = $bindable(null), ...props }: PopoverArrowProps = $props();
</script>

<PopoverArrow
  {...props}
  bind:ref
  class={cn(
    '[--arrow-background:var(--color-popover)] [--arrow-size:var(--spacing-2_5)]',
    className,
  )}
  data-slot="popover-arrow"
>
  {#if children}
    {@render children()}
  {:else}
    <PopoverArrowTip />
  {/if}
</PopoverArrow>