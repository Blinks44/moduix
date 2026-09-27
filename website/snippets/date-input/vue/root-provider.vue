<script setup lang="ts">
import { today } from '@internationalized/date';
import { Button } from '@moduix/vue/button';
import {
  DateInputControl,
  DateInputLabel,
  DateInputRootProvider,
  DateInputSegments,
  useDateInput,
} from '@moduix/vue/date-input';
import styles from '@/components/examples/date-input/date-input-root-provider.module.css';

const dateInput = useDateInput({
  defaultValue: [today('UTC')],
  name: 'report-date',
});
</script>

<template>
  <div :class="styles.stack">
    <DateInputRootProvider :class="styles.root" :value="dateInput">
      <DateInputLabel>Report date</DateInputLabel>
      <DateInputControl>
        <DateInputSegments />
      </DateInputControl>
    </DateInputRootProvider>
    <output>Selected: {{ dateInput.value[0]?.toString() ?? 'empty' }}</output>
    <Button type="button" size="sm" variant="outline" @click="dateInput.clearValue()">
      Clear
    </Button>
    <Button type="button" size="sm" variant="outline" @click="dateInput.focus()"> Focus </Button>
  </div>
</template>