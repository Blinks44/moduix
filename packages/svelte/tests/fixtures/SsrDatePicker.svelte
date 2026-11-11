<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerField,
    DatePickerLabel,
    DatePickerMonthSelect,
    DatePickerValueText,
    DatePickerYearSelect,
  } from '@/components/date-picker';

  const date = parseDate('2026-06-22');
</script>

<DatePicker defaultValue={[date]}>
  <DatePickerLabel>Release date</DatePickerLabel>
  <DatePickerField />
  <DatePickerMonthSelect aria-label="SSR month" />
  <DatePickerYearSelect aria-label="SSR year" />
  <DatePickerValueText />
</DatePicker>