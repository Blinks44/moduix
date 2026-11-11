<script lang="ts">
  import {
    ColorPickerChannelSliderValueText,
    type ColorPickerChannelSliderValueTextProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerChannelSliderValueTextProps = $props();
</script>

<ColorPickerChannelSliderValueText
  {...props}
  bind:ref
  class={clsx(styles.channelSliderValueText, className)}
  data-slot="color-picker-channel-slider-value-text"
/>