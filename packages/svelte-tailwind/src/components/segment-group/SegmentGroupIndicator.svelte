<script lang="ts">
  import {
    SegmentGroupIndicator,
    type SegmentGroupIndicatorProps,
  } from '@ark-ui/svelte/segment-group';
  import { cn } from '@/lib/moduix/cn';

  const indicatorClass =
    'pointer-events-none top-(--top) left-(--left) -z-1 h-(--height) w-(--width) rounded-md bg-background shadow-sm [--transition-duration:var(--moduix-duration-normal)] [--transition-timing-function:var(--moduix-ease-in-out)]';

  let { class: className, ref = $bindable(null), ...props }: SegmentGroupIndicatorProps = $props();
</script>

<SegmentGroupIndicator
  {...props}
  bind:ref
  class={cn(indicatorClass, className)}
  data-slot="segment-group-indicator"
/>