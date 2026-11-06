<script lang="ts">
  import { TooltipArrow, type TooltipArrowProps } from '@ark-ui/svelte/tooltip';
  import { cn } from '@/lib/moduix/cn';
  import TooltipArrowTip from './TooltipArrowTip.svelte';

  let { children, class: className, ref = $bindable(null), ...props }: TooltipArrowProps = $props();
</script>

<TooltipArrow
  {...props}
  bind:ref
  class={cn(
    '[--arrow-background:var(--color-popover)] [--arrow-size:var(--spacing-2_5)]',
    className,
  )}
  data-slot="tooltip-arrow"
>
  {#if children}
    {@render children()}
  {:else}
    <TooltipArrowTip />
  {/if}
</TooltipArrow>