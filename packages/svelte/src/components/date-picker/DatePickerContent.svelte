<script lang="ts">
  import { DatePickerContent, type DatePickerContentProps } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: DatePickerContentProps = $props();
</script>

<DatePickerContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="date-picker-content"
/>