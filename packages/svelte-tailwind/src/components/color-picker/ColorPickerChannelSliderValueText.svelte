<script lang="ts">
  import {
    ColorPickerChannelSliderValueText,
    type ColorPickerChannelSliderValueTextProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerChannelSliderValueTextProps = $props();
</script>

<ColorPickerChannelSliderValueText
  {...props}
  bind:ref
  class={cn('min-w-0 text-sm text-muted-foreground', className)}
  data-slot="color-picker-channel-slider-value-text"
/>