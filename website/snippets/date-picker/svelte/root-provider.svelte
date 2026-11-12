<script lang="ts">
  import { today } from '@internationalized/date';
  import { Button } from '@moduix/svelte/button';
  import {
    DatePickerContent,
    DatePickerDayTable,
    DatePickerField,
    DatePickerLabel,
    DatePickerMonthTable,
    DatePickerPositioner,
    DatePickerRootProvider,
    DatePickerView,
    DatePickerYearTable,
    useDatePicker,
  } from '@moduix/svelte/date-picker';
  import { Stack } from '@moduix/svelte/stack';

  const id = $props.id();
  const datePicker = useDatePicker({ id, defaultValue: [today('UTC')] });
</script>

<Stack align="center">
  <DatePickerRootProvider value={datePicker}>
    <DatePickerLabel>Report date</DatePickerLabel>
    <DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
        <DatePickerView view="month"><DatePickerMonthTable /></DatePickerView>
        <DatePickerView view="year"><DatePickerYearTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePickerRootProvider>
  <div data-preview-meta>
    <Button size="sm" variant="secondary" onclick={() => datePicker().clearValue()}>Clear</Button>
  </div>
</Stack>