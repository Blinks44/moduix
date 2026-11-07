<script lang="ts">
  import {
    ColorPickerChannelSliderThumb,
    type ColorPickerChannelSliderThumbProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerChannelSliderThumbProps = $props();
</script>

<ColorPickerChannelSliderThumb
  {...props}
  bind:ref
  class={clsx(styles.thumb, className)}
  data-slot="color-picker-channel-slider-thumb"
/>