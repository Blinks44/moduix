<script lang="ts">
  import {
    AngleSliderRootProvider,
    type AngleSliderRootProviderProps,
  } from '@ark-ui/svelte/angle-slider';
  import { clsx } from 'clsx';
  import styles from './AngleSlider.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: AngleSliderRootProviderProps = $props();
</script>

<AngleSliderRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="angle-slider-root-provider"
/>