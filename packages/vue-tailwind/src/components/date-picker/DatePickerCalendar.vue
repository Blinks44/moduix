<script setup lang="ts">
import DatePickerDayTable from './DatePickerDayTable.vue';
import DatePickerMonthTable from './DatePickerMonthTable.vue';
import DatePickerView from './DatePickerView.vue';
import DatePickerYearTable from './DatePickerYearTable.vue';

export interface Props {
  monthFormat?: 'short' | 'long';
  showHeader?: boolean;
}

const { monthFormat, showHeader = true } = defineProps<Props>();
</script>

<template>
  <DatePickerView view="day">
    <DatePickerDayTable :show-header="showHeader" />
  </DatePickerView>
  <DatePickerView view="month">
    <DatePickerMonthTable :format="monthFormat" :show-header="showHeader" />
  </DatePickerView>
  <DatePickerView view="year">
    <DatePickerYearTable :show-header="showHeader" />
  </DatePickerView>
</template>