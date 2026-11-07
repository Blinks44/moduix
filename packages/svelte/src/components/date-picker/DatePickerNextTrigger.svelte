<script lang="ts">
  import {
    DatePickerNextTrigger,
    type DatePickerNextTriggerProps,
  } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
  import styles from './DatePicker.module.css';
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
  class={clsx(!asChild && styles.navTrigger, className)}
  data-slot="date-picker-next-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <ChevronRightIcon />
  {/if}
</DatePickerNextTrigger>