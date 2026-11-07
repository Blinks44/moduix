<script lang="ts">
  import {
    DatePickerPrevTrigger,
    type DatePickerPrevTriggerProps,
  } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
  import { actionClass } from './DatePicker.variants';
  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerPrevTriggerProps = $props();
</script>

<DatePickerPrevTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(!asChild && [actionClass, 'size-control-sm disabled:opacity-disabled'], className)}
  data-slot="date-picker-prev-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <ChevronLeftIcon />
  {/if}
</DatePickerPrevTrigger>