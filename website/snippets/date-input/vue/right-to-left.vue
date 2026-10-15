<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/vue/date-input';

const value = [new CalendarDate(2026, 6, 22)];
</script>

<template>
  <DateInput dir="rtl" locale="ar-EG" :default-value="value">
    <DateInputLabel>تاريخ الإطلاق</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInput>
</template>