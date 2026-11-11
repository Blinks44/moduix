<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputLabel,
    DateInputSegments,
  } from '@moduix/svelte/date-input';

  const value = [new CalendarDate(2026, 6, 2)];
</script>

<DateInput defaultValue={value} shouldForceLeadingZeros={false}>
  <DateInputLabel>Flexible numeric segments</DateInputLabel>
  <DateInputControl>
    <DateInputSegments />
  </DateInputControl>
</DateInput>