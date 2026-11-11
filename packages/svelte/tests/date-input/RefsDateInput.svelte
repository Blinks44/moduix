<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputLabel,
    DateInputSegment,
    DateInputSegmentContext,
    DateInputSegmentGroup,
  } from '@/components/date-input';

  let rootRef = $state<HTMLElement | null>(null);
  let controlRef = $state<HTMLElement | null>(null);
  let segmentRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ controlRef, rootRef, segmentRef });
</script>

<DateInput
  bind:ref={rootRef}
  invalid
  class="consumer-root"
  data-slot="consumer-slot"
  data-probe="root"
  defaultValue={[new CalendarDate(2026, 6, 22)]}
  name="release-date"
>
  <DateInputLabel>Release date</DateInputLabel>
  <DateInputControl bind:ref={controlRef}>
    <DateInputSegmentGroup>
      <DateInputSegmentContext>
        {#snippet render(segment)}
          <DateInputSegment bind:ref={segmentRef} {segment} />
        {/snippet}
      </DateInputSegmentContext>
    </DateInputSegmentGroup>
  </DateInputControl>
</DateInput>