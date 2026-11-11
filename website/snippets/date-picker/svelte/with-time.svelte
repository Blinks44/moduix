<script lang="ts">
  import type { DateValue } from '@ark-ui/svelte/date-picker';
  import { CalendarDateTime } from '@internationalized/date';
  import {
    DateInput,
    DateInputControl,
    DateInputLabel,
    DateInputSegments,
  } from '@moduix/svelte/date-input';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerField,
    DatePickerLabel,
    DatePickerMonthTable,
    DatePickerPositioner,
    DatePickerView,
    DatePickerYearTable,
  } from '@moduix/svelte/date-picker';

  let value = $state<DateValue[]>([new CalendarDateTime(2026, 6, 22, 14, 30)]);
  const handleDateChange = (details: { value: DateValue[] }) => {
    const nextDate = details.value[0];
    if (!nextDate) return (value = []);
    const current = value[0];
    const hour = current instanceof CalendarDateTime ? current.hour : 0;
    const minute = current instanceof CalendarDateTime ? current.minute : 0;
    value = [new CalendarDateTime(nextDate.year, nextDate.month, nextDate.day, hour, minute)];
  };
</script>

<DatePicker bind:value onValueChange={handleDateChange}>
  <DatePickerLabel>Appointment</DatePickerLabel>
  <DatePickerField />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
      <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>
<DateInput bind:value>
  <DateInputLabel>Time</DateInputLabel>
  <DateInputControl><DateInputSegments /></DateInputControl>
</DateInput>