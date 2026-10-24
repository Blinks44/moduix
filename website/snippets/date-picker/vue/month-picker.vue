<script setup lang="ts">
import type { DateValue } from '@ark-ui/vue/date-picker';
import { CalendarDate } from '@internationalized/date';
import {
  DatePicker,
  DatePickerContent,
  DatePickerField,
  DatePickerLabel,
  DatePickerMonthTable,
  DatePickerPositioner,
  DatePickerView,
} from '@moduix/vue/date-picker';

const format = (date: DateValue) => `${String(date.month).padStart(2, '0')}/${date.year}`;
const parse = (value: string) => {
  const match = value.match(/^(\d{1,2})\/(\d{4})$/);
  return match ? new CalendarDate(Number(match[2]), Number(match[1]), 1) : undefined;
};
</script>

<template>
  <DatePicker
    default-view="month"
    min-view="month"
    max-view="month"
    :format="format"
    :parse="parse"
  >
    <DatePickerLabel>Month</DatePickerLabel>
    <DatePickerField placeholder="mm/yyyy" clear-label="Clear month" />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>