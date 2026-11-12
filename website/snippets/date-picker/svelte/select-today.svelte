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
  import styles from '@/components/examples/date-picker/date-picker-select-today.module.css';
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
            <div class={styles.todayRow}>
              <Button size="sm" variant="secondary" onclick={() => context().selectToday()}>
                Today
              </Button>
            </div>
          {/snippet}
        </DatePickerContext>
      </DatePickerView>
      <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
      <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>