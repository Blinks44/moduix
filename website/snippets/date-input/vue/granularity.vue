<script setup lang="ts">
import { CalendarDateTime } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/vue/date-input';

const value = [new CalendarDateTime(2026, 12, 5, 14, 30)];
</script>

<template>
  <DateInput granularity="minute" :hour-cycle="24" name="scheduled-at" :default-value="value">
    <DateInputLabel>Date and time</DateInputLabel>
    <DateInputHiddenInput name="scheduled-at" />
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInput>
</template>