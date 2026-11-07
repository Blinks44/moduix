<script lang="ts">
  import {
    DateInputSegmentGroup,
    type DateInputSegmentGroupProps,
  } from '@ark-ui/svelte/date-input';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DateInputSegmentGroupProps = $props();
</script>

<DateInputSegmentGroup
  {...props}
  bind:ref
  class={cn('flex items-center gap-0.5 tabular-nums', className)}
  data-slot="date-input-segment-group"
/>