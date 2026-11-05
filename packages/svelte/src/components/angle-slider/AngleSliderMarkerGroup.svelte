<script lang="ts">
  import {
    AngleSliderMarkerGroup,
    type AngleSliderMarkerGroupProps,
  } from '@ark-ui/svelte/angle-slider';
  import { clsx } from 'clsx';
  import styles from './AngleSlider.module.css';

  let { class: className, ref = $bindable(null), ...props }: AngleSliderMarkerGroupProps = $props();
</script>

<AngleSliderMarkerGroup
  {...props}
  bind:ref
  class={clsx(styles.markerGroup, className)}
  data-slot="angle-slider-marker-group"
/>