<script lang="ts">
  import {
    ColorPickerChannelSlider,
    type ColorPickerChannelSliderProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
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
  class={cn(
    'flex h-3 items-center rounded-full select-none data-[orientation=vertical]:h-40 data-[orientation=vertical]:w-3 data-[orientation=vertical]:items-stretch data-[orientation=vertical]:justify-center',
    className,
  )}
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