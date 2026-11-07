<script lang="ts">
  import { ColorPickerTrigger, type ColorPickerTriggerProps } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  import ColorPickerValueSwatch from './ColorPickerValueSwatch.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerTriggerProps = $props();
</script>

<ColorPickerTrigger
  {...props}
  bind:ref
  class={clsx(styles.trigger, className)}
  data-slot="color-picker-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <ColorPickerValueSwatch />
  {/if}
</ColorPickerTrigger>