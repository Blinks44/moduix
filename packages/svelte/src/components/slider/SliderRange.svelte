<script lang="ts">
  import { SliderRange, type SliderRangeProps } from '@ark-ui/svelte/slider';
  import { clsx } from 'clsx';
  import styles from './Slider.module.css';

  let { class: className, ref = $bindable(null), ...props }: SliderRangeProps = $props();
</script>

<SliderRange {...props} bind:ref class={clsx(styles.range, className)} data-slot="slider-range" />