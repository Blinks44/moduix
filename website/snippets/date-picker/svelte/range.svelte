<script lang="ts">
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerRangeField,
    DatePickerLabel,
    DatePickerMonthTable,
    DatePickerPositioner,
    DatePickerView,
    DatePickerYearTable,
    parseDate,
  } from '@moduix/svelte/date-picker';
</script>

<DatePicker selectionMode="range" defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-26')]}>
  <DatePickerLabel>Travel dates</DatePickerLabel>
  <DatePickerRangeField />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
      <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>