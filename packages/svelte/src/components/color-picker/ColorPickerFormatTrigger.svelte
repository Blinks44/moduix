<script lang="ts">
  import {
    ColorPickerFormatTrigger,
    type ColorPickerFormatTriggerProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerFormatTriggerProps = $props();
</script>

<ColorPickerFormatTrigger
  {...props}
  bind:ref
  class={clsx(styles.formatTrigger, className)}
  data-slot="color-picker-format-trigger"
/>