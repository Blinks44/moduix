<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerContent,
  DatePickerContext,
  DatePickerControl,
  DatePickerInput,
  DatePickerLabel,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
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
          > </DatePickerView
        ><DatePickerView view="month">
          <DatePickerViewControl
            ><DatePickerPrevTrigger /><DatePickerViewTrigger /><DatePickerNextTrigger
          /></DatePickerViewControl>
          <DatePickerContext v-slot="context"
            ><DatePickerTable :columns="4"
              ><DatePickerTableBody>
                <DatePickerTableRow
                  v-for="months in context.getMonthsGrid({ columns: 4, format: 'short' })"
                  :key="months[0]?.value"
                  ><DatePickerTableCell
                    v-for="month in months"
                    :key="month.value"
                    :value="month.value"
                    ><DatePickerTableCellTrigger>{{
                      month.label
                    }}</DatePickerTableCellTrigger></DatePickerTableCell
                  ></DatePickerTableRow
                >
              </DatePickerTableBody></DatePickerTable
            ></DatePickerContext
          > </DatePickerView
        ><DatePickerView view="year">
          <DatePickerViewControl
            ><DatePickerPrevTrigger /><DatePickerViewTrigger /><DatePickerNextTrigger
          /></DatePickerViewControl>
          <DatePickerContext v-slot="context"
            ><DatePickerTable :columns="4"
              ><DatePickerTableBody>
                <DatePickerTableRow
                  v-for="years in context.getYearsGrid({ columns: 4 })"
                  :key="years[0]?.value"
                  ><DatePickerTableCell
                    v-for="year in years"
                    :key="year.value"
                    :value="year.value"
                    :disabled="year.disabled"
                    ><DatePickerTableCellTrigger>{{
                      year.label
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