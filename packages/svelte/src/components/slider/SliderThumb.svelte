<script lang="ts">
  import { SliderThumb, type SliderThumbProps } from '@ark-ui/svelte/slider';
  import { clsx } from 'clsx';
  import styles from './Slider.module.css';

  let { class: className, ref = $bindable(null), ...props }: SliderThumbProps = $props();
</script>

<SliderThumb {...props} bind:ref class={clsx(styles.thumb, className)} data-slot="slider-thumb" />