<script lang="ts">
  import { DatePickerTable, type DatePickerTableProps } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ...props }: DatePickerTableProps = $props();
</script>

<DatePickerTable
  {...props}
  class={cn('w-full table-fixed border-separate border-spacing-0.5', className)}
  data-slot="date-picker-table"
/>