<script lang="ts">
  import { DatePicker, DatePickerTrigger } from '@/components/date-picker';
</script>

<DatePicker>
  <DatePickerTrigger>
    {#snippet asChild(props)}
      <button {...props()} type="button">Open calendar</button>
    {/snippet}
  </DatePickerTrigger>
</DatePicker>