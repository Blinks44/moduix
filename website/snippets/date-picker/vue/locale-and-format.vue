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
</script>

<template>
  <DatePicker locale="de-DE" :start-of-week="1" :default-value="[parseDate('2026-06-22')]">
    <DatePickerLabel>German locale</DatePickerLabel>
    <DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
        <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
        <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>