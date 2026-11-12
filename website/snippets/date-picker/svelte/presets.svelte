<script lang="ts">
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerLabel,
    DatePickerMonthTable,
    DatePickerPositioner,
    DatePickerPresetTrigger,
    DatePickerRangeField,
    DatePickerView,
    DatePickerYearTable,
  } from '@moduix/svelte/date-picker';
  import styles from '@/components/examples/date-picker/date-picker-presets.module.css';
</script>

<DatePicker selectionMode="range">
  <DatePickerLabel>Preset range</DatePickerLabel>
  <DatePickerRangeField />
  <DatePickerPositioner>
    <DatePickerContent>
      <div class={styles.presets}>
        <DatePickerPresetTrigger value="last7Days">Last 7 days</DatePickerPresetTrigger>
        <DatePickerPresetTrigger value="last30Days">Last 30 days</DatePickerPresetTrigger>
      </div>
      <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
      <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>