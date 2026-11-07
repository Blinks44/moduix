<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerMonthTable,
    DatePickerPositioner,
    DatePickerView,
    DatePickerYearTable,
  } from '@/components/date-picker';

  let {
    offset,
    showHeader = true,
    showWeekNumbers = false,
    table,
  }: {
    offset?: number;
    showHeader?: boolean;
    showWeekNumbers?: boolean;
    table: 'day' | 'month' | 'year';
  } = $props();

  const june = parseDate('2026-06-01');
</script>

<DatePicker
  defaultOpen
  portalled={false}
  defaultView={table}
  {showWeekNumbers}
  defaultFocusedValue={june}
>
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerView view={table}>
        {#if table === 'day'}
          <DatePickerDayTable {showHeader} {offset} />
        {:else if table === 'month'}
          <DatePickerMonthTable {showHeader} />
        {:else}
          <DatePickerYearTable {showHeader} />
        {/if}
      </DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>