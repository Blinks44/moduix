<script lang="ts">
  import { SliderMarkerGroup, type SliderMarkerGroupProps } from '@ark-ui/svelte/slider';
  import { clsx } from 'clsx';
  import styles from './Slider.module.css';

  let { class: className, ref = $bindable(null), ...props }: SliderMarkerGroupProps = $props();
</script>

<SliderMarkerGroup
  {...props}
  bind:ref
  class={clsx(styles.markerGroup, className)}
  data-slot="slider-marker-group"
/>