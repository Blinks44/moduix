<script module lang="ts">
  export interface DatePickerCalendarProps {
    monthFormat?: 'short' | 'long';
    showHeader?: boolean;
  }
</script>

<script lang="ts">
  import DatePickerDayTable from './DatePickerDayTable.svelte';
  import DatePickerMonthTable from './DatePickerMonthTable.svelte';
  import DatePickerView from './DatePickerView.svelte';
  import DatePickerYearTable from './DatePickerYearTable.svelte';

  let { monthFormat, showHeader = true }: DatePickerCalendarProps = $props();
</script>

<DatePickerView view="day">
  <DatePickerDayTable {showHeader} />
</DatePickerView>
<DatePickerView view="month">
  <DatePickerMonthTable format={monthFormat} {showHeader} />
</DatePickerView>
<DatePickerView view="year">
  <DatePickerYearTable {showHeader} />
</DatePickerView>