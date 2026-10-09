<script setup lang="ts">
import {
  DatePicker,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerPresetTrigger,
  DatePickerRangeField,
  DatePickerView,
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker selection-mode="range">
    <DatePickerLabel>Preset range</DatePickerLabel><DatePickerRangeField />
    <DatePickerPositioner
      ><DatePickerContent>
        <div>
          <DatePickerPresetTrigger value="last7Days">Last 7 days</DatePickerPresetTrigger
          ><DatePickerPresetTrigger value="last30Days">Last 30 days</DatePickerPresetTrigger>
        </div>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView> </DatePickerContent
    ></DatePickerPositioner>
  </DatePicker>
</template>