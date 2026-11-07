<script lang="ts">
  import {
    CarouselIndicatorGroup,
    type CarouselIndicatorGroupProps,
  } from '@ark-ui/svelte/carousel';
  import { clsx } from 'clsx';
  import styles from './Carousel.module.css';

  let { class: className, ref = $bindable(null), ...props }: CarouselIndicatorGroupProps = $props();
</script>

<CarouselIndicatorGroup
  {...props}
  bind:ref
  class={clsx(styles.indicatorGroup, className)}
  data-slot="carousel-indicator-group"
/>