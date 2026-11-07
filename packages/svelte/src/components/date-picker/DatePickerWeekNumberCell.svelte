<script lang="ts">
  import {
    DatePickerWeekNumberCell,
    type DatePickerWeekNumberCellProps,
  } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerWeekNumberCellProps = $props();
</script>

<DatePickerWeekNumberCell
  {...props}
  bind:ref
  class={clsx(styles.weekNumberCell, className)}
  data-slot="date-picker-week-number-cell"
/>