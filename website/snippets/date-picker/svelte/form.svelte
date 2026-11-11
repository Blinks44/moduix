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
</script>

<form onsubmit={(event) => event.preventDefault()}>
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
  <Button type="submit">Submit</Button>
</form>