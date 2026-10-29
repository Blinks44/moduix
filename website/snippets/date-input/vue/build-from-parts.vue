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

const value = [new CalendarDate(2026, 6, 22)];
</script>

<template>
  <DateInput :default-value="value" name="release-date">
    <DateInputLabel>Release date</DateInputLabel>
    <DateInputControl>
      <DateInputSegmentGroup>
        <DateInputSegmentContext v-slot="segment">
          <DateInputSegment :segment="segment" />
        </DateInputSegmentContext>
      </DateInputSegmentGroup>
    </DateInputControl>
    <DateInputHiddenInput />
  </DateInput>
</template>