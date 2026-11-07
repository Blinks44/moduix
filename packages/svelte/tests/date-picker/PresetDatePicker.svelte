<script lang="ts">
  import {
    DatePicker,
    DatePickerContent,
    DatePickerPositioner,
    DatePickerPresetTrigger,
    DatePickerRangeField,
  } from '@/components/date-picker';
</script>

<DatePicker selectionMode="range" defaultOpen>
  <DatePickerRangeField />
  <DatePickerPositioner>
    <DatePickerContent>
      <DatePickerPresetTrigger value="last7Days">Last 7 days</DatePickerPresetTrigger>
    </DatePickerContent>
  </DatePickerPositioner>
</DatePicker>