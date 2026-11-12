<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import { Button } from '@moduix/svelte/button';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerField,
    DatePickerLabel,
    DatePickerPositioner,
    DatePickerView,
  } from '@moduix/svelte/date-picker';

  let submitted = $state('Nothing submitted');

  const handleSubmit = (event: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    event.preventDefault();
    submitted = String(new FormData(event.currentTarget).get('delivery-date') ?? '');
  };
</script>

<form onsubmit={handleSubmit}>
  <DatePicker
    defaultValue={[parseDate('2026-06-22')]}
    minView="day"
    maxView="day"
    name="delivery-date"
  >
    <DatePickerLabel>Delivery date</DatePickerLabel>
    <DatePickerField />
    <DatePickerPositioner>
      <DatePickerContent>
        <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
      </DatePickerContent>
    </DatePickerPositioner>
  </DatePicker>
  <div data-preview-meta>
    <output>Submitted: {submitted}</output>
    <Button type="submit" size="sm">Submit</Button>
  </div>
</form>