<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerField,
    DatePickerLabel,
    DatePickerNextTrigger,
    DatePickerPositioner,
    DatePickerPrevTrigger,
    DatePickerRangeText,
    DatePickerViewControl,
  } from '@moduix/svelte/date-picker';
  import styles from '@/components/examples/date-picker/date-picker-multiple-months.module.css';
</script>

<DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
  <DatePickerLabel>Planning window</DatePickerLabel>
  <DatePickerField />
  <DatePickerPositioner>
    <DatePickerContent class={styles.content}>
      <DatePickerViewControl>
        <DatePickerPrevTrigger />
        <DatePickerRangeText />
        <DatePickerNextTrigger />
      </DatePickerViewControl>
      <div class={styles.months}>
        <DatePickerDayTable class={styles.table} showHeader={false} />
        <DatePickerDayTable class={styles.table} offset={1} showHeader={false} />
      </div>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>