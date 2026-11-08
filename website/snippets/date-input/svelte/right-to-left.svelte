<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputLabel,
    DateInputSegments,
  } from '@moduix/svelte/date-input';

  const value = [new CalendarDate(2026, 6, 22)];
</script>

<DateInput dir="rtl" locale="ar-EG" defaultValue={value}>
  <DateInputLabel>تاريخ الإطلاق</DateInputLabel>
  <DateInputControl>
    <DateInputSegments />
  </DateInputControl>
</DateInput>