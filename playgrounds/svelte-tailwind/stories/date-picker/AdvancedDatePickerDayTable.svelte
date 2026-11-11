<script lang="ts">
  import {
    DatePickerContext,
    DatePickerNextTrigger,
    DatePickerPrevTrigger,
    DatePickerTable,
    DatePickerTableBody,
    DatePickerTableCell,
    DatePickerTableCellTrigger,
    DatePickerTableHead,
    DatePickerTableHeader,
    DatePickerTableRow,
    DatePickerViewControl,
    DatePickerViewTrigger,
  } from '@/components/date-picker';
</script>

<DatePickerContext>
  {#snippet render(context)}
    <DatePickerViewControl>
      <DatePickerPrevTrigger /><DatePickerViewTrigger /><DatePickerNextTrigger />
    </DatePickerViewControl>
    <DatePickerTable>
      <DatePickerTableHead>
        <DatePickerTableRow>
          {#each context().weekDays as weekDay (weekDay.value.toString())}
            <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>
          {/each}
        </DatePickerTableRow>
      </DatePickerTableHead>
      <DatePickerTableBody>
        {#each context().weeks as week (week[0]?.toString())}
          <DatePickerTableRow>
            {#each week as day (day.toString())}
              <DatePickerTableCell value={day}>
                <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
              </DatePickerTableCell>
            {/each}
          </DatePickerTableRow>
        {/each}
      </DatePickerTableBody>
    </DatePickerTable>
  {/snippet}
</DatePickerContext>