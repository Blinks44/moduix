<script lang="ts">
  import { parseDate, type DateValue } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerContext,
    DatePickerField,
    DatePickerLabel,
    DatePickerRootProvider,
    useDatePicker,
  } from '@/components/date-picker';

  let value = $state<DateValue[]>([parseDate('2026-06-22')]);

  const datePicker = useDatePicker({
    id: 'provider-date-picker',
    defaultValue: [parseDate('2026-07-01')],
    name: 'provider-date',
  });
</script>

<DatePicker bind:value>
  <DatePickerLabel>Controlled date</DatePickerLabel>
  <DatePickerField />
  <DatePickerContext>
    {#snippet render(context)}
      <output data-testid="controlled-date-value">{context().value[0]?.toString()}</output>
    {/snippet}
  </DatePickerContext>
</DatePicker>
<button type="button" onclick={() => (value = [parseDate('2026-06-23')])}>
  Set controlled date
</button>
<DatePickerRootProvider value={datePicker} data-testid="provider-date-picker">
  <DatePickerLabel>Provider date</DatePickerLabel>
  <DatePickerField />
</DatePickerRootProvider>
<button type="button" onclick={() => datePicker().clearValue()}>Clear provider date</button>