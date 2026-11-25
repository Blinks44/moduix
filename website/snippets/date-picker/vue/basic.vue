<script setup lang="ts">
import {
  DatePicker,
  DatePickerField,
  DatePickerLabel,
  DatePickerPanel,
  parseDate,
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker :default-value="[parseDate('2026-06-22')]" name="release-date">
    <DatePickerLabel>Release date</DatePickerLabel>
    <DatePickerField />
    <DatePickerPanel />
  </DatePicker>
</template>