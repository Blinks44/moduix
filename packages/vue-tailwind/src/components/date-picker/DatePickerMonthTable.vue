<script setup lang="ts">
import { useDatePickerContext } from '@ark-ui/vue/date-picker';
import type { DatePickerTableProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import DatePickerNextTrigger from './DatePickerNextTrigger.vue';
import DatePickerPrevTrigger from './DatePickerPrevTrigger.vue';
import DatePickerTable from './DatePickerTable.vue';
import DatePickerTableBody from './DatePickerTableBody.vue';
import DatePickerTableCell from './DatePickerTableCell.vue';
import DatePickerTableCellTrigger from './DatePickerTableCellTrigger.vue';
import DatePickerTableRow from './DatePickerTableRow.vue';
import DatePickerViewControl from './DatePickerViewControl.vue';
import DatePickerViewTrigger from './DatePickerViewTrigger.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<DatePickerTableProps, 'asChild'> {
  class?: HTMLAttributes['class'];
  columns?: number;
  format?: 'short' | 'long';
  showHeader?: boolean;
}

const { class: className, columns = 4, format = 'short', showHeader = true } = defineProps<Props>();
defineSlots<{}>();

const attrs = useAttrs();
const datePicker = useDatePickerContext();
</script>

<template>
  <DatePickerViewControl v-if="showHeader">
    <DatePickerPrevTrigger />
    <DatePickerViewTrigger />
    <DatePickerNextTrigger />
  </DatePickerViewControl>
  <DatePickerTable v-bind="attrs" :as-child="false" :class="className" :columns="columns">
    <DatePickerTableBody>
      <DatePickerTableRow
        v-for="months in datePicker.getMonthsGrid({ columns, format })"
        :key="months[0]?.value"
      >
        <DatePickerTableCell v-for="month in months" :key="month.value" :value="month.value">
          <DatePickerTableCellTrigger>{{ month.label }}</DatePickerTableCellTrigger>
        </DatePickerTableCell>
      </DatePickerTableRow>
    </DatePickerTableBody>
  </DatePickerTable>
</template>