<script lang="ts">
  import { ColorPickerSwatch, type ColorPickerSwatchProps } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerSwatchProps = $props();
</script>

<ColorPickerSwatch
  {...props}
  bind:ref
  class={clsx(styles.swatch, className)}
  data-slot="color-picker-swatch"
/>