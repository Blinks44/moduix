<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerContext,
  DatePickerControl,
  DatePickerContent,
  DatePickerDayTable,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerTrigger,
  DatePickerView,
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker
    selection-mode="multiple"
    :max-selected-dates="3"
    :default-value="[parseDate('2026-06-22'), parseDate('2026-06-24')]"
  >
    <DatePickerLabel>Meeting days</DatePickerLabel>
    <DatePickerControl>
      <DatePickerContext v-slot="context">
        <span v-if="context.value.length === 0">Select dates...</span>
        <template v-for="(value, index) in context.value" v-else :key="value.toString()">
          <span>{{ value.toString() }}</span
          ><button
            type="button"
            @click="context.setValue(context.value.filter((_, itemIndex) => itemIndex !== index))"
          >
            Remove
          </button>
        </template>
      </DatePickerContext>
      <DatePickerClearTrigger aria-label="Clear dates" /><DatePickerTrigger
        aria-label="Open calendar"
      />
    </DatePickerControl>
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>