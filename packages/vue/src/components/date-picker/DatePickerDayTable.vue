<script setup lang="ts">
import { useDatePickerContext } from '@ark-ui/vue/date-picker';
import type { DatePickerTableProps } from '@ark-ui/vue/date-picker';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import DatePickerNextTrigger from './DatePickerNextTrigger.vue';
import DatePickerPrevTrigger from './DatePickerPrevTrigger.vue';
import DatePickerTable from './DatePickerTable.vue';
import DatePickerTableBody from './DatePickerTableBody.vue';
import DatePickerTableCell from './DatePickerTableCell.vue';
import DatePickerTableCellTrigger from './DatePickerTableCellTrigger.vue';
import DatePickerTableHead from './DatePickerTableHead.vue';
import DatePickerTableHeader from './DatePickerTableHeader.vue';
import DatePickerTableRow from './DatePickerTableRow.vue';
import DatePickerViewControl from './DatePickerViewControl.vue';
import DatePickerViewTrigger from './DatePickerViewTrigger.vue';
import DatePickerWeekNumberCell from './DatePickerWeekNumberCell.vue';
import DatePickerWeekNumberHeaderCell from './DatePickerWeekNumberHeaderCell.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<DatePickerTableProps, 'asChild' | 'columns'> {
  class?: HTMLAttributes['class'];
  /** Shows the month this many months after the visible one, for multi-month layouts. */
  offset?: number;
  showHeader?: boolean;
}

const { class: className, offset, showHeader = true } = defineProps<Props>();
defineSlots<{}>();

const attrs = useAttrs();
const datePicker = useDatePickerContext();
const offsetMonth = computed(() =>
  offset ? datePicker.value.getOffset({ months: offset }) : undefined,
);
</script>

<template>
  <DatePickerViewControl v-if="showHeader">
    <DatePickerPrevTrigger />
    <DatePickerViewTrigger />
    <DatePickerNextTrigger />
  </DatePickerViewControl>
  <DatePickerTable v-bind="attrs" :as-child="false" :class="className">
    <DatePickerTableHead>
      <DatePickerTableRow>
        <DatePickerWeekNumberHeaderCell v-if="datePicker.showWeekNumbers" />
        <DatePickerTableHeader
          v-for="weekDay in datePicker.weekDays"
          :key="weekDay.value.toString()"
        >
          {{ weekDay.short }}
        </DatePickerTableHeader>
      </DatePickerTableRow>
    </DatePickerTableHead>
    <DatePickerTableBody>
      <DatePickerTableRow
        v-for="(week, weekIndex) in offsetMonth?.weeks ?? datePicker.weeks"
        :key="week[0]?.toString()"
      >
        <DatePickerWeekNumberCell
          v-if="datePicker.showWeekNumbers"
          :week="week"
          :week-index="weekIndex"
        >
          {{ datePicker.getWeekNumber(week) }}
        </DatePickerWeekNumberCell>
        <DatePickerTableCell
          v-for="day in week"
          :key="day.toString()"
          :value="day"
          :visible-range="offsetMonth?.visibleRange"
        >
          <DatePickerTableCellTrigger>{{ day.day }}</DatePickerTableCellTrigger>
        </DatePickerTableCell>
      </DatePickerTableRow>
    </DatePickerTableBody>
  </DatePickerTable>
</template>