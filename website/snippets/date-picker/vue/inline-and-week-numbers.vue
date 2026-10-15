<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerLabel,
  DatePickerMonthTable,
  DatePickerView,
  DatePickerYearTable,
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker
    inline
    selection-mode="multiple"
    :default-value="[parseDate('2026-06-22'), parseDate('2026-06-24')]"
    show-week-numbers
  >
    <DatePickerLabel>Available days</DatePickerLabel>
    <DatePickerContent
      ><DatePickerView view="day"><DatePickerDayTable /></DatePickerView
      ><DatePickerView view="month"><DatePickerMonthTable /></DatePickerView
      ><DatePickerView view="year"><DatePickerYearTable /></DatePickerView
    ></DatePickerContent>
  </DatePicker>
</template>