<script lang="ts">
  import { CarouselIndicator, type CarouselIndicatorProps } from '@ark-ui/svelte/carousel';
  import { clsx } from 'clsx';
  import styles from './Carousel.module.css';

  let { class: className, ref = $bindable(null), ...props }: CarouselIndicatorProps = $props();
</script>

<CarouselIndicator
  {...props}
  bind:ref
  class={clsx(styles.indicator, className)}
  data-slot="carousel-indicator"
/>