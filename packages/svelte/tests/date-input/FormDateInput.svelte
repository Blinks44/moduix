<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputHiddenInput,
    DateInputLabel,
    DateInputRootProvider,
    DateInputSegments,
    DateInputSeparator,
    useDateInput,
  } from '@/components/date-input';

  const dateInput = useDateInput({
    id: 'report-date-input',
    defaultValue: [new CalendarDate(2026, 6, 22)],
    name: 'report-date',
  });
</script>

<form>
  <DateInput
    selectionMode="range"
    defaultValue={[new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)]}
  >
    <DateInputLabel>Travel dates</DateInputLabel>
    <DateInputControl>
      <DateInputSegments index={0} />
      <DateInputSeparator>to</DateInputSeparator>
      <DateInputSegments index={1} />
    </DateInputControl>
    <DateInputHiddenInput index={0} name="check-in" />
    <DateInputHiddenInput index={1} name="check-out" />
  </DateInput>
  <DateInputRootProvider value={dateInput}>
    <DateInputLabel>Report date</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
    <DateInputHiddenInput name="report-date" />
  </DateInputRootProvider>
</form>