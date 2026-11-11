<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputLabel,
    DateInputSegments,
  } from '@moduix/svelte/date-input';

  const value = [new CalendarDate(2026, 12, 5)];
</script>

<DateInput locale="de-DE" defaultValue={value}>
  <DateInputLabel>German locale</DateInputLabel>
  <DateInputControl>
    <DateInputSegments />
  </DateInputControl>
</DateInput>