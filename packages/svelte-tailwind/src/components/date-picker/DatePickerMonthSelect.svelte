<script lang="ts">
  import {
    DatePickerMonthSelect,
    type DatePickerMonthSelectProps,
  } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import { selectClass, selectControlClass, selectIndicatorClass } from './DatePicker.variants';
  let { class: className, ref = $bindable(null), ...props }: DatePickerMonthSelectProps = $props();
</script>

<span class={selectControlClass} data-slot="date-picker-month-select-control">
  <DatePickerMonthSelect
    {...props}
    bind:ref
    class={cn(selectClass, className)}
    data-slot="date-picker-month-select"
  />
  <span
    aria-hidden="true"
    class={selectIndicatorClass}
    data-slot="date-picker-month-select-indicator"
  >
    <ChevronDownIcon />
  </span>
</span>