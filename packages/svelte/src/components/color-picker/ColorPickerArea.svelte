<script lang="ts">
  import { ColorPickerArea, type ColorPickerAreaProps } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  import ColorPickerAreaBackground from './ColorPickerAreaBackground.svelte';
  import ColorPickerAreaThumb from './ColorPickerAreaThumb.svelte';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerAreaProps = $props();
</script>

<ColorPickerArea
  {...props}
  bind:ref
  class={clsx(styles.area, className)}
  data-slot="color-picker-area"
>
  {#if children}
    {@render children()}
  {:else}
    <ColorPickerAreaBackground />
    <ColorPickerAreaThumb />
  {/if}
</ColorPickerArea>