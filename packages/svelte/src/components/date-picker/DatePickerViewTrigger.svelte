<script lang="ts">
  import {
    DatePickerViewTrigger,
    type DatePickerViewTriggerProps,
  } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import styles from './DatePicker.module.css';
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
  class={clsx(!asChild && styles.viewTrigger, className)}
  data-slot="date-picker-view-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <DatePickerRangeText />
    <ChevronDownIcon />
  {/if}
</DatePickerViewTrigger>