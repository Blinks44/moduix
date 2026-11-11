<script lang="ts">
  import {
    DatePickerNextTrigger,
    type DatePickerNextTriggerProps,
  } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
  import { actionClass } from './DatePicker.variants';
  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerNextTriggerProps = $props();
</script>

<DatePickerNextTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(!asChild && [actionClass, 'size-control-sm disabled:opacity-disabled'], className)}
  data-slot="date-picker-next-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <ChevronRightIcon />
  {/if}
</DatePickerNextTrigger>