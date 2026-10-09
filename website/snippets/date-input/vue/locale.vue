<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/vue/date-input';
import styles from '@/components/examples/date-input/date-input-locale.module.css';

const value = [new CalendarDate(2026, 12, 5)];
</script>

<template>
  <DateInput :class="styles.root" locale="de-DE" :default-value="value">
    <DateInputLabel>German locale</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
  </DateInput>
</template>