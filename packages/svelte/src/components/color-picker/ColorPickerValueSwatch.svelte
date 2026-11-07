<script lang="ts">
  import {
    ColorPickerValueSwatch,
    type ColorPickerValueSwatchProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerValueSwatchProps = $props();
</script>

<ColorPickerValueSwatch
  {...props}
  bind:ref
  class={clsx(styles.valueSwatch, className)}
  data-slot="color-picker-value-swatch"
/>