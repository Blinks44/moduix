<script lang="ts">
  import {
    DatePickerViewTrigger,
    type DatePickerViewTriggerProps,
  } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import { actionClass } from './DatePicker.variants';
  import DatePickerRangeText from './DatePickerRangeText.svelte';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerViewTriggerProps = $props();
</script>

<DatePickerViewTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(
    !asChild && [
      actionClass,
      'min-h-control-sm min-w-0 flex-1 gap-2 px-2 text-sm leading-5 font-medium text-foreground disabled:opacity-disabled',
    ],
    className,
  )}
  data-slot="date-picker-view-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <DatePickerRangeText />
    <ChevronDownIcon />
  {/if}
</DatePickerViewTrigger>