<script lang="ts">
  import { CarouselControl, type CarouselControlProps } from '@ark-ui/svelte/carousel';
  import { clsx } from 'clsx';
  import styles from './Carousel.module.css';

  let { class: className, ref = $bindable(null), ...props }: CarouselControlProps = $props();
</script>

<CarouselControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="carousel-control"
/>