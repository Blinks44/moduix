<script lang="ts">
  import { clsx } from 'clsx';
  import type { HTMLAttributes } from 'svelte/elements';
  import styles from './ColorPicker.module.css';
  import ColorPickerChannelSlider from './ColorPickerChannelSlider.svelte';

  let { class: className, ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'children'> = $props();
</script>

<div {...props} class={clsx(styles.sliders, className)} data-slot="color-picker-sliders">
  <ColorPickerChannelSlider channel="hue" />
  <ColorPickerChannelSlider channel="alpha" />
</div>