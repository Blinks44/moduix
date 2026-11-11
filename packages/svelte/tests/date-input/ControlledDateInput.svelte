<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import {
    DateInput,
    DateInputContext,
    DateInputControl,
    DateInputLabel,
    DateInputSegments,
    type DateInputDateValue,
    type DateInputValueChangeDetails,
  } from '@/components/date-input';

  let { onChange }: { onChange?: (details: DateInputValueChangeDetails) => void } = $props();

  let value = $state<DateInputDateValue[]>([new CalendarDate(2026, 6, 22)]);
  const nextValue = [new CalendarDate(2026, 7, 4)];
</script>

<DateInput bind:value onValueChange={onChange}>
  <DateInputLabel>Controlled date</DateInputLabel>
  <DateInputControl>
    <DateInputSegments />
  </DateInputControl>
  <DateInputContext>
    {#snippet render(dateInput)}
      <button type="button" onclick={() => dateInput().setValue(nextValue)}>Change date</button>
    {/snippet}
  </DateInputContext>
</DateInput>
<output>{value[0]?.toString()}</output>