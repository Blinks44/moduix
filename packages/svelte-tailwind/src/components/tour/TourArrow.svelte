<script lang="ts">
  import { TourArrow, type TourArrowProps } from '@ark-ui/svelte/tour';
  import { cn } from '@/lib/moduix/cn';
  import TourArrowTip from './TourArrowTip.svelte';

  let { children, class: className, ref = $bindable(null), ...props }: TourArrowProps = $props();
</script>

<TourArrow
  {...props}
  bind:ref
  class={cn(
    '[--arrow-background:var(--color-popover)] [--arrow-size:var(--spacing-2_5)]',
    className,
  )}
  data-slot="tour-arrow"
>
  {#if children}
    {@render children()}
  {:else}
    <TourArrowTip />
  {/if}
</TourArrow>