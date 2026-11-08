<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerLabel,
    DatePickerMonthTable,
    DatePickerView,
    DatePickerYearTable,
  } from '@moduix/svelte/date-picker';
</script>

<DatePicker
  inline
  selectionMode="multiple"
  defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
  showWeekNumbers
>
  <DatePickerLabel>Available days</DatePickerLabel>
  <DatePickerContent>
    <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
    <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
    <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
  </DatePickerContent>
</DatePicker>