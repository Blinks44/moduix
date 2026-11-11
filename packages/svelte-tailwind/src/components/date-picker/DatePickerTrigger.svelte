<script lang="ts">
  import { DatePickerTrigger, type DatePickerTriggerProps } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  import { CalendarIcon } from '@/lib/moduix/icons/ui';
  import { actionClass } from './DatePicker.variants';
  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerTriggerProps = $props();
</script>

<DatePickerTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(
    !asChild && [actionClass, 'absolute end-2 top-1/2 size-control-xs -translate-y-1/2'],
    className,
  )}
  data-slot="date-picker-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <CalendarIcon />
  {/if}
</DatePickerTrigger>