<script lang="ts">
  import { CarouselRootProvider, type CarouselRootProviderProps } from '@ark-ui/svelte/carousel';
  import { clsx } from 'clsx';
  import styles from './Carousel.module.css';

  let { class: className, ref = $bindable(null), ...props }: CarouselRootProviderProps = $props();
</script>

<CarouselRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="carousel-root-provider"
/>