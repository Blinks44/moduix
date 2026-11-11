<script module lang="ts">
  import type { DatePickerTableProps } from '@ark-ui/svelte/date-picker';

  export interface DatePickerDayTableProps extends Omit<
    DatePickerTableProps,
    'asChild' | 'children' | 'columns'
  > {
    /** Shows the month this many months after the visible one, for multi-month layouts. */
    offset?: number;
    showHeader?: boolean;
  }
</script>

<script lang="ts">
  import { useDatePickerContext } from '@ark-ui/svelte/date-picker';
  import DatePickerNextTrigger from './DatePickerNextTrigger.svelte';
  import DatePickerPrevTrigger from './DatePickerPrevTrigger.svelte';
  import DatePickerTable from './DatePickerTable.svelte';
  import DatePickerTableBody from './DatePickerTableBody.svelte';
  import DatePickerTableCell from './DatePickerTableCell.svelte';
  import DatePickerTableCellTrigger from './DatePickerTableCellTrigger.svelte';
  import DatePickerTableHead from './DatePickerTableHead.svelte';
  import DatePickerTableHeader from './DatePickerTableHeader.svelte';
  import DatePickerTableRow from './DatePickerTableRow.svelte';
  import DatePickerViewControl from './DatePickerViewControl.svelte';
  import DatePickerViewTrigger from './DatePickerViewTrigger.svelte';
  import DatePickerWeekNumberCell from './DatePickerWeekNumberCell.svelte';
  import DatePickerWeekNumberHeaderCell from './DatePickerWeekNumberHeaderCell.svelte';

  let { offset, showHeader = true, ...props }: DatePickerDayTableProps = $props();

  const datePicker = useDatePickerContext();
  const offsetMonth = $derived(offset ? datePicker().getOffset({ months: offset }) : undefined);
  const weeks = $derived(offsetMonth?.weeks ?? datePicker().weeks);
</script>

{#if showHeader}
  <DatePickerViewControl>
    <DatePickerPrevTrigger />
    <DatePickerViewTrigger />
    <DatePickerNextTrigger />
  </DatePickerViewControl>
{/if}
<DatePickerTable {...props} asChild={undefined}>
  <DatePickerTableHead>
    <DatePickerTableRow>
      {#if datePicker().showWeekNumbers}
        <DatePickerWeekNumberHeaderCell />
      {/if}
      {#each datePicker().weekDays as weekDay (weekDay.value.toString())}
        <DatePickerTableHeader>
          {weekDay.short}
        </DatePickerTableHeader>
      {/each}
    </DatePickerTableRow>
  </DatePickerTableHead>
  <DatePickerTableBody>
    {#each weeks as week, weekIndex (week[0]?.toString())}
      <DatePickerTableRow>
        {#if datePicker().showWeekNumbers}
          <DatePickerWeekNumberCell {week} {weekIndex}>
            {datePicker().getWeekNumber(week)}
          </DatePickerWeekNumberCell>
        {/if}
        {#each week as day (day.toString())}
          <DatePickerTableCell value={day} visibleRange={offsetMonth?.visibleRange}>
            <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
          </DatePickerTableCell>
        {/each}
      </DatePickerTableRow>
    {/each}
  </DatePickerTableBody>
</DatePickerTable>