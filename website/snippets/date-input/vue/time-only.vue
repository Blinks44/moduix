<script setup lang="ts">
import { CalendarDateTime, DateFormatter } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/vue/date-input';
import styles from '@/components/examples/date-input/date-input-time-only.module.css';

const formatter = new DateFormatter('en-US', {
  hour: '2-digit',
  hourCycle: 'h23',
  minute: '2-digit',
});
const value = [new CalendarDateTime(2026, 6, 22, 14, 30)];
</script>

<template>
  <DateInput
    :class="styles.root"
    granularity="minute"
    :hour-cycle="24"
    :formatter="formatter"
    :default-value="value"
  >
    <DateInputLabel>Start time</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInput>
</template>