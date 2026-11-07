<script lang="ts">
  import { DatePickerContent, DatePickerPositioner } from '@/components/date-picker';
  import DatePickerViews from './DatePickerViews.svelte';
</script>

<DatePickerPositioner>
  <DatePickerContent><DatePickerViews /></DatePickerContent>
</DatePickerPositioner>