<script setup lang="ts">
import {
  DatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerLabel,
  DatePickerMonthTable,
  DatePickerPositioner,
  DatePickerRangeField,
  DatePickerView,
  DatePickerYearTable,
  parseDate,
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker
    selection-mode="range"
    :default-value="[parseDate('2026-06-22'), parseDate('2026-06-26')]"
  >
    <DatePickerLabel>Travel dates</DatePickerLabel><DatePickerRangeField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView
        ><DatePickerView view="month"><DatePickerMonthTable /></DatePickerView
        ><DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>