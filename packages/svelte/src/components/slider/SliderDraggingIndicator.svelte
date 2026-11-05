<script lang="ts">
  import {
    SliderDraggingIndicator,
    type SliderDraggingIndicatorProps,
  } from '@ark-ui/svelte/slider';
  import { clsx } from 'clsx';
  import styles from './Slider.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: SliderDraggingIndicatorProps = $props();
</script>

<SliderDraggingIndicator
  {...props}
  bind:ref
  class={clsx(styles.draggingIndicator, className)}
  data-slot="slider-dragging-indicator"
/>