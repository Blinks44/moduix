<script lang="ts">
  import {
    ColorPickerTransparencyGrid,
    type ColorPickerTransparencyGridProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerTransparencyGridProps = $props();
</script>

<ColorPickerTransparencyGrid
  {...props}
  bind:ref
  class={clsx(styles.transparencyGrid, className)}
  data-slot="color-picker-transparency-grid"
/>