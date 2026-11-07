<script lang="ts">
  import {
    DateInput,
    DateInputControl,
    DateInputLabel,
    DateInputSegment,
    DateInputSegmentContext,
    DateInputSegmentGroup,
    DateInputSeparator,
  } from '@/components/date-input';
</script>

<DateInput class="w-80 max-w-sm gap-4">
  <DateInputLabel>Release date</DateInputLabel>
  <DateInputControl class="w-80 rounded-lg bg-muted px-0 text-primary">
    <DateInputSegmentGroup class="gap-2">
      <DateInputSegmentContext>
        {#snippet render(segment)}
          <DateInputSegment {segment} class="min-w-0 px-0" />
        {/snippet}
      </DateInputSegmentContext>
    </DateInputSegmentGroup>
    <DateInputSeparator>to</DateInputSeparator>
  </DateInputControl>
</DateInput>