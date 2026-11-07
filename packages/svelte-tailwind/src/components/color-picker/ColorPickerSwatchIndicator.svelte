<script lang="ts">
  import {
    ColorPickerSwatchIndicator,
    type ColorPickerSwatchIndicatorProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  import { CheckIcon } from '@/lib/moduix/icons/ui';
  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerSwatchIndicatorProps = $props();
</script>

<ColorPickerSwatchIndicator
  {...props}
  bind:ref
  class={cn(
    'inline-flex text-white [filter:drop-shadow(0_1px_1px_rgb(0_0_0_/_45%))] [&>svg]:size-4 [&[hidden]]:hidden',
    className,
  )}
  data-slot="color-picker-swatch-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</ColorPickerSwatchIndicator>