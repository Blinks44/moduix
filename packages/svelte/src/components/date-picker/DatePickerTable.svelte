<script lang="ts">
  import { DatePickerTable, type DatePickerTableProps } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let { class: className, ...props }: DatePickerTableProps = $props();
</script>

<DatePickerTable {...props} class={clsx(styles.table, className)} data-slot="date-picker-table" />