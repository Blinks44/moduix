<script lang="ts">
  import {
    DatePicker,
    DatePickerContent,
    DatePickerDayTable,
    DatePickerField,
    DatePickerLabel,
    DatePickerPositioner,
    DatePickerView,
    type DatePickerOpenChangeDetails,
  } from '@/components/date-picker';

  let { onOpenChange }: { onOpenChange?: (details: DatePickerOpenChangeDetails) => void } =
    $props();

  let rootRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ rootRef });
</script>

<DatePicker bind:ref={rootRef} {onOpenChange}>
  <DatePickerLabel>Published date</DatePickerLabel>
  <DatePickerField triggerLabel="Open date picker" />
  <DatePickerPositioner>
    <DatePickerContent data-testid="date-picker-content">
      <DatePickerView view="day"><DatePickerDayTable /></DatePickerView>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>