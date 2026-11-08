<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerField,
    DatePickerLabel,
    DatePickerNextTrigger,
    DatePickerPositioner,
    DatePickerPrevTrigger,
    DatePickerRangeText,
    DatePickerViewControl,
  } from '@moduix/svelte/date-picker';
</script>

<DatePicker defaultValue={[parseDate('2026-06-22')]} numOfMonths={2}>
  <DatePickerLabel>Planning window</DatePickerLabel>
  <DatePickerField />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerViewControl>
        <DatePickerPrevTrigger />
        <DatePickerRangeText />
        <DatePickerNextTrigger />
      </DatePickerViewControl>
      <div>
        <DatePickerDayTable showHeader={false} />
        <DatePickerDayTable offset={1} showHeader={false} />
      </div>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>