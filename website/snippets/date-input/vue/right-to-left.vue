<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/vue/date-input';
import styles from '@/components/examples/date-input/date-input-right-to-left.module.css';

const value = [new CalendarDate(2026, 6, 22)];
</script>

<template>
  <DateInput :class="styles.root" dir="rtl" locale="ar-EG" :default-value="value">
    <DateInputLabel>تاريخ الإطلاق</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInput>
</template>