<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegment,
  DateInputSegmentContext,
  DateInputSegmentGroup,
} from '@moduix/vue/date-input';
import styles from '@/components/examples/date-input/date-input-advanced-customization.module.css';

const value = [new CalendarDate(2026, 6, 22)];
</script>

<template>
  <DateInput :class="styles.root" name="custom-date" :default-value="value">
    <DateInputLabel>Custom segments</DateInputLabel>
    <DateInputHiddenInput name="custom-date" />
    <DateInputControl :class="styles.control">
      <DateInputSegmentGroup>
        <DateInputSegmentContext v-slot="segment">
          <DateInputSegment
            :segment="segment"
            :class="segment.type === 'day' ? styles.daySegment : styles.segment"
          />
        </DateInputSegmentContext>
      </DateInputSegmentGroup>
    </DateInputControl>
  </DateInput>
</template>