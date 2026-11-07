<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { DateInput } from '@/components/date-input';
  import DateInputStatus from './DateInputStatus.svelte';
</script>

<DateInput defaultValue={[new CalendarDate(2026, 6, 22)]}>
  <DateInputStatus />
</DateInput>