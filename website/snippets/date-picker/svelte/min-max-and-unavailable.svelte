<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
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

  const min = parseDate('2026-06-22');
  const max = parseDate('2026-06-30');
  const isDateUnavailable = (value: { day: number }) => value.day === 25;
</script>

<DatePicker defaultValue={[parseDate('2026-06-24')]} {min} {max} {isDateUnavailable}>
  <DatePickerLabel>Booking date</DatePickerLabel>
  <DatePickerField />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
      <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>