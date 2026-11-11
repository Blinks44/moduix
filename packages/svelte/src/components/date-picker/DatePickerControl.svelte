<script lang="ts">
  import { DatePickerControl, type DatePickerControlProps } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: DatePickerControlProps = $props();
</script>

<DatePickerControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="date-picker-control"
/>