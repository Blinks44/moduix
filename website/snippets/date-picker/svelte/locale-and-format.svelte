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

  const translations = {
    clearTrigger: 'Clear date',
    content: 'Calendar',
    dayCell: () => 'Date',
    monthSelect: 'Month',
    nextTrigger: () => 'Next',
    placeholder: () => ({ day: 'dd', month: 'mm', year: 'yyyy' }),
    prevTrigger: () => 'Previous',
    trigger: (open: boolean) => (open ? 'Close calendar' : 'Open calendar'),
    viewTrigger: () => 'Change view',
    yearSelect: 'Year',
  };
  const format = (value: { year: number; month: number; day: number }) =>
    `${value.day}.${value.month}.${value.year}`;
</script>

<DatePicker defaultValue={[parseDate('2026-06-22')]} locale="de-DE" {translations} {format}>
  <DatePickerLabel>Localized date</DatePickerLabel>
  <DatePickerField />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
      <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>