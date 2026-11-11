<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerField,
    DatePickerLabel,
    DatePickerMonthSelect,
    DatePickerNextTrigger,
    DatePickerPositioner,
    DatePickerPrevTrigger,
    DatePickerView,
    DatePickerViewControl,
    DatePickerYearSelect,
  } from '@moduix/svelte/date-picker';
</script>

<DatePicker defaultValue={[parseDate('2026-06-22')]}>
  <DatePickerLabel>Report date</DatePickerLabel>
  <DatePickerField />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerViewControl>
        <div
          style="
            display: grid;
            grid-template-columns: minmax(7rem, 1fr) minmax(6.25rem, 1fr);
            gap: 0.25rem;
            min-width: 0;
          "
        >
          <DatePickerMonthSelect /><DatePickerYearSelect />
        </div>
        <DatePickerPrevTrigger /><DatePickerNextTrigger />
      </DatePickerViewControl>
      <DatePickerView view="day"><DatePickerDayTable showHeader={false} /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>