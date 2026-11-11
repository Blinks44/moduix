<script lang="ts">
  import { SliderRootProvider, type SliderRootProviderProps } from '@ark-ui/svelte/slider';
  import { clsx } from 'clsx';
  import styles from './Slider.module.css';

  let { class: className, ref = $bindable(null), ...props }: SliderRootProviderProps = $props();
</script>

<SliderRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="slider-root-provider"
/>