<script module lang="ts">
  import type { DateInputSegmentGroupProps } from '@ark-ui/svelte/date-input';

  export type DateInputSegmentsProps = Omit<DateInputSegmentGroupProps, 'asChild' | 'children'>;
</script>

<script lang="ts">
  import { DateInputSegmentContext } from '@ark-ui/svelte/date-input';
  import DateInputSegment from './DateInputSegment.svelte';
  import DateInputSegmentGroup from './DateInputSegmentGroup.svelte';

  let { ref = $bindable(null), ...props }: DateInputSegmentsProps = $props();
</script>

<DateInputSegmentGroup {...props} bind:ref>
  <DateInputSegmentContext>
    {#snippet render(segment)}
      <DateInputSegment {segment} />
    {/snippet}
  </DateInputSegmentContext>
</DateInputSegmentGroup>