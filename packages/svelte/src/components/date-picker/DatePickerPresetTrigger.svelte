<script lang="ts">
  import {
    DatePickerPresetTrigger,
    type DatePickerPresetTriggerProps,
  } from '@ark-ui/svelte/date-picker';
  import { clsx } from 'clsx';
  import styles from './DatePicker.module.css';
  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: DatePickerPresetTriggerProps = $props();
</script>

<DatePickerPresetTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.presetTrigger, className)}
  data-slot="date-picker-preset-trigger"
/>