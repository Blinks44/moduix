<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputHiddenInput,
    DateInputLabel,
    DateInputSegment,
    DateInputSegmentContext,
    DateInputSegmentGroup,
  } from '@moduix/svelte/date-input';

  const value = [new CalendarDate(2026, 6, 22)];
</script>

<DateInput defaultValue={value} name="release-date">
  <DateInputLabel>Release date</DateInputLabel>
  <DateInputControl>
    <DateInputSegmentGroup>
      <DateInputSegmentContext>
        {#snippet render(segment)}
          <DateInputSegment {segment} />
        {/snippet}
      </DateInputSegmentContext>
    </DateInputSegmentGroup>
  </DateInputControl>
  <DateInputHiddenInput />
</DateInput>