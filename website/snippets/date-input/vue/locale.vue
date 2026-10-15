<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/vue/date-input';

const value = [new CalendarDate(2026, 12, 5)];
</script>

<template>
  <DateInput locale="de-DE" :default-value="value">
    <DateInputLabel>German locale</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInput>
</template>