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

const min = parseDate('2026-06-22');
const max = parseDate('2026-06-30');
const isDateUnavailable = (value: { day: number }) => value.day === 25;
</script>

<template>
  <DatePicker
    :default-value="[parseDate('2026-06-24')]"
    :min="min"
    :max="max"
    :is-date-unavailable="isDateUnavailable"
  >
    <DatePickerLabel>Booking date</DatePickerLabel><DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>