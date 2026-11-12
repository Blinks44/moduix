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
import styles from '@/components/examples/date-picker/date-picker-multiple-months.module.css';
</script>

<template>
  <DatePicker :default-value="[parseDate('2026-06-22')]" :num-of-months="2">
    <DatePickerLabel>Planning window</DatePickerLabel>
    <DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent :class="styles.content">
        <DatePickerViewControl>
          <DatePickerPrevTrigger />
          <DatePickerRangeText />
          <DatePickerNextTrigger />
        </DatePickerViewControl>
        <div :class="styles.months">
          <DatePickerDayTable :class="styles.table" :show-header="false" />
          <DatePickerDayTable :class="styles.table" :offset="1" :show-header="false" />
        </div>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>