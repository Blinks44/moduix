<script lang="ts">
  import {
    ColorPickerChannelSlider,
    type ColorPickerChannelSliderProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  import ColorPickerChannelSliderThumb from './ColorPickerChannelSliderThumb.svelte';
  import ColorPickerChannelSliderTrack from './ColorPickerChannelSliderTrack.svelte';
  import ColorPickerTransparencyGrid from './ColorPickerTransparencyGrid.svelte';

  let {
    channel,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerChannelSliderProps = $props();
</script>

<ColorPickerChannelSlider
  {...props}
  bind:ref
  {channel}
  class={clsx(styles.channelSlider, className)}
  data-slot="color-picker-channel-slider"
>
  {#if children}
    {@render children()}
  {:else}
    {#if channel === 'alpha'}
      <ColorPickerTransparencyGrid />
    {/if}
    <ColorPickerChannelSliderTrack />
    <ColorPickerChannelSliderThumb />
  {/if}
</ColorPickerChannelSlider>