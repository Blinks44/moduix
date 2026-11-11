<script module lang="ts">
  import type { DatePickerTableProps } from '@ark-ui/svelte/date-picker';

  export interface DatePickerYearTableProps extends Omit<
    DatePickerTableProps,
    'asChild' | 'children'
  > {
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

  let { columns = 4, showHeader = true, ...props }: DatePickerYearTableProps = $props();

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
    {#each datePicker().getYearsGrid({ columns }) as years (years[0]?.value)}
      <DatePickerTableRow>
        {#each years as year (year.value)}
          <DatePickerTableCell value={year.value} disabled={year.disabled}>
            <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
          </DatePickerTableCell>
        {/each}
      </DatePickerTableRow>
    {/each}
  </DatePickerTableBody>
</DatePickerTable>