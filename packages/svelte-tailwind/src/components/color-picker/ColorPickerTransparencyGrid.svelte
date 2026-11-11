<script lang="ts">
  import {
    ColorPickerTransparencyGrid,
    type ColorPickerTransparencyGridProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerTransparencyGridProps = $props();
</script>

<ColorPickerTransparencyGrid
  {...props}
  bind:ref
  class={cn('size-full rounded-[inherit] [grid-area:1/1/2/2]', className)}
  data-slot="color-picker-transparency-grid"
/>