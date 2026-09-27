<script setup lang="ts">
import { useDatePickerContext } from '@ark-ui/vue/date-picker';
import type { DatePickerTableProps, UseDatePickerReturn } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes, UnwrapRef } from 'vue';
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

type DatePickerApi = UnwrapRef<UseDatePickerReturn>;
type DatePickerOffset = ReturnType<DatePickerApi['getOffset']>;

export interface Props extends /* @vue-ignore */ DatePickerTableProps {
  class?: HTMLAttributes['class'];
  offset?: DatePickerOffset;
  showHeader?: boolean;
  showWeekNumbers?: boolean;
}

const {
  class: className,
  offset,
  showHeader = true,
  showWeekNumbers = false,
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const datePicker = useDatePickerContext();
</script>

<template>
  <DatePickerViewControl v-if="showHeader">
    <DatePickerPrevTrigger />
    <DatePickerViewTrigger />
    <DatePickerNextTrigger />
  </DatePickerViewControl>
  <DatePickerTable v-bind="attrs" :class="className">
    <DatePickerTableHead>
      <DatePickerTableRow>
        <DatePickerWeekNumberHeaderCell v-if="showWeekNumbers" />
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
        v-for="(week, weekIndex) in offset?.weeks ?? datePicker.weeks"
        :key="week[0]?.toString()"
      >
        <DatePickerWeekNumberCell v-if="showWeekNumbers" :week="week" :week-index="weekIndex">
          {{ datePicker.getWeekNumber(week) }}
        </DatePickerWeekNumberCell>
        <DatePickerTableCell
          v-for="day in week"
          :key="day.toString()"
          :value="day"
          :visible-range="offset?.visibleRange"
        >
          <DatePickerTableCellTrigger>{{ day.day }}</DatePickerTableCellTrigger>
        </DatePickerTableCell>
      </DatePickerTableRow>
    </DatePickerTableBody>
  </DatePickerTable>
</template>