<script lang="ts">
  import { ColorPickerSwatch, type ColorPickerSwatchProps } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  import { colorPickerSwatchClass } from './ColorPicker.variants';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerSwatchProps = $props();
</script>

<ColorPickerSwatch
  {...props}
  bind:ref
  class={cn(colorPickerSwatchClass, className)}
  data-slot="color-picker-swatch"
/>