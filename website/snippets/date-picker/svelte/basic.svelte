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
</script>

<DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
  <DatePickerLabel>Release date</DatePickerLabel>
  <DatePickerField />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
      <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>