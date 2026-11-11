<script lang="ts">
  import {
    DatePickerClearTrigger,
    DatePickerContext,
    DatePickerControl,
    DatePickerTrigger,
  } from '@/components/date-picker';
  import styles from './DatePicker.stories.module.css';

  const formatSelectedDate = (value: { toDate: (timeZone: string) => Date }) =>
    value.toDate('UTC').toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
</script>

<DatePickerControl>
  <DatePickerContext>
    {#snippet render(context)}
      <div class={styles.selectedDates}>
        {#if context().value.length === 0}
          <span class={styles.selectedDatesPlaceholder}>Select dates...</span>
        {:else}
          {#each context().value as value, index (value.toString())}
            <span class={styles.selectedDate}>
              {formatSelectedDate(value)}
              <button
                type="button"
                class={styles.selectedDateRemove}
                aria-label={'Remove ' + formatSelectedDate(value)}
                onclick={() =>
                  context().setValue(context().value.filter((_, itemIndex) => itemIndex !== index))}
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