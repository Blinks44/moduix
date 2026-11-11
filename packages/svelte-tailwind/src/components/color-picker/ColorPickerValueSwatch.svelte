<script lang="ts">
  import {
    ColorPickerValueSwatch,
    type ColorPickerValueSwatchProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  import { colorPickerSwatchClass } from './ColorPicker.variants';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerValueSwatchProps = $props();
</script>

<ColorPickerValueSwatch
  {...props}
  bind:ref
  class={cn(colorPickerSwatchClass, className)}
  data-slot="color-picker-value-swatch"
/>