<script lang="ts">
  import { TourArrowTip, type TourArrowTipProps } from '@ark-ui/svelte/tour';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TourArrowTipProps = $props();
</script>

<TourArrowTip
  {...props}
  bind:ref
  class={cn('border-t border-l border-border', className)}
  data-slot="tour-arrow-tip"
/>