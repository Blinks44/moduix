<script lang="ts">
  import { DatePickerRangeText, type DatePickerRangeTextProps } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: DatePickerRangeTextProps = $props();
</script>

<DatePickerRangeText
  {...props}
  bind:ref
  class={clsx(styles.rangeText, className)}
  data-slot="date-picker-range-text"
/>