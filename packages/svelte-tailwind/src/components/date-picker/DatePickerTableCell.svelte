<script lang="ts">
  import { DatePickerTableCell, type DatePickerTableCellProps } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DatePickerTableCellProps = $props();
</script>

<DatePickerTableCell
  {...props}
  bind:ref
  class={cn('h-control-sm w-control-sm p-0 text-center', className)}
  data-slot="date-picker-table-cell"
/>