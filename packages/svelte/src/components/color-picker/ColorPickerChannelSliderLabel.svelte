<script lang="ts">
  import {
    ColorPickerChannelSliderLabel,
    type ColorPickerChannelSliderLabelProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerChannelSliderLabelProps = $props();
</script>

<ColorPickerChannelSliderLabel
  {...props}
  bind:ref
  class={clsx(styles.channelSliderLabel, className)}
  data-slot="color-picker-channel-slider-label"
/>