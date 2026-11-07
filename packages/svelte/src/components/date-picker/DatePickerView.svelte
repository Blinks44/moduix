<script lang="ts">
  import { DatePickerView, type DatePickerViewProps } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: DatePickerViewProps = $props();
</script>

<DatePickerView
  {...props}
  bind:ref
  class={clsx(styles.view, className)}
  data-slot="date-picker-view"
/>