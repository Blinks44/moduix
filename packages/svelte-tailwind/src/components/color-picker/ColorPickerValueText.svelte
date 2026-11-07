<script lang="ts">
  import {
    ColorPickerValueText,
    type ColorPickerValueTextProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerValueTextProps = $props();
</script>

<ColorPickerValueText
  {...props}
  bind:ref
  class={cn('min-w-0 text-sm', className)}
  data-slot="color-picker-value-text"
/>