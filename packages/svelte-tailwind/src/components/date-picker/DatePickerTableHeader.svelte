<script lang="ts">
  import {
    DatePickerTableHeader,
    type DatePickerTableHeaderProps,
  } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  import { tableHeaderClass } from './DatePicker.variants';
  let { class: className, ref = $bindable(null), ...props }: DatePickerTableHeaderProps = $props();
</script>

<DatePickerTableHeader
  {...props}
  bind:ref
  class={cn(tableHeaderClass, className)}
  data-slot="date-picker-table-header"
/>