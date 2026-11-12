<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerMonthTable,
  DatePickerPositioner,
  DatePickerView,
  DatePickerYearTable,
} from '@moduix/vue/date-picker';
import styles from '@/components/examples/date-picker/date-picker-select-today.module.css';
</script>

<template>
  <DatePicker>
    <DatePickerLabel>Today shortcut</DatePickerLabel>
    <DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day">
          <DatePickerDayTable />
          <DatePickerContext v-slot="context">
            <div :class="styles.todayRow">
              <Button size="sm" variant="secondary" @click="context.selectToday()">Today</Button>
            </div>
          </DatePickerContext>
        </DatePickerView>
        <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
        <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>