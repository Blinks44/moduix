<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/vue/date-input';
import styles from '@/components/examples/date-input/date-input-disabled-and-read-only.module.css';

const value = [new CalendarDate(2026, 6, 22)];
</script>

<template>
  <div :class="styles.stack">
    <DateInput :class="styles.root" disabled name="disabled-date" :default-value="value">
      <DateInputLabel>Disabled date</DateInputLabel>
      <DateInputHiddenInput name="disabled-date" />
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>

    <DateInput :class="styles.root" read-only name="read-only-date" :default-value="value">
      <DateInputLabel>Read-only date</DateInputLabel>
      <DateInputHiddenInput name="read-only-date" />
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInput>
  </div>
</template>