<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerRangeText,
  DatePickerViewControl,
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker :default-value="[parseDate('2026-06-22')]" :num-of-months="2">
    <DatePickerLabel>Planning window</DatePickerLabel>
    <DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerViewControl>
          <DatePickerPrevTrigger />
          <DatePickerRangeText />
          <DatePickerNextTrigger />
        </DatePickerViewControl>
        <div>
          <DatePickerDayTable :show-header="false" />
          <DatePickerDayTable :offset="1" :show-header="false" />
        </div>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>