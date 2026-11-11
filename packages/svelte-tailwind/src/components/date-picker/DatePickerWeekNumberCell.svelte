<script lang="ts">
  import {
    DatePickerWeekNumberCell,
    type DatePickerWeekNumberCellProps,
  } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  import { tableHeaderClass } from './DatePicker.variants';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerWeekNumberCellProps = $props();
</script>

<DatePickerWeekNumberCell
  {...props}
  bind:ref
  class={cn(tableHeaderClass, className)}
  data-slot="date-picker-week-number-cell"
/>