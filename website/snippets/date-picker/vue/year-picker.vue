<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerField,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableRow,
  DatePickerView,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
} from '@moduix/vue/date-picker';

const format = (value: { year: number }) => String(value.year);
</script>

<template>
  <DatePicker
    :default-value="[parseDate('2026-01-01')]"
    default-view="year"
    min-view="year"
    max-view="year"
    :format="format"
  >
    <DatePickerLabel>Year</DatePickerLabel
    ><DatePickerField placeholder="yyyy" clear-label="Clear year" />
    <DatePickerPositioner
      ><DatePickerContent
        ><DatePickerView view="year">
          <DatePickerViewControl
            ><DatePickerPrevTrigger /><DatePickerRangeText /><DatePickerNextTrigger
          /></DatePickerViewControl>
          <DatePickerContext v-slot="context"
            ><DatePickerTable :columns="4"
              ><DatePickerTableBody>
                <DatePickerTableRow
                  v-for="(years, rowIndex) in context.getYearsGrid({ columns: 4 })"
                  :key="rowIndex"
                >
                  <DatePickerTableCell
                    v-for="year in years"
                    :key="year.value"
                    :value="year.value"
                    :disabled="year.disabled"
                    ><DatePickerTableCellTrigger>{{
                      year.label
                    }}</DatePickerTableCellTrigger></DatePickerTableCell
                  >
                </DatePickerTableRow>
              </DatePickerTableBody></DatePickerTable
            ></DatePickerContext
          >
        </DatePickerView></DatePickerContent
      ></DatePickerPositioner
    >
  </DatePicker>
</template>