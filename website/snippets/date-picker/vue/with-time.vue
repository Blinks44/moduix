<script setup lang="ts">
import { CalendarDateTime } from '@internationalized/date';
import {
  DateInput,
  DateInputControl,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/vue/date-input';
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
const value = shallowRef<DatePickerValue>([
  new CalendarDateTime(2026, 6, 22, 14, 30) as DatePickerValue[number],
]);
const handleDateChange = (details: { value: DatePickerValue }) => {
  const nextDate = details.value[0];
  if (!nextDate) return (value.value = []);
  const current = value.value[0];
  const hour = current instanceof CalendarDateTime ? current.hour : 0;
  const minute = current instanceof CalendarDateTime ? current.minute : 0;
  value.value = [
    new CalendarDateTime(
      nextDate.year,
      nextDate.month,
      nextDate.day,
      hour,
      minute,
    ) as DatePickerValue[number],
  ];
};
</script>

<template>
  <DatePicker v-model="value" @value-change="handleDateChange">
    <DatePickerLabel>Appointment</DatePickerLabel><DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
  <DateInput v-model="value"
    ><DateInputLabel>Time</DateInputLabel><DateInputControl><DateInputSegments /></DateInputControl
  ></DateInput>
</template>