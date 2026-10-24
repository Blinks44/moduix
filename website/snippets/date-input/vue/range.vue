<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegments,
  DateInputSeparator,
} from '@moduix/vue/date-input';

const defaultRange = [new CalendarDate(2026, 6, 22), new CalendarDate(2026, 6, 26)];
</script>

<template>
  <DateInput selection-mode="range" :default-value="defaultRange">
    <DateInputLabel>Travel dates</DateInputLabel>
    <DateInputControl>
      <DateInputSegments :index="0" />
      <DateInputSeparator>to</DateInputSeparator>
      <DateInputSegments :index="1" />
    </DateInputControl>
    <DateInputHiddenInput :index="0" name="check-in" />
    <DateInputHiddenInput :index="1" name="check-out" />
  </DateInput>
</template>