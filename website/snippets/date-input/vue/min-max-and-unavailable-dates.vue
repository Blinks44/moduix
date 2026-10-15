<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/vue/date-input';

const value = [new CalendarDate(2026, 6, 24)];
const minDate = new CalendarDate(2026, 6, 22);
const maxDate = new CalendarDate(2026, 6, 30);
const unavailableDay = 25;
const isDateUnavailable = (date: DateValue) => date.day === unavailableDay;
</script>

<template>
  <DateInput
    :default-value="value"
    :min="minDate"
    :max="maxDate"
    :is-date-unavailable="isDateUnavailable"
  >
    <DateInputLabel>Booking date</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInput>
</template>