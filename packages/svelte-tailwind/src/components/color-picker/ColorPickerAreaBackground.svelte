<script lang="ts">
  import {
    ColorPickerAreaBackground,
    type ColorPickerAreaBackgroundProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerAreaBackgroundProps = $props();
</script>

<ColorPickerAreaBackground
  {...props}
  bind:ref
  class={cn('size-full rounded-[inherit]', className)}
  data-slot="color-picker-area-background"
/>