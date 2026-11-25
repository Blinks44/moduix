<script lang="ts">
  import {
    DatePickerPresetTrigger,
    type DatePickerPresetTriggerProps,
  } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  import { actionClass } from './DatePicker.variants';
  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerPresetTriggerProps = $props();
</script>

<DatePickerPresetTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(
    !asChild && [
      actionClass,
      'min-h-control-sm bg-muted px-2 text-sm leading-5 text-foreground not-disabled:hover:bg-accent not-disabled:hover:text-accent-foreground disabled:opacity-disabled',
    ],
    className,
  )}
  data-slot="date-picker-preset-trigger"
/>