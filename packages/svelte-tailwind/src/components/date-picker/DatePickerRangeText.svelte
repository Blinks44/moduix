<script lang="ts">
  import { DatePickerRangeText, type DatePickerRangeTextProps } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DatePickerRangeTextProps = $props();
</script>

<DatePickerRangeText
  {...props}
  bind:ref
  class={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
  data-slot="date-picker-range-text"
/>