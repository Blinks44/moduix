<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputHiddenInput,
    DateInputLabel,
    DateInputSegments,
  } from '@/components/date-input';
</script>

<DateInput invalid defaultValue={[new CalendarDate(2026, 6, 22)]}>
  <DateInputLabel>Hydrated date</DateInputLabel>
  <DateInputControl>
    <DateInputSegments />
  </DateInputControl>
  <DateInputHiddenInput name="hydrated-date" />
</DateInput>