<script lang="ts">
  import {
    ColorPickerSwatchGroup,
    type ColorPickerSwatchGroupProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerSwatchGroupProps = $props();
</script>

<ColorPickerSwatchGroup
  {...props}
  bind:ref
  class={clsx(styles.swatchGroup, className)}
  data-slot="color-picker-swatch-group"
/>