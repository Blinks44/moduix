<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import type { DatePickerRootProps } from '@moduix/vue/date-picker';
import {
  DatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerView,
} from '@moduix/vue/date-picker';
import { shallowRef } from 'vue';

type DatePickerValue = NonNullable<DatePickerRootProps['modelValue']>;
const value = shallowRef<DatePickerValue>([parseDate('2026-06-22') as DatePickerValue[number]]);
</script>

<template>
  <DatePicker v-model="value">
    <DatePickerLabel>Controlled date</DatePickerLabel>
    <DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
    <output>Current value: {{ value[0]?.toString() ?? 'empty' }}</output>
  </DatePicker>
</template>