<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerLabel,
  DatePickerControl,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerClearTrigger,
  DatePickerPositioner,
  DatePickerView,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerViewTrigger,
  DatePickerTable,
  DatePickerTableHead,
  DatePickerTableBody,
  DatePickerTableHeader,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableRow,
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker :default-value="[parseDate('2026-06-22')]">
    <DatePickerLabel>Advanced date</DatePickerLabel
    ><DatePickerControl
      ><DatePickerInput placeholder="Select date" /><DatePickerClearTrigger
        aria-label="Clear date" /><DatePickerTrigger aria-label="Open calendar"
    /></DatePickerControl>
    <DatePickerPositioner
      ><DatePickerContent
        ><DatePickerView view="day">
          <DatePickerViewControl
            ><DatePickerPrevTrigger /><DatePickerViewTrigger /><DatePickerNextTrigger
          /></DatePickerViewControl>
          <DatePickerContext v-slot="context"
            ><DatePickerTable
              ><DatePickerTableHead
                ><DatePickerTableRow
                  ><DatePickerTableHeader
                    v-for="weekDay in context.weekDays"
                    :key="weekDay.value.toString()"
                    >{{ weekDay.short }}</DatePickerTableHeader
                  ></DatePickerTableRow
                ></DatePickerTableHead
              ><DatePickerTableBody>
                <DatePickerTableRow v-for="week in context.weeks" :key="week[0]?.toString()"
                  ><DatePickerTableCell v-for="day in week" :key="day.toString()" :value="day"
                    ><DatePickerTableCellTrigger>{{
                      day.day
                    }}</DatePickerTableCellTrigger></DatePickerTableCell
                  ></DatePickerTableRow
                >
              </DatePickerTableBody></DatePickerTable
            ></DatePickerContext
          >
        </DatePickerView></DatePickerContent
      ></DatePickerPositioner
    >
  </DatePicker>
</template>