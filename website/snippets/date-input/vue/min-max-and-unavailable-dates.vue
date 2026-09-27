<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/vue/date-input';
import styles from '@/components/examples/date-input/date-input-min-max-and-unavailable-dates.module.css';

const value = [new CalendarDate(2026, 6, 24)];
const minDate = new CalendarDate(2026, 6, 22);
const maxDate = new CalendarDate(2026, 6, 30);
const unavailableDay = 25;
const isDateUnavailable = (date: DateValue) => date.day === unavailableDay;
</script>

<template>
  <DateInput
    :class="styles.root"
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