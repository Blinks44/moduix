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
          ><div
            style="
              display: grid;
              grid-template-columns: minmax(7rem, 1fr) minmax(6.25rem, 1fr);
              gap: 0.25rem;
              min-width: 0;
            "
          >
            <DatePickerMonthSelect /><DatePickerYearSelect />
          </div>
          <DatePickerPrevTrigger /><DatePickerNextTrigger
        /></DatePickerViewControl>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView> </DatePickerContent
    ></DatePickerPositioner>
  </DatePicker>
</template>