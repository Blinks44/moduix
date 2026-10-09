<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableRow,
} from '@moduix/vue/date-picker';
</script>

<template>
  <DatePicker
    default-view="month"
    min-view="month"
    max-view="month"
    :default-value="[parseDate('2026-06-22')]"
  >
    <DatePickerLabel>Billing month</DatePickerLabel><DatePickerField />
    <DatePickerPositioner
      ><DatePickerContent
        ><DatePickerView view="month">
          <DatePickerContext v-slot="context">
            <DatePickerViewControl
              ><DatePickerPrevTrigger /><DatePickerViewTrigger /><DatePickerNextTrigger
            /></DatePickerViewControl>
            <DatePickerTable :columns="4"
              ><DatePickerTableBody>
                <DatePickerTableRow
                  v-for="(months, rowIndex) in context.getMonthsGrid({
                    columns: 4,
                    format: 'short',
                  })"
                  :key="rowIndex"
                >
                  <DatePickerTableCell
                    v-for="month in months"
                    :key="month.value"
                    :value="month.value"
                    ><DatePickerTableCellTrigger>{{
                      month.label
                    }}</DatePickerTableCellTrigger></DatePickerTableCell
                  >
                </DatePickerTableRow>
              </DatePickerTableBody></DatePickerTable
            >
          </DatePickerContext>
        </DatePickerView></DatePickerContent
      ></DatePickerPositioner
    >
  </DatePicker>
</template>