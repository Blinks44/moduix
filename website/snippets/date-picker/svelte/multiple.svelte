<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerClearTrigger,
    DatePickerContent,
    DatePickerContext,
    DatePickerControl,
    DatePickerDayTable,
    DatePickerLabel,
    DatePickerMonthTable,
    DatePickerPositioner,
    DatePickerTrigger,
    DatePickerView,
    DatePickerYearTable,
  } from '@moduix/svelte/date-picker';
</script>

<DatePicker
  selectionMode="multiple"
  maxSelectedDates={3}
  defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
>
  <DatePickerLabel>Meeting days</DatePickerLabel>
  <DatePickerControl>
    <DatePickerContext>
      {#snippet render(context)}
        {#if context().value.length === 0}
          <span>Select dates...</span>
        {:else}
          {#each context().value as value, index (value.toString())}
            <span>{value.toString()}</span><button
              type="button"
              onclick={() =>
                context().setValue(context().value.filter((_, itemIndex) => itemIndex !== index))}
            >
              Remove
            </button>
          {/each}
        {/if}
      {/snippet}
    </DatePickerContext>
    <DatePickerClearTrigger aria-label="Clear dates" />
    <DatePickerTrigger aria-label="Open calendar" />
  </DatePickerControl>
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
      <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>