<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerContext,
    DatePickerDayTable,
    DatePickerField,
    DatePickerLabel,
    DatePickerMonthTable,
    DatePickerPositioner,
    DatePickerView,
    DatePickerYearTable,
  } from '@moduix/svelte/date-picker';
</script>

<DatePicker>
  <DatePickerLabel>Today shortcut</DatePickerLabel>
  <DatePickerField />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerView view="day">
        <DatePickerDayTable />
        <DatePickerContext>
          {#snippet render(context)}
            <Button size="sm" variant="secondary" onclick={() => context().selectToday()}>
              Today
            </Button>
          {/snippet}
        </DatePickerContext>
      </DatePickerView>
      <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
      <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>