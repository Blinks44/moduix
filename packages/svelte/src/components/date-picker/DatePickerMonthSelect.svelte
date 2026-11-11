<script lang="ts">
  import {
    DatePickerMonthSelect,
    type DatePickerMonthSelectProps,
  } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import styles from './DatePicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: DatePickerMonthSelectProps = $props();
</script>

<span class={styles.selectControl} data-slot="date-picker-month-select-control">
  <DatePickerMonthSelect
    {...props}
    bind:ref
    class={clsx(styles.select, className)}
    data-slot="date-picker-month-select"
  />
  <span
    aria-hidden="true"
    class={styles.selectIndicator}
    data-slot="date-picker-month-select-indicator"
  >
    <ChevronDownIcon />
  </span>
</span>