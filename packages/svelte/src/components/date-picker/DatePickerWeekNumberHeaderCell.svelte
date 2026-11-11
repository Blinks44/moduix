<script lang="ts">
  import {
    DatePickerWeekNumberHeaderCell,
    type DatePickerWeekNumberHeaderCellProps,
  } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerWeekNumberHeaderCellProps = $props();
</script>

<DatePickerWeekNumberHeaderCell
  {...props}
  bind:ref
  class={clsx(styles.tableHeader, className)}
  data-slot="date-picker-week-number-header-cell"
/>