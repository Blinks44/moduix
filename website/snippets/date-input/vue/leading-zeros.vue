<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/vue/date-input';

const value = [new CalendarDate(2026, 6, 2)];
</script>

<template>
  <DateInput :default-value="value" :should-force-leading-zeros="false">
    <DateInputLabel>Flexible numeric segments</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInput>
</template>