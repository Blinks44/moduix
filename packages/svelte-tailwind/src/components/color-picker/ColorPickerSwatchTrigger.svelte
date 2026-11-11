<script lang="ts">
  import {
    ColorPickerSwatchTrigger,
    type ColorPickerSwatchTriggerProps,
  } from '@ark-ui/svelte/color-picker';
  import { cn } from '@/lib/moduix/cn';
  import ColorPickerSwatch from './ColorPickerSwatch.svelte';
  import ColorPickerSwatchIndicator from './ColorPickerSwatchIndicator.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    value,
    ...props
  }: ColorPickerSwatchTriggerProps = $props();
</script>

<ColorPickerSwatchTrigger
  {...props}
  bind:ref
  {value}
  class={cn(
    'inline-flex cursor-pointer rounded-sm border-0 bg-transparent p-0 outline-0 focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring disabled:cursor-default disabled:opacity-disabled [:is([data-slot=color-picker-root],[data-slot=color-picker-root-provider])[data-disabled]_&]:opacity-100',
    className,
  )}
  data-slot="color-picker-swatch-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <ColorPickerSwatch {value}>
      <ColorPickerSwatchIndicator />
    </ColorPickerSwatch>
  {/if}
</ColorPickerSwatchTrigger>