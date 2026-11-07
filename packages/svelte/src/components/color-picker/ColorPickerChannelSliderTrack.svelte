<script lang="ts">
  import {
    ColorPickerChannelSliderTrack,
    type ColorPickerChannelSliderTrackProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerChannelSliderTrackProps = $props();
</script>

<ColorPickerChannelSliderTrack
  {...props}
  bind:ref
  class={clsx(styles.channelSliderTrack, className)}
  data-slot="color-picker-channel-slider-track"
/>