<script setup lang="ts">
import { today } from '@internationalized/date';
import { Button } from '@moduix/vue/button';
import {
  useDatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerRootProvider,
  DatePickerView,
} from '@moduix/vue/date-picker';

const datePicker = useDatePicker({ defaultValue: [today('UTC')] });
</script>

<template>
  <DatePickerRootProvider :value="datePicker">
    <DatePickerLabel>Report date</DatePickerLabel><DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePickerRootProvider>
  <Button size="sm" variant="secondary" @click="datePicker.clearValue()">Clear</Button>
</template>