<script lang="ts">
  import {
    DatePickerViewControl,
    type DatePickerViewControlProps,
  } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DatePickerViewControlProps = $props();
</script>

<DatePickerViewControl
  {...props}
  bind:ref
  class={cn('flex min-w-0 items-center justify-between gap-2', className)}
  data-slot="date-picker-view-control"
/>