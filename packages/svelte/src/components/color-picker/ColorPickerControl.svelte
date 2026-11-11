<script lang="ts">
  import { ColorPickerControl, type ColorPickerControlProps } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerControlProps = $props();
</script>

<ColorPickerControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="color-picker-control"
/>