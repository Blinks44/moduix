<script lang="ts">
  import {
    ColorPickerSwatchGroup,
    type ColorPickerSwatchGroupProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerSwatchGroupProps = $props();
</script>

<ColorPickerSwatchGroup
  {...props}
  bind:ref
  class={cn('flex flex-wrap gap-2', className)}
  data-slot="color-picker-swatch-group"
/>