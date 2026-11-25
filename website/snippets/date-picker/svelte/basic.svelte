<script lang="ts">
  import {
    DatePicker,
    DatePickerField,
    DatePickerLabel,
    DatePickerPanel,
    parseDate,
  } from '@moduix/svelte/date-picker';
</script>

<DatePicker defaultValue={[parseDate('2026-06-22')]} name="release-date">
  <DatePickerLabel>Release date</DatePickerLabel>
  <DatePickerField />
  <DatePickerPanel />
</DatePicker>