<script lang="ts">
  import { SliderTrack, type SliderTrackProps } from '@ark-ui/svelte/slider';
  import { clsx } from 'clsx';
  import styles from './Slider.module.css';

  let { class: className, ref = $bindable(null), ...props }: SliderTrackProps = $props();
</script>

<SliderTrack {...props} bind:ref class={clsx(styles.track, className)} data-slot="slider-track" />