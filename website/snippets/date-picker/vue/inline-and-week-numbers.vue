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
import styles from '@/components/examples/date-picker/date-picker-inline-and-week-numbers.module.css';
</script>

<template>
  <div :class="styles.root">
    <DatePicker
      inline
      selection-mode="multiple"
      :max-selected-dates="3"
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
  </div>
</template>