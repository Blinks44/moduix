<script lang="ts">
  import {
    ColorPickerChannelSliderLabel,
    type ColorPickerChannelSliderLabelProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerChannelSliderLabelProps = $props();
</script>

<ColorPickerChannelSliderLabel
  {...props}
  bind:ref
  class={cn('text-sm font-medium', className)}
  data-slot="color-picker-channel-slider-label"
/>