<script lang="ts">
  import {
    DatePickerPrevTrigger,
    type DatePickerPrevTriggerProps,
  } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
  import styles from './DatePicker.module.css';
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
  class={clsx(!asChild && styles.navTrigger, className)}
  data-slot="date-picker-prev-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <ChevronLeftIcon />
  {/if}
</DatePickerPrevTrigger>