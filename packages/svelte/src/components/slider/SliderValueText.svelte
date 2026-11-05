<script lang="ts">
  import { SliderValueText, type SliderValueTextProps } from '@ark-ui/svelte/slider';
  import { clsx } from 'clsx';
  import styles from './Slider.module.css';

  let { class: className, ref = $bindable(null), ...props }: SliderValueTextProps = $props();
</script>

<SliderValueText
  {...props}
  bind:ref
  class={clsx(styles.valueText, className)}
  data-slot="slider-value-text"
/>