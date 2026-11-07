<script lang="ts">
  import { DatePickerView, type DatePickerViewProps } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DatePickerViewProps = $props();
</script>

<DatePickerView
  {...props}
  bind:ref
  class={cn('grid gap-3', className)}
  data-slot="date-picker-view"
/>