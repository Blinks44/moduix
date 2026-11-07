<script lang="ts">
  import {
    ColorPickerAreaBackground,
    type ColorPickerAreaBackgroundProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerAreaBackgroundProps = $props();
</script>

<ColorPickerAreaBackground
  {...props}
  bind:ref
  class={clsx(styles.areaBackground, className)}
  data-slot="color-picker-area-background"
/>