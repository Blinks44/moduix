<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerMonthSelect,
    DatePickerYearSelect,
  } from '@/components/date-picker';
</script>

<DatePicker defaultValue={[parseDate('2026-06-22')]}>
  <DatePickerMonthSelect aria-label="Month" />
  <DatePickerYearSelect aria-label="Year" />
</DatePicker>