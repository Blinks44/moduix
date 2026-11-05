<script lang="ts">
  import { AngleSliderRoot, type AngleSliderRootProps } from '@ark-ui/svelte/angle-slider';
  import { clsx } from 'clsx';
  import styles from './AngleSlider.module.css';

  let {
    class: className,
    value = $bindable(),
    ref = $bindable(null),
    ...props
  }: AngleSliderRootProps = $props();
</script>

<AngleSliderRoot
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.root, className)}
  data-slot="angle-slider-root"
/>