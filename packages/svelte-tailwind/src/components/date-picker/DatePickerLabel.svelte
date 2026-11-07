<script lang="ts">
  import { DatePickerLabel, type DatePickerLabelProps } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DatePickerLabelProps = $props();
</script>

<DatePickerLabel
  {...props}
  bind:ref
  class={cn('text-sm leading-5 font-medium text-foreground select-none', className)}
  data-slot="date-picker-label"
/>