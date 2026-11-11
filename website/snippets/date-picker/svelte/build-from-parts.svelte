<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import XIcon from '@lucide/svelte/icons/x';
  import { CloseButton } from '@moduix/svelte/close-button';
  import {
    DatePicker,
    DatePickerClearTrigger,
    DatePickerContent,
    DatePickerContext,
    DatePickerControl,
    DatePickerInput,
    DatePickerLabel,
    DatePickerNextTrigger,
    DatePickerPositioner,
    DatePickerPrevTrigger,
    DatePickerRangeText,
    DatePickerTable,
    DatePickerTableBody,
    DatePickerTableCell,
    DatePickerTableCellTrigger,
    DatePickerTableHead,
    DatePickerTableHeader,
    DatePickerTableRow,
    DatePickerTrigger,
    DatePickerView,
    DatePickerViewControl,
    DatePickerViewTrigger,
  } from '@moduix/svelte/date-picker';
</script>

{#snippet viewControl()}
  <DatePickerViewControl>
    <DatePickerPrevTrigger><ChevronLeftIcon strokeWidth={3} /></DatePickerPrevTrigger>
    <DatePickerViewTrigger><DatePickerRangeText /><ChevronDownIcon /></DatePickerViewTrigger>
    <DatePickerNextTrigger><ChevronRightIcon strokeWidth={3} /></DatePickerNextTrigger>
  </DatePickerViewControl>
{/snippet}

<DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
  <DatePickerLabel>Release date</DatePickerLabel>
  <DatePickerControl>
    <DatePickerInput placeholder="Select date" />
    <DatePickerClearTrigger aria-label="Clear date">
      {#snippet asChild(props)}
        <CloseButton {...props()}><XIcon strokeWidth={3} /></CloseButton>
      {/snippet}
    </DatePickerClearTrigger>
    <DatePickerTrigger aria-label="Open calendar"
      ><CalendarIcon strokeWidth={2.5} /></DatePickerTrigger
    >
  </DatePickerControl>
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerContext>
        {#snippet render(context)}
          <DatePickerView view="day">
            {@render viewControl()}
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
          </DatePickerView>
          <DatePickerView view="month">
            {@render viewControl()}
            <DatePickerTable columns={4}>
              <DatePickerTableBody>
                {#each context().getMonthsGrid( { columns: 4, format: 'short' } ) as months (months[0]?.value)}
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
          </DatePickerView>
          <DatePickerView view="year">
            {@render viewControl()}
            <DatePickerTable columns={4}>
              <DatePickerTableBody>
                {#each context().getYearsGrid({ columns: 4 }) as years (years[0]?.value)}
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
          </DatePickerView>
        {/snippet}
      </DatePickerContext>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>