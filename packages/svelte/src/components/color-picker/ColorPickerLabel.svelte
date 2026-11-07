<script lang="ts">
  import { ColorPickerLabel, type ColorPickerLabelProps } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerLabelProps = $props();
</script>

<ColorPickerLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="color-picker-label"
/>