<script lang="ts">
  import { CalendarDateTime, DateFormatter } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputLabel,
    DateInputSegments,
  } from '@moduix/svelte/date-input';

  const formatter = new DateFormatter('en-US', {
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
  });
  const value = [new CalendarDateTime(2026, 6, 22, 14, 30)];
</script>

<DateInput granularity="minute" hourCycle={24} {formatter} defaultValue={value}>
  <DateInputLabel>Start time</DateInputLabel>
  <DateInputControl>
    <DateInputSegments />
  </DateInputControl>
</DateInput>