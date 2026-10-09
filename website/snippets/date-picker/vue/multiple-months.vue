<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerDayTable,
  DatePickerField,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerView,
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker :default-value="[parseDate('2026-06-22')]" :num-of-months="2">
    <DatePickerLabel>Planning window</DatePickerLabel><DatePickerField />
    <DatePickerPositioner
      ><DatePickerContent
        ><DatePickerView view="day">
          <DatePickerContext v-slot="context"
            ><DatePickerDayTable /><DatePickerDayTable :offset="context.getOffset({ months: 1 })"
          /></DatePickerContext> </DatePickerView></DatePickerContent
    ></DatePickerPositioner>
  </DatePicker>
</template>