<script lang="ts">
  import {
    ColorPickerSwatchIndicator,
    type ColorPickerSwatchIndicatorProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import { CheckIcon } from '@/lib/moduix/icons/ui';
  import styles from './ColorPicker.module.css';
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
  class={clsx(styles.swatchIndicator, className)}
  data-slot="color-picker-swatch-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</ColorPickerSwatchIndicator>