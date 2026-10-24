<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
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
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker :default-value="[parseDate('2026-06-22')]" name="release-date">
    <DatePickerLabel>Release date</DatePickerLabel>
    <DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView
        ><DatePickerView view="month"><DatePickerMonthTable /></DatePickerView
        ><DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>