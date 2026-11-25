<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerField,
    DatePickerLabel,
    DatePickerPositioner,
    DatePickerView,
    DatePickerYearTable,
    type DateValue,
  } from '@moduix/svelte/date-picker';
  const format = (date: DateValue) => String(date.year);
</script>

<DatePicker
  defaultValue={[new CalendarDate(2026, 1, 1)]}
  defaultView="year"
  minView="year"
  maxView="year"
  {format}
>
  <DatePickerLabel>Year</DatePickerLabel>
  <DatePickerField placeholder="yyyy" clearLabel="Clear year" />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>