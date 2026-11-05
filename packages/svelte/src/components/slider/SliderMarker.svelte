<script lang="ts">
  import { SliderMarker, type SliderMarkerProps } from '@ark-ui/svelte/slider';
  import { clsx } from 'clsx';
  import styles from './Slider.module.css';

  let { class: className, ref = $bindable(null), ...props }: SliderMarkerProps = $props();
</script>

<SliderMarker
  {...props}
  bind:ref
  class={clsx(styles.marker, className)}
  data-slot="slider-marker"
/>