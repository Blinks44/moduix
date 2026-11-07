<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import { DatePicker, DatePickerField, DatePickerLabel } from '@/components/date-picker';
  import { translations } from './translations';
</script>

<DatePicker defaultValue={[parseDate('2026-06-22')]} {translations}>
  <DatePickerLabel>Localized date</DatePickerLabel>
  <DatePickerField clearLabel="Remove date" triggerLabel="Open date picker" />
</DatePicker>