<script lang="ts">
  import { SliderControl, type SliderControlProps } from '@ark-ui/svelte/slider';
  import { clsx } from 'clsx';
  import styles from './Slider.module.css';

  let { class: className, ref = $bindable(null), ...props }: SliderControlProps = $props();
</script>

<SliderControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="slider-control"
/>