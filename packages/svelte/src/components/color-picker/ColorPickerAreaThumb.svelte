<script lang="ts">
  import {
    ColorPickerAreaThumb,
    type ColorPickerAreaThumbProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerAreaThumbProps = $props();
</script>

<ColorPickerAreaThumb
  {...props}
  bind:ref
  class={clsx(styles.thumb, className)}
  data-slot="color-picker-area-thumb"
/>