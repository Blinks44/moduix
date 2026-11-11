<script lang="ts">
  import {
    ColorPickerChannelSliderThumb,
    type ColorPickerChannelSliderThumbProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerChannelSliderThumbProps = $props();
</script>

<ColorPickerChannelSliderThumb
  {...props}
  bind:ref
  class={cn(
    'size-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_4px_color-mix(in_oklab,black_18%,transparent),var(--moduix-shadow-sm)] ring-2 ring-background outline-0 focus-visible:shadow-[0_0_0_4px_var(--color-ring),var(--moduix-shadow-sm)]',
    className,
  )}
  data-slot="color-picker-channel-slider-thumb"
/>