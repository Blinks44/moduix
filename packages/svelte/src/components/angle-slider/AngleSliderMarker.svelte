<script lang="ts">
  import { AngleSliderMarker, type AngleSliderMarkerProps } from '@ark-ui/svelte/angle-slider';
  import { clsx } from 'clsx';
  import styles from './AngleSlider.module.css';

  let { class: className, ref = $bindable(null), ...props }: AngleSliderMarkerProps = $props();
</script>

<AngleSliderMarker
  {...props}
  bind:ref
  class={clsx(styles.marker, className)}
  data-slot="angle-slider-marker"
/>