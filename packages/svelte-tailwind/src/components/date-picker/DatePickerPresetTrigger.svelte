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
      'min-h-control-sm bg-muted px-2 text-sm leading-5 text-foreground disabled:opacity-disabled [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent [@media(hover:hover)]:[&:not(:disabled):hover]:text-accent-foreground',
    ],
    className,
  )}
  data-slot="date-picker-preset-trigger"
/>