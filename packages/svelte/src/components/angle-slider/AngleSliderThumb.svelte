<script lang="ts">
  import { AngleSliderThumb, type AngleSliderThumbProps } from '@ark-ui/svelte/angle-slider';
  import { clsx } from 'clsx';
  import styles from './AngleSlider.module.css';

  let { class: className, ref = $bindable(null), ...props }: AngleSliderThumbProps = $props();
</script>

<AngleSliderThumb
  {...props}
  bind:ref
  class={clsx(styles.thumb, className)}
  data-slot="angle-slider-thumb"
/>