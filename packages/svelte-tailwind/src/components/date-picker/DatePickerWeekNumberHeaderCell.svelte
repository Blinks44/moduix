<script lang="ts">
  import {
    DatePickerWeekNumberHeaderCell,
    type DatePickerWeekNumberHeaderCellProps,
  } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  import { tableHeaderClass } from './DatePicker.variants';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerWeekNumberHeaderCellProps = $props();
</script>

<DatePickerWeekNumberHeaderCell
  {...props}
  bind:ref
  class={cn(tableHeaderClass, className)}
  data-slot="date-picker-week-number-header-cell"
/>