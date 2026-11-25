<script lang="ts">
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
    parseDate,
    type DateValue,
  } from '@moduix/svelte/date-picker';
  import { Stack } from '@moduix/svelte/stack';

  let value = $state<DateValue[]>([parseDate('2026-06-22')]);
</script>

<Stack align="center">
  <DatePicker bind:value>
    <DatePickerLabel>Controlled date</DatePickerLabel>
    <DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
        <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
        <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
  <div data-preview-meta>
    <output>Current value: {value[0]?.toString() ?? 'empty'}</output>
  </div>
</Stack>