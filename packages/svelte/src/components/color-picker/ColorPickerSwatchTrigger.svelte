<script lang="ts">
  import {
    ColorPickerSwatchTrigger,
    type ColorPickerSwatchTriggerProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
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
  class={clsx(styles.swatchTrigger, className)}
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