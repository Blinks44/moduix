<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerField,
    DatePickerLabel,
    DatePickerMonthSelect,
    DatePickerNextTrigger,
    DatePickerPositioner,
    DatePickerPrevTrigger,
    DatePickerView,
    DatePickerViewControl,
    DatePickerYearSelect,
  } from '@moduix/svelte/date-picker';
  import styles from '@/components/examples/date-picker/date-picker-month-year-select.module.css';
</script>

<DatePicker defaultValue={[parseDate('2026-06-22')]}>
  <DatePickerLabel>Report date</DatePickerLabel>
  <DatePickerField />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerViewControl class={styles.control}>
        <div class={styles.selects}>
          <DatePickerMonthSelect />
          <DatePickerYearSelect />
        </div>
        <div class={styles.nav}>
          <DatePickerPrevTrigger />
          <DatePickerNextTrigger />
        </div>
      </DatePickerViewControl>
      <DatePickerView view="day"><DatePickerDayTable showHeader={false} /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>