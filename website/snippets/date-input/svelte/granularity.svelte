<script lang="ts">
  import { CalendarDateTime } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputHiddenInput,
    DateInputLabel,
    DateInputSegments,
  } from '@moduix/svelte/date-input';

  const value = [new CalendarDateTime(2026, 12, 5, 14, 30)];
</script>

<DateInput granularity="minute" hourCycle={24} name="scheduled-at" defaultValue={value}>
  <DateInputLabel>Date and time</DateInputLabel>
  <DateInputHiddenInput name="scheduled-at" />
  <DateInputControl>
    <DateInputSegments />
  </DateInputControl>
</DateInput>