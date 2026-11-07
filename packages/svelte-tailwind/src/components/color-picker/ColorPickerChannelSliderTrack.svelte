<script lang="ts">
  import {
    ColorPickerChannelSliderTrack,
    type ColorPickerChannelSliderTrackProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerChannelSliderTrackProps = $props();
</script>

<ColorPickerChannelSliderTrack
  {...props}
  bind:ref
  class={cn(
    'size-full rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)]',
    className,
  )}
  data-slot="color-picker-channel-slider-track"
/>