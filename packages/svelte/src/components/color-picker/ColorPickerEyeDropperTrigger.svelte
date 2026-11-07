<script lang="ts">
  import {
    ColorPickerEyeDropperTrigger,
    type ColorPickerEyeDropperTriggerProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import { PipetteIcon } from '@/lib/moduix/icons/ui';
  import styles from './ColorPicker.module.css';
  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerEyeDropperTriggerProps = $props();
</script>

<ColorPickerEyeDropperTrigger
  {...props}
  bind:ref
  class={clsx(styles.eyeDropperTrigger, className)}
  data-slot="color-picker-eye-dropper-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <PipetteIcon />
  {/if}
</ColorPickerEyeDropperTrigger>