<script lang="ts">
  import { DatePickerTrigger, type DatePickerTriggerProps } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import { CalendarIcon } from '@/lib/moduix/icons/ui';
  import styles from './DatePicker.module.css';
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
  class={clsx(!asChild && styles.trigger, className)}
  data-slot="date-picker-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <CalendarIcon />
  {/if}
</DatePickerTrigger>