<script lang="ts">
  import { DatePickerControl, type DatePickerControlProps } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DatePickerControlProps = $props();
</script>

<DatePickerControl
  {...props}
  bind:ref
  class={cn('relative flex w-full min-w-0 items-center gap-2', className)}
  data-slot="date-picker-control"
/>