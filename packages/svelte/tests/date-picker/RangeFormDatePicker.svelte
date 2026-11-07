<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import { DatePicker, DatePickerLabel, DatePickerRangeField } from '@/components/date-picker';
</script>

<form>
  <DatePicker
    name="travel-date"
    selectionMode="range"
    defaultValue={[parseDate('2026-06-22'), parseDate('2026-06-26')]}
  >
    <DatePickerLabel>Travel dates</DatePickerLabel>
    <DatePickerRangeField startInputProps={{ index: 1 }} endInputProps={{ index: 0 }} />
  </DatePicker>
</form>