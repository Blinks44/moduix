<script lang="ts">
  import { CarouselItem, type CarouselItemProps } from '@ark-ui/svelte/carousel';
  import { clsx } from 'clsx';
  import styles from './Carousel.module.css';

  let { class: className, ref = $bindable(null), ...props }: CarouselItemProps = $props();
</script>

<CarouselItem {...props} bind:ref class={clsx(styles.item, className)} data-slot="carousel-item" />