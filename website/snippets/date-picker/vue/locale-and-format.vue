<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerView,
} from '@moduix/vue/date-picker';

const translations = {
  clearTrigger: 'Clear date',
  content: 'Calendar',
  dayCell: () => 'Date',
  monthSelect: 'Month',
  nextTrigger: () => 'Next',
  placeholder: () => ({ day: 'dd', month: 'mm', year: 'yyyy' }),
  prevTrigger: () => 'Previous',
  trigger: (open: boolean) => (open ? 'Close calendar' : 'Open calendar'),
  viewTrigger: () => 'Change view',
  yearSelect: 'Year',
};
const format = (value: { year: number; month: number; day: number }) =>
  `${value.day}.${value.month}.${value.year}`;
</script>

<template>
  <DatePicker
    :default-value="[parseDate('2026-06-22')]"
    locale="de-DE"
    :translations="translations"
    :format="format"
  >
    <DatePickerLabel>Localized date</DatePickerLabel><DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>