<script lang="ts">
  import { DatePickerYearSelect, type DatePickerYearSelectProps } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import { selectClass, selectControlClass, selectIndicatorClass } from './DatePicker.variants';
  let { class: className, ref = $bindable(null), ...props }: DatePickerYearSelectProps = $props();
</script>

<span class={selectControlClass} data-slot="date-picker-year-select-control">
  <DatePickerYearSelect
    {...props}
    bind:ref
    class={cn(selectClass, className)}
    data-slot="date-picker-year-select"
  />
  <span
    aria-hidden="true"
    class={selectIndicatorClass}
    data-slot="date-picker-year-select-indicator"
  >
    <ChevronDownIcon />
  </span>
</span>