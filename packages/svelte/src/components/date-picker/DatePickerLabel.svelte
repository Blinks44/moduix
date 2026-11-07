<script lang="ts">
  import { DatePickerLabel, type DatePickerLabelProps } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: DatePickerLabelProps = $props();
</script>

<DatePickerLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="date-picker-label"
/>