<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerMonthSelect,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerYearSelect,
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker :default-value="[parseDate('2026-06-22')]">
    <DatePickerLabel>Report date</DatePickerLabel><DatePickerField />
    <DatePickerPositioner
      ><DatePickerContent>
        <DatePickerViewControl
          ><DatePickerMonthSelect /><DatePickerYearSelect /><DatePickerPrevTrigger /><DatePickerNextTrigger
        /></DatePickerViewControl>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView> </DatePickerContent
    ></DatePickerPositioner>
  </DatePicker>
</template>