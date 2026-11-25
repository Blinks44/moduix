<script setup lang="ts">
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
} from '@moduix/vue/date-picker';
const min = parseDate('2026-06-22');
const max = parseDate('2026-06-30');
const isDateUnavailable = (value: { day: number }) => value.day === 25;
</script>

<template>
  <DatePicker
    :default-value="[parseDate('2026-06-24')]"
    :min="min"
    :max="max"
    :is-date-unavailable="isDateUnavailable"
  >
    <DatePickerLabel>Booking date</DatePickerLabel><DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView
        ><DatePickerView view="month"><DatePickerMonthTable /></DatePickerView
        ><DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>