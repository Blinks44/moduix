<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
  type DateInputDateValue,
} from '@moduix/vue/date-input';
import { shallowRef } from 'vue';
import styles from '@/components/examples/date-input/date-input-controlled.module.css';

const value = shallowRef<DateInputDateValue[]>([new CalendarDate(2026, 6, 22)]);
</script>

<template>
  <div :class="styles.stack">
    <DateInput v-model="value" :class="styles.root">
      <DateInputLabel>Controlled date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
    <output>Selected: {{ value[0]?.toString() ?? 'empty' }}</output>
  </div>
</template>