<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerMonthSelect,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerYearSelect,
} from '@moduix/vue/date-picker';
import styles from '@/components/examples/date-picker/date-picker-month-year-select.module.css';
</script>

<template>
  <DatePicker :default-value="[parseDate('2026-06-22')]">
    <DatePickerLabel>Report date</DatePickerLabel>
    <DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerViewControl :class="styles.control">
          <div :class="styles.selects">
            <DatePickerMonthSelect />
            <DatePickerYearSelect />
          </div>
          <div :class="styles.nav">
            <DatePickerPrevTrigger />
            <DatePickerNextTrigger />
          </div>
        </DatePickerViewControl>
        <DatePickerView view="day"><DatePickerDayTable :show-header="false" /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>