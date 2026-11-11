<script lang="ts">
  import { DatePickerYearSelect, type DatePickerYearSelectProps } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import styles from './DatePicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: DatePickerYearSelectProps = $props();
</script>

<span class={styles.selectControl} data-slot="date-picker-year-select-control">
  <DatePickerYearSelect
    {...props}
    bind:ref
    class={clsx(styles.select, className)}
    data-slot="date-picker-year-select"
  />
  <span
    aria-hidden="true"
    class={styles.selectIndicator}
    data-slot="date-picker-year-select-indicator"
  >
    <ChevronDownIcon />
  </span>
</span>