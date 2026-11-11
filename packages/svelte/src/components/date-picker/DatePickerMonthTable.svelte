<script module lang="ts">
  import type { DatePickerTableProps } from '@ark-ui/svelte/date-picker';

  export interface DatePickerMonthTableProps extends Omit<
    DatePickerTableProps,
    'asChild' | 'children'
  > {
    format?: 'short' | 'long';
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
  import DatePickerTableRow from './DatePickerTableRow.svelte';
  import DatePickerViewControl from './DatePickerViewControl.svelte';
  import DatePickerViewTrigger from './DatePickerViewTrigger.svelte';

  let {
    columns = 4,
    format = 'short',
    showHeader = true,
    ...props
  }: DatePickerMonthTableProps = $props();

  const datePicker = useDatePickerContext();
</script>

{#if showHeader}
  <DatePickerViewControl>
    <DatePickerPrevTrigger />
    <DatePickerViewTrigger />
    <DatePickerNextTrigger />
  </DatePickerViewControl>
{/if}
<DatePickerTable {...props} {columns} asChild={undefined}>
  <DatePickerTableBody>
    {#each datePicker().getMonthsGrid({ columns, format }) as months (months[0]?.value)}
      <DatePickerTableRow>
        {#each months as month (month.value)}
          <DatePickerTableCell value={month.value}>
            <DatePickerTableCellTrigger>{month.label}</DatePickerTableCellTrigger>
          </DatePickerTableCell>
        {/each}
      </DatePickerTableRow>
    {/each}
  </DatePickerTableBody>
</DatePickerTable>