<script lang="ts">
  import { SliderLabel, type SliderLabelProps } from '@ark-ui/svelte/slider';
  import { clsx } from 'clsx';
  import styles from './Slider.module.css';

  let { class: className, ref = $bindable(null), ...props }: SliderLabelProps = $props();
</script>

<SliderLabel {...props} bind:ref class={clsx(styles.label, className)} data-slot="slider-label" />