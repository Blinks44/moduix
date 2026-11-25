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
  <DatePicker :default-value="[parseDate('2026-06-22')]" default-view="month" fixed-weeks>
    <DatePickerLabel>Billing month</DatePickerLabel><DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView
        ><DatePickerView view="month"><DatePickerMonthTable /></DatePickerView
        ><DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>