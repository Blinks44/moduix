<script setup lang="ts">
import { parseDate } from '@ark-ui/vue/date-picker';
import {
  Calendar as CalendarIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  X as XIcon,
} from '@lucide/vue';
import { CloseButton } from '@moduix/vue/close-button';
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
  DatePickerRangeText,
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
  <DatePicker :default-value="[parseDate('2026-06-22')]" name="release-date">
    <DatePickerLabel>Release date</DatePickerLabel>
    <DatePickerControl>
      <DatePickerInput placeholder="Select date" />
      <DatePickerClearTrigger as-child aria-label="Clear date">
        <CloseButton><XIcon :stroke-width="3" /></CloseButton>
      </DatePickerClearTrigger>
      <DatePickerTrigger aria-label="Open calendar"
        ><CalendarIcon :stroke-width="2.5"
      /></DatePickerTrigger>
    </DatePickerControl>
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerContext v-slot="context">
          <DatePickerView view="day">
            <DatePickerViewControl>
              <DatePickerPrevTrigger><ChevronLeftIcon :stroke-width="3" /></DatePickerPrevTrigger>
              <DatePickerViewTrigger
                ><DatePickerRangeText /><ChevronDownIcon
              /></DatePickerViewTrigger>
              <DatePickerNextTrigger><ChevronRightIcon :stroke-width="3" /></DatePickerNextTrigger>
            </DatePickerViewControl>
            <DatePickerTable>
              <DatePickerTableHead>
                <DatePickerTableRow>
                  <DatePickerTableHeader
                    v-for="weekDay in context.weekDays"
                    :key="weekDay.value.toString()"
                  >
                    {{ weekDay.short }}
                  </DatePickerTableHeader>
                </DatePickerTableRow>
              </DatePickerTableHead>
              <DatePickerTableBody>
                <DatePickerTableRow v-for="week in context.weeks" :key="week[0]?.toString()">
                  <DatePickerTableCell v-for="day in week" :key="day.toString()" :value="day">
                    <DatePickerTableCellTrigger>{{ day.day }}</DatePickerTableCellTrigger>
                  </DatePickerTableCell>
                </DatePickerTableRow>
              </DatePickerTableBody>
            </DatePickerTable>
          </DatePickerView>
          <DatePickerView view="month">
            <DatePickerViewControl>
              <DatePickerPrevTrigger><ChevronLeftIcon :stroke-width="3" /></DatePickerPrevTrigger>
              <DatePickerViewTrigger
                ><DatePickerRangeText /><ChevronDownIcon
              /></DatePickerViewTrigger>
              <DatePickerNextTrigger><ChevronRightIcon :stroke-width="3" /></DatePickerNextTrigger>
            </DatePickerViewControl>
            <DatePickerTable :columns="4">
              <DatePickerTableBody>
                <DatePickerTableRow
                  v-for="months in context.getMonthsGrid({ columns: 4, format: 'short' })"
                  :key="months[0]?.value"
                >
                  <DatePickerTableCell
                    v-for="month in months"
                    :key="month.value"
                    :value="month.value"
                  >
                    <DatePickerTableCellTrigger>{{ month.label }}</DatePickerTableCellTrigger>
                  </DatePickerTableCell>
                </DatePickerTableRow>
              </DatePickerTableBody>
            </DatePickerTable>
          </DatePickerView>
          <DatePickerView view="year">
            <DatePickerViewControl>
              <DatePickerPrevTrigger><ChevronLeftIcon :stroke-width="3" /></DatePickerPrevTrigger>
              <DatePickerViewTrigger
                ><DatePickerRangeText /><ChevronDownIcon
              /></DatePickerViewTrigger>
              <DatePickerNextTrigger><ChevronRightIcon :stroke-width="3" /></DatePickerNextTrigger>
            </DatePickerViewControl>
            <DatePickerTable :columns="4">
              <DatePickerTableBody>
                <DatePickerTableRow
                  v-for="years in context.getYearsGrid({ columns: 4 })"
                  :key="years[0]?.value"
                >
                  <DatePickerTableCell
                    v-for="year in years"
                    :key="year.value"
                    :value="year.value"
                    :disabled="year.disabled"
                  >
                    <DatePickerTableCellTrigger>{{ year.label }}</DatePickerTableCellTrigger>
                  </DatePickerTableCell>
                </DatePickerTableRow>
              </DatePickerTableBody>
            </DatePickerTable>
          </DatePickerView>
        </DatePickerContext>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
</template>