<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerRangeField,
  DatePickerView,
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker
    selection-mode="range"
    :default-value="[parseDate('2026-06-22'), parseDate('2026-06-26')]"
  >
    <DatePickerLabel>Travel dates</DatePickerLabel><DatePickerRangeField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>