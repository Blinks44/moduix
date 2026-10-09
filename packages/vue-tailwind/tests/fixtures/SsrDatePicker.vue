<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerLabel,
  DatePickerField,
  DatePickerMonthSelect,
  DatePickerYearSelect,
  DatePickerValueText,
} from '../../src/components/date-picker';
const date = parseDate('2026-06-22');
</script>

<template>
  <DatePicker :default-value="[date]">
    <DatePickerLabel>Release date</DatePickerLabel><DatePickerField />
    <DatePickerMonthSelect aria-label="SSR month" />
    <DatePickerYearSelect aria-label="SSR year" />
    <DatePickerValueText />
  </DatePicker>
</template>