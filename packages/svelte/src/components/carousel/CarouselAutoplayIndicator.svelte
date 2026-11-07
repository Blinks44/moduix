<script lang="ts">
  import {
    CarouselAutoplayIndicator,
    type CarouselAutoplayIndicatorProps,
  } from '@ark-ui/svelte/carousel';
  import { clsx } from 'clsx';
  import styles from './Carousel.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: CarouselAutoplayIndicatorProps = $props();
</script>

<CarouselAutoplayIndicator
  {...props}
  bind:ref
  class={clsx(styles.autoplayIndicator, className)}
  data-slot="carousel-autoplay-indicator"
/>