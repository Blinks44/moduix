<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerLabel,
    DatePickerMonthTable,
    DatePickerView,
    DatePickerYearTable,
  } from '@moduix/svelte/date-picker';
  import styles from '@/components/examples/date-picker/date-picker-inline-and-week-numbers.module.css';
</script>

<div class={styles.root}>
  <DatePicker
    inline
    selectionMode="multiple"
    maxSelectedDates={3}
    defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-24')]}
    showWeekNumbers
  >
    <DatePickerLabel>Available days</DatePickerLabel>
    <DatePickerContent>
      <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
      <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
    </DatePickerContent>
  </DatePicker>
</div>