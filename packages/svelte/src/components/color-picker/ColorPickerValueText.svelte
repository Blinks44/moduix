<script lang="ts">
  import {
    ColorPickerValueText,
    type ColorPickerValueTextProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerValueTextProps = $props();
</script>

<ColorPickerValueText
  {...props}
  bind:ref
  class={clsx(styles.valueText, className)}
  data-slot="color-picker-value-text"
/>