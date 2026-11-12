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
  import styles from '@/components/examples/date-picker/date-picker-multiple.module.css';
</script>

<DatePicker
  class={styles.root}
  selectionMode="multiple"
  maxSelectedDates={3}
  defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
>
  <DatePickerLabel>Meeting days</DatePickerLabel>
  <DatePickerControl>
    <DatePickerContext>
      {#snippet render(context)}
        <div class={styles.selectedDates}>
          {#if context().value.length === 0}
            <span class={styles.placeholder}>Select dates</span>
          {:else}
            {#each context().value as value, index (value.toString())}
              <span class={styles.selectedDate}>
                {value.toString()}
                <button
                  type="button"
                  class={styles.remove}
                  onclick={() =>
                    context().setValue(
                      context().value.filter((_, itemIndex) => itemIndex !== index),
                    )}
                >
                  ×
                </button>
              </span>
            {/each}
          {/if}
        </div>
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