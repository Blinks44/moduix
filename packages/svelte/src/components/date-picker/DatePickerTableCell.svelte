<script lang="ts">
  import { DatePickerTableCell, type DatePickerTableCellProps } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: DatePickerTableCellProps = $props();
</script>

<DatePickerTableCell
  {...props}
  bind:ref
  class={clsx(styles.tableCell, className)}
  data-slot="date-picker-table-cell"
/>