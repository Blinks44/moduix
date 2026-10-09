<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegments,
} from '../../src/components/date-input';
const defaultValue = [new CalendarDate(2026, 6, 22)];
</script>

<template>
  <DateInput invalid :default-value="defaultValue">
    <DateInputLabel>Hydrated date</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
    <DateInputHiddenInput name="hydrated-date" />
  </DateInput>
</template>