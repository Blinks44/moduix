<script lang="ts">
  import { AngleSliderLabel, type AngleSliderLabelProps } from '@ark-ui/svelte/angle-slider';
  import { clsx } from 'clsx';
  import styles from './AngleSlider.module.css';

  let { class: className, ref = $bindable(null), ...props }: AngleSliderLabelProps = $props();
</script>

<AngleSliderLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="angle-slider-label"
/>