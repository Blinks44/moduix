<script setup lang="ts">
import type { DateValue } from '@ark-ui/vue/date-picker';
import { CalendarDate } from '@internationalized/date';
import {
  DatePicker,
  DatePickerContent,
  DatePickerField,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerView,
  DatePickerYearTable,
} from '@moduix/vue/date-picker';

const format = (date: DateValue) => String(date.year);
</script>

<template>
  <DatePicker
    :default-value="[new CalendarDate(2026, 1, 1)]"
    default-view="year"
    min-view="year"
    max-view="year"
    :format="format"
  >
    <DatePickerLabel>Year</DatePickerLabel>
    <DatePickerField placeholder="yyyy" clear-label="Clear year" />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>