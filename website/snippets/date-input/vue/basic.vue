<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/vue/date-input';
import styles from '@/components/examples/date-input/date-input-basic.module.css';

const value = [new CalendarDate(2026, 6, 22)];
</script>

<template>
  <DateInput :class="styles.root" :default-value="value" name="release-date">
    <DateInputLabel>Release date</DateInputLabel>
    <DateInputControl>
      <DateInputSegments />
    </DateInputControl>
    <DateInputHiddenInput />
  </DateInput>
</template>