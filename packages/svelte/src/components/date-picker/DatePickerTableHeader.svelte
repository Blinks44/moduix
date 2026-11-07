<script lang="ts">
  import {
    DatePickerTableHeader,
    type DatePickerTableHeaderProps,
  } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: DatePickerTableHeaderProps = $props();
</script>

<DatePickerTableHeader
  {...props}
  bind:ref
  class={clsx(styles.tableHeader, className)}
  data-slot="date-picker-table-header"
/>