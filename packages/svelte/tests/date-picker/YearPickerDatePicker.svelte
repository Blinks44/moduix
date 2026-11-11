<script lang="ts">
  import { parseDate, type DatePickerValueChangeDetails } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerContext,
    DatePickerField,
    DatePickerLabel,
    DatePickerPositioner,
    DatePickerTable,
    DatePickerTableBody,
    DatePickerTableCell,
    DatePickerTableCellTrigger,
    DatePickerTableRow,
    DatePickerView,
  } from '@/components/date-picker';

  let { onValueChange }: { onValueChange?: (details: DatePickerValueChangeDetails) => void } =
    $props();

  const format = (value: { year: number }) => String(value.year);
</script>

<DatePicker
  id="year-picker"
  defaultValue={[parseDate('2026-01-01')]}
  defaultView="year"
  {format}
  minView="year"
  maxView="year"
  {onValueChange}
>
  <DatePickerLabel>Year</DatePickerLabel>
  <DatePickerField placeholder="yyyy" triggerLabel="Open years" />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerView view="year">
        <DatePickerContext>
          {#snippet render(datePicker)}
            <DatePickerTable columns={4}>
              <DatePickerTableBody>
                {#each datePicker().getYearsGrid({ columns: 4 }) as years, rowIndex (rowIndex)}
                  <DatePickerTableRow>
                    {#each years as year (year.value)}
                      <DatePickerTableCell disabled={year.disabled} value={year.value}>
                        <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
                      </DatePickerTableCell>
                    {/each}
                  </DatePickerTableRow>
                {/each}
              </DatePickerTableBody>
            </DatePickerTable>
          {/snippet}
        </DatePickerContext>
      </DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>