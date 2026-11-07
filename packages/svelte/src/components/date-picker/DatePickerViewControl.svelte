<script lang="ts">
  import {
    DatePickerViewControl,
    type DatePickerViewControlProps,
  } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: DatePickerViewControlProps = $props();
</script>

<DatePickerViewControl
  {...props}
  bind:ref
  class={clsx(styles.viewControl, className)}
  data-slot="date-picker-view-control"
/>