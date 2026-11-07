<script lang="ts">
  import {
    DatePickerTableCellTrigger,
    type DatePickerTableCellTriggerProps,
  } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerTableCellTriggerProps = $props();
</script>

<DatePickerTableCellTrigger
  {...props}
  bind:ref
  class={clsx(styles.tableCellTrigger, className)}
  data-slot="date-picker-table-cell-trigger"
/>