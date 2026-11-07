<script lang="ts">
  import { DatePickerInput, type DatePickerInputProps } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: DatePickerInputProps = $props();
</script>

<DatePickerInput
  {...props}
  bind:ref
  class={clsx(styles.input, className)}
  data-slot="date-picker-input"
/>